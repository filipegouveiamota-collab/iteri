-- Creates public.profiles (+ public.offerer_profiles starter row) right after
-- Supabase Auth inserts a new auth.users row. Reads the metadata passed via
-- supabase.auth.signUp({ options: { data: { role, name, university, siape, roleTitle } } }).
-- SECURITY DEFINER + owned by postgres (superuser) so it bypasses RLS on public.profiles,
-- which otherwise has no INSERT policy for authenticated/anon.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, name, avatar, onboarding_completed)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'student'),
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.raw_user_meta_data ->> 'avatar',
    false
  );

  if coalesce(new.raw_user_meta_data ->> 'role', '') = 'offerer' then
    insert into public.offerer_profiles (user_id, role_title, university, siape, contact_email)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'roleTitle', 'Professor'),
      coalesce(new.raw_user_meta_data ->> 'university', ''),
      coalesce(new.raw_user_meta_data ->> 'siape', ''),
      new.email
    );
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- role is set once at signup time (via the trigger above) and must never change afterwards,
-- since it drives every RLS policy below. Defense in depth on top of the RLS update policy.
create or replace function public.prevent_role_change()
returns trigger
language plpgsql
as $$
begin
  if new.role <> old.role then
    raise exception 'role cannot be changed after signup';
  end if;
  return new;
end;
$$;

create trigger profiles_prevent_role_change
  before update on public.profiles
  for each row execute procedure public.prevent_role_change();

-- Auth "Before User Created" hook (registered in the Supabase dashboard under
-- Authentication > Hooks, not by this migration). Pilot phase is PUC-Rio only:
-- students must sign up with @aluno.puc-rio.br, offerers with @puc-rio.br or a
-- department subdomain (@inf.puc-rio.br, @iag.puc-rio.br, ...), explicitly excluding
-- the student subdomain. Mirrors src/app/lib/validators.ts (isStudentEmail/isOffererEmail).
create or replace function public.validate_signup_domain(event jsonb)
returns jsonb
language plpgsql
as $$
declare
  user_email text;
  user_role text;
begin
  user_email := lower(event -> 'user' ->> 'email');
  user_role := event -> 'user' -> 'user_metadata' ->> 'role';

  if user_role = 'student' then
    if user_email !~ '^[^\s@]+@aluno\.puc-rio\.br$' then
      return jsonb_build_object('error', jsonb_build_object(
        'message', 'Use seu e-mail institucional @aluno.puc-rio.br',
        'http_code', 403
      ));
    end if;
  elsif user_role = 'offerer' then
    if user_email ~ '@aluno\.puc-rio\.br$' or user_email !~ '^[^\s@]+@([a-z0-9-]+\.)?puc-rio\.br$' then
      return jsonb_build_object('error', jsonb_build_object(
        'message', 'Use um e-mail institucional @puc-rio.br ou @[setor].puc-rio.br',
        'http_code', 403
      ));
    end if;
  else
    return jsonb_build_object('error', jsonb_build_object(
      'message', 'Papel de usuário inválido.',
      'http_code', 403
    ));
  end if;

  return '{}'::jsonb;
end;
$$;

grant execute on function public.validate_signup_domain to supabase_auth_admin;
revoke execute on function public.validate_signup_domain from authenticated, anon, public;

-- Cross-user notification inserts (student applies -> notify offerer; offerer decides ->
-- notify student). SECURITY DEFINER because the acting user has no RLS grant to insert
-- notifications for someone else's user_id, and shouldn't be given one directly.
create or replace function public.notify_on_application_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  opp public.opportunities%rowtype;
begin
  select * into opp from public.opportunities where id = new.opportunity_id;

  if tg_op = 'INSERT' then
    insert into public.notifications (user_id, title, message, link)
    values (
      opp.offerer_id,
      'Nova candidatura recebida',
      format('Nova candidatura em "%s"', opp.title),
      format('/offerer/opportunities/%s/candidates', opp.id)
    );
  elsif tg_op = 'UPDATE' and new.status is distinct from old.status and new.status in ('approved', 'rejected') then
    insert into public.notifications (user_id, title, message, link)
    values (
      new.student_id,
      case when new.status = 'approved' then 'Candidatura aprovada' else 'Candidatura rejeitada' end,
      case
        when new.status = 'approved' then format('Você foi aprovado em "%s"', opp.title)
        else format('Sua candidatura em "%s" foi rejeitada', opp.title)
      end,
      '/student/applications'
    );
  end if;

  return new;
end;
$$;

create trigger applications_notify
  after insert or update on public.applications
  for each row execute procedure public.notify_on_application_change();

-- RLS on student_profiles only allows reading your own row, so a plain SELECT can't power the
-- "this CPF is already registered" pre-check UX in the onboarding wizard (before the wizard's
-- upsert even runs). This RPC leaks nothing but a boolean — safe to expose to any authenticated
-- user — while the actual guarantee against duplicates is the UNIQUE constraint on the column,
-- enforced regardless of this function.
create or replace function public.is_cpf_taken(check_cpf text, exclude_user uuid default null)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.student_profiles
    where cpf = check_cpf and (exclude_user is null or user_id <> exclude_user)
  );
$$;

grant execute on function public.is_cpf_taken to authenticated;

-- Fixes "infinite recursion detected in policy for relation applications" (HTTP 500 on every
-- candidatura). applications_insert_own checked the caller's role with a subquery on
-- public.profiles; profiles_select_by_offerer_for_applicants in turn queries public.applications,
-- so evaluating the applications policy re-entered applications through profiles.
--
-- The role check now goes through a SECURITY DEFINER function, which reads profiles without
-- applying RLS and breaks the cycle. opportunities_insert_own gets the same treatment, since it
-- had the same profiles subquery.

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

revoke all on function public.current_user_role() from public;
grant execute on function public.current_user_role() to authenticated;

drop policy if exists "applications_insert_own" on public.applications;
create policy "applications_insert_own" on public.applications
  for insert with check (
    student_id = auth.uid()
    and public.current_user_role() = 'student'
  );

drop policy if exists "opportunities_insert_own" on public.opportunities;
create policy "opportunities_insert_own" on public.opportunities
  for insert with check (
    offerer_id = auth.uid()
    and public.current_user_role() = 'offerer'
  );

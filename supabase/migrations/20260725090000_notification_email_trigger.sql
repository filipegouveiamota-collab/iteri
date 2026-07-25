-- Calls the send-notification-email Edge Function directly via pg_net, instead of using the
-- dashboard's "Database Webhooks" feature. That feature depends on the platform-managed
-- supabase_functions schema (schema + http_request() trigger function), which is missing on
-- this project — a known Supabase provisioning gap
-- (github.com/orgs/supabase/discussions/36206 and related supabase/cli issues), not something
-- fixable with user-run SQL. This trigger lives entirely in schemas we own instead.
--
-- Auth: the Edge Function is deployed with --no-verify-jwt (the caller here is a Postgres
-- trigger, not a logged-in user, so it never carries a Supabase JWT) and instead checks a
-- shared secret. That secret was generated once and stored in Supabase Vault under the name
-- 'webhook_secret' via a one-off, untracked migration (never committed to git) — it is NOT
-- created here, only read.
create or replace function public.notify_email_via_webhook()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  secret text;
begin
  select decrypted_secret into secret from vault.decrypted_secrets where name = 'webhook_secret';

  if secret is null then
    raise warning 'webhook_secret not found in Vault; skipping notification e-mail for notification %', new.id;
    return new;
  end if;

  perform net.http_post(
    url := 'https://oarkrgnjaheqjosgbdpj.supabase.co/functions/v1/send-notification-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || secret
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'notifications',
      'record', to_jsonb(new)
    )
  );

  return new;
end;
$$;

create trigger notifications_send_email
  after insert on public.notifications
  for each row execute procedure public.notify_email_via_webhook();

-- Temporary debugging aid — removed once the notification-email pipeline is confirmed working.
-- Exposes only pg_net's own diagnostics (trigger existence, whether the vault secret is present,
-- and pg_net's HTTP response log), never any secret value.
create or replace function public.debug_notification_pipeline()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'trigger_exists', exists (
      select 1 from pg_trigger where tgname = 'notifications_send_email' and not tgisinternal
    ),
    'vault_secret_present', exists (
      select 1 from vault.decrypted_secrets where name = 'webhook_secret'
    ),
    'recent_http_responses', (
      select coalesce(jsonb_agg(to_jsonb(t) order by t.id desc), '[]'::jsonb)
      from (select * from net._http_response order by id desc limit 5) t
    )
  );
$$;

grant execute on function public.debug_notification_pipeline to authenticated;

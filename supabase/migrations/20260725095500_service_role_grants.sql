-- Same root cause as 20260725091500_api_role_grants.sql: this project's "new cloud default"
-- withholds automatic privileges on new public-schema tables from every API role, including
-- service_role (usually assumed to have implicit full access). The Edge Function's admin client
-- (send-notification-email) hit exactly this: "permission denied for table profiles" even
-- though it authenticates as service_role, because the base GRANT was simply never issued.
grant usage on schema public to service_role;
grant all privileges on all tables in schema public to service_role;

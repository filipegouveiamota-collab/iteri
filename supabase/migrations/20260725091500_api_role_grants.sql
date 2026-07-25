-- Recent Supabase projects default to NOT auto-exposing new public-schema tables to the
-- anon/authenticated API roles (see api.auto_expose_new_tables in supabase/config.toml).
-- RLS policies only apply *after* this base grant passes, so without it every table is
-- unreachable via the API regardless of the policies in 20260724120002_rls_policies.sql.
grant usage on schema public to anon, authenticated;

grant select on public.profiles to anon, authenticated;
grant update on public.profiles to authenticated;

grant select, insert, update on public.student_profiles to authenticated;
grant select, insert, update, delete on public.experiences to authenticated;

grant select on public.offerer_profiles to anon, authenticated;
grant update on public.offerer_profiles to authenticated;

grant select on public.opportunities to anon, authenticated;
grant insert, update on public.opportunities to authenticated;

grant select, insert, update on public.applications to authenticated;

grant select, update on public.notifications to authenticated;

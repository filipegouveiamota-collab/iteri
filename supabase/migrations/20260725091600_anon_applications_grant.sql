-- profiles_select_by_offerer_for_applicants (and the equivalent policies on
-- student_profiles/experiences) reference public.applications in an EXISTS subquery. Postgres
-- needs the querying role to hold at least SELECT on every table a policy references in order to
-- evaluate the policy at all — even for anon, where the policy will end up returning zero rows
-- either way, since applications_select_own_or_offerer still requires auth.uid() to match.
grant select on public.applications to anon;

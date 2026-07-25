alter table public.profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.experiences enable row level security;
alter table public.offerer_profiles enable row level security;
alter table public.opportunities enable row level security;
alter table public.applications enable row level security;
alter table public.notifications enable row level security;

-- ----- profiles -----
-- Own row, always. Offerer public fields readable by anyone (name shown on public
-- opportunity pages). Offerer can also read a student's profile row once that student
-- has applied to one of the offerer's opportunities (needed for the candidate list/detail).
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

create policy "profiles_select_offerer_public" on public.profiles
  for select using (role = 'offerer');

create policy "profiles_select_by_offerer_for_applicants" on public.profiles
  for select using (
    exists (
      select 1 from public.applications a
      join public.opportunities o on o.id = a.opportunity_id
      where a.student_id = profiles.id and o.offerer_id = auth.uid()
    )
  );

create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- No insert policy: rows are only created by the handle_new_user trigger (SECURITY DEFINER).

-- ----- student_profiles -----
-- A student can never read another student's row (CPF included). An offerer can read a
-- student's row only once that student applied to one of the offerer's opportunities.
create policy "student_profiles_select_own" on public.student_profiles
  for select using (user_id = auth.uid());

create policy "student_profiles_select_by_offerer_for_applicants" on public.student_profiles
  for select using (
    exists (
      select 1 from public.applications a
      join public.opportunities o on o.id = a.opportunity_id
      where a.student_id = student_profiles.user_id and o.offerer_id = auth.uid()
    )
  );

create policy "student_profiles_insert_own" on public.student_profiles
  for insert with check (user_id = auth.uid());

create policy "student_profiles_update_own" on public.student_profiles
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ----- experiences -----
create policy "experiences_select_own" on public.experiences
  for select using (student_user_id = auth.uid());

create policy "experiences_select_by_offerer_for_applicants" on public.experiences
  for select using (
    exists (
      select 1 from public.applications a
      join public.opportunities o on o.id = a.opportunity_id
      where a.student_id = experiences.student_user_id and o.offerer_id = auth.uid()
    )
  );

create policy "experiences_insert_own" on public.experiences
  for insert with check (student_user_id = auth.uid());

create policy "experiences_update_own" on public.experiences
  for update using (student_user_id = auth.uid()) with check (student_user_id = auth.uid());

create policy "experiences_delete_own" on public.experiences
  for delete using (student_user_id = auth.uid());

-- ----- offerer_profiles -----
-- Institutional info only (no PII equivalent to CPF), safe to read publicly.
create policy "offerer_profiles_select_public" on public.offerer_profiles
  for select using (true);

create policy "offerer_profiles_update_own" on public.offerer_profiles
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ----- opportunities -----
-- Public can browse active/closed opportunities; an offerer can also see their own drafts.
create policy "opportunities_select_public" on public.opportunities
  for select using (status in ('active', 'closed') or offerer_id = auth.uid());

create policy "opportunities_insert_own" on public.opportunities
  for insert with check (
    offerer_id = auth.uid()
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'offerer')
  );

create policy "opportunities_update_own" on public.opportunities
  for update using (offerer_id = auth.uid()) with check (offerer_id = auth.uid());

-- ----- applications -----
-- Student sees/creates their own applications; offerer sees and updates status only for
-- applications to opportunities they own.
create policy "applications_select_own_or_offerer" on public.applications
  for select using (
    student_id = auth.uid()
    or exists (select 1 from public.opportunities o where o.id = applications.opportunity_id and o.offerer_id = auth.uid())
  );

create policy "applications_insert_own" on public.applications
  for insert with check (
    student_id = auth.uid()
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student')
  );

create policy "applications_update_by_offerer" on public.applications
  for update using (
    exists (select 1 from public.opportunities o where o.id = applications.opportunity_id and o.offerer_id = auth.uid())
  ) with check (
    exists (select 1 from public.opportunities o where o.id = applications.opportunity_id and o.offerer_id = auth.uid())
  );

-- ----- notifications -----
-- Strictly own rows. Inserts happen only via the notify_on_application_change trigger
-- (SECURITY DEFINER) — no INSERT policy is granted to authenticated/anon.
create policy "notifications_select_own" on public.notifications
  for select using (user_id = auth.uid());

create policy "notifications_update_own" on public.notifications
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

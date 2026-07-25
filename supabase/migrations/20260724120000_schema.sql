-- ITERI core schema. Mirrors src/app/lib/types.ts, snake_case columns.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null check (role in ('student', 'offerer')),
  name text not null,
  avatar text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.student_profiles (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  cpf text not null unique,
  phone text,
  birth_date date,
  photo text,
  university text,
  course text,
  semester text,
  cr numeric,
  registration text,
  skills text[] not null default '{}',
  languages jsonb not null default '[]',
  bio text,
  linkedin text,
  is_scholarship_holder boolean not null default false,
  scholarship_type text,
  updated_at timestamptz not null default now()
);

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references public.student_profiles (user_id) on delete cascade,
  title text not null,
  location text,
  start_date date,
  end_date date,
  description text,
  created_at timestamptz not null default now()
);

create table public.offerer_profiles (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  role_title text not null default 'Professor',
  university text,
  department text,
  siape text,
  unit_name text,
  unit_logo text,
  unit_description text,
  contact_email text,
  contact_phone text,
  department_url text,
  area_of_expertise text,
  bio text,
  updated_at timestamptz not null default now()
);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  knowledge_area text not null,
  category text not null,
  image text,
  description text,
  workload text,
  pay_rate numeric not null,
  pay_type text not null check (pay_type in ('hour', 'month')),
  start_date date,
  application_deadline date,
  required_skills jsonb not null default '[]',
  min_cr numeric,
  required_course text,
  required_semester text,
  other_notes text,
  status text not null default 'active' check (status in ('active', 'draft', 'closed')),
  is_new boolean not null default true,
  is_urgent boolean not null default false,
  offerer_id uuid not null references public.profiles (id) on delete cascade,
  offerer_name text not null,
  university text not null,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  applied_at timestamptz not null default now(),
  timeline jsonb not null default '[]',
  unique (opportunity_id, student_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  link text
);

create index opportunities_offerer_id_idx on public.opportunities (offerer_id);
create index opportunities_status_idx on public.opportunities (status);
create index applications_opportunity_id_idx on public.applications (opportunity_id);
create index applications_student_id_idx on public.applications (student_id);
create index notifications_user_id_idx on public.notifications (user_id);
create index experiences_student_user_id_idx on public.experiences (student_user_id);

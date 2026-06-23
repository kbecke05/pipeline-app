-- ─────────────────────────────────────────────────────────────────────────────
-- Pipeline — Job Application Tracker
-- Run this entire file in the Supabase SQL Editor to set up your database.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Tables ───────────────────────────────────────────────────────────────────

create table if not exists jobs (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references auth.users(id) on delete cascade not null,
  company      text not null,
  title        text not null,
  status       text not null default 'wishlist'
                 check (status in ('wishlist','applied','phone_screen','interview','offer','rejected','withdrawn')),
  applied_date date,
  job_url      text,
  salary_min   integer check (salary_min >= 0),
  salary_max   integer check (salary_max >= 0),
  location     text,
  remote       boolean not null default false,
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists contacts (
  id           uuid primary key default uuid_generate_v4(),
  job_id       uuid references jobs(id) on delete cascade not null,
  user_id      uuid references auth.users(id) on delete cascade not null,
  name         text not null,
  title        text,
  email        text,
  linkedin_url text,
  notes        text,
  created_at   timestamptz not null default now()
);

create table if not exists activities (
  id          uuid primary key default uuid_generate_v4(),
  job_id      uuid references jobs(id) on delete cascade not null,
  user_id     uuid references auth.users(id) on delete cascade not null,
  type        text not null
                check (type in ('applied','email','phone_call','interview','offer','rejection','note')),
  title       text not null,
  description text,
  date        timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

create index if not exists jobs_user_id_idx      on jobs(user_id);
create index if not exists jobs_status_idx       on jobs(status);
create index if not exists contacts_job_id_idx   on contacts(job_id);
create index if not exists activities_job_id_idx on activities(job_id);
create index if not exists activities_date_idx   on activities(date desc);

-- ── Auto-update updated_at on jobs ───────────────────────────────────────────

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists jobs_updated_at on jobs;

create trigger jobs_updated_at
  before update on jobs
  for each row execute function set_updated_at();

-- ── Row-Level Security ───────────────────────────────────────────────────────
-- TEMPORARILY DISABLED FOR LOCAL TESTING
-- Uncomment the lines below when setting up authentication

-- alter table jobs       enable row level security;
-- alter table contacts   enable row level security;
-- alter table activities enable row level security;

-- -- jobs
-- create policy "jobs: select own"  on jobs for select using (auth.uid() = user_id);
-- create policy "jobs: insert own"  on jobs for insert with check (auth.uid() = user_id);
-- create policy "jobs: update own"  on jobs for update using (auth.uid() = user_id);
-- create policy "jobs: delete own"  on jobs for delete using (auth.uid() = user_id);

-- -- contacts
-- create policy "contacts: select own" on contacts for select using (auth.uid() = user_id);
-- create policy "contacts: insert own" on contacts for insert with check (auth.uid() = user_id);
-- create policy "contacts: update own" on contacts for update using (auth.uid() = user_id);
-- create policy "contacts: delete own" on contacts for delete using (auth.uid() = user_id);

-- -- activities
-- create policy "activities: select own" on activities for select using (auth.uid() = user_id);
-- create policy "activities: insert own" on activities for insert with check (auth.uid() = user_id);
-- create policy "activities: update own" on activities for update using (auth.uid() = user_id);
-- create policy "activities: delete own" on activities for delete using (auth.uid() = user_id);

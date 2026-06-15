create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  plan text not null default 'free',
  minutes_remaining numeric(10,2) default 5.0,
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

create table voice_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null check (type in ('tts', 'dubbing', 'spokesperson')),
  input_text text,
  voice_id text not null,
  language text default 'en',
  duration_sec numeric(10,2),
  output_url text,
  status text not null default 'pending',
  provider_job_id text,
  created_at timestamptz not null default now()
);

create table video_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  script text not null,
  avatar_id text not null,
  voice_id text not null,
  output_url text,
  status text not null default 'pending',
  heygen_video_id text,
  created_at timestamptz not null default now()
);

-- RLS
alter table profiles enable row level security;
alter table voice_jobs enable row level security;
alter table video_jobs enable row level security;

create policy "Users own profiles" on profiles for all using (auth.uid() = id);
create policy "Users own voice jobs" on voice_jobs for all using (auth.uid() = user_id);
create policy "Users own video jobs" on video_jobs for all using (auth.uid() = user_id);

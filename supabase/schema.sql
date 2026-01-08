-- Create Projects Table
create table if not exists projects (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  title text not null,
  slug text unique not null,
  description text,
  technologies text[],
  image_url text,
  repo_link text,
  live_link text,
  is_featured boolean default false
);

-- Create Posts Table
create table if not exists posts (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  title text not null,
  slug text unique not null,
  content text,
  published boolean default false,
  published_at timestamptz
);

-- Enable RLS
alter table projects enable row level security;
alter table posts enable row level security;

-- Create Policies

-- Public Read Access
create policy "Public projects are viewable by everyone"
  on projects for select
  using ( true );

create policy "Public posts are viewable by everyone"
  on posts for select
  using ( true );

-- Admin Write Access
-- NOTE: If you leave signups open, anyone who logs in can edit.
-- Ensure you disable signups in Supabase Auth settings or restrict this policy to your specific UID.
-- Example: using ( auth.uid() = 'your-user-id-here' )

create policy "Authenticated users can insert projects"
  on projects for insert
  to authenticated
  with check ( true );

create policy "Authenticated users can update projects"
  on projects for update
  to authenticated
  using ( true );

create policy "Authenticated users can delete projects"
  on projects for delete
  to authenticated
  using ( true );

create policy "Authenticated users can insert posts"
  on posts for insert
  to authenticated
  with check ( true );

create policy "Authenticated users can update posts"
  on posts for update
  to authenticated
  using ( true );

create policy "Authenticated users can delete posts"
  on posts for delete
  to authenticated
  using ( true );

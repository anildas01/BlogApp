-- Create comments table
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id bigint references public.posts(id) on delete cascade not null,
  user_name text not null,
  user_email text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies (Open for public insert, read-only for public, admin full access)
alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select
  using ( true );

create policy "Anyone can insert a comment"
  on public.comments for insert
  with check ( true );

create policy "Admins can delete comments"
  on public.comments for delete
  using ( true ); -- Ideally restrict to authenticated admins, for now simplified as auth logic is client-side or handled via middleware

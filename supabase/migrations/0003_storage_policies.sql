-- Create the storage bucket for blog images if it doesn't exist
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Create the storage bucket for project images if it doesn't exist
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Remove existing policies to avoid conflicts if re-running
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated Upload" on storage.objects;
drop policy if exists "Authenticated Update" on storage.objects;
drop policy if exists "Authenticated Delete" on storage.objects;

-- Policy: Allow public read access (viewing images)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id in ('blog-images', 'project-images') );

-- Policy: Allow authenticated users to upload (insert)
create policy "Authenticated Upload"
  on storage.objects for insert
  with check ( bucket_id in ('blog-images', 'project-images') and auth.role() = 'authenticated' );

-- Policy: Allow authenticated users to update
create policy "Authenticated Update"
  on storage.objects for update
  using ( bucket_id in ('blog-images', 'project-images') and auth.role() = 'authenticated' );

-- Policy: Allow authenticated users to delete
create policy "Authenticated Delete"
  on storage.objects for delete
  using ( bucket_id in ('blog-images', 'project-images') and auth.role() = 'authenticated' );

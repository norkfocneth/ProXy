create table public.uploaded_pyqs (
  id uuid default gen_random_uuid() primary key,
  branch text not null,
  semester int not null,
  subject_code text not null,
  subject_title text not null,
  year text not null,
  exam_type text not null, -- 'end' or 'mid'
  file_url text not null,
  uploaded_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.uploaded_pyqs enable row level security;

-- Policies
create policy "Allow public read access to pyqs" on public.uploaded_pyqs
  for select using (true);

create policy "Allow admin insert access to pyqs" on public.uploaded_pyqs
  for insert with check ((auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com');

create policy "Allow admin update access to pyqs" on public.uploaded_pyqs
  for update using ((auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com');

create policy "Allow admin delete access to pyqs" on public.uploaded_pyqs
  for delete using ((auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com');

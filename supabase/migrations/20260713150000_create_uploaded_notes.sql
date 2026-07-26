create table public.uploaded_notes (
  id uuid default gen_random_uuid() primary key,
  branch text not null,
  semester int not null,
  subject_code text not null,
  subject_title text not null,
  unit text not null,
  file_url text not null,
  uploaded_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.uploaded_notes enable row level security;

-- Policies
create policy "Allow public read access to notes" on public.uploaded_notes
  for select using (true);

create policy "Allow insert access to notes" on public.uploaded_notes
  for insert with check (
    (auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com' OR
    (auth.jwt() ->> 'email') = 'focneth@proxy.com'
  );

create policy "Allow update access to notes" on public.uploaded_notes
  for update using (
    (auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com' OR
    (auth.jwt() ->> 'email') = 'focneth@proxy.com'
  );

create policy "Allow delete access to notes" on public.uploaded_notes
  for delete using (
    (auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com' OR
    (auth.jwt() ->> 'email') = 'focneth@proxy.com'
  );

-- Seed the focneth@proxy.com user (password: foci65535)
insert into auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
)
select
  'f0c7e1b5-8b1e-4c91-800e-7028df78a4ef', -- Fixed UUID
  '00000000-0000-0000-0000-000000000000',
  'focneth@proxy.com',
  extensions.crypt('foci65535', extensions.gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"focneth"}',
  false,
  'authenticated',
  'authenticated'
where not exists (
  select 1 from auth.users where email = 'focneth@proxy.com'
);

-- Insert into auth.identities
insert into auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
select
  'f0c7e1b5-8b1e-4c91-800e-7028df78a4ef',
  'f0c7e1b5-8b1e-4c91-800e-7028df78a4ef',
  jsonb_build_object('sub', 'f0c7e1b5-8b1e-4c91-800e-7028df78a4ef', 'email', 'focneth@proxy.com'),
  'email',
  'f0c7e1b5-8b1e-4c91-800e-7028df78a4ef',
  now(),
  now(),
  now()
where not exists (
  select 1 from auth.identities where identity_data->>'email' = 'focneth@proxy.com'
);

-- Drop old policies
drop policy if exists "Allow admin insert access to pyqs" on public.uploaded_pyqs;
drop policy if exists "Allow admin update access to pyqs" on public.uploaded_pyqs;
drop policy if exists "Allow admin delete access to pyqs" on public.uploaded_pyqs;

-- Create new policies allowing both admins and focneth provider
create policy "Allow insert access to pyqs" on public.uploaded_pyqs
  for insert with check (
    (auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com' OR
    (auth.jwt() ->> 'email') = 'focneth@proxy.com'
  );

create policy "Allow update access to pyqs" on public.uploaded_pyqs
  for update using (
    (auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com' OR
    (auth.jwt() ->> 'email') = 'focneth@proxy.com'
  );

create policy "Allow delete access to pyqs" on public.uploaded_pyqs
  for delete using (
    (auth.jwt() ->> 'email') = 'floof.wellness.in@gmail.com' OR
    (auth.jwt() ->> 'email') = 'focneth@proxy.com'
  );

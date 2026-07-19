-- ============================================================
-- Notes Provider CMS Schema
-- Tables: notes_providers, resources
-- RPC: verify_provider_login, get_provider_stats, get_provider_resources
-- ============================================================

-- Enable pgcrypto for password hashing
create extension if not exists pgcrypto;

-- ── notes_providers table ──
create table public.notes_providers (
  id uuid default gen_random_uuid() primary key,
  provider_id text unique not null,
  password_hash text not null,
  display_name text not null,
  branch text not null,
  verified boolean default true,
  avatar_url text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

alter table public.notes_providers enable row level security;
-- No public SELECT policy — passwords must never be accessible from the API

-- ── resources table ──
create table public.resources (
  id uuid default gen_random_uuid() primary key,
  provider_id uuid references public.notes_providers(id) on delete set null,
  resource_type text not null,
  branch text not null,
  semester int not null,
  subject text not null,
  year text not null,
  title text not null,
  description text,
  file_url text not null,
  upload_date timestamptz default timezone('utc'::text, now()) not null,
  status text default 'pending',
  view_count int default 0,
  download_count int default 0,
  rating_sum int default 0,
  rating_count int default 0,
  constraint valid_status check (status in ('pending', 'approved', 'rejected')),
  constraint valid_resource_type check (resource_type in ('notes', 'pyqs', 'lab_files', 'assignments'))
);

alter table public.resources enable row level security;

-- Public can read only approved resources
create policy "Public read approved resources"
  on public.resources for select
  using (status = 'approved');

-- Insert policy: allow inserts via RPC (security definer function)
-- Direct inserts from anon are blocked since we use RPC

-- ── RPC: verify_provider_login ──
-- Server-side password check using pgcrypto — password never leaves the DB
create or replace function public.verify_provider_login(
  p_provider_id text,
  p_password text
) returns json
language plpgsql security definer
as $$
declare
  provider_record record;
begin
  select id, provider_id, display_name, branch, verified, avatar_url
  into provider_record
  from public.notes_providers
  where provider_id = p_provider_id
    and password_hash = crypt(p_password, password_hash)
    and verified = true;

  if not found then
    return json_build_object('success', false, 'error', 'Invalid credentials or unverified provider');
  end if;

  return json_build_object(
    'success', true,
    'provider', json_build_object(
      'id', provider_record.id,
      'provider_id', provider_record.provider_id,
      'display_name', provider_record.display_name,
      'branch', provider_record.branch,
      'avatar_url', provider_record.avatar_url
    )
  );
end;
$$;

-- ── RPC: get_provider_stats ──
create or replace function public.get_provider_stats(p_provider_uuid uuid)
returns json language plpgsql security definer as $$
declare
  total_views int;
  total_downloads int;
  avg_rating numeric;
  most_popular json;
  total_uploads int;
  pending_count int;
  approved_count int;
begin
  select coalesce(sum(view_count), 0),
         coalesce(sum(download_count), 0),
         case when coalesce(sum(rating_count), 0) > 0
              then round(sum(rating_sum)::numeric / sum(rating_count), 1)
              else 0 end,
         count(*),
         count(*) filter (where status = 'pending'),
         count(*) filter (where status = 'approved')
  into total_views, total_downloads, avg_rating, total_uploads, pending_count, approved_count
  from public.resources
  where provider_id = p_provider_uuid;

  select json_build_object('title', r.title, 'downloads', r.download_count, 'views', r.view_count)
  into most_popular
  from public.resources r
  where r.provider_id = p_provider_uuid
  order by r.download_count desc
  limit 1;

  return json_build_object(
    'total_views', total_views,
    'total_downloads', total_downloads,
    'average_rating', avg_rating,
    'most_popular', coalesce(most_popular, '{"title": "No uploads yet", "downloads": 0, "views": 0}'::json),
    'total_uploads', total_uploads,
    'pending_count', pending_count,
    'approved_count', approved_count
  );
end;
$$;

-- ── RPC: get_provider_resources ──
create or replace function public.get_provider_resources(p_provider_uuid uuid)
returns json language plpgsql security definer as $$
begin
  return coalesce(
    (select json_agg(row_to_json(r))
     from (
       select id, resource_type, branch, semester, subject, year, title, description,
              file_url, upload_date, status, view_count, download_count
       from public.resources
       where provider_id = p_provider_uuid
       order by upload_date desc
       limit 50
     ) r),
    '[]'::json
  );
end;
$$;

-- ── RPC: insert_resource ──
-- Allows verified providers to insert resources without direct table access
create or replace function public.insert_resource(
  p_provider_uuid uuid,
  p_resource_type text,
  p_branch text,
  p_semester int,
  p_subject text,
  p_year text,
  p_title text,
  p_description text,
  p_file_url text
) returns json language plpgsql security definer as $$
declare
  provider_exists boolean;
  new_id uuid;
begin
  -- Verify provider exists and is verified
  select exists(
    select 1 from public.notes_providers
    where id = p_provider_uuid and verified = true
  ) into provider_exists;

  if not provider_exists then
    return json_build_object('success', false, 'error', 'Invalid or unverified provider');
  end if;

  insert into public.resources (
    provider_id, resource_type, branch, semester, subject,
    year, title, description, file_url, status
  ) values (
    p_provider_uuid, p_resource_type, p_branch, p_semester, p_subject,
    p_year, p_title, p_description, p_file_url, 'pending'
  ) returning id into new_id;

  return json_build_object('success', true, 'id', new_id);
end;
$$;

-- ── Security: Restrict RPC access ──
-- Revoke default PUBLIC execute, grant only to anon role
revoke execute on function public.verify_provider_login from public;
grant execute on function public.verify_provider_login to anon;

revoke execute on function public.get_provider_stats from public;
grant execute on function public.get_provider_stats to anon;

revoke execute on function public.get_provider_resources from public;
grant execute on function public.get_provider_resources to anon;

revoke execute on function public.insert_resource from public;
grant execute on function public.insert_resource to anon;

-- ── Seed: Add a test provider (password: foci65535) ──
insert into public.notes_providers (provider_id, password_hash, display_name, branch)
values (
  'focneth',
  crypt('foci65535', gen_salt('bf')),
  'focneth',
  'CSE'
);

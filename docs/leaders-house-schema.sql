-- Leaders House: additive schema, private media, editor-only publishing.
create table public.leaders_editors (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
alter table public.leaders_editors enable row level security;
grant select on public.leaders_editors to authenticated;
create policy "Editors can read own membership" on public.leaders_editors for select to authenticated using (user_id=(select auth.uid()));
insert into public.leaders_editors(user_id) values ('3946403c-ef2f-4ebe-be8d-6a5321119f26');
create table public.leaders_posts (
 id text primary key default gen_random_uuid()::text,
 author_id uuid not null references auth.users(id),
 title text not null check (char_length(btrim(title)) between 1 and 180),
 title_en text check (char_length(title_en)<=180),
 body text not null default '' check (char_length(body)<=5000),
 body_en text check (char_length(body_en)<=5000),
 kind text not null check (kind in ('note','image','video','story')),
 topic text not null check (topic in ('leadership','ai','strategy','capabilities','innovation')),
 media_path text,
 media_type text check (media_type in ('image/jpeg','image/png','image/webp','video/mp4','video/webm')),
 media_url text check (media_url is null or media_url ~ '^/field-[a-z]+\.jpg$'),
 source_url text check (source_url is null or source_url ~ '^https://[^[:space:]]+$' or source_url ~ '^/[a-zA-Z0-9][^[:space:]]*$'),
 source_label text check (char_length(source_label)<=120),
 status text not null default 'draft' check(status in ('draft','published','archived')),
 featured boolean not null default false,
 highlight boolean not null default false,
 published_at timestamptz,
 expires_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check(media_path is null or split_part(media_path,'/',1)=author_id::text),
 check(kind not in ('image','video') or media_path is not null or media_url is not null),
 check(kind <> 'video' or media_type like 'video/%'),
 check(kind <> 'image' or media_type like 'image/%'),
 check(status <> 'published' or published_at is not null),
 check(kind <> 'story' or status <> 'published' or highlight or expires_at is not null)
);
alter table public.leaders_posts enable row level security;
grant select on public.leaders_posts to anon,authenticated;
grant insert,update on public.leaders_posts to authenticated;
create policy "Read published unexpired posts" on public.leaders_posts for select to anon,authenticated using (status='published' and published_at<=now() and (expires_at is null or expires_at>now()));
create policy "Editors read own posts" on public.leaders_posts for select to authenticated using (author_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Editors create own posts" on public.leaders_posts for insert to authenticated with check (author_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Editors update own posts" on public.leaders_posts for update to authenticated using (author_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid()))) with check (author_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create index leaders_posts_feed_idx on public.leaders_posts (created_at desc) where status='published';
create index leaders_posts_author_idx on public.leaders_posts (author_id);
create index leaders_posts_media_idx on public.leaders_posts (media_path) where media_path is not null;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('leaders-media','leaders-media',false,52428800,array['image/jpeg','image/png','image/webp','video/mp4','video/webm']);
create policy "Readers access published leaders media" on storage.objects for select to anon,authenticated using (bucket_id='leaders-media' and exists(select 1 from public.leaders_posts p where p.media_path=name and p.status='published' and p.published_at<=now() and (p.expires_at is null or p.expires_at>now())));
create policy "Editors read own leaders media" on storage.objects for select to authenticated using (bucket_id='leaders-media' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Editors upload own leaders media" on storage.objects for insert to authenticated with check (bucket_id='leaders-media' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));

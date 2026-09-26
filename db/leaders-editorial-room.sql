-- Private pilot workflow; existing reader policies and publishing grants stay intact.
alter table public.leaders_posts add column if not exists character_id text
 check (character_id is null or character_id in ('medo','nori','tiko','bani','volt','zaro','aman','nova','eco','movi','wasl','numo','raed','hima','labo'));
create table public.leaders_editorial_items (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id),
 character_id text not null check(character_id in ('tiko','labo')),
 source_url text not null check(source_url ~ '^https://[^[:space:]]+$' and char_length(source_url)<=2000),
 source_label text not null check(char_length(source_label) between 1 and 120),
 source_title text not null check(char_length(source_title) between 1 and 180),
 source_excerpt text not null check(char_length(source_excerpt) between 100 and 16000),
 source_method text not null default 'manual' check(source_method in ('manual','fetched')),
 source_fetched_at timestamptz,
 source_checked boolean not null default false,
 status text not null default 'inbox' check(status in ('inbox','generating','draft','review','approved','rejected','handed_off')),
 revision integer not null default 0,
 draft jsonb,
 review_note text check(char_length(review_note)<=2000),
 model text,
 last_error text,
 generation_started_at timestamptz,
 post_id text unique references public.leaders_posts(id),
 history jsonb not null default '[]'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(owner_id,character_id,source_url),
 check(draft is null or jsonb_typeof(draft)='object')
);
alter table public.leaders_editorial_items enable row level security;
revoke all on public.leaders_editorial_items from public,anon;
grant select,insert,update on public.leaders_editorial_items to authenticated;
create policy "Editors read own editorial items" on public.leaders_editorial_items for select to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Editors add own editorial items" on public.leaders_editorial_items for insert to authenticated
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Editors update own editorial items" on public.leaders_editorial_items for update to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())))
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create index leaders_editorial_owner_updated on public.leaders_editorial_items(owner_id,updated_at desc);
-- Invoker privileges preserve the same editor RLS checks for every operation.
create function public.leaders_editorial_action(p_id uuid,p_revision integer,p_action text,p_payload jsonb default '{}'::jsonb)
 returns public.leaders_editorial_items language plpgsql security invoker set search_path='' as $$
declare item public.leaders_editorial_items; next_status text; content jsonb; next_post text;
begin
 select * into item from public.leaders_editorial_items where id=p_id and owner_id=auth.uid() for update;
 if not found then raise exception 'EDITOR_REQUIRED' using errcode='42501'; end if;
 if item.revision<>p_revision then raise exception 'REVISION_CONFLICT'; end if;
 next_status:=item.status;content:=item.draft;
 if p_action='begin_generation' then
  if item.status='generating' and item.generation_started_at>now()-interval '2 minutes' then raise exception 'GENERATION_BUSY'; end if;
  if item.status not in ('inbox','draft','rejected','generating') then raise exception 'STATE_CONFLICT'; end if;
  next_status:='generating';
 elsif p_action in ('save','complete_generation') then
  if (p_action='save' and item.status not in ('inbox','draft','review','approved','rejected')) or (p_action='complete_generation' and item.status<>'generating') then raise exception 'STATE_CONFLICT';end if;
  content:=p_payload->'draft';
  if content is null or jsonb_typeof(content)<>'object' or char_length(btrim(content->>'title')) not between 1 and 180 or char_length(btrim(content->>'body')) not between 50 and 5000 or coalesce(jsonb_array_length(content->'claims'),0)<1 then raise exception 'REVIEW_REQUIRED';end if;
  next_status:='draft';
 elsif p_action='generation_failed' then
  if item.status<>'generating' then raise exception 'STATE_CONFLICT';end if;
  next_status:=case when content is null then 'inbox' else 'draft' end;
 elsif p_action='request_review' then
  if item.status<>'draft' or content is null or not item.source_checked then raise exception 'REVIEW_REQUIRED';end if;
  next_status:='review';
 elsif p_action='approve' then
  if item.status<>'review' or not item.source_checked or char_length(btrim(coalesce(p_payload->>'note','')))<10 then raise exception 'REVIEW_REQUIRED';end if;
  next_status:='approved';
 elsif p_action='reject' then
  if item.status not in ('inbox','draft','review','approved') or char_length(btrim(coalesce(p_payload->>'note','')))<10 then raise exception 'REVIEW_REQUIRED';end if;
  next_status:='rejected';
 elsif p_action='reopen' then
  if item.status not in ('review','approved','rejected') then raise exception 'STATE_CONFLICT';end if;
  next_status:=case when content is null then 'inbox' else 'draft' end;
 elsif p_action='handoff' then
  if item.status='handed_off' and item.post_id is not null then return item;end if;
  if item.status<>'approved' or content is null or not item.source_checked then raise exception 'REVIEW_REQUIRED';end if;
  insert into public.leaders_posts(author_id,title,body,title_en,body_en,kind,topic,source_url,source_label,status,character_id)
   values(auth.uid(),content->>'title',content->>'body',nullif(content->>'title_en',''),nullif(content->>'body_en',''),'note',case when item.character_id='tiko' then 'ai' else 'innovation' end,item.source_url,item.source_label,'draft',item.character_id)
   returning id into next_post;
  next_status:='handed_off';
 else raise exception 'STATE_CONFLICT'; end if;
 update public.leaders_editorial_items set
 status=next_status,draft=content,revision=revision+1,updated_at=now(),
 source_checked=case when p_action='save' then coalesce((p_payload->>'source_checked')::boolean,false) when p_action='complete_generation' then false else source_checked end,
 review_note=case when p_action in ('approve','reject') then p_payload->>'note' when p_action in ('save','complete_generation','reopen') then null else review_note end,
 model=case when p_action='complete_generation' then p_payload->>'model' else model end,
 last_error=case when p_action='generation_failed' then left(coalesce(p_payload->>'error','MODEL_FAILED'),120) else null end,
 generation_started_at=case when p_action='begin_generation' then now() else null end,
 post_id=coalesce(next_post,post_id),
 history=history||jsonb_build_array(jsonb_build_object('action',p_action,'at',now()))
 where id=p_id returning * into item;
 return item;
end;$$;
revoke all on function public.leaders_editorial_action(uuid,integer,text,jsonb) from public,anon;
grant execute on function public.leaders_editorial_action(uuid,integer,text,jsonb) to authenticated;

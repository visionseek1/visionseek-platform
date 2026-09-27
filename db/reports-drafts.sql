-- Private report authoring; does not publish reports or change existing editor membership.
begin;
create table public.reports_drafts (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id),
 status text not null default 'draft' check(status in ('draft','review','archived')),
 content jsonb not null check(jsonb_typeof(content)='object' and octet_length(content::text)<=250000),
 revision integer not null default 0 check(revision>=0),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check(length(btrim(coalesce(content->>'title_ar','')))>0 or length(btrim(coalesce(content->>'title_en','')))>0)
);
alter table public.reports_drafts enable row level security;
revoke all on public.reports_drafts from public,anon,authenticated;
grant select,insert,update on public.reports_drafts to authenticated;
create policy "Report editors read own drafts" on public.reports_drafts for select to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Report editors create own drafts" on public.reports_drafts for insert to authenticated
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Report editors update own drafts" on public.reports_drafts for update to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())))
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create index reports_drafts_owner_updated on public.reports_drafts(owner_id,updated_at desc);
create function public.reports_draft_revision() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if tg_op='INSERT' then new.revision:=0;new.created_at:=now();
 else
  if new.id<>old.id or new.owner_id<>old.owner_id then raise exception 'IMMUTABLE_IDENTITY';end if;
  new.revision:=old.revision+1;new.created_at:=old.created_at;
 end if;
 new.updated_at:=now();return new;
end;$$;
revoke all on function public.reports_draft_revision() from public,anon,authenticated;
create trigger reports_draft_revision before insert or update on public.reports_drafts for each row execute function public.reports_draft_revision();
commit;

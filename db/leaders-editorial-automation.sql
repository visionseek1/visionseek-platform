-- Background drafting is confined to private editorial items. Workers never publish.
create table public.leaders_automation_settings (
 owner_id uuid primary key references auth.users(id),
 enabled boolean not null default false,
 last_tick_at timestamptz,
 last_worker_at timestamptz,
 updated_at timestamptz not null default now()
);
create table public.leaders_editorial_jobs (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id),
 item_id uuid not null unique references public.leaders_editorial_items(id),
 source_revision integer not null,
 claimed_revision integer,
 origin text not null check(origin in ('manual','schedule')),
 status text not null default 'queued' check(status in ('queued','running','succeeded','failed','cancelled')),
 attempts integer not null default 0 check(attempts between 0 and 3),
 lease_token uuid,
 lease_until timestamptz,
 trigger_run_id text,
 last_error text,
 usage jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 finished_at timestamptz
);
alter table public.leaders_automation_settings enable row level security;
alter table public.leaders_editorial_jobs enable row level security;
revoke all on public.leaders_automation_settings,public.leaders_editorial_jobs from public,anon,authenticated;
grant select on public.leaders_automation_settings,public.leaders_editorial_jobs to authenticated;
grant insert(owner_id),update(enabled) on public.leaders_automation_settings to authenticated;
grant all on public.leaders_automation_settings,public.leaders_editorial_jobs to service_role;
create policy "Editors read own automation settings" on public.leaders_automation_settings for select to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Editors initialize own automation settings" on public.leaders_automation_settings for insert to authenticated
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Editors pause own automation" on public.leaders_automation_settings for update to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())))
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create policy "Editors read own drafting jobs" on public.leaders_editorial_jobs for select to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.leaders_editors where user_id=(select auth.uid())));
create index leaders_jobs_owner_created on public.leaders_editorial_jobs(owner_id,created_at desc);

-- These invoker functions are executable only by the backend service role.
-- Each operation checks current editor membership and never writes leaders_posts.
create function public.leaders_queue_drafts(p_owner uuid,p_manual boolean default false)
 returns jsonb language plpgsql security invoker set search_path='' as $$
declare settings public.leaders_automation_settings; item public.leaders_editorial_items;
 remaining integer; today_start timestamptz; job_id uuid; ids jsonb:='[]'::jsonb;
begin
 if not exists(select 1 from public.leaders_editors where user_id=p_owner) then raise exception 'EDITOR_REQUIRED' using errcode='42501';end if;
 insert into public.leaders_automation_settings(owner_id) values(p_owner) on conflict do nothing;
 select * into settings from public.leaders_automation_settings where owner_id=p_owner for update;
 if not p_manual then
  update public.leaders_automation_settings set last_tick_at=now(),updated_at=now() where owner_id=p_owner;
  if not settings.enabled then return jsonb_build_object('status','paused','jobs',ids);end if;
 end if;
 today_start:=date_trunc('day',now() at time zone 'Asia/Seoul') at time zone 'Asia/Seoul';
 select greatest(0,2-count(*))::integer into remaining from public.leaders_editorial_jobs where owner_id=p_owner and created_at>=today_start;
 for item in select i.* from public.leaders_editorial_items i
  where i.owner_id=p_owner and i.status='inbox' and i.draft is null
   and not exists(select 1 from public.leaders_editorial_jobs j where j.item_id=i.id)
  order by i.created_at limit remaining for update of i skip locked
 loop
  insert into public.leaders_editorial_jobs(owner_id,item_id,source_revision,origin)
   values(p_owner,item.id,item.revision,case when p_manual then 'manual' else 'schedule' end) returning id into job_id;
  ids:=ids||jsonb_build_array(job_id);
 end loop;
 return jsonb_build_object('status',case when remaining=0 then 'daily_limit' else 'queued' end,'jobs',ids);
end;$$;

create function public.leaders_claim_draft(p_job uuid,p_owner uuid,p_lease uuid,p_run text)
 returns jsonb language plpgsql security invoker set search_path='' as $$
declare job public.leaders_editorial_jobs; item public.leaders_editorial_items; settings public.leaders_automation_settings;
begin
 if not exists(select 1 from public.leaders_editors where user_id=p_owner) then raise exception 'EDITOR_REQUIRED' using errcode='42501';end if;
 select * into settings from public.leaders_automation_settings where owner_id=p_owner for update;
 select * into job from public.leaders_editorial_jobs where id=p_job and owner_id=p_owner for update;
 if not found then raise exception 'NOT_FOUND';end if;
 if job.status in ('succeeded','failed','cancelled') then return jsonb_build_object('status',job.status);end if;
 if job.status='running' and job.lease_until>now() then return jsonb_build_object('status','busy');end if;
 select * into item from public.leaders_editorial_items where id=job.item_id and owner_id=p_owner for update;
 if not found then raise exception 'NOT_FOUND';end if;
 if (job.origin='schedule' and not settings.enabled) or job.attempts>=3 then
  if item.status='generating' and item.revision=job.claimed_revision then
   update public.leaders_editorial_items set status='inbox',revision=revision+1,generation_started_at=null,last_error='AUTOMATION_STOPPED',updated_at=now() where id=item.id;
  end if;
  update public.leaders_editorial_jobs set status='cancelled',lease_token=null,lease_until=null,finished_at=now(),updated_at=now(),last_error='AUTOMATION_STOPPED' where id=p_job;
  return jsonb_build_object('status','cancelled');
 end if;
 if job.status='queued' then
  if item.status<>'inbox' or item.draft is not null or item.revision<>job.source_revision then
   update public.leaders_editorial_jobs set status='cancelled',last_error='SOURCE_CHANGED',finished_at=now(),updated_at=now() where id=p_job;
   return jsonb_build_object('status','cancelled');
  end if;
 elsif item.status<>'generating' or item.revision<>job.claimed_revision then
  update public.leaders_editorial_jobs set status='cancelled',lease_token=null,lease_until=null,last_error='SOURCE_CHANGED',finished_at=now(),updated_at=now() where id=p_job;
  return jsonb_build_object('status','cancelled');
 end if;
 update public.leaders_editorial_items set status='generating',revision=revision+1,generation_started_at=now(),last_error=null,updated_at=now(),
  history=history||jsonb_build_array(jsonb_build_object('action','automation_started','at',now())) where id=item.id returning * into item;
 update public.leaders_editorial_jobs set status='running',attempts=attempts+1,claimed_revision=item.revision,lease_token=p_lease,lease_until=now()+interval '3 minutes',
  trigger_run_id=left(p_run,120),updated_at=now(),last_error=null where id=p_job;
 update public.leaders_automation_settings set last_worker_at=now() where owner_id=p_owner;
 return jsonb_build_object('status','claimed','item',to_jsonb(item));
end;$$;

create function public.leaders_finish_draft(p_job uuid,p_owner uuid,p_lease uuid,p_result jsonb)
 returns jsonb language plpgsql security invoker set search_path='' as $$
declare job public.leaders_editorial_jobs; item public.leaders_editorial_items; content jsonb; retry boolean; next_revision integer;
begin
 if not exists(select 1 from public.leaders_editors where user_id=p_owner) then raise exception 'EDITOR_REQUIRED' using errcode='42501';end if;
 perform 1 from public.leaders_automation_settings where owner_id=p_owner for update;
 select * into job from public.leaders_editorial_jobs where id=p_job and owner_id=p_owner for update;
 if not found then raise exception 'NOT_FOUND';end if;
 if job.status='succeeded' then return jsonb_build_object('status','succeeded');end if;
 if job.status<>'running' or job.lease_token is distinct from p_lease then raise exception 'LEASE_CONFLICT';end if;
 select * into item from public.leaders_editorial_items where id=job.item_id and owner_id=p_owner for update;
 if item.status<>'generating' or item.revision<>job.claimed_revision then
  update public.leaders_editorial_jobs set status='cancelled',lease_token=null,lease_until=null,last_error='SOURCE_CHANGED',finished_at=now(),updated_at=now() where id=p_job;
  return jsonb_build_object('status','cancelled');
 end if;
 content:=p_result->'draft';
 if content is not null then
  if jsonb_typeof(content)<>'object' or coalesce(char_length(content->>'body'),0)<50 or coalesce(jsonb_array_length(content->'claims'),0)<1 then raise exception 'INVALID_DRAFT';end if;
  update public.leaders_editorial_items set status='draft',draft=content,revision=revision+1,source_checked=false,review_note=null,model=left(p_result->>'model',160),
   generation_started_at=null,last_error=null,updated_at=now(),history=history||jsonb_build_array(jsonb_build_object('action','automation_draft_ready','at',now())) where id=item.id;
  update public.leaders_editorial_jobs set status='succeeded',lease_token=null,lease_until=null,usage=p_result->'usage',finished_at=now(),updated_at=now() where id=p_job;
  return jsonb_build_object('status','succeeded');
 end if;
 retry:=coalesce((p_result->>'retryable')::boolean,false) and job.attempts<3;
 update public.leaders_editorial_items set status='inbox',revision=revision+1,generation_started_at=null,last_error=left(p_result->>'error',120),updated_at=now(),
  history=history||jsonb_build_array(jsonb_build_object('action','automation_failed','at',now())) where id=item.id returning revision into next_revision;
 update public.leaders_editorial_jobs set status=case when retry then 'queued' else 'failed' end,source_revision=next_revision,lease_token=null,lease_until=null,
  last_error=left(p_result->>'error',120),finished_at=case when retry then null else now() end,updated_at=now() where id=p_job;
 return jsonb_build_object('status',case when retry then 'retry' else 'failed' end);
end;$$;
revoke all on function public.leaders_queue_drafts(uuid,boolean),public.leaders_claim_draft(uuid,uuid,uuid,text),public.leaders_finish_draft(uuid,uuid,uuid,jsonb) from public,anon,authenticated;
grant execute on function public.leaders_queue_drafts(uuid,boolean),public.leaders_claim_draft(uuid,uuid,uuid,text),public.leaders_finish_draft(uuid,uuid,uuid,jsonb) to service_role;

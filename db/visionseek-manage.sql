-- Additive reviewed room installer. Existing tables and auth users are preserved.
-- Founder provisioning is a separate step after verifying the existing account.
begin;
create schema if not exists manage_private;
revoke all on schema manage_private from public,anon,authenticated;
grant usage on schema manage_private to authenticated;
create table manage_private.principals(
 id uuid primary key default gen_random_uuid(),auth_user_id uuid unique references auth.users(id),
 display_name text not null check(length(btrim(display_name)) between 1 and 120),kind text not null check(kind in ('founder','human','agent')),enabled boolean not null default false,
 check(kind<>'agent' or (auth_user_id is null and not enabled))
);
create table manage_private.modules(id text primary key check(id ~ '^[a-z][a-z0-9-]{1,50}$'),work_enabled boolean not null default false);
insert into manage_private.modules values('leaders',true),('reports',true),('programs',true),('training',false);
create table manage_private.grants(principal_id uuid not null references manage_private.principals(id),module_id text not null references manage_private.modules(id),actions text[] not null check(actions <@ array['read','createTask','editTask','submitDeliverable','review']::text[] and 'read'=any(actions)),primary key(principal_id,module_id));
create table manage_private.tasks(
 id uuid primary key default gen_random_uuid(),module_id text not null references manage_private.modules(id),title text not null check(length(btrim(title)) between 1 and 180),
 goal text not null check(length(btrim(goal)) between 1 and 4000),inputs text not null default '' check(length(inputs)<=6000),acceptance text not null check(length(btrim(acceptance)) between 1 and 4000),
 executor_id uuid not null references manage_private.principals(id),approver_id uuid not null references manage_private.principals(id),created_by uuid not null references manage_private.principals(id),due_at timestamptz,
 state text not null default 'queued' check(state in ('queued','in_progress','blocked','submitted','accepted','cancelled')),revision integer not null default 1 check(revision>0),current_deliverable_id uuid,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create table manage_private.deliverables(
 id uuid primary key default gen_random_uuid(),task_id uuid not null references manage_private.tasks(id),module_id text not null references manage_private.modules(id),submitted_by uuid not null references manage_private.principals(id),task_revision integer not null,
 summary text not null check(length(btrim(summary)) between 1 and 6000),version text not null check(length(btrim(version)) between 1 and 160),evidence jsonb not null check(jsonb_typeof(evidence)='array' and jsonb_array_length(evidence) between 1 and 12),
 branch text check(length(btrim(branch)) between 1 and 200),commit text check(commit ~ '^[a-fA-F0-9]{40}$'),workspace text not null check(length(btrim(workspace)) between 1 and 200),created_at timestamptz not null default now(),check((branch is null)=(commit is null)),unique(task_id,task_revision)
);
alter table manage_private.tasks add constraint task_deliverable_fk foreign key(current_deliverable_id) references manage_private.deliverables(id);
create table manage_private.reviews(
 id uuid primary key default gen_random_uuid(),task_id uuid not null references manage_private.tasks(id),module_id text not null references manage_private.modules(id),deliverable_id uuid not null references manage_private.deliverables(id),reviewer_id uuid not null references manage_private.principals(id),task_revision integer not null,
 decision text not null check(decision in ('accepted','changes_requested')),note text not null check(length(btrim(note)) between 1 and 2000),created_at timestamptz not null default now(),unique(task_id,task_revision)
);
create table manage_private.activity(id uuid primary key default gen_random_uuid(),module_id text not null references manage_private.modules(id),actor_id uuid not null references manage_private.principals(id),task_id uuid not null references manage_private.tasks(id),operation text not null,note text check(length(note)<=2000),revision integer not null,result text not null default 'succeeded',created_at timestamptz not null default now());
create table manage_private.requests(principal_id uuid not null references manage_private.principals(id),request_key text not null,payload jsonb not null,result jsonb not null,created_at timestamptz not null default now(),primary key(principal_id,request_key));
create index manage_tasks_module_updated on manage_private.tasks(module_id,updated_at desc);
create index manage_deliverables_task on manage_private.deliverables(task_id,created_at desc);
create index manage_activity_module_created on manage_private.activity(module_id,created_at desc);
-- All direct table access denied. RLS remains a second barrier if a table grant is added later.
alter table manage_private.principals enable row level security;
alter table manage_private.modules enable row level security;
alter table manage_private.grants enable row level security;
alter table manage_private.tasks enable row level security;
alter table manage_private.deliverables enable row level security;
alter table manage_private.reviews enable row level security;
alter table manage_private.activity enable row level security;
alter table manage_private.requests enable row level security;
revoke all on all tables in schema manage_private from public,anon,authenticated;
-- Definer entrypoints are intentionally private; every call checks live auth and scope.
create function manage_private.current_actor() returns manage_private.principals language plpgsql security definer set search_path='' as $$
declare p manage_private.principals;
begin
 if auth.uid() is null or coalesce((auth.jwt()->>'is_anonymous')::boolean,false) then raise exception 'ACCESS_DENIED';end if;
 select * into p from manage_private.principals where auth_user_id=auth.uid() and enabled and kind in ('founder','human');
 if p.id is null then raise exception 'ACCESS_DENIED';end if;return p;
end $$;
create function manage_private.can_act(actor uuid,module text,action text) returns boolean language sql stable set search_path='' as $$
 select exists(select 1 from manage_private.principals p where p.id=actor and p.enabled and p.kind in ('founder','human') and (p.kind='founder' or exists(select 1 from manage_private.grants g where g.principal_id=p.id and g.module_id=module and action=any(g.actions))));
$$;
create function manage_private.snapshot() returns jsonb language plpgsql security definer set search_path='' as $$
declare p manage_private.principals;visible text[];
begin
 p:=manage_private.current_actor();select coalesce(array_agg(id),'{}') into visible from manage_private.modules where manage_private.can_act(p.id,id,'read');
 return jsonb_build_object(
 'principal',jsonb_build_object('id',p.id,'display_name',p.display_name,'kind',p.kind,'enabled',p.enabled),
 'principals',(select coalesce(jsonb_agg(to_jsonb(q)),'[]') from(select id,display_name,kind,enabled from manage_private.principals x where x.id=p.id or p.kind='founder' or x.kind='founder' or exists(select 1 from manage_private.grants g where g.principal_id=x.id and g.module_id=any(visible)))q),
 'grants',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from manage_private.grants g where g.module_id=any(visible)),
 'tasks',(select coalesce(jsonb_agg(to_jsonb(t) order by t.updated_at desc),'[]') from manage_private.tasks t where t.module_id=any(visible)),
 'deliverables',(select coalesce(jsonb_agg(to_jsonb(d) order by d.created_at desc),'[]') from manage_private.deliverables d where d.module_id=any(visible)),
 'reviews',(select coalesce(jsonb_agg(to_jsonb(r) order by r.created_at desc),'[]') from manage_private.reviews r where r.module_id=any(visible)),
 'activity',(select coalesce(jsonb_agg(to_jsonb(a) order by a.created_at desc),'[]') from(select * from manage_private.activity where module_id=any(visible) order by created_at desc limit 200)a),
 'activityLimited',(select count(*)>200 from manage_private.activity where module_id=any(visible)));
end $$;
create function manage_private.command(payload jsonb,request_key text) returns jsonb language plpgsql security definer set search_path='' as $$
declare p manage_private.principals;t manage_private.tasks;old_request manage_private.requests;op text:=payload->>'type';module text;task_uuid uuid;next_id uuid;output jsonb;target_state text;
begin
 p:=manage_private.current_actor();
 if payload is null or jsonb_typeof(payload)<>'object' or length(payload::text)>40000 or request_key is null or request_key !~ '^[a-zA-Z0-9_-]{16,120}$' or op is null or op not in ('createTask','editTask','setState','submitDeliverable','review') then raise exception 'INVALID_INPUT';end if;
 perform pg_advisory_xact_lock(hashtextextended(p.id::text||':'||request_key,0));
 select * into old_request from manage_private.requests r where r.principal_id=p.id and r.request_key=command.request_key;
 if old_request.principal_id is not null then
  if old_request.payload<>payload then raise exception 'IDEMPOTENCY_CONFLICT';end if;
  if not manage_private.can_act(p.id,old_request.result->>'moduleId','read') then raise exception 'ACCESS_DENIED';end if;return old_request.result;
 end if;
 if op='createTask' then module:=payload->>'moduleId';else
  task_uuid:=(payload->>'taskId')::uuid;select * into t from manage_private.tasks where id=task_uuid for update;
  if t.id is null then raise exception 'ACCESS_DENIED';end if;module:=t.module_id;
 end if;
 if not manage_private.can_act(p.id,module,'read') or not manage_private.can_act(p.id,module,case when op='setState' then 'editTask' else op end) then raise exception 'ACCESS_DENIED';end if;
 if not exists(select 1 from manage_private.modules where id=module and work_enabled) then raise exception 'MODULE_DISABLED';end if;
 if op<>'createTask' and (payload->>'revision' is null or (payload->>'revision')::integer<>t.revision) then raise exception 'REVISION_CONFLICT';end if;
 if op in ('createTask','editTask') then
  if not manage_private.can_act((payload->>'executorId')::uuid,module,'submitDeliverable') or not exists(select 1 from manage_private.principals where id=(payload->>'approverId')::uuid and kind='founder' and enabled) then raise exception 'ASSIGNMENT_INVALID';end if;
  if op='editTask' and t.state not in ('queued','in_progress','blocked') then raise exception 'STATE_CONFLICT';end if;
  if op='createTask' then
   insert into manage_private.tasks(module_id,title,goal,inputs,acceptance,executor_id,approver_id,created_by,due_at) values(module,payload->>'title',payload->>'goal',coalesce(payload->>'inputs',''),payload->>'acceptance',(payload->>'executorId')::uuid,(payload->>'approverId')::uuid,p.id,(payload->>'dueAt')::timestamptz) returning * into t;
  else
   update manage_private.tasks set title=payload->>'title',goal=payload->>'goal',inputs=coalesce(payload->>'inputs',''),acceptance=payload->>'acceptance',executor_id=(payload->>'executorId')::uuid,approver_id=(payload->>'approverId')::uuid,due_at=(payload->>'dueAt')::timestamptz,revision=revision+1,updated_at=now() where id=t.id returning * into t;
  end if;
 elsif op='setState' then
  if p.kind<>'founder' and p.id<>t.executor_id then raise exception 'ACCESS_DENIED';end if;
  target_state:=payload->>'state';if target_state is null or target_state not in ('queued','in_progress','blocked','cancelled') or length(btrim(coalesce(payload->>'note',''))) not between 1 and 2000 then raise exception 'INVALID_INPUT';end if;
  if t.state='cancelled' or (t.state in ('submitted','accepted') and (p.kind<>'founder' or target_state not in ('queued','cancelled'))) then raise exception 'STATE_CONFLICT';end if;
  update manage_private.tasks set state=target_state,revision=revision+1,updated_at=now(),current_deliverable_id=case when t.state in ('submitted','accepted') then null else current_deliverable_id end where id=t.id returning * into t;
 elsif op='submitDeliverable' then
  if p.id<>t.executor_id and p.kind<>'founder' then raise exception 'ACCESS_DENIED';end if;
  if t.state not in ('queued','in_progress','blocked') then raise exception 'STATE_CONFLICT';end if;
  if jsonb_typeof(payload->'evidence') is distinct from 'array' then raise exception 'INVALID_INPUT';end if;
  if exists(select 1 from jsonb_array_elements(payload->'evidence') e where jsonb_typeof(e)<>'string' or length(e#>>'{}')>2000 or (e#>>'{}') !~ '^https://[^/@[:space:]]+([/?#][^[:space:]]*)?$') then raise exception 'INVALID_INPUT';end if;
  insert into manage_private.deliverables(task_id,module_id,submitted_by,task_revision,summary,version,evidence,branch,commit,workspace) values(t.id,module,p.id,t.revision+1,payload->>'summary',payload->>'version',payload->'evidence',payload->>'branch',payload->>'commit',payload->>'workspace') returning id into next_id;
  update manage_private.tasks set state='submitted',revision=revision+1,updated_at=now(),current_deliverable_id=next_id where id=t.id returning * into t;
 else
  if p.kind<>'founder' or p.id<>t.approver_id then raise exception 'ACCESS_DENIED';end if;
  if t.state<>'submitted' then raise exception 'STATE_CONFLICT';end if;
  if (payload->>'deliverableId')::uuid is distinct from t.current_deliverable_id then raise exception 'DELIVERABLE_MISMATCH';end if;
  if payload->>'decision' not in ('accepted','changes_requested') then raise exception 'INVALID_INPUT';end if;
  insert into manage_private.reviews(task_id,module_id,deliverable_id,reviewer_id,task_revision,decision,note) values(t.id,module,t.current_deliverable_id,p.id,t.revision,payload->>'decision',payload->>'note');
  update manage_private.tasks set state=case when payload->>'decision'='accepted' then 'accepted' else 'in_progress' end,revision=revision+1,updated_at=now() where id=t.id returning * into t;
 end if;
 insert into manage_private.activity(module_id,actor_id,task_id,operation,revision,note) values(module,p.id,t.id,case when op='setState' then 'state:'||t.state when op='review' then 'review:'||(payload->>'decision') else op end,t.revision,case when op='setState' then payload->>'note' else null end);
 output:=jsonb_build_object('taskId',t.id,'revision',t.revision,'moduleId',t.module_id,'deliverableId',t.current_deliverable_id);
 insert into manage_private.requests values(p.id,request_key,payload,output,now());return output;
end $$;
create function public.manage_snapshot() returns jsonb language sql security invoker set search_path='' as $$select manage_private.snapshot();$$;
create function public.manage_command(payload jsonb,request_key text) returns jsonb language sql security invoker set search_path='' as $$select manage_private.command(payload,request_key);$$;
revoke all on all functions in schema manage_private from public,anon,authenticated;
grant execute on function manage_private.snapshot(),manage_private.command(jsonb,text) to authenticated;
revoke all on function public.manage_snapshot(),public.manage_command(jsonb,text) from public,anon;
grant execute on function public.manage_snapshot(),public.manage_command(jsonb,text) to authenticated;
commit;

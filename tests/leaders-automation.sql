-- Integration assertions. All fixtures and mutations roll back, including jobs and drafts.
begin;
set local role service_role;
do $$
declare
 owner uuid; first_item uuid; second_item uuid; edited_item uuid; stopped_item uuid;
 first_job uuid; second_job uuid; edited_job uuid; stopped_job uuid;
 lease_a uuid:=gen_random_uuid(); lease_b uuid:=gen_random_uuid(); r jsonb; before_posts bigint; i integer;
 result jsonb:=jsonb_build_object('draft',jsonb_build_object('title','Automation fixture','body',repeat('Grounded test evidence. ',5),'claims',jsonb_build_array(jsonb_build_object('claim','Grounded test evidence','evidence_quote','Grounded test evidence'))),'model','test-fixture');
begin
 select user_id into owner from public.leaders_editors order by user_id limit 1;
 if owner is null then raise exception 'Test requires an existing editor'; end if;
 select count(*) into before_posts from public.leaders_posts;
 insert into public.leaders_automation_settings(owner_id) values(owner) on conflict do nothing;
 update public.leaders_automation_settings set enabled=false where owner_id=owner;
 r:=public.leaders_queue_drafts(owner,false);
 assert r->>'status'='paused','Paused schedule must not queue';
 assert (select last_tick_at is not null from public.leaders_automation_settings where owner_id=owner),'Scheduler heartbeat';
 insert into public.leaders_editorial_items(owner_id,character_id,source_url,source_label,source_title,source_excerpt,created_at)
 values(owner,'tiko','https://example.test/'||gen_random_uuid(),'Fixture','First',repeat('Evidence. ',20),'2000-01-01') returning id into first_item;
 insert into public.leaders_editorial_items(owner_id,character_id,source_url,source_label,source_title,source_excerpt,created_at)
 values(owner,'labo','https://example.test/'||gen_random_uuid(),'Fixture','Second',repeat('Evidence. ',20),'2000-01-02') returning id into second_item;
 r:=public.leaders_queue_drafts(owner,true);
 assert jsonb_array_length(r->'jobs')=2,'Manual cycle queues two sources';
 select id into first_job from public.leaders_editorial_jobs where item_id=first_item;
 select id into second_job from public.leaders_editorial_jobs where item_id=second_item;
 assert first_job is not null and second_job is not null,'Oldest sources selected';
 r:=public.leaders_queue_drafts(owner,true);
 assert r->>'status'='daily_limit' and jsonb_array_length(r->'jobs')=0,'Duplicate cycle cannot exceed quota';
 r:=public.leaders_claim_draft(first_job,owner,lease_a,'fixture-run-a');
 assert r->>'status'='claimed','First lease acquired';
 r:=public.leaders_claim_draft(first_job,owner,lease_b,'fixture-run-b');
 assert r->>'status'='busy','Live lease cannot be acquired twice';
 update public.leaders_editorial_jobs set lease_until=now()-interval '1 second' where id=first_job;
 r:=public.leaders_claim_draft(first_job,owner,lease_b,'fixture-run-b');
 assert r->>'status'='claimed','Expired lease can recover';
 begin
  perform public.leaders_finish_draft(first_job,owner,lease_a,result);
  raise exception 'Stale lease was incorrectly accepted';
 exception when raise_exception then
  if sqlerrm<>'LEASE_CONFLICT' then raise; end if;
 end;
 r:=public.leaders_finish_draft(first_job,owner,lease_b,result);
 assert r->>'status'='succeeded','Current lease completes';
 r:=public.leaders_finish_draft(first_job,owner,lease_b,result);
 assert r->>'status'='succeeded','Completion is idempotent';
 assert (select status='draft' and not source_checked and post_id is null from public.leaders_editorial_items where id=first_item),'Generated draft remains private and unchecked';
 for i in 1..3 loop
  lease_a:=gen_random_uuid();
  r:=public.leaders_claim_draft(second_job,owner,lease_a,'fixture-retry');
  assert r->>'status'='claimed','Retry acquired';
  r:=public.leaders_finish_draft(second_job,owner,lease_a,'{"error":"MODEL_TIMEOUT","retryable":true}');
  assert r->>'status'=case when i<3 then 'retry' else 'failed' end,'Only three attempts allowed';
 end loop;
 r:=public.leaders_claim_draft(second_job,owner,gen_random_uuid(),'fixture-after-limit');
 assert r->>'status'='failed','Failed jobs cannot run a fourth attempt';
 insert into public.leaders_editorial_items(owner_id,character_id,source_url,source_label,source_title,source_excerpt)
 values(owner,'tiko','https://example.test/'||gen_random_uuid(),'Fixture','Edited',repeat('Evidence. ',20)) returning id into edited_item;
 insert into public.leaders_editorial_jobs(owner_id,item_id,source_revision,origin)
 values(owner,edited_item,0,'manual') returning id into edited_job;
 lease_a:=gen_random_uuid();
 perform public.leaders_claim_draft(edited_job,owner,lease_a,'fixture-edit');
 update public.leaders_editorial_items set revision=revision+1,source_title='Human edit' where id=edited_item;
 r:=public.leaders_finish_draft(edited_job,owner,lease_a,result);
 assert r->>'status'='cancelled','Late completion cannot overwrite newer revision';
 assert (select draft is null and source_title='Human edit' from public.leaders_editorial_items where id=edited_item),'Human edit preserved';
 insert into public.leaders_editorial_items(owner_id,character_id,source_url,source_label,source_title,source_excerpt)
 values(owner,'labo','https://example.test/'||gen_random_uuid(),'Fixture','Stopped',repeat('Evidence. ',20)) returning id into stopped_item;
 insert into public.leaders_editorial_jobs(owner_id,item_id,source_revision,origin)
 values(owner,stopped_item,0,'schedule') returning id into stopped_job;
 r:=public.leaders_claim_draft(stopped_job,owner,gen_random_uuid(),'fixture-stopped');
 assert r->>'status'='cancelled','Pause blocks queued scheduled jobs';
 assert (select count(*) from public.leaders_posts)=before_posts,'Automation never creates public posts';
 assert not has_function_privilege('authenticated','public.leaders_claim_draft(uuid,uuid,uuid,text)','EXECUTE'),'Editors cannot invoke worker';
 assert not has_function_privilege('anon','public.leaders_queue_drafts(uuid,boolean)','EXECUTE'),'Visitors cannot queue';
 assert not has_table_privilege('authenticated','public.leaders_editorial_jobs','INSERT'),'Editors cannot forge jobs';
end;$$;
reset role;
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}',true);
do $$begin
 assert (select count(*) from public.leaders_editorial_jobs)=0,'Unrelated account cannot read jobs';
 assert (select count(*) from public.leaders_automation_settings)=0,'Unrelated account cannot read settings';
end;$$;
reset role;
select 'All automation assertions passed; fixture transaction rolled back' as result;
rollback;

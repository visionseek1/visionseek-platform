import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {setTimeout as pause} from 'node:timers/promises';

// Destructive setup is allowed only in this dedicated, loopback-only CI database.
const connection=process.env.MANAGE_TEST_DATABASE_URL;
assert.ok(connection,'MANAGE_TEST_DATABASE_URL is required');
const target=new URL(connection);
assert.ok(['postgres:','postgresql:'].includes(target.protocol));
assert.ok(['127.0.0.1','localhost'].includes(target.hostname),'Local test server only');
assert.equal(target.pathname,'/visionseek_manage_test','Dedicated disposable database required');
const actor='11111111-1111-4111-8111-111111111111';
const quote=value=>`'${String(value).replaceAll("'","''")}'`;
const processes=new Set();
function start(sql,app='manage-check',interactive=false){
 const child=spawn('psql',[connection,'-X','-qAt','-v','ON_ERROR_STOP=1'],{env:{...process.env,PGAPPNAME:app},stdio:['pipe','pipe','pipe']});
 processes.add(child);let out='',err='';
 child.stdout.on('data',data=>out+=data);child.stderr.on('data',data=>err+=data);
 const done=new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',code=>{processes.delete(child);resolve({code,out:out.trim(),err});});});
 if(interactive)child.stdin.write(sql);else child.stdin.end(sql);
 return {child,done,output:()=>out};
}
async function query(sql){const result=await start(sql).done;assert.equal(result.code,0,result.err);return result.out;}
async function until(predicate,message){const end=Date.now()+8000;while(Date.now()<end){if(await predicate())return;await pause(25);}throw new Error(message);}
function command(payload,key){return `begin;set local role authenticated;select set_config('request.jwt.claim.sub',${quote(actor)},true);select set_config('request.jwt.claims','{}',true);select public.manage_command(${quote(JSON.stringify(payload))}::jsonb,${quote(key)});commit;`;}
const resultJson=result=>JSON.parse(result.out.split('\n').at(-1));
const create=title=>({type:'createTask',moduleId:'leaders',title,goal:'isolated concurrency check',inputs:'synthetic only',acceptance:'one atomic result',executorId:actor,approverId:actor,dueAt:null});
async function race(lockSql,first,second){
 const holder=start(`begin;${lockSql};\n\\echo LOCK_READY\n`,'manage-holder',true);
 await until(()=>holder.output().includes('LOCK_READY'),'Holder did not acquire lock');
 const a=start(first,'manage-write-a'),b=start(second,'manage-write-b');
 try{
  await until(async()=>Number(await query("select count(*) from pg_stat_activity where application_name in ('manage-write-a','manage-write-b') and wait_event_type='Lock'"))===2,'Both independent connections must be blocked before release');
  holder.child.stdin.end('commit;\n');await holder.done;
  return await Promise.all([a.done,b.done]);
 }finally{for(const process of [holder,a,b]){if(process.child.exitCode===null)process.child.kill('SIGTERM');}}
}
try{
 assert.equal(await query("select current_database()"),'visionseek_manage_test');
 assert.equal(await query("select to_regnamespace('manage_private') is null and to_regnamespace('auth') is null"),'t','Use a fresh test database');
 await query(`create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function auth.jwt() returns jsonb language sql as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;grant usage on schema auth to authenticated,anon;grant execute on all functions in schema auth to authenticated,anon;`);
 await query(await readFile(new URL('../db/visionseek-manage.sql',import.meta.url),'utf8'));
 await query(`insert into auth.users values(${quote(actor)});insert into manage_private.principals(id,auth_user_id,display_name,kind,enabled) values(${quote(actor)},${quote(actor)},'synthetic owner','founder',true);`);
 const task=resultJson(await start(command(create('original'),'concurrency-create-0001')).done);
 const edit={...create('first edit'),type:'editTask',taskId:task.taskId,revision:task.revision};delete edit.moduleId;
 let results=await race(`select id from manage_private.tasks where id=${quote(task.taskId)} for update`,command(edit,'concurrency-edit-0001'),command({...edit,title:'second edit'},'concurrency-edit-0002'));
 assert.equal(results.filter(r=>r.code===0).length,1);assert.match(results.find(r=>r.code!==0).err,/REVISION_CONFLICT/);
 assert.equal(await query(`select revision from manage_private.tasks where id=${quote(task.taskId)}`),String(task.revision+1));
 assert.equal(await query(`select count(*) from manage_private.activity where task_id=${quote(task.taskId)}`),'2');
 console.log('PASS: two genuinely blocked writers yield one revision and one conflict');
 const replayKey='concurrency-replay-0001',payload=create('replayed create');
 results=await race(`select pg_advisory_xact_lock(hashtextextended(${quote(`${actor}:${replayKey}`)},0))`,command(payload,replayKey),command(payload,replayKey));
 assert.ok(results.every(r=>r.code===0),results.map(r=>r.err).join('\n'));assert.deepEqual(resultJson(results[0]),resultJson(results[1]));
 const replayed=resultJson(results[0]);
 assert.equal(await query(`select count(*) from manage_private.tasks where id=${quote(replayed.taskId)}`),'1');
 assert.equal(await query(`select count(*) from manage_private.activity where task_id=${quote(replayed.taskId)}`),'1');
 console.log('PASS: concurrent identical requests return one task and one audit event');
 const conflictKey='concurrency-replay-0002';
 results=await race(`select pg_advisory_xact_lock(hashtextextended(${quote(`${actor}:${conflictKey}`)},0))`,command(create('payload one'),conflictKey),command(create('payload two'),conflictKey));
 assert.equal(results.filter(r=>r.code===0).length,1);assert.match(results.find(r=>r.code!==0).err,/IDEMPOTENCY_CONFLICT/);
 assert.equal(await query(`select count(*) from manage_private.requests where request_key=${quote(conflictKey)}`),'1');
 console.log('PASS: concurrent different payloads sharing one key reject the second payload');
 console.log('NATIVE_POSTGRES_CONCURRENCY_PASS');
}finally{for(const child of processes)child.kill('SIGTERM');}

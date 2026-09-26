import {createClient} from '@supabase/supabase-js';
import {randomUUID,timingSafeEqual} from 'node:crypto';
import {z} from 'zod';
import {tasks} from '@trigger.dev/sdk';
import {RoomError,databaseError} from './server';
import {generationConfig,generateDraft} from './generate';
import {transientModelError} from './automation-contract';
import type {EditorialItem} from './schema';
const required=['OPENROUTER_API_KEY','LEADERS_EDITORIAL_MODEL','SUPABASE_SERVICE_ROLE_KEY','TRIGGER_SECRET_KEY','LEADERS_AUTOMATION_SECRET','LEADERS_AUTOMATION_OWNER_ID'] as const;
export function automationConfig(){
 const missing:string[]=required.filter(key=>!process.env[key]);
 if(process.env.LEADERS_AUTOMATION_SECRET&&process.env.LEADERS_AUTOMATION_SECRET.length<32)missing.push('LEADERS_AUTOMATION_SECRET');
 if(process.env.LEADERS_AUTOMATION_OWNER_ID&&!z.string().uuid().safeParse(process.env.LEADERS_AUTOMATION_OWNER_ID).success)missing.push('LEADERS_AUTOMATION_OWNER_ID');
 return {configured:missing.length===0,missing:[...new Set(missing)],model:generationConfig().model,daily_limit:2};
}
export function automationOwner(){const owner=process.env.LEADERS_AUTOMATION_OWNER_ID;if(!owner||!z.string().uuid().safeParse(owner).success)throw new RoomError(503,'AUTOMATION_NOT_CONFIGURED');return owner;}
export function requireAutomation(){if(!automationConfig().configured)throw new RoomError(503,'AUTOMATION_NOT_CONFIGURED');}
export function requireIntegration(request:Request){
 const secret=process.env.LEADERS_AUTOMATION_SECRET;
 if(!secret||secret.length<32)throw new RoomError(503,'AUTOMATION_NOT_CONFIGURED');
 const provided=request.headers.get('authorization')||'';const expected=`Bearer ${secret}`;
 if(Buffer.byteLength(provided)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(provided),Buffer.from(expected)))throw new RoomError(401,'INTEGRATION_REQUIRED');
}
function admin(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw new RoomError(503,'AUTOMATION_NOT_CONFIGURED');
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
}
async function member(owner:string){
 const client=admin();const result=await client.from('leaders_editors').select('user_id').eq('user_id',owner).maybeSingle();
 if(result.error)databaseError(result.error.code,result.error.message);
 if(!result.data)throw new RoomError(403,'EDITOR_REQUIRED');return client;
}
export async function dispatchDrafts(manual:boolean){
 requireAutomation();const owner=automationOwner(),client=await member(owner);
 const queued=await client.rpc('leaders_queue_drafts',{p_owner:owner,p_manual:manual});
 if(queued.error)databaseError(queued.error.code,queued.error.message);
 if(queued.data.status==='paused')return {status:'paused',queued:0,dispatched:0};
 // Recover an interrupted dispatch, and retry expired worker leases with the same job ID.
 const pending=await client.from('leaders_editorial_jobs').select('id,status,attempts,lease_until,trigger_run_id')
  .eq('owner_id',owner).in('status',['queued','running']).order('created_at').limit(10);
 if(pending.error)databaseError(pending.error.code,pending.error.message);
 let dispatched=0;
 for(const job of pending.data||[]){
  if(job.status==='running'&&job.lease_until&&Date.parse(job.lease_until)>Date.now())continue;
  try{
   const handle=await tasks.trigger('leaders-house-draft',{job_id:job.id},{idempotencyKey:`leaders-draft-${job.id}-${job.attempts}`,idempotencyKeyTTL:'24h',queue:'leaders-house-editorial',ttl:'24h'});
   const updated=await client.from('leaders_editorial_jobs').update({trigger_run_id:handle.id,last_error:null,updated_at:new Date().toISOString()}).eq('id',job.id).eq('owner_id',owner).in('status',['queued','running']);
   if(updated.error)databaseError(updated.error.code,updated.error.message);dispatched++;
  }catch{
   await client.from('leaders_editorial_jobs').update({last_error:'TRIGGER_DISPATCH_FAILED',updated_at:new Date().toISOString()}).eq('id',job.id).eq('owner_id',owner).eq('status','queued');
  }
 }
 return {status:dispatched?'dispatched':pending.data?.length?'dispatch_pending':queued.data.status,queued:queued.data.jobs.length,dispatched};
}
export async function executeDraft(jobId:string,runId:string){
 requireAutomation();const owner=automationOwner(),client=await member(owner),lease=randomUUID();
 const claimed=await client.rpc('leaders_claim_draft',{p_job:jobId,p_owner:owner,p_lease:lease,p_run:runId});
 if(claimed.error)databaseError(claimed.error.code,claimed.error.message);
 if(claimed.data.status!=='claimed')return {status:claimed.data.status as string};
 let generated:Awaited<ReturnType<typeof generateDraft>>;
 try{generated=await generateDraft(claimed.data.item as EditorialItem);}
 catch(error){
  const code=error instanceof RoomError?error.code:'MODEL_OUTPUT_INVALID';
  const failed=await client.rpc('leaders_finish_draft',{p_job:jobId,p_owner:owner,p_lease:lease,p_result:{error:code,retryable:transientModelError(code)}});
  if(failed.error)databaseError(failed.error.code,failed.error.message);
  return {status:failed.data.status as string,error:code};
 }
 // Keep completion outside the provider catch: a lost database response must never mark a saved draft failed.
 const finished=await client.rpc('leaders_finish_draft',{p_job:jobId,p_owner:owner,p_lease:lease,p_result:generated});
 if(finished.error)databaseError(finished.error.code,finished.error.message);
 return {status:finished.data.status as string};
}
export async function checkModelConnection(){
 const config=generationConfig();if(!config.configured)throw new RoomError(503,'MODEL_NOT_CONFIGURED');
 const result=await fetch('https://openrouter.ai/api/v1/key',{headers:{Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`},signal:AbortSignal.timeout(12000),cache:'no-store'});
 if(!result.ok)throw new RoomError(502,'MODEL_ACCESS_FAILED');
 const key=await result.json();if(typeof key.data?.limit_remaining==='number'&&key.data.limit_remaining<=0)throw new RoomError(402,'MODEL_CREDIT_REQUIRED');
 const catalog=await fetch('https://openrouter.ai/api/v1/models',{signal:AbortSignal.timeout(12000),cache:'no-store'});
 if(!catalog.ok)throw new RoomError(502,'MODEL_CATALOG_UNAVAILABLE');
 const models=await catalog.json();const model=models.data?.find((m:{id:string})=>m.id===config.model);
 if(!model?.supported_parameters?.includes('structured_outputs'))throw new RoomError(422,'MODEL_UNSUPPORTED');
 return {status:'verified',model:config.model,checked_at:new Date().toISOString()};
}

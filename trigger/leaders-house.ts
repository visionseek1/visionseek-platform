import {schemaTask,AbortTaskRunError} from '@trigger.dev/sdk';
import {z} from 'zod';
export const leadersHouseDraft=schemaTask({
 id:'leaders-house-draft',
 schema:z.object({job_id:z.string().uuid()}).strict(),
 queue:{name:'leaders-house-editorial',concurrencyLimit:1},
 maxDuration:600,
 run:async(payload,{ctx})=>{
  const base=process.env.LEADERS_APP_URL,secret=process.env.LEADERS_AUTOMATION_SECRET;
  if(!base||!secret||secret.length<32)throw new AbortTaskRunError('EDITORIAL_CONNECTION_NOT_CONFIGURED');
  const url=new URL(base);
  if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash||url.pathname!=='/')throw new AbortTaskRunError('EDITORIAL_ORIGIN_INVALID');
  const headers:Record<string,string>={Authorization:`Bearer ${secret}`,'Content-Type':'application/json'};
  if(process.env.VERCEL_AUTOMATION_BYPASS_SECRET)headers['x-vercel-protection-bypass']=process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  const response=await fetch(new URL('/api/leaders/automation/run',url),{method:'POST',headers,redirect:'error',signal:AbortSignal.timeout(70000),body:JSON.stringify({job_id:payload.job_id,run_id:ctx.run.id})});
  if(response.status===401||response.status===403)throw new AbortTaskRunError('EDITORIAL_CONNECTION_DENIED');
  if(!response.ok)throw new Error('EDITORIAL_REQUEST_FAILED');
  const result=z.object({status:z.string(),error:z.string().optional()}).parse(await response.json());
  if(result.status==='busy'||result.status==='retry')throw new Error('EDITORIAL_RETRY');
  if(result.status==='failed'||result.status==='cancelled')throw new AbortTaskRunError(result.error||'EDITORIAL_DRAFT_STOPPED');
  if(result.status!=='succeeded')throw new Error('EDITORIAL_UNEXPECTED_STATE');
  return {job_id:payload.job_id,status:'draft_ready_for_human_review'};
 },
});

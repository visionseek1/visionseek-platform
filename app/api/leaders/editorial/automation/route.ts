import {editorContext,roomResponse,fail,readJson,databaseError,RoomError} from '@/lib/leaders/editorial/server';
import {automationConfig,automationOwner,dispatchDrafts,checkModelConnection} from '@/lib/leaders/editorial/automation';
import {automationAction} from '@/lib/leaders/editorial/automation-contract';
export const runtime='nodejs';export const maxDuration=60;
export async function GET(request:Request){try{
 const {client,user}=await editorContext(request);
 const [settings,jobs]=await Promise.all([
  client.from('leaders_automation_settings').select('enabled,last_tick_at,last_worker_at').eq('owner_id',user.id).maybeSingle(),
  client.from('leaders_editorial_jobs').select('id,item_id,origin,status,attempts,trigger_run_id,last_error,usage,created_at,updated_at').eq('owner_id',user.id).order('created_at',{ascending:false}).limit(20),
 ]);
 if(settings.error)databaseError(settings.error.code,settings.error.message);if(jobs.error)databaseError(jobs.error.code,jobs.error.message);
 return roomResponse({...automationConfig(),owner_matches:process.env.LEADERS_AUTOMATION_OWNER_ID===user.id,enabled:settings.data?.enabled??false,last_tick_at:settings.data?.last_tick_at??null,last_worker_at:settings.data?.last_worker_at??null,jobs:jobs.data});
}catch(error){return fail(error);}}
export async function POST(request:Request){try{
 const {client,user}=await editorContext(request);const input=automationAction.parse(await readJson(request));
 if(input.action==='check_model')return roomResponse(await checkModelConnection());
 if(input.action==='set_enabled'){
  if(input.enabled&&(!automationConfig().configured||automationOwner()!==user.id))throw new RoomError(503,'AUTOMATION_NOT_CONFIGURED');
  const existing=await client.from('leaders_automation_settings').select('owner_id').eq('owner_id',user.id).maybeSingle();
  if(existing.error)databaseError(existing.error.code,existing.error.message);
  if(!existing.data){const created=await client.from('leaders_automation_settings').insert({owner_id:user.id});if(created.error)databaseError(created.error.code,created.error.message);}
  const saved=await client.from('leaders_automation_settings').update({enabled:input.enabled}).eq('owner_id',user.id);
  if(saved.error)databaseError(saved.error.code,saved.error.message);return roomResponse({enabled:input.enabled});
 }
 if(automationOwner()!==user.id)throw new RoomError(403,'EDITOR_REQUIRED');
 return roomResponse(await dispatchDrafts(true));
}catch(error){return fail(error);}}

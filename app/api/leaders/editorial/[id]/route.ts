import {z} from 'zod';
import {editorContext,roomResponse,fail,readJson,databaseError,RoomError} from '@/lib/leaders/editorial/server';
import {actionSchema,validateDraft,type EditorialItem} from '@/lib/leaders/editorial/schema';
import {generateDraft,generationConfig} from '@/lib/leaders/editorial/generate';
export const runtime='nodejs';export const maxDuration=60;
type Context={params:Promise<{id:string}>};
export async function PATCH(request:Request,context:Context){try{
 const {client}=await editorContext(request);const id=z.string().uuid().parse((await context.params).id);const payload=actionSchema.parse(await readJson(request));
 if(payload.action==='save'){
  const {data,error}=await client.from('leaders_editorial_items').select('source_excerpt').eq('id',id).single();
  if(error)throw new RoomError(404,'NOT_FOUND');validateDraft(payload.draft,data.source_excerpt);
 }
 const {data,error}=await client.rpc('leaders_editorial_action',{p_id:id,p_revision:payload.revision,p_action:payload.action,p_payload:payload});
 if(error)databaseError(error.code,error.message);return roomResponse({item:data});
}catch(error){return fail(error);}}
export async function POST(request:Request,context:Context){try{
 const {client}=await editorContext(request);const id=z.string().uuid().parse((await context.params).id);const {revision}=z.object({revision:z.number().int().nonnegative()}).strict().parse(await readJson(request));
 if(!generationConfig().configured)throw new RoomError(503,'MODEL_NOT_CONFIGURED');
 const started=await client.rpc('leaders_editorial_action',{p_id:id,p_revision:revision,p_action:'begin_generation'});
 if(started.error)databaseError(started.error.code,started.error.message);
 const item=started.data as EditorialItem;
 try{
  const generated=await generateDraft(item);const result=await client.rpc('leaders_editorial_action',{p_id:id,p_revision:item.revision,p_action:'complete_generation',p_payload:generated});
  if(result.error)databaseError(result.error.code,result.error.message);return roomResponse({item:result.data});
 }catch(error){
  await client.rpc('leaders_editorial_action',{p_id:id,p_revision:item.revision,p_action:'generation_failed',p_payload:{error:error instanceof RoomError?error.code:'MODEL_FAILED'}});
  throw error;
 }
}catch(error){return fail(error);}}

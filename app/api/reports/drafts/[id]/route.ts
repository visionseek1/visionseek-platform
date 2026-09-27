import {z} from 'zod';
import {editorContext,roomResponse,fail,readJson,RoomError} from '@/lib/leaders/editorial/server';
import {updateDraftSchema,reviewGaps} from '@/lib/reports/drafts';
export const runtime='nodejs';
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){try{
 const {client}=await editorContext(request);const id=z.string().uuid().parse((await params).id);const payload=updateDraftSchema.parse(await readJson(request));
 if(payload.status==='review'&&!Object.values(reviewGaps(payload.content)).every(Boolean))throw new RoomError(422,'INCOMPLETE_REVIEW_DRAFT');
 const {data,error}=await client.from('reports_drafts').update({content:payload.content,status:payload.status}).eq('id',id).eq('revision',payload.revision).select('*').maybeSingle();
 if(error)throw new RoomError(error.code==='42501'?403:503,error.code==='42501'?'EDITOR_REQUIRED':'DATABASE_UNAVAILABLE');
 if(!data)throw new RoomError(409,'REVISION_CONFLICT');return roomResponse({item:data});
}catch(error){return fail(error);}}

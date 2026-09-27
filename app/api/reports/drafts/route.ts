import {editorContext,roomResponse,fail,readJson,RoomError} from '@/lib/leaders/editorial/server';
import {createDraftSchema} from '@/lib/reports/drafts';
export const runtime='nodejs';
function dbError(code?:string):never{throw new RoomError(code==='42501'?403:code==='23505'?409:503,code==='23505'?'DRAFT_EXISTS':code==='42P01'||code==='PGRST205'?'REPORTS_NOT_INSTALLED':code==='42501'?'EDITOR_REQUIRED':'DATABASE_UNAVAILABLE');}
export async function GET(request:Request){try{const {client}=await editorContext(request);const {data,error}=await client.from('reports_drafts').select('*').order('updated_at',{ascending:false}).limit(200);if(error)dbError(error.code);return roomResponse({items:data});}catch(error){return fail(error);}}
export async function POST(request:Request){try{const {client,user}=await editorContext(request);const payload=createDraftSchema.parse(await readJson(request));const {data,error}=await client.from('reports_drafts').insert({id:payload.id,owner_id:user.id,content:payload.content,status:'draft'}).select('*').single();if(error)dbError(error.code);return roomResponse({item:data},201);}catch(error){return fail(error);}}

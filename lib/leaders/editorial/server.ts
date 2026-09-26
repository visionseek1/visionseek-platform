import {createClient} from '@supabase/supabase-js';
import {ZodError} from 'zod';
export class RoomError extends Error {constructor(public status:number,public code:string){super(code);}}
export async function editorContext(request:Request){
 const header=request.headers.get('authorization');
 if(!header?.startsWith('Bearer ')||header.length>10000)throw new RoomError(401,'SIGN_IN_REQUIRED');
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key)throw new RoomError(503,'DATABASE_NOT_CONFIGURED');
 const token=header.slice(7);const client=createClient(url,key,{global:{headers:{Authorization:`Bearer ${token}`}},auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
 const {data,error}=await client.auth.getUser(token);
 if(error||!data.user)throw new RoomError(401,'SIGN_IN_REQUIRED');
 const membership=await client.from('leaders_editors').select('user_id').eq('user_id',data.user.id).maybeSingle();
 if(membership.error)throw new RoomError(503,'DATABASE_UNAVAILABLE');
 if(!membership.data)throw new RoomError(403,'EDITOR_REQUIRED');
 return {client,user:data.user};
}
export function roomResponse(body:unknown,status=200){return Response.json(body,{status,headers:{'Cache-Control':'private, no-store','X-Robots-Tag':'noindex'}});}
export function fail(error:unknown){
 if(error instanceof RoomError)return roomResponse({error:error.code},error.status);
 if(error instanceof ZodError)return roomResponse({error:'INVALID_INPUT'},400);
 if(error instanceof Error&&error.message==='EVIDENCE_MISMATCH')return roomResponse({error:'EVIDENCE_MISMATCH'},422);
 return roomResponse({error:'REQUEST_FAILED'},500);
}
export async function readJson(request:Request){
 if(!request.headers.get('content-type')?.includes('application/json'))throw new RoomError(415,'JSON_REQUIRED');
 if(Number(request.headers.get('content-length')||0)>100000)throw new RoomError(413,'INPUT_TOO_LARGE');
 const reader=request.body?.getReader();if(!reader)throw new RoomError(400,'INVALID_INPUT');
 let bytes=0;const chunks:Uint8Array[]=[];
 for(;;){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>100000){await reader.cancel();throw new RoomError(413,'INPUT_TOO_LARGE');}chunks.push(value);}
 try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new RoomError(400,'INVALID_INPUT');}
}
export function databaseError(code?:string,message?:string):never{
 if(code==='23505')throw new RoomError(409,'DUPLICATE_SOURCE');
 if(message?.includes('REVISION_CONFLICT'))throw new RoomError(409,'REVISION_CONFLICT');
 if(message?.includes('GENERATION_BUSY'))throw new RoomError(409,'GENERATION_BUSY');
 if(message?.includes('REVIEW_REQUIRED'))throw new RoomError(422,'REVIEW_REQUIRED');
 if(message?.includes('STATE_CONFLICT'))throw new RoomError(409,'STATE_CONFLICT');
 if(code==='42P01'||code==='PGRST205'||code==='PGRST202')throw new RoomError(503,'ROOM_NOT_INSTALLED');
 if(code==='42501')throw new RoomError(403,'EDITOR_REQUIRED');
 throw new RoomError(500,'DATABASE_UNAVAILABLE');
}

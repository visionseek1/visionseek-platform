import {editorContext,roomResponse,fail,readJson,databaseError} from '@/lib/leaders/editorial/server';
import {sourceSchema} from '@/lib/leaders/editorial/schema';
import {generationConfig} from '@/lib/leaders/editorial/generate';
export const runtime='nodejs';
export async function GET(request:Request){try{
 const {client}=await editorContext(request);const {data,error}=await client.from('leaders_editorial_items').select('*').order('updated_at',{ascending:false}).limit(200);
 if(error)databaseError(error.code,error.message);
 return roomResponse({items:data,generation:generationConfig()});
}catch(error){return fail(error);}}
export async function POST(request:Request){try{
 const {client,user}=await editorContext(request);const payload=sourceSchema.parse(await readJson(request));
 const canonical=new URL(payload.source_url);canonical.hash='';for(const key of [...canonical.searchParams.keys()])if(key.startsWith('utm_'))canonical.searchParams.delete(key);
 const {data,error}=await client.from('leaders_editorial_items').insert({...payload,source_url:canonical.href,owner_id:user.id,source_method:'manual'}).select('*').single();
 if(error)databaseError(error.code,error.message);return roomResponse({item:data},201);
}catch(error){return fail(error);}}

import {z} from 'zod';
import {editorContext,roomResponse,fail,readJson,databaseError} from '@/lib/leaders/editorial/server';
import {fetchCatalogSource} from '@/lib/leaders/editorial/sources';
export const runtime='nodejs';
export const maxDuration=30;
export async function POST(request:Request){try{
 const {client,user}=await editorContext(request);const {id}=z.object({id:z.string().max(60)}).strict().parse(await readJson(request));
 const source=await fetchCatalogSource(id);
 const {data,error}=await client.from('leaders_editorial_items').insert({...source,owner_id:user.id}).select('*').single();
 if(error)databaseError(error.code,error.message);return roomResponse({item:data},201);
}catch(error){return fail(error);}}

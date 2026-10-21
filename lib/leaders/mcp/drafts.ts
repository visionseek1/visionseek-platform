import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {RoomError,databaseError} from '@/lib/leaders/editorial/server';

export const draftInput = {
  title: z.string().trim().min(1).max(180),
  title_en: z.string().trim().max(180).optional(),
  body: z.string().trim().max(5000),
  body_en: z.string().trim().max(5000).optional(),
  topic: z.enum(['leadership','ai','strategy','capabilities','innovation']),
  source_url: z.string().trim().url().max(2000).refine(value => {
    try {const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password;}catch{return false;}
  }).optional(),
  source_label: z.string().trim().max(120).optional(),
  image_base64: z.string().max(2_000_000).optional(),
  image_mime: z.enum(['image/jpeg','image/png','image/webp']).optional(),
};

export type DraftInput = z.infer<z.ZodObject<typeof draftInput>>;

export function decodeImage(image?:string,mime?:string){
  if(!image&&!mime)return null;
  if(!image||!mime)throw new RoomError(400,'IMAGE_AND_MIME_REQUIRED');
  if(!/^[A-Za-z0-9+/]+={0,2}$/.test(image)||image.length%4!==0)throw new RoomError(400,'INVALID_IMAGE');
  const bytes=Buffer.from(image,'base64');
  if(!bytes.length||bytes.length>1_000_000)throw new RoomError(413,'IMAGE_TOO_LARGE');
  const valid=mime==='image/jpeg'?bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff
    :mime==='image/png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
    :mime==='image/webp'?bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP':false;
  if(!valid)throw new RoomError(400,'IMAGE_TYPE_MISMATCH');
  return {bytes,mime,extension:mime==='image/jpeg'?'jpg':mime==='image/png'?'png':'webp'};
}

// The client is scoped to the authenticated Supabase user, so existing editor RLS
// and private Storage policies apply. This function never accepts a status input.
export async function createDraft(client: import('@supabase/supabase-js').SupabaseClient,userId:string,input:DraftInput){
  const image=decodeImage(input.image_base64,input.image_mime);
  const path=image?`${userId}/${randomUUID()}.${image.extension}`:null;
  if(image&&path){
    const uploaded=await client.storage.from('leaders-media').upload(path,image.bytes,{contentType:image.mime,upsert:false});
    if(uploaded.error)throw new RoomError(503,'IMAGE_UPLOAD_FAILED');
  }
  const record={author_id:userId,title:input.title,title_en:input.title_en||null,body:input.body,body_en:input.body_en||null,
    kind:image?'image':'note',topic:input.topic,source_url:input.source_url||null,source_label:input.source_label||null,
    media_path:path,media_type:image?.mime||null,status:'draft',published_at:null,expires_at:null,featured:false,highlight:false};
  const {data,error}=await client.from('leaders_posts').insert(record).select('id,title,status,media_path').single();
  if(error){
    if(path)await client.storage.from('leaders-media').remove([path]);
    databaseError(error.code,error.message);
  }
  return {id:data.id,title:data.title,status:data.status,has_image:Boolean(data.media_path),studio_url:'https://visionseek.org/ar/insights/studio'};
}

export async function getDraft(client:import('@supabase/supabase-js').SupabaseClient,id:string){
  const {data,error}=await client.from('leaders_posts').select('id,title,title_en,body,body_en,kind,topic,source_url,source_label,status,media_path,created_at')
    .eq('id',id).eq('status','draft').maybeSingle();
  if(error)databaseError(error.code,error.message);
  if(!data)throw new RoomError(404,'DRAFT_NOT_FOUND');
  return {...data,has_image:Boolean(data.media_path),media_path:undefined,studio_url:'https://visionseek.org/ar/insights/studio'};
}

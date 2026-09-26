import type { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { LeaderPost, MEDIA_BUCKET, MEDIA_TYPES, MAX_MEDIA_BYTES } from './types';
let instance: SupabaseClient | null = null;
export function leadersClient() {
  if (!instance) instance = createSupabaseBrowserClient();
  return instance;
}
export async function withMedia(posts: LeaderPost[]) {
  const paths = [...new Set(posts.map(p => p.media_path).filter((p): p is string => !!p))];
  if (!paths.length) return posts;
  const {data,error} = await leadersClient().storage.from(MEDIA_BUCKET).createSignedUrls(paths, 3600);
  if (error) throw error;
  const urls = new Map(data?.map(p => [p.path, p.signedUrl]));
  return posts.map(p => ({...p,media_url:p.media_path ? (urls.get(p.media_path) || undefined) : p.media_url}));
}
export async function loadPosts({studio = false, before, limit = 24}: {studio?: boolean; before?: string; limit?:number} = {}) {
  let query = leadersClient().from('leaders_posts').select('*').order('created_at', {ascending:false}).limit(limit);
  if (!studio) query = query.eq('status','published');
  if (before) query = query.lt('created_at',before);
  const {data,error} = await query;
  if (error) throw error;
  return withMedia(data as LeaderPost[]);
}
export function validateMedia(file: File) {
  if (!MEDIA_TYPES.includes(file.type)) throw new Error('استخدم صورة JPG أو PNG أو WebP، أو فيديو MP4 أو WebM.');
  if (file.size > MAX_MEDIA_BYTES) throw new Error('حجم الملف أكبر من 50 ميجابايت. اختر نسخة أصغر.');
  if (!file.size) throw new Error('الملف فارغ.');
}
export async function videoDuration(file: File): Promise<number> {
  return new Promise((resolve,reject) => {
    const video=document.createElement('video'); const url=URL.createObjectURL(file);
    const done=()=>{URL.revokeObjectURL(url);video.removeAttribute('src');clearTimeout(timeout);};
    const timeout=setTimeout(()=>{done();reject(new Error('تعذر قراءة الفيديو. جرّب ملف MP4 متوافقًا.'));},10000);
    video.preload='metadata'; video.onloadedmetadata=()=>{const d=video.duration;done();if(Number.isFinite(d))resolve(d);else reject(new Error('تعذر قراءة مدة الفيديو.'));};
    video.onerror=()=>{done();reject(new Error('صيغة الفيديو غير قابلة للتشغيل في هذا المتصفح.'));};video.src=url;
  });
}
export async function uploadMedia(file:File,userId:string,onProgress:(n:number)=>void,signal:AbortSignal):Promise<string> {
  validateMedia(file);
  const {data:{session},error}=await leadersClient().auth.getSession();
  if(error || !session) throw new Error('انتهت جلسة الدخول. سجّل الدخول مجددًا.');
  const extensions:Record<string,string>={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','video/mp4':'mp4','video/webm':'webm'};
  const path=`${userId}/${crypto.randomUUID()}.${extensions[file.type]}`;
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  await new Promise<void>((resolve,reject)=>{
    const xhr=new XMLHttpRequest();
    const abort=()=>xhr.abort();
    if(signal.aborted){reject(new DOMException('Cancelled','AbortError'));return;}
    signal.addEventListener('abort',abort,{once:true});
    const finish=()=>signal.removeEventListener('abort',abort);
    xhr.open('POST',`${url}/storage/v1/object/${MEDIA_BUCKET}/${path}`);
    xhr.setRequestHeader('Authorization',`Bearer ${session.access_token}`);
    xhr.setRequestHeader('apikey',key);xhr.setRequestHeader('Content-Type',file.type);
    xhr.timeout=300000;
    xhr.upload.onprogress=e=>{if(e.lengthComputable)onProgress(Math.round(e.loaded/e.total*100));};
    xhr.onload=()=>{finish();if(xhr.status>=200 && xhr.status<300)resolve();else reject(new Error('تعذر رفع الملف. تحقق من الاتصال وصلاحية حسابك ثم أعد المحاولة.'));};
    xhr.onerror=()=>{finish();reject(new Error('انقطع الاتصال أثناء الرفع. يمكنك المحاولة مرة أخرى.'));};
    xhr.ontimeout=xhr.onerror;
    xhr.onabort=()=>{finish();reject(new DOMException('Cancelled','AbortError'));};
    xhr.send(file);
  });
  return path;
}

'use client';
import {useEffect,useState} from 'react';
import {Bookmark,Search,Share2} from 'lucide-react';
import {leadersClient,withMedia} from '@/lib/leaders/client';
import {isMedicalPublication,MEDICAL_FOCUS_FROM,MEDICAL_PUBLISHING_ID} from '@/lib/leaders/medical-focus';
import {postText,safeLink,type LeaderPost} from '@/lib/leaders/types';
import {PostMedia} from '@/components/leaders/media';
import {pick,type PublicLocale} from './locale';
import styles from './medical-feed.module.css';
const SAVED='vs-medical-reading-saved-v1';
export default function MedicalFeed({locale}:{locale:PublicLocale}){
 const t=(ar:string,en:string,ko:string)=>pick(locale,ar,en,ko);
 const [posts,setPosts]=useState<LeaderPost[]>([]),[status,setStatus]=useState<'loading'|'ready'|'error'>('loading');
 const [saved,setSaved]=useState<string[]>([]),[onlySaved,setOnlySaved]=useState(false),[query,setQuery]=useState(''),[notice,setNotice]=useState('');
 const [more,setMore]=useState(false),[loadingMore,setLoadingMore]=useState(false);
 async function load(before?:string){
  let q=leadersClient().from('leaders_posts').select('*').eq('status','published').eq('character_id',MEDICAL_PUBLISHING_ID).gte('published_at',MEDICAL_FOCUS_FROM).order('published_at',{ascending:false}).order('id',{ascending:false}).limit(25);
  // Cursor includes the UUID so equal publication times do not skip entries.
  if(before){const [date,id]=before.split('|');q=q.or(`published_at.lt.${date},and(published_at.eq.${date},id.lt.${id})`);}
  const {data,error}=await q;if(error)throw error;
  const rows=(data||[]) as LeaderPost[];const page=rows.slice(0,24);
  const media=await withMedia(page.filter(p=>isMedicalPublication(p)));
  return {media,more:rows.length>24,cursor:page.at(-1)?`${page.at(-1)!.published_at}|${page.at(-1)!.id}`:undefined};
 }
 const [cursor,setCursor]=useState<string>();
 useEffect(()=>{let active=true;void load().then(r=>{if(active){setPosts(r.media);setMore(r.more);setCursor(r.cursor);setStatus('ready');}}).catch(()=>{if(active)setStatus('error');});
  // Restore explicit saved-reading choices after hydration; this is browser state.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  try {const ids=JSON.parse(localStorage.getItem(SAVED)||'[]');if(Array.isArray(ids))setSaved(ids.filter(v=>typeof v==='string'));}catch{}
  return()=>{active=false;};
 },[]);
 async function next(){setLoadingMore(true);try{const r=await load(cursor);setPosts(p=>[...p,...r.media]);setMore(r.more);setCursor(r.cursor);setStatus('ready');}catch{setStatus('error');}finally{setLoadingMore(false);}}
 function toggle(id:string){const ids=saved.includes(id)?saved.filter(v=>v!==id):[...saved,id];setSaved(ids);try{localStorage.setItem(SAVED,JSON.stringify(ids));}catch{setNotice(t('تعذر الحفظ على هذا الجهاز.','Could not save on this device.','이 기기에 저장할 수 없습니다.'));}}
 async function share(post:LeaderPost){const url=new URL(window.location.href);url.search='';url.hash=`post-${post.id}`;try{await navigator.clipboard.writeText(url.href);setNotice(t('تم نسخ رابط القراءة.','Reading link copied.','글 링크를 복사했습니다.'));}catch{setNotice(url.href);}}
 const contentLocale=locale==='ar'?'ar':'en';
 const visible=posts.filter(p=>(!onlySaved||saved.includes(p.id))&&`${postText(p,contentLocale).title} ${postText(p,contentLocale).body}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 return <section className={styles.feed} aria-label={t('المنشورات الطبية والدوائية','Health & pharmaceutical publications','보건·제약 게시물')}>
  <div className={styles.tools}><label><Search size={18}/><span className="sr-only">{t('ابحث في القراءات','Search readings','글 검색')}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('ابحث في القراءات','Search readings','글 검색')}/></label><button aria-pressed={onlySaved} onClick={()=>setOnlySaved(!onlySaved)}><Bookmark size={18}/>{onlySaved?t('كل القراءات','All readings','모든 글'):t('المحفوظات','Saved','저장한 글')}</button></div>
  {status==='loading'&&<p role="status">{t('جارٍ تحميل القراءات المنشورة…','Loading published readings…','게시된 글을 불러오는 중…')}</p>}
  {status==='error'&&<p role="status">{t('تعذر تحميل أحدث القراءات الآن. يمكنك قراءة المحتوى التحريري أدناه أو إعادة المحاولة.','The latest readings could not load. You can read the editorial perspectives below or retry.','최신 글을 불러오지 못했습니다. 아래 편집 글을 읽거나 다시 시도할 수 있습니다.')} <button onClick={()=>window.location.reload()}>{t('أعد المحاولة','Retry','다시 시도')}</button></p>}
  {status==='ready'&&!visible.length&&<p>{onlySaved?t('لا توجد قراءات محفوظة ضمن المحتوى المحمّل.','No saved readings in the loaded content.','불러온 콘텐츠에 저장한 글이 없습니다.'):query?t('لا توجد نتائج مطابقة.','No matching readings.','일치하는 글이 없습니다.'):t('تظهر هنا القراءات الطبية والدوائية الجديدة عند نشرها.','New health and pharmaceutical readings appear here when published.','새 보건·제약 글이 게시되면 여기에 표시됩니다.')}</p>}
  <div className={styles.list}>{visible.map(post=>{const text=postText(post,contentLocale);const english=locale!=='ar'&&post.title_en&&post.body_en;return <article key={post.id} id={`post-${post.id}`} lang={english?'en':'ar'} dir={english?'ltr':'rtl'}><div className={styles.byline}><strong>VisionSeek</strong><span>{t('الصحة والدواء','Health & pharmaceuticals','보건·제약')}</span><time dateTime={post.published_at!}>{new Intl.DateTimeFormat(locale,{dateStyle:'medium'}).format(new Date(post.published_at!))}</time></div>{locale==='ko'&&<p lang="ko" dir="ltr" className={styles.languageNote}>이 게시물의 한국어 번역은 아직 준비되지 않았습니다. 원문을 표시합니다.</p>}<h2>{text.title}</h2>{post.media_url&&<PostMedia post={post} locale={contentLocale} preload="none"/>}<p className={styles.body}>{text.body}</p>{safeLink(post.source_url)&&<a href={safeLink(post.source_url)} target="_blank" rel="noreferrer">{post.source_label||t('المصدر','Source','출처')} ↗</a>}<div className={styles.actions}><button aria-pressed={saved.includes(post.id)} onClick={()=>toggle(post.id)}><Bookmark size={18} fill={saved.includes(post.id)?'currentColor':'none'}/>{t('حفظ','Save','저장')}</button><button onClick={()=>void share(post)}><Share2 size={18}/>{t('نسخ الرابط','Copy link','링크 복사')}</button></div></article>;})}</div>
  {more&&<button className={styles.load} disabled={loadingMore} onClick={()=>void next()}>{t('تحميل المزيد','Load more','더 보기')}</button>}
  {notice&&<p role="status">{notice}</p>}
 </section>;
}

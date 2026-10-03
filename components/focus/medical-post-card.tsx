'use client';
import Image from 'next/image';
import {useState} from 'react';
import {ArrowUpRight,Bookmark,BookOpen,Play,Share2,ThumbsUp} from 'lucide-react';
import {postText,safeLink,type LeaderPost} from '@/lib/leaders/types';
import {medicalReadings,medicalChannels,medicalChannel,type MedicalReading} from '@/lib/leaders/medical-edition';
import {pick,type PublicLocale} from './locale';
import styles from './medical-feed.module.css';

export function ReadingVisual({reading,locale,compact=false}:{reading:MedicalReading;locale:PublicLocale;compact?:boolean}){
 return <div className={`${styles.readingVisual} ${styles[reading.visual]} ${compact?styles.compactVisual:''}`}>
  {reading.visual==='lab'&&<Image src="/field-science.jpg" alt="" fill sizes={compact?'180px':'(max-width:760px) 100vw, 660px'}/>}
  <span className={styles.visualGrid} aria-hidden="true"/>
  <span className={styles.visualLabel}>{medicalChannels.find(c=>c.id===reading.channel)!.label[locale]}</span>
  <strong>{reading.title[locale]}</strong>
  <span className={styles.visualFooter}>VISIONSEEK <span>LEADERS HOUSE</span></span>
 </div>;
}
export function MedicalPostCard({post,locale,saved,liked,onSave,onLike,onShare,onRead,onVideo,onImage}:{post:LeaderPost;locale:PublicLocale;saved:boolean;liked:boolean;onSave:()=>void;onLike:()=>void;onShare:()=>void;onRead:()=>void;onVideo:()=>void;onImage:(url:string)=>void}){
 const [expanded,setExpanded]=useState(false),[failed,setFailed]=useState(false);
 const t=(ar:string,en:string,ko:string)=>pick(locale,ar,en,ko);
 const text=postText(post,locale==='ar'?'ar':'en');const reading=medicalReadings.find(r=>r.id===post.id);
 const source=safeLink(post.source_url),video=post.kind==='video';const cover=post.cover_url||post.poster_url||(!video?post.media_url:undefined);
 const original=!reading&&locale==='ko';
 return <article className={styles.post} id={`post-${post.id}`} aria-labelledby={`title-${post.id}`}>
  <header className={styles.postHead}><span className={styles.avatar}><Image src="/visionseek-symbol-color.png" alt="" width={30} height={30}/></span><div><strong>VisionSeek <span>{t('بيت القادة','Leaders House','리더스 하우스')}</span></strong><p>{medicalChannels.find(c=>c.id===medicalChannel(post))!.label[locale]}<span> · </span>{reading?t('قراءة تحريرية','Editorial reading','편집 글'):post.published_at?new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeZone:'Asia/Seoul'}).format(new Date(post.published_at)):''}</p></div><button className={styles.iconButton} aria-label={t('فتح القراءة','Open reading','글 열기')} onClick={onRead}><ArrowUpRight size={20}/></button></header>
  <div className={styles.postCopy} lang={original?(post.title_en?'en':'ar'):locale} dir={original&&!post.title_en?'rtl':locale==='ar'?'rtl':'ltr'}>
   {original&&<p className={styles.translationNotice} lang="ko">한국어 번역 전 원문입니다.</p>}
   <h2 id={`title-${post.id}`}><button onClick={onRead}>{text.title}</button></h2><p id={`body-${post.id}`} className={`${styles.postBody} ${expanded?'':styles.clamped}`}>{text.body}</p>
   <button className={styles.textButton} aria-expanded={expanded} aria-controls={`body-${post.id}`} onClick={()=>setExpanded(!expanded)}>{expanded?t('عرض أقل','Show less','접기'):t('عرض المزيد','Read more','더 보기')}</button>
  </div>
  {reading&&(reading.visual==='lab'||reading.id==='manufacturing-access')?<button className={styles.editorialCover} aria-label={text.title} onClick={onRead}><ReadingVisual reading={reading} locale={locale}/></button>:cover&&!failed?<button className={styles.mediaButton} onClick={()=>video?onVideo():onImage(cover)} aria-label={video?t('شاهد الفيديو','Watch video','영상 보기'):t('تكبير الصورة','Enlarge image','이미지 확대')}>
   {/* Authored media keeps its natural geometry; database does not store dimensions. */}
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={cover} alt={video?'':text.title} loading="lazy" decoding="async" onError={()=>setFailed(true)}/>{video&&<span className={styles.play}><Play size={28} fill="currentColor"/></span>}
  </button>:video?<button className={styles.videoFallback} onClick={onVideo}><Play/>{t('شاهد الفيديو','Watch video','영상 보기')}</button>:null}
  {reading?.visual==='lab'&&<p className={styles.imageCaption}>{t('صورة توضيحية للعمل المخبري.','Illustrative laboratory image.','실험실 예시 이미지.')}</p>}
  {source&&<a className={styles.sourceLink} href={source} target="_blank" rel="noopener noreferrer"><BookOpen size={16}/><span><small>{t('من المصدر','FROM THE SOURCE','출처')}</small>{post.source_label||source}{reading?.source?.date&&<time dateTime={reading.source.date}> · {reading.source.date}</time>}</span><ArrowUpRight size={17}/></a>}
  <div className={styles.postActions}><button aria-pressed={liked} onClick={onLike}><ThumbsUp size={20} fill={liked?'currentColor':'none'}/>{t('مفيد','Useful','유용해요')}</button><button aria-pressed={saved} onClick={onSave}><Bookmark size={20} fill={saved?'currentColor':'none'}/>{saved?t('محفوظ','Saved','저장됨'):t('حفظ','Save','저장')}</button><button onClick={onShare}><Share2 size={20}/>{t('مشاركة','Share','공유')}</button></div>
 </article>;
}

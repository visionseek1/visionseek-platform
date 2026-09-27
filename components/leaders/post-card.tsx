'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {Bookmark,Clapperboard,ExternalLink,FileText,Globe2,MoreHorizontal,Play,Share2,ThumbsUp} from 'lucide-react';
import {postText,safeLink,topics,type LeaderPost,type Locale} from '@/lib/leaders/types';
import {characterAuthor,characterPath} from '@/lib/leaders/characters';
import {CharacterPortrait} from './characters';
import styles from './post-card.module.css';

type Props={post:LeaderPost;locale:Locale;saved:boolean;liked:boolean;onSave:()=>void;onLike:()=>void;onShare:()=>void;onOpen:()=>void;onVideo:()=>void;onImage:(url:string)=>void;onOptions:()=>void};

/** Keep the author's complete text in the feed, in its original order. */
function PostText({body,contentId,locale}:{body:string;contentId:string;locale:Locale}) {
 const ref=useRef<HTMLParagraphElement>(null);
 const [expanded,setExpanded]=useState(false);
 const [overflows,setOverflows]=useState(false);
 useEffect(()=>{
  const el=ref.current;if(!el)return;
  const observer=new ResizeObserver(()=>{if(!expanded)setOverflows(el.scrollHeight>el.clientHeight+1);});
  observer.observe(el);return()=>observer.disconnect();
 },[body,expanded]);
 if(!body.trim())return null;
 return <><p id={contentId} ref={ref} className={`${styles.body} ${expanded?'':styles.collapsed}`} dir="auto">{body}</p>{(expanded||overflows)&&<button className={styles.more} aria-expanded={expanded} aria-controls={contentId} onClick={()=>setExpanded(!expanded)}>{locale==='ar'?(expanded?'عرض أقل':'… عرض المزيد'):(expanded?'Show less':'… see more')}</button>}</>;
}

export function PostCard({post,locale,saved,liked,onSave,onLike,onShare,onOpen,onVideo,onImage,onOptions}:Props) {
 const ar=locale==='ar',t=postText(post,locale),character=characterAuthor(post),video=post.kind==='video';
 const topic=topics.find(item=>item.id===post.topic);
 const source=safeLink(post.source_url);
 const cover=post.cover_url||(video?(locale==='en'?post.poster_url_en:post.poster_url)||post.poster_url:post.media_url);
 const [failed,setFailed]=useState(false);
 const published=post.published_at?new Date(post.published_at):null;
 const validDate=published&&!Number.isNaN(published.getTime())?published:null;
 const date=validDate?new Intl.DateTimeFormat(ar?'ar':'en',{day:'numeric',month:'short',timeZone:'Asia/Seoul'}).format(validDate):'';
 const fullDate=validDate?new Intl.DateTimeFormat(ar?'ar':'en',{dateStyle:'full',timeStyle:'short',timeZone:'Asia/Seoul'}).format(validDate):'';
 const titleId=`post-title-${post.id}`,bodyId=`post-body-${post.id}`;
 return <article className={styles.card} id={`post-${post.id}`} aria-labelledby={titleId}>
  <header className={styles.header}>
   {character?<Link className={styles.avatarLink} href={characterPath(character.id,locale)} aria-label={character.name[locale]}><CharacterPortrait character={character} size={44}/></Link>:<span className={styles.avatar}><Image src="/visionseek-symbol-color.png" width={32} height={32} alt=""/></span>}
   <div className={styles.author}>
    <strong>{character?<Link href={characterPath(character.id,locale)}>{character.name[locale]}</Link>:'VisionSeek'}</strong>
    <span>{character?`${character.sector[locale]} · ${ar?'شخصية تحريرية':'Editorial character'}`:(ar?'فريق تحرير بيت القادة':'Leaders House editorial team')}</span>
    <div className={styles.meta}><button onClick={onOpen} title={fullDate||undefined} aria-label={ar?'فتح المنشور':'Open post'}>{date?<time dateTime={post.published_at!}>{date}</time>:(ar?'عرض المنشور':'View post')}</button><span aria-hidden="true">·</span><Globe2 size={12} aria-label={ar?'منشور عام':'Public post'}/><span className={styles.topic}>· {topic?.[locale]}</span></div>
   </div>
   <button className={styles.menu} aria-label={ar?'تفضيلات هذا الموضوع':'Topic preferences'} onClick={onOptions}><MoreHorizontal size={23}/></button>
  </header>
  <div className={styles.copy}>
   <h2 id={titleId} dir="auto">{t.title}</h2>
   <PostText key={locale} body={t.body} contentId={bodyId} locale={locale}/>
  </div>
  {cover&&!failed?<button className={`${styles.media} ${video?styles.video:''}`} onClick={()=>video?onVideo():onImage(cover)} aria-label={`${video?(ar?'شاهد الفيديو':'Watch video'):(ar?'تكبير الصورة':'Enlarge image')}: ${t.title}`}>
   {/* Uploads have no stored dimensions. Natural image geometry avoids cropping authored graphics. */}
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={cover} alt={video?'':t.title} loading="lazy" decoding="async" onError={()=>setFailed(true)}/>
   {video&&<><span className={styles.videoShade}/><span className={styles.play}><Play fill="currentColor" size={25}/></span><span className={styles.videoLabel}><Clapperboard size={17}/>{ar?'فيديو قصير · اسحب للمقطع التالي':'Short video · swipe for the next'}</span></>}
  </button>:video?<button className={`${styles.media} ${styles.fallback}`} onClick={onVideo}><Play size={28}/>{ar?'شاهد الفيديو':'Watch video'}</button>:failed?<p className={styles.mediaError}>{ar?'تعذر تحميل الصورة. نص المنشور متاح أعلاه.':'The image could not load. The post text is available above.'}</p>:null}
  {source&&<a className={styles.source} href={locale==='en'&&source.startsWith('/ar/')?source.slice(3):source} target={source.startsWith('https:')?'_blank':undefined} rel="noopener noreferrer"><FileText size={16}/><span>{post.source_label||(ar?'المصدر':'Source')}</span><ExternalLink size={14}/></a>}
  <div className={styles.actions}>
   <button aria-label={liked?(ar?'إلغاء الإعجاب':'Unlike'):(ar?'أعجبني':'Like')} aria-pressed={liked} className={liked?styles.selected:''} onClick={onLike}><ThumbsUp size={21} fill={liked?'currentColor':'none'}/><span>{ar?'أعجبني':'Like'}</span></button>
   <button aria-label={ar?'حفظ في مجموعة':'Save to collection'} aria-pressed={saved} className={saved?styles.selected:''} onClick={onSave}><Bookmark size={21} fill={saved?'currentColor':'none'}/><span>{saved?(ar?'محفوظ':'Saved'):(ar?'حفظ':'Save')}</span></button>
   <button aria-label={ar?'مشاركة المنشور':'Share post'} onClick={onShare}><Share2 size={21}/><span>{ar?'مشاركة':'Share'}</span></button>
  </div>
 </article>;
}

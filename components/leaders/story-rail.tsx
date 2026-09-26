'use client';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {ChevronLeft,ChevronRight,Sparkles} from 'lucide-react';
import {postText,type LeaderPost,type Locale} from '@/lib/leaders/types';
import styles from './leaders.module.css';
export function StoryRail({posts,locale,seen,onOpen}:{posts:LeaderPost[];locale:Locale;seen:string[];onOpen:(index:number)=>void}){
 const ar=locale==='ar';
 const [ref,api]=useEmblaCarousel({direction:ar?'rtl':'ltr',align:'start',dragFree:true,containScroll:'trimSnaps',breakpoints:{'(prefers-reduced-motion: reduce)':{duration:0}}});
 const [edges,setEdges]=useState({prev:false,next:false});
 useEffect(()=>{if(!api)return;const sync=()=>setEdges({prev:api.canScrollPrev(),next:api.canScrollNext()});sync();api.on('select',sync).on('reInit',sync);return()=>{api.off('select',sync).off('reInit',sync);};},[api]);
 if(!posts.length)return null;
 return <section className={styles.storyRail} aria-label={ar?'الستوريز والمختارات':'Stories and highlights'}>
  <div className={styles.railHeading}><strong>{ar?'أفكار سريعة':'Quick ideas'}</strong><div><button aria-label={ar?'المختارات السابقة':'Previous highlights'} disabled={!edges.prev} onClick={()=>api?.scrollPrev()}>{ar?<ChevronRight size={18}/>:<ChevronLeft size={18}/>}</button><button aria-label={ar?'المختارات التالية':'Next highlights'} disabled={!edges.next} onClick={()=>api?.scrollNext()}>{ar?<ChevronLeft size={18}/>:<ChevronRight size={18}/>}</button></div></div>
  <div className={styles.storyViewport} ref={ref}><div className={styles.storyTrack}>{posts.map((p,i)=><button className={styles.storyItem} key={p.id} onClick={()=>onOpen(i)} aria-label={postText(p,locale).title} title={postText(p,locale).title}><span className={`${styles.storyRing} ${seen.includes(p.id)?styles.seen:''}`}><span className={`${styles.storyThumb} ${styles[p.topic]}`}>{p.media_url&&!p.media_type?.startsWith('video/')?<Image src={p.media_url} alt="" fill sizes="64px" unoptimized={p.media_url.startsWith('https:')}/>:<Sparkles size={25}/>}</span></span><span className={styles.storyLabel}>{postText(p,locale).title}</span></button>)}</div></div>
 </section>;
}

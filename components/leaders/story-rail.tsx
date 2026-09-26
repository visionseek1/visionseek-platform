'use client';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {ChevronLeft,ChevronRight,BrainCircuit,Lightbulb,Layers,Compass,Users} from 'lucide-react';
import {postText,type LeaderPost,type Locale,type Topic} from '@/lib/leaders/types';
import styles from './feed.module.css';
const storyVisuals:Record<Topic,{image:string;icon:typeof Compass}>={ai:{image:'/field-chips.jpg',icon:BrainCircuit},innovation:{image:'/field-science.jpg',icon:Lightbulb},capabilities:{image:'/field-space.jpg',icon:Layers},strategy:{image:'/field-energy.jpg',icon:Compass},leadership:{image:'/field-cities.jpg',icon:Users}};
export function StoryRail({posts,locale,seen,onOpen}:{posts:LeaderPost[];locale:Locale;seen:string[];onOpen:(index:number)=>void}){
 const ar=locale==='ar';
 const [ref,api]=useEmblaCarousel({direction:ar?'rtl':'ltr',align:'start',dragFree:true,containScroll:'trimSnaps',breakpoints:{'(prefers-reduced-motion: reduce)':{duration:0}}});
 const [edges,setEdges]=useState({prev:false,next:false});
 useEffect(()=>{if(!api)return;const sync=()=>setEdges({prev:api.canScrollPrev(),next:api.canScrollNext()});sync();api.on('select',sync).on('reInit',sync);return()=>{api.off('select',sync).off('reInit',sync);};},[api]);
 if(!posts.length)return null;
 return <section className={styles.storyRail} aria-label={ar?'الستوريز والمختارات':'Stories and highlights'}>
  <div className={styles.railHeading}><strong>{ar?'أفكار سريعة':'Quick ideas'}</strong><div><button aria-label={ar?'المختارات السابقة':'Previous highlights'} disabled={!edges.prev} onClick={()=>api?.scrollPrev()}>{ar?<ChevronRight size={18}/>:<ChevronLeft size={18}/>}</button><button aria-label={ar?'المختارات التالية':'Next highlights'} disabled={!edges.next} onClick={()=>api?.scrollNext()}>{ar?<ChevronLeft size={18}/>:<ChevronRight size={18}/>}</button></div></div>
  <div className={styles.storyViewport} ref={ref}><div className={styles.storyTrack}>{posts.map((p,i)=>{const visual=storyVisuals[p.topic];const Icon=visual.icon;const cover=p.media_url&&!p.media_type?.startsWith('video/')?p.media_url:visual.image;return <button className={`${styles.storyItem} ${seen.includes(p.id)?styles.seen:''}`} key={p.id} onClick={()=>onOpen(i)} aria-label={postText(p,locale).title} title={postText(p,locale).title}><Image src={cover} alt="" fill sizes="120px" unoptimized={cover.startsWith('https:')}/><span className={styles.storyIcon}><Icon size={17}/></span><span className={styles.storyLabel}>{postText(p,locale).title}</span></button>;})}</div></div>
 </section>;
}

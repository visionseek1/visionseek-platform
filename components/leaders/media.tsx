'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import type { LeaderPost, Locale } from '@/lib/leaders/types';
import styles from './leaders.module.css';
export function PostMedia({post,locale,immersive=false,onProgress,onEnded,paused=false}:{post:LeaderPost;locale:Locale;immersive?:boolean;onProgress?:(value:number)=>void;onEnded?:()=>void;paused?:boolean}) {
 const video=useRef<HTMLVideoElement>(null);const [muted,setMuted]=useState(true);const [playing,setPlaying]=useState(false);const [failed,setFailed]=useState(false);
 const isVideo=post.media_type?.startsWith('video/');
 useEffect(()=>{
  const el=video.current;if(!el)return;
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting && !paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){void el.play().catch(()=>{});}else el.pause();},{threshold:.65});
  observer.observe(el);const stop=()=>{if(document.hidden)el.pause();};document.addEventListener('visibilitychange',stop);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',stop);el.pause();};
 },[post.id,paused]);
 if(!post.media_url)return null;
 if(failed)return <div className={styles.mediaError}>{locale==='ar'?'تعذر تشغيل الملف. حدّث الصفحة للمحاولة مجددًا.':'Media could not load. Refresh to try again.'}</div>;
 return <div className={`${styles.media} ${immersive?styles.immersiveMedia:''}`}>
  {isVideo ? <>
    <video ref={video} src={post.media_url} playsInline muted={muted} controls preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setFailed(true)} onTimeUpdate={e=>{const v=e.currentTarget;if(v.duration)onProgress?.(v.currentTime/v.duration*100);}} onEnded={onEnded} aria-label={post.title}/>
    {!playing && <button className={styles.playButton} aria-label={locale==='ar'?'تشغيل الفيديو':'Play video'} onClick={()=>void video.current?.play().catch(()=>{})}><Play fill="currentColor"/></button>}
    <button className={styles.muteButton} aria-label={muted?(locale==='ar'?'تشغيل الصوت':'Unmute'):(locale==='ar'?'كتم الصوت':'Mute')} onClick={()=>setMuted(!muted)}>{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
   </> : <Image src={post.media_url} alt={post.title} fill sizes={immersive?'(max-width: 600px) 100vw, 480px':'(max-width: 760px) 100vw, 620px'} unoptimized={post.media_url.startsWith('https:')} onError={()=>setFailed(true)}/>}
 </div>;
}

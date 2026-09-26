'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {Play,Volume2,VolumeX,RotateCcw} from 'lucide-react';
import {postText,type LeaderPost,type Locale} from '@/lib/leaders/types';
import styles from './leaders.module.css';
export function PostMedia({post,locale,immersive=false,preview=false,preload="metadata",onProgress,onEnded,paused=false,muted:controlledMuted,onMuteChange}:{post:LeaderPost;locale:Locale;immersive?:boolean;preview?:boolean;preload?:"none"|"metadata"|"auto";onProgress?:(value:number)=>void;onEnded?:()=>void;paused?:boolean;muted?:boolean;onMuteChange?:(value:boolean)=>void}) {
 const video=useRef<HTMLVideoElement>(null);const [localMuted,setLocalMuted]=useState(true);const [playing,setPlaying]=useState(false);const [failed,setFailed]=useState(false);
 const muted=controlledMuted??localMuted;const ar=locale==='ar';const t=postText(post,locale);
 const src=locale==='en'&&post.media_url_en?post.media_url_en:post.media_url;
 const poster=locale==='en'&&post.poster_url_en?post.poster_url_en:post.poster_url;
 const caption=locale==='en'?post.caption_url_en:post.caption_url;
 const isVideo=post.media_type?.startsWith('video/');
 useEffect(()=>{
  const el=video.current;if(!el||preview)return;
  if(paused)el.pause();
  const observer=new IntersectionObserver(([entry])=>{
   if(entry.isIntersecting&&!paused&&!document.hidden&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)void el.play().catch(()=>{});
   else el.pause();
  },{threshold:.7});
  observer.observe(el);
  const stop=()=>{if(document.hidden)el.pause();};
  const exclusive=(event:Event)=>{if((event as CustomEvent).detail!==el)el.pause();};
  document.addEventListener('visibilitychange',stop);document.addEventListener('leaders-video-play',exclusive);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',stop);document.removeEventListener('leaders-video-play',exclusive);el.pause();};
 },[src,paused,preview]);
 if(!src)return null;
 if(preview)return <div className={`${styles.media} ${styles.videoPreview}`} aria-hidden="true">{poster?<Image src={poster} alt="" fill sizes="(max-width:760px) 100vw,620px" unoptimized={poster.startsWith('https:')}/>:<div className={styles.videoPlaceholder}><span>VISIONSEEK</span></div>}</div>;
 function toggleMute(){const next=!muted;setLocalMuted(next);onMuteChange?.(next);}
 return <div className={`${styles.media} ${immersive?styles.immersiveMedia:''}`}>
  {isVideo?<>
   <video ref={video} src={src} poster={poster} playsInline muted={muted} controls preload={preload} onPlay={e=>{setPlaying(true);document.dispatchEvent(new CustomEvent('leaders-video-play',{detail:e.currentTarget}));}} onPause={()=>setPlaying(false)} onError={()=>setFailed(true)} onLoadedData={()=>setFailed(false)} onVolumeChange={e=>{const next=e.currentTarget.muted;setLocalMuted(next);onMuteChange?.(next);}} onTimeUpdate={e=>{const v=e.currentTarget;if(v.duration)onProgress?.(v.currentTime/v.duration*100);}} onEnded={onEnded} aria-label={t.title}>
    {caption&&<track kind="captions" src={caption} srcLang={locale} label={ar?'العربية':'English'}/>}
   </video>
   {!playing&&!failed&&<button className={styles.playButton} aria-label={ar?'تشغيل الفيديو':'Play video'} onClick={()=>void video.current?.play().catch(()=>{})}><Play fill="currentColor"/></button>}
   <button className={styles.muteButton} aria-label={muted?(ar?'تشغيل الصوت':'Unmute'):(ar?'كتم الصوت':'Mute')} onClick={toggleMute}>{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
   {failed&&<div className={styles.mediaError}><p>{ar?'تعذر تشغيل المقطع. يمكنك قراءة الفكرة أو إعادة المحاولة.':'This clip could not play. Read the brief or retry.'}</p><button onClick={()=>{setFailed(false);video.current?.load();}}><RotateCcw size={18}/>{ar?'إعادة المحاولة':'Retry'}</button></div>}
  </>:<Image src={src} alt={t.title} fill sizes={immersive?'(max-width: 600px) 100vw, 480px':'(max-width: 760px) 100vw, 620px'} unoptimized={src.startsWith('https:')}/>}
 </div>;
}

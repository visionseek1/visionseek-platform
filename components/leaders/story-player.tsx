'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {ChevronLeft,ChevronRight,Pause,Play,X} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {LeaderPost,Locale,postText,topics} from '@/lib/leaders/types';
import {PostMedia} from './media';
import styles from './leaders.module.css';
export function StoryPlayer({posts,index,onClose,onIndex,locale}:{posts:LeaderPost[];index:number;onClose:()=>void;onIndex:(n:number)=>void;locale:Locale}){
 const post=posts[index];const [paused,setPaused]=useState(false);const [progress,setProgress]=useState(0);const touch=useRef<number|null>(null);const ar=locale==='ar';
 const next=useCallback(()=>{if(index+1<posts.length)onIndex(index+1);else onClose();},[index,posts.length,onIndex,onClose]);
 const prev=()=>onIndex(Math.max(0,index-1));
 useEffect(()=>{
  if(!post || paused || post.media_type?.startsWith('video/'))return;
  const timer=window.setInterval(()=>{if(!document.hidden)setProgress(p=>Math.min(100,p+1));},120);
  return()=>window.clearInterval(timer);
 },[post,paused]);
 useEffect(()=>{if(progress>=100)next();},[progress,next]);
 if(!post)return null;const text=postText(post,locale);
 return <Dialog open onOpenChange={v=>{if(!v)onClose();}}><DialogContent showCloseButton={false} className={styles.storyDialog} dir={ar?'rtl':'ltr'} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();if(ar)prev();else next();}if(e.key==='ArrowLeft'){e.preventDefault();if(ar)next();else prev();}}}>
  <DialogTitle className="sr-only">{text.title}</DialogTitle><DialogDescription className="sr-only">{ar?'استخدم السهمين للتنقل أو أغلق للعودة إلى المنشورات.':'Use the arrows to navigate, or close to return to the feed.'}</DialogDescription>
  <div className={styles.storyCanvas} onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current===null)return;const delta=e.changedTouches[0].clientX-touch.current;if(Math.abs(delta)>55){if((delta<0)!==ar)next();else prev();}touch.current=null;}}>
   <div className={styles.storyProgress} dir="ltr">{posts.map((p,i)=><span key={p.id}><i style={{width:`${i<index?100:i===index?progress:0}%`}}/></span>)}</div>
   <div className={styles.storyTop}><span>VISIONSEEK <small>{post.highlight?(ar?'مختارات':'Highlights'):(ar?'ستوري':'Story')}</small></span><div><button aria-label={paused?(ar?'متابعة':'Resume'):(ar?'إيقاف مؤقت':'Pause')} onClick={()=>setPaused(!paused)}>{paused?<Play size={20}/>:<Pause size={20}/>}</button><button aria-label={ar?'إغلاق':'Close'} onClick={onClose}><X/></button></div></div>
   {post.media_url && <PostMedia key={post.id} post={post} locale={locale} immersive paused={paused} onProgress={setProgress} onEnded={next}/>}
   <div className={`${styles.storyText} ${post.media_url?styles.withStoryMedia:''}`}><span>{topics.find(t=>t.id===post.topic)?.[locale]}</span><h2>{text.title}</h2><p>{text.body}</p></div>
   <div className={styles.storyBottom}><button onClick={prev} disabled={!index} aria-label={ar?'السابق':'Previous'}>{ar?<ChevronRight/>:<ChevronLeft/>}</button><span>{index+1} / {posts.length}</span><button onClick={next} aria-label={ar?'التالي':'Next'}>{ar?<ChevronLeft/>:<ChevronRight/>}</button></div>
  </div>
 </DialogContent></Dialog>;
}

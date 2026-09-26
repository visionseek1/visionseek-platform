'use client';
import {useCallback,useRef,useState} from 'react';
import {ArrowDown,ArrowUp,Bookmark,FileText,Send,X} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {postText,type LeaderPost,type Locale} from '@/lib/leaders/types';
import {PostMedia} from './media';
import styles from './leaders.module.css';
export function ReelPlayer({posts,start,locale,savedIds,blocked,onClose,onSave,onShare,onRead}:{posts:LeaderPost[];start:number;locale:Locale;savedIds:string[];blocked:boolean;onClose:()=>void;onSave:(p:LeaderPost)=>void;onShare:(p:LeaderPost)=>void;onRead:(p:LeaderPost)=>void}){
 const [index,setIndex]=useState(start);const [muted,setMuted]=useState(true);const rail=useRef<HTMLDivElement>(null);const ar=locale==='ar';
 const setRail=useCallback((el:HTMLDivElement|null)=>{rail.current=el;if(el)el.scrollTop=start*el.clientHeight;},[start]);
 function move(next:number){if(next<0||next>=posts.length)return;const el=rail.current;if(el)el.scrollTo({top:next*el.clientHeight,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 return <Dialog open onOpenChange={open=>{if(!open)onClose();}}><DialogContent showCloseButton={false} className={styles.reelsDialog} dir={ar?'rtl':'ltr'} onKeyDown={e=>{if(blocked)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();move(index+(e.key==='ArrowDown'?1:-1));}}}>
  <DialogTitle className="sr-only">{ar?'فيديوهات بيت القادة':'Leaders House videos'}</DialogTitle><DialogDescription className="sr-only">{ar?'اسحب لأعلى أو استخدم الأسهم للتنقل. أغلق للعودة إلى مكانك في الموجز.':'Swipe up or use the arrows. Close to return to your place in the feed.'}</DialogDescription>
  <div className={styles.reelHeader}><span>LEADERS HOUSE <small>{index+1} / {posts.length}</small></span><button aria-label={ar?'إغلاق الفيديوهات':'Close videos'} onClick={onClose}><X/></button></div>
  <div className={styles.reelRail} ref={setRail} onScroll={e=>{const el=e.currentTarget;setIndex(Math.min(posts.length-1,Math.max(0,Math.round(el.scrollTop/el.clientHeight))));}}>
   {posts.map((p,i)=><article key={p.id} className={styles.reelSlide} aria-label={postText(p,locale).title} aria-hidden={i!==index} inert={i!==index}>
    <PostMedia post={p} locale={locale} immersive paused={i!==index||blocked} muted={muted} onMuteChange={setMuted}/>
    <div className={styles.reelCaption}><p>{ar?'من تحرير VisionSeek':'VisionSeek editorial'}</p><h2>{postText(p,locale).title}</h2><div><button onClick={()=>onRead(p)}><FileText size={18}/>{ar?'الفكرة والمصدر':'Brief & source'}</button><button aria-label={ar?'حفظ في مجموعة':'Save to collection'} onClick={()=>onSave(p)}><Bookmark fill={savedIds.includes(p.id)?'currentColor':'none'} size={21}/></button><button aria-label={ar?'مشاركة الفيديو':'Share video'} onClick={()=>onShare(p)}><Send size={21}/></button></div></div>
   </article>)}
  </div>
  <div className={styles.reelStepper}><button disabled={index===0} aria-label={ar?'الفيديو السابق':'Previous video'} onClick={()=>move(index-1)}><ArrowUp size={19}/></button><button disabled={index===posts.length-1} aria-label={ar?'الفيديو التالي':'Next video'} onClick={()=>move(index+1)}><ArrowDown size={19}/></button></div>
 </DialogContent></Dialog>;
}

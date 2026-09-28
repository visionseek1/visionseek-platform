'use client';

import {useRef,useState} from 'react';
import {Play,ArrowDown,Download} from 'lucide-react';
import type {Locale} from '@/lib/institution/schema';
import story from '@/lib/programs/hlo-film.json';
import styles from './hlo-film.module.css';

export default function HloFilm({locale}:{locale:Locale}){
  const ar=locale==='ar';
  const video=useRef<HTMLVideoElement>(null);
  const pendingSeek=useRef<number|null>(null);
  const [started,setStarted]=useState(false);
  const [active,setActive]=useState(0);
  const [error,setError]=useState(false);
  const src=`/media/hlo/hlo-film-${locale}.mp4`;

  function applySeek(){
    if(video.current&&pendingSeek.current!==null){
      video.current.currentTime=pendingSeek.current;
      pendingSeek.current=null;
    }
  }
  async function playAt(seconds?:number){
    const player=video.current;
    if(!player)return;
    setError(false);
    setStarted(true);
    if(seconds!==undefined)pendingSeek.current=seconds;
    if(player.readyState>=1)applySeek();
    try{await player.play();}catch{setError(true);}
  }
  function syncChapter(){
    const seconds=video.current?.currentTime??0;
    setActive(Math.max(0,story.chapters.findLastIndex(chapter=>seconds>=chapter.start)));
  }

  return <div className={styles.film}>
    <div className={styles.meta}><span>{ar?'كيف يعمل HLO':'HOW HLO WORKS'}</span><span>{ar?'فيلم توضيحي · ٥٦ ثانية':'PROGRAM FILM · 56 SECONDS'}</span></div>
    <div className={styles.screen}>
      <video ref={video} controls={started} playsInline preload="none" poster={`/media/hlo/hlo-film-${locale}-poster.jpg`} aria-label={ar?'كيف يعمل برنامج HLO — فيلم توضيحي':'How HLO works — program film'} aria-describedby="hlo-film-accessibility" onLoadedMetadata={applySeek} onTimeUpdate={syncChapter} onPlay={()=>{setStarted(true);setError(false);}} onError={()=>setError(true)}>
        <source src={src} type="video/mp4"/>
        {ar?'متصفحك لا يدعم تشغيل الفيديو. يمكنك قراءة الشرح الكامل أدناه.':'Your browser does not support video. Read the full explanation below.'}
      </video>
      {!started&&<button type="button" className={styles.play} onClick={()=>void playAt(0)} aria-label={ar?'شاهد كيف يعمل HLO':'Watch how HLO works'}><span className={styles.playIcon}><Play size={26} fill="currentColor" aria-hidden="true"/></span><span>{ar?'شاهد كيف نعمل':'SEE HOW WE WORK'}<small dir="ltr">00:56</small></span></button>}
    </div>
    {error&&<p className={styles.error} role="alert">{ar?'تعذّر تشغيل الفيديو. جرّب زر التشغيل مجددًا، أو حمّل الفيديو واقرأ الشرح أدناه.':'The video could not play. Try the player again, or download it and read the explanation below.'}<a href={src} download><Download size={16}/>{ar?'تحميل الفيديو':'Download the film'}</a></p>}
    <div className={styles.below}><p id="hlo-film-accessibility">{ar?'فيلم بصري دون صوت. يمكنك التنقّل بين المشاهد أو قراءة الشرح.':'A visual film with no audio. Jump between scenes or read the explanation.'}</p><a href="#hlo-film-transcript">{ar?'اقرأ الرحلة':'Read the journey'}<ArrowDown size={16}/></a></div>
    <nav className={styles.chapters} aria-label={ar?'مشاهد فيلم HLO':'HLO film chapters'}>{story.chapters.map((chapter,index)=><button type="button" key={chapter.key} onClick={()=>void playAt(chapter.start)} aria-current={active===index?'step':undefined}><span dir="ltr">{String(index+1).padStart(2,'0')}<small>00:{String(chapter.start).padStart(2,'0')}</small></span><strong>{chapter[locale].label}</strong></button>)}</nav>
    <details className={styles.transcript} id="hlo-film-transcript"><summary>{ar?'الشرح الكامل للفيلم':'Full film explanation'}</summary><ol>{story.chapters.map(chapter=><li key={chapter.key}><h3>{chapter[locale].title.replaceAll('\n',' ')}</h3><p>{chapter[locale].body.replaceAll('\n',' ')}</p></li>)}</ol></details>
  </div>;
}

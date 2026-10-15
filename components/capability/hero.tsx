"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Locale } from "./content";
import { home } from "@/lib/home";

const slides = home.hero.slides;

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const motionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotionSnapshot = () => true;

export default function CapabilityHero({locale}: {locale: Locale}) {
  const ar=locale==="ar"; const p=ar?"/ar":"";
  const [active,setActive]=useState(0); const [playing,setPlaying]=useState(true);
  const reducedMotion=useSyncExternalStore(subscribeMotion,motionSnapshot,serverMotionSnapshot);
  const isPlaying=playing&&!reducedMotion;
  useEffect(() => { if(!isPlaying)return; const timer=window.setInterval(()=>setActive(i=>(i+1)%slides.length),8000); return ()=>window.clearInterval(timer); },[isPlaying]);
  function select(i:number){setActive((i+slides.length)%slides.length);setPlaying(false);}
  return <section className="vs-hero" aria-roledescription={ar?"عرض شرائح":"carousel"} aria-label={ar?"مهمة VisionSeek":"VisionSeek mission"} onFocusCapture={(event)=>{if(!(event.target as HTMLElement).closest(".vs-pause"))setPlaying(false);}}>
    {slides.map((s,i)=><div key={s.image} className={`vs-slide ${i===active?"is-active":""}`} aria-hidden={i!==active} inert={i!==active} role="group" aria-roledescription={ar?"شريحة":"slide"} aria-label={`${i+1} / ${slides.length}`}><Image src={s.image} alt="" fill sizes="100vw" priority={i===0}/><div className="vs-hero-shade"/><div className="vs-hero-copy"><p className="vs-eyebrow">{ar?s.label.ar:s.label.en}</p>{i===0?<h1 dir="ltr">{s.title.en}</h1>:<h2>{ar?s.title.ar:s.title.en}</h2>}<p className="vs-hero-sub">{ar?s.sub.ar:s.sub.en}</p>{(ar?s.text.ar:s.text.en)?<p className="vs-hero-description">{ar?s.text.ar:s.text.en}</p>:null}{i===0&&<p className="vs-hero-description">{ar?home.hero.firstSlideNote.ar:home.hero.firstSlideNote.en}</p>}<Link className="vs-button" href={`${p}${s.href}`}>{ar?s.link.ar:s.link.en}<ArrowRight size={20}/></Link></div></div>)}
    <div className="vs-carousel-controls"><div className="vs-slide-indicators">{slides.map((s,i)=><button key={s.image} aria-label={`${ar?"الشريحة":"Slide"} ${i+1}`} aria-pressed={active===i} onClick={()=>select(i)}><span/></button>)}<span className="vs-slide-count" dir="ltr">0{active+1} / 03</span></div><div className="vs-slide-arrows"><button aria-label={ar?"الشريحة السابقة":"Previous slide"} onClick={()=>select(active-1)}><ArrowLeft size={20}/></button><button aria-label={ar?"الشريحة التالية":"Next slide"} onClick={()=>select(active+1)}><ArrowRight size={20}/></button></div><button className="vs-pause" onClick={()=>setPlaying(v=>!v)} disabled={reducedMotion} aria-label={isPlaying?(ar?"إيقاف العرض التلقائي":"Pause slideshow"):(ar?"تشغيل العرض التلقائي":"Play slideshow")}>{isPlaying?<Pause size={15}/>:<Play size={15}/>}<span>{isPlaying?(ar?"إيقاف":"Pause"):(ar?"تشغيل":"Play")}</span></button></div>
  </section>;
}

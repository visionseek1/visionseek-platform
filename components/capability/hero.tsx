"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Locale } from "./content";

const slides = [
  { image:"/field-chips.jpg", titleEn:"The Highest Level One.", titleAr:"The Highest Level One.", labelEn:"HIGHEST LEVEL ONE", labelAr:"أعلى مستوى ممكن", subEn:"Capabilities for institutions, especially AI, assembled between the engineering team and the people who decide.", subAr:"قدرات للمؤسسات، والذكاء الاصطناعي في مقدمتها، تُجمَّع بين فريق الهندسة ومن يتخذ القرار.", textEn:"VisionSeek builds that capability in-house, from what already works in the world.", textAr:"تبني VisionSeek هذه القدرة داخل المؤسسة، مما يعمل أصلًا في العالم.", href:"/about/what-we-do#hlo", linkEn:"Explore the HLO program", linkAr:"اكتشف برنامج HLO" },
  { image:"/field-industry.jpg", titleEn:"What solution could move your institution ahead?", titleAr:"ما الذي أصبح ممكنًا اليوم، وقد يسبقك به غيرك غدًا؟", labelEn:"THE VISIONSEEK QUESTION", labelAr:"سؤال VisionSeek", subEn:"Start with the capability that should exist.", subAr:"اكتشف القدرة التي قد تغيّر موقعك غدًا.", textEn:"Understand the limit. Find the path. Put it to the test.", textAr:"افهم الحد الحقيقي. اكتشف المسار. واختبره في الواقع.", href:"/method", linkEn:"Explore our method", linkAr:"اكتشف منهجنا" },
  { image:"/field-space.jpg", titleEn:"A local working pattern.", titleAr:"نمط عمل يناسب الواقع المحلي.", labelEn:"EGYPT AND THE GULF", labelAr:"مصر والخليج", subEn:"A multi-sector studio for capability architecture and building.", subAr:"استوديو متعدد القطاعات لبناء القدرات ومعماريتها.", textEn:"We assemble what already works in the United States, Europe, Korea and elsewhere into a pattern institutions in Egypt and the Gulf can run.", textAr:"نجمع ما يعمل أصلًا في الولايات المتحدة وأوروبا وكوريا وغيرها، في نمط تستطيع مؤسسات مصر والخليج تشغيله.", href:"/start", linkEn:"Build your solutions with us", linkAr:"ابنِ حلولك معنا" },
];

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
    {slides.map((s,i)=><div key={s.image} className={`vs-slide ${i===active?"is-active":""}`} aria-hidden={i!==active} inert={i!==active} role="group" aria-roledescription={ar?"شريحة":"slide"} aria-label={`${i+1} / ${slides.length}`}><Image src={s.image} alt="" fill sizes="100vw" priority={i===0}/><div className="vs-hero-shade"/><div className="vs-hero-copy"><p className="vs-eyebrow">{ar?s.labelAr:s.labelEn}</p>{i===0?<h1 dir="ltr">{s.titleEn}</h1>:<h2>{ar?s.titleAr:s.titleEn}</h2>}<p className="vs-hero-sub">{ar?s.subAr:s.subEn}</p>{(ar?s.textAr:s.textEn)?<p className="vs-hero-description">{ar?s.textAr:s.textEn}</p>:null}<Link className="vs-button" href={`${p}${s.href}`}>{ar?s.linkAr:s.linkEn}<ArrowRight size={20}/></Link></div></div>)}
    <div className="vs-carousel-controls"><div className="vs-slide-indicators">{slides.map((s,i)=><button key={s.image} aria-label={`${ar?"الشريحة":"Slide"} ${i+1}`} aria-pressed={active===i} onClick={()=>select(i)}><span/></button>)}<span className="vs-slide-count" dir="ltr">0{active+1} / 03</span></div><div className="vs-slide-arrows"><button aria-label={ar?"الشريحة السابقة":"Previous slide"} onClick={()=>select(active-1)}><ArrowLeft size={20}/></button><button aria-label={ar?"الشريحة التالية":"Next slide"} onClick={()=>select(active+1)}><ArrowRight size={20}/></button></div><button className="vs-pause" onClick={()=>setPlaying(v=>!v)} disabled={reducedMotion} aria-label={isPlaying?(ar?"إيقاف العرض التلقائي":"Pause slideshow"):(ar?"تشغيل العرض التلقائي":"Play slideshow")}>{isPlaying?<Pause size={15}/>:<Play size={15}/>}<span>{isPlaying?(ar?"إيقاف":"Pause"):(ar?"تشغيل":"Play")}</span></button></div>
  </section>;
}

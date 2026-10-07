"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Locale } from "./content";

const slides = [
  { image:"/field-science.jpg", titleEn:"What has proven itself in Korea’s hospitals deserves to reach our patients.", titleAr:"ما أثبت نفسه في مستشفيات كوريا، يستحق أن يصل إلى مرضانا.", labelEn:"HEALTH & CARE", labelAr:"الصحة والرعاية", subEn:"Korean innovations in diagnosis, care and rehabilitation that are already in real use — each shown with its evidence and sources, and read against the needs of Egypt and the Gulf. Health is where we start; the same approach carries to other sectors.", subAr:"ابتكارات كورية في التشخيص والرعاية والتأهيل، تعمل اليوم على أرض الواقع. نعرض كل واحد منها بدليله ومصدره، ونقرؤه على احتياج مصر والخليج. بدأنا بالصحة، والطريق نفسه يمتد إلى قطاعات أخرى.", textEn:"", textAr:"", href:"/health#innovations", linkEn:"See what Korea has tried", linkAr:"شاهد ما جرّبته كوريا" },
  { image:"/field-industry.jpg", titleEn:"What solution could move your institution ahead?", titleAr:"ما الذي أصبح ممكنًا اليوم، وقد يسبقك به غيرك غدًا؟", labelEn:"THE VISIONSEEK QUESTION", labelAr:"سؤال VisionSeek", subEn:"Start with the capability that should exist.", subAr:"اكتشف القدرة التي قد تغيّر موقعك غدًا.", textEn:"Understand the limit. Find the path. Put it to the test.", textAr:"افهم الحد الحقيقي. اكتشف المسار. واختبره في الواقع.", href:"/method", linkEn:"Explore our method", linkAr:"اكتشف منهجنا" },
  { image:"/field-chips.jpg", titleEn:"The best of what is possible.", titleAr:"نبني على أفضل ما توصّل إليه العالم.", labelEn:"HIGHEST LEVEL ONE", labelAr:"HIGHEST LEVEL ONE", subEn:"The right people. The best available capabilities.", subAr:"الخبرات المناسبة. والتقنيات الأكثر ملاءمة للمهمة.", textEn:"Connect the world’s knowledge, technologies and opportunities around a mission.", textAr:"نختار ما تحتاجه المهمة من معرفة وتقنيات وشركاء، ونضعه في خدمة القدرة التي نبنيها.", href:"/about/what-we-do#hlo", linkEn:"Explore the HLO program", linkAr:"اكتشف برنامج HLO" },
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
    {slides.map((s,i)=><div key={s.image} className={`vs-slide ${i===active?"is-active":""}`} aria-hidden={i!==active} inert={i!==active} role="group" aria-roledescription={ar?"شريحة":"slide"} aria-label={`${i+1} / ${slides.length}`}><Image src={s.image} alt="" fill sizes="100vw" priority={i===0}/><div className="vs-hero-shade"/><div className="vs-hero-copy"><p className="vs-eyebrow">{ar?s.labelAr:s.labelEn}</p>{i===0?<h1>{ar?s.titleAr:s.titleEn}</h1>:<h2>{ar?s.titleAr:s.titleEn}</h2>}<p className="vs-hero-sub">{ar?s.subAr:s.subEn}</p>{(ar?s.textAr:s.textEn)?<p className="vs-hero-description">{ar?s.textAr:s.textEn}</p>:null}<Link className="vs-button" href={`${p}${s.href}`}>{ar?s.linkAr:s.linkEn}<ArrowRight size={20}/></Link></div></div>)}
    <div className="vs-carousel-controls"><div className="vs-slide-indicators">{slides.map((s,i)=><button key={s.image} aria-label={`${ar?"الشريحة":"Slide"} ${i+1}`} aria-pressed={active===i} onClick={()=>select(i)}><span/></button>)}<span className="vs-slide-count" dir="ltr">0{active+1} / 03</span></div><div className="vs-slide-arrows"><button aria-label={ar?"الشريحة السابقة":"Previous slide"} onClick={()=>select(active-1)}><ArrowLeft size={20}/></button><button aria-label={ar?"الشريحة التالية":"Next slide"} onClick={()=>select(active+1)}><ArrowRight size={20}/></button></div><button className="vs-pause" onClick={()=>setPlaying(v=>!v)} disabled={reducedMotion} aria-label={isPlaying?(ar?"إيقاف العرض التلقائي":"Pause slideshow"):(ar?"تشغيل العرض التلقائي":"Play slideshow")}>{isPlaying?<Pause size={15}/>:<Play size={15}/>}<span>{isPlaying?(ar?"إيقاف":"Pause"):(ar?"تشغيل":"Play")}</span></button></div>
  </section>;
}

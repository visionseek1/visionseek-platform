'use client';

import {useEffect, useState, type ReactNode} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import type {Locale} from '@/lib/projects';
import styles from './projects.module.css';

export function ProjectRail({locale,children}:{locale:Locale;children:ReactNode}) {
  const ar=locale==='ar';
  const [ref,api]=useEmblaCarousel({direction:ar?'rtl':'ltr',align:'start',containScroll:'trimSnaps',breakpoints:{'(prefers-reduced-motion: reduce)':{duration:0}}});
  const [edges,setEdges]=useState({prev:false,next:false});
  useEffect(()=>{
    if(!api)return;
    const sync=()=>setEdges({prev:api.canScrollPrev(),next:api.canScrollNext()});
    sync();api.on('select',sync).on('reInit',sync);
    return()=>{api.off('select',sync).off('reInit',sync);};
  },[api]);
  return <section id="project-files" className={`${styles.section} ${styles.spotlight}`} aria-labelledby="spotlight-title">
    <div className={styles.railHeading}>
      <div><p className={styles.eyebrow}>{ar?'اكتشف المشاريع مباشرة':'EXPLORE PROJECTS DIRECTLY'}</p><h2 id="spotlight-title">{ar?'مشروعات في الواجهة':'Projects in focus'}</h2></div>
      <div className={styles.railControls}>
        <a href="#fields">{ar?'كل المجالات':'All sectors'}</a>
        <button disabled={!edges.prev} onClick={()=>api?.scrollPrev()} aria-label={ar?'المشروعات السابقة':'Previous projects'} aria-controls="featured-projects">{ar?<ChevronRight size={20}/>:<ChevronLeft size={20}/>}</button>
        <button disabled={!edges.next} onClick={()=>api?.scrollNext()} aria-label={ar?'المشروعات التالية':'Next projects'} aria-controls="featured-projects">{ar?<ChevronLeft size={20}/>:<ChevronRight size={20}/>}</button>
      </div>
    </div>
    <div className={styles.railViewport} ref={ref}><div className={styles.projectTrack} id="featured-projects">{children}</div></div>
  </section>;
}

"use client";

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/components/capability/content';
import { hloSteps } from '@/components/hlo/content';
import styles from './positioning.module.css';

export default function HloPath({locale}:{locale:Locale}) {
  const ar=locale==='ar';
  const [active,setActive]=useState(0);
  const step=hloSteps[active];
  return <div className={styles.path}>
    <div className={styles.stepButtons} role="group" aria-label={ar?'خطوات HLO بالترتيب':'HLO steps, in order'}>
      {hloSteps.map((item,index)=><button key={item.en} type="button" aria-pressed={active===index} aria-controls="hlo-step-description" onClick={()=>setActive(index)}><span aria-hidden="true">0{index+1}</span>{ar?item.ar:item.en}</button>)}
    </div>
    <div id="hlo-step-description" className={styles.stepPanel} aria-live="polite" aria-atomic="true">
      <span className={styles.stepNumber} aria-hidden="true">0{active+1}</span>
      <div><h3>{ar?step.titleAr:step.titleEn}</h3><p>{ar?step.bodyAr:step.bodyEn}</p><div className={styles.stepOutput}><ArrowRight aria-hidden="true" size={20}/><p><strong>{ar?'في هذه الخطوة':'In this step'}</strong>{ar?step.noteAr:step.noteEn}</p></div></div>
    </div>
  </div>;
}

'use client';

import {useState, type CSSProperties} from 'react';
import Link from 'next/link';
import type {Locale, ProjectAudience} from '@/lib/projects';
import styles from './projects.module.css';

export type ProjectCardData = {
  id:string; href:string; title:string; summary:string; sector:string; track:string; color:string; mark:string;
  audiences:ProjectAudience[]; audienceText:string[];
};

/** The project cards, with an audience filter when audiences are given. */
export function ProjectFilter({locale,cards,audiences}:{locale:Locale;cards:ProjectCardData[];audiences:{id:ProjectAudience;label:string}[]}) {
  const ar=locale==='ar';
  const [picked,setPicked]=useState<ProjectAudience|'all'>('all');
  const shown=picked==='all'?cards:cards.filter(card=>card.audiences.includes(picked));
  return <>
    {audiences.length>0&&<div className={styles.heading}>
      <h2>{ar?'المشاريع':'Projects'}</h2>
      <div className={styles.filters} role="group" aria-label={ar?'مصمَّم لـ':'Designed for'}>
        {[{id:'all' as const,label:ar?'الكل':'All'},...audiences].map(option=><button key={option.id} type="button" aria-pressed={picked===option.id} onClick={()=>setPicked(option.id)}>{option.label}</button>)}
      </div>
    </div>}
    {shown.length?<div className={styles.cards}>{shown.map(card=><Link key={card.id} href={card.href} className={styles.card} style={{'--tone':card.color} as CSSProperties}>
      <div className={styles.cardArt} aria-hidden="true">
        <div className={styles.cardTop}><span>{card.track}</span><span dir="ltr">{card.id}</span></div>
        <span className={styles.cardMark}>{card.mark}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}><span>{card.sector}</span></div>
        <h3>{card.title}</h3>
        <p>{card.summary}</p>
        {card.audienceText.length>0&&<ul className={styles.chips} aria-label={ar?'مصمَّم لـ':'Designed for'}>{card.audienceText.map(text=><li key={text}>{text}</li>)}</ul>}
      </div>
    </Link>)}</div>:<p className={styles.emptyFilter}>{ar?'لا يوجد بعد مشروع مصمَّم لهذه الفئة.':'No project is designed for this group yet.'}</p>}
  </>;
}

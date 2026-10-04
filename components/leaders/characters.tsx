'use client';
import Link from 'next/link';
import {useEffect,useState,type CSSProperties} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {ArrowUpRight,Check,ChevronLeft,ChevronRight,Plus,Factory,BrainCircuit,ShieldCheck,Microscope,Network} from 'lucide-react';
import {characterById,characterPath,type LeaderCharacter} from '@/lib/leaders/characters';
import type {Locale,Topic} from '@/lib/leaders/types';
import {medicalTopics} from '@/lib/leaders/medical-scope';
import styles from './characters.module.css';

// Display the founder's artwork directly. No generated replacement characters.
const portraitX=[19,107,195,283,371,457,545,633,719,807,896,984,1073,1161,1250,1341,1429];
export function CharacterPortrait({character,size=56}:{character:LeaderCharacter;size?:number}){
 return <span className={styles.portrait} aria-hidden="true" style={{'--portrait-size':`${size}px`,'--portrait-x':-portraitX[character.portrait]/88} as CSSProperties}/>;
}
function FollowButton({character,locale,following,onFollow}:{character:LeaderCharacter;locale:Locale;following:boolean;onFollow:()=>void}){
 const ar=locale==='ar';
 return <button className={`${styles.follow} ${following?styles.following:''}`} aria-pressed={following} aria-label={`${following?(ar?'إلغاء متابعة':'Unfollow'):(ar?'متابعة':'Follow')} ${character.name[locale]}`} onClick={onFollow}>{following?<Check size={16}/>:<Plus size={16}/>}<span>{following?(ar?'متابَع':'Following'):(ar?'متابعة':'Follow')}</span></button>;
}
const topicIcons={capabilities:Network,strategy:Factory,ai:BrainCircuit,leadership:ShieldCheck,innovation:Microscope};
export function CharacterRail({locale,activeTopic,onTopic}:{locale:Locale;activeTopic:Topic|'all';onTopic:(topic:Topic)=>void}){
 const ar=locale==='ar';
 const [ref,api]=useEmblaCarousel({direction:ar?'rtl':'ltr',align:'start',dragFree:true,containScroll:'trimSnaps',breakpoints:{'(prefers-reduced-motion: reduce)':{duration:0}}});
 const [edges,setEdges]=useState({prev:false,next:false});
 useEffect(()=>{if(!api)return;const sync=()=>setEdges({prev:api.canScrollPrev(),next:api.canScrollNext()});sync();api.on('select',sync).on('reInit',sync);return()=>{api.off('select',sync).off('reInit',sync);};},[api]);
 return <section className={styles.rail} aria-label={ar?'موضوعات الصحة والدواء':'Health and pharma topics'}>
  <div className={styles.railTitle}><strong>{ar?'تابع ما يهم مؤسستك':'Follow what matters to your institution'}</strong><div><Link href={`${ar?'/ar':''}/insights/characters`}>{ar?'كل الموضوعات':'All topics'}<ArrowUpRight size={14}/></Link><button aria-label={ar?'الموضوعات السابقة':'Previous topics'} disabled={!edges.prev} onClick={()=>api?.scrollPrev()}>{ar?<ChevronRight size={16}/>:<ChevronLeft size={16}/>}</button><button aria-label={ar?'الموضوعات التالية':'Next topics'} disabled={!edges.next} onClick={()=>api?.scrollNext()}>{ar?<ChevronLeft size={16}/>:<ChevronRight size={16}/>}</button></div></div>
  <div ref={ref} className={styles.railViewport}><div className={styles.railTrack}><Link href={characterPath('medo',locale)} className={styles.railCharacter}><CharacterPortrait character={characterById('medo')!} size={40}/><strong>{ar?'كبسولة':'Kapsula'}</strong><span>{ar?'الصحة والدواء':'Health & pharma'}</span></Link>{medicalTopics.map(t=>{const Icon=topicIcons[t.id];return <button key={t.id} className={`${styles.railCharacter} ${styles.topicCard}`} aria-pressed={activeTopic===t.id} onClick={()=>onTopic(t.id)}><span className={styles.topicIcon}><Icon size={23}/></span><strong>{t[locale]}</strong><span>{ar?'استكشف القراءات':'Explore readings'}</span></button>;})}</div></div>
 </section>;
}
export function CharacterDirectory({locale,following,onFollow}:{locale:Locale;following:string[];onFollow:(id:string)=>void}){
 const ar=locale==='ar';const c=characterById('medo')!;
 return <section className={styles.directory} aria-label={ar?'موضوعات كبسولة':'Kapsula topics'}>
  <p className={styles.intro}>{ar?'اختر الموضوع الذي يشغل مؤسستك. كل قراءة تبدأ من مصدر، وتوضح ما نعرفه وما يستحق الدراسة.':'Choose what matters to your institution. Each reading starts with a source and distinguishes what we know from what is worth exploring.'}</p>
  <div className={styles.grid}>{medicalTopics.map(t=>{const Icon=topicIcons[t.id];return <Link className={styles.card} key={t.id} href={`${ar?'/ar':''}/insights?topic=${t.id}`}><Icon size={28}/><h2>{t[locale]}</h2><p className={styles.cardBio}>{t.description[locale]}</p><span>{ar?'اقرأ المختارات':'Explore readings'} <ArrowUpRight size={15}/></span></Link>;})}<article className={styles.card}><Link className={styles.cardIdentity} href={characterPath(c.id,locale)}><CharacterPortrait character={c} size={76}/><h2>{c.name[locale]}</h2></Link><p className={styles.cardBio}>{c.bio[locale]}</p><FollowButton character={c} locale={locale} following={following.includes(c.id)} onFollow={()=>onFollow(c.id)}/></article></div>
  <p className={styles.disclosure}>{ar?'كبسولة شخصية تحريرية من VisionSeek. المتابعة محفوظة في هذا المتصفح.':'Kapsula is a VisionSeek editorial character. Follows stay in this browser.'}</p>
 </section>;
}
export function CharacterProfile({character,locale,following,onFollow}:{character:LeaderCharacter;locale:Locale;following:boolean;onFollow:()=>void}){
 const ar=locale==='ar';
 return <section className={styles.profile} aria-label={`${ar?'عن':'About'} ${character.name[locale]}`}><div className={styles.profileIdentity}><CharacterPortrait character={character} size={104}/><div><span className={styles.eyebrow}>{ar?'للقادة وصنّاع القرار في القطاع':'FOR SECTOR LEADERS & DECISION MAKERS'}</span><h1>{character.name[locale]} <small>{ar?character.name.en:character.name.ar}</small></h1><strong>{character.sector[locale]}</strong></div></div><p className={styles.profileBio}>{character.bio[locale]}</p><div className={styles.beats}>{character.beats[locale].map(b=><span key={b}>{b}</span>)}</div><div className={styles.profileActions}><FollowButton character={character} locale={locale} following={following} onFollow={onFollow}/><Link href={`${ar?'/ar':''}/insights/characters`}>{ar?'كل الموضوعات':'All topics'}<ArrowUpRight size={16}/></Link></div><p className={styles.disclosure}>{ar?'شخصية تحريرية من VisionSeek · المتابعة على هذا المتصفح.':'An editorial character by VisionSeek · Follows stay in this browser.'}</p></section>;
}

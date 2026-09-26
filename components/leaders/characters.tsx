'use client';
import Link from 'next/link';
import {useEffect,useState,type CSSProperties} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {ArrowUpRight,Check,ChevronLeft,ChevronRight,Plus,Search} from 'lucide-react';
import {characters,characterPath,type LeaderCharacter} from '@/lib/leaders/characters';
import type {Locale} from '@/lib/leaders/types';
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
export function CharacterRail({locale,following}:{locale:Locale;following:string[]}){
 const ar=locale==='ar';
 const [ref,api]=useEmblaCarousel({direction:ar?'rtl':'ltr',align:'start',dragFree:true,containScroll:'trimSnaps',breakpoints:{'(prefers-reduced-motion: reduce)':{duration:0}}});
 const [edges,setEdges]=useState({prev:false,next:false});
 useEffect(()=>{if(!api)return;const sync=()=>setEdges({prev:api.canScrollPrev(),next:api.canScrollNext()});sync();api.on('select',sync).on('reInit',sync);return()=>{api.off('select',sync).off('reInit',sync);};},[api]);
 const ordered=[...characters].sort((a,b)=>Number(following.includes(b.id))-Number(following.includes(a.id)));
 return <section className={styles.rail} aria-label={ar?'شخصيات بيت القادة':'Leaders House characters'}>
  <div className={styles.railTitle}><strong>{ar?'مجالك له شخصية':'Meet your field’s character'}</strong><div><Link href={`${ar?'/ar':''}/insights/characters`}>{ar?'الكل':'All characters'}<ArrowUpRight size={14}/></Link><button aria-label={ar?'الشخصيات السابقة':'Previous characters'} disabled={!edges.prev} onClick={()=>api?.scrollPrev()}>{ar?<ChevronRight size={16}/>:<ChevronLeft size={16}/>}</button><button aria-label={ar?'الشخصيات التالية':'Next characters'} disabled={!edges.next} onClick={()=>api?.scrollNext()}>{ar?<ChevronLeft size={16}/>:<ChevronRight size={16}/>}</button></div></div>
  <div ref={ref} className={styles.railViewport}><div className={styles.railTrack}>{ordered.map(c=><Link key={c.id} href={characterPath(c.id,locale)} className={styles.railCharacter} aria-label={`${c.name[locale]} — ${c.sector[locale]}`}><CharacterPortrait character={c} size={52}/><strong>{c.name[locale]}</strong><span>{c.sector[locale]}</span>{following.includes(c.id)&&<Check className={styles.followMark} size={14}/>}</Link>)}</div></div>
 </section>;
}
export function CharacterDirectory({locale,following,onFollow}:{locale:Locale;following:string[];onFollow:(id:string)=>void}){
 const [query,setQuery]=useState('');const [onlyFollowing,setOnlyFollowing]=useState(false);const ar=locale==='ar';
 const visible=characters.filter(c=>(!onlyFollowing||following.includes(c.id))&&`${c.name.ar} ${c.name.en} ${c.sector.ar} ${c.sector.en}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
 return <section className={styles.directory} aria-label={ar?'دليل الشخصيات':'Character directory'}>
  <p className={styles.intro}>{ar?'15 شخصية، لكل واحدة مجالها. اختر من تتابع، وتعرّف على ما تهتم به.':'15 characters, each with a field of their own. Find your interests and choose whom to follow.'}</p>
  <p className={styles.disclosure}>{ar?'شخصيات تحريرية من VisionSeek. المتابعة محفوظة في هذا المتصفح.':'Editorial characters by VisionSeek. Your follows are saved in this browser.'}</p>
  <label className={styles.search}><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={ar?'ابحث بالاسم أو المجال':'Search by name or field'} aria-label={ar?'ابحث عن شخصية':'Search characters'}/></label>
  <div className={styles.tabs}><button aria-pressed={!onlyFollowing} onClick={()=>setOnlyFollowing(false)}>{ar?'كل الشخصيات':'All characters'} <span>15</span></button><button aria-pressed={onlyFollowing} onClick={()=>setOnlyFollowing(true)}>{ar?'أتابعهم':'Following'} <span>{following.length}</span></button></div>
  <div className={styles.grid}>{visible.map(c=><article className={styles.card} key={c.id}><Link href={characterPath(c.id,locale)} className={styles.cardIdentity}><CharacterPortrait character={c} size={76}/><h2>{c.name[locale]} <small>{ar?c.name.en:c.name.ar}</small></h2><p>{c.sector[locale]}</p></Link><p className={styles.cardBio}>{c.bio[locale]}</p><div className={styles.cardActions}><FollowButton character={c} locale={locale} following={following.includes(c.id)} onFollow={()=>onFollow(c.id)}/><Link href={characterPath(c.id,locale)} aria-label={`${ar?'صفحة':'View'} ${c.name[locale]}`}>{ar?'الصفحة':'Profile'}<ArrowUpRight size={16}/></Link></div></article>)}</div>
  {!visible.length&&<div className={styles.empty}><h2>{onlyFollowing?(ar?'اختر أول شخصية تتابعها':'Choose your first character'):(ar?'لم نجد شخصية بهذا البحث':'No characters match this search')}</h2><button onClick={()=>{setOnlyFollowing(false);setQuery('');}}>{ar?'عرض كل الشخصيات':'Show all characters'}</button></div>}
 </section>;
}
export function CharacterProfile({character,locale,following,onFollow}:{character:LeaderCharacter;locale:Locale;following:boolean;onFollow:()=>void}){
 const ar=locale==='ar';
 return <section className={styles.profile} aria-label={`${ar?'عن':'About'} ${character.name[locale]}`}><div className={styles.profileIdentity}><CharacterPortrait character={character} size={104}/><div><span className={styles.eyebrow}>{ar?'شخصية من بيت القادة':'A LEADERS HOUSE CHARACTER'}</span><h1>{character.name[locale]} <small>{ar?character.name.en:character.name.ar}</small></h1><strong>{character.sector[locale]}</strong></div></div><p className={styles.profileBio}>{character.bio[locale]}</p><div className={styles.beats}>{character.beats[locale].map(b=><span key={b}>{b}</span>)}</div><div className={styles.profileActions}><FollowButton character={character} locale={locale} following={following} onFollow={onFollow}/><Link href={`${ar?'/ar':''}/insights/characters`}>{ar?'كل الشخصيات':'All characters'}<ArrowUpRight size={16}/></Link></div><p className={styles.disclosure}>{ar?'شخصية تحريرية من VisionSeek · المتابعة على هذا المتصفح.':'An editorial character by VisionSeek · Follows stay in this browser.'}</p></section>;
}

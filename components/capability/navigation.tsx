"use client";
import Image from 'next/image';
import Link from 'next/link';
import {useState,useRef} from 'react';
import {Menu} from 'lucide-react';
import {Sheet,SheetContent,SheetTitle,SheetDescription,SheetTrigger} from '@/components/ui/sheet';
import {publicNav} from '@/lib/institution/navigation';
import {isArchived} from '@/lib/visibility';
import type {Locale} from './content';
export function CapabilityHeader({locale,path='',overlay=false}:{locale:Locale;path?:string;overlay?:boolean}){
 const ar=locale==='ar';const p=ar?'/ar':'';const [open,setOpen]=useState(false);const ref=useRef<HTMLElement>(null);
 void isArchived('/leaders-house');
 const here=(href:string)=>{const clean=href.split('#')[0];return clean!=='/'&&(path===clean||path.startsWith(`${clean}/`));};
 return <header ref={ref} className={`vs-header vs-expanded-header ${overlay?'vs-header-overlay':''}`}>
 <a className="vs-skip" href="#main-content">{ar?'انتقل إلى المحتوى':'Skip to content'}</a>
 <span className="vs-sr">{ar?'مهندس القدرات المؤسسية':'INSTITUTIONAL CAPABILITY ARCHITECT'}</span>
 <div className="vs-nav-wrap"><Link href={p||'/'} className="vs-logo" aria-label={ar?'VisionSeek — الرئيسية':'VisionSeek — home'}><Image src="/visionseek-logo-color.png" alt="VisionSeek" width={2048} height={682} priority/></Link><nav className="vs-desktop-nav" aria-label={ar?'التنقل الرئيسي':'Primary navigation'}>{publicNav.map(link=>{const on=here(link.href);const cta=link.href==='/#contact';return <Link key={link.href} href={`${p}${link.href}`} className={cta?'vs-nav-cta':undefined} aria-current={on?'page':undefined}>{ar?link.ar:link.en}</Link>;})}<Link className="vs-language" href={`${ar?'':'/ar'}${path}`||'/'} hrefLang={ar?'en':'ar'}>{ar?'EN':'العربية'}</Link></nav>
 <div className="vs-mobile-menu"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger className="vs-menu-button"><Menu size={22}/><span>{ar?'القائمة':'Menu'}</span></SheetTrigger><SheetContent side={ar?'left':'right'} className="vs-menu-sheet vs-full-menu" dir={ar?'rtl':'ltr'}><SheetTitle>VisionSeek</SheetTitle><SheetDescription>{ar?'المنهج، البرامج، المجالات.':'Method, programs, domains.'}</SheetDescription><nav aria-label={ar?'قائمة الهاتف':'Mobile navigation'}>{publicNav.map(link=><Link key={link.href} href={`${p}${link.href}`} aria-current={here(link.href)?'page':undefined} onClick={()=>setOpen(false)}>{ar?link.ar:link.en}</Link>)}<Link href={`${ar?'':'/ar'}${path}`||'/'} onClick={()=>setOpen(false)}>{ar?'English':'العربية'}</Link></nav></SheetContent></Sheet></div></div>
 </header>;
}

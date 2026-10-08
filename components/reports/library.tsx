'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, X, ArrowUpRight } from 'lucide-react';
import styles from './reports.module.css';

type Publication = {id:string; kind:'brief'|'reviewed'; number:string; href:string; date:{ar:string;en:string}; topic:{ar:string;en:string}; title:{ar:string;en:string}; summary:{ar:string;en:string}};
// Only what has been written from opened, checked sources and approved for publishing by Dr. Ahmed.
const publications:Publication[]=[
  {id:'agent-governance',kind:'brief',number:'02',href:'/reports/agent-governance',date:{ar:'أكتوبر 2026',en:'October 2026'},topic:{ar:'حوكمة الوكلاء الأذكياء · الخليج ومصر',en:'AI agent governance · Gulf and Egypt'},title:{ar:'حين يتصرّف الوكيل، مَن يُسأل؟',en:'When the agent acts, who answers for it?'},summary:{ar:'ما الذي يفرضه القانون اليوم على الوكلاء الأذكياء في السعودية ومصر والإمارات وقطر، وأربعة عشر سؤالًا قبل أن يتحرك أي وكيل.',en:'What the law already demands of AI agents in Saudi Arabia, Egypt, the UAE and Qatar — and fourteen questions before any agent moves.'}},
];

export default function ReportsLibrary({locale}:{locale:'ar'|'en'}){
  const ar=locale==='ar';const t=(a:string,e:string)=>ar?a:e;const p=ar?'/ar':'';
  const [query,setQuery]=useState('');const [filter,setFilter]=useState<'all'|'brief'|'reviewed'>('all');
  const q=query.trim().toLowerCase();
  const shown=publications.filter(item=>(filter==='all'||item.kind===filter)&&(!q||[item.title[locale],item.topic[locale],item.summary[locale]].some(s=>s.toLowerCase().includes(q))));
  return <section id="library" className={styles.library} aria-labelledby="library-title">
    <div className={styles.sectionHead}><div><p className={styles.label}>{t('استكشف الإصدارات', 'EXPLORE PUBLICATIONS')}</p><h2 id="library-title">{t('مكتبة البحث والتحليل', 'Research & analysis library')}</h2></div></div>
    <div className={styles.libraryTools}>
      <div className={styles.search}><Search size={20} aria-hidden/><label className={styles.srOnly} htmlFor="reports-search">{t('ابحث في الإصدارات', 'Search publications')}</label><input id="reports-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('ابحث بعنوان أو موضوع…', 'Search by title or topic…')}/>{query&&<button type="button" aria-label={t('مسح البحث', 'Clear search')} onClick={()=>setQuery('')}><X size={18}/></button>}</div>
      <div className={styles.filters} role="group" aria-label={t('نوع الإصدار', 'Publication type')}>{([['all',t('الكل','All')],['brief',t('إحاطات','Briefs')],['reviewed',t('تقارير مراجعة','Reviewed reports')]] as const).map(([id,label])=><button type="button" key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div>
    </div>
    <p className={styles.resultCount} role="status" aria-live="polite">{shown.length} {t('إصدار', shown.length===1?'publication':'publications')}</p>
    {shown.length?shown.map(item=><article key={item.id} className={styles.publicationRow}>
      <div className={styles.publicationType}><span>{item.number}</span><p>{item.kind==='brief'?t('إحاطة','Brief'):t('تقرير مراجعة','Reviewed report')}</p><small>{item.date[locale]}</small></div>
      <div><p className={styles.topic}>{item.topic[locale]}</p><h3><Link href={`${p}${item.href}`}>{item.title[locale]}</Link></h3><p>{item.summary[locale]}</p></div>
      <Link className={styles.rowArrow} href={`${p}${item.href}`} aria-label={item.title[locale]}><ArrowUpRight size={20} aria-hidden/></Link>
    </article>):<div className={styles.noResults}><h3>{t('لا يوجد بعد.', 'Nothing here yet.')}</h3><p>{t('لا يوجد إصدار يطابق هذا البحث.', 'No publication matches this search.')}</p></div>}
  </section>;
}

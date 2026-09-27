'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, X } from 'lucide-react';
import { report } from '@/lib/reports/physical-ai';
import styles from './reports.module.css';

export default function ReportsLibrary({locale}:{locale:'ar'|'en'}){
  const ar=locale==='ar';const root=ar?'/ar/reports':'/reports';const t=(a:string,e:string)=>ar?a:e;
  const [query,setQuery]=useState('');const [filter,setFilter]=useState('all');
  const normalize=(value:string)=>value.toLowerCase().normalize('NFKD').replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[أإآ]/g,'ا').trim();
  const searchable=`${report.ar.title} ${report.en.title} تقنية ذكاء اصطناعي بنية تحتية حكومات سياسة صناعة technology artificial intelligence infrastructure government policy industry physical ai`;
  const visible=filter!=='reviewed'&&normalize(searchable).includes(normalize(query));
  return <section id="library" className={styles.library} aria-labelledby="library-title">
    <div className={styles.sectionHead}><div><p className={styles.label}>{t('استكشف الإصدارات', 'EXPLORE PUBLICATIONS')}</p><h2 id="library-title">{t('مكتبة البحث والتحليل', 'Research & analysis library')}</h2></div><span>{t('إصدار متاح واحد', '1 available publication')}</span></div>
    <div className={styles.libraryTools}>
      <div className={styles.search}><Search size={20} aria-hidden/><label className={styles.srOnly} htmlFor="reports-search">{t('ابحث في الإصدارات', 'Search publications')}</label><input id="reports-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('ابحث بعنوان أو موضوع…', 'Search by title or topic…')}/>{query&&<button type="button" aria-label={t('مسح البحث', 'Clear search')} onClick={()=>setQuery('')}><X size={18}/></button>}</div>
      <div className={styles.filters} role="group" aria-label={t('نوع الإصدار', 'Publication type')}>{[['all',t('الكل','All')],['brief',t('إحاطات','Briefs')],['reviewed',t('تقارير مراجعة','Reviewed reports')]].map(([id,label])=><button type="button" key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div>
    </div>
    <p className={styles.resultCount} role="status" aria-live="polite">{visible?t('نتيجة واحدة','1 result'):t('لا توجد نتائج','No results')}</p>
    {visible?<article className={styles.publicationRow}>
      <div className={styles.publicationType}><span>01</span><p>{t('إحاطة استراتيجية', 'Strategic brief')}</p><small>{t('سبتمبر 2026', 'September 2026')}</small></div>
      <div><p className={styles.topic}>{t('التقنية · المؤسسات · القدرات', 'TECHNOLOGY · INSTITUTIONS · CAPABILITIES')}</p><h3><Link href={`${root}/physical-ai`}>{report[locale].title}</Link></h3><p>{t('قراءة استراتيجية لدور الحكومات في ربط التقنية بالمهمات الوطنية والبنية المشتركة والقدرة التشغيلية.', 'A strategic perspective on connecting technology with national missions, shared infrastructure and operating capabilities.')}</p><span className={styles.status}>{t('أرشيف · المراجعة المستقلة غير مثبتة', 'Archive · Independent review not established')}</span></div>
      <Link className={styles.rowArrow} href={`${root}/physical-ai`} aria-label={t('افتح الإحاطة', 'Open brief')}><ArrowUpRight size={26}/></Link>
    </article>:<div className={styles.noResults}><h3>{filter==='reviewed'?t('لا توجد تقارير مراجعة مدرجة حتى الآن.', 'No reviewed reports are listed yet.'):t('لم نعثر على إصدار يطابق بحثك.', 'No publication matches your search.')}</h3><p>{filter==='reviewed'?t('تُدرج الإصدارات هنا بعد استكمال الأدلة والمراجعة واعتماد النشر.', 'Editions are listed after evidence, review and publication approval are complete.'):t('جرّب كلمة أخرى أو اعرض كل الإصدارات.', 'Try another keyword or view all publications.')}</p><button onClick={()=>{setQuery('');setFilter('all');}}>{t('عرض كل الإصدارات', 'View all publications')}</button></div>}
  </section>;
}

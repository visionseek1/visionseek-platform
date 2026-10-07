'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import styles from './reports.module.css';

export default function ReportsLibrary({locale}:{locale:'ar'|'en'}){
  const ar=locale==='ar';const t=(a:string,e:string)=>ar?a:e;
  const [query,setQuery]=useState('');const [filter,setFilter]=useState('all');
  // No publication has completed evidence, review and publication approval. Never seed a row here.
  const publications:never[]=[];
  return <section id="library" className={styles.library} aria-labelledby="library-title">
    <div className={styles.sectionHead}><div><p className={styles.label}>{t('استكشف الإصدارات', 'EXPLORE PUBLICATIONS')}</p><h2 id="library-title">{t('مكتبة البحث والتحليل', 'Research & analysis library')}</h2></div><span>{t('لا يوجد إصدار بعد', 'No publications yet')}</span></div>
    <div className={styles.libraryTools}>
      <div className={styles.search}><Search size={20} aria-hidden/><label className={styles.srOnly} htmlFor="reports-search">{t('ابحث في الإصدارات', 'Search publications')}</label><input id="reports-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('ابحث بعنوان أو موضوع…', 'Search by title or topic…')} disabled/>{query&&<button type="button" aria-label={t('مسح البحث', 'Clear search')} onClick={()=>setQuery('')}><X size={18}/></button>}</div>
      <div className={styles.filters} role="group" aria-label={t('نوع الإصدار', 'Publication type')}>{[['all',t('الكل','All')],['brief',t('إحاطات','Briefs')],['reviewed',t('تقارير مراجعة','Reviewed reports')]].map(([id,label])=><button type="button" key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)} disabled>{label}</button>)}</div>
    </div>
    <p className={styles.resultCount} role="status" aria-live="polite">{publications.length} {t('إصدار', 'publications')}</p>
    <div className={styles.noResults}>
      <h3>{t('لا يوجد بعد.', 'Nothing here yet.')}</h3>
      <p>{t('المكتبة فارغة لأن أي إصدار لم يستوفِ بعد أدلته ومراجعته واعتماد نشره. نفضّل أن نتركها فارغة على أن نملأها بما لم يكتمل.', 'The library is empty because no publication has yet completed its evidence, review and publication approval. We would rather leave it empty than fill it with work that is not finished.')}</p>
    </div>
  </section>;
}

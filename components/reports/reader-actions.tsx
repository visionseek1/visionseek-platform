'use client';
import { useState } from 'react';
import { Copy, Printer, Check } from 'lucide-react';
import styles from './reader.module.css';
export default function ReaderActions({locale,citation}:{locale:'ar'|'en';citation:string}){
 const [state,setState]=useState<'idle'|'copied'|'error'>('idle');const ar=locale==='ar';
 async function copy(){try{await navigator.clipboard.writeText(citation);setState('copied');}catch{setState('error');}}
 return <div className={styles.actionGroup}><div className={styles.actions}><button onClick={()=>window.print()}><Printer size={17}/>{ar?'طباعة / حفظ PDF':'Print / Save PDF'}</button><button onClick={copy}>{state==='copied'?<Check size={17}/>:<Copy size={17}/>} {ar?'نسخ الاستشهاد':'Copy citation'}</button></div><span role="status" aria-live="polite" className={styles.copyStatus}>{state==='copied'?(ar?'تم نسخ الاستشهاد.':'Citation copied.'):state==='error'?(ar?'تعذّر النسخ. يمكنك تحديد نص الاستشهاد أسفل الصفحة ونسخه.':'Copy failed. Select the citation text at the end of this page to copy it.'):''}</span></div>;
}

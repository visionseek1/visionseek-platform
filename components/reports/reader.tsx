import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/site-header';
import { report, sources } from '@/lib/reports/physical-ai';
import ReaderActions from './reader-actions';
import styles from './reader.module.css';

export default function ReportReader({locale}:{locale:'ar'|'en'}){
 const ar=locale==='ar';const root=ar?'/ar/reports':'/reports';const copy=report[locale];const t=(a:string,e:string)=>ar?a:e;
 const original=`https://visionseek.org${ar?'/ar':''}/insights/physical-ai`;
 const citation=`VisionSeek. (2026, ${ar?'سبتمبر':'September'}). ${copy.title}. ${ar?'إحاطة استراتيجية من الأرشيف؛ المراجعة المستقلة غير مثبتة.':'Archival strategic brief; independent review not established.'} ${original}`;
 const contents=[['summary',t('الملخص التنفيذي','Executive summary')],['signals',t('الإشارات الرئيسية','Key signals')],['gap',t('الفجوة الاستراتيجية','Strategic gap')],['agenda',t('أجندة العمل','Action agenda')],['perspective',t('منظور VisionSeek','VisionSeek perspective')],['publication-record',t('بيانات الإصدار وحدوده','Publication record & limits')],['references',t('المراجع والاستشهاد','Sources & citation')]];
 return <div className={styles.page} lang={locale} dir={ar?'rtl':'ltr'}>
  <div className={styles.siteHeader}><SiteHeader locale={locale} items={[]} languageHref={`${ar?'':'/ar'}/reports/physical-ai`} solid/></div>
  <main id="main-content" className={styles.main}>
   <header className={styles.header}>
    <nav className={styles.breadcrumb} aria-label={t('مسار الصفحة','Breadcrumb')}><Link href={root}>{t('التقارير','Reports')}</Link><span aria-hidden>/</span><span>{t('إحاطة استراتيجية','Strategic brief')}</span></nav>
    <div className={styles.headingGrid}><div><p className={styles.label}>VISIONSEEK / GOVERNMENT BRIEF 01</p><h1>{copy.title}</h1><p className={styles.standfirst}>{copy.standfirst}</p><div className={styles.meta}><span>VisionSeek</span><span>{copy.date}</span><span>{t('من الأرشيف','From the archive')}</span></div><ReaderActions locale={locale} citation={citation}/></div><div className={styles.cover}><Image src="/field-industry.jpg" alt={t('صورة توضيحية لخط إنتاج صناعي','Illustrative industrial production line')} fill sizes="(max-width:760px) 100vw, 30vw" priority/><div><span>VISIONSEEK</span><strong>PHYSICAL<br/>AI</strong><span>STRATEGIC PERSPECTIVE / 01</span></div></div></div>
    <p className={styles.notice}>{t('هذه إحاطة استراتيجية منشورة سابقًا، وليست دراسة كمية أو تقريرًا ثبتت مراجعته المستقلة. يحتفظ هذا العرض بالنص الأصلي؛ اقرأ حدود الاستخدام وبيانات الإصدار أدناه.', 'This is a previously published strategic brief, not a quantitative study or an independently verified report. This reader preserves the original text; see the publication record and limitations below.')}</p>
   </header>
   <div className={styles.readingLayout}>
    <aside className={styles.contents}><div><h2>{t('في هذه الإحاطة','In this brief')}</h2><nav aria-label={t('فهرس الإحاطة','Brief contents')}>{contents.map(([id,label],i)=><a key={id} href={`#${id}`}><span>{String(i+1).padStart(2,'0')}</span>{label}</a>)}</nav><Link className={styles.methodLink} href={`${root}/methodology`}>{t('معايير قسم التقارير','Department standards')} ↗</Link></div></aside>
    <article className={styles.article}>
     <section id="summary" className={styles.summary}><p className={styles.label}>01 / {copy.summaryLabel}</p><h2>{t('النتيجة العامة أولًا. ثم التقنية.', 'Public outcomes first. Then technology.')}</h2><p>{copy.summary}</p></section>
     <section id="signals"><p className={styles.label}>02 / {t('قراءة استراتيجية','STRATEGIC PERSPECTIVE')}</p><h2>{copy.findingsLabel}</h2><div className={styles.signals}>{copy.findings.map(([number,title,body])=><div key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div></section>
     <section id="gap" className={styles.gap}><p className={styles.label}>03 / {copy.connectionLabel}</p><h2>{copy.connectionTitle}</h2><p>{copy.connection}</p></section>
     <section id="agenda"><p className={styles.label}>04 / {t('أجندة مقترحة في الإحاطة','AGENDA PROPOSED IN THE BRIEF')}</p><h2>{copy.actionLabel}</h2><ol className={styles.agenda}>{copy.actions.map(([title,body],i)=><li key={title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
     <section id="perspective" className={styles.perspective}><p className={styles.label}>05 / {copy.perspectiveLabel}</p><blockquote>{copy.perspective}</blockquote></section>
     <section id="publication-record"><p className={styles.label}>06 / {t('الشفافية','TRANSPARENCY')}</p><h2>{t('بيانات الإصدار وحدود الاستخدام','Publication record and limitations')}</h2><dl className={styles.record}>{[
       [t('نوع المحتوى','Content type'),t('إحاطة استراتيجية من الأرشيف؛ منظور تحليلي','Archival strategic brief; analytical perspective')],
       [t('النسبة الظاهرة في الأصل','Original attribution'),'VisionSeek'],
       [t('التاريخ الظاهر في الأصل','Date shown in the original'),copy.date],
       [t('المراجعة المستقلة','Independent review'),t('غير مثبتة؛ لا يوجد سجل مراجعة مرتبط بهذا الإصدار.','Not established; no review record is attached to this edition.')],
       [t('البيانات وكود التحليل','Data and analytical code'),t('لا توجد مجموعة بيانات أو حزمة إعادة حساب مرفقة.','No dataset or computational reproduction package is attached.')],
       [t('سجل الإصدار','Version record'),t('أُعيد تنظيم العرض في 27 سبتمبر 2026 دون إعادة كتابة متن الإحاطة؛ لا يمثل ذلك مراجعة علمية جديدة.','Reader reorganized on 27 September 2026 without rewriting the brief text; this is not a new scientific review.')],
      ].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className={styles.limit}>{t('تُقرأ الاستنتاجات والتوصيات باعتبارها منظورًا استراتيجيًا. لم يُنجز في هذا العرض ربط كل دعوى بمصدر محدد أو اختبار سببي أو مقارنة كمية بين الدول. يلزم فحص إضافي قبل استخدامها أساسًا لقرار تنفيذي.', 'Read conclusions and recommendations as a strategic perspective. This reader does not establish claim-level source mapping, causal evidence or quantitative country comparisons. Further examination is needed before operational decisions.')}</p><Link href={ar?'/ar/insights/physical-ai':'/insights/physical-ai'} className={styles.textLink}>{t('افتح موضع النشر الأصلي','Open the original publication')} ↗</Link></section>
     <section id="references"><p className={styles.label}>07 / {t('المراجع','REFERENCES')}</p><h2>{t('المصادر المدرجة في الإحاطة','Sources listed in the brief')}</h2><p>{t('هذه قائمة المراجع الأصلية. وجودها لا يثبت وحده صحة كل دعوى أو اكتمال التغطية البحثية.', 'These are the original listed references. Their presence alone does not verify every claim or establish complete research coverage.')}</p><ol className={styles.sources}>{sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span>{source.name}</span><strong>{source.title}</strong><span aria-hidden>↗</span></a></li>)}</ol><h3>{t('استشهاد مقترح','Suggested citation')}</h3><p className={styles.citation}>{citation}</p></section>
    </article>
   </div>
   <footer className={styles.footer}><Link href={root}>← {t('العودة إلى مكتبة التقارير','Back to the research library')}</Link><span>VISIONSEEK / MAKE IT POSSIBLE</span></footer>
  </main>
 </div>;
}

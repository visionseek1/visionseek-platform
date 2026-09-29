import Image from 'next/image';
import { Globe2, Plus } from 'lucide-react';
import { globalProjectEntries, stageLabels } from '@/lib/global-projects/entries';
import type { Locale } from '@/components/capability/content';
import styles from './project-strip.module.css';

export default function GlobalProjectStrip({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  // No unapproved organization/name/mark is included in a production build.
  // Promotion of a review build is also prohibited by the release brief.
  const review = process.env.VERCEL_ENV !== 'production';
  const entries = globalProjectEntries.filter(entry => review || entry.logo.permission === 'approved');
  if (!entries.length) return null;

  return <section id="global-projects" className={styles.section} aria-labelledby="global-projects-title">
    <div className={styles.intro}>
      <span className={styles.eyebrow}><Globe2 size={18} aria-hidden="true" />{ar ? 'طموح عالمي. عمل يبدأ هنا.' : 'GLOBAL AMBITION. WORK STARTS HERE.'}</span>
      <h2 id="global-projects-title">{ar ? 'مشروعاتنا على الساحة العالمية' : 'Our projects. A global horizon.'}</h2>
      <p>{ar ? 'الجهات والفرص التي تتجه إليها مشروعاتنا، وحالة كل مسار.' : 'The organizations and opportunities our projects are pursuing—and where each stands.'}</p>
    </div>
    <div className={styles.entries} role="list" aria-label={ar ? 'المشروعات والجهات المستهدفة' : 'Projects and prospective organizations'}>
      {entries.map(entry => <article className={styles.card} key={entry.id} role="listitem">
        <div className={styles.cardTop}>
          <div className={styles.mark}>
            <Image src={entry.logo.src} width={entry.logo.width} height={entry.logo.height} alt={entry.organization} sizes="220px" />
          </div>
          <span className={styles.stage}>{stageLabels[entry.stage][locale]}</span>
        </div>
        <p className={styles.opportunity}>{entry.opportunity[locale]}</p>
        <details className={styles.details}>
          <summary><span>{entry.title[locale]}</span><Plus size={20} aria-hidden="true" /></summary>
          <div className={styles.context}>
            <p>{entry.context[locale]}</p>
            <div className={styles.meta}><span dir="ltr">{entry.id}</span><span>{ar ? 'آخر مراجعة: ' : 'Reviewed: '}<time dateTime={entry.checkedAt}>{entry.checkedAt}</time></span></div>
            <a href={entry.officialUrl} target="_blank" rel="noopener noreferrer">{ar ? 'اطّلع على التحدي الرسمي' : 'View the official challenge'}</a>
          </div>
        </details>
        {entry.stage === 'preparing' && <p className={styles.note}>{ar ? 'لم يُقدَّم طلب بعد · لا تعني الإشارة وجود شراكة' : 'Not yet submitted · No partnership implied'}</p>}
      </article>)}
    </div>
  </section>;
}

import Image from 'next/image';
import { Globe2 } from 'lucide-react';
import { globalProjectEntries } from '@/lib/global-projects/entries';
import type { Locale } from '@/components/capability/content';
import styles from './project-strip.module.css';

export default function GlobalProjectStrip({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  // A targeted opportunity does not establish work for its organizing institution.
  const review = process.env.VERCEL_ENV !== 'production';
  const entries = globalProjectEntries.filter(entry =>
    entry.stage === 'commissioned' && (review || entry.logo.permission === 'approved')
  );
  if (!entries.length) return null;

  return <section id="global-projects" className={styles.section} aria-labelledby="global-projects-title">
    <div className={styles.intro}>
      <span className={styles.eyebrow}><Globe2 size={18} aria-hidden="true" />{ar ? 'على الساحة العالمية' : 'A GLOBAL HORIZON'}</span>
      <h2 id="global-projects-title">{ar ? 'جهات نطوّر لها حلولًا' : 'Organizations we develop solutions for'}</h2>
    </div>
    <ul className={styles.entries} aria-label={ar ? 'جهات نطوّر لها حلولًا' : 'Organizations we develop solutions for'}>
      {entries.map(entry => <li className={styles.mark} key={entry.id}>
        <Image src={entry.logo.src} width={entry.logo.width} height={entry.logo.height} alt={entry.organization} sizes="220px" />
      </li>)}
    </ul>
  </section>;
}

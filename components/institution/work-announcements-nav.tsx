import {formatOpenCount, workAnnouncementBands, type Locale} from '@/lib/work-announcements';
import styles from './work-announcements-nav.module.css';

/** Large jump cards under the Work with us hero. Two bands only — not the old guide tabs. */
export function WorkAnnouncementsNav({locale, fontClassName = ''}: {locale: Locale; fontClassName?: string}) {
  const ar = locale === 'ar';
  const bands = workAnnouncementBands();

  return (
    <nav
      id="work-announcements"
      className={`${styles.band} ${ar ? styles.ar : styles.en} ${fontClassName}`}
      aria-label={ar ? 'أقسام الإعلانات' : 'Announcement sections'}
    >
      <div className={styles.grid}>
        {bands.map(band => (
          <a key={band.id} className={styles.card} href={band.href} data-band={band.id}>
            <span className={styles.mark} aria-hidden="true"/>
            <span className={styles.copy}>
              <span className={styles.title}>{band.title[locale]}</span>
              <span className={styles.count}>{formatOpenCount(band.open, locale)}</span>
            </span>
            <span className={styles.go} aria-hidden="true"/>
          </a>
        ))}
      </div>
    </nav>
  );
}

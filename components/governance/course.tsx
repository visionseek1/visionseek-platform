import Image from 'next/image';
import Link from 'next/link';
import {coursePath, enrollHref, localePath, tx, type Bi, type Locale, workshop} from '@/lib/governance';
import {Shell} from './shell';
import styles from './governance.module.css';

const t = (locale: Locale, value: Bi) => tx(locale, value);

function Lockup() {
  return (
    <div className={styles.lockup}>
      <Image src={workshop.logo} alt="VisionSeek" width={1254} height={1254} className={styles.logo} priority />
      <span className={styles.wordmark} lang="en" dir="ltr">VISIONSEEK</span>
    </div>
  );
}

function Subscribe({locale}: {locale: Locale}) {
  return (
    <Link className={`${styles.lime} ${styles.enroll}`} href={enrollHref(locale)}>
      {t(locale, workshop.subscribe)}
    </Link>
  );
}

export function MasterclassPage({locale}: {locale: Locale}) {
  const masterclass = locale === 'ar' ? 'ماستركلاس' : 'Masterclass';
  return (
    <Shell locale={locale} path={coursePath}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Lockup />
            <h1>{t(locale, workshop.title)}</h1>
            <p className={styles.subtitle}>{t(locale, workshop.subtitle)}</p>
            <Subscribe locale={locale} />
          </div>
          <figure className={styles.poster}>
            <Image src={workshop.cover} alt={t(locale, workshop.coverAlt)} width={1280} height={720} priority />
          </figure>
        </div>
      </header>
      <div className={styles.wrap}>
        <nav className={styles.crumb} aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>
          <Link href={locale === 'ar' ? '/ar' : '/'}>{t(locale, workshop.home)}</Link>
          <span aria-hidden="true">/</span>
          <Link href={localePath(locale, '/masterclass')}>{masterclass}</Link>
          <span aria-hidden="true">/</span>
          <span>{t(locale, workshop.title)}</span>
        </nav>

        <section className={styles.block} aria-labelledby="course-blurb">
          <h2 id="course-blurb" className={styles.visuallyHidden}>{t(locale, workshop.title)}</h2>
          <p className={styles.lede}>{t(locale, workshop.blurb)}</p>
        </section>

        <section className={styles.block} aria-labelledby="course-topics">
          <h2 id="course-topics">{t(locale, workshop.topicsLabel)}</h2>
          <ul className={styles.topics}>
            {workshop.topics.map(topic => (
              <li key={topic.en}>{t(locale, topic)}</li>
            ))}
          </ul>
        </section>

        <section className={styles.block} aria-labelledby="course-instructor">
          <p className={styles.sectionLabel} id="course-instructor">{t(locale, workshop.instructorLabel)}</p>
          <p className={styles.instructorName}>{t(locale, workshop.instructorShort)}</p>
          <Subscribe locale={locale} />
        </section>
      </div>
    </Shell>
  );
}

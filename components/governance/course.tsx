import Image from 'next/image';
import Link from 'next/link';
import {coursePage, coursePath, localePath, tx, type Bi, type Locale, workshop} from '@/lib/governance';
import {InterestButton} from '@/components/interest/interest-form';
import {Shell} from './shell';
import styles from './governance.module.css';

const t = (locale: Locale, value: Bi) => tx(locale, value);

/** The last sentence of a paragraph, unchanged, including its closing period. */
function lastSentence(paragraph: string) {
  const parts = paragraph.trim().split(/\.\s+/);
  return parts[parts.length - 1];
}

function Lockup() {
  return (
    <div className={styles.lockup}>
      <Image src={workshop.logo} alt="VisionSeek" width={1254} height={1254} className={styles.logo} priority />
      <span className={styles.wordmark} lang="en" dir="ltr">VISIONSEEK</span>
    </div>
  );
}

function Register({locale}: {locale: Locale}) {
  return (
    <div className={styles.enrollRow}>
      <InterestButton
        locale={locale}
        topic={t(locale, workshop.title)}
        page={coursePage(locale)}
        label={t(locale, workshop.subscribe)}
        className={`${styles.lime} ${styles.enroll}`}
      />
    </div>
  );
}

export function MasterclassPage({locale}: {locale: Locale}) {
  const about = t(locale, workshop.blurb).split('\n\n');
  const forWhom = lastSentence(about[about.length - 1]);
  return (
    <Shell locale={locale} path={coursePath}>
      <div className={styles.wrap}>
        <nav className={styles.crumb} aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>
          <Link href={locale === 'ar' ? '/ar' : '/'}>{t(locale, workshop.home)}</Link>
          <span aria-hidden="true">/</span>
          <Link href={localePath(locale, '/institute')}>{locale === 'ar' ? 'معهد VisionSeek' : 'VisionSeek Institute'}</Link>
          <span aria-hidden="true">/</span>
          <Link href={localePath(locale, '/institute/masterclass')}>{locale === 'ar' ? 'ماستر كلاس' : 'Masterclass'}</Link>
          <span aria-hidden="true">/</span>
          <span>{t(locale, workshop.title)}</span>
        </nav>

        <div className={styles.layout}>
          <header className={styles.courseHead}>
            <Lockup />
            <h1>{t(locale, workshop.title)}</h1>
            <figure className={styles.poster}>
              <Image
                src={workshop.cover[locale]}
                alt={t(locale, workshop.coverAlt)}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 900px) 100vw, 720px"
                style={{width: '100%', height: 'auto', objectFit: 'contain'}}
              />
            </figure>
          </header>

          <aside className={styles.enrollCard}>
            <InterestButton
              locale={locale}
              topic={t(locale, workshop.title)}
              page={coursePage(locale)}
              label={t(locale, workshop.subscribe)}
              className={`${styles.lime} ${styles.enroll}`}
            />
          </aside>

          <div className={styles.sections}>
            <section className={styles.block} aria-labelledby="course-about">
              <h2 id="course-about">{t(locale, workshop.aboutLabel)}</h2>
              {about.map(paragraph => (
                <p className={styles.lede} key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section className={styles.block} aria-labelledby="course-for">
              <h2 id="course-for">{t(locale, workshop.forLabel)}</h2>
              <p className={styles.lede}>{forWhom}</p>
            </section>

            <section className={styles.block} aria-labelledby="course-gain">
              <h2 id="course-gain">{t(locale, workshop.gainLabel)}</h2>
              <p className={styles.lede}>{t(locale, workshop.soon)}</p>
            </section>

            <section className={styles.block} aria-labelledby="course-details">
              <h2 id="course-details">{t(locale, workshop.detailsLabel)}</h2>
              <dl className={styles.facts}>
                <div>
                  <dt>{t(locale, workshop.durationLabel)}</dt>
                  <dd>{t(locale, workshop.soon)}</dd>
                </div>
                <div>
                  <dt>{t(locale, workshop.formatLabel)}</dt>
                  <dd>{t(locale, workshop.soon)}</dd>
                </div>
              </dl>
            </section>

            <section className={styles.block} aria-labelledby="course-instructor">
              <h2 id="course-instructor">{t(locale, workshop.instructorLabel)}</h2>
              <p className={styles.instructorName}>{t(locale, workshop.instructorShort)}</p>
            </section>

            <section className={styles.block} aria-labelledby="course-related">
              <p className={styles.sectionLabel}>{t(locale, workshop.relatedProgram.kicker)}</p>
              <h2 id="course-related">{t(locale, workshop.relatedProgram.title)}</h2>
              <p className={styles.lede}>
                <Link href={localePath(locale, workshop.relatedProgram.href)}>{t(locale, workshop.relatedProgram.cta)}</Link>
              </p>
            </section>

            <section className={styles.block} aria-labelledby="course-enroll">
              <h2 id="course-enroll">{t(locale, workshop.enrollLabel)}</h2>
              <Register locale={locale} />
            </section>
          </div>
        </div>
      </div>
    </Shell>
  );
}

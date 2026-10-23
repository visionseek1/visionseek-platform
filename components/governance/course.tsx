import Image from 'next/image';
import Link from 'next/link';
import {localePath, sectionPath, tx, workshopPath, type Bi, type Locale, governance, workshop} from '@/lib/governance';
import {Shell} from './shell';
import {Simulation} from './simulation';
import styles from './governance.module.css';

const t = (locale: Locale, value: Bi) => tx(locale, value);

function Crumb({locale, current}: {locale: Locale; current?: string}) {
  return (
    <nav className={styles.crumb} aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>
      <Link href={locale === 'ar' ? '/ar' : '/'}>{t(locale, workshop.home)}</Link>
      <span aria-hidden="true">/</span>
      {current ? (
        <>
          <Link href={localePath(locale, sectionPath)}>{t(locale, governance.section.title)}</Link>
          <span aria-hidden="true">/</span>
          <span>{current}</span>
        </>
      ) : (
        <span>{t(locale, governance.section.title)}</span>
      )}
    </nav>
  );
}

function Lockup() {
  return (
    <div className={styles.lockup}>
      <Image src={workshop.logo} alt="VisionSeek" width={1254} height={1254} className={styles.logo} priority />
      <span className={styles.wordmark} lang="en" dir="ltr">VISIONSEEK</span>
    </div>
  );
}

const toc = [
  ['promise', workshop.promiseLabel],
  ['problem', workshop.problemLabel],
  ['method', workshop.methodLabel],
  ['journey', workshop.journeyLabel],
  ['audience', workshop.audienceLabel],
  ['simulation', workshop.simulation.label],
  ['exercise', workshop.exercise.label],
  ['sources', workshop.sourcesLabel],
] as const;

export function GovernanceIndex({locale}: {locale: Locale}) {
  const section = governance.section;
  return (
    <Shell locale={locale} path={sectionPath}>
      <header className={styles.hero}>
        <div className={`${styles.heroInner} ${styles.heroSolo}`}>
          <div className={styles.heroCopy}>
            <Lockup />
            <h1>{t(locale, section.title)}</h1>
            <p className={styles.subtitle}>{t(locale, section.intro)}</p>
          </div>
        </div>
      </header>
      <div className={styles.wrap}>
        <Crumb locale={locale} />
        <section className={styles.block} aria-labelledby="workshop-list">
          <p className={styles.sectionLabel} id="workshop-list">{t(locale, section.title)}</p>
          <div className={styles.catalog}>
            <Link className={styles.card} href={localePath(locale, workshopPath)}>
              <Image src={workshop.cover} alt="" width={1280} height={720} />
              <div>
                <p className={styles.kicker}>{t(locale, workshop.position)}</p>
                <h2>{t(locale, workshop.subtitle)}</h2>
                <p>{t(locale, workshop.withLine)}</p>
                <strong>{t(locale, workshop.enter)}</strong>
              </div>
            </Link>
          </div>
          <p className={styles.empty}>{t(locale, section.empty)}</p>
        </section>
      </div>
    </Shell>
  );
}

export function MasterclassPage({locale}: {locale: Locale}) {
  const exercise = workshop.exercise;
  return (
    <Shell locale={locale} path={workshopPath}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Lockup />
            <p className={styles.kicker}>{t(locale, workshop.kicker)}</p>
            <h1>{t(locale, workshop.title)}</h1>
            <p className={styles.subtitle}>{t(locale, workshop.subtitle)}</p>
            <p className={styles.byline}>{t(locale, workshop.withLine)}</p>
            <p className={styles.meta}>
              <span>{t(locale, governance.section.title)}</span>
              <span>{t(locale, workshop.position)}</span>
              <span>{t(locale, exercise.label)} · {t(locale, exercise.minutesLabel)}</span>
            </p>
          </div>
          <figure className={styles.poster}>
            <Image src={workshop.cover} alt={t(locale, workshop.coverAlt)} width={1280} height={720} priority />
          </figure>
        </div>
      </header>
      <nav className={styles.subnav} aria-label={t(locale, workshop.onThisPage)}>
        <ul>
          {toc.map(([id, label]) => (
            <li key={id}><a href={`#${id}`}>{t(locale, label)}</a></li>
          ))}
        </ul>
      </nav>
      <div className={styles.wrap}>
        <Crumb locale={locale} current={t(locale, workshop.position)} />

        <section className={styles.block} id="promise">
          <h2>{t(locale, workshop.promiseLabel)}</h2>
          <p className={styles.lede}>{t(locale, workshop.promise)}</p>
          <blockquote className={styles.quote}>
            <p>{t(locale, workshop.quote)}</p>
            <footer>{t(locale, workshop.quoteBy)}</footer>
          </blockquote>
          <p className={styles.follow}>{t(locale, workshop.idea)}</p>
        </section>

        <section className={styles.block} id="problem">
          <p className={styles.sectionLabel}>01</p>
          <h2>{t(locale, workshop.problemLabel)}</h2>
          <ol className={styles.evidence}>
            {workshop.evidence.map((item, index) => (
              <li key={item.source.url}>
                <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{t(locale, item.title)}</h3>
                  <p>{t(locale, item.body)}</p>
                  <a className={styles.source} href={item.source.url} target="_blank" rel="noreferrer" dir="ltr">
                    {item.source.title}
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <aside className={styles.note}>
            <strong>{t(locale, workshop.honestyLabel)}</strong>
            <p>{t(locale, workshop.honesty)}</p>
          </aside>
        </section>

        <section className={styles.block} id="method">
          <p className={styles.sectionLabel}>{t(locale, workshop.methodName)}</p>
          <h2>{t(locale, workshop.methodLabel)}</h2>
          <p className={styles.lede}>{t(locale, workshop.methodIntro)}</p>
          <ol className={styles.steps}>
            {workshop.steps.map(step => (
              <li key={step.mark}>
                <span className={styles.mark} aria-hidden="true">{step.mark}</span>
                <div>
                  <h3>{t(locale, step.title)}</h3>
                  <p>{t(locale, step.body)}</p>
                </div>
              </li>
            ))}
          </ol>
          <ol className={styles.path}>
            {workshop.path.map(step => <li key={step.en}>{t(locale, step)}</li>)}
          </ol>
        </section>

        <section className={styles.block} id="journey">
          <p className={styles.sectionLabel}>02</p>
          <h2>{t(locale, workshop.journeyLabel)}</h2>
          <div className={styles.stations}>
            {workshop.stations.map((station, index) => (
              <article key={station.title.en} className={styles.station}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{t(locale, station.title)}</h3>
                <p><em>{t(locale, workshop.questionLabel)} </em>{t(locale, station.question)}</p>
                <p><em>{t(locale, workshop.outcomeLabel)} </em>{t(locale, station.outcome)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.block} id="audience">
          <p className={styles.sectionLabel}>03</p>
          <h2>{t(locale, workshop.audienceLabel)}</h2>
          <p className={styles.lede}>{t(locale, workshop.audience)}</p>
          <p className={`${styles.sectionLabel} ${styles.examplesLabel}`}>{t(locale, workshop.examplesLabel)}</p>
          <ul className={styles.examples}>
            {workshop.examples.map(item => <li key={item.en}>{t(locale, item)}</li>)}
          </ul>
        </section>

        <section className={styles.block} id="simulation">
          <p className={styles.sectionLabel}>04</p>
          <h2>{t(locale, workshop.simulation.title)}</h2>
          <Simulation locale={locale} />
        </section>

        <section className={styles.block} id="exercise">
          <p className={styles.sectionLabel}>{t(locale, exercise.minutesLabel)}</p>
          <h2>{t(locale, exercise.label)}</h2>
          <ol className={styles.steps}>
            {exercise.steps.map((step, index) => (
              <li key={step.title.en}>
                <span className={styles.mark}>{index + 1}</span>
                <div>
                  <h3>{t(locale, step.title)}</h3>
                  <p>{t(locale, step.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.block} id="sources">
          <p className={styles.sectionLabel}>05</p>
          <h2>{t(locale, workshop.sourcesLabel)}</h2>
          <ol className={styles.evidence}>
            {workshop.evidence.map((item, index) => (
              <li key={item.source.url}>
                <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <a className={styles.source} href={item.source.url} target="_blank" rel="noreferrer" dir="ltr">
                    {item.source.title}
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.follow}>{t(locale, workshop.sourcesNote)}</p>
        </section>
      </div>
      <section className={styles.cta} id="session">
        <div className={styles.ctaInner}>
          <Image src={workshop.logo} alt="" width={1254} height={1254} className={styles.logo} />
          <div>
            <h2>{t(locale, workshop.cta.title)}</h2>
            <p>{t(locale, workshop.cta.body)}</p>
            <Link className={styles.lime} href={localePath(locale, '/start')}>{t(locale, workshop.cta.button)}</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}

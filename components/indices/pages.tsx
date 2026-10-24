import type {ReactNode} from 'react';
import Link from 'next/link';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {
  indexPath,
  indicesContent,
  liveIndices,
  notifyMailto,
  type IndexEntry,
} from '@/lib/indices';
import styles from './indices.module.css';

type Locale = 'ar' | 'en';

function Shell({locale, path, children}: {locale: Locale; path: string; children: ReactNode}) {
  const ar = locale === 'ar';
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path={path}/>
      <main id="main-content" className={`${styles.page} ${ar ? styles.ar : styles.en}`}>
        {children}
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

function Crumb({locale, trail}: {locale: Locale; trail: {href?: string; label: string}[]}) {
  const {hub} = indicesContent;
  const prefix = locale === 'ar' ? '/ar' : '';
  return (
    <nav className={styles.crumb} aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>
      <Link href={prefix || '/'}>{hub.home[locale]}</Link>
      {trail.map((item, i) => (
        <span key={item.label}>
          <span aria-hidden="true"> / </span>
          {item.href
            ? <Link href={`${prefix}${item.href}`}>{item.label}</Link>
            : <span aria-current={i === trail.length - 1 ? 'page' : undefined}>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

function IndexArticle({locale, item, solo}: {locale: Locale; item: IndexEntry; solo?: boolean}) {
  const {notify} = indicesContent;
  const prefix = locale === 'ar' ? '/ar' : '';
  return (
    <article id={item.slug} className={`${styles.article} ${solo ? styles.articleSolo : ''}`} aria-labelledby={`${item.slug}-title`}>
      <p className={styles.status}>{item.statusLabel[locale]}</p>
      {solo
        ? <h1 id={`${item.slug}-title`}>{item.title[locale]}</h1>
        : <h2 id={`${item.slug}-title`}><Link href={`${prefix}${indexPath(item.slug)}`}>{item.title[locale]}</Link></h2>}
      <p className={styles.lede}>{item.lede[locale]}</p>

      <section className={styles.block} aria-labelledby={`${item.slug}-measures`}>
        <h3 id={`${item.slug}-measures`}>{item.measuresTitle[locale]}</h3>
        <p>{item.measures[locale]}</p>
      </section>

      <section className={styles.block} aria-labelledby={`${item.slug}-pillars`}>
        <h3 id={`${item.slug}-pillars`}>{item.pillarsTitle[locale]}</h3>
        <p>{item.pillarsIntro[locale]}</p>
        <ol className={styles.pillars}>
          {item.pillars.map((pillar, i) => (
            <li key={pillar.id} className={styles.pillar}>
              <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p className={styles.pillarName}>{pillar.name[locale]}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className={styles.panels}>
        <section className={styles.panel} aria-labelledby={`${item.slug}-benchmark`}>
          <h3 id={`${item.slug}-benchmark`}>{item.benchmarkTitle[locale]}</h3>
          <p>{item.benchmark[locale]}</p>
        </section>
        <section className={styles.panel} aria-labelledby={`${item.slug}-method`}>
          <h3 id={`${item.slug}-method`}>{item.methodologyTitle[locale]}</h3>
          <p>{item.methodology[locale]}</p>
        </section>
        <section className={styles.panel} aria-labelledby={`${item.slug}-pilot`}>
          <h3 id={`${item.slug}-pilot`}>{item.pilotTitle[locale]}</h3>
          <p>{item.pilot[locale]}</p>
        </section>
      </div>

      <section className={styles.results} aria-labelledby={`${item.slug}-results`}>
        <h3 id={`${item.slug}-results`}>{item.resultsTitle[locale]}</h3>
        <p>{item.results[locale]}</p>
      </section>

      <div className={styles.notify}>
        <a className={styles.button} href={notifyMailto(locale)}>
          {notify.label[locale]}
          <ArrowRight size={20} aria-hidden="true"/>
        </a>
        <p className={styles.hint}>{notify.hint[locale]}</p>
      </div>
    </article>
  );
}

export function IndicesHub({locale}: {locale: Locale}) {
  const {hub} = indicesContent;
  const list = liveIndices();
  return (
    <Shell locale={locale} path="/indices">
      <div className={styles.wrap}>
        <Crumb locale={locale} trail={[{label: hub.title[locale]}]}/>
        <header className={styles.hero}>
          <div className={styles.masthead}>
            <span>{hub.eyebrow[locale]}</span>
            <span>VISIONSEEK</span>
          </div>
          <h1>{hub.title[locale]}</h1>
          <p className={styles.lede}>{hub.intro[locale]}</p>
        </header>

        <aside className={styles.band} aria-labelledby="measuring-body">
          <h2 id="measuring-body">{hub.measuringBodyTitle[locale]}</h2>
          <p>{hub.measuringBody[locale]}</p>
        </aside>

        {list.length === 0 && <p className={styles.empty}>{hub.empty[locale]}</p>}

        {list.length > 1 && (
          <section className={styles.catalog} aria-labelledby="indices-catalog">
            <div className={styles.catalogHead}>
              <h2 id="indices-catalog">{hub.catalogTitle[locale]}</h2>
              <p>{hub.catalogIntro[locale]}</p>
            </div>
            <div className={styles.cards}>
              {list.map(item => (
                <Link key={item.slug} className={styles.card} href={`${locale === 'ar' ? '/ar' : ''}${indexPath(item.slug)}`}>
                  <p className={styles.status}>{item.statusLabel[locale]}</p>
                  <h3>{item.shortTitle[locale]}</h3>
                  <p>{item.lede[locale]}</p>
                  <span className={styles.more}>{hub.openIndex[locale]}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {list.map(item => <IndexArticle key={item.slug} locale={locale} item={item}/>)}
      </div>
    </Shell>
  );
}

export function IndicesEntry({locale, item}: {locale: Locale; item: IndexEntry}) {
  const {hub} = indicesContent;
  const prefix = locale === 'ar' ? '/ar' : '';
  return (
    <Shell locale={locale} path={indexPath(item.slug)}>
      <div className={styles.wrap}>
        <Crumb locale={locale} trail={[{href: '/indices', label: hub.title[locale]}, {label: item.shortTitle[locale]}]}/>
        <Link className={styles.back} href={`${prefix}/indices`}>
          <ArrowLeft size={18} aria-hidden="true"/>
          {hub.back[locale]}
        </Link>
        <IndexArticle locale={locale} item={item} solo/>
      </div>
    </Shell>
  );
}

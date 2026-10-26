import Image from 'next/image';
import Link from 'next/link';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {
  displayCredit,
  displayDek,
  displayHeroAlt,
  displayTag,
  displayTitle,
  relatedNews,
  type NewsItem,
} from '@/lib/news';
import {formatGulfTime} from '@/lib/news/time';
import {NewsGrid, type NewsCardModel} from './grid';
import {newsCountLabel, readingLabel, t, type NewsLocale} from './copy';
import styles from './news.module.css';

const SITE = 'https://visionseek.org';

function Shell({locale, path, children}: {locale: NewsLocale; path: string; children: React.ReactNode}) {
  const ar = locale === 'ar';
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path={path}/>
      <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>{children}</main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

export function toCard(item: NewsItem, locale: NewsLocale): NewsCardModel {
  const prefix = locale === 'ar' ? '/ar' : '';
  return {
    slug: item.slug,
    href: `${prefix}/news/${item.slug}`,
    title: displayTitle(item, locale),
    dek: displayDek(item, locale),
    tag: displayTag(item, locale),
    tagKey: item.tag,
    publishedAt: item.publishedAt,
    fullStamp: formatGulfTime(item.publishedAt, locale).short,
    updated: Boolean(item.updatedAt),
    imageSrc: item.imageSrc,
    imageAlt: displayHeroAlt(item, locale),
    imageExists: item.imageExists,
  };
}

export function NewsHub({locale, items}: {locale: NewsLocale; items: NewsItem[]}) {
  const prefix = locale === 'ar' ? '/ar' : '';
  const empty = locale === 'en' ? t(locale, 'emptyEn') : t(locale, 'emptyBody');
  return (
    <Shell locale={locale} path="/news">
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <section className={styles.intro} aria-label={t(locale, 'title')}>
            <div>
              <p className={styles.brandline} lang="en" dir="ltr" style={{textAlign: locale === 'ar' ? 'right' : 'left'}}>{t(locale, 'brandline')}</p>
              <h1>{t(locale, 'title')}</h1>
            </div>
            <div className={styles.ledeBlock}>
              <p className={styles.lede}>{t(locale, 'intro')}</p>
              <p className={styles.count}>{newsCountLabel(items.length, locale)}</p>
            </div>
          </section>
          {items.length === 0
            ? <section className={styles.empty} aria-label={t(locale, 'emptyTitle')}><h2>{t(locale, 'emptyTitle')}</h2><p>{empty}</p>{locale === 'en' && <p><Link href="/ar/news">{t('ar', 'title')}</Link></p>}</section>
            : <NewsGrid locale={locale} items={items.map(item => toCard(item, locale))}/>}
          <p className={styles.crumbs}><Link href={prefix || '/'}>{t(locale, 'crumbsHome')}</Link></p>
        </div>
      </div>
    </Shell>
  );
}

function newsJsonLd(item: NewsItem, locale: NewsLocale) {
  const prefix = locale === 'ar' ? '/ar' : '';
  const url = `${SITE}${prefix}/news/${item.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: displayTitle(item, locale),
    description: displayDek(item, locale),
    datePublished: item.publishedAt,
    dateModified: item.updatedAt || item.publishedAt,
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    image: [`${SITE}${item.ogImageSrc}`],
    author: {'@type': 'Organization', name: 'VisionSeek'},
    publisher: {
      '@type': 'Organization',
      name: 'VisionSeek',
      logo: {'@type': 'ImageObject', url: `${SITE}/visionseek-logo-color.png`},
    },
    mainEntityOfPage: url,
    url,
  };
}

export function NewsDetail({locale, item}: {locale: NewsLocale; item: NewsItem}) {
  const prefix = locale === 'ar' ? '/ar' : '';
  const published = formatGulfTime(item.publishedAt, locale);
  const updated = item.updatedAt ? formatGulfTime(item.updatedAt, locale) : null;
  const englishMissing = locale === 'en' && !item.hasEnglish;
  const title = displayTitle(item, locale);
  const dek = displayDek(item, locale);
  const alt = displayHeroAlt(item, locale);
  const related = relatedNews(item, 3);
  const sourceName = locale === 'en' && item.sourceNameEn ? item.sourceNameEn : item.sourceName;
  return (
    <Shell locale={locale} path={`/news/${item.slug}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(newsJsonLd(item, locale))}}/>
      <div className={styles.wrap}>
        <article className={styles.article}>
          <nav className={styles.crumbs} aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={prefix || '/'}>{t(locale, 'crumbsHome')}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`${prefix}/news`}>{t(locale, 'crumbsNews')}</Link>
          </nav>
          <header className={styles.hero}>
            <div className={styles.heroTop}>
              <span className={styles.tag}><i aria-hidden="true"/>{displayTag(item, locale)}</span>
              {updated && <span className={styles.updated}>{t(locale, 'updated')}</span>}
            </div>
            <h1>{title}</h1>
            <p className={styles.heroLede}>{dek}</p>
            <p className={styles.byline}>
              <span>{t(locale, 'byline')}</span>
              <span aria-hidden="true">·</span>
              <span>{readingLabel(item.readingMinutes, locale)}</span>
            </p>
            <p className={styles.dateline}>
              <time dateTime={item.publishedAt}>{published.publishedLine}</time>
              {updated && <>
                <span aria-hidden="true"> · </span>
                <time dateTime={item.updatedAt}>{updated.updatedLine}</time>
              </>}
            </p>
            {englishMissing && <p className={styles.stamp}>{t(locale, 'enFallback')}</p>}
            <figure className={styles.heroFigure}>
              <div className={styles.heroMedia}>
                {item.imageExists
                  ? <Image src={item.imageSrc} alt={alt} fill sizes="(max-width: 1240px) 100vw, 1240px" priority unoptimized/>
                  : <div className={styles.fallback} role="img" aria-label={alt}><i aria-hidden="true"/>VISIONSEEK</div>}
              </div>
              <figcaption>{displayCredit(item, locale)}</figcaption>
            </figure>
          </header>
          <div className={styles.prose}>
            <p className={styles.ledeGraf}>{item.body.lede}</p>
            <section className={styles.block}>
              <h2>{t(locale, 'happened')}</h2>
              <ul>{item.body.happened.map(line => <li key={line}>{line}</li>)}</ul>
            </section>
            <section className={styles.block}>
              <h2>{t(locale, 'why')}</h2>
              <p>{item.body.why}</p>
            </section>
            <aside className={styles.opinion} aria-label={t(locale, 'opinion')}>
              <p className={styles.opinionLabel}>{t(locale, 'opinion')}</p>
              <h2>{t(locale, 'reading')}</h2>
              <p>{item.body.reading}</p>
            </aside>
            {item.body.watching && (
              <section className={styles.block}>
                <h2>{t(locale, 'watching')}</h2>
                <p>{item.body.watching}</p>
              </section>
            )}
          </div>
          <section className={styles.sourceBox} aria-label={t(locale, 'sourceBox')}>
            <h2>{t(locale, 'sourceBox')}</h2>
            <p><a href={item.sourceUrl} target="_blank" rel="noreferrer">{sourceName}</a></p>
            <p className={styles.sourceMeta}><time dateTime={item.publishedAt}>{published.short}</time></p>
            {item.coverageName && item.coverageUrl && (
              <p>{t(locale, 'coverage')}: <a href={item.coverageUrl} target="_blank" rel="noreferrer">{item.coverageName}</a></p>
            )}
            <a className={styles.sourceButton} href={item.sourceUrl} target="_blank" rel="noreferrer">{t(locale, 'source')}</a>
          </section>
          {item.corrections.length > 0 && (
            <section className={styles.corrections} aria-label={t(locale, 'corrections')}>
              <h2>{t(locale, 'corrections')}</h2>
              {item.corrections.map(correction => (
                <p key={correction.at}>
                  <time dateTime={correction.at}>{formatGulfTime(correction.at, locale).short}</time>
                  {' — '}
                  {correction.text}
                </p>
              ))}
            </section>
          )}
          {related.length > 0 && (
            <section className={styles.related} aria-label={t(locale, 'related')}>
              <h2>{t(locale, 'related')}</h2>
              <div className={styles.relatedGrid}>
                {related.map(entry => {
                  const card = toCard(entry, locale);
                  return (
                    <Link key={entry.slug} className={styles.card} href={card.href}>
                      <div className={styles.cardMedia}>
                        {card.imageExists
                          ? <Image src={card.imageSrc} alt={card.imageAlt} fill sizes="(max-width: 1100px) 100vw, 33vw" unoptimized/>
                          : <div className={styles.fallback} role="img" aria-label={card.imageAlt}><i aria-hidden="true"/>VISIONSEEK</div>}
                      </div>
                      <div className={styles.cardBody}>
                        <span className={styles.tag}><i aria-hidden="true"/>{card.tag}</span>
                        <h3>{card.title}</h3>
                        <p>{card.dek}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
          <p className={styles.crumbs}><Link href={`${prefix}/news`}>{t(locale, 'back')}</Link></p>
        </article>
      </div>
    </Shell>
  );
}

export function newsSocialImage(item: NewsItem) {
  return {
    url: item.ogImageSrc,
    alt: item.heroAlt,
    width: 1200,
    height: 630,
  };
}

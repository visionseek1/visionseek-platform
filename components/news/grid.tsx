'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import {NEWS_PAGE_SIZE, NEWS_TOPICS} from '@/lib/news/topics';
import type {NewsLocale} from './copy';
import {t} from './copy';
import {RelativeTime} from './relative-time';
import styles from './news.module.css';

export type NewsCardModel = {
  slug: string;
  href: string;
  title: string;
  dek: string;
  tag: string;
  tagKey: string;
  publishedAt: string;
  fullStamp: string;
  updated: boolean;
  imageSrc: string;
  imageAlt: string;
  imageExists: boolean;
};

function CardMedia({item}: {item: NewsCardModel}) {
  return (
    <div className={styles.cardMedia}>
      {item.imageExists
        ? <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(max-width: 1100px) 100vw, 50vw" unoptimized/>
        : <div className={styles.fallback} role="img" aria-label={item.imageAlt}><i aria-hidden="true"/>VISIONSEEK</div>}
    </div>
  );
}

function CardCopy({item, locale, heading}: {item: NewsCardModel; locale: NewsLocale; heading: 'h2' | 'h3'}) {
  const Heading = heading;
  return (
    <div className={styles.cardBody}>
      <div className={styles.meta}>
        <span className={styles.tag}><i aria-hidden="true"/>{item.tag}</span>
        {item.updated && <span className={styles.updated}>{t(locale, 'updated')}</span>}
      </div>
      <Heading>{item.title}</Heading>
      <p>{item.dek}</p>
      <p className={styles.stamp}><RelativeTime iso={item.publishedAt} locale={locale} title={item.fullStamp}/></p>
    </div>
  );
}

export function NewsGrid({locale, items}: {locale: NewsLocale; items: NewsCardModel[]}) {
  const [tag, setTag] = useState<string | null>(null);
  const [limit, setLimit] = useState(NEWS_PAGE_SIZE);
  const filtered = useMemo(() => tag ? items.filter(item => item.tagKey === tag) : items, [items, tag]);
  const page = filtered.slice(0, limit);
  const lead = page[0];
  const rest = page.slice(1);
  return (
    <>
      <div className={styles.toolbar} role="group" aria-label={t(locale, 'topics')}>
        <button type="button" className={styles.filter} aria-pressed={!tag} onClick={() => {setTag(null); setLimit(NEWS_PAGE_SIZE);}}>{t(locale, 'allTags')}</button>
        {NEWS_TOPICS.map(topic => (
          <button key={topic.ar} type="button" className={styles.filter} aria-pressed={tag === topic.ar} onClick={() => {setTag(topic.ar); setLimit(NEWS_PAGE_SIZE);}}>{locale === 'ar' ? topic.ar : topic.en}</button>
        ))}
      </div>
      {!lead && <section className={styles.empty} aria-label={t(locale, 'emptyFilter')}><h2>{t(locale, 'emptyTitle')}</h2><p>{t(locale, 'emptyFilter')}</p></section>}
      {lead && (
        <section className={styles.feed} aria-label={t(locale, 'title')}>
          <Link className={`${styles.card} ${styles.lead}`} href={lead.href}>
            <CardMedia item={lead}/>
            <CardCopy item={lead} locale={locale} heading="h2"/>
          </Link>
          {rest.length > 0 && (
            <div className={styles.grid}>
              {rest.map(item => (
                <Link key={item.slug} className={styles.card} href={item.href}>
                  <CardMedia item={item}/>
                  <CardCopy item={item} locale={locale} heading="h3"/>
                </Link>
              ))}
            </div>
          )}
          {filtered.length > limit && (
            <div className={styles.moreRow}>
              <button type="button" className={styles.more} onClick={() => setLimit(value => value + NEWS_PAGE_SIZE)}>{t(locale, 'more')}</button>
            </div>
          )}
        </section>
      )}
    </>
  );
}

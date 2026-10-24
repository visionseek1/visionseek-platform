import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {forumPath, forumsContent, tx, type Forum, type Locale} from '@/lib/forums';
import type {Metadata} from 'next';
import {mailto} from '@/lib/site';
import styles from './forums.module.css';

function Invite({forum, locale}: {forum: Forum; locale: Locale}) {
  if (!forum.invite) return null;
  const href = mailto(tx(locale, forum.invite.subject), tx(locale, forum.invite.body));
  return (
    <a className={styles.invite} href={href}>
      {tx(locale, forum.invite.label)}
      <ArrowRight size={18} aria-hidden="true"/>
    </a>
  );
}

function ForumArticle({forum, locale}: {forum: Forum; locale: Locale}) {
  const {labels} = forumsContent;
  return (
    <article className={styles.forum} id={forum.slug} aria-labelledby={`${forum.slug}-title`}>
      {forum.image && forum.imageAlt && (
        <figure className={styles.visual}>
          <Image
            src={forum.image}
            alt={tx(locale, forum.imageAlt)}
            fill
            priority
            sizes="(max-width: 760px) 100vw, min(1280px, 90vw)"
          />
        </figure>
      )}
      <header className={styles.forumHead}>
        <div className={styles.forumMeta}>
          <p className={styles.kicker}>{tx(locale, forum.kicker)}</p>
          <p className={styles.status}>{tx(locale, forum.status)}</p>
        </div>
        <h2 id={`${forum.slug}-title`}>{tx(locale, forum.title)}</h2>
        <p className={styles.standfirst}>{tx(locale, forum.opening)}</p>
      </header>
      <div className={styles.axis} aria-hidden="true">
        <span>{tx(locale, labels.axisKorea)}</span>
        <strong>{tx(locale, labels.axisCenter)}</strong>
        <span>{tx(locale, labels.axisArab)}</span>
      </div>
      <ol className={styles.pillars}>
        <li>
          <span className={styles.num}>01</span>
          <div>
            <h3>{tx(locale, labels.what)}</h3>
            <p>{tx(locale, forum.what)}</p>
          </div>
        </li>
      </ol>
      <section className={styles.principles} aria-labelledby={`${forum.slug}-principles`}>
        <h3 id={`${forum.slug}-principles`}>{tx(locale, labels.principles)}</h3>
        <ul>
          {forum.principles.map(item => (
            <li key={item.title.en}>
              <h4>{tx(locale, item.title)}</h4>
              <p>{tx(locale, item.text)}</p>
            </li>
          ))}
        </ul>
      </section>
      <ol className={styles.pillars} start={2}>
        {([['who', forum.who], ['outcome', forum.outcome]] as const).map(([key, text], i) => (
          <li key={key}>
            <span className={styles.num}>{String(i + 2).padStart(2, '0')}</span>
            <div>
              <h3>{tx(locale, labels[key])}</h3>
              <p>{tx(locale, text)}</p>
            </div>
          </li>
        ))}
      </ol>
      <footer className={styles.forumClose}>
        <Invite forum={forum} locale={locale}/>
        <p className={styles.host}>{tx(locale, labels.host)}</p>
        <p className={styles.honesty}>{tx(locale, labels.honesty)}</p>
      </footer>
    </article>
  );
}

export default function ForumsPage({locale}: {locale: Locale}) {
  const {page, forums} = forumsContent;
  const ar = locale === 'ar';
  const home = ar ? '/ar' : '/';
  return (
    <div className={`vs-site locale-${locale} ${styles.root}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <CapabilityHeader locale={locale} path="/forums"/>
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="forums-title">
          <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={home}>{tx(locale, page.home)}</Link>
            <span aria-hidden="true">/</span>
            <span>{tx(locale, page.title)}</span>
          </nav>
          <p className={styles.eyebrow}>{tx(locale, page.eyebrow)}</p>
          <h1 id="forums-title">{tx(locale, page.title)}</h1>
          <p className={styles.lede}>{tx(locale, page.intro)}</p>
          <p className={styles.status}>{tx(locale, page.status)}</p>
        </section>
        {forums.map(forum => <ForumArticle key={forum.slug} forum={forum} locale={locale}/>)}
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

export function forumsMetadata(locale: Locale): Metadata {
  const {meta, forums} = forumsContent;
  const path = forumPath(locale);
  const title = tx(locale, meta.title);
  const description = tx(locale, meta.description);
  const image = forums[0]?.image;
  return {
    title,
    description,
    alternates: {canonical: path, languages: {en: '/forums', ar: '/ar/forums'}},
    openGraph: {
      title,
      description,
      url: path,
      ...(image ? {images: [{url: image, width: 1280, height: 720}]} : {}),
    },
  };
}

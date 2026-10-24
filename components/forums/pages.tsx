import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {forumPath, forumsContent, tx, type Forum, type Locale} from '@/lib/forums';
import type {Metadata} from 'next';
import {mailto} from '@/lib/site';
import styles from './forums.module.css';

const pillars = ['what', 'who', 'why', 'index'] as const;

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
      <header className={styles.forumHead}>
        <div className={styles.forumMeta}>
          <p className={styles.kicker}>{tx(locale, forum.kicker)}</p>
          <p className={styles.status}>{tx(locale, forum.status)}</p>
        </div>
        <h2 id={`${forum.slug}-title`}>{tx(locale, forum.title)}</h2>
        <p className={styles.standfirst}>{tx(locale, forum.standfirst)}</p>
      </header>
      <div className={styles.axis} aria-hidden="true">
        <span>{tx(locale, labels.axisKorea)}</span>
        <strong>{tx(locale, labels.axisCenter)}</strong>
        <span>{tx(locale, labels.axisArab)}</span>
      </div>
      <ol className={styles.pillars}>
        {pillars.map((key, i) => (
          <li key={key}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{tx(locale, labels[key])}</h3>
              <p>{tx(locale, forum[key])}</p>
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
  const {meta} = forumsContent;
  const path = forumPath(locale);
  const title = tx(locale, meta.title);
  const description = tx(locale, meta.description);
  return {
    title,
    description,
    alternates: {canonical: path, languages: {en: '/forums', ar: '/ar/forums'}},
    openGraph: {title, description, url: path},
  };
}

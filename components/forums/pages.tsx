import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {IncheonKeyVisual} from '@/components/forums/key-visual';
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
      <ArrowRight size={16} aria-hidden="true"/>
    </a>
  );
}

function ForumArticle({forum, locale}: {forum: Forum; locale: Locale}) {
  const {page, labels} = forumsContent;
  const ar = locale === 'ar';
  const home = ar ? '/ar' : '/';
  return (
    <article className={styles.article} id={forum.slug} aria-labelledby={`${forum.slug}-title`}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={home}>{tx(locale, page.home)}</Link>
            <span aria-hidden="true">/</span>
            <span>{tx(locale, page.section)}</span>
          </nav>
          <p className={styles.kicker}>{tx(locale, forum.kicker)}</p>
          <h1 id={`${forum.slug}-title`}>{tx(locale, forum.title)}</h1>
          <p className={styles.edition}>{tx(locale, forum.status)}</p>
          <p className={styles.standfirst}>{tx(locale, forum.opening)}</p>
          <Invite forum={forum} locale={locale}/>
        </div>
        {forum.visual && forum.visualAlt && (
          <IncheonKeyVisual alt={tx(locale, forum.visualAlt)}/>
        )}
      </header>

      <div className={styles.body}>
        <section className={styles.block} aria-labelledby={`${forum.slug}-mandate`}>
          <h2 id={`${forum.slug}-mandate`}>{tx(locale, labels.mandate)}</h2>
          <p>{tx(locale, forum.what)}</p>
        </section>

        <section className={styles.block} aria-labelledby={`${forum.slug}-format`}>
          <h2 id={`${forum.slug}-format`}>{tx(locale, labels.format)}</h2>
          <dl className={styles.format}>
            {forum.principles.map(item => (
              <div key={item.title.en}>
                <dt>{tx(locale, item.title)}</dt>
                <dd>{tx(locale, item.text)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.block} aria-labelledby={`${forum.slug}-themes`}>
          <h2 id={`${forum.slug}-themes`}>{tx(locale, labels.themes)}</h2>
          <ol className={styles.themes}>
            {forum.themes.map((theme, i) => (
              <li key={theme.en}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {tx(locale, theme)}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.block} aria-labelledby={`${forum.slug}-who`}>
          <h2 id={`${forum.slug}-who`}>{tx(locale, labels.who)}</h2>
          <p>{tx(locale, forum.who)}</p>
        </section>

        <section className={styles.block} aria-labelledby={`${forum.slug}-outcome`}>
          <h2 id={`${forum.slug}-outcome`}>{tx(locale, labels.outcome)}</h2>
          <p>{tx(locale, forum.outcome)}</p>
        </section>

        <footer className={styles.close}>
          <Invite forum={forum} locale={locale}/>
          <p className={styles.host}>{tx(locale, labels.host)}</p>
          <p className={styles.honesty}>{tx(locale, labels.honesty)}</p>
        </footer>
      </div>
    </article>
  );
}

export default function ForumsPage({locale}: {locale: Locale}) {
  const {forums} = forumsContent;
  return (
    <div className={`vs-site locale-${locale} ${styles.root}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <CapabilityHeader locale={locale} path="/forums"/>
      <main id="main-content" className={styles.page}>
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
  const visual = forums[0]?.visual;
  return {
    title,
    description,
    alternates: {canonical: path, languages: {en: '/forums', ar: '/ar/forums'}},
    openGraph: {
      title,
      description,
      url: path,
      ...(visual ? {images: [{url: visual}]} : {}),
    },
  };
}

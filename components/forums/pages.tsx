import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {ForumKeyVisual} from '@/components/forums/key-visual';
import {forumPath, forumsContent, paragraphs, tx, type Forum, type ForumAwards, type Locale} from '@/lib/forums';
import type {Metadata} from 'next';
import {mailto} from '@/lib/site';
import styles from './forums.module.css';

function Invite({forum, locale, strong = false}: {forum: Forum; locale: Locale; strong?: boolean}) {
  if (!forum.invite) return null;
  const href = mailto(tx(locale, forum.invite.subject), tx(locale, forum.invite.body));
  return (
    <a className={strong ? `${styles.invite} ${styles.inviteStrong}` : styles.invite} href={href}>
      {tx(locale, forum.invite.label)}
      <ArrowRight size={16} aria-hidden="true"/>
    </a>
  );
}

function Copy({text}: {text: string}) {
  return (
    <>
      {paragraphs(text).map(part => <p key={part}>{part}</p>)}
    </>
  );
}

function AwardsSoon({awards, locale, slug}: {awards: ForumAwards; locale: Locale; slug: string}) {
  const opening = paragraphs(tx(locale, awards.opening))[0] ?? tx(locale, awards.opening);
  return (
    <aside className={styles.awards} id={`${slug}-awards`} aria-labelledby={`${slug}-awards-title`}>
      {awards.labels.soon ? <p className={styles.soon}>{tx(locale, awards.labels.soon)}</p> : null}
      <h3 id={`${slug}-awards-title`}>{tx(locale, awards.title)}</h3>
      <p className={styles.awardsKicker}>{tx(locale, awards.kicker)}</p>
      <p className={styles.edition}>{tx(locale, awards.status)}</p>
      <p>{opening}</p>
      <ForumKeyVisual
        src={awards.visual}
        alt={tx(locale, awards.visualAlt)}
        compact
      />
      {awards.honesty ? <p className={styles.honesty}>{tx(locale, awards.honesty)}</p> : null}
    </aside>
  );
}

function ForumArticle({forum, locale}: {forum: Forum; locale: Locale}) {
  const {page, labels} = forumsContent;
  const ar = locale === 'ar';
  const home = ar ? '/ar' : '/';
  const standfirst = paragraphs(tx(locale, forum.opening))[0];
  const edition = forum.edition ? tx(locale, forum.edition) : tx(locale, forum.status);
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
          <p className={styles.edition}>{edition}</p>
          {forum.facts && forum.facts.length > 0 && (
            <dl className={styles.facts}>
              {forum.facts.map(fact => (
                <div key={fact.label.en}>
                  <dt>{tx(locale, fact.label)}</dt>
                  <dd>{tx(locale, fact.value)}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className={styles.standfirst}>{standfirst}</p>
          <Invite forum={forum} locale={locale} strong/>
        </div>
        {forum.visual && forum.visualAlt && (
          <ForumKeyVisual src={forum.visual} alt={tx(locale, forum.visualAlt)} priority/>
        )}
      </header>

      <div className={styles.body}>
        <section className={styles.block} id={`${forum.slug}-about`} aria-labelledby={`${forum.slug}-about-title`}>
          <h2 id={`${forum.slug}-about-title`}>{tx(locale, labels.mandate)}</h2>
          <Copy text={tx(locale, forum.what)}/>
        </section>

        <section className={styles.block} id={`${forum.slug}-why`} aria-labelledby={`${forum.slug}-why-title`}>
          <h2 id={`${forum.slug}-why-title`}>{tx(locale, labels.why)}</h2>
          <Copy text={tx(locale, forum.opening)}/>
        </section>

        <section className={styles.block} id={`${forum.slug}-themes`} aria-labelledby={`${forum.slug}-themes-title`}>
          <h2 id={`${forum.slug}-themes-title`}>{tx(locale, labels.themes)}</h2>
          <ol className={styles.themes}>
            {forum.themes.map((theme, i) => (
              <li key={theme.en}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {tx(locale, theme)}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.block} id={`${forum.slug}-format`} aria-labelledby={`${forum.slug}-format-title`}>
          <h2 id={`${forum.slug}-format-title`}>{tx(locale, labels.format)}</h2>
          <dl className={styles.format}>
            {forum.principles.map(item => (
              <div key={item.title.en}>
                <dt>{tx(locale, item.title)}</dt>
                <dd>{tx(locale, item.text)}</dd>
              </div>
            ))}
            <div>
              <dt>{tx(locale, labels.who)}</dt>
              <dd>{tx(locale, forum.who)}</dd>
            </div>
            <div>
              <dt>{tx(locale, labels.outcome)}</dt>
              <dd>{tx(locale, forum.outcome)}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.block} id={`${forum.slug}-dialogue`} aria-labelledby={`${forum.slug}-dialogue-title`}>
          <h2 id={`${forum.slug}-dialogue-title`}>{tx(locale, labels.dialogue)}</h2>
          <p className={styles.edition}>{tx(locale, forum.status)}</p>
          {forum.awards && <AwardsSoon awards={forum.awards} locale={locale} slug={forum.slug}/>}
        </section>

        <section className={styles.close} id={`${forum.slug}-register`} aria-labelledby={`${forum.slug}-register-title`}>
          <h2 id={`${forum.slug}-register-title`}>{tx(locale, labels.register)}</h2>
          <Invite forum={forum} locale={locale} strong/>
          <p className={styles.host}>{tx(locale, labels.host)}</p>
          {labels.honesty ? <p className={styles.honesty}>{tx(locale, labels.honesty)}</p> : null}
        </section>
      </div>
    </article>
  );
}

export default function ForumsPage({locale}: {locale: Locale}) {
  const {forums} = forumsContent;
  return (
    <div className={`vs-site locale-${locale} ${styles.root}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <CapabilityHeader locale={locale} path="/conferences"/>
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
    alternates: {canonical: path, languages: {en: '/conferences', ar: '/ar/conferences'}},
    openGraph: {
      title,
      description,
      url: path,
      ...(visual ? {images: [{url: visual}]} : {}),
    },
  };
}

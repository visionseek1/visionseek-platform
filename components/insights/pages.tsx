import Link from 'next/link';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {insights, latestNotes, type Bi, type InsightFramework, type InsightLink, type InsightNote} from '@/lib/insights';
import Newsletter from './newsletter';
import styles from './insights.module.css';

type Locale = 'ar' | 'en';
const tx = (ar: boolean) => (v: Bi) => (ar ? v.ar : v.en);

/** Sub-navigation: only sections that have content appear (empty ones stay hidden until they are filled). */
function SubNav({locale, current}: {locale: Locale; current: 'all' | 'notes' | 'frameworks'}) {
  const ar = locale === 'ar'; const t = tx(ar); const p = ar ? '/ar' : '';
  const s = insights.sections;
  const first = latestNotes()[0]; const fw = insights.frameworks[0];
  return <nav className={styles.subnav} aria-label={ar ? 'أقسام Insights' : 'Insights sections'}><div className={styles.subnavInner}>
    <Link href={`${p}/insights`} aria-current={current === 'all' ? 'page' : undefined}>{ar ? 'الكل' : 'All'}</Link>
    {insights.reports.length > 0 && <a href={`${p}/insights#reports`}>{t(s.reports.title)}</a>}
    {insights.articles.length > 0 && <a href={`${p}/insights#articles`}>{t(s.articles.title)}</a>}
    {first && <Link href={`${p}/insights/notes/${first.slug}`} aria-current={current === 'notes' ? 'page' : undefined}>{t(s.notes.title)}</Link>}
    {fw && <Link href={`${p}/insights/frameworks/${fw.slug}`} aria-current={current === 'frameworks' ? 'page' : undefined}>{t(s.frameworks.title)}</Link>}
    {insights.research.length > 0 && <a href={`${p}/insights#research`}>{t(s.research.title)}</a>}
    <a className={styles.end} href={`${p}/insights#newsletter`}>{t(insights.newsletter.title)}</a>
  </div></nav>;
}

function Meta({note, ar}: {note: InsightNote; ar: boolean}) {
  const t = tx(ar);
  return <div className={styles.meta}><span className={styles.kind}>{ar ? 'ملاحظة' : 'Note'}</span><span className={styles.dot} aria-hidden="true">·</span><span className={styles.num}>{note.number}</span><span className={styles.dot} aria-hidden="true">·</span><span>{t(note.dateLabel)}</span><span className={styles.status}>{t(note.status)}</span></div>;
}

function Shell({locale, path, children}: {locale: Locale; path: string; children: React.ReactNode}) {
  const ar = locale === 'ar';
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}><CapabilityHeader locale={locale} path={path}/><main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>{children}</main><CapabilityFooter locale={locale}/></div>;
}

function LinkBand({id, items, ar, title, intro}: {id: string; items: InsightLink[]; ar: boolean; title: Bi; intro: Bi}) {
  const t = tx(ar);
  if (!items.length) return null; // empty sections stay hidden until they have content
  return <section id={id} className={styles.band} aria-label={t(title)}><div className={styles.bandHead}><h2>{t(title)}</h2><p>{t(intro)}</p></div><div className={styles.bandBody}>{items.map(i => <article key={i.title.en} className={styles.item}><h3>{t(i.title)}</h3>{(i.summary.ar || i.summary.en) && <p>{t(i.summary)}</p>}<div className={styles.links}>{i.url && <a href={i.url} target="_blank" rel="noreferrer">{i.journal || (ar ? 'اقرأ' : 'Read')}</a>}{i.pdf && <a href={i.pdf}>{ar ? 'تحميل PDF' : 'Download PDF'}</a>}{i.preprint && <a href={i.preprint} target="_blank" rel="noreferrer">{ar ? 'النسخة الأولية' : 'Preprint'}</a>}</div></article>)}</div></section>;
}

export function InsightsHub({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const t = tx(ar); const p = ar ? '/ar' : '';
  const {hub, sections} = insights;
  const notes = latestNotes();
  const lead = notes[0];
  return <Shell locale={locale} path="/insights">
    <SubNav locale={locale} current="all"/>
    <div className={styles.wrap}><div className={styles.inner}>
      <section className={styles.intro} aria-label={ar ? 'تعريف' : 'About Insights'}>
        <div><p className={styles.brandline} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>VisionSeek Insights</p><h1>{t(hub.title)}</h1></div>
        <p className={styles.lede}>{t(hub.intro)}</p>
      </section>
      {lead && <section className={styles.latest} aria-label={t(hub.latest)}>
        <div className={styles.rowHead}><h2>{t(hub.latest)}</h2><span/></div>
        <Link className={styles.feature} href={`${p}/insights/notes/${lead.slug}`}>
          <div><Meta note={lead} ar={ar}/><h3>{t(lead.title)}</h3></div>
          <div className={styles.featureSide}><p>{t(lead.teaser)}</p><p className={styles.small}>{t(lead.teaserNote)}</p><span className={styles.more}>{t(hub.readNote)} {ar ? '←' : '→'}</span></div>
        </Link>
      </section>}
      <LinkBand id="reports" items={insights.reports} ar={ar} title={sections.reports.title} intro={sections.reports.intro}/>
      <LinkBand id="articles" items={insights.articles} ar={ar} title={sections.articles.title} intro={sections.articles.intro}/>
      {notes.length > 1 && <section id="notes" className={styles.band}><div className={styles.bandHead}><h2>{t(sections.notes.title)}</h2><p>{t(sections.notes.intro)}</p></div><div className={styles.bandBody}>{notes.slice(1).map(n => <Link key={n.slug} className={styles.item} href={`${p}/insights/notes/${n.slug}`}><Meta note={n} ar={ar}/><h3>{t(n.title)}</h3></Link>)}</div></section>}
      {insights.frameworks.length > 0 && <section id="frameworks" className={styles.band} aria-label={t(sections.frameworks.title)}>
        <div className={styles.bandHead}><h2>{t(sections.frameworks.title)}</h2><p>{t(sections.frameworks.intro)}</p></div>
        <div className={styles.bandBody}>{insights.frameworks.map(f => <FrameworkCard key={f.slug} f={f} ar={ar} href={`${p}/insights/frameworks/${f.slug}`}/>)}</div>
      </section>}
      <LinkBand id="research" items={insights.research} ar={ar} title={sections.research.title} intro={sections.research.intro}/>
      <Newsletter locale={locale} copy={insights.newsletter} page="/insights"/>
    </div></div>
  </Shell>;
}

function FrameworkCard({f, ar, href}: {f: InsightFramework; ar: boolean; href: string}) {
  const t = tx(ar);
  return <Link className={styles.framework} href={href}><span className={styles.order}><i aria-hidden="true"/>{t(f.order)}</span><h3>{t(f.title)}</h3><p>{t(f.status)}</p></Link>;
}

export function InsightsNote({locale, note}: {locale: Locale; note: InsightNote}) {
  const ar = locale === 'ar'; const t = tx(ar); const p = ar ? '/ar' : '';
  return <Shell locale={locale} path={`/insights/notes/${note.slug}`}>
    <SubNav locale={locale} current="notes"/>
    <div className={styles.wrap}><article className={styles.article}>
      <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={`${p}/insights`}>Insights</Link><span aria-hidden="true">/</span><span>{t(insights.sections.notes.title)}</span></nav>
      <header className={styles.head}><Meta note={note} ar={ar}/><h1>{t(note.title)}</h1><p>{t(note.subtitle)}</p></header>
      <aside className={styles.notice} aria-label={ar ? 'حالة الملاحظة' : 'Status of this note'}><i aria-hidden="true"/><p>{t(note.notice)}</p></aside>
      {note.blocks.map(b => <section key={b.heading.en} className={styles.block}><h2>{t(b.heading)}</h2><p>{t(b.text)}</p></section>)}
      {note.coming.length > 0 && <section className={styles.block}><h2>{t(note.comingHeading)}</h2><ul>{note.coming.map(c => <li key={c.en}>{t(c)}</li>)}</ul></section>}
      <section className={styles.follow} aria-label={ar ? 'تابع النتائج' : 'Follow the findings'}><p>{t(note.follow)}</p><a className={styles.button} href="#newsletter">{t(insights.newsletter.cta)}</a></section>
      <Newsletter locale={locale} copy={insights.newsletter} page={`/insights/notes/${note.slug}`}/>
    </article></div>
  </Shell>;
}

export function InsightsFramework({locale, framework}: {locale: Locale; framework: InsightFramework}) {
  const ar = locale === 'ar'; const t = tx(ar); const p = ar ? '/ar' : '';
  return <Shell locale={locale} path={`/insights/frameworks/${framework.slug}`}>
    <SubNav locale={locale} current="frameworks"/>
    <div className={styles.wrap}><article className={styles.article}>
      <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={`${p}/insights`}>Insights</Link><span aria-hidden="true">/</span><span>{t(insights.sections.frameworks.title)}</span></nav>
      <header className={styles.head}><div className={styles.meta}><span className={styles.kind}>{t(framework.order)}</span><span className={styles.status}>{t(framework.status).replace(/[.。]$/, '')}</span></div><h1>{t(framework.title)}</h1><p>{t(framework.text)}</p></header>
      <Newsletter locale={locale} copy={insights.newsletter} page={`/insights/frameworks/${framework.slug}`}/>
    </article></div>
  </Shell>;
}

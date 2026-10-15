import Link from 'next/link';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {insights, latestNotes, type Bi, type InsightFramework, type InsightLink, type InsightNote} from '@/lib/insights';
import {isArchived} from '@/lib/visibility';
import Newsletter from './newsletter';
import styles from './insights.module.css';

type Locale = 'ar' | 'en';
const tx = (ar: boolean) => (v: Bi) => (ar ? v.ar : v.en);
/** Frameworks archived from /admin («الأرشيف») disappear from Insights; their content stays. */
const liveFrameworks = () => insights.frameworks.filter(f => !isArchived(`/insights/frameworks/${f.slug}`));

/** Sub-navigation: only sections that have content appear (empty ones stay hidden until they are filled). */
export function SubNav({locale, current}: {locale: Locale; current: 'all' | 'notes' | 'frameworks' | 'research' | 'reports'}) {
  const ar = locale === 'ar'; const t = tx(ar); const p = ar ? '/ar' : '';
  const s = insights.sections;
  const first = latestNotes()[0]; const fw = liveFrameworks()[0];
  return <nav className={styles.subnav} aria-label={ar ? 'أقسام Insights' : 'Insights sections'}><div className={styles.subnavInner}>
    <Link href={`${p}/insights`} aria-current={current === 'all' ? 'page' : undefined}>{ar ? 'الكل' : 'All'}</Link>
    {insights.reports.length > 0 && <Link href={`${p}/insights/reports`} aria-current={current === 'reports' ? 'page' : undefined}>{t(s.reports.title)}</Link>}
    {insights.research.length > 0 && <Link href={`${p}/insights/research`} aria-current={current === 'research' ? 'page' : undefined}>{t(s.research.title)}</Link>}
    {insights.articles.length > 0 && <a href={`${p}/insights#articles`}>{t(s.articles.title)}</a>}
    {first && <Link href={`${p}/insights/notes/${first.slug}`} aria-current={current === 'notes' ? 'page' : undefined}>{t(s.notes.title)}</Link>}
    {fw && <Link href={`${p}/insights/frameworks/${fw.slug}`} aria-current={current === 'frameworks' ? 'page' : undefined}>{t(s.frameworks.title)}</Link>}
    <a className={styles.end} href={`${p}/insights#newsletter`}>{t(insights.newsletter.title)}</a>
  </div></nav>;
}

function Meta({note, ar}: {note: InsightNote; ar: boolean}) {
  const t = tx(ar);
  return <div className={styles.meta}><span className={styles.kind}>{ar ? 'ملاحظة' : 'Note'}</span><span className={styles.dot} aria-hidden="true">·</span><span className={styles.num}>{note.number}</span><span className={styles.dot} aria-hidden="true">·</span><span>{t(note.dateLabel)}</span><span className={styles.status}>{t(note.status)}</span></div>;
}

export function Shell({locale, path, children}: {locale: Locale; path: string; children: React.ReactNode}) {
  const ar = locale === 'ar';
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}><CapabilityHeader locale={locale} path={path}/><main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>{children}</main><CapabilityFooter locale={locale}/></div>;
}

function LinkBand({id, items, ar, title, intro, bare}: {id: string; items: InsightLink[]; ar: boolean; title: Bi; intro: Bi; bare?: boolean}) {
  const t = tx(ar);
  if (!items.length) return null; // empty sections stay hidden until they have content
  return <section id={id} className={bare ? styles.listBody : styles.band} aria-label={t(title)}>{!bare && <div className={styles.bandHead}><h2>{t(title)}</h2><p>{t(intro)}</p></div>}<div className={bare ? styles.listGrid : styles.bandBody}>{items.map(i => <article key={i.title.en} id={i.page ? i.page.split('/').pop() : undefined} className={styles.item}>{i.kind && <p className={styles.kindLine}>{t(i.kind)}</p>}<h3 dir="auto">{t(i.title)}</h3>{(i.summary.ar || i.summary.en) && <p>{t(i.summary)}</p>}<div className={styles.links}>{i.page && <Link href={`${ar ? '/ar' : ''}${i.page}`}>{ar ? 'اقرأ التقرير' : 'Read the report'}</Link>}{i.url && <a href={i.url} target="_blank" rel="noreferrer">{i.journal || (ar ? 'اقرأ' : 'Read')}</a>}{i.pdf && <a href={i.pdf}>{ar ? 'تحميل PDF' : (i.pdfLang === 'ar' ? 'Arabic report (PDF)' : 'Download PDF')}</a>}{i.preprint && <a href={i.preprint} target="_blank" rel="noreferrer">{ar ? 'النسخة الأولية' : 'Preprint'}{i.doi ? <span dir="ltr"> · DOI {i.doi}</span> : null}</a>}{i.related && <Link href={`${ar ? '/ar' : ''}${i.related.href}`}>{t(i.related.label)}</Link>}</div></article>)}</div></section>;
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
      <LinkBand id="research" items={insights.research} ar={ar} title={sections.research.title} intro={sections.research.intro}/>
      <LinkBand id="articles" items={insights.articles} ar={ar} title={sections.articles.title} intro={sections.articles.intro}/>
      {notes.length > 1 && <section id="notes" className={styles.band}><div className={styles.bandHead}><h2>{t(sections.notes.title)}</h2><p>{t(sections.notes.intro)}</p></div><div className={styles.bandBody}>{notes.slice(1).map(n => <Link key={n.slug} className={styles.item} href={`${p}/insights/notes/${n.slug}`}><Meta note={n} ar={ar}/><h3>{t(n.title)}</h3></Link>)}</div></section>}
      {liveFrameworks().length > 0 && <section id="frameworks" className={styles.band} aria-label={t(sections.frameworks.title)}>
        <div className={styles.bandHead}><h2>{t(sections.frameworks.title)}</h2><p>{t(sections.frameworks.intro)}</p></div>
        <div className={styles.bandBody}>{liveFrameworks().map(f => <FrameworkCard key={f.slug} f={f} ar={ar} href={`${p}/insights/frameworks/${f.slug}`}/>)}</div>
      </section>}
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

/** A section on its own page: «التقارير» (/insights/reports) or «الأوراق العلمية» (/insights/research). */
export function InsightsList({locale, kind}: {locale: Locale; kind: 'reports' | 'research'}) {
  const ar = locale === 'ar'; const t = tx(ar); const p = ar ? '/ar' : '';
  const sec = insights.sections[kind];
  return <Shell locale={locale} path={`/insights/${kind}`}>
    <SubNav locale={locale} current={kind}/>
    <div className={styles.wrap}><div className={styles.inner}>
      <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={`${p}/insights`}>Insights</Link><span aria-hidden="true">/</span><span>{t(sec.title)}</span></nav>
      <section className={styles.intro} aria-label={t(sec.title)}>
        <div><p className={styles.brandline} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>VisionSeek Insights</p><h1>{t(sec.title)}</h1></div>
        <p className={styles.lede}>{t(sec.intro)}</p>
      </section>
      <LinkBand id={kind} items={insights[kind]} ar={ar} title={sec.title} intro={sec.intro} bare/>
      <Newsletter locale={locale} copy={insights.newsletter} page={`/insights/${kind}`}/>
    </div></div>
  </Shell>;
}

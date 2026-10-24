import Link from 'next/link';
import {Shell, SubNav} from './pages';
import {paper, type Bi} from '@/lib/research/reports-methodology';
import {insights} from '@/lib/insights';
import styles from './reports-methodology.module.css';

type Locale = 'ar' | 'en';

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[(?:مصدر|Source|VisionSeek|تقدير|Estimate)[^\]]*\])/g;

function markClass(token: string): string {
  if (/^\[(?:مصدر|Source)/.test(token)) return `${styles.mark} ${styles.s}`;
  return `${styles.mark} ${styles.i}`;
}

function Mark({token}: {token: string}) {
  const inner = token.slice(1, -1);
  const url = inner.match(/https?:\/\/\S+/)?.[0];
  if (!url) return <mark className={markClass(token)}>{token}</mark>;
  const label = inner.replace(url, '').replace(/:\s*$/, '').trim();
  return <mark className={markClass(token)}>[{label}: <a href={url} target="_blank" rel="noreferrer">{url}</a>]</mark>;
}

function Rich({text}: {text: string}) {
  return <>{text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <i key={i}>{part.slice(1, -1)}</i>;
    if (part.startsWith('[')) return <Mark key={i} token={part}/>;
    return <span key={i}>{part}</span>;
  })}</>;
}

function DoctrineLink({text, ar, href}: {text: string; ar: boolean; href: string}) {
  const name = ar ? paper.doctrineName.ar : paper.doctrineName.en;
  const i = text.indexOf(name);
  if (i < 0) return <Rich text={text}/>;
  return <>
    <Rich text={text.slice(0, i)}/>
    <Link href={href}>{name}</Link>
    <Rich text={text.slice(i + name.length)}/>
  </>;
}

function Exhibit({no, title, ar, children, note}: {no: number; title: Bi | string; ar: boolean; children: React.ReactNode; note?: Bi | string}) {
  const label = typeof title === 'string' ? title : (ar ? title.ar : title.en);
  const noteText = !note ? '' : typeof note === 'string' ? note : (ar ? note.ar : note.en);
  return <figure className={styles.ex}>
    <figcaption><span className={styles.exNo}>{ar ? `الشكل ${no}` : `Exhibit ${no}`}</span><span>{label}</span></figcaption>
    {children}
    {noteText && <p className={styles.exNote}><Rich text={noteText}/></p>}
  </figure>;
}

export function ReportsMethodology({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  const doctrine = `${p}${paper.doctrineHref}`;
  const sec = (n: string, label: Bi) => <p className={styles.kicker}><i aria-hidden="true"/><span className={styles.mono}>{n}</span> · {t(label)}</p>;
  return <Shell locale={locale} path={`/insights/reports/${paper.slug}`}>
    <SubNav locale={locale} current="reports"/>
    <div className={`${styles.r} ${ar ? '' : styles.en}`}>

      <header className={styles.cover}>
        <div className={styles.grid} aria-hidden="true"/>
        <div className={styles.coverIn}>
          <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={`${p}/insights`}>Insights</Link><span aria-hidden="true">/</span><Link href={`${p}/insights/reports`}>{t(insights.sections.reports.title)}</Link></nav>
          <p className={styles.lab} lang="en" dir="ltr">VISIONSEEK LAB · METHODOLOGY</p>
          <h1>{t(paper.cardTitle)}</h1>
          <p className={styles.q}>{t(paper.title)}</p>
          <div className={styles.steps} aria-hidden="true">{[8, 14, 20, 27, 35].map(h => <i key={h} style={{height: h}}/>)}</div>
          <div className={styles.stepCap}><span>{ar ? 'استخدام' : 'Use'}</span><span>{ar ? 'تصدير / معيار' : 'Export / Standard'}</span></div>
          <dl className={styles.meta}>
            <div><dt>{t(paper.authorRole)}</dt><dd>{t(paper.author)}</dd></div>
            <div><dt>{ar ? 'التاريخ' : 'Date'}</dt><dd>{t(paper.dateLabel)}</dd></div>
            <div><dt>{ar ? 'الإصدار' : 'Version'}</dt><dd>{t(paper.versionLabel)}</dd></div>
          </dl>
          <div className={styles.actions}>
            <Link className={styles.btn} href={doctrine}>{t(paper.doctrineLabel)}</Link>
          </div>
          <p className={styles.tag}>{t(paper.label)}</p>
        </div>
      </header>

      <div className={styles.body}>
        <section className={styles.sec} aria-labelledby="summary">
          {sec('00', paper.purpose.heading)}
          <h2 id="summary">{t(paper.purpose.pull)}</h2>
          <div className={styles.stats}>{paper.stats.map(s => <div key={s.big}><p className={styles.big}>{s.big}</p><p><Rich text={t(s.text)}/></p></div>)}</div>
          <ol className={styles.takeaways}>{paper.takeaways.map((f, i) => <li key={f.en}><span className={styles.mono}>{String(i + 1).padStart(2, '0')}</span><p><Rich text={t(f)}/></p></li>)}</ol>
          <blockquote className={styles.quote}><Rich text={t(paper.purpose.body[0])}/></blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="legend">
          {sec('—', paper.markersLegend.heading)}
          <h2 id="legend">{t(paper.markersLegend.heading)}</h2>
          <div className={styles.legend}>{paper.markersLegend.items.map(item => <div key={item.kind}><Rich text={ar ? item.ar : item.en}/></div>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="purpose">
          {sec('0', paper.purpose.heading)}
          <h2 id="purpose">{t(paper.purpose.heading)}</h2>
          <blockquote className={styles.quote}>{t(paper.purpose.pull)}</blockquote>
          <div className={styles.prose}>{paper.purpose.body.map(b => <p key={b.en}><Rich text={t(b)}/></p>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="definitions">
          {sec('1', paper.definitions.heading)}
          <h2 id="definitions">{t(paper.definitions.heading)}</h2>

          <h3 id="principle">{t(paper.definitions.principle.heading)}</h3>
          <p className={styles.lead}><DoctrineLink text={t(paper.definitions.principle.intro)} ar={ar} href={doctrine}/></p>
          <dl className={styles.defs}>{paper.definitions.principle.items.map(item => <div key={item.title.en}><dt>{t(item.title)}</dt>{(item.text.ar || item.text.en) ? <dd><Rich text={t(item.text)}/></dd> : null}</div>)}</dl>

          <h3 id="ladder" className={styles.sub}>{t(paper.definitions.ladder.heading)}</h3>
          <p className={styles.lead}>{t(paper.definitions.ladder.intro)}</p>
          <Exhibit no={1} ar={ar} title={paper.definitions.ladder.heading}>
            <div className={styles.tblWrap}><table className={styles.tbl}>
              <thead><tr>{(ar ? paper.definitions.ladder.columns.ar : paper.definitions.ladder.columns.en).map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{paper.definitions.ladder.rows.map(r => <tr key={r.n}><td className={styles.tier}>{r.n}</td><td>{t(r.name)}</td><td>{t(r.def)}</td></tr>)}</tbody>
            </table></div>
          </Exhibit>
          <p className={styles.lead}>{t(paper.definitions.ladder.rulesHeading)}</p>
          <ul className={styles.rules}>{paper.definitions.ladder.rules.map(r => <li key={r.en}><Rich text={t(r)}/></li>)}</ul>
          <Exhibit no={2} ar={ar} title={{ar: 'سلّم الامتلاك ذو الدرجات الخمس', en: 'The five-rung Ownership Ladder'}}>
            <div className={styles.ladder}>{paper.definitions.ladder.rows.map(s => <div key={s.n} className={styles.st}><span className={styles.sn}>{s.n.padStart(2, '0')}</span><span className={styles.nm}>{t(s.name)}</span><span className={styles.kp}>{t(s.def)}</span></div>)}</div>
          </Exhibit>

          <h3 id="terms" className={styles.sub}>{t(paper.definitions.terms.heading)}</h3>
          <dl className={styles.defs}>{paper.definitions.terms.items.map(item => <div key={item.title.en}><dt>{t(item.title)}</dt><dd><Rich text={t(item.text)}/></dd></div>)}</dl>

          <h3 id="scope" className={styles.sub}>{t(paper.definitions.scope.heading)}</h3>
          <p className={styles.lead}>{t(paper.definitions.scope.intro)}</p>
          <ul className={styles.plain}>{paper.definitions.scope.items.map(item => <li key={item.en}>{t(item)}</li>)}</ul>
        </section>

        <section className={styles.sec} aria-labelledby="tiers">
          {sec('2', paper.tiers.heading)}
          <h2 id="tiers">{t(paper.tiers.heading)}</h2>
          <p className={styles.lead}>{t(paper.tiers.intro)}</p>
          <Exhibit no={3} ar={ar} title={paper.tiers.heading}>
            <div className={styles.tblWrap}><table className={styles.tbl}>
              <thead><tr>{(ar ? paper.tiers.columns.ar : paper.tiers.columns.en).map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{paper.tiers.rows.map(r => <tr key={r.tier.en}><td className={styles.tier}>{t(r.tier)}</td><td>{t(r.type)}</td><td><Rich text={t(r.examples)}/></td><td><Rich text={t(r.use)}/></td></tr>)}</tbody>
            </table></div>
          </Exhibit>
          <p className={styles.lead}>{t(paper.tiers.rulesHeading)}</p>
          <ol className={styles.rules}>{paper.tiers.rules.map(r => <li key={r.en}><Rich text={t(r)}/></li>)}</ol>
        </section>

        <section className={styles.sec} aria-labelledby="missing">
          {sec('3', paper.missing.heading)}
          <h2 id="missing">{t(paper.missing.heading)}</h2>
          <div className={styles.findings}>{paper.missing.items.map((f, i) => <article key={f.title.en}><span className={styles.n}>{i + 1}</span><div><h3>{t(f.title)}</h3><p><Rich text={t(f.text)}/></p></div></article>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="review">
          {sec('4', paper.review.heading)}
          <h2 id="review">{t(paper.review.heading)}</h2>
          <h3 id="internal">{t(paper.review.internal.heading)}</h3>
          <p className={styles.lead}>{t(paper.review.internal.intro)}</p>
          <ul className={styles.plain}>{paper.review.internal.items.map(item => <li key={item.en}>{t(item)}</li>)}</ul>
          <p className={styles.prose}>{t(paper.review.internal.after)}</p>
          <h3 id="external" className={styles.sub}>{t(paper.review.external.heading)}</h3>
          <p className={styles.lead}>{t(paper.review.external.intro)}</p>
          <ul className={styles.plain}>{paper.review.external.items.map(item => <li key={item.en}>{t(item)}</li>)}</ul>
          <p className={styles.prose}><Rich text={t(paper.review.external.after)}/></p>
        </section>

        <section className={styles.sec} aria-labelledby="independence">
          {sec('5', paper.independence.heading)}
          <h2 id="independence">{t(paper.independence.heading)}</h2>
          <blockquote className={styles.quote}>{t(paper.independence.text)}</blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="quality">
          {sec('6', paper.quality.heading)}
          <h2 id="quality">{t(paper.quality.heading)}</h2>
          <p className={styles.lead}><Rich text={t(paper.quality.intro)}/></p>
          <Exhibit no={4} ar={ar} title={paper.quality.heading}>
            <div className={styles.tblWrap}><table className={styles.tbl}>
              <thead><tr>{(ar ? paper.quality.columns.ar : paper.quality.columns.en).map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{paper.quality.rows.map(r => <tr key={r.name.en}><td>{t(r.name)}</td><td><Rich text={t(r.rand)}/></td><td><Rich text={t(r.vs)}/></td></tr>)}</tbody>
            </table></div>
          </Exhibit>
          <p className={styles.lead}>{t(paper.quality.extraHeading)}</p>
          <ul className={styles.plain}>{paper.quality.extra.map(item => <li key={item.en}><Rich text={t(item)}/></li>)}</ul>
        </section>

        <section className={styles.sec} aria-labelledby="corrections">
          {sec('7', paper.corrections.heading)}
          <h2 id="corrections">{t(paper.corrections.heading)}</h2>
          <div className={styles.findings}>{paper.corrections.items.map((f, i) => <article key={f.title.en}><span className={styles.n}>{i + 1}</span><div><h3>{t(f.title)}</h3><p><Rich text={t(f.text)}/></p>{i === paper.corrections.items.length - 1 ? <ul className={styles.nested}>{paper.corrections.limits.map(l => <li key={l.en}>{t(l)}</li>)}</ul> : null}</div></article>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="prior">
          {sec('8', paper.prior.heading)}
          <h2 id="prior">{t(paper.prior.heading)}</h2>
          <p className={styles.lead}>{t(paper.prior.intro)}</p>
          <div className={styles.findings}>{paper.prior.items.map((f, i) => <article key={f.title.en}><span className={styles.n}>{i + 1}</span><div><h3>{t(f.title)}</h3><p><Rich text={t(f.text)}/></p>{f.list ? <ul className={styles.nested}>{f.list.map(l => <li key={l.en}>{t(l)}</li>)}</ul> : null}</div></article>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="structure">
          {sec('9', paper.structure.heading)}
          <h2 id="structure">{t(paper.structure.heading)}</h2>
          <p className={styles.lead}>{t(paper.structure.intro)}</p>
          <ol className={styles.takeaways}>{paper.structure.items.map((item, i) => <li key={item.en}><span className={styles.mono}>{String(i + 1).padStart(2, '0')}</span><p>{t(item)}</p></li>)}</ol>
        </section>

        <section className={styles.closing} aria-label={t(paper.closing.heading)}>
          <p className={styles.closingK}>{t(paper.closing.heading)}</p>
          <p>{t(paper.closing.text)} <b>{t(paper.closing.strong)}</b></p>
        </section>

        <section className={styles.sec} aria-labelledby="versions" id="versions">
          {sec('10', paper.versions.heading)}
          <h2>{t(paper.versions.heading)}</h2>
          <Exhibit no={5} ar={ar} title={paper.versions.heading}>
            <div className={styles.tblWrap}><table className={styles.tbl}>
              <thead><tr>{(ar ? paper.versions.columns.ar : paper.versions.columns.en).map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{paper.versions.rows.map(r => <tr key={r.version}><td className={styles.tier}>{r.version}</td><td dir="ltr">{r.date}</td><td>{t(r.change)}</td></tr>)}</tbody>
            </table></div>
          </Exhibit>
        </section>

        <section className={styles.cite} aria-label={ar ? 'للاستشهاد' : 'Cite this paper'}>
          <p>{ar ? 'للاستشهاد:' : 'Cite this paper:'}</p>
          <p lang="en" dir="ltr" className={styles.citeText}>{paper.citation}</p>
          <div className={styles.actions}>
            <Link className={styles.btnDark} href={doctrine}>{t(paper.doctrineLabel)}</Link>
          </div>
        </section>
      </div>
    </div>
  </Shell>;
}

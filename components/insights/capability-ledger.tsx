import Link from 'next/link';
import {Shell, SubNav} from './pages';
import {paper, type Bi} from '@/lib/research/capability-ledger';
import {insights} from '@/lib/insights';
import styles from './localization-doctrine.module.css';

type Locale = 'ar' | 'en';

const TOKEN = /(\*\*[^*]+\*\*|“[^”]+”|"[^"]+"|\[(?:مؤكد بمصدر|استنتاج|ادعاء أطراف|فجوة|صحافة)[^\]]*\])/g;

function markClass(token: string): string {
  if (/^\[مؤكد بمصدر/.test(token)) return `${styles.mark} ${styles.s}`;
  if (/^\[ادعاء أطراف/.test(token)) return `${styles.mark} ${styles.party}`;
  if (/^\[(?:فجوة|صحافة)/.test(token)) return `${styles.mark} ${styles.g}`;
  return `${styles.mark} ${styles.i}`;
}

function Rich({text}: {text: string}) {
  return <>{text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if ((part.startsWith('“') && part.endsWith('”')) || (part.startsWith('"') && part.endsWith('"'))) return <span key={i} className={styles.mono} dir="ltr">{part}</span>;
    if (part.startsWith('[')) return <mark key={i} className={markClass(part)}>{part}</mark>;
    return <span key={i}>{part}</span>;
  })}</>;
}

function Exhibit({no, title, children, note}: {no: number; title: string; children: React.ReactNode; note?: string}) {
  return <figure className={styles.ex}>
    <figcaption><span className={styles.exNo}>الشكل {no}</span><span>{title}</span></figcaption>
    {children}
    {note && <p className={styles.exNote}><Rich text={note}/></p>}
  </figure>;
}

export function CapabilityLedger({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  const sec = (n: string, label: Bi) => <p className={styles.kicker}><i aria-hidden="true"/><span className={styles.mono}>{n}</span> · {t(label)}</p>;
  return <Shell locale={locale} path={`/reports/reports/${paper.slug}`}>
    <SubNav locale={locale} current="reports"/>
    <div className={styles.r} lang="ar" dir="rtl">

      <header className={styles.cover}>
        <div className={styles.grid} aria-hidden="true"/>
        <div className={styles.coverIn}>
          <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={`${p}/reports`}>{ar ? 'تقارير' : 'Reports'}</Link><span aria-hidden="true">/</span><Link href={`${p}/reports/reports`}>{t(insights.sections.reports.title)}</Link></nav>
          <p className={styles.lab} lang="en" dir="ltr">{paper.lab}</p>
          <h1>{paper.title.ar}</h1>
          <p className={styles.q}>{paper.question.ar}</p>
          <p className={styles.tag}>{paper.deck.ar}</p>
          <div className={styles.steps} aria-hidden="true">{[8, 14, 20, 27, 35].map(h => <i key={h} style={{height: h}}/>)}</div>
          <div className={styles.stepCap}><span>استخدام</span><span>تصدير / معيار</span></div>
          <dl className={styles.meta}>
            <div><dt>{ar ? 'إعداد' : 'Author'}</dt><dd>{t(paper.author)}</dd></div>
            <div><dt>{ar ? 'التاريخ' : 'Date'}</dt><dd>{t(paper.dateLabel)}</dd></div>
            <div><dt>{ar ? 'المصادر' : 'Sources'}</dt><dd><a href="#sources">25 مصدرًا</a></dd></div>
          </dl>
          <div className={styles.actions}>
            <a className={styles.btn} href={paper.pdfAr} download>{ar ? 'تحميل التقرير (PDF)' : 'Arabic report (PDF)'}</a>
            <Link className={styles.btnGhost} href={`${p}${paper.methodologyHref}`}>{t(paper.methodologyLabel)}</Link>
            <Link className={styles.btnGhost} href={`${p}${paper.doctrineHref}`}>{t(paper.doctrineLabel)}</Link>
          </div>
          <p className={styles.tag}>{paper.label.ar}</p>
        </div>
      </header>

      <div className={styles.body}>
        <section className={styles.sec} aria-labelledby="summary">
          {sec('00', {ar: 'الخلاصة في دقيقة', en: 'The paper in a minute'})}
          <h2 id="summary">{paper.headline}</h2>
          <div className={styles.stats}>{paper.stats.map(s => <div key={s.big}><p className={styles.big}>{s.big}</p><p><Rich text={s.text}/></p></div>)}</div>
          <ol className={styles.takeaways}>{paper.conclusions.items.map((f, i) => <li key={f.title}><span className={styles.mono}>{String(i + 1).padStart(2, '0')}</span><p>{f.title}</p></li>)}</ol>
          <blockquote className={styles.quote}>{paper.headline}<span className={styles.quoteNote}>{paper.headlineNote}</span></blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="legend">
          {sec('—', paper.markersLegend.heading)}
          <h2 id="legend">{paper.markersLegend.heading.ar}</h2>
          <div className={styles.legend}>{paper.markersLegend.items.map(item => <div key={item.kind}><Rich text={item.ar}/></div>)}</div>
          <p className={styles.lead}>{paper.about.body}</p>
          <p className={styles.lead}>{paper.about.note}</p>
        </section>

        <section className={styles.sec} aria-labelledby="conclusions">
          {sec('01', paper.conclusions.heading)}
          <h2 id="conclusions">{paper.conclusions.heading.ar}</h2>
          <div className={styles.findings}>{paper.conclusions.items.map((f, i) => <article key={f.title}><span className={styles.n}>{i + 1}</span><div><h3>{f.title}</h3><p><Rich text={f.text}/></p></div></article>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="method">
          {sec('02', paper.method.heading)}
          <h2 id="method">{paper.method.heading.ar}</h2>
          <p className={styles.lead}>{paper.method.lede}</p>
          <div className={styles.why}>
            <div className={styles.drv}><span className={styles.ic}>1</span><div><h3>{paper.method.unitHeading.ar}</h3><p>{paper.method.unit}</p></div></div>
            <div className={styles.drv}><span className={styles.ic}>2</span><div><h3>{paper.method.companionHeading.ar}</h3><p>{paper.method.companion} <Link href={`${p}${paper.methodologyHref}`}>{t(paper.methodologyLabel)}</Link></p></div></div>
          </div>
          <h3>{paper.method.layersHeading.ar}</h3>
          <div className={styles.tblWrap}>
            <table className={styles.tbl}>
              <thead><tr>{paper.method.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{paper.method.layers.map(row => <tr key={row.tier}><td className={styles.deal}>{row.tier}</td><td>{row.type}</td><td>{row.use}</td></tr>)}</tbody>
            </table>
          </div>
          <blockquote className={styles.quote}>{paper.method.pull}</blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="ladder">
          {sec('03', paper.ladder.heading)}
          <h2 id="ladder">{paper.ladder.heading.ar}</h2>
          <Exhibit no={1} title={paper.ladder.exhibit} note={paper.ladder.exhibitNote}>
            <div className={styles.ladder}>{paper.ladder.steps.map(s => <div key={s.n} className={styles.st}><span className={styles.sn}>{s.n}</span><span className={styles.nm}>{s.ar}</span><span className={styles.kp}>{s.note}</span></div>)}</div>
            <p className={styles.exNote}><Rich text={paper.ladder.exhibitSrc}/></p>
          </Exhibit>
          <h3>{paper.ladder.disclosureHeading.ar}</h3>
          <div className={styles.prose}><p><Rich text={paper.ladder.disclosure}/></p></div>
        </section>

        <section className={styles.sec} aria-labelledby="ledger">
          {sec('04', paper.ledger.heading)}
          <h2 id="ledger">{paper.ledger.heading.ar}</h2>
          <p className={styles.lead}>{paper.ledger.intro}</p>
          <h3>{paper.ledger.tableHeading.ar}</h3>
          <div className={styles.tblWrap}>
            <table className={styles.tbl}>
              <thead><tr>{paper.ledger.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{paper.ledger.rows.map(row => <tr key={row.deal}>
                <td className={styles.deal}>{row.deal}{row.when ? <small>{row.when}</small> : null}</td>
                <td><Rich text={row.size}/></td>
                <td>{row.who}</td>
                <td className={styles.rung}>{row.rung}</td>
                <td><Rich text={row.src}/> <span className={styles.tier}>{row.tier}</span></td>
              </tr>)}</tbody>
            </table>
          </div>
          <p className={styles.lead}><Rich text={paper.ledger.note}/></p>
        </section>

        <section className={styles.sec} aria-labelledby="matrix">
          {sec('—', paper.matrix.heading)}
          <h2 id="matrix">{paper.matrix.heading.ar}</h2>
          <Exhibit no={2} title={paper.matrix.exhibit} note={paper.matrix.exhibitNote}>
            <div className={styles.mxWrap}>
              <table className={styles.mx}>
                <thead><tr>{paper.matrix.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
                <tbody>{paper.matrix.rows.map(row => <tr key={row.deal}>
                  <td>{row.deal}</td>
                  {row.cells.map((cell, i) => <td key={`${row.deal}-${i}`}>{cell ? <i className={`${styles.cell} ${styles[cell as 'official' | 'claim' | 'tadawul' | 'intent']}`} aria-hidden="true"/> : null}</td>)}
                </tr>)}</tbody>
              </table>
            </div>
            <div className={styles.mxLeg}>{paper.matrix.legend.map(item => <span key={item.kind}><i className={`${styles.cell} ${styles[item.kind as 'official' | 'claim' | 'tadawul' | 'intent']}`} aria-hidden="true"/>{item.label}</span>)}</div>
            <p className={styles.exNote}><Rich text={paper.matrix.src}/></p>
          </Exhibit>
          <blockquote className={styles.quote}>{paper.matrix.pull}<span className={styles.quoteNote}>{paper.matrix.pullNote}</span></blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="findings">
          {sec('05', paper.findings.heading)}
          <h2 id="findings">{paper.findings.heading.ar}</h2>
          <p className={styles.lead}>{paper.findings.intro}</p>
          {paper.findings.items.map(item => <div key={item.no} className={styles.tech}>
            <div className={styles.th}><span className={styles.no}>{item.no}</span><h3>{item.title}</h3></div>
            <ul className={styles.bullets}>{item.bullets.map(b => <li key={b}><Rich text={b}/></li>)}</ul>
          </div>)}
          <Exhibit no={3} title={paper.timeline.exhibit} note={paper.timeline.src}>
            <div className={styles.path}>{paper.timeline.points.map(pt => <div key={pt.phase} className={styles.pp}><div className={styles.ph}>{pt.phase}</div><div className={styles.y}>{pt.date}</div><div className={styles.d}>{pt.text}</div></div>)}</div>
          </Exhibit>
          <Exhibit no={4} title={paper.gii.exhibit} note={paper.gii.exhibitNote}>
            <div className={styles.chart}>
              {paper.gii.rows.map(r => <div key={r.label} className={styles.crow}><div className={styles.lbl}>{r.label}</div><div className={styles.track}><span className={`${styles.bar} ${r.strong ? styles.barStrong : ''}`} style={{width: `${r.width}%`}}/><span className={styles.val} style={{insetInlineStart: `calc(${r.width}% + 8px)`}}>{r.value}</span></div></div>)}
            </div>
            <p className={styles.exNote}><Rich text={paper.gii.src}/></p>
          </Exhibit>
        </section>

        <section className={styles.sec} aria-labelledby="questions">
          {sec('06', paper.questions.heading)}
          <h2 id="questions">{paper.questions.heading.ar}</h2>
          <ul className={styles.bullets}>{paper.questions.items.map(q => <li key={q}>{q}</li>)}</ul>
          <Exhibit no={5} title={paper.patents.exhibit} note={paper.patents.src}>
            <div className={styles.stats}>{paper.patents.stats.map(s => <div key={s.big}><p className={styles.big}>{s.big}</p><p>{s.text}</p></div>)}</div>
          </Exhibit>
        </section>

        <section className={styles.closing} aria-label={paper.closing.heading.ar}>
          <p className={styles.closingK}>{paper.closing.heading.ar}</p>
          <p>{paper.closing.text} <b><Rich text={paper.closing.strong}/></b></p>
        </section>

        <section className={styles.sec} aria-labelledby="scope">
          {sec('07', paper.scope.heading)}
          <h2 id="scope">{paper.scope.heading.ar}</h2>
          <ul className={styles.gaps}>{paper.scope.items.map(item => <li key={item}><Rich text={item}/></li>)}</ul>
          <blockquote className={styles.quote}>{paper.scope.pull}<span className={styles.quoteNote}>{paper.scope.pullNote}</span></blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="sources" id="sources">
          {sec('08', paper.sources.heading)}
          <h2>{paper.sources.heading.ar}</h2>
          <p className={styles.lead}>{paper.sources.intro}</p>
          <ol className={styles.srcs}>{paper.sources.items.map(s => <li key={s.n}><div><a href={s.url} target="_blank" rel="noreferrer"><span>{s.name}</span><span className={styles.srcUrl}>{s.url}</span></a><span className={styles.srcType}>الطبقة {s.tier}</span></div></li>)}</ol>
        </section>

        <section className={styles.cite} aria-label={ar ? 'للاستشهاد' : 'Cite this paper'}>
          <p>{ar ? 'للاستشهاد:' : 'Cite this paper:'}</p>
          <p className={styles.citeText}>{paper.citation}</p>
          <div className={styles.actions}>
            <a className={styles.btnDark} href={paper.pdfAr} download>{ar ? 'تحميل التقرير (PDF)' : 'Arabic report (PDF)'}</a>
            <Link className={styles.btnLine} href={`${p}${paper.methodologyHref}`}>{t(paper.methodologyLabel)}</Link>
            <Link className={styles.btnLine} href={`${p}${paper.doctrineHref}`}>{t(paper.doctrineLabel)}</Link>
          </div>
        </section>
      </div>
    </div>
  </Shell>;
}

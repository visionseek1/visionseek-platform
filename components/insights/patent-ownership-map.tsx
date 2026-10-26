import type {ReactNode} from 'react';
import Link from 'next/link';
import {Shell, SubNav} from './pages';
import {paper, type Bi} from '@/lib/research/patent-ownership-map';
import {insights} from '@/lib/insights';
import styles from './localization-doctrine.module.css';

type Locale = 'ar' | 'en';

function findClose(s: string, start: number): number {
  let depth = 0;
  for (let i = start; i < s.length; i++) {
    if (s[i] === '[') depth++;
    else if (s[i] === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function isMarkAt(s: string, i: number): boolean {
  return s[i] === '[' && /^(?:مؤكد بمصدر|استنتاج|رأي منقول)/.test(s.slice(i + 1));
}

function matchLink(s: string, i: number): {label: string; href: string; end: number} | null {
  if (s[i] !== '[') return null;
  if (isMarkAt(s, i)) return null;
  const close = s.indexOf(']', i + 1);
  if (close < 0 || s[close + 1] !== '(') return null;
  const hrefEnd = s.indexOf(')', close + 2);
  if (hrefEnd < 0) return null;
  return {label: s.slice(i + 1, close), href: s.slice(close + 2, hrefEnd), end: hrefEnd + 1};
}

function markKind(token: string): 's' | 'i' | 'p' {
  if (token.startsWith('[مؤكد بمصدر')) return 's';
  if (token.startsWith('[رأي منقول')) return 'p';
  return 'i';
}

function splitRich(text: string, allowMarks: boolean): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0;
  let buf = '';
  const flush = () => {
    if (buf) {
      out.push(buf);
      buf = '';
    }
  };
  while (i < text.length) {
    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        flush();
        out.push(<strong key={out.length}>{splitRich(text.slice(i + 2, end), allowMarks)}</strong>);
        i = end + 2;
        continue;
      }
    }
    if (allowMarks && isMarkAt(text, i)) {
      const close = findClose(text, i);
      if (close !== -1) {
        flush();
        const token = text.slice(i, close + 1);
        const kind = markKind(token);
        const wide = token.length > 36;
        out.push(
          <mark key={out.length} className={`${styles.mark} ${styles[kind]}${wide ? ` ${styles.markWide}` : ''}`}>
            [{splitRich(token.slice(1, -1), false)}]
          </mark>,
        );
        i = close + 1;
        continue;
      }
    }
    const link = matchLink(text, i);
    if (link) {
      flush();
      out.push(<a key={out.length} className={styles.ref} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>);
      i = link.end;
      continue;
    }
    buf += text[i];
    i++;
  }
  flush();
  return out;
}

function Rich({text}: {text: string}) {
  return <>{splitRich(text, true)}</>;
}

function Exhibit({no, title, children, note}: {no: number; title: string; children: ReactNode; note?: string}) {
  return <figure className={styles.ex}>
    <figcaption><span className={styles.exNo}>الشكل {no}</span><span>{title}</span></figcaption>
    {children}
    {note && <p className={styles.exNote}><Rich text={note}/></p>}
  </figure>;
}

export function PatentOwnershipMap({locale}: {locale: Locale}) {
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
            <div><dt>{ar ? 'الإصدار' : 'Version'}</dt><dd>{t(paper.versionLabel)}</dd></div>
            <div><dt>{ar ? 'المصادر' : 'Sources'}</dt><dd><a href="#sources">16 مصدرًا</a></dd></div>
          </dl>
          <div className={styles.actions}>
            <a className={styles.btn} href={paper.pdfAr} download>{ar ? 'تحميل PDF' : 'Download PDF'}</a>
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
          <p className={styles.lead}><Rich text={paper.about.body}/></p>
        </section>

        <section className={styles.sec} aria-labelledby="conclusions">
          {sec('01', paper.conclusions.heading)}
          <h2 id="conclusions">{paper.conclusions.heading.ar}</h2>
          <div className={styles.findings}>{paper.conclusions.items.map((f, i) => <article key={f.title}><span className={styles.n}>{i + 1}</span><div><h3>{f.title}</h3><p><Rich text={f.text}/></p></div></article>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="method">
          {sec('02', paper.method.heading)}
          <h2 id="method">{paper.method.heading.ar}</h2>
          <div className={styles.why}>{paper.method.items.map((item, i) => <div key={item.label} className={styles.drv}><span className={styles.ic}>{i + 1}</span><div><h3>{item.label}</h3><p><Rich text={item.text}/></p></div></div>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="ladder">
          {sec('03', paper.ladder.heading)}
          <h2 id="ladder">{paper.ladder.heading.ar}</h2>
          <Exhibit no={1} title={paper.ladder.exhibit} note={paper.ladder.exhibitNote}>
            <div className={styles.ladder}>{paper.ladder.steps.map(s => <div key={s.n} className={styles.st}><span className={styles.sn}>{s.n}</span><span className={styles.nm}>{s.ar}</span><span className={styles.kp}>{s.meaning}</span><span className={styles.kp}>{s.note}</span></div>)}</div>
          </Exhibit>
          <div className={styles.tblWrap}>
            <table className={styles.tbl}>
              <thead><tr>{paper.ladder.columns.map(c => <th key={c}><Rich text={c}/></th>)}</tr></thead>
              <tbody>{paper.ladder.steps.map(s => <tr key={s.n}><td className={styles.rung}>{s.n}</td><td className={styles.deal}>{s.ar}<small>{s.meaning}</small></td><td><Rich text={s.note}/></td></tr>)}</tbody>
            </table>
          </div>
          <blockquote className={styles.quote}>{paper.ladder.pull}<span className={styles.quoteNote}>{paper.ladder.pullNote}</span></blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="official">
          {sec('04', paper.official.heading)}
          <h2 id="official">{paper.official.heading.ar}</h2>
          <h3>{paper.official.total.heading}</h3>
          <div className={styles.tblWrap}>
            <table className={styles.tbl}>
              <thead><tr>{paper.official.total.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{paper.official.total.rows.map(row => <tr key={row.country}>
                <td className={styles.deal}>{row.country}</td>
                <td className={styles.num}>{row.total}</td>
                <td className={styles.num}>{row.resident}</td>
                <td className={styles.num}>{row.nonresident}</td>
                <td className={styles.num}>{row.share}</td>
                <td>{row.foreign}</td>
              </tr>)}</tbody>
            </table>
          </div>
          <p className={styles.lead}><Rich text={paper.official.total.note}/></p>
          <h3>{paper.official.saudi.heading}</h3>
          <ul className={styles.bullets}>{paper.official.saudi.items.map(item => <li key={item}><Rich text={item}/></li>)}</ul>
          <h3>{paper.official.procedure.heading}</h3>
          <ul className={styles.bullets}>{paper.official.procedure.items.map(item => <li key={item}><Rich text={item}/></li>)}</ul>
          <h3>{paper.official.quoted.heading}</h3>
          <div className={styles.prose}><p><Rich text={paper.official.quoted.text}/></p></div>
        </section>

        <section className={styles.sec} aria-labelledby="matrix">
          {sec('05', paper.matrix.heading)}
          <h2 id="matrix">{paper.matrix.heading.ar}</h2>
          <p className={styles.lead}><Rich text={paper.matrix.status}/></p>
          <h3>{paper.matrix.totals.heading}</h3>
          <div className={styles.tblWrap}>
            <table className={styles.tbl}>
              <thead><tr>{paper.matrix.totals.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{paper.matrix.totals.rows.map(row => <tr key={row.country}>
                <td className={styles.deal}>{row.country}</td>
                <td className={styles.num}>{row.docs}</td>
                <td className={styles.num}>{row.share}</td>
                <td><Rich text={row.owner}/></td>
              </tr>)}</tbody>
            </table>
          </div>
          <p className={styles.lead}><Rich text={paper.matrix.totals.note}/></p>
          <h3>{paper.matrix.fields.heading}</h3>
          <Exhibit no={2} title={paper.matrix.fields.heading} note={paper.matrix.fields.source}>
            <div className={styles.tblWrap}>
              <table className={styles.tbl}>
                <thead><tr>{paper.matrix.fields.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
                <tbody>{paper.matrix.fields.rows.map(row => <tr key={row.country}>
                  <td className={styles.deal}>{row.country}</td>
                  {row.cells.map((cell, i) => <td key={`${row.country}-${i}`} className={styles.num}>{cell}</td>)}
                </tr>)}</tbody>
              </table>
            </div>
            <p className={styles.exNote}><Rich text={paper.matrix.fields.footnote}/></p>
            <p className={styles.exNote}><Rich text={paper.matrix.fields.totalsNote}/></p>
          </Exhibit>
          <p className={styles.lead}><Rich text={paper.matrix.fields.reading}/></p>
          <h3>{paper.matrix.memo.heading}</h3>
          <p className={styles.lead}>{paper.matrix.memo.intro}</p>
          <ul className={styles.bullets}>{paper.matrix.memo.queries.map(q => <li key={q.field}><strong>{q.field}:</strong> <span className={styles.mono} dir="ltr">{q.query}</span>{q.note ? <> — <Rich text={q.note}/></> : null}</li>)}</ul>
          <p className={styles.lead}>{paper.matrix.memo.mapping}</p>
          <h3>{paper.matrix.gap.heading}</h3>
          <div className={styles.prose}><p><Rich text={paper.matrix.gap.text}/></p></div>
        </section>

        <section className={styles.sec} aria-labelledby="findings">
          {sec('06', paper.findings.heading)}
          <h2 id="findings">{paper.findings.heading.ar}</h2>
          {paper.findings.items.map(item => <div key={item.no} className={styles.tech}>
            <div className={styles.th}><span className={styles.no}>{item.no}</span><h3>{item.title}</h3></div>
            <div className={styles.prose}><p><Rich text={item.text}/></p></div>
          </div>)}
        </section>

        <section className={styles.sec} aria-labelledby="prior">
          {sec('07', paper.prior.heading)}
          <h2 id="prior">{paper.prior.heading.ar}</h2>
          <div className={styles.why}>{paper.prior.items.map((item, i) => <div key={item.title} className={styles.drv}><span className={styles.ic}>{i + 1}</span><div><h3>{item.title}</h3><p><Rich text={item.text}/></p></div></div>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="questions">
          {sec('08', paper.questions.heading)}
          <h2 id="questions">{paper.questions.heading.ar}</h2>
          <div className={styles.findings}>{paper.questions.items.map((q, i) => <article key={q.title}><span className={styles.n}>{i + 1}</span><div><h3>{q.title}</h3><p><Rich text={q.text}/></p></div></article>)}</div>
        </section>

        <section className={styles.closing} aria-label={paper.closing.heading.ar}>
          <p className={styles.closingK}>{paper.closing.heading.ar}</p>
          <p>{paper.closing.text} <b><Rich text={paper.closing.strong}/></b></p>
        </section>

        <section className={styles.sec} aria-labelledby="scope">
          {sec('09', paper.scope.heading)}
          <h2 id="scope">{paper.scope.heading.ar}</h2>
          <ul className={styles.gaps}>{paper.scope.items.map(item => <li key={item}><Rich text={item}/></li>)}</ul>
          <blockquote className={styles.quote}>{paper.scope.pull}<span className={styles.quoteNote}>{paper.scope.pullNote}</span></blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="sources" id="sources">
          {sec('10', paper.sources.heading)}
          <h2>{paper.sources.heading.ar}</h2>
          <p className={styles.lead}>{paper.sources.intro}</p>
          <ol className={styles.srcs}>{paper.sources.items.map(s => <li key={s.n}><div>
            {'links' in s && s.links ? <>
              <span>{s.name}</span>
              <span className={styles.srcLinks}>{s.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<span className={styles.srcUrl}>{link.url}</span></a>)}</span>
            </> : <a href={s.url} target="_blank" rel="noreferrer"><span>{s.name}</span><span className={styles.srcUrl}>{s.url}</span></a>}
          </div></li>)}</ol>
        </section>

        <section className={styles.cite} aria-label={ar ? 'للاستشهاد' : 'Cite this paper'}>
          <p>{ar ? 'للاستشهاد:' : 'Cite this paper:'}</p>
          <p className={styles.citeText}>{paper.citation}</p>
          <div className={styles.actions}>
            <a className={styles.btnDark} href={paper.pdfAr} download>{ar ? 'تحميل PDF' : 'Download PDF'}</a>
            <Link className={styles.btnLine} href={`${p}${paper.methodologyHref}`}>{t(paper.methodologyLabel)}</Link>
            <Link className={styles.btnLine} href={`${p}${paper.doctrineHref}`}>{t(paper.doctrineLabel)}</Link>
          </div>
        </section>
      </div>
    </div>
  </Shell>;
}

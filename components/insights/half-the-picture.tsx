import Link from 'next/link';
import {Shell, SubNav} from './pages';
import {paper, type Bi} from '@/lib/research/half-the-picture';
import {insights} from '@/lib/insights';
import styles from './half-the-picture.module.css';

type Locale = 'ar' | 'en';

/** Range bar on a 0..max scale. The bar runs to the top of the range; the highlighted segment is the reported range. */
function Range({lo, hi, max, strong}: {lo: number; hi: number; max: number; strong?: boolean}) {
  return <div className={styles.track}>
    <span className={`${styles.bar} ${strong ? styles.barStrong : ''}`} style={{width: `${(hi / max) * 100}%`}}/>
    <span className={styles.hit} style={{insetInlineStart: `${(lo / max) * 100}%`, width: `${((hi - lo) / max) * 100}%`}}/>
    <span className={styles.val} style={{insetInlineStart: `calc(${(hi / max) * 100}% + 8px)`}}>{lo === hi ? `${hi}%` : `${lo}–${hi}%`}</span>
  </div>;
}

function Axis({ticks, max}: {ticks: number[]; max: number}) {
  return <div className={styles.axisRow}><span/><div className={styles.axis}>{ticks.map(v => <span key={v} style={{insetInlineStart: `${(v / max) * 100}%`}}>{v}%</span>)}</div></div>;
}

function Dots({n, on}: {n: number; on: number}) {
  return <div className={styles.dots} role="img" aria-label={`${on} / ${n}`}>{Array.from({length: n}, (_, i) => <i key={i} className={i < on ? styles.on : ''}/>)}</div>;
}

function Exhibit({no, title, ar, children, note}: {no: number; title: Bi; ar: boolean; children: React.ReactNode; note?: Bi}) {
  const t = (v: Bi) => (ar ? v.ar : v.en);
  return <figure className={styles.ex}>
    <figcaption><span className={styles.exNo}>{ar ? `الشكل ${no}` : `Exhibit ${no}`}</span><span>{t(title)}</span></figcaption>
    {children}
    {note && <p className={styles.exNote}>{t(note)}</p>}
  </figure>;
}

export function HalfThePicture({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  const sec = (n: string, label: Bi) => <p className={styles.kicker}><i aria-hidden="true"/><span className={styles.mono}>{n}</span> · {t(label)}</p>;
  return <Shell locale={locale} path={`/insights/reports/${paper.slug}`}>
    <SubNav locale={locale} current="reports"/>
    <div className={`${styles.r} ${ar ? '' : styles.en}`}>

      <header className={styles.cover}>
        <div className={styles.grid} aria-hidden="true"/>
        <div className={styles.coverIn}>
          <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={`${p}/insights`}>Insights</Link><span aria-hidden="true">/</span><Link href={`${p}/insights/reports`}>{t(insights.sections.reports.title)}</Link></nav>
          <p className={styles.lab} lang="en" dir="ltr">VISIONSEEK LAB · EXPLORATORY STUDY</p>
          <h1>{t(paper.title)}</h1>
          <p className={styles.q}>{t(paper.question)}</p>
          <div className={styles.strip} aria-hidden="true">{Array.from({length: 10}, (_, i) => <i key={i} className={i === 0 ? styles.on : ''}/>)}</div>
          <div className={styles.stripCap}><span>{ar ? 'معلومة واحدة يكتبها الناس' : 'One fact people write'}</span><span>{ar ? 'وتسع لا يعرفها إلا صاحب القرار' : 'Nine only the decision-maker knows'}</span></div>
          <dl className={styles.meta}>
            <div><dt>{ar ? 'إعداد' : 'Author'}</dt><dd>{t(paper.author)}</dd></div>
            <div><dt>{ar ? 'التاريخ' : 'Date'}</dt><dd>{t(paper.dateLabel)}</dd></div>
            <div><dt>{ar ? 'الورقة العلمية (نسخة أولية)' : 'Paper (preprint)'}</dt><dd><a href={paper.doiUrl} target="_blank" rel="noreferrer" dir="ltr">DOI {paper.doi}</a></dd></div>
          </dl>
          <div className={styles.actions}>
            <a className={styles.btn} href={paper.pdfAr} download>{ar ? 'تحميل التقرير (PDF)' : 'Arabic report (PDF)'}</a>
            <Link className={styles.btnGhost} href={`${p}/insights/research`}>{ar ? 'الورقة العلمية' : 'The research paper'}</Link>
          </div>
          <p className={styles.tag}>{t(paper.label)}</p>
        </div>
      </header>

      <div className={styles.body}>
        <section className={styles.sec} aria-labelledby="summary">
          {sec('00', {ar: 'الخلاصة في دقيقة', en: 'The study in a minute'})}
          <h2 id="summary">{t(paper.headline)}</h2>
          <div className={styles.stats}>{paper.stats.map(s => <div key={s.big}><p className={styles.big}>{s.big}</p><p>{t(s.text)}</p></div>)}</div>
          <ol className={styles.takeaways}>{paper.findings.map((f, i) => <li key={f.title.en}><span className={styles.mono}>{String(i + 1).padStart(2, '0')}</span><p>{t(f.title)}</p></li>)}</ol>
          <div className={styles.callout}><span lang="en" dir="ltr">PROTOCOL</span><p><b>{t(paper.protocol.heading)}:</b> {paper.protocol.steps.map(s => t(s.title)).join(' ')}</p></div>
        </section>

        <section className={styles.sec} aria-labelledby="problem">
          {sec('01', {ar: 'المشكلة', en: 'The problem'})}
          <h2 id="problem">{t(paper.problem.heading)}</h2>
          <div className={styles.chat}>
            <div className={styles.bubble}><p className={styles.who}>{t(paper.problem.sees)}</p><p className={styles.line}>{t(paper.problem.line)}</p><p className={styles.small}>{t(paper.problem.imagine)}</p></div>
            <div className={`${styles.bubble} ${styles.dark}`}><p className={styles.who}>{t(paper.problem.hidden)}</p><ul>{paper.problem.facts.map(f => <li key={f.en}>{t(f)}</li>)}</ul></div>
          </div>
          <div className={styles.prose}>{paper.problem.body.map(b => <p key={b.en}>{t(b)}</p>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="question">
          {sec('02', paper.research.heading)}
          <p className={styles.prose} id="question">{t(paper.research.intro)}</p>
          <blockquote className={styles.quote}>{t(paper.research.quote)}</blockquote>
          <p className={styles.prose}>{t(paper.research.after)}</p>
        </section>

        <section className={styles.sec} aria-labelledby="method">
          {sec('03', {ar: 'ماذا فعلنا؟', en: 'What we did'})}
          <h2 id="method">{t(paper.method.heading)}</h2>
          <div className={styles.cols3}>{paper.method.groups.map(g => <div key={g.en} className={styles.card}><p className={styles.big}>8</p><p>{t(g)}</p></div>)}</div>
          <Exhibit no={1} ar={ar} title={paper.method.ex1}>
            <div className={styles.dims}>{Array.from({length: 10}, (_, i) => <div key={i} className={i === 0 ? styles.on : styles.off}>{i === 0 ? t(paper.method.ex1First) : ''}</div>)}</div>
            <p className={styles.exNote}>{t(paper.method.ex1Rest)}</p>
          </Exhibit>
          <Exhibit no={2} ar={ar} title={paper.method.ex2}>
            <ol className={styles.ladder}>{paper.method.ladder.map((r, i) => <li key={r.name.en} className={r.ref ? styles.ref : ''}><span className={styles.mono}>{i + 1}</span><b>{t(r.name)}</b><span>{t(r.note)}</span></li>)}</ol>
          </Exhibit>
          <div className={styles.cols2}>
            <div><h3>{t(paper.method.modelsTitle)}</h3><p>{t(paper.method.models)}</p></div>
            <div className={styles.tint}><h3>{t(paper.method.metricTitle)}</h3><p>{t(paper.method.metric)}</p></div>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="findings">
          {sec('04', {ar: 'ماذا وجدنا؟', en: 'What we found'})}
          <h2 id="findings">{t(paper.findingsHeading)}</h2>
          <Exhibit no={3} ar={ar} title={paper.ex3} note={paper.ex3Note}>
            <div className={styles.chart}>
              {paper.ex3Rows.map(r => <div key={r.label.en} className={styles.crow}><div className={styles.lbl}>{t(r.label)}{r.sub && <small>{t(r.sub)}</small>}</div>{r.text ? <div className={styles.track}><span className={styles.txt}>{t(r.text)}</span></div> : <Range lo={r.lo!} hi={r.hi!} max={30} strong={r.strong}/>}</div>)}
              <Axis ticks={[0, 10, 20, 30]} max={30}/>
            </div>
          </Exhibit>
          <div className={styles.findings}>{paper.findings.slice(0, 3).map((f, i) => <article key={f.title.en}><span className={styles.n}>{i + 1}</span><div><h3>{t(f.title)}</h3><p>{t(f.text)}</p></div></article>)}</div>
          <Exhibit no={4} ar={ar} title={paper.ex4}>
            <div className={styles.chart}>
              <div className={styles.crow}><div className={styles.lbl}>{ar ? 'أحد النموذجين الصغيرين' : 'One of the two small models'}<small>{ar ? 'أعلى نسبة سُجّلت' : 'Highest rate recorded'}</small></div><Range lo={94} hi={94} max={100}/></div>
              <div className={styles.crow}><div className={styles.lbl}>{ar ? 'نماذج Claude' : 'Claude models'}</div><Range lo={10} hi={14} max={100} strong/></div>
              <Axis ticks={[0, 50, 100]} max={100}/>
            </div>
          </Exhibit>
          <div className={styles.findings}>{paper.findings.slice(3, 5).map((f, i) => <article key={f.title.en}><span className={styles.n}>{i + 4}</span><div><h3>{t(f.title)}</h3><p>{t(f.text)}</p></div></article>)}</div>
          <Exhibit no={5} ar={ar} title={paper.ex5} note={paper.ex5Note}>
            <div className={styles.dotrow}><b>Claude</b><Dots n={8} on={1}/><span className={styles.mono}>1 / 8</span></div>
            <div className={styles.dotrow}><b>Grok</b><Dots n={8} on={2}/><span className={styles.mono}>2 / 8</span></div>
            <div className={styles.dotrow}><b>{ar ? 'Grok بعد النقد' : 'Grok after critique'}</b><Dots n={24} on={3}/><span className={styles.mono}>3 / 24</span></div>
          </Exhibit>
          <div className={styles.findings}><article><span className={styles.n}>6</span><div><h3>{t(paper.findings[5].title)}</h3><p>{t(paper.findings[5].text)}</p></div></article></div>
        </section>

        <section className={styles.sec} aria-labelledby="protocol">
          {sec('05', {ar: 'البروتوكول العملي', en: 'The protocol'})}
          <h2 id="protocol">{t(paper.protocol.heading)}</h2>
          <p className={styles.lead}>{t(paper.protocol.intro)}</p>
          <ol className={styles.steps}>{paper.protocol.steps.map((s, i) => <li key={s.title.en}>
            <div className={styles.stepNo}><span lang="en" dir="ltr">STEP</span><b>{i + 1}</b></div>
            <div className={styles.stepBody}><h3>{t(s.title)}</h3><p>{t(s.text)}</p>
              {i === 0 && <div className={styles.chips}>{paper.protocol.chips.map(c => <span key={c.en}>{t(c)}</span>)}</div>}
              {s.prompt && <p className={styles.prompt}>{t(s.prompt)}</p>}
            </div>
          </li>)}</ol>
          <div className={styles.warn}><b>{t(paper.protocol.warnLabel)}</b><p>{t(paper.protocol.warn)}</p></div>
        </section>

        <section className={styles.sec} aria-labelledby="limits">
          {sec('06', paper.limits.heading)}
          <p className={styles.prose} id="limits">{t(paper.limits.intro)}</p>
          <div className={styles.lim}>{paper.limits.items.map(l => <div key={l.title.en} className={l.wide ? styles.wide : ''}><b>{t(l.title)}</b><p>{t(l.text)}</p></div>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="next">
          {sec('07', paper.next.heading)}
          <ol className={styles.next} id="next">{paper.next.items.map((n, i) => <li key={n.title.en}><span className={styles.mono}>{i + 1}</span><p><b>{t(n.title)}</b> {t(n.text)}</p></li>)}</ol>
        </section>

        <section className={styles.closing} aria-label={t(paper.closing.heading)}>
          <p className={styles.closingK}>{t(paper.closing.heading)}</p>
          <p>{t(paper.closing.text)} <b>{t(paper.closing.strong)}</b></p>
        </section>

        <section className={styles.cite} aria-label={ar ? 'للاستشهاد' : 'Cite this paper'}>
          <p>{ar ? 'للاستشهاد بالورقة العلمية:' : 'Cite the paper:'}</p>
          <p lang="en" dir="ltr" className={styles.citeText}>{paper.citation}</p>
          <div className={styles.actions}>
            <a className={styles.btnDark} href={paper.pdfAr} download>{ar ? 'تحميل التقرير (PDF)' : 'Arabic report (PDF)'}</a>
            <Link className={styles.btnLine} href={`${p}/insights/research`}>{ar ? 'الورقة العلمية' : 'The research paper'}</Link>
            <a className={styles.btnLine} href={paper.doiUrl} target="_blank" rel="noreferrer">{ar ? 'الورقة على Zenodo' : 'The paper on Zenodo'}</a>
          </div>
        </section>
      </div>
    </div>
  </Shell>;
}

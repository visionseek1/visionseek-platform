import Link from 'next/link';
import {Shell, SubNav} from './pages';
import {paper, type Bi} from '@/lib/research/localization-doctrine';
import {insights} from '@/lib/insights';
import styles from './localization-doctrine.module.css';

type Locale = 'ar' | 'en';

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[(?:مؤكد بمصدر|استنتاج|فجوة|صحافة|Verified|Inference|Gap|Press)[^\]]*\])/g;

function markClass(token: string): string {
  if (/^\[(?:مؤكد بمصدر|Verified)/.test(token)) return `${styles.mark} ${styles.s}`;
  if (/^\[(?:صحافة|Press)/.test(token)) return `${styles.mark} ${styles.p}`;
  if (/^\[(?:فجوة|Gap)/.test(token)) return `${styles.mark} ${styles.g}`;
  return `${styles.mark} ${styles.i}`;
}

function Rich({text}: {text: string}) {
  return <>{text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <i key={i}>{part.slice(1, -1)}</i>;
    if (part.startsWith('[')) return <mark key={i} className={markClass(part)}>{part}</mark>;
    return <span key={i}>{part}</span>;
  })}</>;
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

export function LocalizationDoctrine({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  const sec = (n: string, label: Bi) => <p className={styles.kicker}><i aria-hidden="true"/><span className={styles.mono}>{n}</span> · {t(label)}</p>;
  return <Shell locale={locale} path={`/insights/reports/${paper.slug}`}>
    <SubNav locale={locale} current="reports"/>
    <div className={`${styles.r} ${ar ? '' : styles.en}`}>

      <header className={styles.cover}>
        <div className={styles.grid} aria-hidden="true"/>
        <div className={styles.coverIn}>
          <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={`${p}/insights`}>Insights</Link><span aria-hidden="true">/</span><Link href={`${p}/insights/reports`}>{t(insights.sections.reports.title)}</Link></nav>
          <p className={styles.lab} lang="en" dir="ltr">VISIONSEEK LAB · DOCTRINE PAPER</p>
          <h1>{t(paper.title)}</h1>
          <p className={styles.q}>{t(paper.question)}</p>
          <div className={styles.steps} aria-hidden="true">{[8, 14, 20, 27, 35].map(h => <i key={h} style={{height: h}}/>)}</div>
          <div className={styles.stepCap}><span>{ar ? 'استخدام' : 'Use'}</span><span>{ar ? 'تصدير / معيار' : 'Export / Standard'}</span></div>
          <dl className={styles.meta}>
            <div><dt>{ar ? 'إعداد' : 'Author'}</dt><dd>{t(paper.author)}</dd></div>
            <div><dt>{ar ? 'التاريخ' : 'Date'}</dt><dd>{t(paper.dateLabel)}</dd></div>
            <div><dt>{ar ? 'المصادر' : 'Sources'}</dt><dd><a href="#sources">{ar ? '31 مصدرًا' : '31 sources'}</a></dd></div>
          </dl>
          <div className={styles.actions}>
            <a className={styles.btn} href={paper.pdfAr} download>{ar ? 'تحميل التقرير (PDF)' : 'Arabic report (PDF)'}</a>
            <Link className={styles.btnGhost} href={`${p}${paper.indexHref}`}>{t(paper.indexLabel)}</Link>
          </div>
          <p className={styles.tag}>{t(paper.label)}</p>
        </div>
      </header>

      <div className={styles.body}>
        <section className={styles.sec} aria-labelledby="summary">
          {sec('00', {ar: 'الخلاصة في دقيقة', en: 'The paper in a minute'})}
          <h2 id="summary">{t(paper.headline)}</h2>
          <div className={styles.stats}>{paper.stats.map(s => <div key={s.big}><p className={styles.big}>{s.big}</p><p><Rich text={t(s.text)}/></p></div>)}</div>
          <ol className={styles.takeaways}>{paper.conclusions.items.map((f, i) => <li key={f.title.en}><span className={styles.mono}>{String(i + 1).padStart(2, '0')}</span><p>{t(f.title)}</p></li>)}</ol>
          <blockquote className={styles.quote}>{t(paper.call.ask)}</blockquote>
        </section>

        <section className={styles.sec} aria-labelledby="legend">
          {sec('—', paper.markersLegend.heading)}
          <h2 id="legend">{t(paper.markersLegend.heading)}</h2>
          <div className={styles.legend}>{paper.markersLegend.items.map(item => <div key={item.kind}><Rich text={ar ? item.ar : item.en}/></div>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="moment">
          {sec('01', paper.moment.heading)}
          <h2 id="moment">{t(paper.moment.heading)}</h2>
          <blockquote className={styles.quote}>{t(paper.moment.pull)}</blockquote>
          <div className={styles.prose}>{paper.moment.body.map(b => <p key={b.en}><Rich text={t(b)}/></p>)}</div>
          <Exhibit no={1} ar={ar} title={paper.timeline.title} note={paper.timeline.note}>
            <div className={styles.tl}>{paper.timeline.events.map(e => <div key={e.year} className={`${styles.ev} ${e.own ? styles.hl : ''}`}><div className={styles.yr}>{e.year}</div><i className={styles.dot} aria-hidden="true"/><p><Rich text={ar ? e.ar : e.en}/></p></div>)}</div>
          </Exhibit>
        </section>

        <section className={styles.sec} aria-labelledby="conclusions">
          {sec('02', paper.conclusions.heading)}
          <h2 id="conclusions">{t(paper.conclusions.heading)}</h2>
          <div className={styles.findings}>{paper.conclusions.items.map((f, i) => <article key={f.title.en}><span className={styles.n}>{i + 1}</span><div><h3>{t(f.title)}</h3><p><Rich text={t(f.text)}/></p></div></article>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="why">
          {sec('03', paper.whyNow.heading)}
          <h2 id="why">{t(paper.whyNow.heading)}</h2>
          <div className={styles.why}>{paper.whyNow.items.map((item, i) => <div key={item.title.en} className={styles.drv}><span className={styles.ic}>{i + 1}</span><div><h3>{t(item.title)}</h3><p><Rich text={t(item.text)}/></p></div></div>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="techs">
          {sec('04', paper.techsHeading)}
          <h2 id="techs">{t(paper.techsHeading)}</h2>
          <p className={styles.lead}>{t(paper.techsIntro)}</p>
          {paper.techs.map(tech => <div key={tech.no} className={styles.tech}>
            <div className={styles.th}><span className={styles.no}>{tech.no}</span><h3>{t(tech.title)}</h3></div>
            {tech.rows.map(row => <div key={row.label.en} className={`${styles.row} ${'fail' in row && row.fail ? styles.fail : ''} ${'opp' in row && row.opp ? styles.opp : ''}`}><div className={styles.l}>{t(row.label)}</div><div className={styles.c}><Rich text={t(row.text)}/></div></div>)}
          </div>)}
          <Exhibit no={2} ar={ar} title={paper.patents.title} note={paper.patents.note}>
            <div className={styles.chart}>
              {paper.patents.rows.map(r => <div key={r.en} className={styles.crow}><div className={styles.lbl}>{t(r)}<small>{t(r.sub)}</small></div><div className={styles.track}><span className={`${styles.bar} ${r.strong ? styles.barStrong : ''}`} style={{width: `${r.value}%`}}/><span className={styles.val} style={{insetInlineStart: `calc(${r.value}% + 8px)`}}>{r.label}</span></div></div>)}
              <div className={styles.axisRow}><span/><div className={styles.axis}>{[0, 25, 50, 75, 100].map(v => <span key={v} style={{insetInlineStart: `${v}%`}}>{v}%</span>)}</div></div>
            </div>
          </Exhibit>
        </section>

        <section className={styles.sec} aria-labelledby="doctrine">
          {sec('05', {ar: 'ثمانية مبادئ', en: 'Eight principles'})}
          <h2 id="doctrine"><Rich text={t(paper.doctrine.heading)}/></h2>
          <p className={styles.lead}>{t(paper.doctrine.intro)}</p>
          <Exhibit no={3} ar={ar} title={{ar: 'المبادئ الثمانية لعقيدة التوطين', en: 'The eight principles of the Localization Doctrine'}}>
            <div className={styles.pr}>{paper.doctrine.items.map(item => <div key={item.n} className={`${styles.pc} ${'hl' in item && item.hl ? styles.hl : ''}`}><div className={styles.pn}>{item.n}</div><h3>{t(item.title)}</h3><p><Rich text={t(item.text)}/></p></div>)}</div>
          </Exhibit>
        </section>

        <section className={styles.sec} aria-labelledby="ladder">
          {sec('06', paper.ladder.heading)}
          <h2 id="ladder">{t(paper.ladder.heading)}</h2>
          <p className={styles.lead}><Rich text={t(paper.ladder.intro)}/></p>
          <p className={styles.prose}><Rich text={t(paper.ladder.after)}/></p>
          <Exhibit no={4} ar={ar} title={{ar: 'سُلّم الامتلاك ذو الدرجات الخمس — مقترح لمؤشر القدرة التكنولوجية العربية', en: 'The five-step ownership ladder — a proposal for the Arab Technological Capability Index'}}>
            <div className={styles.ladder}>{paper.ladder.steps.map(s => <div key={s.n} className={styles.st}><span className={styles.sn}>{s.n}</span><span className={styles.nm}>{ar ? s.ar : s.en}</span><span className={styles.kp}>{t(s.note)}</span></div>)}</div>
            <div className={styles.zones}><div>{t(paper.ladder.zones.use)}</div><div>{t(paper.ladder.zones.own)}</div></div>
          </Exhibit>
        </section>

        <section className={styles.sec} aria-labelledby="call">
          {sec('07', paper.call.heading)}
          <h2 id="call">{t(paper.call.heading)}</h2>
          <div className={styles.prose}>{paper.call.body.map(b => <p key={b.en}><Rich text={t(b)}/></p>)}</div>
          <div className={styles.ask}><p className={styles.askK}>{ar ? 'سؤال واحد لصفقتكم القادمة' : 'One question for your next technology deal'}</p><p className={styles.askQ}>{t(paper.call.ask)}</p></div>
        </section>

        <section className={styles.closing} aria-label={t(paper.closing.heading)}>
          <p className={styles.closingK}>{t(paper.closing.heading)}</p>
          <p>{t(paper.closing.text)} <b>{t(paper.closing.strong)}</b></p>
        </section>

        <section className={styles.sec} aria-labelledby="sources" id="sources">
          {sec('08', paper.sources.heading)}
          <h2>{t(paper.sources.heading)}</h2>
          <p className={styles.lead}>{t(paper.sources.intro)}</p>
          <ol className={styles.srcs}>{paper.sources.items.map(s => <li key={s.n}><div><a href={s.url} target="_blank" rel="noreferrer"><span>{s.name}</span><span className={styles.srcUrl}>{s.url}</span></a><span className={styles.srcType}>{s.type === 'N' ? (ar ? 'صحافة' : 'Press') : s.type === 'R' ? (ar ? 'سجل رسمي' : 'Registry') : (ar ? 'أولي' : 'Primary')}</span><span className={styles.srcUsed}>{t(s.used)}</span></div></li>)}</ol>
          <h3>{t(paper.sources.gapsHeading)}</h3>
          <ul className={styles.gaps}>{paper.sources.gaps.map(g => <li key={g.en}><Rich text={t(g)}/></li>)}</ul>
        </section>

        <section className={styles.cite} aria-label={ar ? 'للاستشهاد' : 'Cite this paper'}>
          <p>{ar ? 'للاستشهاد:' : 'Cite this paper:'}</p>
          <p lang="en" dir="ltr" className={styles.citeText}>{paper.citation}</p>
          <p>{t(paper.feeds)}</p>
          <div className={styles.actions}>
            <a className={styles.btnDark} href={paper.pdfAr} download>{ar ? 'تحميل التقرير (PDF)' : 'Arabic report (PDF)'}</a>
            <Link className={styles.btnLine} href={`${p}${paper.indexHref}`}>{t(paper.indexLabel)}</Link>
          </div>
        </section>
      </div>
    </div>
  </Shell>;
}

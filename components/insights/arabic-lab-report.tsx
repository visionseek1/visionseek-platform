import Link from 'next/link';
import {Shell, SubNav} from './pages';
import {insights} from '@/lib/insights';
import type {Bi, LabReport, ReportTable} from '@/lib/research/arabic-lab-report';
import {Exhibit, Rich} from './report-rich';
import styles from './localization-doctrine.module.css';

type Locale = 'ar' | 'en';

function TableView({table}: {table: ReportTable}) {
  return <>
    {table.heading && <h3>{table.heading}</h3>}
    <div className={styles.tblWrap}>
      <table className={styles.tbl}>
        <thead><tr>{table.columns.map(c => <th key={c}><Rich text={c}/></th>)}</tr></thead>
        <tbody>{table.rows.map((row, i) => <tr key={`${row.cells[0]}-${i}`}>
          {row.cells.map((cell, j) => <td key={`${i}-${j}`} className={j === 0 ? styles.deal : (j > 0 && /[$%0-9]/.test(cell) ? styles.num : undefined)}>
            <Rich text={cell}/>
          </td>)}
        </tr>)}
        </tbody>
      </table>
    </div>
    {table.note && <p className={styles.lead}><Rich text={table.note}/></p>}
  </>;
}

export function ArabicLabReport({locale, paper}: {locale: Locale; paper: LabReport}) {
  const ar = locale === 'ar';
  const t = (v: Bi) => (ar ? v.ar : v.en);
  const p = ar ? '/ar' : '';
  const sec = (n: string, label: Bi) => <p className={styles.kicker}><i aria-hidden="true"/><span className={styles.mono}>{n}</span> · {t(label)}</p>;
  return <Shell locale={locale} path={`/reports/reports/${paper.slug}`}>
    <SubNav locale={locale} current="reports"/>
    <div className={styles.r} lang="ar" dir="rtl">

      <header className={styles.cover}>
        <div className={styles.grid} aria-hidden="true"/>
        <div className={styles.coverIn}>
          <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={`${p}/reports`}>{ar ? 'تقارير' : 'Reports'}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`${p}/reports/reports`}>{t(insights.sections.reports.title)}</Link>
          </nav>
          <p className={styles.lab} lang="en" dir="ltr">{paper.lab}</p>
          <h1>{paper.title.ar}</h1>
          <p className={styles.q}>{paper.question.ar}</p>
          <p className={styles.tag}>{paper.deck.ar}</p>
          <p className={styles.tag}>{t(paper.attribution)}</p>
          <dl className={styles.meta}>
            <div><dt>{ar ? 'إعداد' : 'Author'}</dt><dd>{t(paper.author)}</dd></div>
            <div><dt>{ar ? 'التاريخ' : 'Date'}</dt><dd>{t(paper.dateLabel)}</dd></div>
            <div><dt>{ar ? 'الإصدار' : 'Version'}</dt><dd>{t(paper.versionLabel)}</dd></div>
            <div>
              <dt>{ar ? 'المرجع' : 'Source'}</dt>
              <dd><a href={paper.doiUrl} target="_blank" rel="noreferrer">{t(paper.doiLine)}</a></dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <a className={styles.btn} href={paper.pdfAr} download>{ar ? 'تحميل PDF' : 'Download PDF'}</a>
            <Link className={styles.btnGhost} href={`${p}${paper.methodologyHref}`}>{t(paper.methodologyLabel)}</Link>
            {paper.researchHref && paper.researchLabel && (
              <Link className={styles.btnGhost} href={`${p}${paper.researchHref}`}>{t(paper.researchLabel)}</Link>
            )}
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

        {paper.notices && paper.notices.length > 0 && (
          <section className={styles.sec} aria-labelledby="notices">
            {sec('—', {ar: 'قبل القراءة', en: 'Before you read'})}
            <h2 id="notices">{ar ? 'قبل القراءة' : 'Before you read'}</h2>
            {paper.notices.map(note => <blockquote key={note} className={styles.quote}><Rich text={note}/></blockquote>)}
          </section>
        )}

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

        {paper.sections.map(section => (
          <section key={section.id} className={styles.sec} aria-labelledby={section.id}>
            {sec(section.kicker, section.heading)}
            <h2 id={section.id}>{section.heading.ar}</h2>
            {section.intro && <p className={styles.lead}><Rich text={section.intro}/></p>}
            {section.blocks.map((block, i) => {
              const key = `${section.id}-${i}`;
              if (block.kind === 'subhead') return <h3 key={key}>{block.text}</h3>;
              if (block.kind === 'prose') return <div key={key} className={styles.prose}><p><Rich text={block.text}/></p></div>;
              if (block.kind === 'bullets') return <ul key={key} className={styles.bullets}>{block.items.map(item => <li key={item}><Rich text={item}/></li>)}</ul>;
              if (block.kind === 'table') {
                const table = <TableView table={block.table}/>;
                return block.exhibit
                  ? <Exhibit key={key} no={block.exhibit.no} title={block.exhibit.title} note={block.table.note}>{table}</Exhibit>
                  : <div key={key}>{table}</div>;
              }
              return null;
            })}
          </section>
        ))}

        <section className={styles.sec} aria-labelledby="questions">
          {sec('07', paper.questions.heading)}
          <h2 id="questions">{paper.questions.heading.ar}</h2>
          <div className={styles.findings}>{paper.questions.items.map((q, i) => <article key={q.title}><span className={styles.n}>{i + 1}</span><div><h3><Rich text={q.title}/></h3>{q.text ? <p><Rich text={q.text}/></p> : null}</div></article>)}</div>
        </section>

        <section className={styles.sec} aria-labelledby="method">
          {sec('08', paper.method.heading)}
          <h2 id="method">{paper.method.heading.ar}</h2>
          <div className={styles.why}>{paper.method.items.map((item, i) => <div key={item.label} className={styles.drv}><span className={styles.ic}>{i + 1}</span><div><h3>{item.label}</h3><p><Rich text={item.text}/></p></div></div>)}</div>
          {paper.notes && <div className={styles.prose}><h3>{paper.notes.heading}</h3><p><Rich text={paper.notes.text}/></p></div>}
        </section>

        <section className={styles.closing} aria-label={paper.closing.heading.ar}>
          <p className={styles.closingK}>{paper.closing.heading.ar}</p>
          <p>{paper.closing.text}{paper.closing.strong ? <> <b><Rich text={paper.closing.strong}/></b></> : null}</p>
        </section>

        <section className={styles.cite} aria-label={ar ? 'للاستشهاد' : 'Cite this paper'}>
          <p>{ar ? 'للاستشهاد:' : 'Cite this paper:'}</p>
          <p className={styles.citeText}>{paper.citation}</p>
          {paper.researchCitation && <p className={styles.citeText}>{paper.researchCitation}</p>}
          <p><a href={paper.doiUrl} target="_blank" rel="noreferrer">{t(paper.doiLine)}</a></p>
          <div className={styles.actions}>
            <a className={styles.btnDark} href={paper.pdfAr} download>{ar ? 'تحميل PDF' : 'Download PDF'}</a>
            <Link className={styles.btnLine} href={`${p}${paper.methodologyHref}`}>{t(paper.methodologyLabel)}</Link>
            {paper.researchHref && paper.researchLabel && (
              <Link className={styles.btnLine} href={`${p}${paper.researchHref}`}>{t(paper.researchLabel)}</Link>
            )}
          </div>
        </section>
      </div>
    </div>
  </Shell>;
}

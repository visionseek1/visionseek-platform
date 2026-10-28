import type {ReactNode} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {readingLabel} from '@/components/news/copy';
import {insights} from '@/lib/insights';
import {paper, type Bi, type MonoBlock} from '@/lib/research/shadow-ai-employee-data';
import {Shell, SubNav} from './pages';
import styles from './localization-doctrine.module.css';

type Locale = 'ar' | 'en';

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[\d+\])/g;
const methodologyLabel: Bi = {ar: 'منهجية التقارير', en: 'Reports Methodology'};

/** Emphasis is parsed again so a citation inside bold or italic text still links to its source. */
function renderRich(text: string): ReactNode {
  const parts = text.split(TOKEN);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{renderRich(part.slice(2, -2))}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{renderRich(part.slice(1, -1))}</em>;
    const cite = /^\[(\d+)\]$/.exec(part);
    if (cite) return <a key={i} className={styles.ref} href={`#src-${cite[1]}`}>[{cite[1]}]</a>;
    return <span key={i}>{part}</span>;
  });
}

function Rich({text}: {text: string}) {
  return <>{renderRich(text)}</>;
}

function BlockView({block}: {block: MonoBlock}) {
  if (block.kind === 'prose') return <p><Rich text={block.text}/></p>;
  if (block.kind === 'list') return <div className={styles.findings}>{block.items.map((item, i) => <article key={item}><span className={styles.n}>{i + 1}</span><div><p><Rich text={item}/></p></div></article>)}</div>;
  return <>
    <div className={styles.tblWrap}>
      <table className={styles.tbl}>
        <thead><tr>{block.columns.map(column => <th key={column}><Rich text={column}/></th>)}</tr></thead>
        <tbody>{block.rows.map((row, i) => <tr key={`${row[0]}-${i}`}>{row.map((cell, j) => <td key={`${i}-${j}`} className={j === 0 ? styles.deal : undefined}><Rich text={cell}/></td>)}</tr>)}</tbody>
      </table>
    </div>
    {block.note ? <p className={styles.exNote}><Rich text={block.note}/></p> : null}
  </>;
}

export function ShadowAiEmployeeData({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const t = (value: Bi) => (ar ? value.ar : value.en);
  const p = ar ? '/ar' : '';
  const dir = (value: Bi) => (ar || value.ar === value.en ? 'rtl' : 'ltr');
  const body = ar ? paper.bodies.ar : paper.bodies.en;
  const sourcesHeading = ar ? 'المنهجية والمصادر' : 'Methodology and Sources';
  return <Shell locale={locale} path={`/reports/reports/${paper.slug}`}>
    <SubNav locale={locale} current="reports"/>
    <div className={`${styles.r} ${ar ? '' : styles.en}`} lang={ar ? 'ar' : 'en'} dir={ar ? 'rtl' : 'ltr'}>
      <header className={styles.cover}>
        <div className={styles.grid} aria-hidden="true"/>
        <div className={styles.coverIn}>
          <nav className={styles.crumbs} aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={`${p}/reports`}>{ar ? 'تقارير' : 'Reports'}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`${p}/reports/reports`}>{ar ? insights.sections.reports.title.ar : insights.sections.reports.title.en}</Link>
          </nav>
          <p className={styles.tag} lang="ar" dir="rtl">{paper.tag}</p>
          <h1 className={styles.solo} dir={dir(paper.title)} lang={ar ? 'ar' : 'en'}>{t(paper.title)}</h1>
          <p className={styles.q} dir={dir(paper.question)} lang={ar ? 'ar' : 'en'}>{t(paper.question)}</p>
          <p className={styles.tag} dir={dir(paper.attribution)} lang={ar ? 'ar' : 'en'}>{t(paper.attribution)}</p>
          <dl className={styles.meta}>
            <div><dt>{ar ? 'إعداد' : 'Author'}</dt><dd dir={ar ? 'rtl' : 'ltr'} lang={ar ? 'ar' : 'en'}>{t(paper.author)}</dd></div>
            <div><dt>{ar ? 'التاريخ' : 'Date'}</dt><dd><time dateTime={paper.publishedAt}>{t(paper.dateLabel)}</time></dd></div>
            <div><dt>{ar ? 'الإصدار' : 'Version'}</dt><dd>{paper.versionLabel}</dd></div>
            <div><dt>{ar ? 'المصادر' : 'Sources'}</dt><dd><a href="#sources">{ar ? `${paper.sources.length} مصدرًا` : `${paper.sources.length} sources`}</a></dd></div>
          </dl>
          <div className={styles.actions}>
            <a className={styles.btn} href={paper.pdfAr} download>{ar ? 'تحميل PDF' : 'Download PDF'}</a>
            <Link className={styles.btnGhost} href={`${p}${paper.methodologyHref}`}>{t(methodologyLabel)}</Link>
          </div>
          <p className={styles.tag} dir={dir(paper.label)} lang={ar ? 'ar' : 'en'}>{t(paper.label)}</p>
          <p className={styles.tag}>{readingLabel(paper.readingMinutes, locale)}</p>
          <p className={styles.tag} lang="ar" dir="rtl">{paper.imageCredit}</p>
        </div>
      </header>

      <div className={styles.body}>
        <figure className={styles.ex}>
          <Image src={paper.cover} alt={paper.heroAlt} width={paper.coverWidth} height={paper.coverHeight} sizes="(max-width: 1080px) 100vw, 1080px" style={{width: '100%', height: 'auto'}}/>
          <figcaption className={styles.exNote} lang="ar" dir="rtl">{paper.imageCredit}</figcaption>
        </figure>

        <section className={styles.sec} aria-label={t(paper.summary)}>
          <p className={styles.lead} dir={dir(paper.summary)} lang={ar ? 'ar' : 'en'}>{t(paper.summary)}</p>
          <blockquote className={styles.quote} dir={dir(paper.answer)} lang={ar ? 'ar' : 'en'}>{t(paper.answer)}</blockquote>
          <div className={styles.stats}>{paper.stats.map(stat => <div key={stat.big}><p className={styles.big}>{stat.big}</p><p dir={ar ? 'rtl' : 'ltr'} lang={ar ? 'ar' : 'en'}>{t(stat.text)}</p></div>)}</div>
        </section>

        {body.intro.length > 0 && <section className={styles.sec} lang={ar ? 'ar' : 'en'} dir={ar ? 'rtl' : 'ltr'}>
          <div className={styles.prose}>{body.intro.map(paragraph => <p key={paragraph}><Rich text={paragraph}/></p>)}</div>
        </section>}

        {body.sections.map(section => {
          const sources = section.heading === sourcesHeading;
          return <section key={section.heading} className={styles.sec} lang={ar ? 'ar' : 'en'} dir={ar ? 'rtl' : 'ltr'} id={sources ? 'sources' : undefined} aria-labelledby={section.heading}>
            <h2 id={section.heading}>{section.heading}</h2>
            <div className={styles.prose}>{section.blocks.map((block, i) => <BlockView key={`${section.heading}-${i}`} block={block}/>)}</div>
            {sources && <ol className={styles.srcs}>{paper.sources.map(source => <li key={source.id} id={`src-${source.id}`}><div>
              <a href={source.url} target="_blank" rel="noreferrer"><span>{source.title}</span><span className={styles.srcUrl}>{source.url}</span></a>
              <span className={styles.srcUsed}>{source.publisher}{source.date ? ` · ${source.date}` : ''}{' · '}<span className={source.tier.includes('ترويجي') ? `${styles.mark} ${styles.p}` : undefined}>{source.tier}</span></span>
            </div></li>)}</ol>}
          </section>;
        })}

        <section className={styles.cite} aria-label={ar ? 'تحميل التقرير' : 'Download the report'}>
          <div className={styles.actions}>
            <a className={styles.btnDark} href={paper.pdfAr} download>{ar ? 'تحميل PDF' : 'Download PDF'}</a>
            <Link className={styles.btnLine} href={`${p}${paper.methodologyHref}`}>{t(methodologyLabel)}</Link>
          </div>
        </section>
      </div>
    </div>
  </Shell>;
}

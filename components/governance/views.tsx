import Link from 'next/link';
import {insights} from '@/lib/insights';
import {listNews, displayTag, displayTitle} from '@/lib/news';
import {research, paperRecordHref} from '@/lib/research-hub';
import {isArchived} from '@/lib/visibility';
import {DiagnosticTool} from '@/components/governance/diagnostic-tool';
import {PublicFrame} from '@/components/governance/frame';
import {
  assessCta, diagnosticIntro, direction, hero, hq, hrefFor, masterclass, navLabel, observatoryCopy,
  openStandard, pdfButton, pillarBySlug, pillarPath, pillars, publicNav, readPillar, standardPdf,
  standards, tx, type PublicLocale, type Standard,
} from '@/lib/public-site';

const feedLocale = (locale: PublicLocale) => (locale === 'ar' ? 'ar' : 'en');

export function HomeView({locale}: {locale: PublicLocale}) {
  const link = (path: string) => hrefFor(locale, path);
  return <PublicFrame locale={locale} path="/">
    <div className="vs-gov">
      <section className="vs-gov-hero">
        <p className="vs-eyebrow">{tx(locale, hero.badge)}</p>
        <h1>{tx(locale, hero.headline)}</h1>
        <p className="vs-hero-sub">{tx(locale, hero.sub)}</p>
        <div className="vs-gov-actions">
          <Link className="vs-button" href={link('/standards')}>{tx(locale, hero.standardsCta)}</Link>
          <Link className="vs-button" href={link('/executive-masterclass')}>{tx(locale, hero.masterclassCta)}</Link>
        </div>
      </section>
      <section className="vs-gov-section" aria-labelledby="pillars-heading">
        <h2 id="pillars-heading">{navLabel(locale, publicNav[0])}</h2>
        <div className="vs-pillar-grid">{pillars.map(pillar => <article className="vs-pillar-card" key={pillar.slug}>
          <span className="vs-pillar-index">{pillar.id}</span>
          <h3>{tx(locale, pillar.title)}</h3>
          <p>{tx(locale, pillar.sub)}</p>
          <Link className="vs-text-link" href={link(pillarPath(pillar))}>{tx(locale, readPillar)}</Link>
        </article>)}</div>
      </section>
      <section className="vs-gov-section vs-gov-band" aria-labelledby="standards-heading">
        <h2 id="standards-heading">{navLabel(locale, publicNav[1])}</h2>
        <div className="vs-standard-grid">{standards.map(standard => <article className="vs-standard-card" key={standard.code}>
          <span className="vs-pillar-index" dir="ltr">{standard.code} ({standard.mark})</span>
          <h3>{tx(locale, standard.name)}</h3>
          <Link className="vs-text-link" href={link(`/standards#${standard.code.toLowerCase()}`)}>{tx(locale, openStandard)}</Link>
        </article>)}</div>
      </section>
      <section className="vs-gov-section">
        <div className="vs-gov-split">
          <article className="vs-pillar-card">
            <h2>{tx(locale, masterclass.title)}</h2>
            <p>{tx(locale, masterclass.sub)}</p>
            <Link className="vs-button" href={link('/executive-masterclass')}>{tx(locale, hero.masterclassCta)}</Link>
          </article>
          <article className="vs-pillar-card">
            <h2>{navLabel(locale, publicNav[3])}</h2>
            <p className="vs-question">{tx(locale, diagnosticIntro)}</p>
            <Link className="vs-button" href={link('/diagnostic')}>{tx(locale, assessCta)}</Link>
          </article>
        </div>
      </section>
      <section className="vs-gov-section vs-gov-band" aria-labelledby="research-heading">
        <h2 id="research-heading">{navLabel(locale, publicNav[4])}</h2>
        <div className="vs-pillar-grid">
          <article className="vs-pillar-card"><h3>{tx(locale, observatoryCopy.teardowns)}</h3><Link className="vs-text-link" href={link('/observatory#teardowns')}>{tx(locale, observatoryCopy.teardowns)}</Link></article>
          <article className="vs-pillar-card"><h3>{tx(locale, observatoryCopy.watch)}</h3><Link className="vs-text-link" href={link('/observatory#watch')}>{tx(locale, observatoryCopy.watch)}</Link></article>
          <article className="vs-pillar-card"><h3>{tx(locale, hq)}</h3><Link className="vs-text-link" href={link('/about')}>{navLabel(locale, publicNav[6])}</Link></article>
        </div>
      </section>
    </div>
  </PublicFrame>;
}

export function PillarsView({locale}: {locale: PublicLocale}) {
  const link = (path: string) => hrefFor(locale, path);
  return <PublicFrame locale={locale} path="/pillars">
    <div className="vs-gov">
      <section className="vs-gov-hero"><h1>{navLabel(locale, publicNav[0])}</h1></section>
      <section className="vs-gov-section"><div className="vs-pillar-grid">{pillars.map(pillar => <article className="vs-pillar-card" key={pillar.slug}>
        <span className="vs-pillar-index">{pillar.id}</span>
        <h2>{tx(locale, pillar.title)}</h2>
        <p>{tx(locale, pillar.sub)}</p>
        <p>{tx(locale, pillar.body)}</p>
        <Link className="vs-text-link" href={link(pillarPath(pillar))}>{tx(locale, readPillar)}</Link>
      </article>)}</div></section>
    </div>
  </PublicFrame>;
}

export function PillarDetail({locale, slug}: {locale: PublicLocale; slug: string}) {
  const pillar = pillarBySlug(slug);
  if (!pillar) return null;
  const standard = standards.find(item => item.pillar === pillar.slug) as Standard;
  const link = (path: string) => hrefFor(locale, path);
  return <PublicFrame locale={locale} path={pillarPath(pillar)}>
    <div className="vs-gov">
      <section className="vs-gov-hero">
        <p className="vs-pillar-index">{pillar.id}</p>
        <h1>{tx(locale, pillar.title)}</h1>
        <p className="vs-hero-sub">{tx(locale, pillar.sub)}</p>
      </section>
      <section className="vs-gov-section">
        <p className="vs-gov-prose">{tx(locale, pillar.body)}</p>
        <p className="vs-gov-actions"><Link className="vs-text-link" href={link(`/standards#${standard.code.toLowerCase()}`)}>{standard.code} ({standard.mark}) · {tx(locale, standard.name)}</Link></p>
      </section>
    </div>
  </PublicFrame>;
}

export function StandardsView({locale}: {locale: PublicLocale}) {
  return <PublicFrame locale={locale} path="/standards">
    <div className="vs-gov">
      <section className="vs-gov-hero"><h1>{navLabel(locale, publicNav[1])}</h1></section>
      <section className="vs-gov-section"><div className="vs-standard-grid">{standards.map(standard => {
        const pillar = pillars.find(item => item.slug === standard.pillar);
        return <article className="vs-standard-card" id={standard.code.toLowerCase()} key={standard.code}>
          <span className="vs-pillar-index" dir="ltr">{standard.code} ({standard.mark})</span>
          <h2>{tx(locale, standard.name)}</h2>
          {pillar ? <p>{tx(locale, pillar.body)}</p> : null}
          <a className="vs-button" href={standardPdf(standard, locale)}>{tx(locale, pdfButton)}</a>
        </article>;
      })}</div></section>
    </div>
  </PublicFrame>;
}

export function MasterclassView({locale}: {locale: PublicLocale}) {
  return <PublicFrame locale={locale} path="/executive-masterclass">
    <div className="vs-gov">
      <section className="vs-gov-hero">
        <h1>{tx(locale, masterclass.title)}</h1>
        <p className="vs-hero-sub">{tx(locale, masterclass.sub)}</p>
        <p className="vs-leader">{tx(locale, masterclass.leader)}</p>
      </section>
      <section className="vs-gov-section">
        <h2>{tx(locale, masterclass.outcomesHeading)}</h2>
        <ol className="vs-outcome-list">{masterclass.outcomes.map((outcome, index) => <li key={outcome.en}><span>0{index + 1}</span>{tx(locale, outcome)}</li>)}</ol>
      </section>
    </div>
  </PublicFrame>;
}

export function DiagnosticView({locale}: {locale: PublicLocale}) {
  return <PublicFrame locale={locale} path="/diagnostic">
    <div className="vs-gov">
      <section className="vs-gov-hero">
        <h1>{navLabel(locale, publicNav[3])}</h1>
        <p className="vs-question">{tx(locale, diagnosticIntro)}</p>
      </section>
      <section className="vs-gov-section"><DiagnosticTool locale={locale}/></section>
    </div>
  </PublicFrame>;
}

export function ObservatoryView({locale}: {locale: PublicLocale}) {
  const language = feedLocale(locale);
  const reports = insights.reports.filter(report => {
    const page = report.page?.split('#')[0];
    return Boolean(page) && !isArchived(page as string);
  });
  const papers = research.papers.filter(paper => paperRecordHref(paper) || paper.doi);
  const preprints = insights.research.filter(item => item.preprint || item.doi);
  const news = listNews(language);
  const archive = (path: string) => (locale === 'ko' ? path : hrefFor(locale, path));
  return <PublicFrame locale={locale} path="/observatory">
    <div className="vs-gov">
      <section className="vs-gov-hero"><h1>{navLabel(locale, publicNav[4])}</h1></section>
      <section className="vs-gov-section" id="teardowns">
        <h2>{tx(locale, observatoryCopy.teardowns)}</h2>
        <p className="vs-gov-actions"><Link className="vs-text-link" href={archive('/reports')}>{tx(locale, observatoryCopy.allReports)}</Link></p>
        <div className="vs-feed-list">{reports.map(report => <Link className="vs-feed-card" key={report.page} href={archive(report.page as string)}>
          <span>{report.kind?.[language]}</span>
          <h3>{report.title[language]}</h3>
        </Link>)}
        {papers.map(paper => {
          const href = paperRecordHref(paper);
          return href ? <a className="vs-feed-card" key={paper.id} href={href}><span>{paper.doi ?? ''}</span><h3>{paper.title[language]}</h3></a> : null;
        })}
        {preprints.map(item => <a className="vs-feed-card" key={item.doi ?? item.preprint} href={item.preprint ?? `https://doi.org/${item.doi}`}>
          <span>{item.kind?.[language]}</span>
          <h3>{item.title[language]}</h3>
        </a>)}
        </div>
      </section>
      <section className="vs-gov-section vs-gov-band" id="watch">
        <h2>{tx(locale, observatoryCopy.watch)}</h2>
        <p className="vs-gov-actions"><Link className="vs-text-link" href={archive('/news')}>{tx(locale, observatoryCopy.allNews)}</Link></p>
        <div className="vs-feed-list">{news.map(item => <Link className="vs-feed-card" key={item.slug} href={archive(`/news/${item.slug}`)}>
          <span>{displayTag(item, language)}</span>
          <h3>{displayTitle(item, language)}</h3>
        </Link>)}</div>
      </section>
    </div>
  </PublicFrame>;
}

export function FrameworksView({locale}: {locale: PublicLocale}) {
  const link = (path: string) => hrefFor(locale, path);
  return <PublicFrame locale={locale} path="/frameworks">
    <div className="vs-gov">
      <section className="vs-gov-hero"><h1>{navLabel(locale, publicNav[5])}</h1></section>
      <section className="vs-gov-section">
        <div className="vs-framework-grid">
          {standards.map(standard => <Link className="vs-framework-card" key={standard.code} href={link(`/standards#${standard.code.toLowerCase()}`)}>
            <span className="vs-pillar-index" dir="ltr">{standard.code} ({standard.mark})</span>
            <h2>{tx(locale, standard.name)}</h2>
          </Link>)}
          {pillars.map(pillar => <Link className="vs-framework-card" key={pillar.slug} href={link(pillarPath(pillar))}>
            <span className="vs-pillar-index">{pillar.id}</span>
            <h2>{tx(locale, pillar.title)}</h2>
          </Link>)}
        </div>
      </section>
    </div>
  </PublicFrame>;
}

export function AboutView({locale}: {locale: PublicLocale}) {
  return <PublicFrame locale={locale} path="/about">
    <div className="vs-gov">
      <section className="vs-gov-hero">
        <h1>{navLabel(locale, publicNav[6])}</h1>
        <p className="vs-gov-prose">{tx(locale, direction)}</p>
        <p className="vs-leader" id="founder">{tx(locale, masterclass.leader)}</p>
        <p className="vs-leader">{tx(locale, hq)}</p>
      </section>
    </div>
  </PublicFrame>;
}

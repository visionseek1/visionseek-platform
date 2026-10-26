import Image from 'next/image';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {CitationCopy} from '@/components/research/citation-copy';
import {
  paperApaCitation,
  paperDatasetHref,
  paperDoiHref,
  paperDoiLabel,
  paperRecordHref,
  publishedDoiCount,
  research,
  type ResearchLink,
  type ResearchPaper,
  type TrustItem,
} from '@/lib/research-hub';
import styles from './research.module.css';

type Locale = 'ar' | 'en';
const tx = (locale: Locale) => (v: {en: string; ar: string}) => (locale === 'ar' ? v.ar : v.en);

export function ResearchHub({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const t = tx(locale);
  const {hub, trust, strengths, papersHeading, standards, researcher, papers} = research;
  const doiCount = publishedDoiCount(papers);
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path="/research"/>
      <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>
        <section className={styles.hero} aria-labelledby="research-title">
          <div className={styles.wrap}>
            <p className={styles.brandline}><span lang="en" dir="ltr">{hub.brandline.en}</span></p>
            <div className={styles.heroGrid}>
              <h1 id="research-title">{t(hub.headline)}</h1>
              <p className={styles.lede}>{t(hub.intro)}</p>
            </div>
          </div>
        </section>

        <section className={styles.trust} aria-label={t(trust.label)}>
          <div className={`${styles.wrap} ${styles.trustGrid}`}>
            {trust.items.map(item => (
              <TrustFact key={item.id} item={item} locale={locale} doiCount={doiCount}/>
            ))}
          </div>
        </section>

        <div className={styles.wrap}>
          <section className={styles.block} aria-labelledby="research-strengths">
            <div className={styles.sectionHead}>
              <p className={styles.kicker}><i aria-hidden="true"/>{t(hub.title)}</p>
              <h2 id="research-strengths">{t(strengths.title)}</h2>
            </div>
            <blockquote className={styles.quote}>{t(strengths.quote)}</blockquote>
            <ul className={styles.strengths}>
              {strengths.items.map((item, i) => (
                <li key={item.id} className={styles.strength}>
                  <p className={styles.num}>{String(i + 1).padStart(2, '0')}</p>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.text)}</p>
                  <ItemLink link={item.link} locale={locale}/>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.block} aria-labelledby="research-papers">
            <div className={styles.sectionHead}>
              <p className={styles.kicker}><i aria-hidden="true"/>{t(papersHeading.title)}</p>
              <h2 id="research-papers">{t(papersHeading.title)}</h2>
            </div>
            <div className={styles.catalogue}>
              {papers.map(paper => (
                <PaperCard key={paper.id} paper={paper} locale={locale} preprint={t(papersHeading.preprint)}/>
              ))}
            </div>
          </section>

          <section className={styles.block} aria-labelledby="research-standards">
            <div className={styles.sectionHead}>
              <p className={styles.kicker}><i aria-hidden="true"/>{t(standards.title)}</p>
              <h2 id="research-standards">{t(standards.title)}</h2>
            </div>
            <ul className={styles.standards}>
              {standards.items.map(item => (
                <li key={item.id} className={styles.standard}>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.text)}</p>
                  <ItemLink link={item.link} locale={locale}/>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.researcher} aria-labelledby="research-author">
          <div className={`${styles.wrap} ${styles.researcherGrid}`}>
            <div className={styles.portrait}>
              <Image
                src={researcher.photo}
                alt={t(researcher.photoAlt)}
                width={720}
                height={900}
                sizes="(max-width: 760px) 90vw, 320px"
              />
            </div>
            <div className={styles.researcherCopy}>
              <p className={styles.kicker}><i aria-hidden="true"/>{t(researcher.title)}</p>
              <h2 id="research-author">{t(researcher.name)}</h2>
              <p className={styles.degree}>{t(researcher.degree)}</p>
              <p className={styles.affiliation}>{t(researcher.affiliation)}</p>
              <a className={styles.orcid} href={researcher.orcidUrl} target="_blank" rel="noopener" dir="ltr">
                {t(researcher.orcidLabel)}
              </a>
              <p className={styles.priorLabel}>{t(researcher.priorLabel)}</p>
              <p className={styles.prior}>{t(researcher.prior)}</p>
              <a className={styles.doi} href={researcher.priorHref} target="_blank" rel="noopener" dir="ltr">
                {`DOI: ${researcher.priorDoi}`}
              </a>
            </div>
          </div>
        </section>
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

function TrustFact({item, locale, doiCount}: {item: TrustItem; locale: Locale; doiCount: number}) {
  const t = tx(locale);
  const value = item.kind === 'doiCount' ? String(doiCount) : item.value ? t(item.value) : '';
  const body = (
    <>
      <p className={styles.trustValue} dir="ltr">{value}</p>
      <p className={styles.trustCaption}>{t(item.caption)}</p>
    </>
  );
  if (item.href) {
    return (
      <a className={styles.trustItem} href={item.href} target="_blank" rel="noopener">
        {body}
      </a>
    );
  }
  return <div className={styles.trustItem}>{body}</div>;
}

function ItemLink({link, locale}: {link?: ResearchLink; locale: Locale}) {
  if (!link) return null;
  const t = tx(locale);
  return (
    <a className={styles.inlineLink} href={link.href} target="_blank" rel="noopener" dir="ltr">
      {t(link.label)}
    </a>
  );
}

function PaperCard({paper, locale, preprint}: {paper: ResearchPaper; locale: Locale; preprint: string}) {
  const t = tx(locale);
  const {cta} = research;
  const recordHref = paperRecordHref(paper);
  const doiHref = paperDoiHref(paper.doi);
  const doiLabel = paperDoiLabel(paper.doi);
  const datasetHref = paperDatasetHref(paper);
  const citation = paperApaCitation(paper);
  const other = locale === 'ar' ? 'en' : 'ar';
  return (
    <article id={paper.id} className={styles.card}>
      <div className={styles.cardLead}>
        <p className={styles.badge}>{preprint}</p>
        <p className={styles.topic}><i aria-hidden="true"/>{t(paper.topic)}</p>
      </div>
      <h3>{t(paper.title)}</h3>
      <p className={styles.altTitle} lang={other} dir={other === 'ar' ? 'rtl' : 'ltr'}>{paper.title[other]}</p>
      <p className={styles.summary}>{t(paper.summary)}</p>
      <div className={styles.meta}>
        <p className={styles.author}>{t(paper.author)}</p>
        <div className={styles.links}>
          {doiHref && doiLabel && (
            <a className={styles.doi} href={doiHref} target="_blank" rel="noopener" dir="ltr">{`DOI: ${doiLabel}`}</a>
          )}
          {recordHref
            ? <a className={styles.cta} href={recordHref} target="_blank" rel="noopener">{t(cta.available)}</a>
            : <span className={styles.ctaPending} aria-disabled="true">{t(cta.pending)}</span>}
          {datasetHref && (
            <a className={styles.data} href={datasetHref} target="_blank" rel="noopener">{t(cta.data)}</a>
          )}
        </div>
        <CitationCopy
          citation={citation}
          labels={{idle: t(cta.citation), copied: t(cta.copied), error: t(cta.copyError)}}
        />
      </div>
    </article>
  );
}

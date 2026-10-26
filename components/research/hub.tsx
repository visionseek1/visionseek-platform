import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {paperDoiHref, paperDoiLabel, paperRecordHref, research, type ResearchPaper} from '@/lib/research-hub';
import styles from './research.module.css';

type Locale = 'ar' | 'en';
const tx = (locale: Locale) => (v: {en: string; ar: string}) => (locale === 'ar' ? v.ar : v.en);

export function ResearchHub({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const t = tx(locale);
  const {hub, cta, papers} = research;
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path="/research"/>
      <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>
        <div className={styles.wrap}>
          <div className={styles.inner}>
            <section className={styles.intro} aria-label={t(hub.title)}>
              <div>
                <p className={styles.brandline} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>{hub.brandline.en}</p>
                <h1>{t(hub.title)}</h1>
              </div>
              <div className={styles.ledeBlock}>
                <p className={styles.lede}>{t(hub.intro)}</p>
                <p className={styles.count}>{t(hub.count)}</p>
              </div>
            </section>
            <section className={styles.grid} aria-label={t(hub.count)}>
              {papers.map(paper => <PaperCard key={paper.id} paper={paper} locale={locale} cta={cta}/>)}
            </section>
          </div>
        </div>
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

function PaperCard({paper, locale, cta}: {paper: ResearchPaper; locale: Locale; cta: {available: {en: string; ar: string}; pending: {en: string; ar: string}}}) {
  const t = tx(locale);
  const recordHref = paperRecordHref(paper);
  const doiHref = paperDoiHref(paper.doi);
  const doiLabel = paperDoiLabel(paper.doi);
  const other = locale === 'ar' ? 'en' : 'ar';
  return (
    <article id={paper.id} className={styles.card}>
      <p className={styles.topic}><i aria-hidden="true"/>{t(paper.topic)}</p>
      <h2>{t(paper.title)}</h2>
      <p className={styles.altTitle} lang={other} dir={other === 'ar' ? 'rtl' : 'ltr'}>{paper.title[other]}</p>
      <p className={styles.summary}>{t(paper.summary)}</p>
      <div className={styles.meta}>
        <p className={styles.author}>{t(paper.author)}</p>
        {doiHref && doiLabel && (
          <a className={styles.doi} href={doiHref} target="_blank" rel="noopener" dir="ltr">DOI: {doiLabel}</a>
        )}
        {recordHref
          ? <a className={styles.cta} href={recordHref} target="_blank" rel="noopener">{t(cta.available)}</a>
          : <span className={styles.ctaPending} aria-disabled="true">{t(cta.pending)}</span>}
      </div>
    </article>
  );
}

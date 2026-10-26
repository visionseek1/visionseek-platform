import Link from 'next/link';
import {notFound} from 'next/navigation';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {PrintButton} from './print-button';
import styles from './korea-gate.module.css';
import {bodyBySlug} from '@/lib/korea-gate-documents';
import {
  GATE,
  chrome,
  documentByPath,
  gateHref,
  tx,
  type DocKind,
  type Locale,
} from '@/lib/korea-gate';

const MARK: Record<string, {ar: string; en: string}> = {
  confirmed: {ar: 'مؤكد بمصدر', en: 'Confirmed with a source'},
  inference: {ar: 'استنتاج', en: 'Inference'},
  secondary: {ar: 'مؤكد بمصدر ثانوي', en: 'Confirmed with a secondary source'},
};

export function KoreaGateDocument({locale, kind, slug}: {locale: Locale; kind: DocKind; slug: string}) {
  const card = documentByPath(kind, slug);
  const body = bodyBySlug(kind, slug);
  if (!card || !body) notFound();
  const ar = locale === 'ar';
  const t = tx(locale);

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path={`${GATE}/${kind === 'study' ? 'studies' : 'samples'}/${slug}`}/>
      <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>
        <nav className={styles.bar} aria-label={t(chrome.sections)}>
          <div className={`${styles.wrap} ${styles.barInner}`}>
            <span className={styles.barName}>
              <Link href={gateHref(locale)}>{t(chrome.back)}</Link>
              <span aria-hidden="true"> · </span>
              <span>{t(card.title)}</span>
            </span>
            <PrintButton locale={locale}/>
          </div>
        </nav>

        <header className={styles.docHero}>
          <div className={styles.wrap}>
            {body.badge && <p className={styles.warn}>{t(body.badge)}</p>}
            <h1>{t(body.title)}</h1>
            <p className={styles.lede}>{t(body.lede)}</p>
            <p className={styles.docMeta}>
              <span>{t(body.date)}</span>
              <span>{body.sources} {t(chrome.sourcesCount)}</span>
            </p>
          </div>
        </header>

        <div className={styles.wrap}>
          <div className={styles.docBody}>
            {body.sections.map(section => (
              <section key={section.id} className={styles.docSection} aria-labelledby={section.id}>
                <h2 id={section.id}>{t(section.title)}</h2>
                {section.blocks.map((block, i) => {
                  if (block.kind === 'p') return <p key={i}>{t(block.text)}</p>;
                  if (block.kind === 'quote') return <blockquote key={i} className={styles.quote}>{t(block.text)}</blockquote>;
                  if (block.kind === 'note') return <p key={i} className={styles.note}>{t(block.text)}</p>;
                  if (block.kind === 'list') {
                    return (
                      <ul key={i} className={styles.list}>
                        {block.items.map((item, j) => (
                          <li key={j}>
                            {item.title && <b>{t(item.title)}</b>}
                            <p>{t(item.text)}</p>
                            {item.mark && <p className={styles.metaLine}>{t(MARK[item.mark])}</p>}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <div key={i} className={styles.facts}>
                      {block.rows.map(row => (
                        <div key={row.label.en} className={styles.fact}>
                          <b>{t(row.label)}</b>
                          <div>
                            <p>{t(row.value)}</p>
                            <p className={styles.metaLine}>{t(MARK[row.mark])}</p>
                            {row.source && (
                              <a className={styles.source} href={row.source.href} target="_blank" rel="noopener" dir="ltr">{t(row.source.label)}</a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

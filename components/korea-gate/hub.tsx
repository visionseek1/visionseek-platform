import Image from 'next/image';
import Link from 'next/link';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {KoreaGateRequestForm} from './request-form';
import styles from './korea-gate.module.css';
import {
  GATE,
  LOGO,
  LOGO_SIZE,
  PROGRAM_LINE,
  UPDATED,
  chrome,
  demandHead,
  demandLayers,
  demandSources,
  documents,
  exclusive,
  exclusiveHead,
  founder,
  gateHref,
  hero,
  independence,
  leadHead,
  leadItems,
  limits,
  localePrefix,
  methodHead,
  methodItems,
  promise,
  readHead,
  request,
  services,
  servicesHead,
  servicesIntro,
  studies,
  studiesHead,
  trust,
  tx,
  type Locale,
} from '@/lib/korea-gate';

function SectionHead({id, kicker, title, lede, locale}: {id?: string; kicker: {ar: string; en: string}; title: {ar: string; en: string}; lede?: {ar: string; en: string}; locale: Locale}) {
  const t = tx(locale);
  return (
    <div className={styles.sectionHead}>
      <p className={styles.kicker}><i aria-hidden="true"/>{t(kicker)}</p>
      <div>
        <h2 id={id}>{title[locale]}</h2>
        {lede && <p className={styles.sectionLede}>{t(lede)}</p>}
      </div>
    </div>
  );
}

export function KoreaGateHub({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const t = tx(locale);
  const p = localePrefix(locale);

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path={GATE}/>
      <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>
        <nav className={styles.bar} aria-label={t(chrome.sections)}>
          <div className={`${styles.wrap} ${styles.barInner}`}>
            <span className={styles.barName}><Link href={gateHref(locale)}>{t(chrome.name)}</Link></span>
            <span className={styles.barNav}>
              <a href={`${p}${GATE}#services`}>{t(servicesHead.kicker)}</a>
              <a href={`${p}${GATE}#read`}>{t(readHead.kicker)}</a>
              <a href={`${p}${GATE}#studies`}>{t(studiesHead.kicker)}</a>
              <a href={`${p}${GATE}#request`}>{t(hero.requestCta)}</a>
            </span>
          </div>
        </nav>

        <section id="hero" className={styles.hero} aria-labelledby="kg-title">
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.brand}>
                <Image
                  src={LOGO}
                  alt={t(hero.logoAlt)}
                  width={LOGO_SIZE.width}
                  height={LOGO_SIZE.height}
                  className={styles.logo}
                  priority
                />
                <p className={styles.tagline} lang="en" dir="ltr">{hero.tagline}</p>
              </div>
              <div>
                <p className={styles.brandline} lang="en" dir="ltr">{hero.brand.en}</p>
                <h1 id="kg-title">{t(hero.title)}</h1>
                <p className={styles.lede}>{t(hero.lede)}</p>
                <p className={styles.fromInside}>{t(hero.fromInside)}</p>
                <div className={styles.heroCta}>
                  <a className={styles.ghost} href={`${p}${GATE}#studies`}>{t(hero.readCta)}</a>
                  <a className={styles.cta} href={`${p}${GATE}#request`}>{t(hero.requestCta)}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.wrap}>
          <section id="promise" className={styles.block} aria-labelledby="promise-title">
            <SectionHead id="promise-title" locale={locale} kicker={promise.kicker} title={promise.title}/>
            <blockquote className={styles.quote}>{t(promise.quote)}</blockquote>
          </section>

          <section id="services" className={styles.block} aria-labelledby="services-title">
            <SectionHead id="services-title" locale={locale} kicker={servicesHead.kicker} title={servicesHead.title} lede={servicesIntro}/>
            <ul className={styles.grid3}>
              {services.map((item, i) => (
                <li key={item.id}>
                  <article className={styles.card}>
                    <p className={styles.num}>{String(i + 1).padStart(2, '0')}</p>
                    <span className={`${styles.badge} ${item.tier === 'paid' ? styles.badgePaid : ''}`}>{t(item.tierLabel)}</span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.gets)}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section id="read" className={styles.block} aria-labelledby="read-title">
            <SectionHead id="read-title" locale={locale} kicker={readHead.kicker} title={readHead.title} lede={readHead.lede}/>
            <ul className={styles.grid2}>
              {documents.map(doc => (
                <li key={`${doc.kind}-${doc.slug}`}>
                  <Link className={styles.card} href={`${p}${doc.href}`}>
                    {doc.badge && <span className={styles.warn}>{t(doc.badge)}</span>}
                    {doc.extra && <span className={styles.badge}>{t(doc.extra)}</span>}
                    <h3>{t(doc.title)}</h3>
                    <p>{t(doc.blurb)}</p>
                    <p className={styles.metaLine}>{t(doc.date)} · {doc.sources} {t(chrome.sourcesCount)}</p>
                    <span className={styles.go}>{doc.kind === 'study' ? t(chrome.readStudy) : t(chrome.readSample)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="exclusive" className={styles.block} aria-labelledby="exclusive-title">
            <SectionHead id="exclusive-title" locale={locale} kicker={exclusiveHead.kicker} title={exclusiveHead.title} lede={exclusiveHead.lede}/>
            <div className={styles.exclusive}>
              {exclusive.map(item => (
                <article key={item.id} className={styles.exCard}>
                  <span className={styles.badge}>{t(item.mark)}</span>
                  <p>{t(item.text)}</p>
                  <a className={styles.source} href={item.source.href} target="_blank" rel="noopener" dir="ltr">{t(item.source.label)}</a>
                </article>
              ))}
            </div>
          </section>

          <section id="demand" className={styles.block} aria-labelledby="demand-title">
            <SectionHead id="demand-title" locale={locale} kicker={demandHead.kicker} title={demandHead.title} lede={demandHead.lede}/>
            {demandLayers.map(layer => (
              <div key={layer.id} className={styles.layer}>
                <h3>{t(layer.title)}</h3>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>{ar ? 'البند' : 'Item'}</th>
                        <th>{ar ? 'الدليل' : 'Evidence'}</th>
                        <th>{t(demandHead.offer)}</th>
                        <th>{t(chrome.source)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {layer.rows.map(row => (
                        <tr key={row.item.en}>
                          <td><b>{t(row.item)}</b></td>
                          <td>{t(row.evidence)}</td>
                          <td>{t(row.offer)}</td>
                          <td><a href={row.source.href} target="_blank" rel="noopener" dir="ltr">{t(row.source.label)}</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            <p className={styles.metaLine}>
              {demandSources.map((source, i) => (
                <span key={source.href}>{i > 0 ? ' · ' : ''}<a className={styles.source} href={source.href} target="_blank" rel="noopener" dir="ltr">{t(source.label)}</a></span>
              ))}
            </p>
          </section>

          <section id="lead" className={styles.block} aria-labelledby="lead-title">
            <SectionHead id="lead-title" locale={locale} kicker={leadHead.kicker} title={leadHead.title} lede={leadHead.lede}/>
            <ul className={styles.grid3}>
              {leadItems.map((item, i) => (
                <li key={item.id}>
                  <article className={styles.card}>
                    <p className={styles.num}>{String(i + 1).padStart(2, '0')}</p>
                    <span className={`${styles.mode} ${item.mode === 'buy' ? styles.modeBuy : ''}`}>{t(item.modeLabel)}</span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.evidence)}</p>
                    <p>{t(item.meaning)}</p>
                    <a className={styles.source} href={item.source.href} target="_blank" rel="noopener" dir="ltr">{t(item.source.label)}</a>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section id="studies" className={styles.block} aria-labelledby="studies-title">
            <SectionHead id="studies-title" locale={locale} kicker={studiesHead.kicker} title={studiesHead.title} lede={studiesHead.lede}/>
            <ul className={styles.grid5}>
              {studies.map(doc => (
                <li key={doc.slug}>
                  <Link className={styles.card} href={`${p}${doc.href}`}>
                    <h3>{t(doc.title)}</h3>
                    <p>{t(doc.blurb)}</p>
                    <p className={styles.metaLine}>{t(doc.date)} · {doc.sources} {t(chrome.sourcesCount)}</p>
                    <span className={styles.go}>{t(studiesHead.cta)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="method" className={styles.block} aria-labelledby="method-title">
            <SectionHead id="method-title" locale={locale} kicker={methodHead.kicker} title={methodHead.title}/>
            <ul className={styles.standards}>
              {methodItems.map(item => (
                <li key={item.title.en} className={styles.standard}>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.text)}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="independence" className={styles.block} aria-labelledby="independence-title">
            <SectionHead id="independence-title" locale={locale} kicker={independence.kicker} title={independence.title}/>
            <blockquote className={styles.quote}>{t(independence.quote)}</blockquote>
          </section>

          <section id="limits" className={styles.block} aria-labelledby="limits-title">
            <SectionHead id="limits-title" locale={locale} kicker={limits.kicker} title={limits.title}/>
            <blockquote className={styles.quote}>{t(limits.quote)}</blockquote>
          </section>
        </div>

        <section id="founder" className={styles.founder} aria-labelledby="founder-title">
          <div className={`${styles.wrap} ${styles.founderGrid}`}>
            <div className={styles.portrait}>
              <Image
                src={founder.photo}
                alt={t(founder.photoAlt)}
                width={720}
                height={900}
                sizes="(max-width: 760px) 90vw, 320px"
              />
            </div>
            <div className={styles.founderCopy}>
              <p className={styles.kicker}><i aria-hidden="true"/>{t(founder.kicker)}</p>
              <h2 id="founder-title">{t(founder.name)}</h2>
              <p className={styles.role}>{t(founder.role)}</p>
              <p className={styles.degree}>{t(founder.degree)}</p>
              <p className={styles.base}>{t(founder.base)}</p>
              <p className={styles.priorLabel}>{t(founder.papersLabel)}</p>
              {founder.papers.map(paper => (
                <div key={paper.doi}>
                  <p className={styles.paper}>{t(paper.text)}</p>
                  <a className={styles.doi} href={paper.href} target="_blank" rel="noopener" dir="ltr">{`DOI: ${paper.doi}`}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="request" className={styles.requestBand} aria-labelledby="request-title">
          <div className={`${styles.wrap} ${styles.requestGrid}`}>
            <div className={styles.requestHead}>
              <p className={styles.kicker}><i aria-hidden="true"/>{t(request.kicker)}</p>
              <h2 id="request-title">{t(request.title)}</h2>
              <p className={styles.sectionLede}>{t(request.lede)}</p>
            </div>
            <KoreaGateRequestForm locale={locale}/>
          </div>
        </section>

        <footer id="trust" className={styles.trust}>
          <div className={`${styles.wrap} ${styles.trustInner}`}>
            <span>{t(trust.updated)}: {t(UPDATED)}</span>
            <a href={`${p}${GATE}#method`}>{t(trust.method)}</a>
            <a href={`${p}${GATE}#independence`}>{t(trust.independence)}</a>
            <a href={`${p}${GATE}#limits`}>{t(trust.limits)}</a>
            <Link href={`${p}/privacy`}>{t(trust.privacy)}</Link>
            <span className={styles.program}>{t(PROGRAM_LINE)}</span>
          </div>
        </footer>
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

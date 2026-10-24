import type {ReactNode} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {CoverageMap} from '@/components/indices/coverage-map';
import {
  indexPath,
  indicesContent,
  liveHubProducts,
  notifyMailto,
  sevenTechnologies,
  type HubProduct,
  type IndexEntry,
} from '@/lib/indices';
import styles from './indices.module.css';

type Locale = 'ar' | 'en';

function prefixFor(locale: Locale) {
  return locale === 'ar' ? '/ar' : '';
}

function Shell({locale, path, children}: {locale: Locale; path: string; children: ReactNode}) {
  const ar = locale === 'ar';
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale}/>
      <CapabilityHeader locale={locale} path={path}/>
      <main id="main-content" className={`${styles.page} ${ar ? styles.ar : styles.en}`}>
        {children}
      </main>
      <CapabilityFooter locale={locale}/>
    </div>
  );
}

function Crumb({locale, trail}: {locale: Locale; trail: {href?: string; label: string}[]}) {
  const {hub} = indicesContent;
  const prefix = prefixFor(locale);
  return (
    <nav className={styles.crumb} aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>
      <Link href={prefix || '/'}>{hub.home[locale]}</Link>
      {trail.map((item, i) => (
        <span key={item.label}>
          <span aria-hidden="true"> / </span>
          {item.href
            ? <Link href={`${prefix}${item.href}`}>{item.label}</Link>
            : <span aria-current={i === trail.length - 1 ? 'page' : undefined}>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

function MethodLink({locale, children}: {locale: Locale; children?: ReactNode}) {
  const {hub} = indicesContent;
  return (
    <Link className={styles.methodLink} href={`${prefixFor(locale)}${hub.methodologyHref}`}>
      {children ?? hub.methodologyName[locale]}
      <span aria-hidden="true"> ↗</span>
    </Link>
  );
}

function IndexVisual({locale, item}: {locale: Locale; item: IndexEntry}) {
  if (!item.heroImage) return null;
  const svg = item.heroImage.endsWith('.svg');
  return (
    <div className={styles.visual}>
      <Image
        src={item.heroImage}
        alt={item.heroAlt[locale]}
        width={1280}
        height={720}
        sizes="(max-width: 1220px) calc(100vw - 3rem), 1220px"
        style={{width: '100%', height: 'auto', maxWidth: 1280, maxHeight: 480}}
        unoptimized={svg}
        priority
      />
    </div>
  );
}

function IndexArticle({locale, item}: {locale: Locale; item: IndexEntry}) {
  const {notify} = indicesContent;
  return (
    <article id={item.slug} className={`${styles.article} ${styles.articleSolo}`} aria-labelledby={`${item.slug}-title`}>
      <IndexVisual locale={locale} item={item}/>
      <p className={styles.status}>{item.statusLabel[locale]}</p>
      <h1 id={`${item.slug}-title`}>{item.title[locale]}</h1>
      <p className={styles.subtitle}>{item.subtitle[locale]}</p>
      <p className={styles.lede}>{item.lede[locale]}</p>

      <section className={styles.block} aria-labelledby={`${item.slug}-measures`}>
        <h3 id={`${item.slug}-measures`}>{item.measuresTitle[locale]}</h3>
        <p>{item.measures[locale]}</p>
      </section>

      <section className={styles.block} aria-labelledby={`${item.slug}-pillars`}>
        <h3 id={`${item.slug}-pillars`}>{item.pillarsTitle[locale]}</h3>
        <p>{item.pillarsIntro[locale]}</p>
        <ul className={styles.pillars}>
          {item.pillars.map(pillar => (
            <li key={pillar.id} className={styles.pillar}>
              <p className={styles.pillarName}>{pillar.name[locale]}</p>
            </li>
          ))}
        </ul>
      </section>

      {item.principles.length > 0 && (
        <section className={styles.block} aria-labelledby={`${item.slug}-principles`}>
          <h3 id={`${item.slug}-principles`}>{item.principlesTitle[locale]}</h3>
          <ul className={styles.principles}>
            {item.principles.map(principle => (
              <li key={principle.id} className={styles.principle}>
                <h4>{principle.title[locale]}</h4>
                <p>{principle.text[locale]}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.panels}>
        <section className={styles.panel} aria-labelledby={`${item.slug}-pilot`}>
          <h3 id={`${item.slug}-pilot`}>{item.pilotTitle[locale]}</h3>
          <p>{item.pilot[locale]}</p>
        </section>
        <section className={styles.panel} aria-labelledby={`${item.slug}-audience`}>
          <h3 id={`${item.slug}-audience`}>{item.audienceTitle[locale]}</h3>
          <p>{item.audience[locale]}</p>
        </section>
        <section className={styles.panel} aria-labelledby={`${item.slug}-method`}>
          <h3 id={`${item.slug}-method`}>{item.methodologyTitle[locale]}</h3>
          <p>
            {item.methodology[locale]}{' '}
            <MethodLink locale={locale}/>
          </p>
        </section>
      </div>

      <section className={styles.results} aria-labelledby={`${item.slug}-results`}>
        <h3 id={`${item.slug}-results`}>{item.resultsTitle[locale]}</h3>
        <p>{item.results[locale]}</p>
      </section>

      <div className={styles.notify}>
        <a className={styles.button} href={notifyMailto(locale)}>
          {notify.label[locale]}
          <ArrowRight size={20} aria-hidden="true"/>
        </a>
        <p className={styles.hint}>{notify.hint[locale]}</p>
      </div>
    </article>
  );
}

function Field({label, children}: {label: string; children: ReactNode}) {
  return (
    <div className={styles.field}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function ProductAction({locale, item}: {locale: Locale; item: HubProduct}) {
  const {hub} = indicesContent;
  if (item.cta === 'method') {
    return <a className={styles.more} href="#measure">{hub.ctaMethod[locale]}</a>;
  }
  if (item.cta === 'principles') {
    return <a className={styles.more} href="#principles">{hub.ctaPrinciples[locale]}</a>;
  }
  if (item.cta === 'follow') {
    return <a className={styles.more} href={notifyMailto(locale)}>{hub.ctaFollow[locale]}</a>;
  }
  if (item.slug) {
    return <Link className={styles.more} href={`${prefixFor(locale)}${indexPath(item.slug)}`}>{hub.aboutProduct[locale]}</Link>;
  }
  return null;
}

function HubProductCard({locale, item}: {locale: Locale; item: HubProduct}) {
  const {hub} = indicesContent;
  const href = item.slug ? `${prefixFor(locale)}${indexPath(item.slug)}` : '';
  const heading = item.title[locale] || item.definition[locale];
  return (
    <article
      className={`${styles.product} ${item.named ? '' : styles.productUnnamed}`}
      aria-labelledby={`product-${item.id}`}
    >
      <p className={styles.status}>{item.status[locale]}</p>
      {href
        ? <h3 id={`product-${item.id}`}><Link href={href}>{heading}</Link></h3>
        : <h3 id={`product-${item.id}`}>{heading}</h3>}
      {item.title[locale] ? <p className={styles.cardDef}>{item.definition[locale]}</p> : null}
      <p className={styles.cardQuestion}>
        <span>{hub.questionLabel[locale]}</span>
        {item.question[locale]}
      </p>
      <dl className={styles.fields}>
        <Field label={hub.unitLabel[locale]}>{item.unit[locale]}</Field>
        <Field label={hub.outputLabel[locale]}>{item.output[locale]}</Field>
        <Field label={hub.cadenceLabel[locale]}>{item.cadence[locale]}</Field>
      </dl>
      <ProductAction locale={locale} item={item}/>
    </article>
  );
}

function RelationshipDiagram({locale}: {locale: Locale}) {
  const {hub} = indicesContent;
  return (
    <figure className={styles.diagram} aria-labelledby="indices-diagram">
      <figcaption>
        <h3 id="indices-diagram">{hub.diagramTitle[locale]}</h3>
        <p>{hub.diagramIntro[locale]}</p>
      </figcaption>
      <div className={styles.diagramFlow}>
        <div className={`${styles.diagramNode} ${styles.diagramSource}`}>
          <strong>{hub.diagramSourceName[locale]}</strong>
          <span>{hub.diagramSourceRole[locale]}</span>
        </div>
        <p className={styles.diagramFeeds}>
          <span className={styles.diagramArrow} aria-hidden="true"/>
          {hub.diagramFeeds[locale]}
        </p>
        <div className={styles.diagramTargets}>
          <div className={styles.diagramNode}>
            <strong>{hub.diagramIndexName[locale]}</strong>
            <span>{hub.diagramIndexRole[locale]}</span>
          </div>
          <div className={`${styles.diagramNode} ${styles.diagramUnnamed}`}>
            <span>{hub.diagramListRole[locale]}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

function ScaleRow({
  locale,
  title,
  items,
  coded,
}: {
  locale: Locale;
  title: string;
  items: {id: string; code?: string; name: {en: string; ar: string}; text: {en: string; ar: string}}[];
  coded?: boolean;
}) {
  return (
    <div className={styles.scale}>
      <h3>{title}</h3>
      <ol className={coded ? styles.scaleCodes : styles.ladder}>
        {items.map(item => (
          <li key={item.id}>
            {coded ? <span className={styles.scaleCode}>{item.code}</span> : null}
            <strong>{item.name[locale]}</strong>
            <p>{item.text[locale]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function IndicesHub({locale}: {locale: Locale}) {
  const {hub, notify} = indicesContent;
  const products = liveHubProducts();
  const techs = sevenTechnologies();
  const prefix = prefixFor(locale);
  return (
    <Shell locale={locale} path="/indices">
      <div className={styles.wrap}>
        <Crumb locale={locale} trail={[{label: hub.title[locale]}]}/>

        <header className={styles.hero}>
          <div className={styles.masthead}>
            <span>{hub.eyebrow[locale]}</span>
            <span>VISIONSEEK</span>
          </div>
          <h1>{hub.thesis[locale]}</h1>
          <p className={styles.lede}>{hub.intro[locale]}</p>
          <div className={styles.heroActions}>
            <Link className={styles.button} href={`${prefix}${hub.methodologyHref}`}>
              {hub.readMethodology[locale]}
            </Link>
            <a className={styles.buttonGhost} href={notifyMailto(locale)}>
              {hub.followEdition[locale]}
            </a>
          </div>
          <p className={styles.hint}>{notify.hint[locale]}</p>
        </header>

        <CoverageMap locale={locale}/>

        {products.length === 0 && <p className={styles.empty}>{hub.empty[locale]}</p>}

        {products.length > 0 && (
          <section className={styles.catalog} aria-labelledby="indices-catalog">
            <div className={styles.catalogHead}>
              <h2 id="indices-catalog">{hub.catalogTitle[locale]}</h2>
              <p>{hub.catalogIntro[locale]}</p>
            </div>
            <div className={styles.products}>
              {products.map(item => <HubProductCard key={item.id} locale={locale} item={item}/>)}
            </div>
            <RelationshipDiagram locale={locale}/>
            {techs.length > 0 && (
              <div className={styles.techs}>
                <h3>{hub.technologiesTitle[locale]}</h3>
                <ul className={styles.pillars}>
                  {techs.map(tech => (
                    <li key={tech.id} className={styles.pillar}>
                      <p className={styles.pillarName}>{tech.name[locale]}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        <section id="measure" className={styles.measure} aria-labelledby="indices-measure">
          <h2 id="indices-measure">{hub.measureTitle[locale]}</h2>
          <p className={styles.measureIntro}>{hub.measureIntro[locale]}</p>
          <ScaleRow locale={locale} title={hub.ladderTitle[locale]} items={hub.ladder}/>
          <ScaleRow locale={locale} title={hub.atlasScaleTitle[locale]} items={hub.atlasScale} coded/>
          <ScaleRow locale={locale} title={hub.evidenceScaleTitle[locale]} items={hub.evidenceScale} coded/>
          <div className={styles.measureFacts}>
            <div>
              <h3>{hub.unitTitle[locale]}</h3>
              <p>{hub.unitText[locale]}</p>
            </div>
            <div>
              <h3>{hub.validityTitle[locale]}</h3>
              <p>{hub.validityText[locale]}</p>
            </div>
          </div>
          <p className={styles.measureNote}>{hub.measureAtlasNote[locale]}</p>
          <div className={styles.measureActions}>
            <MethodLink locale={locale}>{hub.downloadLabel[locale]}</MethodLink>
            <div>
              <h3>{hub.citeTitle[locale]}</h3>
              <p className={styles.cite}>{hub.citeHow[locale]}</p>
            </div>
          </div>
        </section>

        <aside className={styles.release} aria-label={hub.releaseEdition[locale]}>
          <p>{hub.releaseMethodology[locale]}</p>
          <p>{hub.releaseEdition[locale]}</p>
        </aside>

        <section id="principles" className={styles.block} aria-labelledby="indices-principles">
          <h2 id="indices-principles">{hub.principlesTitle[locale]}</h2>
          <ul className={styles.principles}>
            {hub.principles.map(principle => (
              <li key={principle.id} className={styles.principle}>
                <h3>{principle.title[locale]}</h3>
                <p>{principle.text[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.press} aria-labelledby="indices-press">
          <h2 id="indices-press">{hub.pressTitle[locale]}</h2>
          <p>{hub.pressIntro[locale]}</p>
          <div className={styles.pressGrid}>
            <div>
              <h3>{hub.downloadLabel[locale]}</h3>
              <p>
                <Link className={styles.methodLink} href={hub.downloadArHref}>{hub.downloadArLabel[locale]}</Link>
                <span aria-hidden="true"> · </span>
                <Link className={styles.methodLink} href={hub.downloadEnHref}>{hub.downloadEnLabel[locale]}</Link>
              </p>
            </div>
            <div>
              <h3>{hub.citeTitle[locale]}</h3>
              <p className={styles.cite}>{hub.citeHow[locale]}</p>
            </div>
            <div>
              <h3>{hub.teamEmailLabel[locale]}</h3>
              <p><a className={styles.methodLink} href={`mailto:${notify.email}`}>{notify.email}</a></p>
            </div>
          </div>
        </section>

        <nav className={styles.related} aria-labelledby="indices-related">
          <h2 id="indices-related">{hub.relatedTitle[locale]}</h2>
          <p>{hub.relatedLine[locale]}</p>
          <ul>
            <li><Link href={`${prefix}${hub.reportsHref}`}>{hub.reportsLabel[locale]}</Link></li>
            <li><Link href={`${prefix}${hub.programsHref}`}>{hub.programsLabel[locale]}</Link></li>
            {products.map(item => (
              <li key={item.id}>
                {item.slug
                  ? <Link href={`${prefix}${indexPath(item.slug)}`}>{item.title[locale] || item.definition[locale]}</Link>
                  : <a href="#indices-catalog">{item.title[locale] || item.definition[locale]}</a>}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Shell>
  );
}

export function IndicesEntry({locale, item}: {locale: Locale; item: IndexEntry}) {
  const {hub} = indicesContent;
  const prefix = prefixFor(locale);
  return (
    <Shell locale={locale} path={indexPath(item.slug)}>
      <div className={styles.wrap}>
        <Crumb locale={locale} trail={[{href: '/indices', label: hub.title[locale]}, {label: item.shortTitle[locale]}]}/>
        <Link className={styles.back} href={`${prefix}/indices`}>
          <ArrowLeft size={18} aria-hidden="true"/>
          {hub.back[locale]}
        </Link>
        <IndexArticle locale={locale} item={item}/>
      </div>
    </Shell>
  );
}

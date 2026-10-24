import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {workshopSection} from '@/lib/institution/workshops';
import {
  fellowship,
  fellowshipPath,
  institute,
  institutePath,
  masterclassPath,
  tx,
  type Locale,
} from '@/lib/institute';

export function InstituteHub({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';
  const masterclassHref = `${prefix}${masterclassPath}`;
  const fellowshipHref = `${prefix}${fellowshipPath}`;

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale} />
      <CapabilityHeader locale={locale} path={institutePath} />
      <main id="main-content">
        <div className="vs-wl vs-wl-catalog vs-institute-hub">
          <header className="vs-wl-catalog-intro">
            <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
              <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <span>{tx(locale, institute.title)}</span>
            </nav>
            <p className="vs-wl-kicker">
              <span>{tx(locale, institute.kicker)}</span>
              <em className="vs-institute-draft">{tx(locale, institute.draft)}</em>
            </p>
            <h1>{tx(locale, institute.title)}</h1>
            <p>{tx(locale, institute.intro)}</p>
          </header>

          <section className="vs-wl-catalog-grid" aria-label={tx(locale, institute.programsLabel)}>
            <article className="vs-wl-offer">
              <Link href={masterclassHref}>
                <Image src={workshopSection.live.heroImage} alt={tx(locale, workshopSection.live.heroImageAlt)} width={1254} height={1254} priority />
              </Link>
              <div>
                <p className="vs-institute-kind">{tx(locale, institute.masterclassKind)}</p>
                <h2><Link href={masterclassHref}>{tx(locale, workshopSection.title)}</Link></h2>
                <p>{tx(locale, workshopSection.intro)}</p>
                <Link className="vs-wl-btn is-lime" href={masterclassHref}>
                  {tx(locale, institute.openProgram)}
                  <ArrowRight size={18} aria-hidden />
                </Link>
              </div>
            </article>
            <article className="vs-wl-offer">
              <Link href={fellowshipHref}>
                <Image src={fellowship.hero} alt={tx(locale, fellowship.heroAlt)} width={1280} height={720} />
              </Link>
              <div>
                <p className="vs-institute-kind">{tx(locale, institute.fellowshipKind)}</p>
                <h2><Link href={fellowshipHref}>{tx(locale, fellowship.title)}</Link></h2>
                <p>{tx(locale, fellowship.subtitle)}</p>
                <p>{tx(locale, fellowship.status)}</p>
                <Link className="vs-wl-btn is-lime" href={fellowshipHref}>
                  {tx(locale, institute.openProgram)}
                  <ArrowRight size={18} aria-hidden />
                </Link>
              </div>
            </article>
          </section>
        </div>
      </main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

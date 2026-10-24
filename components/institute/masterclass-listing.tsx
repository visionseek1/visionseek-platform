import Link from 'next/link';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {InstituteWorkshopCard} from '@/components/institute/workshop-card';
import {
  institute,
  institutePath,
  localePath,
  masterclassListingPath,
  tx,
  type Locale,
} from '@/lib/institute';

export function MasterclassListing({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';

  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale} />
      <CapabilityHeader locale={locale} path={masterclassListingPath} />
      <main id="main-content">
        <div className="vs-wl vs-wl-catalog vs-institute-hub">
          <header className="vs-wl-catalog-intro">
            <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
              <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <Link href={localePath(locale, institutePath)}>{tx(locale, institute.title)}</Link>
              <span>/</span>
              <span>{tx(locale, institute.masterclassTitle)}</span>
            </nav>
            <p className="vs-wl-kicker">
              <span>{tx(locale, institute.kicker)}</span>
              <em className="vs-institute-draft">{tx(locale, institute.draft)}</em>
            </p>
            <h1>{tx(locale, institute.masterclassTitle)}</h1>
            <p>{tx(locale, institute.masterclassIntro)}</p>
          </header>

          <section className="vs-wl-catalog-grid is-single" aria-label={tx(locale, institute.masterclassTitle)}>
            <InstituteWorkshopCard locale={locale} />
          </section>
        </div>
      </main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

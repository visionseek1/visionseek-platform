import type {Metadata} from 'next';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {hrefFor, type PublicLocale} from '@/lib/public-site';

export function pageMeta(locale: PublicLocale, path: string, title: string, description: string): Metadata {
  const canonical = hrefFor(locale, path);
  return {
    title: `${title} | VisionSeek`,
    description,
    alternates: {
      canonical,
      languages: {en: hrefFor('en', path), ar: hrefFor('ar', path), ko: hrefFor('ko', path)},
    },
    openGraph: {title: `${title} | VisionSeek`, description, url: canonical},
  };
}

export function PublicFrame({locale, path, children}: {locale: PublicLocale; path: string; children: React.ReactNode}) {
  const lang = locale === 'ko' ? 'ko' : locale;
  return <div className={`vs-site locale-${locale}`} lang={lang} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    <CapabilityHeader locale={locale} path={path}/>
    <main id="main-content">{children}</main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

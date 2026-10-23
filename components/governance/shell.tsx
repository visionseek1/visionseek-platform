import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from './document-locale';
import type {Locale} from '@/lib/governance';
import styles from './governance.module.css';

export function Shell({locale, path, children}: {locale: Locale; path: string; children: React.ReactNode}) {
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale} />
      <CapabilityHeader locale={locale} path={path} />
      <main id="main-content" className={`${styles.page} ${locale === 'en' ? styles.en : ''}`}>
        {children}
      </main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import {site} from '@/lib/site';
import {hrefFor, hq, navLabel, publicNav, recordHeading, recordLinks, tx, type PublicLocale} from '@/lib/public-site';

const recordHref = (locale: PublicLocale, path: string) => {
  const [base, hash] = path.split('#');
  const prefix = locale === 'ko' ? '' : hrefFor(locale, base || '/');
  const href = locale === 'ko' ? (base || '/') : prefix;
  return hash ? `${href}#${hash}` : href;
};

export default function CapabilityFooter({locale}: {locale: PublicLocale}) {
  const year = '© 2026 VisionSeek';
  return <footer className="vs-footer vs-institution-footer" id="contact">
    <div className="vs-footer-brand">
      <div>
        <div className="vs-footer-logo"><Image src="/visionseek-logo-on-dark.png" alt="VisionSeek" width={880} height={293}/></div>
        <p>{tx(locale, hq)}</p>
      </div>
      <div>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span>{tx(locale, hq)}</span>
      </div>
    </div>
    <div className="vs-footer-map">
      <nav aria-label={tx(locale, {en: 'Primary', ar: 'الرئيسي', ko: '기본'})}>
        <h3>{tx(locale, {en: 'Institution', ar: 'المؤسسة', ko: '기관'})}</h3>
        {publicNav.map(item => <Link key={item.path} href={hrefFor(locale, item.path)}>{navLabel(locale, item)}</Link>)}
      </nav>
      <nav aria-label={tx(locale, recordHeading)}>
        <h3>{tx(locale, recordHeading)}</h3>
        {recordLinks.map(item => <Link key={item.path} href={recordHref(locale, item.path)}>{navLabel(locale, item)}</Link>)}
      </nav>
    </div>
    <div className="vs-footer-bottom">
      <span>{year}</span>
      <nav aria-label={tx(locale, {en: 'Legal', ar: 'روابط قانونية', ko: '법적 고지'})}>
        <Link href={recordHref(locale, '/method')}>{locale === 'ar' ? 'منهجنا' : locale === 'ko' ? '우리의 방법' : 'Our Method'}</Link>
        <Link href={recordHref(locale, '/privacy')}>{tx(locale, {en: 'Privacy', ar: 'الخصوصية', ko: '개인정보'})}</Link>
        <Link href={recordHref(locale, '/terms')}>{tx(locale, {en: 'Terms', ar: 'الشروط', ko: '약관'})}</Link>
        <a href={`mailto:${site.email}`}>{tx(locale, {en: 'Contact', ar: 'تواصل', ko: '연락'})}</a>
      </nav>
    </div>
  </footer>;
}

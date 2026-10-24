import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {DocumentLocale} from '@/components/governance/document-locale';
import {
  fellowship,
  fellowshipPath,
  institute,
  institutePath,
  interestMailto,
  localePath,
  tx,
  type Locale,
} from '@/lib/institute';

export function FellowshipPage({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale} />
      <CapabilityHeader locale={locale} path={fellowshipPath} />
      <main id="main-content">
        <article className="vs-wl vs-wl-catalog vs-fellowship">
          <header className="vs-fellowship-head">
            <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
              <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <Link href={localePath(locale, institutePath)}>{tx(locale, institute.title)}</Link>
              <span>/</span>
              <span>{tx(locale, fellowship.title)}</span>
            </nav>
            <p className="vs-wl-kicker">
              <span>{tx(locale, institute.kicker)}</span>
              <em className="vs-institute-draft">{tx(locale, institute.draft)}</em>
            </p>
            <h1>{tx(locale, fellowship.title)}</h1>
            <p className="vs-fellowship-sub">{tx(locale, fellowship.subtitle)}</p>
            <figure className="vs-fellowship-hero">
              <Image
                src={fellowship.hero}
                alt={tx(locale, fellowship.heroAlt)}
                width={1280}
                height={720}
                priority
                sizes="(max-width: 900px) 100vw, 1120px"
              />
            </figure>
          </header>

          <div className="vs-fellowship-body">
            <p className="vs-fellowship-lede">{tx(locale, fellowship.opening)}</p>

            <section aria-labelledby="fellowship-what">
              <h2 id="fellowship-what">{tx(locale, fellowship.whatLabel)}</h2>
              <p>{tx(locale, fellowship.what)}</p>
            </section>

            <section aria-labelledby="fellowship-principles">
              <h2 id="fellowship-principles">{tx(locale, fellowship.principlesLabel)}</h2>
              <ul className="vs-fellowship-principles">
                {fellowship.principles.map(item => (
                  <li key={item.title.en}>
                    <strong>{tx(locale, item.title)}</strong>
                    <p>{tx(locale, item.body)}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="fellowship-journey">
              <h2 id="fellowship-journey">{tx(locale, fellowship.journeyLabel)}</h2>
              <ol className="vs-fellowship-journey">
                {fellowship.journey.map((item, index) => (
                  <li key={item.title.en}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{tx(locale, item.title)}</h3>
                      <p>{tx(locale, item.body)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="fellowship-who">
              <h2 id="fellowship-who">{tx(locale, fellowship.whoLabel)}</h2>
              <p>{tx(locale, fellowship.who)}</p>
            </section>

            <section aria-labelledby="fellowship-leaves">
              <h2 id="fellowship-leaves">{tx(locale, fellowship.leavesLabel)}</h2>
              <p>{tx(locale, fellowship.leaves)}</p>
            </section>

            <section aria-labelledby="fellowship-status">
              <h2 id="fellowship-status">{tx(locale, fellowship.statusLabel)}</h2>
              <p>{tx(locale, fellowship.status)}</p>
            </section>

            <section className="vs-fellowship-cta" aria-labelledby="fellowship-interest">
              <h2 id="fellowship-interest">{tx(locale, fellowship.interest.label)}</h2>
              <p>{tx(locale, fellowship.interest.toName)}</p>
              <a className="vs-wl-btn is-lime" href={interestMailto(locale)}>
                {tx(locale, fellowship.interest.label)}
                <ArrowRight size={18} aria-hidden />
              </a>
            </section>
          </div>
        </article>
      </main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

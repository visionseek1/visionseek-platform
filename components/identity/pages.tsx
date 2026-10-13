import Image from 'next/image';
import Link from 'next/link';
import type {ReactNode} from 'react';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {identity, t, type Bi, type Locale} from '@/lib/identity';
import {about} from '@/lib/about';
import {ClosingBand, InitiativeBand, OffersGrid, PiecesGrid, VisionValues} from './blocks';
import InitiativeForm from './initiative-form';

function Shell({locale, path, head, children, closing = true}: {locale: Locale; path: string; head: {label: Bi; title: Bi; intro: Bi}; children: ReactNode; closing?: boolean}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(locale);
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
    <CapabilityHeader locale={locale} path={path}/>
    <main id="main-content">
      <section className="vs-interior-hero"><nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={p || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link><span>/</span><span>{tx(head.label)}</span></nav><p className="vs-eyebrow">{tx(head.label)}</p><h1>{tx(head.title)}</h1><p className="vs-interior-intro">{tx(head.intro)}</p></section>
      {children}
      {closing && <ClosingBand locale={locale}/>}
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

/** /services — the five doors, each with its detail and its link. */
export function ServicesPage({locale}: {locale: Locale}) {
  return <Shell locale={locale} path="/services" head={identity.services}><OffersGrid locale={locale} detailed/></Shell>;
}

/** /method — the six pieces with output, owner and review, and the three common arrangements. */
export function MethodPage({locale}: {locale: Locale}) {
  const tx = t(locale); const {methodPage, method} = identity;
  return <Shell locale={locale} path="/method" head={methodPage}>
    <section className="vs-section vs-method-intro"><p>{tx(method.text)}</p></section>
    <PiecesGrid locale={locale} detailed/>
    <section className="vs-section vs-flex" aria-labelledby="flex-title"><h2 id="flex-title">{tx(methodPage.flexTitle)}</h2><div className="vs-flex-grid">{methodPage.flex.map(f => <article key={f.name.en}><h3>{tx(f.name)}</h3><p>{tx(f.text)}</p></article>)}</div></section>
  </Shell>;
}

/** /about — the identity, where we stand, the vision, the values, the founder. */
export function AboutPage({locale}: {locale: Locale}) {
  const tx = t(locale); const {about: head} = identity; const {founder} = about;
  return <Shell locale={locale} path="/about" head={head}>
    <section className="vs-section vs-place" aria-labelledby="place-title"><p className="vs-eyebrow">{tx(head.placeEyebrow)}</p><h2 id="place-title" className="sr-only">{tx(head.placeEyebrow)}</h2><div className="vs-place-grid">{head.place.map((x, i) => <article key={x.name.en} className={i === 1 ? 'is-visionseek' : ''}><h3>{tx(x.name)}</h3><p>{tx(x.text)}</p></article>)}</div></section>
    <VisionValues locale={locale}/>
    <section className="vs-section vs-founder" id="founder"><div className="vs-founder-image"><Image src={founder.image} alt={tx(founder.imageAlt)} fill sizes="(max-width:760px) 100vw, 40vw"/></div><div><p className="vs-eyebrow">{tx(founder.eyebrow)}</p><h2>{tx(founder.name)}</h2><p className="vs-founder-bio">{tx(founder.bio)}</p><p>{tx(founder.lens)}</p><p>{tx(identity.leader.text)}</p><figure className="vs-founder-quote"><blockquote><p>«{tx(founder.text)}»</p><p className="vs-founder-quote-line">{tx(founder.quote)}</p></blockquote><figcaption>— {tx(founder.name)}</figcaption></figure></div></section>
  </Shell>;
}

/** /initiative — the free introductory session: who it is for, and the request. */
export function InitiativePage({locale}: {locale: Locale}) {
  const tx = t(locale); const {initiative} = identity;
  return <Shell locale={locale} path="/initiative" head={{label: initiative.eyebrow, title: initiative.page.title, intro: initiative.page.intro}} closing={false}>
    <InitiativeBand locale={locale} full/>
    <InitiativeForm locale={locale}/>
    <section className="vs-section vs-next-steps" aria-labelledby="next-title"><h2 id="next-title">{tx(initiative.page.nextTitle)}</h2><ol>{initiative.page.next.map((s, i) => <li key={s.en}><span className="vs-eyebrow">{String(i + 1).padStart(2, '0')}</span><p>{tx(s)}</p></li>)}</ol></section>
  </Shell>;
}

/** /offer — the service offer. Its body is filled from the written offer; empty sections are not rendered. */
export function OfferPage({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(locale); const {offer} = identity;
  const sections = offer.sections.filter(s => tx(s.body).trim());
  return <Shell locale={locale} path="/offer" head={offer}>
    {sections.length === 0 && <section className="vs-section vs-offer-empty"><p>{ar ? 'عرض الخدمة يُنشر بعد اعتماده.' : 'The service offer is published once it is approved.'}</p></section>}
    {sections.map(s => <section className="vs-section vs-offer-section" id={s.id} key={s.id}><h2>{tx(s.title)}</h2>{tx(s.body).split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)}</section>)}
    <section className="vs-section vs-offer-note"><p>{tx(offer.pricingNote)}</p><Link className="vs-button" href={`${p}/initiative`}>{tx(identity.closing.button)}<ArrowRight size={20}/></Link></section>
  </Shell>;
}

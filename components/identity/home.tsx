import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {identity, t, type Locale} from '@/lib/identity';
import {isBlockHidden} from '@/lib/visibility';
import {ClosingBand, InitiativeBand, LeaderBand, OffersGrid, PiecesGrid, VisionValues} from './blocks';

/** The home page on the identity adopted on 13 October 2026. One hero, no carousel; every section is a block that /admin can hide. */
export default function IdentityHome({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(locale); const {hero} = identity;
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
    <CapabilityHeader locale={locale} overlay/>
    <main id="main-content">
      <section className="vs-hero vs-identity-hero" aria-label={tx(identity.name)}>
        <Image src={hero.image} alt="" fill sizes="100vw" priority/><div className="vs-hero-shade"/>
        <div className="vs-hero-copy">
          <p className="vs-eyebrow">{tx(hero.label)}</p>
          <h1>{tx(hero.title)}</h1>
          <p className="vs-hero-description">{tx(hero.text)}</p>
          <div className="vs-hero-actions"><Link className="vs-button" href={`${p}/initiative`}>{tx(hero.button)}<ArrowRight size={20}/></Link><Link className="vs-text-link" href={`${p}/method`}>{tx(hero.secondary)}<ArrowRight size={18}/></Link></div>
        </div>
      </section>
      {!isBlockHidden('home.initiative') && <InitiativeBand locale={locale}/>}
      {!isBlockHidden('home.offers') && <OffersGrid locale={locale}/>}
      {!isBlockHidden('home.method') && <PiecesGrid locale={locale}/>}
      {!isBlockHidden('home.vision') && <VisionValues locale={locale}/>}
      {!isBlockHidden('home.leader') && <LeaderBand locale={locale}/>}
      {!isBlockHidden('home.contact') && <ClosingBand locale={locale}/>}
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

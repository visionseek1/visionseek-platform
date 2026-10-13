import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {identity, t, type Locale} from '@/lib/identity';

/** The blocks shared by the home page and the section pages. Copy comes from content/identity.json only. */

export function InitiativeBand({locale, full = false}: {locale: Locale; full?: boolean}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(locale); const {initiative} = identity;
  return <section className="vs-section vs-initiative" id="initiative" aria-labelledby="initiative-title">
    <div className="vs-initiative-copy">
      <p className="vs-eyebrow">{tx(initiative.eyebrow)}</p>
      <h2 id="initiative-title">{tx(initiative.title)}</h2>
      <p>{tx(initiative.text)}</p>
      {!full && <Link className="vs-button" href={`${p}/initiative`}>{tx(initiative.button)}<ArrowRight size={20}/></Link>}
    </div>
    <aside className="vs-initiative-who" aria-label={tx(initiative.whoTitle)}>
      <p className="vs-eyebrow">{tx(initiative.whoTitle)}</p>
      <ul>{initiative.who.map(w => <li key={w.en}>{tx(w)}</li>)}</ul>
    </aside>
  </section>;
}

export function OffersGrid({locale, detailed = false}: {locale: Locale; detailed?: boolean}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(locale); const {offers} = identity;
  return <section className="vs-section vs-offers" id="offers" aria-labelledby="offers-title">
    {!detailed && <div className="vs-section-heading"><div><p className="vs-eyebrow">{tx(offers.eyebrow)}</p><h2 id="offers-title">{tx(offers.title)}</h2></div><Link className="vs-text-link" href={`${p}/services`}>{tx(offers.link)}<ArrowRight size={20}/></Link></div>}
    <div className={`vs-offer-grid ${detailed ? 'is-detailed' : ''}`}>
      {offers.items.map((o, i) => <article className="vs-offer-card" id={o.id} key={o.id}>
        <span className="vs-step-number">{String(i + 1).padStart(2, '0')}</span>
        <h3>{tx(o.name)}</h3>
        <p>{tx(o.text)}</p>
        {detailed && <p className="vs-offer-detail">{tx(o.detail)}</p>}
        {detailed && <Link className="vs-text-link" href={`${p}${o.href}`}>{tx(o.linkLabel)}<ArrowRight size={18}/></Link>}
      </article>)}
    </div>
  </section>;
}

export function PiecesGrid({locale, detailed = false}: {locale: Locale; detailed?: boolean}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(locale); const {method} = identity;
  return <section className="vs-section vs-pieces" id="method" aria-labelledby="pieces-title">
    {!detailed && <div className="vs-section-heading"><div><p className="vs-eyebrow">{tx(method.eyebrow)}</p><h2 id="pieces-title">{tx(method.title)}</h2></div><div><p>{tx(method.text)}</p><Link className="vs-text-link" href={`${p}/method`}>{tx(method.link)}<ArrowRight size={20}/></Link></div></div>}
    <div className="vs-piece-grid">
      {method.pieces.map((piece, i) => <article className="vs-piece-card" id={piece.id} key={piece.id}>
        <span className="vs-step-number">{String(i + 1).padStart(2, '0')}</span>
        <h3>{tx(piece.name)}</h3>
        <p>{tx(piece.text)}</p>
        <dl>
          <div><dt>{tx(method.outputLabel)}</dt><dd>{tx(piece.output)}</dd></div>
          {detailed && <div><dt>{tx(method.ownerLabel)}</dt><dd>{tx(piece.owner)}</dd></div>}
          {detailed && <div><dt>{tx(method.reviewLabel)}</dt><dd>{tx(piece.review)}</dd></div>}
        </dl>
      </article>)}
    </div>
  </section>;
}

export function VisionValues({locale}: {locale: Locale}) {
  const tx = t(locale); const {vision, values} = identity;
  return <section className="vs-section vs-vision-values" id="vision" aria-labelledby="vision-title">
    <div>
      <p className="vs-eyebrow">{tx(vision.eyebrow)}</p>
      <h2 id="vision-title">{tx(vision.title)}</h2>
      <ul className="vs-tech-list" aria-label={locale === 'ar' ? 'التقنيات الأساسية لهذا العصر' : 'The foundational technologies of this age'}>{vision.technologies.map(x => <li key={x.en}>{tx(x)}</li>)}</ul>
    </div>
    <div>
      <p className="vs-eyebrow">{tx(values.eyebrow)}</p>
      <div className="vs-values">{values.items.map(v => <article key={v.name.en}><h3>{tx(v.name)}</h3><p>{tx(v.text)}</p></article>)}</div>
    </div>
  </section>;
}

export function LeaderBand({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(locale); const {leader} = identity;
  return <section className="vs-section vs-leader" id="leader" aria-labelledby="leader-title">
    <div>
      <p className="vs-eyebrow">{tx(leader.eyebrow)}</p>
      <h2 id="leader-title">{tx(leader.title)}</h2>
      <p>{tx(leader.text)}</p>
      <Link className="vs-text-link" href={`${p}/about#founder`}>{tx(leader.link)}<ArrowRight size={20}/></Link>
    </div>
    <div className="vs-leader-image"><Image src={leader.image} alt={tx(leader.imageAlt)} fill sizes="(max-width:760px) 100vw, 34vw"/></div>
  </section>;
}

export function ClosingBand({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(locale); const {closing} = identity;
  return <section className="vs-section vs-closing" id="contact" aria-labelledby="closing-title">
    <h2 id="closing-title">{tx(closing.title)}</h2>
    <Link className="vs-button" href={`${p}/initiative`}>{tx(closing.button)}<ArrowRight size={20}/></Link>
  </section>;
}

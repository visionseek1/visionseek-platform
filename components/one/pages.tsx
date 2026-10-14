import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight, ArrowLeft} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {oneMessage, type Bi} from '@/lib/one-message';
import {BookButton} from './book-button';
import {insights, latestNotes} from '@/lib/insights';
import {sectors as fieldSectors} from '@/lib/projects';
import {isArchived, isBlockHidden} from '@/lib/visibility';
import {emails} from '@/lib/site';
import styles from './one.module.css';

type Locale = 'ar' | 'en';
const t = (ar: boolean) => (v: Bi) => (ar ? v.ar : v.en);


/** The closing band at the end of every page: one line, one button. */
export function ClosingCta({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  return <section className={`${styles.section} ${styles.close}`} aria-label={ar ? 'احجز جلستك' : 'Book your session'}>
    <p className={styles.belief}>{t(ar)(oneMessage.home.belief)}</p>
    <p className={styles.closeLine}>{t(ar)(oneMessage.cta.line)}</p>
    <BookButton locale={locale}/>
  </section>;
}

function Shell({locale, path, overlay, children}: {locale: Locale; path?: string; overlay?: boolean; children: React.ReactNode}) {
  const ar = locale === 'ar';
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}><CapabilityHeader locale={locale} path={path} overlay={overlay}/><main id="main-content">{children}</main><CapabilityFooter locale={locale}/></div>;
}

function SectorCards({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(ar);
  const Arrow = ar ? ArrowLeft : ArrowRight;
  return <div className={styles.sectorGrid}>{oneMessage.sectors.map((s, i) => <Link key={s.id} href={`${p}/what-we-offer#${s.id}`} className={styles.sectorCard}><span>0{i + 1}</span><h3>{tx(s.title)}</h3><p>{tx(s.text)}</p><Arrow size={20}/></Link>)}</div>;
}

function LatestInsights({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(ar);
  const notes = latestNotes().slice(0, 3);
  const frameworks = insights.frameworks.slice(0, 3 - notes.length);
  const Arrow = ar ? ArrowLeft : ArrowRight;
  return <section className={`${styles.section} ${styles.insights}`} aria-label={tx(oneMessage.home.insightsHeading)}>
    <div className={styles.insightsHead}><h2>{tx(oneMessage.home.insightsHeading)}</h2><Link className="vs-text-link" href={`${p}/insights`}>{tx(oneMessage.home.insightsLink)}<Arrow size={18}/></Link></div>
    <div className={styles.insightsGrid}>
      {notes.map(n => <Link key={n.slug} href={`${p}/insights/notes/${n.slug}`} className={styles.noteCard}><div className={styles.noteMeta}><span>{ar ? 'ملاحظة' : 'Note'}</span><span dir="ltr">{n.number}</span><i>{tx(n.status)}</i></div><h3>{tx(n.title)}</h3><p>{tx(n.teaser)}</p><b>{tx(insights.hub.readNote)} {ar ? '←' : '→'}</b></Link>)}
      {frameworks.map(f => <Link key={f.slug} href={`${p}/insights/frameworks/${f.slug}`} className={styles.noteCard}><div className={styles.noteMeta}><span>{tx(f.order)}</span><i>{tx(f.status).replace(/[.。]$/, '')}</i></div><h3>{tx(f.title)}</h3><p>{tx(f.text)}</p></Link>)}
    </div>
  </section>;
}

/** The home page in five layers: hero · the question · the five sectors · latest Insights · the booking band. */
export function OneHome({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(ar);
  const {hero, problem, sectorsHeading} = oneMessage.home;
  const Arrow = ar ? ArrowLeft : ArrowRight;
  return <Shell locale={locale} overlay>
    <section className={styles.hero}>
      <Image src={hero.image} alt="" fill priority sizes="100vw"/>
      <div className={styles.heroShade}/>
      <div className={styles.heroCopy}>
        <p className={styles.heroLine} lang={ar ? 'ar' : 'en'} dir={ar ? 'rtl' : 'ltr'}>{tx(hero.line)}</p>
        <h1>{tx(hero.title)}</h1>
        <div className={styles.heroActions}><BookButton locale={locale}/><Link className="vs-text-link" href={`${p}/what-we-offer`}>{tx(oneMessage.offer.title)}<Arrow size={18}/></Link></div>
      </div>
    </section>
    {!isBlockHidden('home.problem') && <section className={`${styles.section} ${styles.problem}`} aria-label={tx(problem.eyebrow)}>
      <p className="vs-eyebrow">{tx(problem.eyebrow)}</p>
      <p className={styles.problemText}>{tx(problem.text)}</p>
    </section>}
    {!isBlockHidden('home.sectors') && <section className={styles.section} aria-label={tx(sectorsHeading)}>
      <div className={styles.sectorsHead}><h2>{tx(sectorsHeading)}</h2><Link className="vs-text-link" href={`${p}/what-we-offer`}>{ar ? 'الصفحة كاملة' : 'The full page'}<Arrow size={18}/></Link></div>
      <SectorCards locale={locale}/>
    </section>}
    {!isBlockHidden('home.insights') && <LatestInsights locale={locale}/>}
    {!isBlockHidden('home.close') && <ClosingCta locale={locale}/>}
  </Shell>;
}

/** «ماذا نقدم»: the five sectors in detail, the fields under partnerships, and the rest of the site. */
export function OfferPage({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(ar);
  const Arrow = ar ? ArrowLeft : ArrowRight;
  const fields = fieldSectors.filter(s => !isArchived(`/projects/${s.slug}`));
  return <Shell locale={locale} path="/what-we-offer">
    <section className={styles.interior}>
      <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={p || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link><span>/</span><span>{tx(oneMessage.offer.title)}</span></nav>
      <p className="vs-eyebrow">{tx(oneMessage.identity)}</p>
      <h1>{tx(oneMessage.offer.title)}</h1>
      <p className={styles.lead}>{tx(oneMessage.offer.intro)}</p>
    </section>
    <div className={`${styles.section} ${styles.offerList}`}>
      {oneMessage.sectors.map((s, i) => <section key={s.id} id={s.id} className={styles.offerRow}>
        <div><p className="vs-eyebrow">0{i + 1}</p><h2>{tx(s.title)}</h2></div>
        <div>
          <p>{tx(s.detail)}</p>
          {s.id === 'partnerships' && s.fieldsHeading && <><p className={styles.fieldsHeading}>{tx(s.fieldsHeading)}</p><div className={styles.fieldsGrid}>{fields.map(f => <Link key={f.slug} href={`${p}/projects/${f.slug}`}>{tx(f.title)}<Arrow size={16}/></Link>)}</div></>}
          {s.id === 'knowledge' && <div className={styles.fieldsGrid}><Link href={`${p}/insights`}>VisionSeek Insights<Arrow size={16}/></Link><Link href={`${p}/masterclass`}>{ar ? 'ماستركلاس' : 'Masterclass'}<Arrow size={16}/></Link></div>}
          {s.id === 'services' && <div className={styles.fieldsGrid}><Link href={`${p}/method`}>{ar ? 'منهجنا' : 'Our method'}<Arrow size={16}/></Link></div>}
          {s.id === 'partnerships' && <div className={styles.fieldsGrid} style={{marginTop: '.6rem'}}><a href={`mailto:${emails.partners}`}>{emails.partners}<Arrow size={16}/></a></div>}
        </div>
      </section>)}
    </div>
    <section className={styles.section} aria-label={tx(oneMessage.offer.moreHeading)}>
      <p className="vs-eyebrow" style={{marginBottom: '1.2rem'}}>{tx(oneMessage.offer.moreHeading)}</p>
      <div className={styles.moreGrid}>{oneMessage.offer.more.filter(m => !isArchived(m.href)).map(m => <Link key={m.href} href={`${p}${m.href}`}><h3>{tx(m.title)}</h3><p>{tx(m.text)}</p></Link>)}</div>
    </section>
    <ClosingCta locale={locale}/>
  </Shell>;
}

/** The initiative: one offer, one button. No prices anywhere. */
export function InitiativePage({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : ''; const tx = t(ar);
  const it = oneMessage.initiative;
  const live = /^https:\/\/(app\.)?cal\.com\//.test(oneMessage.booking.url);
  return <Shell locale={locale} path="/initiative">
    <section className={styles.interior}>
      <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}><Link href={p || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link><span>/</span><span>{ar ? 'المبادرة' : 'The initiative'}</span></nav>
      <p className="vs-eyebrow">{tx(it.eyebrow)}</p>
      <h1>{tx(it.title)}</h1>
    </section>
    <section className={styles.section} id="book" aria-label={tx(it.offer)}>
      <div className={styles.offerCard}>
        <div>
          <h2>{tx(it.offer)}</h2>
          <div className={styles.facts} style={{marginTop: '1.2rem'}}><span><i aria-hidden="true"/>{tx(it.period)}</span><span><i aria-hidden="true"/>{tx(it.limited)}</span></div>
          <p className={styles.offerIntro}>{tx(it.intro)}</p>
        </div>
        <div className={styles.bookBox}>
          {live ? <a className={styles.bookBtn} href={oneMessage.booking.url} target="_blank" rel="noreferrer">{tx(oneMessage.cta.label)}</a>
            : <><span className={styles.bookBtn} aria-disabled="true" style={{opacity: .55, cursor: 'default'}}>{tx(oneMessage.cta.label)}</span><p className={styles.pending}>{tx(oneMessage.booking.pending).split(emails.general).map((part, i, all) => <span key={i}>{part}{i < all.length - 1 && <a href={`mailto:${emails.general}`} dir="ltr">{emails.general}</a>}</span>)}</p></>}
        </div>
      </div>
    </section>
    <section className={`${styles.section} ${styles.twoCol}`}>
      <div><h2>{tx(it.outcomesHeading)}</h2><ol>{it.outcomes.map(o => <li key={o.en}>{tx(o)}</li>)}</ol></div>
      <div><h2>{tx(it.forHeading)}</h2><p>{tx(it.for)}</p><p className={styles.fine} style={{marginTop: '1.2rem'}}>{tx(it.note)}</p></div>
    </section>
    <ClosingCta locale={locale}/>
  </Shell>;
}

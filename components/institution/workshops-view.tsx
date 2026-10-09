import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight, ArrowUpRight, Play} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {
  getWorkshop,
  workshopSection,
  workshops,
  type Locale,
  type WorkshopKind,
} from '@/lib/institution/workshops';

function Frame({locale, path, children}: {locale: Locale; path: string; children: React.ReactNode}) {
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <CapabilityHeader locale={locale} path={path} />
      <main id="main-content">{children}</main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

const text = (locale: Locale, value: {en: string; ar: string}) => value[locale];

export function WorkshopsIndex({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';
  const section = workshopSection;
  const live = section.live;
  const individual = workshops.find(item => item.kind === 'individual');
  const general = workshops.find(item => item.kind === 'institution' && !item.institution);
  const kinds: WorkshopKind[] = ['individual', 'institution'];
  const institutionWorkshops = workshops.filter(item => item.kind === 'institution' && item.institution);
  const doorHref = (kind: WorkshopKind) => {
    const page = kind === 'individual' ? individual : general;
    return page ? `${prefix}/masterclass/${page.slug}` : '#institutions';
  };

  return (
    <Frame locale={locale} path="/masterclass">
      <div className="vs-wl">
        <section className="vs-wl-hero">
          <div className="vs-wl-hero-text">
            <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
              <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <span>{text(locale, section.title)}</span>
            </nav>
            <p className="vs-wl-lockup" dir="ltr">
              <Image src="/visionseek-symbol-color.png" alt="" width={36} height={36} />
              <span><small>VISIONSEEK</small><b>MASTERCLASS</b></span>
            </p>
            <h1 className="vs-wl-instructor">{text(locale, live.instructor)}</h1>
            <p className="vs-wl-teaches">{text(locale, live.teaches)}</p>
            <p className="vs-wl-status"><span className="vs-wl-dot" />{text(locale, section.status)}</p>
            <div className="vs-wl-actions">
              <Link className="vs-wl-btn is-lime" href={`${prefix}/start?${new URLSearchParams({from: 'workshops', idea: text(locale, live.ctaPrimary)})}`}>{text(locale, live.ctaPrimary)}<ArrowRight size={18} aria-hidden /></Link>
            </div>
          </div>
          <div className="vs-wl-hero-image">
            {live.trailer.video ? (
              <video className="vs-wl-trailer" src={live.trailer.video} poster={live.heroImage} controls playsInline preload="none" aria-label={text(locale, live.trailer.label)} />
            ) : (
              <>
                <Image src={live.heroImage} alt={text(locale, live.heroImageAlt)} width={1254} height={1254} priority sizes="(max-width: 860px) 100vw, 50vw" />
                <p className="vs-wl-trailer-soon">
                  <span className="vs-wl-play" aria-hidden><Play size={20} /></span>
                  <span><b>{text(locale, live.trailer.label)}</b><small>{text(locale, live.trailer.pending)}</small></span>
                </p>
              </>
            )}
            <span>{live.heroImageLabel}</span>
          </div>
        </section>

        <section className="vs-wl-why">
          <blockquote className="vs-wl-quote">{text(locale, live.heroQuote)}</blockquote>
          <div className="vs-wl-opening">
            {live.opening.map(paragraph => <p key={paragraph.en}>{text(locale, paragraph)}</p>)}
          </div>
        </section>

        <section className="vs-wl-doors" id="doors">
          <div className="vs-wl-head">
            <h2>{text(locale, live.doorsLabel)}</h2>
            <p className="vs-wl-doors-line">{text(locale, live.doorsLine)}</p>
          </div>
          <div className="vs-wl-door-grid is-two">
            {kinds.map(kind => {
              const card = live.doorCards[kind];
              const door = section.doors[kind];
              return (
                <article className={`vs-wl-door door-${kind}`} key={kind}>
                  <Image src={card.image} alt="" width={1200} height={1200} sizes="(max-width: 860px) 100vw, 50vw" />
                  <div className="vs-wl-door-body">
                    <span className="vs-wl-code">{card.code}</span>
                    <span className="vs-wl-door-teacher">{text(locale, live.cardTeacher)}</span>
                    <h3><Link href={doorHref(kind)}>{text(locale, door.name)}</Link></h3>
                    <figure className="vs-wl-door-quote">
                      <blockquote>{text(locale, door.quote)}</blockquote>
                      <figcaption>
                        <a href={door.quoteSource.url} target="_blank" rel="noreferrer">{text(locale, door.quoteBy)}<ArrowUpRight size={14} aria-hidden /></a>
                      </figcaption>
                    </figure>
                    <p className="vs-wl-door-consequence">{text(locale, door.consequence)}</p>
                    <p className="vs-wl-door-for">{text(locale, door.for)}</p>
                    <p className="vs-wl-door-text">{text(locale, door.body)}</p>
                    {kind === 'institution' && (
                      <div className="vs-wl-door-leaves" id="institutions">
                        <b>{text(locale, live.institutionPick)}</b>
                        <ul className="vs-wl-door-chips">{institutionWorkshops.map(item => <li key={item.slug}><Link href={`${prefix}/masterclass/${item.slug}`}>{section.institutionTypes.find(type => type.id === item.institution)?.label[locale]}</Link></li>)}</ul>
                      </div>
                    )}
                    <span className="vs-wl-door-meta">{text(locale, door.meta)}</span>
                    <Link className="vs-wl-door-open" href={doorHref(kind)}>{text(locale, live.openDoor)}<ArrowRight size={16} aria-hidden /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="vs-wl-how" id="how">
          <div className="vs-wl-head">
            <div>
              <p className="vs-wl-code">{text(locale, live.howLabel)}</p>
              <h2>{text(locale, live.howTitle)}</h2>
            </div>
          </div>
          <ol className="vs-wl-how-steps">
            {live.howSteps.map((step, index) => (
              <li key={step.title.en}>
                <span className="vs-wl-step-n">{String(index + 1).padStart(2, '0')}</span>
                <strong>{text(locale, step.title)}</strong>
                <p>{text(locale, step.line)}</p>
              </li>
            ))}
          </ol>
          <Link className="vs-wl-btn is-lime" href={`${prefix}/start?${new URLSearchParams({from: 'workshops', idea: text(locale, live.ctaPrimary)})}`}>{text(locale, live.ctaPrimary)}<ArrowRight size={18} aria-hidden /></Link>
        </section>

        <section className="vs-wl-founder" id="founder">
          <div className="vs-wl-founder-image">
            <Image src={live.heroImage} alt={text(locale, live.heroImageAlt)} width={1254} height={1254} sizes="(max-width: 860px) 100vw, 40vw" />
          </div>
          <div className="vs-wl-founder-body">
            <h2>{text(locale, live.founderName)}</h2>
            <p className="vs-wl-with">{text(locale, live.founderKicker)}</p>
            <blockquote className="vs-wl-statement">{text(locale, live.founderStatement)}</blockquote>
            <Link className="vs-text-link" href={`${prefix}/about#founder`}>
              {text(locale, live.founderLink)}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </section>

        <section className="vs-wl-closing" id="start">
          <h2>
            {live.closingLines.map((line, index) => <span key={line.en} className={index === live.closingLines.length - 1 ? 'is-accent' : undefined}>{text(locale, line)}</span>)}
          </h2>
          <p className="vs-wl-status"><span className="vs-wl-dot" />{text(locale, section.status)}</p>
          <Link className="vs-wl-btn is-lime" href={`${prefix}/start?${new URLSearchParams({from: 'workshops', idea: text(locale, live.ctaPrimary)})}`}>{text(locale, live.closingCta)}<ArrowRight size={18} aria-hidden /></Link>
        </section>
      </div>
    </Frame>
  );
}

export function WorkshopPage({locale, slug}: {locale: Locale; slug: string}) {
  const workshop = getWorkshop(slug)!;
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';
  const kindName = workshopSection.doors[workshop.kind].name;
  const sector = workshopSection.institutionTypes.find(type => type.id === workshop.institution);
  const stages = [
    {n: '01', title: ar ? 'قبلها' : 'Before', body: workshop.before},
    {n: '02', title: ar ? 'جواها' : 'Inside', body: workshop.during},
    {n: '03', title: ar ? 'بعدها' : 'After', body: workshop.after},
  ];
  const shape = [
    {label: ar ? 'الشكل' : 'Format', value: workshop.format},
    {label: ar ? 'المدة' : 'Duration', value: workshop.duration},
    {label: ar ? 'العدد' : 'Group size', value: workshop.size},
  ];

  return (
    <Frame locale={locale} path={`/masterclass/${slug}`}>
      <article className="vs-ws-page">
        <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
          <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`${prefix}/masterclass`}>{text(locale, workshopSection.title)}</Link>
          <span>/</span>
          <span>{text(locale, kindName)}</span>
        </nav>
        <p className="vs-ws-kicker">{text(locale, kindName)}{sector && <> · {text(locale, sector.label)}</>}</p>
        <p className="vs-ws-teacher">{text(locale, workshopSection.live.cardTeacher)}</p>
        <p className="vs-ws-status">{text(locale, workshop.status)}</p>
        <h1>{text(locale, workshop.outcome)}</h1>
        <p className="vs-ws-lede">{text(locale, workshop.summary)}</p>

        {workshop.shifts && workshop.shifts.length > 0 && workshop.shiftsTitle && (
          <section id="shifts" className="vs-ws-shifts">
            <h2>{text(locale, workshop.shiftsTitle)}</h2>
            <p className="vs-ws-source-note">{ar ? 'أرقام كما نشرتها مصادرها، بتواريخها. ليست نتائج لـVisionSeek.' : 'Figures as their sources published them, with dates. They are not VisionSeek results.'}</p>
            <div className="vs-ws-shift-grid">
              {workshop.shifts.map(shift => (
                <div key={shift.title.en}>
                  <b>{text(locale, shift.figure)}</b>
                  <strong>{text(locale, shift.title)}</strong>
                  <p>{text(locale, shift.body)}</p>
                  <a href={shift.source.url} target="_blank" rel="noreferrer">
                    {shift.source.title}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="for-whom">
          <h2>{ar ? 'لمن' : 'Who it is for'}</h2>
          <p>{text(locale, workshop.audienceRole)}</p>
          <p>{text(locale, workshop.audienceInstitution)}</p>
          {workshop.boundary.ar && <p className="vs-ws-boundary">{text(locale, workshop.boundary)}</p>}
        </section>

        <section id="why-now">
          <h2>{ar ? 'لماذا الآن' : 'Why now'}</h2>
          <p>{text(locale, workshop.whyProblem)}</p>
          <p>{text(locale, workshop.whyEvidence)}</p>
          <p className="vs-ws-source-note">{ar ? 'مرجع خارجي. ليس شراكة ولا تكليفًا.' : 'An outside reference. Not a partnership and not an engagement.'}</p>
          <a href={workshop.source.url} target="_blank" rel="noreferrer">
            {workshop.source.title}
            <ArrowUpRight size={18} />
          </a>
        </section>

        <section id="how">
          <h2>{ar ? 'كيف تمشي' : 'How it runs'}</h2>
          <ol className="vs-ws-stages">
            {stages.map(stage => (
              <li key={stage.n}>
                <span>{stage.n}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{text(locale, stage.body)}</p>
                  {stage.n === '01' && (
                    <ol>
                      {workshop.questions.map(question => (
                        <li key={question.en}>{text(locale, question)}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="leaves-with">
          <h2>{ar ? 'بماذا تخرج' : 'What you leave with'}</h2>
          <ul>
            {workshop.leavesWith.map(item => (
              <li key={item.en}>{text(locale, item)}</li>
            ))}
          </ul>
        </section>

        {workshop.examples.length > 0 && (
          <section id="examples">
            <h2>{ar ? 'أمثلة من شغل المؤسسة' : 'Examples from the institution’s work'}</h2>
            <p>{text(locale, workshop.examplesNote)}</p>
            <div className="vs-ws-examples">
              {workshop.examples.map(example => (
                <div key={example.title.en}>
                  <strong>{text(locale, example.title)}</strong>
                  <em>{text(locale, example.body)}</em>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="shape">
          <h2>{ar ? 'الشكل والمدة والعدد' : 'Format, duration, and group size'}</h2>
          <p>{ar ? 'لم يُحدَّد بعد. لا نضع رقمًا قبل أن يُقرَّر.' : 'Not set. No number is published before it is decided.'}</p>
          <dl>
            {shape.map(item => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{text(locale, item.value)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="faq">
          <h2>{ar ? 'أسئلة قصيرة' : 'Short questions'}</h2>
          {workshop.faq.map(item => (
            <details key={item.q.en}>
              <summary>{text(locale, item.q)}</summary>
              <p>{text(locale, item.a)}</p>
            </details>
          ))}
        </section>

        <p className="vs-ws-cta">
          <Link className="vs-button" href={`${prefix}/start?${new URLSearchParams({from: 'workshops', workshop: workshop.slug, idea: `${text(locale, kindName)} — ${text(locale, workshop.outcome)}`.slice(0, 180)})}`}>
            {ar ? 'اطلب جلسة تعارف' : 'Request an introductory session'}
            <ArrowRight size={18} />
          </Link>
        </p>
      </article>
    </Frame>
  );
}

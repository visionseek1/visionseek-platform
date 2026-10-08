import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight, ArrowUpRight, Briefcase, Building2, GraduationCap, Plane, Shield} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import {WorkshopSelfCheck} from '@/components/institution/workshop-self-check';
import CapabilityFooter from '@/components/capability/footer';
import {
  getWorkshop,
  workshopSection,
  workshops,
  type InstitutionKind,
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
  const institutionWorkshops = workshops.filter(item => item.kind === 'institution');
  const leader = workshops.find(item => item.kind === 'leader');
  const development = workshops.find(item => item.kind === 'development');
  const doorHref = (kind: WorkshopKind) => {
    if (kind === 'leader' && leader) return `${prefix}/workshops/${leader.slug}`;
    if (kind === 'development' && development) return `${prefix}/workshops/${development.slug}`;
    return `${prefix}/workshops#institutions`;
  };
  /** The enquiry page reads these and opens with the workshop named, so the visitor never starts from a blank form. */
  const startHref = (kind: WorkshopKind) => `${prefix}/start?${new URLSearchParams({from: 'workshops', workshop: kind, idea: section.doors[kind].name[locale]})}`;
  const institutionIcon: Record<InstitutionKind, React.ReactNode> = {
    police: <Shield size={28} strokeWidth={1.6} aria-hidden />,
    university: <GraduationCap size={28} strokeWidth={1.6} aria-hidden />,
    airport: <Plane size={28} strokeWidth={1.6} aria-hidden />,
    hospital: <Building2 size={28} strokeWidth={1.6} aria-hidden />,
    company: <Briefcase size={28} strokeWidth={1.6} aria-hidden />,
  };
  const kinds: WorkshopKind[] = ['leader', 'institution', 'development'];

  return (
    <Frame locale={locale} path="/workshops">
      <div className="vs-wl">
        <input className="vs-ws-radio" type="radio" name="wl-chip" id="wl-chip-all" defaultChecked />
        {kinds.map(kind => (
          <input className="vs-ws-radio" type="radio" name="wl-chip" id={`wl-chip-${kind}`} key={kind} />
        ))}
        {section.institutionTypes.map((type, index) => (
          <input className="vs-ws-radio" type="radio" name="wl-inst" id={`wl-inst-${type.id}`} key={type.id} defaultChecked={index === 0} />
        ))}

        <section className="vs-wl-hero">
          <div className="vs-wl-hero-text">
            <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
              <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <span>{text(locale, section.title)}</span>
            </nav>
            <blockquote className="vs-wl-quote">{text(locale, live.heroQuote)}</blockquote>
            <h1>{text(locale, live.heroTitle)}</h1>
            <p className="vs-wl-lede">{text(locale, live.heroLede)}</p>
            <p className="vs-wl-with">{text(locale, live.heroWith)}</p>
            <p className="vs-wl-kicker"><span>{live.kicker}</span></p>
            <p className="vs-wl-status"><span className="vs-wl-dot" />{text(locale, section.status)}</p>
            <div className="vs-wl-actions">
              <Link className="vs-wl-btn is-lime" href={`${prefix}/start`}>{text(locale, live.ctaPrimary)}<ArrowRight size={18} aria-hidden /></Link>
            </div>
          </div>
          <div className="vs-wl-hero-image">
            <Image src={live.heroImage} alt={text(locale, live.heroImageAlt)} width={1254} height={1254} priority sizes="(max-width: 860px) 100vw, 50vw" />
            <span>{live.heroImageLabel}</span>
          </div>
        </section>

        <nav className="vs-wl-chips" aria-label={ar ? 'أقسام الورش' : 'Workshop sections'}>
          <label htmlFor="wl-chip-all">{text(locale, live.chipAll)}</label>
          {kinds.map(kind => (
            <label htmlFor={`wl-chip-${kind}`} key={kind}>{text(locale, section.doors[kind].name)}</label>
          ))}
        </nav>

        <section className="vs-wl-idea" id="idea">
          <p className="vs-wl-code">{text(locale, live.ideaLabel)}</p>
          <h2>{text(locale, live.ideaTitle)}</h2>
          <p className="vs-wl-sub">{text(locale, live.ideaSub)}</p>
          <ul className="vs-wl-idea-lines">
            {live.ideaLines.map(line => <li key={line.en}>{text(locale, line)}</li>)}
          </ul>
          <p className="vs-wl-close">{text(locale, live.ideaClose)}</p>
        </section>

        <section className="vs-wl-doors" id="doors">
          <div className="vs-wl-head">
            <h2>{text(locale, live.doorsLabel)}</h2>
          </div>
          <div className="vs-wl-door-grid">
            {kinds.map(kind => {
              const card = live.doorCards[kind];
              return (
                <Link className={`vs-wl-door door-${kind}`} href={doorHref(kind)} key={kind}>
                  <Image src={card.image} alt="" width={1200} height={1200} sizes="(max-width: 860px) 100vw, 33vw" />
                  <span className="vs-wl-door-body">
                    <span className="vs-wl-code">{card.code}</span>
                    <strong>{text(locale, section.doors[kind].name)}</strong>
                    <span className="vs-wl-door-line">{text(locale, section.doors[kind].line)}</span>
                    <span className="vs-wl-door-who">{text(locale, card.who)}</span>
                    <span className="vs-wl-door-text">{text(locale, card.body)}</span>
                    <span className="vs-wl-door-close">{text(locale, card.close)}</span>
                    <span className="vs-wl-door-open">{text(locale, live.openDoor)}<ArrowRight size={16} aria-hidden /></span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <WorkshopSelfCheck
          locale={locale}
          copy={live.selfCheck}
          doors={{
            leader: {name: section.doors.leader.name, line: section.doors.leader.line, href: doorHref('leader'), startHref: startHref('leader')},
            institution: {name: section.doors.institution.name, line: section.doors.institution.line, href: doorHref('institution'), startHref: startHref('institution')},
            development: {name: section.doors.development.name, line: section.doors.development.line, href: doorHref('development'), startHref: startHref('development')},
          }}
        />

        <section className="vs-wl-method" id="method">
          <div className="vs-wl-method-intro">
            <p className="vs-wl-code">{text(locale, live.methodLabel)}</p>
            <h2>{text(locale, live.methodTitle)}</h2>
            <p className="vs-wl-sub">{text(locale, live.methodSub)}</p>
            <p className="vs-wl-lede">{text(locale, live.methodLine)}</p>
          </div>
          <ol className="vs-wl-chain">
            {live.methodChain.map((step, index) => (
              <li key={step.en}>
                <span className="vs-wl-step-n">{String(index + 1).padStart(2, '0')}</span>
                <strong>{text(locale, step)}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="vs-wl-institutions" id="institutions">
          <div className="vs-wl-head">
            <div>
              <p className="vs-wl-code">{text(locale, live.institutionsLabel)}</p>
              <h2>{text(locale, live.institutionsTitle)}</h2>
            </div>
          </div>
          <ul className="vs-wl-inst-lines">
            {live.institutionsLines.map(line => (
              <li key={line.kind.en}><span>{text(locale, line.kind)}:</span> <strong>{text(locale, line.gain)}</strong></li>
            ))}
          </ul>
          <p className="vs-wl-close">{text(locale, live.institutionsClose)}</p>
          <div className="vs-wl-inst-row">
            {section.institutionTypes.map(type => {
              const workshop = institutionWorkshops.find(item => item.institution === type.id);
              return (
                <label className={`vs-wl-inst inst-${type.id}`} htmlFor={`wl-inst-${type.id}`} key={type.id}>
                  <span className="vs-wl-inst-icon">{institutionIcon[type.id]}</span>
                  <strong>{text(locale, type.label)}</strong>
                  {workshop && <em>{text(locale, workshop.outcome)}</em>}
                </label>
              );
            })}
          </div>
          {institutionWorkshops.map(item => (
            <div className={`vs-wl-inst-limit limit-${item.institution}`} key={item.slug}>
              <p>
                <strong>{text(locale, item.boundary.ar ? live.institutionsLimit : live.institutionsFor)} {section.institutionTypes.find(type => type.id === item.institution)?.label[locale]}:</strong>{' '}
                {text(locale, item.boundary.ar ? item.boundary : item.audienceInstitution)}
              </p>
              <Link className="vs-text-link" href={`${prefix}/workshops/${item.slug}`}>
                {text(locale, live.institutionsOpen)}
                <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          ))}
        </section>

        <section className="vs-wl-founder" id="founder">
          <div className="vs-wl-founder-image">
            <Image src={live.heroImage} alt={text(locale, live.heroImageAlt)} width={1254} height={1254} sizes="(max-width: 860px) 100vw, 40vw" />
          </div>
          <div className="vs-wl-founder-body">
            <h2>{text(locale, live.founderName)}</h2>
            <p className="vs-wl-with">{text(locale, live.founderKicker)}</p>
            <p>{text(locale, live.founderIntro)}</p>
            <ul className="vs-wl-founder-questions">
              {live.founderQuestions.map(q => <li key={q.en}>{text(locale, q)}</li>)}
            </ul>
            <p>{text(locale, live.founderMid)}</p>
            <p className="vs-wl-close">{text(locale, live.founderClose)}</p>
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
          <Link className="vs-wl-btn is-lime" href={`${prefix}/start`}>{text(locale, live.closingCta)}<ArrowRight size={18} aria-hidden /></Link>
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
    <Frame locale={locale} path={`/workshops/${slug}`}>
      <article className="vs-ws-page">
        <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
          <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`${prefix}/workshops`}>{text(locale, workshopSection.title)}</Link>
          <span>/</span>
          <span>{text(locale, kindName)}</span>
        </nav>
        <p className="vs-ws-kicker">{text(locale, kindName)}</p>
        <p className="vs-ws-status">{text(locale, workshop.status)}</p>
        <h1>{text(locale, workshop.outcome)}</h1>
        <p className="vs-ws-lede">{text(locale, workshop.summary)}</p>

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

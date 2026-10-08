import Link from 'next/link';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {
  getWorkshop,
  workshopSection,
  workshops,
  type Locale,
  type Workshop,
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
  const institutionWorkshops = workshops.filter(item => item.kind === 'institution');
  const leader = workshops.find(item => item.kind === 'leader');
  const development = workshops.find(item => item.kind === 'development');

  return (
    <Frame locale={locale} path="/workshops">
      <div className="vs-ws-board">
        <input className="vs-ws-radio" type="radio" name="ws-role" id="ws-role-all" defaultChecked />
        {section.roles.map(item => (
          <input className="vs-ws-radio" type="radio" name="ws-role" id={`ws-role-${item.id}`} key={item.id} />
        ))}
        <input className="vs-ws-radio" type="radio" name="ws-inst" id="ws-inst-all" defaultChecked />
        {section.institutionTypes.map(item => (
          <input className="vs-ws-radio" type="radio" name="ws-inst" id={`ws-inst-${item.id}`} key={item.id} />
        ))}

        <section className="vs-ws-hero">
          <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <span>{text(locale, section.title)}</span>
          </nav>
          <p className="vs-ws-status">{text(locale, section.status)}</p>
          <h1>{text(locale, section.hero)}</h1>
          <p className="vs-ws-lede">{text(locale, section.intro)}</p>
        </section>

        <section className="vs-ws-roles" id="by-role" aria-labelledby="ws-roles-heading">
          <h2 id="ws-roles-heading">{text(locale, section.rolesHeading)}</h2>
          <div className="vs-ws-role-row">
            <label htmlFor="ws-role-all">{ar ? 'الكل' : 'All'}</label>
            {section.roles.map(item => (
              <label key={item.id} htmlFor={`ws-role-${item.id}`}>{text(locale, item.label)}</label>
            ))}
          </div>
          {section.roles.map(item => (
            <p key={item.id} className={`vs-ws-role-note note-${item.id}`}>{text(locale, item.note)}</p>
          ))}
        </section>

        <div className="vs-ws-doors">
          {leader && <Door locale={locale} prefix={prefix} kind="leader" workshop={leader} pathClass="for-senior" />}
          <article className="vs-ws-door for-team" id="institutions">
            <p className="vs-ws-path">{ar ? 'مسارك' : 'Your path'}</p>
            <p className="vs-ws-kicker">02</p>
            <h2>{text(locale, section.doors.institution.name)}</h2>
            <p className="vs-ws-line">{text(locale, section.doors.institution.line)}</p>
            <p className="vs-ws-status">{text(locale, section.status)}</p>
            <h3>{text(locale, section.institutionsHeading)}</h3>
            <div className="vs-ws-role-row" aria-label={text(locale, section.institutionsHeading)}>
              <label htmlFor="ws-inst-all">{text(locale, section.allInstitutions)}</label>
              {section.institutionTypes.map(item => (
                <label key={item.id} htmlFor={`ws-inst-${item.id}`}>{text(locale, item.label)}</label>
              ))}
            </div>
            <div className="vs-ws-examples">
              {institutionWorkshops.map(item => (
                <Link className={`vs-ws-example inst-${item.institution}`} key={item.slug} href={`${prefix}/workshops/${item.slug}`}>
                  <span>{section.institutionTypes.find(type => type.id === item.institution)?.label[locale]}</span>
                  <strong>{text(locale, item.outcome)}</strong>
                  <em>{text(locale, item.summary)}</em>
                </Link>
              ))}
            </div>
          </article>
          {development && <Door locale={locale} prefix={prefix} kind="development" workshop={development} pathClass="for-senior" />}
        </div>
      </div>
    </Frame>
  );
}

function Door({locale, prefix, kind, workshop, pathClass}: {locale: Locale; prefix: string; kind: WorkshopKind; workshop: Workshop; pathClass: string}) {
  const number = kind === 'leader' ? '01' : '03';
  return (
    <article className={`vs-ws-door ${pathClass}`} id={kind}>
      <p className="vs-ws-path">{locale === 'ar' ? 'مسارك' : 'Your path'}</p>
      <p className="vs-ws-kicker">{number}</p>
      <h2>{text(locale, workshopSection.doors[kind].name)}</h2>
      <p className="vs-ws-line">{text(locale, workshopSection.doors[kind].line)}</p>
      <p className="vs-ws-status">{text(locale, workshop.status)}</p>
      <p>{text(locale, workshop.outcome)}</p>
      <Link className="vs-text-link" href={`${prefix}/workshops/${workshop.slug}`}>
        {locale === 'ar' ? 'ادخل الورشة' : 'Open the workshop'}
        <ArrowRight size={18} />
      </Link>
    </article>
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
          <Link className="vs-button" href={`${prefix}/start`}>
            {ar ? 'اطلب جلسة تعارف' : 'Request an introductory session'}
            <ArrowRight size={18} />
          </Link>
        </p>
      </article>
    </Frame>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {
  getWorkshop,
  workshopSection,
  type Locale,
  type WorkshopHeadingKey,
} from '@/lib/institution/workshops';
import {coursePath, workshop as governanceCourse} from '@/lib/governance';
import {DocumentLocale} from '@/components/governance/document-locale';

function Frame({locale, path, children}: {locale: Locale; path: string; children: React.ReactNode}) {
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <DocumentLocale locale={locale} />
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
  const courseHref = `${prefix}${coursePath}`;
  const privateHref = `${prefix}/start?${new URLSearchParams({from: 'workshops', idea: text(locale, live.ctaPrimary)})}`;

  return (
    <Frame locale={locale} path="/masterclass">
      <div className="vs-wl vs-wl-catalog">
        <header className="vs-wl-catalog-intro">
          <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <span>{text(locale, section.title)}</span>
          </nav>
          <h1>{text(locale, section.title)}</h1>
          <p>{text(locale, live.teaches)}</p>
        </header>

        <section className="vs-wl-catalog-grid" id="institutions" aria-label={text(locale, section.title)}>
          <article className="vs-wl-offer vs-wl-course-card">
            <Link href={courseHref}>
              <Image src={governanceCourse.cover[locale]} alt={text(locale, governanceCourse.coverAlt)} width={1600} height={900} priority />
            </Link>
            <div>
              <h2 id="vs-wl-course-title"><Link href={courseHref}>{text(locale, governanceCourse.title)}</Link></h2>
              <p><span>{text(locale, governanceCourse.durationLabel)}</span> {text(locale, governanceCourse.soon)}</p>
              <p className="vs-wl-offer-price">{text(locale, governanceCourse.price)}</p>
              <Link className="vs-wl-btn is-lime" href={courseHref}>{text(locale, governanceCourse.subscribe)}<ArrowRight size={18} aria-hidden /></Link>
            </div>
          </article>
        </section>

        <section className="vs-wl-catalog-instructor" id="instructor">
          <h2>{text(locale, live.aboutInstructor)}</h2>
          <div>
            <Image src={live.heroImage} alt={text(locale, governanceCourse.instructorShort)} width={1254} height={1254} />
            <div>
              <p className="vs-wl-offer-price">{text(locale, governanceCourse.instructorShort)}</p>
              <p>{text(locale, live.founderKicker)}</p>
              <p>{text(locale, live.founderStatement)}</p>
            </div>
          </div>
        </section>

        <section className="vs-wl-catalog-why" id="why">
          <h2>{text(locale, live.whyLabel)}</h2>
          <ul>
            {live.independence.lines.map(line => <li key={line.en}>{text(locale, line)}</li>)}
          </ul>
        </section>

        <section className="vs-wl-catalog-close" id="start">
          <Link className="vs-wl-btn is-lime" href={privateHref}>{text(locale, live.privateCta)}<ArrowRight size={18} aria-hidden /></Link>
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
  /** The page's own heading when it has one; the shared default until the page is rewritten. */
  const heading = (key: WorkshopHeadingKey, en: string, arDefault: string) => {
    const own = workshop.headings?.[key];
    return own?.ar && own?.en ? text(locale, own) : ar ? arDefault : en;
  };
  const stages = [
    {n: '01', title: heading('before', 'Before', 'قبلها'), body: workshop.before},
    {n: '02', title: heading('during', 'Inside', 'جواها'), body: workshop.during},
    {n: '03', title: heading('after', 'After', 'بعدها'), body: workshop.after},
  ];
  const cta = workshop.cta?.ar && workshop.cta?.en ? text(locale, workshop.cta) : ar ? 'اطلب جلسة تعارف' : 'Request an introductory session';

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
        <h1>{text(locale, workshop.outcome)}</h1>
        <p className="vs-ws-lede">{text(locale, workshop.summary)}</p>

        {workshop.pace && (
          <section id="pace" className="vs-ws-pace">
            <h2>{text(locale, workshop.pace.title)}</h2>
            <figure className="vs-ws-pace-quote">
              <blockquote>{text(locale, workshop.pace.quote)}</blockquote>
              <figcaption>
                <a href={workshop.pace.quoteSource.url} target="_blank" rel="noreferrer">{text(locale, workshop.pace.quoteBy)}<ArrowUpRight size={14} aria-hidden /></a>
              </figcaption>
            </figure>
            <p className="vs-ws-pace-consequence">{text(locale, workshop.pace.consequence)}</p>
            <div className="vs-ws-shift-grid">
              {workshop.pace.cards.map(card => (
                <div key={card.title.en}>
                  <b>{text(locale, card.figure)}</b>
                  <strong>{text(locale, card.title)}</strong>
                  <p>{text(locale, card.body)}</p>
                  {card.lesson?.ar && <p className="vs-ws-shift-lesson">{text(locale, card.lesson)}</p>}
                  <a href={card.source.url} target="_blank" rel="noreferrer">
                    {card.source.title}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {workshop.shifts && workshop.shifts.length > 0 && workshop.shiftsTitle && (
          <section id="shifts" className="vs-ws-shifts">
            <h2>{text(locale, workshop.shiftsTitle)}</h2>
            <div className="vs-ws-shift-grid">
              {workshop.shifts.map(shift => (
                <div key={shift.title.en}>
                  <b>{text(locale, shift.figure)}</b>
                  <strong>{text(locale, shift.title)}</strong>
                  <p>{text(locale, shift.body)}</p>
                  {shift.lesson?.ar && <p className="vs-ws-shift-lesson">{text(locale, shift.lesson)}</p>}
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
          <h2>{heading('forWhom', 'Who it is for', 'لمن')}</h2>
          <p>{text(locale, workshop.audienceRole)}</p>
          <p>{text(locale, workshop.audienceInstitution)}</p>
          {workshop.boundary.ar && <p className="vs-ws-boundary">{text(locale, workshop.boundary)}</p>}
        </section>

        <section id="why-now">
          <h2>{heading('whyNow', 'Why now', 'لماذا الآن')}</h2>
          <p>{text(locale, workshop.whyProblem)}</p>
          <p>{text(locale, workshop.whyEvidence)}</p>
          <a href={workshop.source.url} target="_blank" rel="noreferrer">
            {workshop.source.title}
            <ArrowUpRight size={18} />
          </a>
        </section>

        <section id="how">
          <h2>{heading('how', 'How it runs', 'كيف تمشي')}</h2>
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
          <h2>{heading('leavesWith', 'What you leave with', 'بماذا تخرج')}</h2>
          <ul>
            {workshop.leavesWith.map(item => (
              <li key={item.en}>{text(locale, item)}</li>
            ))}
          </ul>
        </section>

        {workshop.examples.length > 0 && (
          <section id="examples">
            <h2>{ar ? 'أمثلة من شغل المؤسسة' : 'Examples from the institution’s work'}</h2>
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

        <section id="faq">
          <h2>{heading('faq', 'Short questions', 'أسئلة قصيرة')}</h2>
          {workshop.faq.map(item => (
            <details key={item.q.en}>
              <summary>{text(locale, item.q)}</summary>
              <p>{text(locale, item.a)}</p>
            </details>
          ))}
        </section>

        <p className="vs-ws-cta">
          <Link className="vs-button" href={`${prefix}/start?${new URLSearchParams({from: 'workshops', workshop: workshop.slug, idea: `${text(locale, kindName)} — ${text(locale, workshop.outcome)}`.slice(0, 180)})}`}>
            {cta}
            <ArrowRight size={18} />
          </Link>
        </p>
      </article>
    </Frame>
  );
}

import Link from 'next/link';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {leaderOffice, masterclass, type Bi, type Locale} from '@/lib/institution/masterclass';
import {workshopSection} from '@/lib/institution/workshops';

function Frame({locale, path, children}: {locale: Locale; path: string; children: React.ReactNode}) {
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <CapabilityHeader locale={locale} path={path} />
      <main id="main-content">{children}</main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

const text = (locale: Locale, value: Bi) => value[locale];

function Crumb({locale, current}: {locale: Locale; current: string}) {
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';
  return (
    <nav className="vs-breadcrumb" aria-label={ar ? 'مسار الصفحة' : 'Breadcrumb'}>
      <Link href={prefix || '/'}>{ar ? 'الرئيسية' : 'Home'}</Link>
      <span>/</span>
      <Link href={`${prefix}/workshops`}>{text(locale, workshopSection.title)}</Link>
      <span>/</span>
      <Link href={`${prefix}/workshops#leader`}>{text(locale, workshopSection.doors.leader.name)}</Link>
      <span>/</span>
      <span>{current}</span>
    </nav>
  );
}

export function MasterclassPage({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';
  const program = masterclass;
  return (
    <Frame locale={locale} path="/workshops/ai-in-leadership">
      <div className="vs-mc-board">
        {program.tracks.map((track, index) => (
          <input
            className="vs-ws-radio"
            type="radio"
            name="mc-track"
            id={`mc-${track.id}`}
            key={track.id}
            defaultChecked={index === 0}
          />
        ))}
        <article className="vs-ws-page vs-mc-page">
          <Crumb locale={locale} current={text(locale, program.title)} />
          <p className="vs-ws-kicker">{text(locale, workshopSection.doors.leader.name)}</p>
          <p className="vs-ws-status">{text(locale, program.status)}</p>
          <h1>{text(locale, program.title)}</h1>
          <p className="vs-ws-lede">{text(locale, program.hero)}</p>
          <p>{text(locale, program.intro)}</p>

          <section id="shapes">
            <h2>{ar ? 'شكلان' : 'Two shapes'}</h2>
            <div className="vs-mc-shapes">
              {program.shapes.map(shape => (
                <article key={shape.id}>
                  <h3>{text(locale, shape.name)}</h3>
                  <p>{text(locale, shape.body)}</p>
                  {shape.id === 'workshop' && (
                    <Link className="vs-text-link" href={`${prefix}${program.workshopHref}`}>
                      {ar ? 'صفحة القعدة' : 'The live seat'}
                      <ArrowRight size={18} />
                    </Link>
                  )}
                </article>
              ))}
            </div>
            <p className="vs-mc-sample">
              <Link className="vs-button" href={`${prefix}${program.sampleHref}`}>
                {text(locale, program.sampleLabel)}
                <ArrowRight size={18} />
              </Link>
            </p>
          </section>

          <section id="unset">
            <h2>{ar ? 'المدة والسعر' : 'Duration and price'}</h2>
            <p>{text(locale, program.unsetNote)}</p>
            <dl>
              <div>
                <dt>{ar ? 'المدة' : 'Duration'}</dt>
                <dd>{text(locale, program.duration)}</dd>
              </div>
              <div>
                <dt>{ar ? 'السعر' : 'Price'}</dt>
                <dd>{text(locale, program.price)}</dd>
              </div>
            </dl>
          </section>

          <section id="tracks">
            <h2>{ar ? 'المقاعد' : 'The seats'}</h2>
            <div className="vs-ws-role-row vs-mc-switch">
              {program.tracks.map(track => (
                <label key={track.id} htmlFor={`mc-${track.id}`}>{text(locale, track.name)}</label>
              ))}
            </div>
          </section>
        </article>

        <div className="vs-mc-tracks">
          {program.tracks.map(track => (
            <section className={`vs-ws-page vs-mc-track track-${track.id}`} key={track.id} id={`track-${track.id}`}>
              <p className="vs-ws-status">{text(locale, track.status)}</p>
              <h2>{text(locale, track.name)}</h2>
              <p className="vs-ws-lede">{text(locale, track.promise)}</p>
              {track.laterNote && <p>{text(locale, track.laterNote)}</p>}
              <ol className="vs-mc-units">
                {track.units.map((unit, index) => (
                  <li key={unit.id}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{text(locale, unit.title)}</h3>
                      {track.written ? (
                        <dl>
                          <div>
                            <dt>{ar ? 'بعدها يقدر' : 'What you can do after'}</dt>
                            <dd>{text(locale, unit.outcome)}</dd>
                          </div>
                          <div>
                            <dt>{ar ? 'التمرين على شغله' : 'On your own work'}</dt>
                            <dd>{text(locale, unit.exercise)}</dd>
                          </div>
                          <div>
                            <dt>{ar ? 'الأداة' : 'The tool'}</dt>
                            <dd>{text(locale, unit.tool)}</dd>
                          </div>
                        </dl>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <article className="vs-ws-page">
          <section id="sources">
            <h2>{ar ? 'من أين أُخذ الشكل' : 'Where the shape came from'}</h2>
            <p className="vs-ws-source-note">{text(locale, program.sourcesNote)}</p>
            <ol className="vs-mc-sources">
              {program.sources.map(source => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                    <ArrowUpRight size={16} />
                  </a>
                  <p>{text(locale, source.date)}</p>
                  <p className="vs-ws-source-note">{text(locale, source.dateNote)}</p>
                  <p>{text(locale, source.usedFor)}</p>
                </li>
              ))}
            </ol>
          </section>
          <p className="vs-ws-cta">
            <Link className="vs-button" href={`${prefix}/start`}>
              {ar ? 'اطلب جلسة تعارف' : 'Request an introductory session'}
              <ArrowRight size={18} />
            </Link>
          </p>
        </article>
      </div>
    </Frame>
  );
}

export function LeaderOfficePage({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const prefix = ar ? '/ar' : '';
  const office = leaderOffice;
  return (
    <Frame locale={locale} path="/workshops/leader-office">
      <div className="vs-office-board">
        {office.pieces.map((piece, index) => (
          <input
            className="vs-ws-radio"
            type="radio"
            name="office-piece"
            id={`office-${piece.id}`}
            key={piece.id}
            defaultChecked={index === 0}
          />
        ))}
        <article className="vs-ws-page">
          <Crumb locale={locale} current={text(locale, office.title)} />
          <p className="vs-office-stamp">{text(locale, office.stamp)}</p>
          <p className="vs-ws-status">{text(locale, office.status)}</p>
          <h1>{text(locale, office.title)}</h1>
          <p className="vs-ws-lede">{text(locale, office.lede)}</p>
          <p>{text(locale, office.note)}</p>
          <div className="vs-ws-role-row vs-office-switch" role="tablist" aria-label={text(locale, office.title)}>
            {office.pieces.map(piece => (
              <label key={piece.id} htmlFor={`office-${piece.id}`}>{text(locale, piece.label)}</label>
            ))}
          </div>
          <div className="vs-office-papers">
            {office.pieces.map(piece => (
              <article className={`vs-office-paper paper-${piece.id}`} key={piece.id} id={`paper-${piece.id}`}>
                {piece.blocks.map((block, index) => {
                  if (block.kind === 'stamp') return <p className="vs-office-stamp" key={index}>{text(locale, block.text)}</p>;
                  if (block.kind === 'heading') return <h2 key={index}>{text(locale, block.text)}</h2>;
                  return <p key={index}>{text(locale, block.text)}</p>;
                })}
              </article>
            ))}
          </div>
          <p className="vs-mc-sample">
            <Link className="vs-text-link" href={`${prefix}/workshops/ai-in-leadership`}>
              {ar ? 'ارجع إلى المنهج' : 'Back to the curriculum'}
              <ArrowRight size={18} />
            </Link>
          </p>
        </article>
      </div>
    </Frame>
  );
}

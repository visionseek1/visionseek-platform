import type {ReactNode} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {CapabilityHeader} from "@/components/capability/navigation";
import CapabilityFooter from "@/components/capability/footer";
import type {Locale} from "@/components/capability/content";
import {
  fieldsForSector,
  focusFields,
  insightsForSector,
  laterFields,
  medical,
  type Bi,
  type MedicalField,
  type MedicalSector,
} from "@/lib/medical";
import styles from "./medical.module.css";

const tx = (ar: boolean) => (value: Bi) => (ar ? value.ar : value.en);

function Shell({locale, path, children}: {locale: Locale; path: string; children: ReactNode}) {
  const ar = locale === "ar";
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
      <CapabilityHeader locale={locale} path={path} />
      <main id="main-content">{children}</main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

function FieldCard({field, ar}: {field: MedicalField; ar: boolean}) {
  const t = tx(ar);
  const {soon, starLabel} = medical.fieldsPage;
  return (
    <article className={field.focus ? styles.focus : styles.muted}>
      <div className={styles.fieldTop}>
        <span className={field.focus ? styles.now : styles.soon}>{field.focus ? t(starLabel) : t(soon)}</span>
      </div>
      <h3>{t(field.title)}</h3>
      {field.focus && field.line ? <p>{t(field.line)}</p> : null}
    </article>
  );
}

export function Journey({locale, here}: {locale: Locale; here?: "education" | "system"}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const current = here === "system" ? ["study", "operation"] : here ? [here] : [];
  return (
    <section className="vs-section" aria-labelledby="journey-title">
      <p className="vs-eyebrow">{t(medical.work.eyebrow)}</p>
      <h2 id="journey-title">{t(medical.work.title)}</h2>
      <p className={styles.lead}>{t(medical.work.intro)}</p>
      <ol className={styles.steps}>
        {medical.work.steps.map((step, index) => (
          <li className={styles.step} key={step.id} aria-current={current.includes(step.id) ? "step" : undefined}>
            <Link href={`${p}${step.href}`}>
              <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Session({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  return (
    <section className={`vs-section ${styles.session}`}>
      <h2>{t(medical.session.title)}</h2>
      <p>{t(medical.session.text)}</p>
      <Link className="vs-button" href={`${p}/start`}>
        {t(medical.session.button)}
        <ArrowRight size={20} />
      </Link>
    </section>
  );
}

export function SectorView({locale, sector}: {locale: Locale; sector: MedicalSector}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const fields = fieldsForSector(sector);
  const insights = insightsForSector(sector.slug);
  const others = medical.sectors.filter(item => item.slug !== sector.slug);
  return (
    <Shell locale={locale} path={`/sectors/${sector.slug}`}>
      <section className="vs-interior-hero">
        <nav className="vs-breadcrumb" aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}>
          <Link href={p || "/"}>{ar ? "الرئيسية" : "Home"}</Link>
          <span>/</span>
          <Link href={`${p}/#who-we-work-with`}>{t(medical.cross.who)}</Link>
          <span>/</span>
          <span>{t(sector.title)}</span>
        </nav>
        <p className="vs-eyebrow">{t(medical.home.eyebrow)}</p>
        <h1>{t(sector.title)}</h1>
        <p className="vs-interior-intro">{t(sector.problem)}</p>
      </section>

      <section className={`vs-section ${styles.band}`} aria-labelledby="sector-fields">
        <p className="vs-eyebrow">{t(medical.fieldsPage.title)}</p>
        <h2 id="sector-fields">{t(medical.fieldsPage.title)}</h2>
        <p className={styles.note}>{t(medical.fieldsNote)}</p>
        <div className={styles.grid}>
          {fields.map(field => (
            <FieldCard field={field} ar={ar} key={field.id} />
          ))}
        </div>
        <Link className={`vs-text-link ${styles.follow}`} href={`${p}/fields`}>
          {t(medical.cross.fields)}
          <ArrowRight size={20} />
        </Link>
      </section>

      <Journey locale={locale} />

      <section className={`vs-section ${styles.band}`} aria-labelledby="sector-insights">
        <p className="vs-eyebrow">Insights</p>
        <h2 id="sector-insights">{t(medical.insightsBlock.title)}</h2>
        <p className={styles.lead}>{t(medical.insightsBlock.intro)}</p>
        <p className={styles.note}>{t(medical.insightsBlock.future)}</p>
        {insights.length === 0 ? (
          <p className={styles.empty}>{t(medical.insightsBlock.empty)}</p>
        ) : (
          <ul className={styles.list}>
            {insights.map(item => {
              const internal = item.href.startsWith("/");
              const href = internal ? `${p}${item.href}` : item.href;
              const body = (
                <>
                  <span>{t(item.title)}</span>
                  {item.date ? <span dir="ltr">{item.date}</span> : null}
                </>
              );
              return (
                <li key={item.href}>
                  {internal ? (
                    <Link href={href}>{body}</Link>
                  ) : (
                    <a href={href} target="_blank" rel="noreferrer">
                      {body}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <Link className={`vs-text-link ${styles.follow}`} href={`${p}/insights`}>
          {t(medical.insightsBlock.all)}
          <ArrowRight size={20} />
        </Link>
      </section>

      <Session locale={locale} />

      <section className={`vs-section ${styles.more}`} aria-label={t(medical.cross.others)}>
        <div className={styles.links}>
          <Link href={`${p}/masterclass`}>{t(medical.cross.education)}</Link>
          <Link href={`${p}/system`}>{t(medical.cross.system)}</Link>
          <Link href={`${p}/fields`}>{t(medical.cross.fields)}</Link>
        </div>
        <h2>{t(medical.cross.others)}</h2>
        <div className={styles.links}>
          {others.map(item => (
            <Link href={`${p}/sectors/${item.slug}`} key={item.slug}>
              {t(item.title)}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}

export function FieldsView({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const page = medical.fieldsPage;
  return (
    <Shell locale={locale} path="/fields">
      <section className="vs-interior-hero">
        <nav className="vs-breadcrumb" aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}>
          <Link href={p || "/"}>{ar ? "الرئيسية" : "Home"}</Link>
          <span>/</span>
          <span>{t(page.title)}</span>
        </nav>
        <p className="vs-eyebrow">{t(page.eyebrow)}</p>
        <h1>{t(page.title)}</h1>
        <p className="vs-interior-intro">{t(page.intro)}</p>
      </section>

      <section className="vs-section" aria-labelledby="fields-now">
        <h2 id="fields-now">{t(page.now)}</h2>
        <div className={styles.spotlight}>
          {focusFields().map(field => (
            <FieldCard field={field} ar={ar} key={field.id} />
          ))}
        </div>
        <p className={styles.groupLabel}>{t(page.later)}</p>
        <div className={styles.later}>
          {laterFields().map(field => (
            <FieldCard field={field} ar={ar} key={field.id} />
          ))}
        </div>
      </section>

      <Journey locale={locale} />
      <Session locale={locale} />

      <section className={`vs-section ${styles.more}`} aria-label={t(page.sectorsHeading)}>
        <div className={styles.links}>
          <Link href={`${p}/masterclass`}>{t(medical.cross.education)}</Link>
          <Link href={`${p}/system`}>{t(medical.cross.system)}</Link>
        </div>
        <h2>{t(page.sectorsHeading)}</h2>
        <div className={styles.links}>
          {medical.sectors.map(sector => (
            <Link href={`${p}/sectors/${sector.slug}`} key={sector.slug}>
              {t(sector.title)}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}

export function MasterclassView({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const page = medical.education;
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
      <CapabilityHeader locale={locale} path="/masterclass" />
      <main id="main-content">
        <div className="vs-wl">
          <section className="vs-wl-hero">
            <div className="vs-wl-hero-text">
              <nav className="vs-breadcrumb" aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}>
                <Link href={p || "/"}>{ar ? "الرئيسية" : "Home"}</Link>
                <span>/</span>
                <span>{t(page.title)}</span>
              </nav>
              <p className="vs-wl-lockup" dir="ltr">
                <Image src="/visionseek-symbol-color.png" alt="" width={36} height={36} />
                <span><small>VISIONSEEK</small><b>MASTERCLASS</b></span>
              </p>
              <h1 className="vs-wl-instructor">{t(page.title)}</h1>
              <p className="vs-wl-teaches">{t(page.intro)}</p>
              <div className="vs-wl-actions">
                <Link className="vs-wl-btn is-lime" href={`${p}/start`}>
                  {t(medical.session.button)}
                  <ArrowRight size={18} aria-hidden />
                </Link>
              </div>
            </div>
            <div className="vs-wl-hero-image">
              <Image src="/masterclass/ahmed-abdelalim.jpg" alt={ar ? "د. أحمد" : "Ahmed Abdelalim"} width={1254} height={1254} priority sizes="(max-width: 860px) 100vw, 50vw" />
              <span>VISIONSEEK · MAKE IT POSSIBLE</span>
            </div>
          </section>
          <section className="vs-wl-how" id="parts">
            <div className="vs-wl-head">
              <div>
                <p className="vs-wl-code">{t(page.eyebrow)}</p>
                <h2>{ar ? "من الصورة العامة إلى خريطة المؤسسة" : "From the wide picture to the institution's map"}</h2>
              </div>
            </div>
            <ol className="vs-wl-how-steps">
              <li>
                <span className="vs-wl-step-n">01</span>
                <strong>{t(page.general.title)}</strong>
                <p>{t(page.general.text)}</p>
              </li>
              <li>
                <span className="vs-wl-step-n">02</span>
                <strong>{t(page.specific.title)}</strong>
                <p>{t(page.specific.text)}</p>
              </li>
            </ol>
            <p>{t(page.examples)}</p>
          </section>
          <section className="vs-wl-own" id="insights">
            <p className="vs-wl-code">Insights</p>
            <h2>{t(medical.insightsBlock.title)}</h2>
            <p>{t(medical.insightsBlock.future)}</p>
            <Link className="vs-text-link" href={`${p}/insights`}>
              {t(medical.insightsBlock.all)}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </section>
          <Journey locale={locale} here="education" />
          <section className="vs-wl-closing" id="start">
            <h2>
              <span>{t(medical.session.title)}</span>
            </h2>
            <Link className="vs-wl-btn is-lime" href={`${p}/start`}>
              {t(medical.session.button)}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </section>
        </div>
      </main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

export function EducationView({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const page = medical.education;
  return (
    <Shell locale={locale} path="/education">
      <section className="vs-interior-hero">
        <nav className="vs-breadcrumb" aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}>
          <Link href={p || "/"}>{ar ? "الرئيسية" : "Home"}</Link>
          <span>/</span>
          <span>{t(page.title)}</span>
        </nav>
        <p className="vs-eyebrow">{t(page.eyebrow)}</p>
        <h1>{t(page.title)}</h1>
        <p className="vs-interior-intro">{t(page.intro)}</p>
      </section>
      <section className="vs-section" aria-labelledby="education-parts">
        <h2 id="education-parts">{ar ? "من الصورة العامة إلى ورقة المؤسسة" : "From the wide picture to one page"}</h2>
        <div className={styles.pair}>
          <article className={styles.focus}>
            <h3>{t(page.general.title)}</h3>
            <p>{t(page.general.text)}</p>
          </article>
          <article className={styles.focus}>
            <h3>{t(page.specific.title)}</h3>
            <p>{t(page.specific.text)}</p>
          </article>
        </div>
      </section>
      <section className={`vs-section ${styles.band}`} aria-labelledby="education-formats">
        <h2 id="education-formats">{t(page.formatsTitle)}</h2>
        <p className={styles.lead}>{t(page.starting)}</p>
        <ol className={styles.steps}>
          {page.formats.map((format, index) => (
            <li className={styles.step} key={format.title.en}>
              <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(format.title)}</h3>
              <p>{t(format.text)}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="vs-section" aria-labelledby="education-community">
        <h2 id="education-community">{t(page.communityTitle)}</h2>
        <p className={styles.lead}>{t(page.community)}</p>
      </section>
      <Journey locale={locale} here="education" />
      <Session locale={locale} />
      <section className={`vs-section ${styles.more}`}>
        <div className={styles.links}>
          <Link href={`${p}/system`}>{t(medical.cross.system)}</Link>
          <Link href={`${p}/fields`}>{t(medical.cross.fields)}</Link>
          <Link href={`${p}/#who-we-work-with`}>{t(medical.cross.who)}</Link>
        </div>
      </section>
    </Shell>
  );
}

export function SystemView({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const page = medical.system;
  return (
    <Shell locale={locale} path="/system">
      <section className="vs-interior-hero">
        <nav className="vs-breadcrumb" aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}>
          <Link href={p || "/"}>{ar ? "الرئيسية" : "Home"}</Link>
          <span>/</span>
          <span>{t(page.title)}</span>
        </nav>
        <p className="vs-eyebrow">{t(page.eyebrow)}</p>
        <h1>{t(page.title)}</h1>
        <p className="vs-interior-intro">{t(page.intro)}</p>
      </section>
      <section className="vs-section" aria-labelledby="system-general">
        <p className="vs-eyebrow">{t(page.generalTitle)}</p>
        <h2 id="system-general">{t(page.generalTitle)}</h2>
        <p className={styles.lead}>{t(page.generalIntro)}</p>
        <ol className={styles.steps}>
          {page.general.map((step, index) => (
            <li className={styles.step} id={step.id} key={step.id}>
              <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={`vs-section ${styles.band}`} aria-labelledby="system-custom">
        <h2 id="system-custom">{t(page.customTitle)}</h2>
        <p className={styles.lead}>{t(page.custom)}</p>
        <p className={styles.note}>{t(page.bridge)}</p>
      </section>
      <section className="vs-section" aria-labelledby="system-insights">
        <h2 id="system-insights">{t(medical.insightsBlock.title)}</h2>
        <p className={styles.lead}>{t(medical.insightsBlock.future)}</p>
        <Link className={`vs-text-link ${styles.follow}`} href={`${p}/insights`}>
          {t(medical.insightsBlock.all)}
          <ArrowRight size={20} />
        </Link>
      </section>
      <Journey locale={locale} here="system" />
      <Session locale={locale} />
      <section className={`vs-section ${styles.more}`}>
        <div className={styles.links}>
          <Link href={`${p}/masterclass`}>{t(medical.cross.education)}</Link>
          <Link href={`${p}/fields`}>{t(medical.cross.fields)}</Link>
          <Link href={`${p}/#who-we-work-with`}>{t(medical.cross.who)}</Link>
        </div>
      </section>
    </Shell>
  );
}

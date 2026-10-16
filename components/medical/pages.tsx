import type {ReactNode} from "react";
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
        {field.focus ? (
          <span className={styles.star} aria-label={t(starLabel)}>
            ⭐
          </span>
        ) : (
          <span className={styles.soon}>{t(soon)}</span>
        )}
      </div>
      <h3>{t(field.title)}</h3>
      {field.focus && field.line ? <p>{t(field.line)}</p> : null}
    </article>
  );
}

function Session({locale}: {locale: Locale}) {
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

      <section className="vs-section" aria-labelledby="sector-work">
        <p className="vs-eyebrow">{t(medical.work.eyebrow)}</p>
        <h2 id="sector-work">{t(medical.work.title)}</h2>
        <p className={styles.lead}>{t(medical.work.intro)}</p>
        <ol className={styles.steps}>
          {medical.work.steps.map((step, index) => (
            <li className={styles.step} key={step.id}>
              <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`vs-section ${styles.band}`} aria-labelledby="sector-insights">
        <p className="vs-eyebrow">Insights</p>
        <h2 id="sector-insights">{t(medical.insightsBlock.title)}</h2>
        <p className={styles.lead}>{t(medical.insightsBlock.intro)}</p>
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

      <Session locale={locale} />

      <section className={`vs-section ${styles.more}`} aria-label={t(page.sectorsHeading)}>
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

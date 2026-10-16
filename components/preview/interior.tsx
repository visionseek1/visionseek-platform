import Link from "next/link";
import type {Locale} from "@/components/capability/content";
import {fieldsForSector, insightsForSector, medical, type Bi, type MedicalSector} from "@/lib/medical";
import copy from "@/content/home-directions.json";
import FieldsMap from "./fields-map";
import {fieldModels} from "./home-direction";
import Reveal from "./reveal";
import {Journey, Session, Shell} from "./shell";
import styles from "./direction.module.css";

const tx = (ar: boolean) => (value: Bi) => (ar ? value.ar : value.en);

function Crumb({locale, items}: {locale: Locale; items: {href?: string; label: string}[]}) {
  const ar = locale === "ar";
  const p = ar ? "/ar" : "";
  return (
    <nav className={styles.crumb} aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}>
      <Link href={p || "/"}>{ar ? "الرئيسية" : "Home"}</Link>
      {items.map(item => (
        <span key={item.label}>
          <span aria-hidden="true">/</span>
          {item.href ? <Link href={`${p}${item.href}`}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

function Links({locale, hrefs}: {locale: Locale; hrefs: {href: string; label: string}[]}) {
  const p = locale === "ar" ? "/ar" : "";
  return (
    <div className={styles.links}>
      {hrefs.map(item => (
        <Link href={`${p}${item.href}`} key={item.href}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function SectorPage({locale, sector}: {locale: Locale; sector: MedicalSector}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const insights = insightsForSector(sector.slug);
  const others = medical.sectors.filter(item => item.slug !== sector.slug);
  return (
    <Shell locale={locale} path={`/sectors/${sector.slug}`}>
      <header className={styles.pageHero}>
        <Crumb locale={locale} items={[{href: "/#home-sectors", label: t(copy.sectors.title)}, {label: t(sector.title)}]} />
        <h1>{t(sector.title)}</h1>
        <p>{t(sector.problem)}</p>
      </header>
      <Reveal>
        <section className={styles.fields} aria-labelledby="sector-fields">
          <div className={styles.sectionHead}>
            <h2 id="sector-fields">{t(copy.fields.title)}</h2>
            <p>{t(medical.fieldsNote)}</p>
          </div>
          <FieldsMap label={t(copy.fields.title)} fields={fieldModels(locale, fieldsForSector(sector))} />
        </section>
      </Reveal>
      <Reveal>
        <Journey locale={locale} />
      </Reveal>
      <Reveal>
        <section className={styles.insights} aria-labelledby="sector-insights">
          <h2 id="sector-insights">{t(medical.insightsBlock.title)}</h2>
          <p>{t(medical.insightsBlock.intro)}</p>
          <p>{t(medical.insightsBlock.future)}</p>
          {insights.length === 0 ? (
            <p className={styles.empty}>{t(medical.insightsBlock.empty)}</p>
          ) : (
            <ul className={styles.list}>
              {insights.map(item => (
                <li key={item.href}>
                  {item.href.startsWith("/") ? (
                    <Link href={`${ar ? "/ar" : ""}${item.href}`}>{t(item.title)}</Link>
                  ) : (
                    <a href={item.href} rel="noreferrer">
                      {t(item.title)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </Reveal>
      <Reveal>
        <Session locale={locale} />
      </Reveal>
      <section className={styles.more}>
        <Links
          locale={locale}
          hrefs={[
            {href: "/education", label: t(medical.cross.education)},
            {href: "/system", label: t(medical.cross.system)},
            {href: "/fields", label: t(medical.cross.fields)},
          ]}
        />
        <div className={styles.links}>
          {others.map(item => (
            <Link href={`${ar ? "/ar" : ""}/sectors/${item.slug}`} key={item.slug}>
              {t(item.title)}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}

export function FieldsPage({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  return (
    <Shell locale={locale} path="/fields">
      <header className={styles.pageHero}>
        <Crumb locale={locale} items={[{label: t(copy.fields.title)}]} />
        <h1>{t(copy.fields.title)}</h1>
        <p>{t(copy.fields.line)}</p>
      </header>
      <Reveal>
        <section className={styles.fields} aria-labelledby="fields-map-title">
          <h2 id="fields-map-title" className={styles.sr}>
            {t(copy.fields.title)}
          </h2>
          <FieldsMap label={t(copy.fields.title)} fields={fieldModels(locale)} />
        </section>
      </Reveal>
      <Reveal>
        <Journey locale={locale} />
      </Reveal>
      <Reveal>
        <Session locale={locale} />
      </Reveal>
      <section className={styles.more}>
        <div className={styles.links}>
          {medical.sectors.map(sector => (
            <Link href={`${ar ? "/ar" : ""}/sectors/${sector.slug}`} key={sector.slug}>
              {t(sector.title)}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}

export function EducationPage({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const page = medical.education;
  return (
    <Shell locale={locale} path="/education">
      <header className={styles.pageHero}>
        <Crumb locale={locale} items={[{label: t(page.title)}]} />
        <p className={styles.kicker}>{t(page.eyebrow)}</p>
        <h1>{t(page.title)}</h1>
        <p>{t(page.intro)}</p>
      </header>
      <Reveal>
        <section className={styles.band} aria-labelledby="education-parts">
          <h2 id="education-parts">{ar ? "من الصورة العامة إلى ورقة المؤسسة" : "From the wide picture to one page"}</h2>
          <div className={styles.pair}>
            <article className={styles.panel}>
              <h3>{t(page.general.title)}</h3>
              <p>{t(page.general.text)}</p>
            </article>
            <article className={styles.panel}>
              <h3>{t(page.specific.title)}</h3>
              <p>{t(page.specific.text)}</p>
            </article>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className={styles.journey} aria-labelledby="education-formats">
          <div className={styles.sectionHead}>
            <h2 id="education-formats">{t(page.formatsTitle)}</h2>
            <p>{t(page.starting)}</p>
          </div>
          <ol className={styles.steps}>
            {page.formats.map((format, index) => (
              <li key={format.title.en}>
                <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{t(format.title)}</h3>
                <p>{t(format.text)}</p>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>
      <Reveal>
        <section className={styles.insights} aria-labelledby="education-community">
          <h2 id="education-community">{t(page.communityTitle)}</h2>
          <p>{t(page.community)}</p>
        </section>
      </Reveal>
      <Reveal>
        <Journey locale={locale} here="education" />
      </Reveal>
      <Reveal>
        <Session locale={locale} />
      </Reveal>
    </Shell>
  );
}

export function SystemPage({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const page = medical.system;
  return (
    <Shell locale={locale} path="/system">
      <header className={styles.pageHero}>
        <Crumb locale={locale} items={[{label: t(page.title)}]} />
        <p className={styles.kicker}>{t(page.eyebrow)}</p>
        <h1>{t(page.title)}</h1>
        <p>{t(page.intro)}</p>
      </header>
      <Reveal>
        <section className={styles.journey} aria-labelledby="system-general">
          <div className={styles.sectionHead}>
            <h2 id="system-general">{t(page.generalTitle)}</h2>
            <p>{t(page.generalIntro)}</p>
          </div>
          <ol className={styles.steps}>
            {page.general.map((step, index) => (
              <li id={step.id} key={step.id}>
                <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>
      <Reveal>
        <section className={styles.band} aria-labelledby="system-custom">
          <h2 id="system-custom">{t(page.customTitle)}</h2>
          <p>{t(page.custom)}</p>
          <p className={styles.bridge}>{t(page.bridge)}</p>
        </section>
      </Reveal>
      <Reveal>
        <section className={styles.insights} aria-labelledby="system-insights">
          <h2 id="system-insights">{t(medical.insightsBlock.title)}</h2>
          <p>{t(medical.insightsBlock.future)}</p>
          <Link className={styles.textLink} href={`${ar ? "/ar" : ""}/insights`}>
            {t(medical.insightsBlock.all)}
          </Link>
        </section>
      </Reveal>
      <Reveal>
        <Journey locale={locale} here="system" />
      </Reveal>
      <Reveal>
        <Session locale={locale} />
      </Reveal>
    </Shell>
  );
}

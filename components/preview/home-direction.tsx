import Image from "next/image";
import Link from "next/link";
import {ArrowRight, Building2, Factory, Landmark, Microscope, Network, Shield} from "lucide-react";
import type {Locale} from "@/components/capability/content";
import {medical, type Bi} from "@/lib/medical";
import copy from "@/content/home-directions.json";
import FieldsMap from "./fields-map";
import Reveal from "./reveal";
import styles from "./direction.module.css";

const icons = {
  hospitals: Building2,
  pharma: Factory,
  pharmacies: Network,
  insurance: Shield,
  government: Landmark,
  research: Microscope,
} as const;

const tx = (ar: boolean) => (value: Bi) => (ar ? value.ar : value.en);

export default function HomeDirection({
  locale,
  tone,
  fontClass = "",
}: {
  locale: Locale;
  tone: "a" | "b";
  fontClass?: string;
}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const label = t(copy.directions[tone]);

  return (
    <div className={`${styles.root} ${styles[tone]} ${fontClass}`.trim()} lang={locale} dir={ar ? "rtl" : "ltr"}>
      <a className={styles.skip} href="#content">
        {ar ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <header className={styles.header}>
        <Link href={`${p}/preview/home-${tone}`} className={styles.logo} aria-label="VisionSeek">
          <Image src="/visionseek-logo-color.png" alt="" width={160} height={53} sizes="160px" priority />
        </Link>
        <p className={styles.mark}>{label}</p>
        <nav className={styles.tools} aria-label={ar ? "روابط الصفحة" : "Page links"}>
          <Link href={`${ar ? "" : "/ar"}/preview/home-${tone}`} hrefLang={ar ? "en" : "ar"}>
            {ar ? "EN" : "العربية"}
          </Link>
          <Link className={styles.button} href={`${p}/start`}>
            {t(copy.hero.button)}
          </Link>
        </nav>
      </header>

      <main id="content">
        <section className={styles.hero} aria-labelledby="home-hero">
          {tone === "b" ? <FieldArt /> : null}
          <div className={styles.heroCopy}>
            <h1 id="home-hero">{t(copy.hero.sentence)}</h1>
            <p>{t(copy.hero.line)}</p>
            <Link className={styles.button} href={`${p}/start`}>
              {t(copy.hero.button)}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          {tone === "a" ? (
            <figure className={styles.heroFigure}>
              <Image
                src="/preview/laboratory.jpg"
                alt={t(copy.photo.alt)}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 46vw"
                quality={68}
              />
              <figcaption>
                {t(copy.photo.credit)}{" "}
                <a href={copy.photo.href} rel="noreferrer">
                  {copy.photo.source}
                </a>
              </figcaption>
            </figure>
          ) : null}
        </section>

        <Reveal>
          <section className={styles.sectors} aria-labelledby="home-sectors">
            <div className={styles.sectionHead}>
              <h2 id="home-sectors">{t(copy.sectors.title)}</h2>
              <p>{t(copy.sectors.line)}</p>
            </div>
            <div className={styles.sectorGrid}>
              {medical.sectors.map((sector, index) => {
                const Icon = icons[sector.slug as keyof typeof icons] ?? Building2;
                return (
                  <Link className={styles.sector} href={`${p}/sectors/${sector.slug}`} key={sector.slug}>
                    <span className={styles.sectorIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <Icon size={22} strokeWidth={1.25} aria-hidden="true" />
                    <h3>{t(sector.title)}</h3>
                    <p>{t(sector.problem)}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.fields} aria-labelledby="home-fields">
            <div className={styles.sectionHead}>
              <h2 id="home-fields">{t(copy.fields.title)}</h2>
              <p>{t(copy.fields.line)}</p>
            </div>
            <FieldsMap
              label={t(copy.fields.title)}
              fields={medical.fields.map(field => ({
                id: field.id,
                focus: field.focus,
                title: t(field.title),
                line: field.line ? t(field.line) : t(copy.fields.soon),
                badge: field.focus ? t(copy.fields.now) : t(copy.fields.soon),
              }))}
            />
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.journey} aria-labelledby="home-journey">
            <div className={styles.sectionHead}>
              <h2 id="home-journey">{t(copy.journey.title)}</h2>
              <p>{t(copy.journey.line)}</p>
            </div>
            <ol className={styles.steps}>
              {medical.work.steps.map((step, index) => (
                <li key={step.id}>
                  <Link href={`${p}${step.href}`}>
                    <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{t(step.title)}</h3>
                    <p>{t(step.text)}</p>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.insights} aria-labelledby="home-insights">
            <h2 id="home-insights">{t(copy.insights.title)}</h2>
            <p>{t(copy.insights.line)}</p>
            <Link className={styles.textLink} href={`${p}/insights`}>
              {t(copy.insights.link)}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.session} aria-labelledby="home-session">
            <h2 id="home-session">{t(copy.session.title)}</h2>
            <p>{t(copy.session.line)}</p>
            <Link className={styles.button} href={`${p}/start`}>
              {t(copy.hero.button)}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </section>
        </Reveal>
      </main>
    </div>
  );
}

function FieldArt() {
  const lines = Array.from({length: 16}, (_, index) => 48 + index * 46);
  return (
    <svg className={styles.fieldArt} viewBox="0 0 1200 780" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {lines.map(y => (
          <line key={y} x1="0" x2="1200" y1={y} y2={y} />
        ))}
        <circle cx="880" cy="390" r="168" />
        <circle cx="880" cy="390" r="3" fill="currentColor" />
        <path d="M96 250 H430" />
        <path d="M96 292 H340" />
        <path d="M96 334 H390" />
      </g>
    </svg>
  );
}

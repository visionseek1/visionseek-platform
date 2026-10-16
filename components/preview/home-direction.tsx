import Image from "next/image";
import Link from "next/link";
import {ArrowRight, Building2, Factory, Landmark, Microscope, Network, Shield} from "lucide-react";
import type {Locale} from "@/components/capability/content";
import {isBlockHidden} from "@/lib/visibility";
import {medical, type Bi} from "@/lib/medical";
import copy from "@/content/home-directions.json";
import FieldsMap from "./fields-map";
import Reveal from "./reveal";
import {Journey, Session, Shell} from "./shell";
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

export function fieldModels(locale: Locale, fields = medical.fields) {
  const t = tx(locale === "ar");
  return fields.map(field => ({
    id: field.id,
    focus: field.focus,
    title: t(field.title),
    line: field.line ? t(field.line) : t(copy.fields.soon),
    badge: field.focus ? t(copy.fields.now) : t(copy.fields.soon),
  }));
}

/** Direction A home. The shared header component is not used here. */
export default function HomeDirection({locale, path = "/"}: {locale: Locale; path?: string}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  return (
    <Shell locale={locale} path={path}>
      <section className={styles.hero} aria-labelledby="home-hero">
        <div className={styles.heroCopy}>
          <h1 id="home-hero">{t(copy.hero.sentence)}</h1>
          {!isBlockHidden("home.identity") && <p>{t(copy.hero.line)}</p>}
          <Link className={styles.button} href={`${p}/start`}>
            {t(copy.hero.button)}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
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
      </section>

      {!isBlockHidden("home.sectors") && (
        <Reveal>
          <section className={styles.sectors} aria-labelledby="home-sectors">
            <div className={styles.sectionHead}>
              <h2 id="home-sectors">{t(copy.sectors.title)}</h2>
              <p>{t(copy.sectors.line)}</p>
            </div>
            <div className={styles.sectorGrid}>
              {medical.sectors.map(sector => {
                const Icon = icons[sector.slug as keyof typeof icons] ?? Building2;
                return (
                  <Link className={styles.sector} href={`${p}/sectors/${sector.slug}`} key={sector.slug}>
                    <Icon size={22} strokeWidth={1.25} aria-hidden="true" />
                    <h3>{t(sector.title)}</h3>
                    <p>{t(sector.problem)}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className={styles.fields} id="fields-map" aria-labelledby="home-fields">
          <div className={styles.sectionHead}>
            <h2 id="home-fields">{t(copy.fields.title)}</h2>
            <p>{t(copy.fields.line)}</p>
          </div>
          <FieldsMap label={t(copy.fields.title)} fields={fieldModels(locale)} />
        </section>
      </Reveal>

      <Reveal>
        <Journey locale={locale} />
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
        <Session locale={locale} />
      </Reveal>
    </Shell>
  );
}

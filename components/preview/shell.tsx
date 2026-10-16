import Image from "next/image";
import Link from "next/link";
import type {ReactNode} from "react";
import {ArrowRight} from "lucide-react";
import type {Locale} from "@/components/capability/content";
import {institutionHeaderNav} from "@/lib/institution/navigation";
import {medical, type Bi} from "@/lib/medical";
import {site} from "@/lib/site";
import copy from "@/content/home-directions.json";
import styles from "./direction.module.css";

const tx = (ar: boolean) => (value: Bi) => (ar ? value.ar : value.en);

export function otherLocale(ar: boolean, path: string) {
  if (ar) return path === "/" ? "/" : path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

export function Shell({locale, path, children}: {locale: Locale; path: string; children: ReactNode}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  return (
    <div className={`${styles.root} ${styles.a}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
      <a className={styles.skip} href="#content">
        {ar ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <header className={styles.header}>
        <Link href={p || "/"} className={styles.logo} aria-label="VisionSeek">
          <Image src="/visionseek-logo-color.png" alt="" width={160} height={53} sizes="160px" priority />
        </Link>
        <nav className={styles.primary} aria-label={ar ? "التنقل الرئيسي" : "Primary navigation"}>
          {institutionHeaderNav.map(item => (
            <Link href={`${p}${item.path}`} key={item.path} aria-current={path === item.path ? "page" : undefined}>
              {ar ? item.ar : item.en}
            </Link>
          ))}
        </nav>
        <details className={styles.menu}>
          <summary>{ar ? "القائمة" : "Menu"}</summary>
          <nav aria-label={ar ? "قائمة الهاتف" : "Mobile navigation"}>
            {institutionHeaderNav.map(item => (
              <Link href={`${p}${item.path}`} key={item.path}>
                {ar ? item.ar : item.en}
              </Link>
            ))}
          </nav>
        </details>
        <nav className={styles.tools} aria-label={ar ? "روابط الصفحة" : "Page links"}>
          <Link href={otherLocale(ar, path)} hrefLang={ar ? "en" : "ar"}>
            {ar ? "EN" : "العربية"}
          </Link>
          <Link className={styles.button} href={`${p}/start`}>
            {t(copy.hero.button)}
          </Link>
        </nav>
      </header>
      <main id="content">{children}</main>
      <footer className={styles.footer}>
        <span>© 2026 VisionSeek</span>
        <nav aria-label={ar ? "روابط قانونية" : "Legal"}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href={`${p}/privacy`}>{ar ? "الخصوصية" : "Privacy"}</Link>
          <Link href={`${p}/terms`}>{ar ? "الشروط" : "Terms"}</Link>
        </nav>
      </footer>
    </div>
  );
}

export function Journey({locale, here}: {locale: Locale; here?: "education" | "system"}) {
  const ar = locale === "ar";
  const t = tx(ar);
  const p = ar ? "/ar" : "";
  const current = here === "system" ? ["study", "operation"] : here ? [here] : [];
  return (
    <section className={styles.journey} aria-labelledby="journey-title">
      <div className={styles.sectionHead}>
        <h2 id="journey-title">{t(copy.journey.title)}</h2>
        <p>{t(copy.journey.line)}</p>
      </div>
      <ol className={styles.steps}>
        {medical.work.steps.map((step, index) => (
          <li key={step.id} aria-current={current.includes(step.id) ? "step" : undefined}>
            <Link href={`${p}${step.href}`}>
              <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
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
    <section className={styles.session} id="contact" aria-labelledby="home-session">
      <h2 id="home-session">{t(copy.session.title)}</h2>
      <p>{t(copy.session.line)}</p>
      <Link className={styles.button} href={`${p}/start`}>
        {t(copy.hero.button)}
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}

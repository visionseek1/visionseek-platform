import Link from "next/link";
import type {ReactNode} from "react";
import SiteHeader from "@/components/site-header";
import {site} from '@/lib/site';
import legal from '@/content/legal.json';

type LegalKind = "privacy" | "terms";

export default function LegalPage({ locale, kind }: { locale: "ar" | "en"; kind: LegalKind }) {
  const ar = locale === "ar";
  const home = ar ? "/ar" : "/";
  const privacyHref = ar ? "/ar/privacy" : "/privacy";
  const termsHref = ar ? "/ar/terms" : "/terms";

  return (
    <main id="main-content" className={`legal-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <SiteHeader
        locale={locale}
        languageHref={kind === "privacy" ? (ar ? "/privacy" : "/ar/privacy") : (ar ? "/terms" : "/ar/terms")}
        items={[
          { href: home, label: ar ? "الرئيسية" : "HOME" },
          { href: ar ? "/ar/projects" : "/projects", label: ar ? "المجالات" : "FIELDS" },
          { href: ar ? "/ar/insights" : "/insights", label: ar ? "رؤى" : "INSIGHTS" },
        ]}
      />

      <article className="legal-wrap">
        <p className="legal-kicker">VISIONSEEK / {kind === "privacy" ? (ar ? "الخصوصية" : "PRIVACY") : (ar ? "الشروط" : "TERMS")}</p>
        <LegalBody ar={ar} doc={legal[kind]} />
        <p className="legal-meta">
          {ar ? `ساري من ${legal.effectiveDate.ar} · ${site.location.ar}` : `EFFECTIVE ${legal.effectiveDate.en.toUpperCase()} · ${site.location.en.toUpperCase()}`}
          {" · "}
          <Link href={kind === "privacy" ? termsHref : privacyHref}>{kind === "privacy" ? (ar ? "الشروط" : "Terms") : (ar ? "الخصوصية" : "Privacy")}</Link>
        </p>
      </article>

      <footer>
        <div className="footer-logo" aria-hidden="true" />
        <span>VISIONSEEK</span>
        <nav className="footer-legal" aria-label={ar ? "روابط قانونية" : "Legal"}>
          <Link href={privacyHref}>{ar ? "الخصوصية" : "PRIVACY"}</Link>
          <Link href={termsHref}>{ar ? "الشروط" : "TERMS"}</Link>
        </nav>
      </footer>
    </main>
  );
}

type Bi = {en: string; ar: string};
type LegalSection = {heading: Bi; paragraphs: Bi[]; bullets: Bi[]};
type LegalDoc = {title: Bi; lead: Bi; sections: LegalSection[]};

/* Edited from /admin («الخصوصية والشروط»). The only markup a paragraph may carry is the {{email}} token, rendered as a mailto link. */
function withEmail(text: string): ReactNode {
  const parts = text.split("{{email}}");
  if (parts.length === 1) return text;
  return parts.flatMap((part, index) => index === 0 ? [part] : [<a key={index} href={`mailto:${site.email}`}>{site.email}</a>, part]);
}

function LegalBody({ ar, doc }: { ar: boolean; doc: LegalDoc }) {
  const t = (value: Bi) => (ar ? value.ar : value.en);
  return (
    <>
      <h1 className={ar ? "primary-ar" : "primary-en"}>{t(doc.title)}</h1>
      <p className={`legal-lead ${ar ? "primary-ar" : "primary-en"}`}>{t(doc.lead)}</p>
      {doc.sections.map((section) => (
        <section key={section.heading.en}>
          <h2>{t(section.heading)}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph.en}>{withEmail(t(paragraph))}</p>)}
          {section.bullets.length > 0 && <ul>{section.bullets.map((bullet) => <li key={bullet.en}>{t(bullet)}</li>)}</ul>}
        </section>
      ))}
    </>
  );
}

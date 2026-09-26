import Link from "next/link";
import SiteHeader from "@/components/site-header";

import { report, sources } from "@/lib/reports/physical-ai";

export default function ReportPage({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  const copy = report[locale];
  const base = ar ? "/ar" : "";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: copy.title,
    datePublished: "2026-09-01",
    inLanguage: ar ? "ar" : "en",
    author: { "@id": "https://visionseek.org/#organization" },
    publisher: { "@id": "https://visionseek.org/#organization" },
    mainEntityOfPage: `https://visionseek.org${base}/insights/physical-ai`,
  };

  return (
    <main id="main-content" className={`report-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader
        locale={locale}
        solid
        languageHref={ar ? "/insights/physical-ai" : "/ar/insights/physical-ai"}
        items={[
          { href: ar ? "/ar/insights" : "/insights", label: ar ? "الرؤى" : "INSIGHTS" },
          { href: ar ? "/ar/projects" : "/projects", label: ar ? "المجالات" : "FIELDS" },
          { href: base || "/", label: ar ? "الرئيسية" : "HOME" },
        ]}
      />

      <article>
        <header className="report-header">
          <div className="report-meta"><span>{copy.label}</span><span>{copy.date} · {copy.read}</span></div>
          <h1>{copy.title}</h1>
          <p>{copy.standfirst}</p>
        </header>

        <section className="report-summary">
          <p className="report-eyebrow">{copy.summaryLabel}</p>
          <p>{copy.summary}</p>
        </section>

        <section className="report-findings">
          <div className="report-section-title"><p>{copy.findingsLabel}</p><span>03</span></div>
          <div className="finding-grid">
            {copy.findings.map(([number, title, body]) => <section key={number}><span>{number}</span><h2>{title}</h2><p>{body}</p></section>)}
          </div>
        </section>

        <section className="report-connection">
          <p className="report-eyebrow">{copy.connectionLabel}</p>
          <h2>{copy.connectionTitle}</h2>
          <p>{copy.connection}</p>
        </section>

        <section className="report-actions">
          <div className="report-section-title"><p>{copy.actionLabel}</p><span>05</span></div>
          <ol>{copy.actions.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
        </section>

        <section className="report-perspective">
          <p>{copy.perspectiveLabel}</p>
          <blockquote>{copy.perspective}</blockquote>
        </section>

        <section className="report-sources">
          <p className="report-eyebrow">{copy.sourceLabel}</p>
          <p>{copy.sourceNote}</p>
          <ol>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span>{source.name}</span>{source.title} ↗</a></li>)}</ol>
        </section>

        <footer className="report-footer">
          <Link href={`${base}/insights`}>← {copy.back}</Link>
          <a href="mailto:abdelalim@visionseek.org?subject=Government%20mission%20briefing">{copy.cta} ↗</a>
        </footer>
      </article>
    </main>
  );
}

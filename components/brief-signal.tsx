import Link from "next/link";
import SiteHeader from "@/components/site-header";
import BriefActions from "@/components/brief-actions";
import LeadersReturnLink from "@/components/leaders-return";
import { fieldById } from "@/lib/fields";
import { briefHref, type BriefEntry, type Locale } from "@/lib/brief";

function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", { dateStyle: "medium", timeZone: "Asia/Seoul" }).format(new Date(iso));
}

function readLabel(locale: Locale, minutes: number) {
  return locale === "ar" ? `${minutes} دقائق` : `${minutes} min`;
}

export function BriefStatus({ locale, message }: { locale: Locale; message: string }) {
  const ar = locale === "ar";
  return (
    <main className={`brief-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <SiteHeader
        locale={locale}
        solid
        languageHref={briefHref(ar ? "en" : "ar")}
        items={[
          { href: briefHref(locale), label: ar ? "بيت القادة" : "Leaders House" },
          { href: ar ? "/ar/projects" : "/projects", label: ar ? "المجالات" : "FIELDS" },
        ]}
      />
      <section className="brief-status">
        <p>{message}</p>
        <LeadersReturnLink locale={locale}>{ar ? "العودة إلى بيت القادة" : "Back to Leaders House"}</LeadersReturnLink>
      </section>
    </main>
  );
}

export default function BriefSignal({ locale, entry }: { locale: Locale; entry: BriefEntry }) {
  const ar = locale === "ar";
  const title = ar ? entry.title.ar : entry.title.en;
  const summary = ar ? entry.summary.ar : entry.summary.en;
  const take = ar ? entry.take?.ar : entry.take?.en;
  const minutes = ar ? entry.readingMinutes.ar : entry.readingMinutes.en;
  const path = briefHref(locale, entry.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    datePublished: entry.publishedAt,
    description: summary,
    inLanguage: ar ? "ar" : "en",
    author: { "@id": "https://visionseek.org/#organization" },
    publisher: { "@id": "https://visionseek.org/#organization" },
    mainEntityOfPage: `https://visionseek.org${path}`,
  };

  return (
    <main className={`report-page brief-signal ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader
        locale={locale}
        solid
        languageHref={briefHref(ar ? "en" : "ar", entry.slug)}
        items={[
          { href: briefHref(locale), label: ar ? "بيت القادة" : "Leaders House" },
          { href: ar ? "/ar/projects" : "/projects", label: ar ? "المجالات" : "FIELDS" },
          { href: ar ? "/ar" : "/", label: ar ? "الرئيسية" : "HOME" },
        ]}
      />
      <article>
        <header className="report-header">
          <div className="report-meta">
            <span>{ar ? entry.category.ar : entry.category.en}</span>
            <span>
              <time dateTime={entry.publishedAt}>{formatDate(locale, entry.publishedAt)}</time>
              {" · "}
              {readLabel(locale, minutes)}
            </span>
          </div>
          <h1>{title}</h1>
          {entry.fieldIds.length ? (
            <p className="brief-inline-tags">
              {entry.fieldIds.map((id) => {
                const field = fieldById(id);
                if (!field) return null;
                return <Link key={id} href={`${briefHref(locale)}?topic=${id}`}>{ar ? field.title : field.english}</Link>;
              })}
            </p>
          ) : null}
        </header>

        <section className="report-summary">
          <p className="report-eyebrow">{ar ? "الملخص" : "Summary"}</p>
          <p>{summary}</p>
        </section>

        {take ? (
          <section className="brief-note-block">
            <p className="report-eyebrow">{ar ? "ملاحظة" : "Note"}</p>
            <blockquote>{take}</blockquote>
          </section>
        ) : null}

        {entry.source ? (
          <section className="brief-source">
            <p className="report-eyebrow">{ar ? "المصدر" : "Source"}</p>
            {entry.sourceUrl ? (
              <a href={entry.sourceUrl} target="_blank" rel="noreferrer">{entry.source} ↗</a>
            ) : (
              <p>{entry.source}</p>
            )}
          </section>
        ) : null}

        <div className="brief-tools">
          <BriefActions locale={locale} slug={entry.slug} path={path} />
        </div>

        <footer className="report-footer">
          <LeadersReturnLink locale={locale}>{ar ? "العودة إلى بيت القادة" : "Back to Leaders House"}</LeadersReturnLink>
        </footer>
      </article>
    </main>
  );
}

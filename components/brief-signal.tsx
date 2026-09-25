import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import BriefActions from "@/components/brief-actions";
import FollowField from "@/components/follow-field";
import LeadersContinue from "@/components/leaders-continue";
import LeadersReturnLink from "@/components/leaders-return";
import LearnMark from "@/components/learn-mark";
import { fieldById } from "@/lib/fields";
import { briefHref, kindLabel, type BriefEntry, type Locale } from "@/lib/brief";

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
  const body = ar ? entry.body?.ar : entry.body?.en;
  const figures = ar ? entry.figures.ar : entry.figures.en;
  const questions = ar ? entry.questions?.ar : entry.questions?.en;
  const path = briefHref(locale, entry.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": entry.kind === "signal" ? "NewsArticle" : "Article",
    headline: title,
    datePublished: entry.publishedAt,
    description: summary,
    inLanguage: ar ? "ar" : "en",
    ...(entry.image ? { image: `https://visionseek.org${entry.image}` } : {}),
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
            <span>{kindLabel(entry.kind, locale)} · {ar ? entry.category.ar : entry.category.en}</span>
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
              {entry.fieldIds[0] ? <FollowField locale={locale} fieldId={entry.fieldIds[0]} /> : null}
            </p>
          ) : null}
        </header>

        {entry.image ? (
          <figure className="leaders-article-photo">
            <Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 760px) 100vw, 720px" priority />
          </figure>
        ) : (
          <div className="leaders-typehead">
            <span>VisionSeek</span>
            <strong>{ar ? entry.category.ar : entry.category.en}</strong>
          </div>
        )}

        <section className="report-summary">
          <p className="report-eyebrow">{ar ? "ماذا حدث" : "What happened"}</p>
          <p>{summary}</p>
        </section>

        {body?.map((paragraph) => (
          <section key={paragraph.slice(0, 48)} className="brief-note-block">
            {paragraph.startsWith("VisionSeek") || paragraph.startsWith("تحليل VisionSeek") ? (
              <p className="leaders-analysis">{ar ? "تحليل VisionSeek" : "VisionSeek analysis"}</p>
            ) : null}
            <p>{paragraph}</p>
          </section>
        ))}

        {entry.series ? <LearnMark locale={locale} series={entry.series} slug={entry.slug} /> : null}

        {entry.glossary?.length ? (
          <section className="brief-note-block">
            <p className="report-eyebrow">{ar ? "مسرد قصير" : "Short glossary"}</p>
            <dl className="leaders-glossary">
              {entry.glossary.map((item) => (
                <div key={item.term.en}>
                  <dt>{ar ? item.term.ar : item.term.en}</dt>
                  <dd>{ar ? item.meaning.ar : item.meaning.en}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {take ? (
          <section className="brief-note-block">
            <p className="report-eyebrow">{ar ? "لماذا يهم مؤسستك" : "Why it matters to your institution"}</p>
            <p className="leaders-analysis">{ar ? "تحليل VisionSeek" : "VisionSeek analysis"}</p>
            <blockquote>{take}</blockquote>
          </section>
        ) : null}

        {questions?.length ? (
          <section className="brief-note-block">
            <p className="report-eyebrow">{ar ? "أسئلة تطرحها على فريقك" : "Questions to ask your team"}</p>
            <p className="leaders-analysis">{ar ? "تحليل VisionSeek" : "VisionSeek analysis"}</p>
            <ol>{questions.map((question) => <li key={question}>{question}</li>)}</ol>
          </section>
        ) : null}

        {figures.length ? (
          <section className="brief-note-block">
            <p className="report-eyebrow">{entry.figuresVerified ? (ar ? "أرقام أساسية" : "Key numbers") : (ar ? "أرقام وردت في هذا الملخص" : "Figures named in this summary")}</p>
            <ul>{figures.map((line) => <li key={line}>{line}</li>)}</ul>
            {entry.sourceUrl ? (
              <p><a href={entry.sourceUrl} target="_blank" rel="noreferrer">{ar ? "المصدر" : "Source"} ↗</a></p>
            ) : null}
          </section>
        ) : null}

        {entry.weeklyItems?.length ? (
          <section className="brief-note-block">
            <p className="report-eyebrow">{ar ? "الإشارات" : "Signals"}</p>
            <ol className="leaders-week">
              {entry.weeklyItems.map((item) => {
                const chip = fieldById(item.fieldId ?? "");
                return (
                  <li key={item.slug}>
                    <span className="leaders-chip">{chip ? (ar ? chip.title : chip.english) : (ar ? "سياسة" : "Policy")}</span>
                    <Link href={briefHref(locale, item.slug)}>{ar ? item.title.ar : item.title.en}</Link>
                    {item.sourceUrl ? <> · <a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source} ↗</a></> : null}
                    <p className="leaders-why">{ar ? item.why.ar : item.why.en}</p>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}

        {entry.deeper.length ? (
          <section className="brief-source leaders-deeper">
            <p className="report-eyebrow">{ar ? "للمزيد من المصدر" : "Go deeper"}</p>
            <ol>
              {entry.deeper.map((link) => (
                <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer">{ar ? link.label.ar : link.label.en} ↗</a></li>
              ))}
            </ol>
          </section>
        ) : null}

        {entry.source && entry.kind !== "weekly" ? (
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

        <LeadersContinue locale={locale} slug={entry.slug} />

        <footer className="report-footer">
          <LeadersReturnLink locale={locale}>{ar ? "العودة إلى بيت القادة" : "Back to Leaders House"}</LeadersReturnLink>
        </footer>
      </article>
    </main>
  );
}

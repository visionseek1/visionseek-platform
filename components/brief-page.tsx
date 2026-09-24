"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SiteHeader from "@/components/site-header";
import BriefActions from "@/components/brief-actions";
import BriefSubscribe from "@/components/brief-subscribe";
import { fieldById, fields } from "@/lib/fields";
import {
  briefEntries,
  briefFeedUrl,
  briefHref,
  entriesFromInsights,
  readSavedIds,
  readSavedServer,
  subscribeSaved,
  type BriefEntry,
  type Locale,
} from "@/lib/brief";

function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", { dateStyle: "medium", timeZone: "Asia/Seoul" }).format(new Date(iso));
}

function readLabel(locale: Locale, minutes: number) {
  return locale === "ar" ? `${minutes} دقائق` : `${minutes} min`;
}

function fieldLabel(locale: Locale, id: string) {
  const field = fieldById(id);
  if (!field) return id;
  return locale === "ar" ? field.title : field.english;
}

export default function BriefPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<BriefEntry[]>(briefEntries);
  const saved = useSyncExternalStore(subscribeSaved, readSavedIds, readSavedServer);
  const requested = searchParams.get("topic") ?? "all";
  const topic = requested === "saved" || fields.some((field) => field.id === requested) ? requested : "all";

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${briefFeedUrl}?v=${Date.now()}`, { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Feed unavailable"))))
      .then((payload: { items?: unknown }) => {
        if (!Array.isArray(payload.items) || payload.items.length === 0) return;
        setEntries(entriesFromInsights(payload.items));
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const visible = useMemo(() => {
    if (topic === "saved") return entries.filter((entry) => saved.includes(entry.slug));
    if (topic === "all") return entries;
    return entries.filter((entry) => entry.fieldIds.includes(topic));
  }, [entries, saved, topic]);

  function selectTopic(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("topic");
    else params.set("topic", next);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const otherLocale = ar ? "en" : "ar";
  const languageHref = topic === "all" ? briefHref(otherLocale) : `${briefHref(otherLocale)}?topic=${encodeURIComponent(topic)}`;

  return (
    <main className={`brief-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <SiteHeader
        locale={locale}
        solid
        languageHref={languageHref}
        items={[
          { href: ar ? "/ar" : "/", label: ar ? "الرئيسية" : "HOME" },
          { href: ar ? "/ar/projects" : "/projects", label: ar ? "المجالات" : "FIELDS" },
        ]}
      />

      <header className="brief-masthead">
        <p className="brief-kicker">VISIONSEEK / {ar ? "إحاطة" : "BRIEF"}</p>
        <h1>{ar ? "إحاطة" : "Brief"}</h1>
        <p className="brief-deck">{ar ? "إشارات وإحاطات. قراءة عامة." : "Signals and briefings. Public reading."}</p>
      </header>

      <section className="brief-index">
        <div className="brief-filters" role="toolbar" aria-label={ar ? "الموضوعات" : "Topics"}>
          <button type="button" aria-pressed={topic === "all"} onClick={() => selectTopic("all")}>{ar ? "الكل" : "All"}</button>
          {fields.map((field) => (
            <button key={field.id} type="button" aria-pressed={topic === field.id} onClick={() => selectTopic(field.id)}>
              {ar ? field.title : field.english}
            </button>
          ))}
          <button type="button" aria-pressed={topic === "saved"} onClick={() => selectTopic("saved")}>{ar ? "المحفوظ" : "Saved"}</button>
        </div>

        <nav className="brief-fields" aria-label={ar ? "المجالات" : "Fields"}>
          <span>{ar ? "المجالات" : "Fields"}</span>
          {fields.map((field) => (
            <Link key={field.id} href={`${ar ? "/ar/projects" : "/projects"}#${field.id}`}>
              {ar ? field.title : field.english}
            </Link>
          ))}
        </nav>

        <BriefSubscribe locale={locale} />

        <div className="brief-grid" aria-live="polite">
          {visible.length ? visible.map((entry, index) => {
            const tags = entry.fieldIds.length ? entry.fieldIds : [];
            const category = ar ? entry.category.ar : entry.category.en;
            return (
              <article className="brief-card" key={entry.slug}>
                <Link className="brief-card-link" href={briefHref(locale, entry.slug)}>
                  <div className="brief-card-media">
                    <Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 800px) 100vw, 33vw" priority={index < 2} />
                  </div>
                  <div className="brief-card-body">
                    <p className="brief-tags">
                      {tags.map((id) => <span key={id}>{fieldLabel(locale, id)}</span>)}
                      {category ? <span>{category}</span> : null}
                    </p>
                    <h2>{ar ? entry.title.ar : entry.title.en}</h2>
                    <p>{ar ? entry.summary.ar : entry.summary.en}</p>
                    <p className="brief-meta">
                      <time dateTime={entry.publishedAt}>{formatDate(locale, entry.publishedAt)}</time>
                      <span>{readLabel(locale, ar ? entry.readingMinutes.ar : entry.readingMinutes.en)}</span>
                      {entry.source ? <span>{entry.source}</span> : null}
                    </p>
                  </div>
                </Link>
                <BriefActions
                  compact
                  locale={locale}
                  slug={entry.slug}
                  path={briefHref(locale, entry.slug)}
                  title={ar ? entry.title.ar : entry.title.en}
                />
              </article>
            );
          }) : (
            <p className="brief-empty">{topic === "saved" ? (ar ? "لا شيء محفوظًا على هذا الجهاز." : "Nothing saved on this device.") : (ar ? "لا عناصر في هذا الموضوع." : "No items for this topic.")}</p>
          )}
        </div>
      </section>

      <footer className="insights-footer">
        <span>VISIONSEEK</span>
        <nav className="footer-legal" aria-label={ar ? "روابط قانونية" : "Legal"}>
          <Link href={ar ? "/ar/privacy" : "/privacy"}>{ar ? "الخصوصية" : "PRIVACY"}</Link>
          <Link href={ar ? "/ar/terms" : "/terms"}>{ar ? "الشروط" : "TERMS"}</Link>
        </nav>
        <small>{ar ? "إنتشون، كوريا الجنوبية" : "INCHEON, SOUTH KOREA"}</small>
      </footer>
    </main>
  );
}

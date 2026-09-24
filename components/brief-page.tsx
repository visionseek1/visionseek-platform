"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SiteHeader from "@/components/site-header";
import BriefActions from "@/components/brief-actions";
import { SubscribeButton, SubscribeCta, SubscribeModal, useSubscribeHidden } from "@/components/brief-subscribe";
import { fieldById } from "@/lib/fields";
import {
  briefEntries,
  briefFeedUrl,
  briefHref,
  entriesFromInsights,
  feedTopicsFor,
  readSavedIds,
  readSavedServer,
  subscribeSaved,
  type BriefEntry,
  type Locale,
} from "@/lib/brief";
const pageSize = 8;
const returnKey = "visionseek.leaders.return";
const scrollKey = "visionseek.leaders.scroll";

function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", { dateStyle: "medium", timeZone: "Asia/Seoul" }).format(new Date(iso));
}

function isLong(entry: BriefEntry, locale: Locale) {
  if (entry.kind === "report") return true;
  const summary = locale === "ar" ? entry.summary.ar : entry.summary.en;
  return summary.length > 180;
}

function rememberFeed() {
  const href = `${window.location.pathname}${window.location.search}`;
  window.sessionStorage.setItem(returnKey, href);
  window.sessionStorage.setItem(scrollKey, JSON.stringify({ href, y: window.scrollY }));
}

export default function BriefPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<BriefEntry[]>(briefEntries);
  const [failed, setFailed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const saved = useSyncExternalStore(subscribeSaved, readSavedIds, readSavedServer);
  const ctaHidden = useSubscribeHidden();
  const requestedTopic = searchParams.get("topic") ?? "all";
  const tab = searchParams.get("tab") === "saved" ? "saved" : "latest";
  const requestedMore = Number(searchParams.get("more"));
  const shown = Number.isFinite(requestedMore) && requestedMore >= pageSize ? Math.floor(requestedMore) : pageSize;
  const topics = useMemo(() => feedTopicsFor(entries), [entries]);
  const topic = topics.some((field) => field.id === requestedTopic) ? requestedTopic : "all";

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${briefFeedUrl}?v=${Date.now()}`, { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Feed unavailable"))))
      .then((payload: { items?: unknown }) => {
        if (!Array.isArray(payload.items) || payload.items.length === 0) return;
        setEntries(entriesFromInsights(payload.items));
        setFailed(false);
      })
      .catch(() => setFailed(true));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const href = `${window.location.pathname}${window.location.search}`;
    window.sessionStorage.setItem(returnKey, href);
    const writeScroll = () => {
      window.sessionStorage.setItem(scrollKey, JSON.stringify({ href, y: window.scrollY }));
    };
    window.addEventListener("scroll", writeScroll, { passive: true });
    return () => window.removeEventListener("scroll", writeScroll);
  }, [pathname, searchParams]);

  useEffect(() => {
    const raw = window.sessionStorage.getItem(scrollKey);
    if (!raw) return;
    try {
      const memory = JSON.parse(raw) as { href?: string; y?: number };
      if (memory.href !== `${window.location.pathname}${window.location.search}`) return;
      const y = typeof memory.y === "number" ? memory.y : 0;
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)));
    } catch {
      /* Ignore a damaged scroll note. */
    }
  }, [pathname, searchParams]);

  const visible = useMemo(() => {
    const filtered = entries.filter((entry) => {
      if (tab === "saved" && !saved.includes(entry.slug)) return false;
      if (topic !== "all" && !entry.fieldIds.includes(topic)) return false;
      return true;
    });
    return filtered;
  }, [entries, saved, tab, topic]);

  const page = visible.slice(0, shown);

  function replaceQuery(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function selectTopic(next: string) {
    replaceQuery((params) => {
      params.delete("more");
      if (next === "all") params.delete("topic");
      else params.set("topic", next);
    });
  }

  function selectTab(next: "latest" | "saved") {
    replaceQuery((params) => {
      params.delete("more");
      if (next === "latest") params.delete("tab");
      else params.set("tab", "saved");
    });
  }

  function showOlder() {
    replaceQuery((params) => {
      params.set("more", String(shown + pageSize));
    });
  }

  const otherLocale = ar ? "en" : "ar";
  const languageParams = new URLSearchParams();
  if (topic !== "all") languageParams.set("topic", topic);
  if (tab === "saved") languageParams.set("tab", "saved");
  if (shown > pageSize) languageParams.set("more", String(shown));
  const languageQuery = languageParams.toString();
  const languageHref = languageQuery ? `${briefHref(otherLocale)}?${languageQuery}` : briefHref(otherLocale);
  const name = ar ? "بيت القادة" : "Leaders House";

  return (
    <main className={`brief-page leaders-feed ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <SiteHeader
        locale={locale}
        solid
        languageHref={languageHref}
        items={[
          { href: briefHref(locale), label: name },
          { href: ar ? "/ar" : "/", label: ar ? "الرئيسية" : "HOME" },
          { href: ar ? "/ar/projects" : "/projects", label: ar ? "المجالات" : "FIELDS" },
        ]}
      />

      <div className="leaders-column">
        <header className="leaders-top">
          <h1>{name}</h1>
          <SubscribeButton locale={locale} onOpen={() => setModalOpen(true)} />
        </header>

        <div className="leaders-tabs" role="tablist" aria-label={ar ? "عرض المنشورات" : "Post view"}>
          <button type="button" role="tab" aria-selected={tab === "latest"} onClick={() => selectTab("latest")}>{ar ? "الأحدث" : "Latest"}</button>
          <button type="button" role="tab" aria-selected={tab === "saved"} onClick={() => selectTab("saved")}>{ar ? "المحفوظات" : "Saved"}</button>
        </div>

        <div className="leaders-chips" role="toolbar" aria-label={ar ? "المجالات" : "Fields"}>
          <button type="button" aria-pressed={topic === "all"} onClick={() => selectTopic("all")}>{ar ? "الكل" : "All"}</button>
          {topics.map((field) => (
            <button key={field.id} type="button" aria-pressed={topic === field.id} onClick={() => selectTopic(field.id)}>
              {ar ? field.title : field.english}
            </button>
          ))}
        </div>

        <div className="leaders-stream">
          {failed && entries.length === 0 ? (
            <p className="leaders-empty">{ar ? "تعذر تحميل المنشورات." : "Posts could not be loaded."}</p>
          ) : page.length ? page.map((entry, index) => {
            const title = ar ? entry.title.ar : entry.title.en;
            const summary = ar ? entry.summary.ar : entry.summary.en;
            const take = ar ? entry.take?.ar : entry.take?.en;
            const long = isLong(entry, locale);
            const href = briefHref(locale, entry.slug);
            const field = fieldById(entry.fieldIds[0] ?? "");
            return (
              <div key={entry.slug}>
                <article className="leaders-card">
                  <p className="leaders-id">
                    <span>VisionSeek</span>
                    {entry.category.en || entry.category.ar ? <span>{ar ? entry.category.ar : entry.category.en}</span> : null}
                    <time dateTime={entry.publishedAt}>{formatDate(locale, entry.publishedAt)}</time>
                    {field ? <span>{ar ? field.title : field.english}</span> : null}
                  </p>
                  <h2><Link href={href} onClick={rememberFeed}>{title}</Link></h2>
                  <p className={long ? "leaders-excerpt" : "leaders-body"}>{summary}</p>
                  {take ? <p className="leaders-take">{take}</p> : null}
                  <Link className="leaders-figure" href={href} onClick={rememberFeed}>
                    <Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 760px) 100vw, 720px" priority={index === 0} />
                  </Link>
                  <div className="leaders-foot">
                    {entry.source ? (
                      <p className="leaders-source">
                        {entry.sourceUrl ? <a href={entry.sourceUrl} target="_blank" rel="noreferrer">{entry.source}</a> : <span>{entry.source}</span>}
                      </p>
                    ) : null}
                    <BriefActions locale={locale} slug={entry.slug} path={href} readHref={href} showRead={long} onRead={rememberFeed} />
                  </div>
                </article>
                {tab === "latest" && !ctaHidden && index === 3 ? <SubscribeCta locale={locale} onOpen={() => setModalOpen(true)} /> : null}
              </div>
            );
          }) : (
            <p className="leaders-empty">
              {tab === "saved"
                ? (ar ? "لا شيء محفوظًا على هذا الجهاز." : "Nothing saved on this device.")
                : (ar ? "لا منشورات في هذا المجال." : "No posts in this topic.")}
            </p>
          )}
        </div>

        {page.length > 0 && visible.length > shown ? (
          <button type="button" className="leaders-older" onClick={showOlder}>{ar ? "عرض منشورات أقدم" : "Older posts"}</button>
        ) : null}
        {page.length > 0 && visible.length <= shown ? (
          <p className="leaders-end-note">{ar ? "لا توجد منشورات أقدم." : "No older posts."}</p>
        ) : null}

        <footer className="leaders-end">
          <span>VISIONSEEK</span>
          <nav aria-label={ar ? "روابط قانونية" : "Legal"}>
            <Link href={ar ? "/ar/privacy" : "/privacy"}>{ar ? "الخصوصية" : "PRIVACY"}</Link>
            <Link href={ar ? "/ar/terms" : "/terms"}>{ar ? "الشروط" : "TERMS"}</Link>
          </nav>
        </footer>
      </div>

      <SubscribeModal locale={locale} open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}

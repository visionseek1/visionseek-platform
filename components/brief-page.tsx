"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SiteHeader from "@/components/site-header";
import BriefActions from "@/components/brief-actions";
import FollowField from "@/components/follow-field";
import { SubscribeButton, SubscribeCta, SubscribeModal, useSubscribeHidden } from "@/components/brief-subscribe";
import { fieldById } from "@/lib/fields";
import {
  briefEntries,
  briefFeedUrl,
  briefHref,
  entriesFromInsights,
  feedTopicsFor,
  kindLabel,
  readFollowedIds,
  readFollowedServer,
  readLearnProgress,
  readLearnProgressServer,
  readSavedIds,
  readSavedServer,
  readSeenPrev,
  readSeenPrevServer,
  seenAtKey,
  seenPrevKey,
  subscribeFollowed,
  subscribeLearnProgress,
  subscribeSaved,
  subscribeSeenPrev,
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
  if (entry.kind === "report" || entry.kind === "learn" || entry.kind === "weekly") return true;
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
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [entries, setEntries] = useState<BriefEntry[]>(briefEntries);
  const [failed, setFailed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const saved = useSyncExternalStore(subscribeSaved, readSavedIds, readSavedServer);
  const followed = useSyncExternalStore(subscribeFollowed, readFollowedIds, readFollowedServer);
  const progress = useSyncExternalStore(subscribeLearnProgress, readLearnProgress, readLearnProgressServer);
  const seenPrev = useSyncExternalStore(subscribeSeenPrev, readSeenPrev, readSeenPrevServer);
  const ctaHidden = useSubscribeHidden();
  const requestedTopic = searchParams.get("topic") ?? "all";
  const requestedTab = searchParams.get("tab");
  const tab = requestedTab === "saved" || requestedTab === "foryou" ? requestedTab : "latest";
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

  useEffect(() => {
    const arrived = new Date().toISOString();
    const stamp = () => {
      window.localStorage.setItem(seenAtKey, arrived);
      window.localStorage.setItem(seenPrevKey, arrived);
    };
    const timer = window.setTimeout(stamp, 15000);
    window.addEventListener("pagehide", stamp);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pagehide", stamp);
      stamp();
    };
  }, []);

  const visible = useMemo(() => {
    const filtered = entries.filter((entry) => {
      if (tab === "saved" && !saved.includes(entry.slug)) return false;
      if (tab === "foryou" && !entry.fieldIds.some((id) => followed.includes(id))) return false;
      if (topic !== "all" && !entry.fieldIds.includes(topic)) return false;
      return true;
    });
    if (tab === "latest" && topic === "all" && followed.length) {
      const first = filtered.filter((entry) => entry.fieldIds.some((id) => followed.includes(id)));
      const rest = filtered.filter((entry) => !entry.fieldIds.some((id) => followed.includes(id)));
      return [...first, ...rest];
    }
    return filtered;
  }, [entries, followed, saved, tab, topic]);

  const page = visible.slice(0, shown);
  const reordered = tab === "latest" && topic === "all" && followed.length > 0;
  const learnItem = entries.find((entry) => entry.kind === "learn");
  const publishedParts = learnItem?.series?.parts.filter((part) => part.slug) ?? [];
  const startedLearn = publishedParts.some((part) => part.slug && progress.includes(part.slug));
  const unfinishedLearn = publishedParts.some((part) => part.slug && !progress.includes(part.slug));
  const resumeLearn = learnItem && startedLearn && unfinishedLearn ? learnItem : null;
  const resumeSaved = entries.filter((entry) => saved.includes(entry.slug)).slice(0, 2);

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

  function selectTab(next: "latest" | "saved" | "foryou") {
    replaceQuery((params) => {
      params.delete("more");
      if (next === "latest") params.delete("tab");
      else params.set("tab", next);
    });
  }

  function showOlder() {
    replaceQuery((params) => {
      params.set("more", String(shown + pageSize));
    });
  }

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || visible.length <= shown) return;
    let locked = false;
    const observer = new IntersectionObserver((observed) => {
      if (locked || !observed.some((item) => item.isIntersecting)) return;
      locked = true;
      const params = new URLSearchParams(searchParams.toString());
      params.set("more", String(shown + pageSize));
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, { rootMargin: "480px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [pathname, router, searchParams, shown, visible.length]);

  const otherLocale = ar ? "en" : "ar";
  const languageParams = new URLSearchParams();
  if (topic !== "all") languageParams.set("topic", topic);
  if (tab !== "latest") languageParams.set("tab", tab);
  if (shown > pageSize) languageParams.set("more", String(shown));
  const languageQuery = languageParams.toString();
  const languageHref = languageQuery ? `${briefHref(otherLocale)}?${languageQuery}` : briefHref(otherLocale);
  const name = ar ? "بيت القادة" : "Leaders House";
  const seenMark = seenPrev ? Date.parse(seenPrev) : NaN;

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

        {resumeLearn || resumeSaved.length ? (
          <section className="leaders-resume" aria-label={ar ? "أكمل من حيث توقفت" : "Continue where you left off"}>
            <p>{ar ? "أكمل من حيث توقفت" : "Continue where you left off"}</p>
            <ul>
              {resumeLearn ? (
                <li><Link href={briefHref(locale, resumeLearn.slug)} onClick={rememberFeed}>{ar ? resumeLearn.title.ar : resumeLearn.title.en}</Link></li>
              ) : null}
              {resumeSaved.map((entry) => (
                <li key={entry.slug}><Link href={briefHref(locale, entry.slug)} onClick={rememberFeed}>{ar ? entry.title.ar : entry.title.en}</Link></li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="leaders-tabs" role="tablist" aria-label={ar ? "عرض المنشورات" : "Post view"}>
          <button type="button" role="tab" aria-selected={tab === "latest"} onClick={() => selectTab("latest")}>{ar ? "الأحدث" : "Latest"}</button>
          <button type="button" role="tab" aria-selected={tab === "foryou"} onClick={() => selectTab("foryou")}>{ar ? "لك" : "For you"}</button>
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

        {reordered ? <p className="leaders-follow-note">{ar ? "المجالات التي تتابعها تظهر أولًا." : "Fields you follow are listed first."}</p> : null}

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
            const minutes = ar ? entry.readingMinutes.ar : entry.readingMinutes.en;
            const newer = Number.isFinite(seenMark) && Date.parse(entry.publishedAt) > seenMark;
            const previous = index > 0 ? page[index - 1] : null;
            const previousNewer = previous ? Number.isFinite(seenMark) && Date.parse(previous.publishedAt) > seenMark : false;
            const divider = tab === "latest" && !reordered && newer && !previousNewer;
            return (
              <div key={entry.slug}>
                {divider ? <p className="leaders-new-divider" role="separator">{ar ? "جديد منذ آخر زيارة" : "New since your last visit"}</p> : null}
                <article className="leaders-card">
                  <p className="leaders-id">
                    <span className="leaders-kind">{kindLabel(entry.kind, locale)}</span>
                    {entry.draft ? <span className="leaders-draft">{ar ? "مسودة" : "Draft"}</span> : null}
                    {entry.category.en || entry.category.ar ? <span>{ar ? entry.category.ar : entry.category.en}</span> : null}
                    <time dateTime={entry.publishedAt}>{formatDate(locale, entry.publishedAt)}</time>
                    <span>{ar ? `${minutes} دقائق` : `${minutes} min`}</span>
                    {field ? <span>{ar ? field.title : field.english}</span> : null}
                    {reordered && newer ? <span>{ar ? "جديد" : "New"}</span> : null}
                  </p>
                  <h2><Link href={href} onClick={rememberFeed}>{title}</Link></h2>
                  <p className={entry.kind === "weekly" || entry.kind === "learn" ? "leaders-body" : "leaders-excerpt"}>{summary}</p>
                  {entry.weeklyItems?.length ? (
                    <ol className="leaders-week">
                      {entry.weeklyItems.map((item) => (
                        <li key={item.slug}>
                          <Link href={briefHref(locale, item.slug)} onClick={rememberFeed}>{ar ? item.title.ar : item.title.en}</Link>
                          {item.sourceUrl ? <> · <a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a></> : null}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {take ? (
                    <div className="leaders-take">
                      <p className="leaders-take-label">{ar ? "لماذا يهم مؤسستك" : "Why it matters to your institution"}</p>
                      <p className="leaders-take-text">{take}</p>
                    </div>
                  ) : null}
                  <Link className="leaders-figure" href={href} onClick={rememberFeed}>
                    <Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 760px) 100vw, 720px" priority={index === 0} />
                  </Link>
                  <div className="leaders-foot">
                    {entry.source ? (
                      <p className="leaders-source">
                        {entry.sourceUrl ? <a href={entry.sourceUrl} target="_blank" rel="noreferrer">{entry.source}</a> : <span>{entry.source}</span>}
                      </p>
                    ) : null}
                    {field ? <FollowField locale={locale} fieldId={field.id} /> : null}
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
                : tab === "foryou"
                  ? (ar ? "لم تختر مجالًا بعد. من أي منشور تابع مجاله، فيظهر هنا." : "You have not followed a field yet. Follow one on a post and it will show here.")
                  : (ar ? "لا منشورات في هذا المجال." : "No posts in this topic.")}
            </p>
          )}
        </div>

        {page.length > 0 && visible.length > shown ? (
          <button type="button" className="leaders-older" onClick={showOlder}>{ar ? "عرض منشورات أقدم" : "Older posts"}</button>
        ) : null}
        <div ref={sentinelRef} className="leaders-sentinel" aria-hidden="true" />
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

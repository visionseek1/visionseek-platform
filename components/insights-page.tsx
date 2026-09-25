"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import initialInsights from "@/public/insights.json";
import SiteHeader from "@/components/site-header";

type Insight = (typeof initialInsights.items)[number];
type InsightsData = { updatedAt: string; items: Insight[] };

const liveFeed = "https://raw.githubusercontent.com/visionseek1/visionseek-platform/main/public/insights.json";
const approvedHosts = new Set(["mckinsey.com", "www.mckinsey.com", "bcg.com", "www.bcg.com", "nature.com", "www.nature.com", "mit.edu", "www.mit.edu", "oecd.org", "www.oecd.org", "weforum.org", "www.weforum.org"]);

function safeSourceUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && approvedHosts.has(url.hostname) ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function InsightsPage({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  const [data, setData] = useState<InsightsData>(initialInsights);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${liveFeed}?v=${Date.now()}`, { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Feed unavailable")))
      .then((next: InsightsData) => {
        if (Array.isArray(next.items) && next.items.length) setData(next);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const signals = useMemo(
    () => [...data.items].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, 8),
    [data.items],
  );

  return (
    <main id="main-content" className={`insights-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <SiteHeader
        locale={locale}
        solid
        languageHref={ar ? "/insights" : "/ar/insights"}
        items={[
          { href: ar ? "/ar" : "/", label: ar ? "الرئيسية" : "HOME" },
          { href: ar ? "/ar/projects" : "/projects", label: ar ? "المجالات" : "FIELDS" },
        ]}
      />

      <section className="insights-hero">
        <p>VISIONSEEK / {ar ? "رؤى للحكومات" : "GOVERNMENT INSIGHTS"}</p>
        <h1>{ar ? <>قرارات اليوم.<br />قدرات الغد.</> : <>TODAY&apos;S DECISIONS.<br />TOMORROW&apos;S CAPABILITIES.</>}</h1>
        <div className="insights-deck">
          {ar
            ? "إحاطة واحدة، ثم أحدث الإشارات. للقراءة كمستشعر، لا كتعريف بالمؤسسة."
            : "One brief, then the latest signals. Read this page as a sensor, not as a definition of the institution."}
        </div>
        <p className="insights-role">
          {ar ? (
            <>هذه الصفحة مستشعر، وليست المؤسسة. VisionSeek هي وصل القدرات في بنية حقيقية — تقنية، أو مشروع، أو نظام، أو برنامج. <Link href="/ar#vision">الرؤية</Link></>
          ) : (
            <>This page is a sensor, not the institution. VisionSeek is the work of connecting capabilities into a real structure — a technology, venture, system, or program. <Link href="/#vision">The vision</Link></>
          )}
        </p>
      </section>

      <section className="featured-report">
        <div className="featured-report-meta"><span>{ar ? "إحاطة حكومية / 01" : "GOVERNMENT BRIEF / 01"}</span><span>{ar ? "سبتمبر 2026" : "SEPTEMBER 2026"}</span></div>
        <div className="featured-report-grid">
          <div>
            <p>{ar ? "الذكاء الاصطناعي المادي" : "PHYSICAL AI"}</p>
            <h2>{ar ? "من تجربة تقنية إلى قدرة وطنية." : "FROM TECHNOLOGY PILOT TO NATIONAL CAPABILITY."}</h2>
          </div>
          <div className="featured-report-copy">
            <p>{ar ? "ما الذي يجب على الحكومات بناؤه الآن لالتقاط القيمة، حماية المصلحة العامة، وتشكيل السوق؟" : "What governments should build now to capture value, protect the public interest, and shape the market."}</p>
            <Link href={ar ? "/ar/insights/physical-ai" : "/insights/physical-ai"}>{ar ? "اقرأ الإحاطة" : "READ THE BRIEF"} ↗</Link>
          </div>
        </div>
      </section>

      <section className="insights-stream" aria-live="polite">
        <div className="stream-status">
          <span className="live-dot" /> {ar ? `آخر ${signals.length} إشارات` : `LATEST ${signals.length} SIGNALS`}
        </div>
        {signals.map((item, index) => {
          const sourceUrl = safeSourceUrl(item.sourceUrl);
          return (
            <article className="insight-entry" key={item.id}>
              <div className="insight-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="insight-body">
                <div className="insight-meta">
                  <span>{ar ? item.categoryAr : item.categoryEn}</span>
                  <time dateTime={item.publishedAt}>{new Intl.DateTimeFormat(ar ? "ar" : "en", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date(item.publishedAt))}</time>
                </div>
                <h2>{ar ? item.titleAr : item.titleEn}</h2>
                <p>{ar ? item.summaryAr : item.summaryEn}</p>
                <blockquote>{ar ? item.takeAr : item.takeEn}</blockquote>
                {sourceUrl ? <a href={sourceUrl} target="_blank" rel="noreferrer">{ar ? "المصدر" : "SOURCE"}: {item.source} ↗</a> : <span>{item.source}</span>}
              </div>
            </article>
          );
        })}
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

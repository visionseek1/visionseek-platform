"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { briefHref, readLearnProgress, readLearnProgressServer, subscribeLearnProgress, writeLearnProgress, type BriefSeries, type Locale } from "@/lib/brief";

export default function LearnMark({ locale, series, slug }: { locale: Locale; series: BriefSeries; slug: string }) {
  const progress = useSyncExternalStore(subscribeLearnProgress, readLearnProgress, readLearnProgressServer);
  const ar = locale === "ar";
  const published = series.parts.filter((part) => part.slug);
  const readCount = published.filter((part) => part.slug && progress.includes(part.slug)).length;

  useEffect(() => {
    const current = readLearnProgress();
    if (current.includes(slug)) return;
    writeLearnProgress([...current, slug]);
  }, [slug]);

  return (
    <section className="leaders-series">
      <p className="report-eyebrow">{ar ? series.title.ar : series.title.en}</p>
      <p className="leaders-analysis">
        {ar
          ? `على هذا الجهاز: ${readCount} من ${published.length} أجزاء منشورة. الأجزاء بلا متن ليست دروسًا.`
          : `On this device: ${readCount} of ${published.length} published parts. Parts without a text are not lessons.`}
      </p>
      <ol>
        {series.parts.map((part, index) => (
          <li key={part.title.en}>
            {part.slug ? (
              <Link href={briefHref(locale, part.slug)} aria-current={part.slug === slug ? "page" : undefined}>
                {index + 1}. {ar ? part.title.ar : part.title.en}
              </Link>
            ) : (
              <span>
                {index + 1}. {ar ? part.title.ar : part.title.en}
                {" — "}
                {ar ? "لم يُكتب بعد" : "Not written yet"}
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

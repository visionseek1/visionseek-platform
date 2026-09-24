"use client";

import { useEffect, useState } from "react";
import BriefSignal, { BriefStatus } from "@/components/brief-signal";
import { briefFeedUrl, entriesFromInsights, type BriefEntry, type Locale } from "@/lib/brief";

export default function BriefSignalLookup({ locale, slug }: { locale: Locale; slug: string }) {
  const ar = locale === "ar";
  const [entry, setEntry] = useState<BriefEntry | null | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${briefFeedUrl}?v=${Date.now()}`, { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Feed unavailable"))))
      .then((payload: { items?: unknown }) => {
        const items = Array.isArray(payload.items) ? payload.items : [];
        const found = entriesFromInsights(items).find((item) => item.slug === slug && item.kind === "signal");
        setEntry(found ?? null);
      })
      .catch(() => setEntry(null));
    return () => controller.abort();
  }, [slug]);

  if (entry) return <BriefSignal locale={locale} entry={entry} />;
  return (
    <BriefStatus
      locale={locale}
      message={entry === undefined ? (ar ? "جارٍ التحميل" : "Loading") : (ar ? "هذا العنصر غير موجود." : "This item is not available.")}
    />
  );
}

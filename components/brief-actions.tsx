"use client";

import { useState, useSyncExternalStore } from "react";
import { readSavedIds, readSavedServer, subscribeSaved, writeSavedIds, type Locale } from "@/lib/brief";

function subscribeShare() {
  return () => undefined;
}

function shareSupported() {
  return typeof navigator.share === "function";
}

export default function BriefActions({
  locale,
  slug,
  path,
  title,
  compact = false,
}: {
  locale: Locale;
  slug: string;
  path: string;
  title: string;
  compact?: boolean;
}) {
  const ar = locale === "ar";
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const canShare = useSyncExternalStore(subscribeShare, shareSupported, () => false);
  const savedIds = useSyncExternalStore(subscribeSaved, readSavedIds, readSavedServer);
  const isSaved = savedIds.includes(slug);
  const canonicalUrl = `https://visionseek.org${path}`;

  function toggleSave() {
    const current = readSavedIds();
    const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
    writeSavedIds(next);
  }

  async function copyLink() {
    const pageUrl = new URL(path, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  }

  async function shareDevice() {
    const pageUrl = new URL(path, window.location.origin).toString();
    try {
      await navigator.share({ title, url: pageUrl });
    } catch {
      /* The share sheet was dismissed or is unavailable. */
    }
  }

  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
  const copyLabel = copied === "done" ? (ar ? "تم نسخ الرابط" : "Link copied") : copied === "failed" ? (ar ? "تعذر النسخ" : "Copy failed") : (ar ? "نسخ الرابط" : "Copy link");

  return (
    <div className={`brief-actions ${compact ? "is-compact" : ""}`}>
      <button type="button" aria-pressed={isSaved} onClick={toggleSave}>
        {isSaved ? (ar ? "محفوظ" : "Saved") : (ar ? "حفظ" : "Save")}
      </button>
      <details>
        <summary>{ar ? "مشاركة" : "Share"}</summary>
        <div className="brief-share-menu">
          <button type="button" onClick={copyLink}>{copyLabel}</button>
          <a href={linkedIn} target="_blank" rel="noreferrer">LinkedIn</a>
          {canShare ? <button type="button" onClick={shareDevice}>{ar ? "مشاركة الجهاز" : "Device share"}</button> : null}
        </div>
      </details>
    </div>
  );
}

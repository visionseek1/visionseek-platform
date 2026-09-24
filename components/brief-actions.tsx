"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { readSavedIds, readSavedServer, subscribeSaved, writeSavedIds, type Locale } from "@/lib/brief";

export default function BriefActions({
  locale,
  slug,
  path,
  readHref,
  showRead = false,
  onRead,
}: {
  locale: Locale;
  slug: string;
  path: string;
  readHref?: string;
  showRead?: boolean;
  onRead?: () => void;
}) {
  const ar = locale === "ar";
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const savedIds = useSyncExternalStore(subscribeSaved, readSavedIds, readSavedServer);
  const isSaved = savedIds.includes(slug);

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
      return;
    } catch {
      /* Clipboard permission can be denied. Fall back to a selection copy. */
    }
    try {
      const input = document.createElement("textarea");
      input.value = pageUrl;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const ok = document.execCommand("copy");
      input.remove();
      setCopied(ok ? "done" : "failed");
    } catch {
      setCopied("failed");
    }
  }

  const copyLabel = copied === "done" ? (ar ? "تم نسخ الرابط" : "Link copied") : copied === "failed" ? (ar ? "تعذر النسخ" : "Copy failed") : (ar ? "مشاركة" : "Share");

  return (
    <div className="brief-actions">
      {showRead && readHref ? <Link href={readHref} onClick={onRead}>{ar ? "قراءة المزيد" : "Read more"}</Link> : null}
      <button type="button" aria-pressed={isSaved} onClick={toggleSave}>
        {isSaved ? (ar ? "محفوظ" : "Saved") : (ar ? "حفظ" : "Save")}
      </button>
      <button type="button" onClick={copyLink}>{copyLabel}</button>
      {isSaved ? <p className="leaders-saved-note">{ar ? "حُفظ على هذا الجهاز." : "Saved on this device."}</p> : null}
    </div>
  );
}

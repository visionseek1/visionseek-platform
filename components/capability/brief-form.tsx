"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "./content";
import { home } from "@/lib/home";

export default function CapabilityBriefForm({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const copy = home.brief;
  const tx = (v: {en: string; ar: string}) => (ar ? v.ar : v.en);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/capability-brief", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          org: String(data.get("org") ?? ""),
          capability: String(data.get("capability") ?? ""),
          email: String(data.get("email") ?? ""),
          website: String(data.get("website") ?? ""),
          locale,
        }),
      });
      setStatus(response.ok ? "sent" : "error");
      if (response.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="vs-section vs-brief" id="capability-brief">
      <p className="vs-eyebrow">{tx(copy.eyebrow)}</p>
      <h2>{tx(copy.title)}</h2>
      <form className="vs-brief-form" onSubmit={onSubmit}>
        <label>
          {tx(copy.org)}
          <input name="org" required maxLength={200} autoComplete="organization" />
        </label>
        <label>
          {tx(copy.capability)}
          <select name="capability" required defaultValue="">
            <option value="" disabled>{ar ? "اختر" : "Select"}</option>
            {copy.options.map(option => <option key={option.value} value={option.value}>{ar ? option.ar : option.en}</option>)}
          </select>
        </label>
        <label>
          {tx(copy.email)}
          <input name="email" type="email" required maxLength={254} autoComplete="email" dir="ltr" />
        </label>
        <input className="vs-brief-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="vs-button" type="submit" disabled={status === "sending"}>{tx(copy.submit)}</button>
        <p className="vs-brief-note">{tx(copy.note)}</p>
        {status === "sent" && <p role="status">{ar ? "وصل الطلب. الفريق يرد بنفسه." : "The request is in. The team replies in person."}</p>}
        {status === "error" && <p role="status">{ar ? "لم يصل الطلب. راسلنا على abdelalim@visionseek.org." : "The request did not go through. Write to abdelalim@visionseek.org."}</p>}
      </form>
    </section>
  );
}

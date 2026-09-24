"use client";

import { useId, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/brief";

export default function BriefSubscribe({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const emailId = useId();
  const noteId = useId();
  const [prepared, setPrepared] = useState(false);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!email) return;
    const subject = encodeURIComponent(ar ? "اشتراك الإحاطة" : "Brief subscription");
    const body = encodeURIComponent(email);
    window.location.assign(`mailto:abdelalim@visionseek.org?subject=${subject}&body=${body}`);
    setPrepared(true);
  }

  return (
    <section className="brief-subscribe" id="subscribe" aria-labelledby={`${emailId}-label`}>
      <div>
        <p className="brief-kicker">{ar ? "بريد" : "EMAIL"}</p>
        <h2 id={`${emailId}-label`}>{ar ? "اشترك" : "Subscribe"}</h2>
      </div>
      <form action="mailto:abdelalim@visionseek.org" method="post" encType="text/plain" onSubmit={prepare} onChange={() => setPrepared(false)}>
        <label className="sr-only" htmlFor={emailId}>{ar ? "البريد الإلكتروني" : "Email"}</label>
        <input id={emailId} name="email" type="email" required maxLength={180} autoComplete="email" dir="ltr" placeholder={ar ? "البريد الإلكتروني" : "Email"} aria-describedby={noteId} />
        <button type="submit">{ar ? "اشترك" : "Subscribe"}</button>
      </form>
      <p id={noteId} className="brief-note">
        {ar
          ? "يفتح الزر مسودة إلى abdelalim@visionseek.org. لا يُرسل شيء، ولا يكتمل الاشتراك، إلا عندما ترسل الرسالة من تطبيق البريد."
          : "The button opens a draft to abdelalim@visionseek.org. Nothing is sent, and you are not subscribed, until you send that message from your mail app."}
      </p>
      {prepared ? (
        <p role="status" className="brief-note">
          {ar
            ? "المسودة جاهزة إن فُتح تطبيق البريد. هذه الصفحة لم تسجّل اشتراكًا."
            : "A draft is ready if your mail app opened. This page did not record a subscription."}
        </p>
      ) : null}
    </section>
  );
}

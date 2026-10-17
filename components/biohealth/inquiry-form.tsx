"use client";

import {useState, type FormEvent} from "react";
import type {Locale} from "@/components/capability/content";

const kinds = [
  {id: "government", en: "Government or sovereign health authority", ar: "جهة حكومية / هيئة صحية سيادية"},
  {id: "plant", en: "Pharmaceutical or biomanufacturing site", ar: "منشأة تصنيع دوائي / حيوي"},
  {id: "hospital", en: "Medical city or specialist hospital", ar: "مدينة طبية / مستشفى تخصصي"},
  {id: "fund", en: "Sector investment or financing body", ar: "صندوق استثمار قطاعي / جهة تمويل"},
];

const tracks = [
  {id: "bioprocess", en: "Bioprocess engineering and CDMO localization", ar: "هندسة وتوطين عمليات التصنيع الحيوي والـ CDMO"},
  {id: "diagnostics", en: "Sovereign diagnostic AI inside the facility", ar: "نشر الذكاء الاصطناعي التشخيصي السيادي داخل المنشأة"},
  {id: "insilico", en: "In silico molecular drug research", ar: "حوسبة وتطوير أبحاث الأدوية الجزيئية"},
];

export default function BiohealthInquiry({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/biohealth-brief", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          org: String(data.get("org") ?? ""),
          kind: String(data.get("kind") ?? ""),
          track: String(data.get("track") ?? ""),
          email: String(data.get("email") ?? ""),
          challenge: String(data.get("challenge") ?? ""),
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
    <form className="vs-brief-form" onSubmit={onSubmit}>
      <label>
        <span>{ar ? "اسم المؤسسة أو المنشأة" : "Institution or facility"}</span>
        <input name="org" required maxLength={200} autoComplete="organization"/>
      </label>
      <label>
        <span>{ar ? "صفة الجهة" : "Type of institution"}</span>
        <select name="kind" required defaultValue="">
          <option value="" disabled>{ar ? "اختر" : "Choose"}</option>
          {kinds.map(item => <option key={item.id} value={item.id}>{ar ? item.ar : item.en}</option>)}
        </select>
      </label>
      <label>
        <span>{ar ? "المسار التشغيلي المستهدف" : "Operating path"}</span>
        <select name="track" required defaultValue="">
          <option value="" disabled>{ar ? "اختر" : "Choose"}</option>
          {tracks.map(item => <option key={item.id} value={item.id}>{ar ? item.ar : item.en}</option>)}
        </select>
      </label>
      <label>
        <span>{ar ? "البريد المهني" : "Professional email"}</span>
        <input name="email" type="email" required maxLength={254} autoComplete="email"/>
      </label>
      <label>
        <span>{ar ? "طبيعة التحدي التشغيلي الراهن (اختياري)" : "The operating challenge now (optional)"}</span>
        <textarea name="challenge" maxLength={800} rows={4}/>
      </label>
      <label className="vs-brief-trap">
        <span>Website</span>
        <input name="website" tabIndex={-1} autoComplete="off"/>
      </label>
      <button className="vs-button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? (ar ? "يُرسل" : "Sending") : (ar ? "طلب موجز الاستكشاف الميداني" : "Request the field brief")}
      </button>
      {status === "sent" && <p role="status">{ar ? "وصل الطلب. لا يوجد رد آلي." : "The request arrived. There is no automatic reply."}</p>}
      {status === "error" && <p role="alert">{ar ? "لم يُحفظ الطلب. أعد المحاولة." : "The request was not saved. Try again."}</p>}
    </form>
  );
}

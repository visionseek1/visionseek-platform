"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function InquiryForm() {
  const [prepared, setPrepared] = useState(false);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) return;
    const subject = encodeURIComponent("VisionSeek — استفسار من " + name);
    const body = encodeURIComponent(`الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\n${message}`);
    window.location.assign(`mailto:abdelalim@visionseek.org?subject=${subject}&body=${body}`);
    setPrepared(true);
  }

  return (
    <div className="inquiry-panel">
      <div className="inquiry-intro">
        <h3>أخبرنا عن فكرتك</h3>
        <p lang="en" className="english">START AN INQUIRY</p>
        <p>رسالة قصيرة قد تكون بداية شيء مهم.</p>
      </div>
      <form className="inquiry-form" action="mailto:abdelalim@visionseek.org" method="post" encType="text/plain" onSubmit={prepareEmail} onChange={() => setPrepared(false)} aria-describedby="inquiry-note">
        <div className="inquiry-inputs">
          <label htmlFor="inquiry-name">الاسم <span lang="en">NAME</span>
            <Input id="inquiry-name" name="name" required pattern=".*\S.*" maxLength={80} autoComplete="name" dir="auto" />
          </label>
          <label htmlFor="inquiry-email">البريد الإلكتروني <span lang="en">EMAIL</span>
            <Input id="inquiry-email" name="email" type="email" required maxLength={180} autoComplete="email" dir="ltr" />
          </label>
        </div>
        <label htmlFor="inquiry-message">استفسارك <span lang="en">MESSAGE</span>
          <Textarea id="inquiry-message" name="message" required maxLength={800} rows={5} dir="auto" onInput={(event) => event.currentTarget.setCustomValidity(event.currentTarget.value.trim() ? "" : "يرجى كتابة استفسارك.")} />
        </label>
        <p id="inquiry-note" className="inquiry-note">يفتح الزر رسالة جاهزة إلى abdelalim@visionseek.org في تطبيق بريدك؛ أكمل الإرسال من هناك. لا يتم إرسال الرسالة تلقائيًا من الموقع.</p>
        <Button className="inquiry-submit" type="submit">متابعة عبر البريد <span aria-hidden="true">↗</span></Button>
        {prepared && <p role="status" className="inquiry-status">تم تجهيز الرسالة، وليس إرسالها. إذا لم يفتح تطبيق البريد، راسلنا على <a href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a>.</p>}
        <noscript><p>يمكنك مراسلتنا مباشرة على <a href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a>.</p></noscript>
      </form>
    </div>
  );
}

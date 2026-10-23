'use client';
import type {FormEvent} from 'react';

export default function JoinForm({ar}: {ar: boolean}) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const role = String(data.get('role') ?? '').trim();
    const work = String(data.get('work') ?? '').trim();
    const body = ar
      ? `الاسم: ${name}\nالإيميل: ${email}\nالدور: ${role}\nلينك لشغل سابق: ${work}`
      : `Name: ${name}\nEmail: ${email}\nRole: ${role}\nLink to past work: ${work}`;
    const subject = ar ? 'VisionSeek — انضم لمسابقة' : 'VisionSeek — join a competition';
    window.location.href = `mailto:abdelalim@visionseek.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return (
    <form className="vs-comp-form" onSubmit={onSubmit}>
      <p>{ar ? 'الفورم بيفتح مسودة على abdelalim@visionseek.org. الإرسال بيحصل من بريدك، مش أوتوماتيك.' : 'This opens a draft to abdelalim@visionseek.org. You send it from your mail app. Nothing is submitted automatically.'}</p>
      <label>{ar ? 'الاسم' : 'Name'}<input name="name" required autoComplete="name"/></label>
      <label>{ar ? 'الإيميل' : 'Email'}<input name="email" type="email" required autoComplete="email"/></label>
      <label>{ar ? 'الدور' : 'Role'}<input name="role" required/></label>
      <label>{ar ? 'لينك لشغل سابق' : 'Link to past work'}<input name="work" type="url" inputMode="url" placeholder="https://"/></label>
      <button type="submit">{ar ? 'افتح مسودة الإيميل' : 'Open email draft'}</button>
    </form>
  );
}

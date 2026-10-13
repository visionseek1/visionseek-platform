'use client';
import {useRef, useState, type FormEvent} from 'react';
import {ArrowRight, Mail, MessageCircle} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import type {Locale} from '@/lib/identity';
import {site, whatsappUrl} from '@/lib/site';

/**
 * The request for the introductory session. Nothing is sent from the site: the visitor prepares the message here,
 * then sends it from WhatsApp or email in their own hands, as on /start.
 */
export default function InitiativeForm({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const [message, setMessage] = useState('');
  const result = useRef<HTMLDivElement>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget); const get = (key: string) => String(data.get(key) || '').trim();
    setMessage([
      ar ? 'مرحبًا د. أحمد، أطلب الجلسة التعريفية من مبادرة VisionSeek لبناء القدرات العربية.' : 'Hello Dr. Ahmed, I would like to request the introductory session of the VisionSeek Arab Capability Initiative.',
      get('name') ? `${ar ? 'الاسم' : 'Name'}: ${get('name')}` : '',
      get('organization') ? `${ar ? 'المؤسسة' : 'Institution'}: ${get('organization')}` : '',
      get('role') ? `${ar ? 'المنصب' : 'Role'}: ${get('role')}` : '',
      `${ar ? 'ما أريد أن تركّز عليه الجلسة' : 'What I want the session to focus on'}: ${get('focus')}`,
      get('days') ? `${ar ? 'الأيام المناسبة' : 'Days that suit me'}: ${get('days')}` : '',
      ar ? 'ما الموعد المناسب؟' : 'When would suit you?'
    ].filter(Boolean).join('\n\n'));
    window.setTimeout(() => result.current?.focus(), 0);
  }
  const subject = ar ? 'طلب الجلسة التعريفية — VisionSeek' : 'Introductory session request — VisionSeek';
  return <section className="vs-start-layout vs-initiative-form" id="request">
    <div className="vs-start-form">
      <h2>{ar ? 'احكِ لنا باختصار' : 'Tell us a little'}</h2>
      <form onSubmit={prepare} onChange={() => setMessage('')}>
        <div className="vs-form-identity">
          <label>{ar ? 'اسمك' : 'Your name'}<Input name="name" autoComplete="name" maxLength={80}/></label>
          <label>{ar ? 'المؤسسة' : 'Institution'}<Input name="organization" autoComplete="organization" maxLength={100}/></label>
          <label>{ar ? 'منصبك' : 'Your role'}<Input name="role" autoComplete="organization-title" maxLength={80}/></label>
        </div>
        <label>{ar ? 'على ماذا تريد أن تركّز الجلسة؟ (مطلوب)' : 'What should the session focus on? (required)'}<Textarea name="focus" required maxLength={600} rows={5} dir="auto" placeholder={ar ? 'مثال: قراراتنا بطيئة لأن المعلومات موزعة بين أنظمة مختلفة.' : 'Example: Our decisions are slow because information sits in separate systems.'} onInput={e => e.currentTarget.setCustomValidity(e.currentTarget.value.trim() ? '' : ar ? 'اكتب سطرًا واحدًا على الأقل.' : 'Please write at least one line.')}/></label>
        <label>{ar ? 'ما الأيام المناسبة لك؟ (اختياري)' : 'Which days suit you? (optional)'}<Input name="days" maxLength={120}/></label>
        <p className="vs-start-hint">{ar ? 'تجنّب المعلومات السرية. بعد تجهيز الرسالة تختار إرسالها من واتساب أو البريد.' : 'Leave out confidential information. After preparing your message, choose WhatsApp or email to send it.'}</p>
        <button type="submit" className="vs-button">{ar ? 'جهّز رسالتي' : 'Prepare my message'}<ArrowRight size={18}/></button>
      </form>
      {message && <div className="vs-start-result" ref={result} tabIndex={-1}>
        <h3>{ar ? 'رسالتك جاهزة — اختر وسيلة الإرسال' : 'Your message is ready — choose how to send it'}</h3>
        <p role="status">{ar ? 'لم تُرسل بعد. افتح واتساب أو البريد، وراجع الرسالة واضغط إرسال هناك.' : 'Not sent yet. Open WhatsApp or email, review your message and send it there.'}</p>
        <pre dir="auto">{message}</pre>
        <div className="vs-start-actions"><a className="vs-button" target="_blank" rel="noreferrer" href={whatsappUrl(message)}><MessageCircle size={18}/>{ar ? 'افتح الرسالة في واتساب' : 'Open message in WhatsApp'}</a><a className="vs-secondary-button" href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}><Mail size={18}/>{ar ? 'افتح الرسالة في البريد' : 'Open message in email'}</a></div>
      </div>}
    </div>
    <aside className="vs-start-direct">
      <p className="vs-eyebrow">{ar ? 'تفضّل أن نتحدث أولًا؟' : 'PREFER TO TALK FIRST?'}</p>
      <h2>{ar ? 'تواصل مع د. أحمد مباشرة.' : 'Contact Dr. Ahmed directly.'}</h2>
      <a className="vs-button" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{ar ? 'تواصل عبر واتساب' : 'Contact on WhatsApp'}</a>
      <a className="vs-direct-email" href={`mailto:${site.email}`}>{site.email}</a>
      <span dir="ltr">{site.phoneDisplay}</span>
      <p className="vs-start-hint">{ar ? site.locationHint.ar : site.locationHint.en}</p>
    </aside>
  </section>;
}

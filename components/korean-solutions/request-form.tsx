'use client';
import {useState} from 'react';
import styles from './ks.module.css';

type Locale = 'ar' | 'en';
type Kind = 'need' | 'solution';
const SECTORS: [string, string][] = [['الصحة', 'Health'], ['الرعاية الاجتماعية', 'Social care'], ['الأمن والمدن', 'Security & cities'], ['الزراعة والغذاء', 'Agriculture & food'], ['الطاقة', 'Energy'], ['التصنيع', 'Manufacturing'], ['مجال آخر', 'Another field']];

/**
 * «احتياجك» (a regional need) and «اطلب هذا الحل» (ask for one solution).
 * The request is recorded as a new lead in the operations platform. Nothing is sent back automatically:
 * the VisionSeek team replies by hand.
 */
export default function RequestForm({locale, kind, solution}: {locale: Locale; kind: Kind; solution?: {slug: string; title: string}}) {
  const ar = locale === 'ar';
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'missing' | 'email' | 'error'>('idle');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) || '').trim();
    const body = {kind, locale, org: g('org'), country: g('country'), email: g('email'), sector: g('sector'), need: g('need'), solution: solution?.slug || '', website: g('website')};
    if (!body.org || (kind === 'need' && !body.need)) { setState('missing'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email)) { setState('email'); return; }
    setState('busy');
    try {
      const res = await fetch('/api/korean-solutions/request', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(body)});
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) setState('done');
      else setState(j.error === 'email' ? 'email' : j.error === 'missing' ? 'missing' : 'error');
    } catch { setState('error'); }
  }
  const id = `ks-${kind}-${locale}`;
  if (state === 'done') return <p className={styles.done} role="status">{ar
    ? 'وصل طلبك إلى فريق VisionSeek. سيقرؤه أحد أفراد الفريق ويكتب لك بنفسه.'
    : 'Your request has reached the VisionSeek team. One of us will read it and write to you personally.'}</p>;
  const msg = state === 'missing' ? (ar ? (kind === 'need' ? 'اكتب اسم المؤسسة والاحتياج.' : 'اكتب اسم المؤسسة.') : (kind === 'need' ? 'Please add your organisation and your need.' : 'Please add your organisation.'))
    : state === 'email' ? (ar ? 'اكتب بريدًا إلكترونيًا صحيحًا.' : 'Please enter a valid email address.')
    : state === 'error' ? (ar ? 'لم يصل الطلب. جرّب مرة أخرى بعد قليل.' : 'The request did not go through. Please try again shortly.') : '';
  return <form className={styles.form} onSubmit={submit} noValidate aria-describedby={`${id}-note`}>
    <label className={kind === 'need' ? '' : styles.wide}>{ar ? 'المؤسسة' : 'Organisation'}<input name="org" autoComplete="organization" required maxLength={200}/></label>
    <label className={kind === 'need' ? '' : styles.wide}>{ar ? 'البلد' : 'Country'}<input name="country" autoComplete="country-name" maxLength={80}/></label>
    {kind === 'need' && <label>{ar ? 'المجال' : 'Field'}<select name="sector" defaultValue="الصحة">{SECTORS.map(([a, e]) => <option key={a} value={a}>{ar ? a : e}</option>)}</select></label>}
    <label className={kind === 'need' ? '' : styles.wide}>{ar ? 'البريد الإلكتروني' : 'Email'}<input name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} dir="ltr"/></label>
    {kind === 'need'
      ? <label className={styles.wide}>{ar ? 'المشكلة أو الاحتياج' : 'The problem or need'}<textarea name="need" rows={4} required maxLength={2000}/></label>
      : <label className={styles.wide}>{ar ? 'رسالة (اختياري)' : 'Message (optional)'}<textarea name="need" rows={3} maxLength={2000}/></label>}
    <div className={styles.trap} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    {msg && <p className={`${styles.bad} ${styles.wide}`} role="alert">{msg}</p>}
    <div className={`${styles.send} ${styles.wide}`}>
      <button type="submit" disabled={state === 'busy'}>{kind === 'need' ? (ar ? 'ابعت احتياجك' : 'Send your need') : (ar ? 'ابعت الطلب' : 'Send the request')}</button>
      <span id={`${id}-note`} className={styles.fine}>{ar ? 'يصل إلى فريق VisionSeek مباشرة. لا رسائل آلية.' : 'It goes straight to the VisionSeek team. No automated messages.'}</span>
    </div>
  </form>;
}

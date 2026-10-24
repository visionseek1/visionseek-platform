'use client';
import {useEffect, useId, useState, type FormEvent, type ReactNode} from 'react';
import {mailto, site, whatsappUrl} from '@/lib/site';
import {BUYERS, CAR_TYPES, COUNTRIES, MAX, REQUEST_FIELDS, REQUEST_LABELS, REQUIRED, TIMELINES, composeRequest, requestProblems, type Bi, type RequestKey, type RequestKind, type RequestProblem, type RequestValues} from '@/lib/requests';
import styles from './request-form.module.css';

type Locale = 'ar' | 'en';
export type RequestOption = {value: string; label: Bi};

/** Other parts of the page (a category tile) fill the form through this event. */
export const REQUEST_PREFILL = 'vs-request-prefill';
export const prefillRequest = (values: RequestValues) => window.dispatchEvent(new CustomEvent(REQUEST_PREFILL, {detail: values}));

const WIDE = new Set<RequestKey>(['buyer', 'product', 'car', 'details', 'link']);

const PLACEHOLDER: Partial<Record<RequestKey, Bi>> = {
  phone: {ar: '+20 أو +966 أو …', en: '+20, +966, …'},
  company: {ar: 'الاسم كما يُكتب في التعامل', en: 'The name you use in business'},
  product: {ar: 'مثال: قطع غيار لخط إنتاج', en: 'e.g. spare parts for a production line'},
  quantity: {ar: 'عدد القطع أو الوزن — ولو تقدير', en: 'Units or weight — an estimate is fine'},
  car: {ar: 'الماركة والموديل والسنة', en: 'Brand, model and year'},
  budget: {ar: 'المبلغ والعملة', en: 'Amount and currency'},
  details: {ar: 'المقاس، الخامة، الاستخدام، وأي شهادة مطلوبة', en: 'Size, material, use, and any certificate you need'},
  link: {ar: 'https://', en: 'https://'},
};

const HINT: Partial<Record<RequestKey, Bi>> = {
  quantity: {ar: 'الطلب الأول يكفي. لو في تصوّر لاحق اكتبه هنا.', en: 'The first order is enough. Add a later volume if you have one.'},
  budget: {ar: 'اختياري. يساعدنا نعرف إن كان العرض في المدى ولا لأ.', en: 'Optional. It helps us see whether an offer is in range.'},
  link: {ar: 'رابط لمنتج مشابه، أو لملف مواصفات أو صورة على Google Drive أو غيره.', en: 'A link to a similar product, or to a spec file or photo on Google Drive or similar.'},
};

const INVALID: Partial<Record<RequestKey, Bi>> = {
  email: {ar: 'اكتب بريدًا صحيحًا، مثل name@example.com', en: 'Use a valid email, like name@example.com'},
  phone: {ar: 'اكتب رقمًا صحيحًا، ويُفضّل بمفتاح الدولة.', en: 'Use a valid number, ideally with the country code.'},
  link: {ar: 'الرابط يبدأ بـ https://', en: 'Links start with https://'},
};

type Props = {
  locale: Locale;
  kind: RequestKind;
  /** The page the request comes from, written into the email. */
  page: string;
  /** What the request is about when the page already knows it: a listed car, a solution. */
  about?: string;
  categories?: RequestOption[];
  defaults?: RequestValues;
  /** Fields the page already answers: sent as they are, not shown. */
  hide?: RequestKey[];
  /** Also file the request on the leads board through the existing endpoint. Live site only. */
  record?: boolean;
};

export default function RequestForm({locale, kind, page, about, categories = [], defaults = {}, hide = [], record = false}: Props) {
  const ar = locale === 'ar';
  const t = (b: Bi) => (ar ? b.ar : b.en);
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;
  const [picked, setPicked] = useState<RequestValues>({
    buyer: defaults.buyer || '',
    category: defaults.category || '',
    carType: defaults.carType || '',
    timeline: defaults.timeline || '',
    company: defaults.company || '',
  });
  const [problems, setProblems] = useState<RequestProblem[]>([]);
  const [ready, setReady] = useState<{subject: string; body: string; url: string} | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<RequestValues>).detail || {};
      setPicked(prev => ({...prev, ...detail}));
      setReady(null);
    };
    window.addEventListener(REQUEST_PREFILL, onPrefill);
    return () => window.removeEventListener(REQUEST_PREFILL, onPrefill);
  }, []);

  const fields = REQUEST_FIELDS[kind].filter(k => !hide.includes(k) && !(about && (k === 'product' || k === 'car')));
  const problemOf = (k: RequestKey) => problems.find(p => p.key === k);
  const nameOf = (list: RequestOption[], v: string) => { const o = list.find(x => x.value === v); return o ? t(o.label) : v; };

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get('website') || '')) return;
    const values: RequestValues = {};
    for (const k of REQUEST_FIELDS[kind]) values[k] = String(data.get(k) || '');
    const found = requestProblems(kind, values, about);
    setProblems(found);
    if (found.length) {
      setReady(null);
      const first = form.elements.namedItem(found[0].key);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    const mail = composeRequest({locale, kind, values, about, page, display: {
      country: v => nameOf(COUNTRIES, v),
      category: v => nameOf(categories, v),
      carType: v => nameOf(CAR_TYPES, v),
      buyer: v => nameOf(BUYERS, v),
      timeline: v => nameOf(TIMELINES, v),
    }});
    if (record) {
      fetch('/api/korean-solutions/request', {
        method: 'POST', keepalive: true, headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          kind: 'need', locale,
          org: values.company || values.name,
          country: values.country, email: values.email,
          sector: kind === 'korea' ? values.category : 'السيارات',
          need: mail.note, website: '',
        }),
      }).catch(() => {});
    }
    const url = mailto(mail.subject, mail.body);
    setReady({subject: mail.subject, body: mail.body, url});
    setCopied(false);
    window.location.assign(url);
  }

  async function copy() {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(`${ready.subject}\n\n${ready.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const field = (k: RequestKey) => {
    if (k === 'company' && picked.buyer !== 'company') return null;
    const required = REQUIRED.includes(k) || (k === 'company' && picked.buyer === 'company');
    const problem = problemOf(k);
    const hint = HINT[k];
    const describedBy = [hint && fid(`${k}-hint`), problem && fid(`${k}-error`)].filter(Boolean).join(' ') || undefined;
    const common = {id: fid(k), name: k, 'aria-invalid': problem ? true : undefined, 'aria-required': required || undefined, 'aria-describedby': describedBy};
    const ph = PLACEHOLDER[k];
    const placeholder = ph ? t(ph) : undefined;
    const mark = required
      ? <span className={styles.req} aria-hidden="true"> *</span>
      : <span className={styles.opt}> {ar ? '(اختياري)' : '(optional)'}</span>;
    const title = <>{t(REQUEST_LABELS[k])}{mark}</>;
    const after = <>
      {hint && <span id={fid(`${k}-hint`)} className={styles.hint}>{t(hint)}</span>}
      {problem && <span id={fid(`${k}-error`)} className={styles.error}>{problem.reason === 'missing' ? (ar ? 'هذا الحقل مطلوب.' : 'This field is required.') : t(INVALID[k] || {ar: 'القيمة غير صحيحة.', en: 'This value is not valid.'})}</span>}
    </>;
    if (k === 'buyer') return <fieldset key={k} className={`${styles.field} ${styles.wide} ${styles.choiceSet}`}>
      <legend id={fid(k)}>{title}</legend>
      <div className={styles.choice} role="radiogroup" aria-labelledby={fid(k)} aria-required={true} aria-invalid={problem ? true : undefined}>
        {BUYERS.map(b => {
          const on = picked.buyer === b.value;
          return <label key={b.value} className={on ? styles.choiceOn : undefined}>
            <input type="radio" name="buyer" value={b.value} checked={on}
              onChange={() => { setPicked(p => ({...p, buyer: b.value})); setProblems(prev => prev.filter(x => x.key !== 'buyer' && x.key !== 'company')); }}/>
            <b>{t(b.label)}</b>
            <span>{t(b.hint)}</span>
          </label>;
        })}
      </div>
      {after}
    </fieldset>;
    let control: ReactNode;
    if (k === 'country') control = <select {...common} defaultValue={defaults.country || ''} autoComplete="country-name">
      <option value="" disabled>{ar ? 'اختر البلد' : 'Choose a country'}</option>
      {COUNTRIES.map(c => <option key={c.value} value={c.value}>{t(c.label)}</option>)}
    </select>;
    else if (k === 'category') control = <select {...common} value={picked.category || ''} onChange={e => setPicked(p => ({...p, category: e.target.value}))}>
      <option value="">{ar ? 'اختر المجال' : 'Choose a field'}</option>
      {categories.map(c => <option key={c.value} value={c.value}>{t(c.label)}</option>)}
    </select>;
    else if (k === 'carType') control = <select {...common} value={picked.carType || ''} onChange={e => setPicked(p => ({...p, carType: e.target.value}))}>
      <option value="">{ar ? 'اختر النوع' : 'Choose a type'}</option>
      {CAR_TYPES.map(c => <option key={c.value} value={c.value}>{t(c.label)}</option>)}
    </select>;
    else if (k === 'timeline') control = <select {...common} value={picked.timeline || ''} onChange={e => setPicked(p => ({...p, timeline: e.target.value}))}>
      <option value="">{ar ? 'اختر موعدًا إن وجد' : 'Choose a timing if you have one'}</option>
      {TIMELINES.map(c => <option key={c.value} value={c.value}>{t(c.label)}</option>)}
    </select>;
    else if (k === 'details') control = <textarea {...common} rows={4} maxLength={MAX.details} defaultValue={defaults.details} placeholder={placeholder} dir="auto"/>;
    else control = <input {...common} maxLength={MAX[k]} defaultValue={k === 'company' ? (picked.company || defaults.company || '') : defaults[k]} placeholder={placeholder}
      type={k === 'email' ? 'email' : k === 'phone' ? 'tel' : k === 'link' ? 'url' : 'text'}
      inputMode={k === 'email' ? 'email' : k === 'phone' ? 'tel' : k === 'link' ? 'url' : undefined}
      autoComplete={k === 'name' ? 'name' : k === 'company' ? 'organization' : k === 'email' ? 'email' : k === 'phone' ? 'tel' : 'off'}
      dir={k === 'email' || k === 'phone' || k === 'link' ? 'ltr' : 'auto'}/>;
    return <div key={k} className={`${styles.field} ${WIDE.has(k) ? styles.wide : ''}`}>
      <label htmlFor={fid(k)}>{title}</label>
      {control}
      {after}
    </div>;
  };

  return <form className={styles.form} onSubmit={submit} noValidate onChange={e => {
    const name = 'name' in e.target ? String((e.target as {name: string}).name) : '';
    if (name && problems.some(p => p.key === name)) setProblems(prev => prev.filter(p => p.key !== name));
    if (ready) setReady(null);
  }}>
    {about && <p className={styles.about}><span>{ar ? 'بخصوص' : 'About'}</span><b dir="auto">{about}</b></p>}
    <div className={styles.grid}>
      {fields.map(field)}
      {hide.map(k => defaults[k] ? <input key={k} type="hidden" name={k} value={defaults[k]}/> : null)}
    </div>
    <div className={styles.trap} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    {problems.length > 0 && <p className={styles.alert} role="alert">{ar ? 'راجع الحقول المعلّمة، ثم أعد المحاولة.' : 'Please check the highlighted fields and try again.'}</p>}
    <div className={styles.send}>
      <button type="submit">{ar ? 'أرسل عبر البريد' : 'Send by email'} <span aria-hidden="true">↗</span></button>
      <p className={styles.fine}>{ar
        ? <>يفتح الزر رسالة جاهزة إلى <span dir="ltr">{site.email}</span> في تطبيق بريدك، ولا يُرسَل شيء قبل أن تضغط «إرسال» هناك. نرد عليك بأنفسنا.</>
        : <>The button opens a ready email to {site.email} in your email app; nothing is sent until you press Send there. We reply personally.</>}</p>
    </div>
    {ready && <div className={styles.ready} role="status">
      <p><b>{ar ? 'رسالتك جاهزة.' : 'Your email is ready.'}</b> {ar
        ? <>يفترض أن يفتح تطبيق البريد الآن وفيه طلبك إلى <span dir="ltr">{site.email}</span>. اضغط «إرسال» ليصلنا.</>
        : <>Your email app should open now with your request to {site.email}. Press Send to deliver it.</>}</p>
      <p className={styles.readyAsk}>{ar ? 'لم يفتح البريد؟' : 'Did your email app not open?'}</p>
      <div className={styles.readyActions}>
        <a href={ready.url}>{ar ? 'افتح الرسالة مرة أخرى' : 'Open the email again'}</a>
        <button type="button" onClick={copy}>{copied ? (ar ? 'تم النسخ ✓' : 'Copied ✓') : (ar ? 'انسخ نص الطلب' : 'Copy the request')}</button>
        <a href={whatsappUrl(`${ready.subject}\n\n${ready.body}`)} target="_blank" rel="noreferrer">{ar ? 'أرسله على واتساب' : 'Send it on WhatsApp'}</a>
      </div>
    </div>}
    <noscript><p className={styles.fine}>{ar ? 'راسلنا مباشرة على ' : 'Email us directly at '}<a href={`mailto:${site.email}`}>{site.email}</a></p></noscript>
  </form>;
}

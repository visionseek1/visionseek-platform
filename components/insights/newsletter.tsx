'use client';
import {useState} from 'react';
import styles from './insights.module.css';
import type {Bi} from '@/lib/insights';

/**
 * The monthly-letter sign-up. It only records the address (in the operations platform);
 * nothing is ever sent to subscribers from the site — sending waits for Dr. Ahmed's approval.
 */
export default function Newsletter({locale, copy, page}: {locale: 'ar' | 'en'; copy: Record<'title' | 'text' | 'label' | 'button' | 'privacy' | 'success' | 'exists' | 'invalid' | 'error', Bi>; page: string}) {
  const ar = locale === 'ar';
  const tx = (v: Bi) => (ar ? v.ar : v.en);
  const [state, setState] = useState<'idle' | 'busy' | 'added' | 'exists' | 'invalid' | 'error'>('idle');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setState('invalid'); return; }
    setState('busy');
    try {
      const res = await fetch('/api/newsletter', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({email, locale, page, website: String(form.get('website') || '')})});
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) setState(j.status === 'exists' ? 'exists' : 'added');
      else setState(j.error === 'email' ? 'invalid' : 'error');
    } catch { setState('error'); }
  }
  const msg = state === 'added' ? copy.success : state === 'exists' ? copy.exists : state === 'invalid' ? copy.invalid : state === 'error' ? copy.error : null;
  const id = `nl-${locale}`;
  return <section id="newsletter" className={styles.letter} aria-labelledby={`${id}-title`}>
    <div><h2 id={`${id}-title`}>{tx(copy.title)}</h2><p>{tx(copy.text)}</p></div>
    {state === 'added' || state === 'exists' ? <p className={styles.form} role="status"><span className={styles.ok}>{msg && tx(msg)}</span></p> :
    <form className={styles.form} onSubmit={submit} noValidate>
      <label htmlFor={id}>{tx(copy.label)}</label>
      <div className={styles.field}>
        <input id={id} name="email" type="email" autoComplete="email" inputMode="email" placeholder="name@organization.com" required aria-describedby={`${id}-note`}/>
        <button type="submit" disabled={state === 'busy'}>{tx(copy.button)}</button>
      </div>
      <div className={styles.trap} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      {msg ? <p className={styles.bad} role="alert">{tx(msg)}</p> : null}
      <p id={`${id}-note`} className={styles.fine}>{tx(copy.privacy)}</p>
    </form>}
  </section>;
}

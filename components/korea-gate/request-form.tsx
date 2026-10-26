'use client';

import {useState, type FormEvent} from 'react';
import {COUNTRIES, TYPES, request, tx, type Locale} from '@/lib/korea-gate';
import styles from './korea-gate.module.css';

/**
 * KOREA_GATE_INTAKE_WIRING_PENDING_APPROVAL
 * Preview-only intake. The form must not send data anywhere external
 * (no email, no GHL, no webhook, no database write) until Ahmed approves wiring.
 */
const KOREA_GATE_INTAKE_WIRING_PENDING_APPROVAL = true;

export function KoreaGateRequestForm({locale}: {locale: Locale}) {
  const t = tx(locale);
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (KOREA_GATE_INTAKE_WIRING_PENDING_APPROVAL) {
      setDone(true);
      return;
    }
  }

  if (done) {
    return (
      <div className={styles.done} role="status">
        <h3>{t(request.doneTitle)}</h3>
        <p>{t(request.doneBody)}</p>
        <button type="button" className={styles.ghost} onClick={() => setDone(false)}>
          {t(request.another)}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <label className={styles.field}>
        {t(request.org)}
        <input name="org" type="text" required autoComplete="organization"/>
      </label>
      <label className={styles.field}>
        {t(request.type)}
        <select name="type" required defaultValue="">
          <option value="" disabled/>
          {TYPES.map(item => <option key={item.value} value={item.value}>{t(item.label)}</option>)}
        </select>
      </label>
      <label className={styles.field}>
        {t(request.country)}
        <select name="country" required defaultValue="">
          <option value="" disabled/>
          {COUNTRIES.map(item => <option key={item.value} value={item.value}>{t(item.label)}</option>)}
        </select>
      </label>
      <label className={styles.field}>
        {t(request.need)}
        <input name="need" type="text" required maxLength={280}/>
      </label>
      <button className={styles.primary} type="submit">{t(request.submit)}</button>
    </form>
  );
}

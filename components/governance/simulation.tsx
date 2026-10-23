'use client';

import {useState} from 'react';
import {tx, type Bi, type Locale, workshop} from '@/lib/governance';
import styles from './governance.module.css';

const copy = workshop.simulation;

function splitDecision(template: string) {
  const [before, after = ''] = template.split('{decision}');
  return {before, after};
}

export function Simulation({locale}: {locale: Locale}) {
  const t = (value: Bi) => tx(locale, value);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'edit' | 'single' | 'open'>('edit');
  const [error, setError] = useState(false);
  const decision = text.trim();
  const single = splitDecision(t(copy.singleTemplate));

  function showSingle() {
    if (!decision) {
      setError(true);
      return;
    }
    setError(false);
    setPhase('single');
  }

  function reset() {
    setText('');
    setPhase('edit');
    setError(false);
  }

  return (
    <form
      className={styles.sim}
      onSubmit={event => {
        event.preventDefault();
        showSingle();
      }}
    >
      <p>{t(copy.intro)}</p>
      <label className={styles.field}>
        {t(copy.fieldLabel)}
        <textarea
          name="decision"
          maxLength={500}
          value={text}
          placeholder={t(copy.placeholder)}
          dir="auto"
          onChange={event => {
            setText(event.target.value);
            if (event.target.value.trim()) setError(false);
          }}
        />
      </label>
      <div className={styles.actions}>
        <button type="submit" className={styles.button}>
          {t(copy.submit)}
        </button>
        {phase !== 'edit' && (
          <button type="button" className={styles.quiet} onClick={reset}>
            {t(copy.another)}
          </button>
        )}
      </div>
      {error && (
        <p className={styles.alert} role="alert">
          {t(copy.empty)}
        </p>
      )}
      {phase !== 'edit' && decision && (
        <div className={styles.single}>
          <h3>{t(copy.singleHeading)}</h3>
          <p className={styles.answer}>
            {single.before}
            <span className={styles.decision} dir="auto">
              {decision}
            </span>
            {single.after}
          </p>
          <p className={styles.fine}>{t(copy.disclaimer)}</p>
          {phase === 'single' && (
            <div className={styles.actions}>
              <button type="button" className={styles.lime} onClick={() => setPhase('open')}>
                {t(copy.reveal)}
              </button>
            </div>
          )}
        </div>
      )}
      {phase === 'open' && decision && (
        <>
          <div className={styles.tableWrap}>
            <table>
              <caption>{t(copy.tableCaption)}</caption>
              <thead>
                <tr>
                  <th scope="col">{t(copy.columns.method)}</th>
                  <th scope="col">{t(copy.columns.cost)}</th>
                  <th scope="col">{t(copy.columns.risk)}</th>
                  <th scope="col">{t(copy.columns.fits)}</th>
                </tr>
              </thead>
              <tbody>
                {copy.approaches.map(item => (
                  <tr key={item.title.en}>
                    <th scope="row">{t(item.title)}</th>
                    <td>{t(item.cost)}</td>
                    <td>{t(item.risk)}</td>
                    <td>{t(item.fits)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.cards}>
            <p>{t(copy.tableCaption)}</p>
            {copy.approaches.map(item => (
              <article key={item.title.en} className={styles.approach}>
                <h3>{t(item.title)}</h3>
                <dl>
                  <dt>{t(copy.columns.cost)}</dt>
                  <dd>{t(item.cost)}</dd>
                  <dt>{t(copy.columns.risk)}</dt>
                  <dd>{t(item.risk)}</dd>
                  <dt>{t(copy.columns.fits)}</dt>
                  <dd>{t(item.fits)}</dd>
                </dl>
              </article>
            ))}
          </div>
        </>
      )}
    </form>
  );
}

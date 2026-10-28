'use client';

import {useState} from 'react';
import {mailto} from '@/lib/site';
import {contactSubject, diagnosticQuestions, diagnosticUi, pillars, tx, type Pillar, type PublicLocale} from '@/lib/public-site';

export function DiagnosticTool({locale}: {locale: PublicLocale}) {
  const [answers, setAnswers] = useState<Record<number, 'protected' | 'exposed'>>({});
  const resultFor = (pillar: Pillar) => {
    const indexes = diagnosticQuestions.map((question, index) => question.pillar === pillar.slug ? index : -1).filter(index => index >= 0);
    if (indexes.some(index => !answers[index])) return null;
    const exposed = indexes.filter(index => answers[index] === 'exposed').length;
    if (exposed === 0) return tx(locale, diagnosticUi.contained);
    if (exposed === 1) return tx(locale, diagnosticUi.open);
    return tx(locale, diagnosticUi.critical);
  };
  return <div className="vs-diagnostic">
    {diagnosticQuestions.map((question, index) => <fieldset key={question.text.en}>
      <legend>{tx(locale, question.text)}</legend>
      <div className="vs-choice-row">
        <button type="button" aria-pressed={answers[index] === 'protected'} onClick={() => setAnswers(current => ({...current, [index]: 'protected'}))}>{tx(locale, diagnosticUi.protected)}</button>
        <button type="button" aria-pressed={answers[index] === 'exposed'} onClick={() => setAnswers(current => ({...current, [index]: 'exposed'}))}>{tx(locale, diagnosticUi.exposed)}</button>
      </div>
    </fieldset>)}
    <section aria-label={tx(locale, diagnosticUi.result)}>
      <h2>{tx(locale, diagnosticUi.result)}</h2>
      <div className="vs-result-grid">{pillars.map(pillar => {
        const result = resultFor(pillar);
        return <article key={pillar.slug}><h3>{tx(locale, pillar.title)}</h3><strong>{result ?? tx(locale, diagnosticUi.unanswered)}</strong></article>;
      })}</div>
      <p className="vs-gov-actions"><a className="vs-button" href={mailto(contactSubject)}>{tx(locale, diagnosticUi.contact)}</a></p>
    </section>
  </div>;
}

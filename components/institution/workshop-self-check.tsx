'use client';

import {useState} from 'react';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';

type Bi = {en: string; ar: string};
type Locale = 'en' | 'ar';
export type SelfCheckDoor = 'leader' | 'institution' | 'development';
export type SelfCheckCopy = {
  label: Bi;
  title: Bi;
  intro: Bi;
  questions: {q: Bi; options: {door: SelfCheckDoor; label: Bi}[]}[];
  resultLabel: Bi;
  openDoor: Bi;
  start: Bi;
  restart: Bi;
};
export type SelfCheckDoorInfo = {name: Bi; line: Bi; href: string; startHref: string};

/**
 * Four routing questions that point the visitor to one of the three doors.
 * Nothing is sent or stored; the result is a link to a page that already exists. Copy is edited from /admin.
 */
export function WorkshopSelfCheck({locale, copy, doors}: {locale: Locale; copy: SelfCheckCopy; doors: Record<SelfCheckDoor, SelfCheckDoorInfo>}) {
  const t = (value: Bi) => value[locale];
  const [answers, setAnswers] = useState<(SelfCheckDoor | null)[]>(() => copy.questions.map(() => null));
  const answered = answers.filter(Boolean).length;
  const done = answered === copy.questions.length;
  const tally: Record<SelfCheckDoor, number> = {leader: 0, institution: 0, development: 0};
  for (const answer of answers) if (answer) tally[answer] += 1;
  const order: SelfCheckDoor[] = ['leader', 'institution', 'development'];
  const winner = order.reduce((best, door) => (tally[door] > tally[best] ? door : best), order[0]);
  const result = doors[winner];

  return (
    <section className="vs-wl-check" id="self-check" aria-labelledby="wl-check-title">
      <div className="vs-wl-check-intro">
        <p className="vs-wl-code">{t(copy.label)}</p>
        <h2 id="wl-check-title">{t(copy.title)}</h2>
        <p className="vs-wl-lede">{t(copy.intro)}</p>
      </div>
      <div className="vs-wl-check-body">
        {copy.questions.map((question, index) => (
          <fieldset className="vs-wl-check-q" key={question.q.en}>
            <legend><span className="vs-wl-step-n">{String(index + 1).padStart(2, '0')}</span>{t(question.q)}</legend>
            <div className="vs-wl-check-options">
              {question.options.map(option => {
                const id = `wl-check-${index}-${option.door}`;
                return (
                  <label htmlFor={id} key={id} className={answers[index] === option.door ? 'is-on' : undefined}>
                    <input type="radio" id={id} name={`wl-check-${index}`} value={option.door} checked={answers[index] === option.door} onChange={() => setAnswers(current => current.map((value, i) => (i === index ? option.door : value)))} />
                    <span>{t(option.label)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
        <div className="vs-wl-check-result" aria-live="polite">
          {done ? (
            <>
              <p className="vs-wl-code">{t(copy.resultLabel)}</p>
              <strong>{t(result.name)}</strong>
              <p>{t(result.line)}</p>
              <div className="vs-wl-actions">
                <Link className="vs-wl-btn is-lime" href={result.href}>{t(copy.openDoor)}<ArrowRight size={16} aria-hidden /></Link>
                <Link className="vs-wl-btn is-ghost" href={result.startHref}>{t(copy.start)}</Link>
                <button type="button" className="vs-wl-check-reset" onClick={() => setAnswers(copy.questions.map(() => null))}>{t(copy.restart)}</button>
              </div>
            </>
          ) : (
            <p className="vs-wl-check-progress">{answered} / {copy.questions.length}</p>
          )}
        </div>
      </div>
    </section>
  );
}

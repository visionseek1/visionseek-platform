'use client';

import {useEffect, useState} from 'react';
import {formatDeadline, type Locale} from '@/lib/tenders';
import styles from './tenders.module.css';

function remain(ms: number, locale: Locale) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const n = (value: number) => value.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US');
  return locale === 'ar'
    ? `متبقّى ${n(days)} يومًا و${n(hours)} ساعة و${n(minutes)} دقيقة`
    : `${n(days)}d ${n(hours)}h ${n(minutes)}m left`;
}

/** Server-renders the exact UAE deadline; the countdown hydrates from that same +04:00 instant. */
export function DeadlineClock({deadline, locale}: {deadline: string; locale: Locale}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const end = Date.parse(deadline);
  const label = formatDeadline(deadline, locale);
  const left = Number.isFinite(end) && now !== null ? end - now : 0;

  return (
    <span>
      <time dateTime={deadline}>{label}</time>
      {now !== null && left > 0 && <span className={styles.countdown}>{remain(left, locale)}</span>}
    </span>
  );
}

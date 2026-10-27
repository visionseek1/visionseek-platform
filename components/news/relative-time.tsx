'use client';

import {useEffect, useState} from 'react';
import {formatRelativeTime} from '@/lib/news/time';
import type {NewsLocale} from './copy';

export function RelativeTime({iso, locale, title}: {iso: string; locale: NewsLocale; title: string}) {
  const [label, setLabel] = useState(() => formatRelativeTime(iso, locale));
  useEffect(() => {
    const tick = () => setLabel(formatRelativeTime(iso, locale));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [iso, locale]);
  return <time dateTime={iso} title={title}>{label}</time>;
}

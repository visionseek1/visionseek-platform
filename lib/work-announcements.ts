import {competitions, openCompetitionCount, type Locale} from '@/lib/competitions';
import {openTenderCount, tenders} from '@/lib/tenders';

export type {Locale};

/** «١ مفتوحة» / «1 open» — count is computed, never hard-coded. */
export function formatOpenCount(n: number, locale: Locale) {
  const num = n.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US');
  return locale === 'ar' ? `${num} مفتوحة` : `${num} open`;
}

/** The two announcement bands on Work with us, competitions first. */
export function workAnnouncementBands(now = Date.now()) {
  return [
    {
      id: 'competitions',
      href: '#competitions',
      title: competitions.hero.kicker,
      open: openCompetitionCount(now),
    },
    {
      id: 'tenders',
      href: '#tenders',
      title: tenders.hero.kicker,
      open: openTenderCount(now),
    },
  ] as const;
}

import data from '@/content/tenders.json';

/** Copy for the Tenders band on /work-with-us. Edited from /admin («المناقصات»). */
export type Locale = 'en' | 'ar';
export type Bi = {en: string; ar: string};
export type CardStatus = 'open' | 'filled' | 'completed';
export type TenderCard = {
  id: string;
  status: CardStatus;
  title: Bi;
  officialName: string;
  number: string;
  issuer: Bi;
  summary: Bi;
  body: Bi;
  role: Bi;
  eligibility: Bi;
  sourceUrl: string;
  sourceLabel: Bi;
  opened: string;
  deadline: string;
  image: string;
  ogImage?: string;
  imageAlt: Bi;
  result?: Bi;
  lessons?: Bi;
};
type Labels =
  | 'now' | 'join' | 'completed' | 'how' | 'empty' | 'issuerIn' | 'open' | 'filled'
  | 'tender' | 'role' | 'deadline' | 'opened' | 'eligibility' | 'source' | 'contact'
  | 'read' | 'back' | 'result' | 'lessons';
export type Tenders = {
  hero: {kicker: Bi; title: Bi; text: Bi; image: string; ogImage?: string};
  labels: Record<Labels, Bi>;
  form: Record<'name' | 'email' | 'role' | 'link' | 'note', Bi>;
  how: Bi[];
  cards: TenderCard[];
};

export const tenders = data as Tenders;

/** An open card closes at the exact deadline instant (ISO 8601 with offset, e.g. +04:00). */
export const deadlineEnd = (deadline: string) => Date.parse(deadline);

/** «أُغلقت / Closed» once the card is marked filled or the deadline has passed. */
function cardState(card: TenderCard, now: number): CardStatus {
  if (card.status !== 'open') return card.status;
  const end = deadlineEnd(card.deadline);
  return Number.isFinite(end) && now > end ? 'filled' : 'open';
}

/** The cards as of render time: current ones (open first) for «المفتوحة», finished ones for «أُغلقت». */
export function tenderCardsNow(now = Date.now()) {
  const current = tenders.cards
    .map(card => ({card, state: cardState(card, now)}))
    .filter(({state}) => state !== 'completed')
    .sort((a, b) => Number(a.state !== 'open') - Number(b.state !== 'open'));
  return {current, completed: tenders.cards.filter(card => card.status === 'completed')};
}

/** Open announcements only: status open and the stored +04:00 deadline is still in the future. */
export function openTenderCount(now = Date.now()) {
  return tenderCardsNow(now).current.filter(({state}) => state === 'open').length;
}

export function getTender(id: string) {
  return tenders.cards.find(card => card.id === id);
}

export function tenderPath(id: string, locale: Locale) {
  return `${locale === 'ar' ? '/ar' : ''}/work-with-us/tenders/${id}`;
}

export function officialRef(card: TenderCard) {
  return `${card.number} — ${card.officialName}`;
}

export function tenderOgImage(card: TenderCard) {
  return card.ogImage || card.image;
}

export function formatOpened(opened: string, locale: Locale) {
  const day = new Date(`${opened}T00:00:00+04:00`);
  if (Number.isNaN(day.getTime())) return opened;
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Dubai',
  }).format(day);
}

/** Clear deadline in UAE time, computed from the stored +04:00 instant. */
export function formatDeadline(deadline: string, locale: Locale) {
  const instant = new Date(deadline);
  if (Number.isNaN(instant.getTime())) return deadline;
  const date = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Dubai',
  }).format(instant);
  const time = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Dubai',
  }).format(instant);
  return locale === 'ar' ? `${date}، الساعة ${time} بتوقيت الإمارات` : `${date}, ${time} UAE time`;
}

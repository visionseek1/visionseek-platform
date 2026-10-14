import data from '@/content/one-message.json';

/** The one message of the site (15 Oct 2026): «مهندس القدرات المؤسسية», one CTA, the initiative, the five sectors. Edited from /admin («رسالة الموقع والمبادرة»). */
export type Bi = {en: string; ar: string};
export type Sector = {id: string; title: Bi; text: Bi; detail: Bi; fieldsHeading?: Bi};
export type OneMessage = {
  identity: Bi;
  cta: {label: Bi; line: Bi};
  booking: {url: string; pending: Bi};
  home: {hero: {title: Bi; line: Bi; image: string; imageAlt: Bi}; problem: {eyebrow: Bi; text: Bi}; sectorsHeading: Bi; insightsHeading: Bi; insightsLink: Bi; belief: Bi};
  sectors: Sector[];
  offer: {title: Bi; intro: Bi; moreHeading: Bi; more: {href: string; title: Bi; text: Bi}[]};
  initiative: {eyebrow: Bi; title: Bi; offer: Bi; period: Bi; limited: Bi; intro: Bi; outcomesHeading: Bi; outcomes: Bi[]; forHeading: Bi; for: Bi; note: Bi};
};
export const oneMessage = data as OneMessage;
/** The booking link is a Cal.com event; until Dr. Ahmed sends it, the button leads to the pending note on /initiative. */
export const bookingHref = (locale: 'ar' | 'en'): string => (/^https:\/\/(app\.)?cal\.com\//.test(oneMessage.booking.url) ? oneMessage.booking.url : `${locale === 'ar' ? '/ar' : ''}/initiative#book`);

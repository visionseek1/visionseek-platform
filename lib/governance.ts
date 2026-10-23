import data from '@/content/governance.json';

export type Bi = {en: string; ar: string};
export type Locale = 'ar' | 'en';

export const governance = data;
export const workshop = data.workshop;

export const tx = (locale: Locale, value: Bi) => value[locale];

export const localePath = (locale: Locale, path: string) => (locale === 'ar' ? `/ar${path}` : path);

/** Public course URL, inside Masterclass. */
export const coursePath = `/masterclass/${workshop.slug}`;

/**
 * The one enrollment link. Swap this single constant when GoHighLevel is connected.
 * Arabic pages prefix it with /ar. No price and no payment on the course page.
 */
export const ENROLL_HREF = '/start';
export const enrollHref = (locale: Locale) => localePath(locale, ENROLL_HREF);

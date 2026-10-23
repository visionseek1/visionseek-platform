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
 * The one enrollment link for this course, in both languages.
 * Swap this single constant if the payment link changes.
 */
export const ENROLL_HREF = 'https://link.fastpaydirect.com/payment-link/6adb486bcaf20c1f8ff2b74a';
export const enrollHref = (locale: Locale) => (locale === 'ar' ? ENROLL_HREF : ENROLL_HREF);

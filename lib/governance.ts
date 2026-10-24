import data from '@/content/governance.json';

export type Bi = {en: string; ar: string};
export type Locale = 'ar' | 'en';

export const governance = data;
export const workshop = data.workshop;

export const tx = (locale: Locale, value: Bi) => value[locale];

export const localePath = (locale: Locale, path: string) => (locale === 'ar' ? `/ar${path}` : path);

/** Public course URL, inside Masterclass. */
export const coursePath = `/masterclass/${workshop.slug}`;
export const courseOrigin = 'https://visionseek.org';
export const coursePage = (locale: Locale) => `${courseOrigin}${localePath(locale, coursePath)}`;

import data from '@/content/governance.json';

export type Bi = {en: string; ar: string};
export type Locale = 'ar' | 'en';

export const governance = data;
export const workshop = data.workshop;

export const tx = (locale: Locale, value: Bi) => value[locale];

export const localePath = (locale: Locale, path: string) => (locale === 'ar' ? `/ar${path}` : path);

export const sectionPath = '/governance';
export const workshopPath = `${sectionPath}/${workshop.slug}`;

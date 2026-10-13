import data from '@/content/method.json';

/**
 * The method steps, the six communities and the eight fields on the home page.
 * Edited from /admin («المنهج والمجتمعات والمجالات»). Plain JSON import: safe for client components.
 */
export type Locale = "en" | "ar";
export type MethodStep = {id: string; en: string; ar: string; questionEn: string; questionAr: string; textEn: string; textAr: string; outputEn: string; outputAr: string};
export type Community = {id: string; en: string; ar: string; textEn: string; textAr: string; detailEn: string; detailAr: string};
export type Field = {id: string; en: string; ar: string; image: string};

export const steps: MethodStep[] = data.steps;
export const communities: Community[] = data.communities;
export const fields: Field[] = data.fields;

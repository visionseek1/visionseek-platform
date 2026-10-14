import data from '@/content/home.json';

/** Home page copy. Edited from /admin («الصفحة الرئيسية»). Plain JSON import, safe in client components. */
export type Bi = {en: string; ar: string};
export type HomeSlide = {image: string; label: Bi; title: Bi; sub: Bi; text: Bi; href: string; link: Bi};
export type HomeReadingRow = {href: string; image: string; category: Bi; title: Bi; text: Bi};
export type HomeMethodPart = {id: string; label: Bi; title: Bi; text: Bi; image: string; caption: Bi};
export type Home = {
  hero: {slides: HomeSlide[]; firstSlideNote: Bi};
  mission: {heading: Bi; image: string; imageAlt: Bi; eyebrow: Bi; title: Bi; text: Bi; link: Bi};
  reading: {heading: Bi; headingLink: Bi; rows: HomeReadingRow[]};
  communities: {eyebrow: Bi; title: Bi; text: Bi};
  fields: {eyebrow: Bi; title: Bi; text: Bi; link: Bi};
  work: {eyebrow: Bi; title: Bi; text: Bi; button: Bi; image: string; imageAlt: Bi};
  contact: {eyebrow: Bi; title: Bi; button: Bi; founderLink: Bi};
  method: {eyebrow: Bi; title: Bi; link: Bi; stageLink: Bi; parts: HomeMethodPart[]};
};
export const home: Home = data;

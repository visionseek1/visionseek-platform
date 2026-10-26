import data from '@/content/about.json';

/** Copy for /about, /method and /work-with-us interior pages. Edited from /admin («عن VisionSeek والمنهج»). */
export type Bi = {en: string; ar: string};
export type InteriorHead = {label: Bi; title: Bi; intro: Bi};
export type StudioLink = {href: string; label: Bi};
export type StudioOffer = {id: string; title: Bi; line: Bi; links: StudioLink[]};
export type AboutStudio = {
  label: Bi;
  openingTitle: Bi;
  openingLead: Bi;
  vision: {eyebrow: Bi; line: Bi};
  offerings: {eyebrow: Bi; items: StudioOffer[]};
  principles: {eyebrow: Bi; items: Bi[]};
  founder: {eyebrow: Bi; line: Bi};
  next: {eyebrow: Bi; title: Bi; button: Bi; href: string};
};
export type About = {
  pages: {method: InteriorHead; about: InteriorHead; 'work-with-us': InteriorHead};
  vision: {eyebrow: Bi; title: Bi; text: Bi};
  builds: {eyebrow: Bi; title: Bi; text: Bi; items: Bi[]};
  founder: {image: string; imageAlt: Bi; eyebrow: Bi; name: Bi; bio: Bi; lens: Bi; questionLead: Bi; question: Bi; valueLead: Bi; value: Bi; text: Bi; quote: Bi};
  workNote: {title: Bi; text: Bi; link: Bi};
  closing: {eyebrow: Bi; title: Bi; button: Bi; line: string};
  studio: AboutStudio;
};
export const about: About = data;

import data from '@/content/about.json';

/** Copy for /about, /method and /work-with-us interior pages. Edited from /admin («عن VisionSeek والمنهج»). */
export type Bi = {en: string; ar: string};
export type InteriorHead = {label: Bi; title: Bi; intro: Bi};
export type About = {
  pages: {method: InteriorHead; about: InteriorHead; 'work-with-us': InteriorHead};
  vision: {eyebrow: Bi; title: Bi; text: Bi};
  builds: {eyebrow: Bi; title: Bi; text: Bi; items: Bi[]};
  founder: {image: string; imageAlt: Bi; eyebrow: Bi; name: Bi; bio: Bi; lens: Bi; questionLead: Bi; question: Bi; valueLead: Bi; value: Bi; text: Bi; quote: Bi};
  workNote: {title: Bi; text: Bi; link: Bi};
  closing: {eyebrow: Bi; title: Bi; button: Bi; line: string};
};
export const about: About = data;

import data from '@/content/identity.json';

/**
 * The site identity adopted on 13 October 2026: «مهندس القدرات المؤسسية».
 * Every public page reads its copy from here. Edited from /admin («الهوية والصفحة الرئيسية»).
 * Plain JSON import: safe in client components. Arabic and English are separate texts of the same idea.
 */
export type Bi = {en: string; ar: string};
export type Locale = 'en' | 'ar';
export type Offer = {id: string; name: Bi; text: Bi; detail: Bi; href: string; linkLabel: Bi};
export type Piece = {id: string; name: Bi; text: Bi; output: Bi; owner: Bi; review: Bi};
export type Named = {name: Bi; text: Bi};
export type OfferSection = {id: string; title: Bi; body: Bi};
export type Identity = {
  name: Bi;
  nav: {cta: Bi; method: Bi; about: Bi; contact: Bi};
  hero: {image: string; label: Bi; title: Bi; text: Bi; button: Bi; secondary: Bi};
  initiative: {eyebrow: Bi; title: Bi; text: Bi; button: Bi; whoTitle: Bi; who: Bi[]; page: {title: Bi; intro: Bi; next: Bi[]; nextTitle: Bi}};
  offers: {eyebrow: Bi; title: Bi; link: Bi; items: Offer[]};
  method: {eyebrow: Bi; title: Bi; text: Bi; link: Bi; outputLabel: Bi; ownerLabel: Bi; reviewLabel: Bi; pieces: Piece[]};
  vision: {eyebrow: Bi; title: Bi; technologies: Bi[]};
  values: {eyebrow: Bi; items: Named[]};
  leader: {eyebrow: Bi; title: Bi; text: Bi; image: string; imageAlt: Bi; link: Bi};
  closing: {title: Bi; button: Bi};
  about: {label: Bi; title: Bi; intro: Bi; placeEyebrow: Bi; place: Named[]};
  services: {label: Bi; title: Bi; intro: Bi};
  methodPage: {label: Bi; title: Bi; intro: Bi; flexTitle: Bi; flex: Named[]};
  offer: {label: Bi; title: Bi; intro: Bi; sections: OfferSection[]; pricingNote: Bi};
};
export const identity: Identity = data;
export const t = (locale: Locale) => (v: Bi) => (locale === 'ar' ? v.ar : v.en);

import data from '@/content/forums.json';

/** Conferences — edited from /admin («المؤتمرات»). */
export type Bi = {en: string; ar: string};
export type Locale = 'ar' | 'en';

export type ForumInvite = {
  label: Bi;
  subject: Bi;
  body: Bi;
};

export type ForumPrinciple = {
  title: Bi;
  text: Bi;
};

export type ForumFact = {
  label: Bi;
  value: Bi;
};

export type ForumAwards = {
  title: Bi;
  kicker: Bi;
  status: Bi;
  visual: string;
  visualAlt: Bi;
  opening: Bi;
  what: Bi;
  principles: ForumPrinciple[];
  categories: ForumPrinciple[];
  process: Bi[];
  who: Bi;
  honesty: Bi;
  labels: {
    soon: Bi;
    mandate: Bi;
    principles: Bi;
    categories: Bi;
    process: Bi;
    who: Bi;
  };
};

export type Forum = {
  slug: string;
  title: Bi;
  kicker: Bi;
  edition?: Bi;
  status: Bi;
  facts?: ForumFact[];
  visual?: string;
  visualAlt?: Bi;
  opening: Bi;
  what: Bi;
  principles: ForumPrinciple[];
  themes: Bi[];
  who: Bi;
  outcome: Bi;
  awards?: ForumAwards;
  invite?: ForumInvite;
};

export type ForumsContent = {
  meta: {title: Bi; description: Bi};
  page: {
    home: Bi;
    section: Bi;
    status: Bi;
  };
  labels: {
    mandate: Bi;
    why: Bi;
    format: Bi;
    themes: Bi;
    who: Bi;
    outcome: Bi;
    dialogue: Bi;
    register: Bi;
    honesty: Bi;
    host: Bi;
  };
  forums: Forum[];
};

export const forumsContent = data as ForumsContent;
export const tx = (locale: Locale, value: Bi) => value[locale];
export const forumPath = (locale: Locale) => (locale === 'ar' ? '/ar/conferences' : '/conferences');
export const forumBySlug = (slug: string) => forumsContent.forums.find(forum => forum.slug === slug);
export const paragraphs = (value: string) => value.split(/\n\n+/).map(part => part.trim()).filter(Boolean);

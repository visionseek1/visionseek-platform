import data from '@/content/forums.json';

/** Conferences & Forums — edited from /admin («المؤتمرات والمنتديات»). */
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
  status: Bi;
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
    format: Bi;
    themes: Bi;
    who: Bi;
    outcome: Bi;
    honesty: Bi;
    host: Bi;
  };
  forums: Forum[];
};

export const forumsContent = data as ForumsContent;
export const tx = (locale: Locale, value: Bi) => value[locale];
export const forumPath = (locale: Locale) => (locale === 'ar' ? '/ar/forums' : '/forums');
export const forumBySlug = (slug: string) => forumsContent.forums.find(forum => forum.slug === slug);

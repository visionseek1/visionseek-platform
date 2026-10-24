import data from '@/content/forums.json';

/** Conferences & Forums — edited from /admin («المؤتمرات والمنتديات»). */
export type Bi = {en: string; ar: string};
export type Locale = 'ar' | 'en';

export type ForumInvite = {
  label: Bi;
  subject: Bi;
  body: Bi;
};

export type Forum = {
  slug: string;
  title: Bi;
  kicker: Bi;
  status: Bi;
  standfirst: Bi;
  what: Bi;
  who: Bi;
  why: Bi;
  index: Bi;
  invite?: ForumInvite;
};

export type ForumsContent = {
  meta: {title: Bi; description: Bi};
  page: {
    home: Bi;
    eyebrow: Bi;
    title: Bi;
    intro: Bi;
    status: Bi;
  };
  labels: {
    what: Bi;
    who: Bi;
    why: Bi;
    index: Bi;
    honesty: Bi;
    host: Bi;
    axisKorea: Bi;
    axisCenter: Bi;
    axisArab: Bi;
  };
  forums: Forum[];
};

export const forumsContent = data as ForumsContent;
export const tx = (locale: Locale, value: Bi) => value[locale];
export const forumPath = (locale: Locale) => (locale === 'ar' ? '/ar/forums' : '/forums');
export const forumBySlug = (slug: string) => forumsContent.forums.find(forum => forum.slug === slug);

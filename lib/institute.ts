import {readFileSync} from 'node:fs';
import {join} from 'node:path';

export type Bi = {en: string; ar: string};
export type Locale = 'en' | 'ar';

export type InstituteCopy = {
  title: Bi;
  draft: Bi;
  kicker: Bi;
  intro: Bi;
  programsLabel: Bi;
  openProgram: Bi;
  masterclassKind: Bi;
  fellowshipKind: Bi;
};

export type FellowshipCopy = {
  title: Bi;
  subtitle: Bi;
  hero: string;
  heroAlt: Bi;
  opening: Bi;
  whatLabel: Bi;
  what: Bi;
  principlesLabel: Bi;
  principles: {title: Bi; body: Bi}[];
  journeyLabel: Bi;
  journey: {title: Bi; body: Bi}[];
  whoLabel: Bi;
  who: Bi;
  leavesLabel: Bi;
  leaves: Bi;
  statusLabel: Bi;
  status: Bi;
  interest: {label: Bi; email: string; subject: Bi; toName: Bi};
};

const read = <T,>(name: string): T => JSON.parse(readFileSync(join(process.cwd(), 'content', name), 'utf8')) as T;

export const institute: InstituteCopy = read('institute.json');
export const fellowship: FellowshipCopy = read('fellowship.json');

export const institutePath = '/institute';
export const fellowshipPath = '/institute/fellowship';

export const tx = (locale: Locale, value: Bi) => value[locale];
export const localePath = (locale: Locale, path: string) => (locale === 'ar' ? `/ar${path}` : path);

export const interestMailto = (locale: Locale) =>
  `mailto:${fellowship.interest.email}?subject=${encodeURIComponent(fellowship.interest.subject[locale])}`;

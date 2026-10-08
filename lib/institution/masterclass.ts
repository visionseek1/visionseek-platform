import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import type {Locale} from './schema';

export type {Locale};
export type Bi = {en: string; ar: string};

export type MasterclassUnit = {
  id: string;
  title: Bi;
  outcome: Bi;
  exercise: Bi;
  tool: Bi;
};

export type MasterclassTrack = {
  id: 'leaders' | 'managers' | 'staff';
  name: Bi;
  promise: Bi;
  status: Bi;
  written: boolean;
  laterNote?: Bi;
  units: MasterclassUnit[];
};

export type MasterclassSource = {
  title: string;
  url: string;
  date: Bi;
  dateNote: Bi;
  usedFor: Bi;
};

export type MasterclassLink = {href: string; label: Bi};

export type Masterclass = {
  slug: string;
  title: Bi;
  status: Bi;
  hero: Bi;
  intro: Bi;
  shapes: {id: string; name: Bi; body: Bi}[];
  workshopHref: string;
  sampleHref: string;
  sampleLabel: Bi;
  duration: Bi;
  price: Bi;
  unsetNote: Bi;
  placement: {doorNote: Bi; links: MasterclassLink[]};
  tracks: MasterclassTrack[];
  sourcesNote: Bi;
  sources: MasterclassSource[];
};

export type OfficeBlock = {kind: 'stamp' | 'heading' | 'line'; text: Bi};
export type OfficePiece = {id: string; label: Bi; blocks: OfficeBlock[]};
export type LeaderOffice = {
  slug: string;
  title: Bi;
  status: Bi;
  stamp: Bi;
  lede: Bi;
  note: Bi;
  pieces: OfficePiece[];
};

const dir = join(process.cwd(), 'content/masterclass');
const read = <T,>(name: string) => JSON.parse(readFileSync(join(dir, name), 'utf8')) as T;

export const masterclass: Masterclass = read('ai-in-leadership.json');
export const leaderOffice: LeaderOffice = read('leader-office.json');

export const masterclassPath = `/workshops/${masterclass.slug}`;
export const leaderOfficePath = `/workshops/${leaderOffice.slug}`;

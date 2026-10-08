import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import type {Entry, Locale} from './schema';

export type {Locale};
export type Bi = {en: string; ar: string};
export type WorkshopKind = 'leader' | 'institution' | 'development';
export type InstitutionKind = 'police' | 'university' | 'airport' | 'hospital' | 'company';
export type RoleId = 'senior' | 'manager' | 'staff';

export type WorkshopExample = {title: Bi; body: Bi};
export type WorkshopFaq = {q: Bi; a: Bi};

export type Workshop = {
  position: number;
  slug: string;
  kind: WorkshopKind;
  institution: InstitutionKind | '';
  roles: RoleId[];
  outcome: Bi;
  summary: Bi;
  audienceRole: Bi;
  audienceInstitution: Bi;
  whyProblem: Bi;
  whyEvidence: Bi;
  source: {title: string; url: string};
  before: Bi;
  during: Bi;
  after: Bi;
  questions: Bi[];
  leavesWith: Bi[];
  examples: WorkshopExample[];
  examplesNote: Bi;
  boundary: Bi;
  format: Bi;
  duration: Bi;
  size: Bi;
  faq: WorkshopFaq[];
  status: Bi;
};

export type WorkshopRole = {id: RoleId; label: Bi; note: Bi};
export type WorkshopInstitutionType = {id: InstitutionKind; label: Bi};
export type WorkshopDoorCard = {code: string; body: Bi; close: Bi; image: string};
export type WorkshopInstitutionLine = {kind: Bi; gain: Bi};

/** Copy for the live section page. Every key is editable from /admin. */
export type WorkshopLive = {
  kicker: string;
  heroQuote: Bi;
  heroTitle: Bi;
  heroLede: Bi;
  heroWith: Bi;
  heroImage: string;
  heroImageAlt: Bi;
  heroImageLabel: string;
  ctaPrimary: Bi;
  chipAll: Bi;
  ideaLabel: Bi;
  ideaTitle: Bi;
  ideaSub: Bi;
  ideaLines: Bi[];
  ideaClose: Bi;
  doorsLabel: Bi;
  doorCards: Record<WorkshopKind, WorkshopDoorCard>;
  openDoor: Bi;
  methodLabel: Bi;
  methodTitle: Bi;
  methodSub: Bi;
  methodLine: Bi;
  methodChain: Bi[];
  institutionsLabel: Bi;
  institutionsTitle: Bi;
  institutionsLines: WorkshopInstitutionLine[];
  institutionsClose: Bi;
  institutionsLimit: Bi;
  institutionsOpen: Bi;
  founderName: Bi;
  founderKicker: Bi;
  founderIntro: Bi;
  founderQuestions: Bi[];
  founderMid: Bi;
  founderClose: Bi;
  founderLink: Bi;
  closingLines: Bi[];
  closingCta: Bi;
};

export type WorkshopSection = {
  title: Bi;
  hero: Bi;
  intro: Bi;
  status: Bi;
  rolesHeading: Bi;
  roles: WorkshopRole[];
  doors: Record<WorkshopKind, {name: Bi; line: Bi}>;
  institutionsHeading: Bi;
  institutionTypes: WorkshopInstitutionType[];
  allInstitutions: Bi;
  live: WorkshopLive;
};

const dir = join(process.cwd(), 'content/workshops');
const sectionFile = join(process.cwd(), 'content/workshop-section.json');

const readJson = <T,>(name: string): T => JSON.parse(readFileSync(join(dir, name), 'utf8')) as T;

const loadWorkshops = (): Workshop[] =>
  readdirSync(dir)
    .filter(name => name.endsWith('.json'))
    .map(name => readJson<Workshop>(name))
    .sort((a, b) => a.position - b.position || a.slug.localeCompare(b.slug));

export const workshopSection: WorkshopSection = JSON.parse(readFileSync(sectionFile, 'utf8')) as WorkshopSection;
export const workshops: Workshop[] = loadWorkshops();
export const getWorkshop = (slug: string) => workshops.find(item => item.slug === slug);

/** Legacy guide entries stay in guides.ts. No held session is listed here. */
export const workshopEntries: Entry[] = [];

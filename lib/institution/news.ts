import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import type {Block, Entry, Text} from './schema';

type LooseText = Partial<Text> | null | undefined;
type LooseBlock = {title: Text; body?: LooseText; items?: LooseText[]};
type NewsFile = {
  position?: number;
  section: Entry['section'];
  slug: string;
  title: Text;
  summary: Text;
  category: Text;
  status: Text;
  image: string;
  code?: string;
  blocks: LooseBlock[];
  related?: Array<string | {href?: string}>;
  facts?: Entry['facts'];
  source?: Partial<NonNullable<Entry['source']>>;
  references?: Entry['references'];
  imageCredit?: Partial<NonNullable<Entry['imageCredit']>>;
  action?: Entry['action'];
};

const textOrNone = (value: LooseText): Text | undefined => {
  if (!value?.en && !value?.ar) return undefined;
  return {en: value?.en ?? '', ar: value?.ar ?? ''};
};

const cleanBlock = (block: LooseBlock): Block => {
  const body = textOrNone(block.body);
  const items = block.items?.map(textOrNone).filter((item): item is Text => Boolean(item));
  return {title: block.title, ...(body ? {body} : {}), ...(items?.length ? {items} : {})};
};

const clean = (raw: NewsFile): Entry => {
  const entry: Entry = {
    section: raw.section,
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    category: raw.category,
    status: raw.status,
    image: raw.image,
    blocks: raw.blocks.map(cleanBlock),
  };
  if (raw.code) entry.code = raw.code;
  if (raw.action) entry.action = raw.action;
  if (raw.facts?.length) entry.facts = raw.facts;
  if (raw.references?.length) entry.references = raw.references;
  if (raw.imageCredit?.name && raw.imageCredit.url) entry.imageCredit = {name: raw.imageCredit.name, url: raw.imageCredit.url};
  if (raw.source?.title && raw.source.url) entry.source = {title: raw.source.title, url: raw.source.url};
  const related = raw.related
    ?.map(item => (typeof item === 'string' ? item : item.href))
    .filter((href): href is string => Boolean(href));
  if (related?.length) entry.related = related;
  return entry;
};

const loadNews = (): Entry[] => {
  const dir = join(process.cwd(), 'content/news');
  return readdirSync(dir)
    .filter(name => name.endsWith('.json'))
    .map(name => JSON.parse(readFileSync(join(dir, name), 'utf8')) as NewsFile)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0) || a.slug.localeCompare(b.slug))
    .map(clean);
};

export const newsEntries: Entry[] = loadNews();

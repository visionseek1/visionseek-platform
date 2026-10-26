import {NEWS_HEADINGS} from './schema';

export type NewsBody = {
  lede: string;
  happened: string[];
  why: string;
  reading: string;
  watching?: string;
};

const HEADING = /^(#{2,3})\s+(.+?)\s*$/;

const headingKey = (title: string): keyof typeof NEWS_HEADINGS | null => {
  const normalized = title.replace(/[.:：]+$/, '').trim();
  for (const [key, labels] of Object.entries(NEWS_HEADINGS) as Array<[keyof typeof NEWS_HEADINGS, {ar: string; en: string}]>) {
    if (normalized === labels.ar || normalized === labels.en) return key;
  }
  return null;
};

const cleanInline = (text: string): string =>
  text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/\[(.+?)\]\((.+?)\)/g, '$1')
    .trim();

const parseScalar = (value: string): unknown => {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === '') return '';
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed;
};

/** Split a briefing body: lede, the three editorial blocks, optional «ما الذي نراقبه». */
export function parseNewsBody(markdown: string, file: string): NewsBody {
  const sections: Record<keyof typeof NEWS_HEADINGS, string[]> = {happened: [], why: [], reading: [], watching: []};
  const ledeLines: string[] = [];
  let current: keyof typeof NEWS_HEADINGS | null = null;
  let seenHeading = false;
  for (const rawLine of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const heading = rawLine.match(HEADING);
    if (heading) {
      seenHeading = true;
      current = headingKey(heading[2]);
      continue;
    }
    const line = rawLine.trim();
    if (!line) continue;
    if (!seenHeading) {
      ledeLines.push(cleanInline(line));
      continue;
    }
    if (!current) continue;
    const bullet = line.match(/^[-*]\s+(.+)$/);
    sections[current].push(cleanInline(bullet ? bullet[1] : line));
  }
  if (!ledeLines.length) throw new Error(`${file}: missing opening lede (two sentences before the first heading)`);
  if (sections.happened.length < 3 || sections.happened.length > 5) {
    throw new Error(`${file}: «ما الذي حدث» must have 3–5 bullets, found ${sections.happened.length}`);
  }
  if (!sections.why.length) throw new Error(`${file}: missing «لماذا يهم الخليج والعالم العربي»`);
  if (!sections.reading.length) throw new Error(`${file}: missing «قراءة VisionSeek»`);
  return {
    lede: ledeLines.join('\n\n'),
    happened: sections.happened,
    why: sections.why.join('\n\n'),
    reading: sections.reading.join('\n'),
    watching: sections.watching.length ? sections.watching.join('\n') : undefined,
  };
}

export function parseFrontmatter(raw: string, file: string): {data: Record<string, unknown>; body: string} {
  const match = raw.replace(/^\uFEFF/, '').match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: markdown must start with a YAML frontmatter block`);
  const data: Record<string, unknown> = {};
  let listKey: string | null = null;
  let list: Array<string | Record<string, unknown>> | null = null;
  let currentItem: Record<string, unknown> | null = null;
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const itemMatch = line.match(/^(\s+)-\s+(.*)$/);
    if (itemMatch && list && listKey) {
      const rest = itemMatch[2];
      const colon = rest.indexOf(':');
      if (colon > 0 && !/^\d/.test(rest) && !rest.startsWith('http')) {
        currentItem = {[rest.slice(0, colon).trim()]: parseScalar(rest.slice(colon + 1))};
        list.push(currentItem);
      } else {
        currentItem = null;
        list.push(String(parseScalar(rest)));
      }
      continue;
    }
    const nested = line.match(/^\s{2,}([A-Za-z][A-Za-zA-Z0-9]*):\s*(.*)$/);
    if (nested && currentItem) {
      currentItem[nested[1]] = parseScalar(nested[2]);
      continue;
    }
    const kv = line.match(/^([A-Za-z][A-Za-zA-Z0-9]*):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: invalid frontmatter line «${line}»`);
    listKey = null;
    list = null;
    currentItem = null;
    const key = kv[1];
    const value = kv[2];
    if (value === '') {
      listKey = key;
      list = [];
      data[key] = list;
    } else {
      data[key] = parseScalar(value);
    }
  }
  return {data, body: match[2].trim()};
}

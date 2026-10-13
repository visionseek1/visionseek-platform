import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

/**
 * Reads the JSON content files that /admin edits. Server-side only (node:fs):
 * import these loaders from server components, pages and lib modules, never from "use client" files.
 */
const root = join(process.cwd(), 'content');

export const readContentFile = <T,>(name: string): T => JSON.parse(readFileSync(join(root, name), 'utf8')) as T;

/** Every *.json in content/<dir>, sorted by `position` then file name. */
export const readContentDir = <T extends {position?: number}>(dir: string): T[] =>
  readdirSync(join(root, dir))
    .filter(name => name.endsWith('.json'))
    .sort()
    .map(name => readContentFile<T>(join(dir, name)))
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

/** Decap stores related links as [{href}]; the site uses string[]. */
export const hrefs = (items: {href: string}[] | undefined): string[] => (items ?? []).map(item => item.href).filter(Boolean);

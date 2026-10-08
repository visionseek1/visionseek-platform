import data from '@/content/visibility.json';

/**
 * Pages archived from /admin («الأرشيف»). An archived path disappears from the menu, the footer, section link lists
 * and the sitemap, and proxy.ts sends anyone who opens it to the home page. Nothing is deleted.
 * Archiving a section archives every page under it. Plain JSON import: safe for client components and proxy.ts.
 */
const PROTECTED = ['/', '/about', '/start', '/privacy', '/terms', '/admin', '/api'];

const clean = (href: string): string => {
  let path = href.split('#')[0].split('?')[0] || '/';
  if (path === '/ar' || path.startsWith('/ar/')) path = path.slice(3) || '/';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
};

const isProtected = (path: string) => PROTECTED.includes(path) || path.startsWith('/admin/') || path.startsWith('/api/');

export const archivedPaths: string[] = (data.archived as {path: string}[])
  .map(item => clean(item.path || ''))
  .filter(path => path.startsWith('/') && !isProtected(path));

/** True when the page (EN or /ar, with or without #anchor) sits at or under an archived path. */
export function isArchived(href: string): boolean {
  if (!href.startsWith('/')) return false;
  const path = clean(href);
  if (isProtected(path)) return false;
  return archivedPaths.some(archived => path === archived || path.startsWith(`${archived}/`));
}

import data from '@/content/navigation.json';

/**
 * The header menu and the footer map. Edited from /admin («القائمة والتذييل»).
 * Plain JSON import: safe for the client-side header. Paths are site-relative; the locale prefix is added where rendered.
 */
export type NavLink = {href: string; en: string; ar: string};
export type NavSection = {path: string; en: string; ar: string; children: NavLink[]};

export const institutionNav: NavSection[] = data.sections;

// Reports belongs in the header; preserve the existing footer navigation.
const reportsNav: NavSection = data.reports;
export const institutionHeaderNav: NavSection[] = institutionNav.flatMap(item => item.path === '/news' ? [reportsNav, item] : [item]);

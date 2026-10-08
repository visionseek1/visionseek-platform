import data from '@/content/navigation.json';
import {isArchived} from '@/lib/visibility';

/**
 * The header menu and the footer map. Edited from /admin («القائمة والتذييل»).
 * Plain JSON import: safe for the client-side header. Paths are site-relative; the locale prefix is added where rendered.
 */
export type NavLink = {href: string; en: string; ar: string};
export type NavSection = {path: string; en: string; ar: string; children: NavLink[]};

const visible = (section: NavSection): NavSection => ({...section, children: section.children.filter(link => !isArchived(link.href))});

export const institutionNav: NavSection[] = data.sections.filter(section => !isArchived(section.path)).map(visible);

// Reports belongs in the header; preserve the existing footer navigation.
const reportsNav: NavSection = visible(data.reports);
const showReports = !isArchived(data.reports.path);
export const institutionHeaderNav: NavSection[] = institutionNav.flatMap(item => item.path === '/news' && showReports ? [reportsNav, item] : [item]);

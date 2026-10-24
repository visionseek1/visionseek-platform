import data from '@/content/navigation.json';
import {isArchived} from '@/lib/visibility';

/**
 * The header menu and the footer map. Edited from /admin («الشريط العلوي والتذييل»).
 * Plain JSON import: safe for the client-side header. Paths are site-relative; the locale prefix is added where rendered.
 */
export type NavLink = {href: string; en: string; ar: string};
export type NavSection = {path: string; en: string; ar: string; children: NavLink[]};

const visible = (section: NavSection): NavSection => ({...section, children: section.children.filter(link => !isArchived(link.href))});

export const institutionNav: NavSection[] = data.sections.filter(section => !isArchived(section.path)).map(visible);

// The live Reports section is now a regular nav item (formerly Insights). The older
// reports-center entry in navigation.json stays for /admin archive options; it is
// not injected again when that path is already in the main sections.
const reportsNav: NavSection = visible(data.reports);
const showReports = !isArchived(data.reports.path);
const reportsAlreadyInNav = data.sections.some(section => section.path === data.reports.path);
export const institutionHeaderNav: NavSection[] = institutionNav.flatMap(item => item.path === '/news' && showReports && !reportsAlreadyInNav ? [reportsNav, item] : [item]);

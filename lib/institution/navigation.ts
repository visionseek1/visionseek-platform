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

// Since 13 October 2026 the reports live under «الأخبار والتقارير»; the header shows the five sections as they are.
export const reportsNav: NavSection = visible(data.reports);
export const institutionHeaderNav: NavSection[] = institutionNav;

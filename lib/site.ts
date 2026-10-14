import data from '@/content/site.json';

/**
 * Contact details and the few lines repeated across the site.
 * Edited from /admin («بيانات التواصل (كل الصفحات)»). Safe to import from client components: plain JSON, no fs.
 */
export type SiteText = {en: string; ar: string};
export type Emails = {general: string; insights: string; masterclass: string; partners: string; media: string; careers: string; founder: string};
export type Site = {
  email: string;
  emails: Emails;
  whatsapp: string;
  phoneDisplay: string;
  phoneE164: string;
  linkedinUrl: string;
  linkedinName: SiteText;
  location: SiteText;
  locationHint: SiteText;
  footerLocation: SiteText;
  tagline: string;
  footerBlurb: SiteText;
};

export const site: Site = data;
/** One address per purpose (15 Oct 2026): hello@ for general contact, bookings and forms; the rest by section. */
export const emails: Emails = data.emails;
/** The address a section writes to: masterclass pages → masterclass@, work-with-us → careers@, media → media@, everything else hello@. */
export const emailFor = (section: string, slug?: string): string =>
  section === 'workshops' ? emails.masterclass : section === 'work-with-us' ? emails.careers : section === 'news' && slug === 'media' ? emails.media : emails.general;
export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${site.email}${query ? `?${query}` : ''}`;
};
export const whatsappUrl = (text?: string) => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

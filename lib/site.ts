import data from '@/content/site.json';

/**
 * Contact details and the few lines repeated across the site.
 * Edited from /admin («بيانات الموقع»). Safe to import from client components: plain JSON, no fs.
 */
export type SiteText = {en: string; ar: string};
export type Site = {
  email: string;
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
export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${site.email}${query ? `?${query}` : ''}`;
};
export const whatsappUrl = (text?: string) => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

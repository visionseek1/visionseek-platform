/**
 * Masterclass interest: name, email, organisation only.
 * The visitor's mail app sends the message; the existing leads endpoint
 * records a copy when Notion is configured. No payment, no new secrets.
 */
export type InterestLocale = 'ar' | 'en';
export type InterestValues = {name: string; email: string; organization: string};
export type InterestProblem = {key: keyof InterestValues; reason: 'missing' | 'invalid'};

const clean = (v: string | undefined) => (v || '').replace(/\s+/g, ' ').trim();

export const isInterestEmail = (v: string) =>
  /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(v) && v.length <= 254;

export const INTEREST_MAX = {name: 120, email: 254, organization: 160} as const;

export function interestProblems(values: InterestValues): InterestProblem[] {
  const name = clean(values.name).slice(0, INTEREST_MAX.name);
  const email = clean(values.email).slice(0, INTEREST_MAX.email);
  const organization = clean(values.organization).slice(0, INTEREST_MAX.organization);
  const missing: InterestProblem[] = [];
  if (!name) missing.push({key: 'name', reason: 'missing'});
  if (!email) missing.push({key: 'email', reason: 'missing'});
  if (!organization) missing.push({key: 'organization', reason: 'missing'});
  const invalid: InterestProblem[] = [];
  if (email && !isInterestEmail(email)) invalid.push({key: 'email', reason: 'invalid'});
  return [...missing, ...invalid];
}

export function composeInterest({locale, values, topic, page}: {
  locale: InterestLocale;
  values: InterestValues;
  topic: string;
  page: string;
}) {
  const name = clean(values.name).slice(0, INTEREST_MAX.name);
  const email = clean(values.email).slice(0, INTEREST_MAX.email);
  const organization = clean(values.organization).slice(0, INTEREST_MAX.organization);
  const subject = locale === 'ar'
    ? `VisionSeek — تسجيل اهتمام: ${topic}`
    : `VisionSeek — Register interest: ${topic}`;
  const intro = locale === 'ar'
    ? 'تسجيل اهتمام بماستر كلاس VisionSeek.'
    : 'Registering interest in a VisionSeek Masterclass.';
  const body = [
    intro,
    '',
    `${locale === 'ar' ? 'الاسم' : 'Name'}: ${name}`,
    `${locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}: ${email}`,
    `${locale === 'ar' ? 'المؤسسة' : 'Organization'}: ${organization}`,
    `${locale === 'ar' ? 'بخصوص' : 'About'}: ${topic}`,
    '',
    `${locale === 'ar' ? 'الصفحة' : 'Page'}: ${page}`,
  ].join('\n');
  const note = [
    locale === 'ar' ? `تسجيل اهتمام — ${topic}` : `Register interest — ${topic}`,
    `${locale === 'ar' ? 'الاسم' : 'Name'}: ${name}`,
    `${locale === 'ar' ? 'المؤسسة' : 'Organization'}: ${organization}`,
    `${locale === 'ar' ? 'الصفحة' : 'Page'}: ${page}`,
    `${locale === 'ar' ? 'لغة الصفحة' : 'Page language'}: ${locale === 'ar' ? 'عربي' : 'English'}`,
  ].join('\n');
  return {subject, body, note, name, email, organization};
}

/**
 * The request forms on «حلول من كوريا» and the cars pages. Each request becomes one email to the address in
 * content/site.json, opened in the visitor's own mail app: the project has no mail service, so the site never sends
 * anything by itself. No imports here, so the browser bundle stays small and the tests can load this file directly.
 */
export type RequestLocale = 'ar' | 'en';
export type Bi = {ar: string; en: string};
export type RequestKind = 'korea' | 'car-wanted' | 'car-listed';
export type RequestKey = 'name' | 'country' | 'phone' | 'email' | 'category' | 'product' | 'quantity' | 'car' | 'carType' | 'budget' | 'details' | 'link';
export type RequestValues = Partial<Record<RequestKey, string>>;

/** Egypt and the Gulf. `value` is the Arabic name the leads board already understands (app/api/korean-solutions/request). */
export const COUNTRIES: {value: string; label: Bi}[] = [
  {value: 'مصر', label: {ar: 'مصر', en: 'Egypt'}},
  {value: 'السعودية', label: {ar: 'السعودية', en: 'Saudi Arabia'}},
  {value: 'الإمارات', label: {ar: 'الإمارات', en: 'United Arab Emirates'}},
  {value: 'قطر', label: {ar: 'قطر', en: 'Qatar'}},
  {value: 'الكويت', label: {ar: 'الكويت', en: 'Kuwait'}},
  {value: 'البحرين', label: {ar: 'البحرين', en: 'Bahrain'}},
  {value: 'عُمان', label: {ar: 'عُمان', en: 'Oman'}},
  {value: 'دولة أخرى', label: {ar: 'دولة أخرى', en: 'Another country'}},
];

export const CAR_TYPES: {value: string; label: Bi}[] = [
  {value: 'hybrid', label: {ar: 'هايبرد', en: 'Hybrid'}},
  {value: 'phev', label: {ar: 'هايبرد قابلة للشحن (Plug-in)', en: 'Plug-in hybrid'}},
  {value: 'ev', label: {ar: 'كهربائية', en: 'Electric'}},
  {value: 'unsure', label: {ar: 'لم أقرر بعد', en: 'Not sure yet'}},
];

export const REQUEST_FIELDS: Record<RequestKind, RequestKey[]> = {
  'korea': ['name', 'country', 'phone', 'email', 'category', 'product', 'quantity', 'details', 'link'],
  'car-wanted': ['name', 'country', 'phone', 'email', 'car', 'carType', 'budget', 'details', 'link'],
  'car-listed': ['name', 'country', 'phone', 'email', 'details'],
};

export const REQUIRED: RequestKey[] = ['name', 'country', 'phone', 'email', 'product', 'car'];

export const REQUEST_LABELS: Record<RequestKey, Bi> = {
  name: {ar: 'الاسم', en: 'Name'},
  country: {ar: 'البلد', en: 'Country'},
  phone: {ar: 'الهاتف / واتساب', en: 'Phone / WhatsApp'},
  email: {ar: 'البريد الإلكتروني', en: 'Email'},
  category: {ar: 'المجال', en: 'Field'},
  product: {ar: 'المنتج أو الخدمة التي تحتاجها', en: 'The product or service you need'},
  quantity: {ar: 'الكمية أو الميزانية', en: 'Quantity or budget'},
  car: {ar: 'السيارة التي تريدها', en: 'The car you want'},
  carType: {ar: 'النوع', en: 'Type'},
  budget: {ar: 'الميزانية', en: 'Budget'},
  details: {ar: 'تفاصيل', en: 'Details'},
  link: {ar: 'رابط أو صورة', en: 'Link or photo'},
};

export const MAX: Record<RequestKey, number> = {
  name: 120, country: 40, phone: 32, email: 254, category: 60, product: 300, quantity: 200,
  car: 200, carType: 40, budget: 120, details: 1200, link: 500,
};

const clean = (v: string | undefined) => (v || '').replace(/\s+/g, ' ').trim();

export const isEmail = (v: string) => /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(v) && v.length <= 254;
/** At least 7 digits, and only the characters people type in phone numbers. */
export const isPhone = (v: string) => /^\+?[\d\s()./-]{7,32}$/.test(v) && v.replace(/\D/g, '').length >= 7;
export const isLink = (v: string) => /^https?:\/\/[^\s<>"]+\.[^\s<>"]+$/i.test(v);

export type RequestProblem = {key: RequestKey; reason: 'missing' | 'invalid'};

/**
 * Missing required fields first, in form order, then fields with the wrong shape.
 * When the page already says what the request is about (a solution, a listed car), the product is not asked again.
 */
export function requestProblems(kind: RequestKind, values: RequestValues, about?: string): RequestProblem[] {
  const keys = REQUEST_FIELDS[kind].filter(k => !(about && (k === 'product' || k === 'car')));
  const missing = keys.filter(k => REQUIRED.includes(k) && !clean(values[k])).map(key => ({key, reason: 'missing' as const}));
  const invalid: RequestProblem[] = [];
  if (clean(values.email) && !isEmail(clean(values.email))) invalid.push({key: 'email', reason: 'invalid'});
  if (clean(values.phone) && !isPhone(clean(values.phone))) invalid.push({key: 'phone', reason: 'invalid'});
  if (keys.includes('link') && clean(values.link) && !isLink(clean(values.link))) invalid.push({key: 'link', reason: 'invalid'});
  return [...missing, ...invalid];
}

const INTRO: Record<RequestKind, Bi> = {
  'korea': {ar: 'طلب جديد من صفحة «حلول من كوريا».', en: 'New request from the Korean Solutions page.'},
  'car-wanted': {ar: 'طلب سيارة غير معروضة على الموقع.', en: 'Request for a car that is not listed on the site.'},
  'car-listed': {ar: 'طلب سيارة معروضة على الموقع.', en: 'Request for a car listed on the site.'},
};

const SUBJECT: Record<RequestKind, Bi> = {
  'korea': {ar: 'طلب من كوريا', en: 'Korea request'},
  'car-wanted': {ar: 'طلب سيارة', en: 'Car request'},
  'car-listed': {ar: 'طلب سيارة', en: 'Car request'},
};

const short = (v: string, n: number) => (v.length > n ? `${v.slice(0, n - 1)}…` : v);

/**
 * The email subject and body, in the page's language. `display` turns stored values (a country, a car type) into
 * the words the visitor saw. `note` is the same request without the contact lines, for the leads board.
 */
export function composeRequest({locale, kind, values, about, page, display}: {
  locale: RequestLocale; kind: RequestKind; values: RequestValues; about?: string; page: string;
  display?: Partial<Record<RequestKey, (v: string) => string>>;
}) {
  const t = (b: Bi) => b[locale];
  const shown = (k: RequestKey) => { const v = clean(values[k]).slice(0, MAX[k]); const f = display?.[k]; return v && f ? f(v) : v; };
  const details = (values.details || '').trim().slice(0, MAX.details);
  const lines: [RequestKey | 'about', string][] = [];
  if (about) lines.push(['about', about]);
  for (const k of REQUEST_FIELDS[kind]) {
    const v = k === 'details' ? details : shown(k);
    if (v) lines.push([k, v]);
  }
  const label = (k: RequestKey | 'about') => (k === 'about' ? (locale === 'ar' ? 'بخصوص' : 'About') : t(REQUEST_LABELS[k]));
  const row = ([k, v]: [RequestKey | 'about', string]) => (k === 'details' ? `${label(k)}:\n${v}` : `${label(k)}: ${v}`);
  const pageLine = `${locale === 'ar' ? 'الصفحة' : 'Page'}: ${page}`;
  const topic = about || shown('product') || shown('car') || '';
  const subject = `VisionSeek — ${t(SUBJECT[kind])}${topic ? `: ${short(topic, 80)}` : ''}`;
  const body = [t(INTRO[kind]), '', ...lines.map(row), '', pageLine].join('\n');
  const contact = new Set<string>(['name', 'email', 'country']);
  const note = [t(INTRO[kind]), ...lines.filter(([k]) => !contact.has(k)).map(row)].join('\n');
  return {subject, body, note};
}

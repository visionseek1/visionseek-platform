import data from '@/content/cars.json';
import {isPreviewBuild} from '@/lib/deploy';

export type Bi = {ar: string; en: string};
export type CarType = 'hybrid' | 'phev' | 'ev';
export type Car = {
  slug: string;
  example: boolean;
  type: CarType;
  brand: Bi;
  model: Bi;
  year: number | null;
  photos: string[];
  powertrain: Bi;
  rangeKm: number | null;
  batteryKwh: number | null;
  seats: number | null;
  included: Bi[];
  priceAmount: number | null;
  priceCurrency: string;
};

export const CAR_TYPE: Record<CarType, Bi> = {
  hybrid: {ar: 'هايبرد', en: 'Hybrid'},
  phev: {ar: 'هايبرد قابلة للشحن', en: 'Plug-in hybrid'},
  ev: {ar: 'كهربائية', en: 'Electric'},
};

const TYPES = new Set<CarType>(['hybrid', 'phev', 'ev']);
const slugOk = (v: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) && v.length <= 80;
const bi = (v: unknown): Bi => {
  const o = v && typeof v === 'object' ? v as {ar?: unknown; en?: unknown} : {};
  return {ar: typeof o.ar === 'string' ? o.ar.trim() : '', en: typeof o.en === 'string' ? o.en.trim() : ''};
};
const num = (v: unknown) => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && v.trim() && Number.isFinite(Number(v))) return Number(v);
  return null;
};

function readCar(raw: unknown, example: boolean): Car | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const slug = typeof r.slug === 'string' ? r.slug.trim() : '';
  const type = r.type as CarType;
  const brand = bi(r.brand);
  const model = bi(r.model);
  if (!slugOk(slug) || !TYPES.has(type) || !brand.ar || !model.ar) return null;
  const photos = Array.isArray(r.photos) ? r.photos.flatMap(p => {
    if (typeof p === 'string' && p.startsWith('/')) return [p];
    if (p && typeof p === 'object') {
      const src = (p as {src?: unknown; path?: unknown}).src ?? (p as {path?: unknown}).path;
      if (typeof src === 'string' && src.startsWith('/')) return [src];
    }
    return [];
  }).slice(0, 8) : [];
  const included = Array.isArray(r.included) ? r.included.map(bi).filter(x => x.ar || x.en).slice(0, 12) : [];
  return {
    slug, example: example || r.example === true, type, brand, model,
    year: num(r.year), photos, powertrain: bi(r.powertrain),
    rangeKm: num(r.rangeKm), batteryKwh: num(r.batteryKwh), seats: num(r.seats),
    included, priceAmount: num(r.priceAmount),
    priceCurrency: typeof r.priceCurrency === 'string' ? r.priceCurrency.trim().slice(0, 8) : '',
  };
}

const published = (data.cars as unknown[]).map(r => readCar(r, false)).filter((c): c is Car => !!c);
const examples = (data.examples as unknown[]).map(r => readCar(r, true)).filter((c): c is Car => !!c);

/** Real listings always. Example cards only on a Vercel preview or `next dev`, and only while showExamples is on. */
export function getListedCars(): Car[] {
  const show = data.showExamples === true && isPreviewBuild();
  const extra = show ? examples : [];
  const seen = new Set<string>();
  return [...published, ...extra].filter(c => (seen.has(c.slug) ? false : (seen.add(c.slug), true)));
}

export function getCar(slug: string): Car | null {
  return getListedCars().find(c => c.slug === slug) || null;
}

export type CarFilter = {
  type: CarType | 'all';
  brand: string;
  yearMin: number | null;
  yearMax: number | null;
  priceMin: number | null;
  priceMax: number | null;
  rangeMin: number | null;
  batteryMin: number | null;
};

export const EMPTY_FILTER: CarFilter = {
  type: 'all', brand: 'all', yearMin: null, yearMax: null, priceMin: null, priceMax: null, rangeMin: null, batteryMin: null,
};

/** A car with no year, price, range or battery is dropped only when that filter is set. */
export function filterCars(cars: Car[], f: CarFilter): Car[] {
  return cars.filter(c => {
    if (f.type !== 'all' && c.type !== f.type) return false;
    if (f.brand !== 'all' && c.brand.en !== f.brand && c.brand.ar !== f.brand) return false;
    if (f.yearMin != null && (c.year == null || c.year < f.yearMin)) return false;
    if (f.yearMax != null && (c.year == null || c.year > f.yearMax)) return false;
    if (f.priceMin != null && (c.priceAmount == null || c.priceAmount < f.priceMin)) return false;
    if (f.priceMax != null && (c.priceAmount == null || c.priceAmount > f.priceMax)) return false;
    if (f.rangeMin != null && (c.rangeKm == null || c.rangeKm < f.rangeMin)) return false;
    if (f.batteryMin != null && (c.batteryKwh == null || c.batteryKwh < f.batteryMin)) return false;
    return true;
  });
}

export function carTitle(c: Car, locale: 'ar' | 'en') {
  const brand = c.brand[locale] || c.brand.en || c.brand.ar;
  const model = c.model[locale] || c.model.en || c.model.ar;
  return `${brand} ${model}`.trim();
}

'use client';
import {useMemo, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CarMark from './car-mark';
import {CAR_TYPE, EMPTY_FILTER, carTitle, filterCars, type Bi, type Car, type CarFilter, type CarType} from '@/lib/cars';
import styles from './cars.module.css';

type Locale = 'ar' | 'en';

const TYPES: {value: CarType | 'all'; label: Bi}[] = [
  {value: 'all', label: {ar: 'كل الأنواع', en: 'All types'}},
  {value: 'hybrid', label: CAR_TYPE.hybrid},
  {value: 'phev', label: CAR_TYPE.phev},
  {value: 'ev', label: CAR_TYPE.ev},
];

const toNum = (v: string) => { const n = Number(v); return v !== '' && Number.isFinite(n) ? n : null; };

export default function CarListing({locale, cars}: {locale: Locale; cars: Car[]}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  const [f, setF] = useState<CarFilter>(EMPTY_FILTER);
  const brands = useMemo(() => {
    const seen = new Map<string, Bi>();
    for (const c of cars) {
      const key = c.brand.en || c.brand.ar;
      if (key && !seen.has(key)) seen.set(key, c.brand);
    }
    return [...seen.values()];
  }, [cars]);
  const hasPrice = cars.some(c => c.priceAmount != null);
  const hasRange = cars.some(c => c.rangeKm != null);
  const hasBattery = cars.some(c => c.batteryKwh != null);
  const hasYear = cars.some(c => c.year != null);
  const results = filterCars(cars, f);
  const set = <K extends keyof CarFilter>(key: K, value: CarFilter[K]) => setF(prev => ({...prev, [key]: value}));
  const dirty = JSON.stringify(f) !== JSON.stringify(EMPTY_FILTER);

  return <div className={styles.gutter}><section id="list" className={`${styles.inner} ${styles.board}`} aria-labelledby="list-title">
    <div className={styles.boardHead}>
      <h2 id="list-title">{ar ? 'السيارات' : 'The cars'}</h2>
      <p className={styles.count} role="status">{cars.length
        ? <><span className={styles.num}>{results.length}</span> {ar ? 'من' : 'of'} <span className={styles.num}>{cars.length}</span></>
        : (ar ? 'لا توجد سيارات معروضة بعد.' : 'No cars listed yet.')}</p>
      {dirty && <button type="button" className={styles.reset} onClick={() => setF(EMPTY_FILTER)}>{ar ? 'مسح الفلاتر' : 'Clear filters'}</button>}
    </div>

    <form className={styles.filters} aria-label={ar ? 'فلاتر السيارات' : 'Car filters'} onSubmit={e => e.preventDefault()}>
      <label>{ar ? 'النوع' : 'Type'}
        <select value={f.type} onChange={e => set('type', e.target.value as CarFilter['type'])}>
          {TYPES.map(x => <option key={x.value} value={x.value}>{t(x.label)}</option>)}
        </select>
      </label>
      <label>{ar ? 'الماركة' : 'Brand'}
        <select value={f.brand} onChange={e => set('brand', e.target.value)} disabled={!brands.length}>
          <option value="all">{ar ? 'كل الماركات' : 'All brands'}</option>
          {brands.map(b => <option key={b.en || b.ar} value={b.en || b.ar}>{t(b)}</option>)}
        </select>
      </label>
      <label>{ar ? 'من سنة' : 'Year from'}
        <input type="number" inputMode="numeric" min={1990} max={2100} placeholder={ar ? '—' : '—'} disabled={!hasYear} value={f.yearMin ?? ''} onChange={e => set('yearMin', toNum(e.target.value))}/>
      </label>
      <label>{ar ? 'إلى سنة' : 'Year to'}
        <input type="number" inputMode="numeric" min={1990} max={2100} placeholder={ar ? '—' : '—'} disabled={!hasYear} value={f.yearMax ?? ''} onChange={e => set('yearMax', toNum(e.target.value))}/>
      </label>
      <label>{ar ? 'السعر من' : 'Price from'}
        <input type="number" inputMode="numeric" min={0} placeholder={ar ? '—' : '—'} disabled={!hasPrice} value={f.priceMin ?? ''} onChange={e => set('priceMin', toNum(e.target.value))}/>
      </label>
      <label>{ar ? 'السعر إلى' : 'Price to'}
        <input type="number" inputMode="numeric" min={0} placeholder={ar ? '—' : '—'} disabled={!hasPrice} value={f.priceMax ?? ''} onChange={e => set('priceMax', toNum(e.target.value))}/>
      </label>
      <label>{ar ? 'المدى من (كم)' : 'Range from (km)'}
        <input type="number" inputMode="numeric" min={0} placeholder={ar ? '—' : '—'} disabled={!hasRange} value={f.rangeMin ?? ''} onChange={e => set('rangeMin', toNum(e.target.value))}/>
      </label>
      <label>{ar ? 'البطارية من (ك.و.س)' : 'Battery from (kWh)'}
        <input type="number" inputMode="numeric" min={0} placeholder={ar ? '—' : '—'} disabled={!hasBattery} value={f.batteryMin ?? ''} onChange={e => set('batteryMin', toNum(e.target.value))}/>
      </label>
    </form>
    {!hasPrice && <p className={styles.filterNote}>{ar ? 'لا أسعار على الصفحة بعد. حقول السعر مقفلة.' : 'No prices on the page yet. Price fields stay closed.'}</p>}

    {cars.length === 0
      ? <div className={styles.empty} id="soon">
          <CarMark className={styles.emptyMark}/>
          <h3>{ar ? 'السيارات قريبًا' : 'Cars coming soon'}</h3>
          <p>{ar ? 'لا توجد سيارات معروضة للبيع هنا الآن. اكتب لنا ما تحتاجه، ونبحث عنه في كوريا.' : 'There is no inventory here yet. Tell us the car you want, and we will look for it in Korea.'}</p>
          <a href="#request">{ar ? 'اطلب سيارة' : 'Request a car'} <span aria-hidden="true">{ar ? '←' : '→'}</span></a>
        </div>
      : <ul className={styles.grid}>
          {results.map(c => <li key={c.slug}><CarCard car={c} locale={locale} href={`${p}/cars/${c.slug}`}/></li>)}
          {!results.length && <li className={styles.empty}><p>{ar ? 'لا توجد سيارة بهذه المواصفات. اطلب سيارة غير معروضة.' : 'No car matches these filters. Request a car that is not listed.'} <a href="#request">{ar ? 'اكتب طلبك' : 'Write your request'}</a></p></li>}
        </ul>}
  </section></div>;
}

export function CarCard({car, locale, href}: {car: Car; locale: Locale; href: string}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en);
  const specs = [
    car.year != null ? String(car.year) : '',
    t(CAR_TYPE[car.type]),
    car.rangeKm != null ? (ar ? `${car.rangeKm} كم` : `${car.rangeKm} km`) : '',
    car.batteryKwh != null ? `${car.batteryKwh} kWh` : '',
    t(car.powertrain),
  ].filter(Boolean).slice(0, 4);
  return <article className={styles.card}>
    <Link href={href}>
      <span className={styles.cardPhoto}>
        {car.photos[0] ? <Image src={car.photos[0]} alt="" fill sizes="(max-width:700px) 100vw, 360px"/> : <CarMark className={styles.mark}/>}
        {car.example && <span className={styles.sample}>{ar ? 'بيانات نموذجية' : 'EXAMPLE DATA'}</span>}
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardType}>{t(CAR_TYPE[car.type])}</span>
        <h3>{carTitle(car, locale)}</h3>
        {car.year != null && <span className={styles.cardYear}>{car.year}</span>}
        <span className={styles.specs}>{specs.map(s => <span key={s}>{s}</span>)}</span>
        <span className={styles.cardCta}>{ar ? 'اطلب هذه السيارة' : 'Request this car'} <span aria-hidden="true">{ar ? '←' : '→'}</span></span>
      </span>
    </Link>
  </article>;
}

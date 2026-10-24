import Link from 'next/link';
import Image from 'next/image';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import RequestForm from '@/components/requests/request-form';
import {site, whatsappUrl} from '@/lib/site';
import {CAR_TYPE, carTitle, type Bi, type Car} from '@/lib/cars';
import CarMark from './car-mark';
import CarListing from './listing';
import styles from './cars.module.css';

type Locale = 'ar' | 'en';
const ORIGIN = 'https://visionseek.org';

function Shell({locale, path, here, children}: {locale: Locale; path: string; here?: string; children: React.ReactNode}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : '';
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
    <CapabilityHeader locale={locale} path={path}/>
    <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>
      <nav className={`${styles.bar} ${styles.gutter}`} aria-label={ar ? 'أقسام السيارات' : 'Cars sections'}><div className={`${styles.inner} ${styles.barInner}`}>
        <span className={styles.barName}>
          <Link href={`${p}/korean-solutions`}>{ar ? 'حلول من كوريا' : 'Korean Solutions'}</Link>
          <span className={styles.sep} aria-hidden="true">/</span>
          <Link href={`${p}/cars`}>{ar ? 'السيارات' : 'Cars'}</Link>
          {here && <><span className={styles.sep} aria-hidden="true">/</span><span className={styles.here}>{here}</span></>}
        </span>
        <span className={styles.barNav}>
          <a href={`${p}/cars#list`}>{ar ? 'السيارات' : 'The cars'}</a>
          <a className={styles.barCta} href={`${p}/cars#request`}>{ar ? 'اطلب سيارة' : 'Request a car'}</a>
        </span>
      </div></nav>
      {children}
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

export function CarsHub({locale, cars, record}: {locale: Locale; cars: Car[]; record: boolean}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : '';
  return <Shell locale={locale} path="/cars">
    <section className={styles.hero} aria-labelledby="cars-title"><div className={styles.gutter}><div className={`${styles.inner} ${styles.heroInner}`}>
      <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>HYBRID &amp; EV · VISIONSEEK</p>
      <h1 id="cars-title">{ar ? 'سيارات هايبرد وكهربائية من كوريا' : 'Hybrid and electric cars from Korea'}</h1>
      <p className={styles.heroLede}>{ar
        ? 'لا توجد سيارات معروضة للبيع هنا الآن. اطلب ما تحتاجه، ونبحث عنه في كوريا.'
        : 'There is no inventory on this page yet. Tell us the car you want, and we will look for it in Korea.'}</p>
      <div className={styles.heroCta}>
        <a className={styles.cta} href="#request">{ar ? 'اطلب سيارة' : 'Request a car'} <span aria-hidden="true">{ar ? '←' : '→'}</span></a>
        <span>{ar ? 'نرد عليك بأنفسنا، بلا رسائل آلية.' : 'We reply personally. No automated messages.'}</span>
      </div>
    </div></div></section>

    <CarListing locale={locale} cars={cars}/>

    <section id="request" className={`${styles.ask} ${styles.gutter}`} aria-labelledby="ask-title"><div className={`${styles.inner} ${styles.askInner}`}>
      <div className={styles.askText}>
        <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>REQUEST A CAR</p>
        <h2 id="ask-title">{ar ? 'اطلب سيارة غير معروضة' : 'Request a car that is not listed'}</h2>
        <p>{ar ? 'اكتب الماركة والموديل والسنة إن عرفتها. نبحث عنها في كوريا ونعود إليك.' : 'Write the brand, model and year if you know them. We look in Korea and come back to you.'}</p>
        <p className={styles.askAlt}>{ar ? 'هل تفضّل واتساب؟' : 'Prefer WhatsApp?'} <a href={whatsappUrl()} target="_blank" rel="noreferrer" dir="ltr">{site.phoneDisplay}</a></p>
      </div>
      <div className={styles.askForm}>
        <RequestForm locale={locale} kind="car-wanted" page={`${ORIGIN}${p}/cars`} record={record}/>
      </div>
    </div></section>
  </Shell>;
}

export function CarDetail({locale, car, record}: {locale: Locale; car: Car; record: boolean}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en) || v.en || v.ar; const p = ar ? '/ar' : '';
  const title = carTitle(car, locale);
  const rows: {label: Bi; value: string}[] = [
    {label: {ar: 'النوع', en: 'Type'}, value: t(CAR_TYPE[car.type])},
    {label: {ar: 'الماركة', en: 'Brand'}, value: t(car.brand)},
    {label: {ar: 'الموديل', en: 'Model'}, value: t(car.model)},
    {label: {ar: 'السنة', en: 'Year'}, value: car.year != null ? String(car.year) : '—'},
    {label: {ar: 'مجموعة الحركة', en: 'Powertrain'}, value: t(car.powertrain) || '—'},
    {label: {ar: 'المدى', en: 'Range'}, value: car.rangeKm != null ? (ar ? `${car.rangeKm} كم` : `${car.rangeKm} km`) : '—'},
    {label: {ar: 'البطارية', en: 'Battery'}, value: car.batteryKwh != null ? `${car.batteryKwh} kWh` : '—'},
    {label: {ar: 'المقاعد', en: 'Seats'}, value: car.seats != null ? String(car.seats) : '—'},
    {label: {ar: 'السعر', en: 'Price'}, value: car.priceAmount != null ? `${car.priceAmount} ${car.priceCurrency}`.trim() : (ar ? 'غير مذكور' : 'Not listed')},
  ];
  return <Shell locale={locale} path={`/cars/${car.slug}`} here={title}>
    {car.example && <p className={styles.banner} role="status">{ar
      ? 'بيانات نموذجية للتصميم فقط. هذه ليست سيارة حقيقية، ولا عرضًا، ولا سعرًا.'
      : 'EXAMPLE DATA for layout only. This is not a real car, offer or price.'}</p>}
    <section className={`${styles.dHero} ${styles.gutter}`} aria-labelledby="car-title"><div className={`${styles.inner} ${styles.dHeroInner}`}>
      <Gallery car={car} locale={locale}/>
      <div className={styles.dCopy}>
        <span className={styles.dType}>{t(CAR_TYPE[car.type])}</span>
        <h1 id="car-title">{title}</h1>
        {car.year != null && <p className={styles.dYear}>{car.year}</p>}
        <a className={styles.cta} href="#request">{ar ? 'اطلب هذه السيارة' : 'Request this car'} <span aria-hidden="true">{ar ? '←' : '→'}</span></a>
        <Link className={styles.back} href={`${p}/cars`}>{ar ? 'كل السيارات' : 'All cars'}</Link>
      </div>
    </div></section>

    <div className={styles.gutter}><div className={`${styles.inner} ${styles.dBody}`}>
      <article className={styles.dMain}>
        <section className={styles.block} aria-labelledby="specs-title">
          <h2 id="specs-title">{ar ? 'المواصفات' : 'Specifications'}</h2>
          <table className={styles.table}><tbody>{rows.map(r => <tr key={r.label.en}><th scope="row">{t(r.label)}</th><td>{r.value}</td></tr>)}</tbody></table>
        </section>
        <section className={styles.block} aria-labelledby="inc-title">
          <h2 id="inc-title">{ar ? 'ما الذي يشمله الطلب' : 'What a request includes'}</h2>
          {car.included.length
            ? <ul className={styles.inc}>{car.included.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
            : <p>{ar ? 'لا يوجد بيان بعد.' : 'Nothing listed yet.'}</p>}
        </section>
      </article>
      <aside id="request" className={styles.aside} aria-labelledby="req-title">
        <h2 id="req-title">{ar ? 'اطلب هذه السيارة' : 'Request this car'}</h2>
        <p>{ar ? 'نبحث عنها في كوريا ونعود إليك. لا التزام من الرسالة.' : 'We look for it in Korea and come back to you. The message is not a commitment.'}</p>
        <RequestForm locale={locale} kind="car-listed" page={`${ORIGIN}${p}/cars/${car.slug}`} about={title} record={record}/>
      </aside>
    </div></div>
  </Shell>;
}

function Gallery({car, locale}: {car: Car; locale: Locale}) {
  const ar = locale === 'ar';
  if (!car.photos.length) {
    return <div className={styles.gallery}><div className={styles.ph}><CarMark className={styles.phMark}/><span>{ar ? 'لا توجد صورة بعد' : 'No photo yet'}</span></div></div>;
  }
  return <div className={styles.gallery}>
    <div className={styles.heroPhoto}><Image src={car.photos[0]} alt="" fill sizes="(max-width:900px) 100vw, 640px" priority/></div>
    {car.photos.length > 1 && <div className={styles.thumbs}>{car.photos.slice(1).map(src => <span key={src} className={styles.thumb}><Image src={src} alt="" fill sizes="160px"/></span>)}</div>}
  </div>;
}

import Image from 'next/image';
import RequestForm from './request-form';
import {Shell} from './pages';
import styles from './ks.module.css';
import {NO_PARTNERSHIP, type Bi} from '@/lib/korean-solutions-copy';

type Locale = 'ar' | 'en';
type Mark = 'hybrid' | 'electric';

const CARS: {name: string; mark: Mark; line: Bi}[] = [
  {name: 'Genesis Electrified G80', mark: 'electric', line: {ar: 'سيدان البيت.', en: 'The house sedan.'}},
  {name: 'Genesis Electrified GV70', mark: 'electric', line: {ar: 'للمدينة.', en: 'For the city.'}},
  {name: 'Hyundai Ioniq 5', mark: 'electric', line: {ar: 'على الطريق من سنوات.', en: 'Already on the road.'}},
  {name: 'Kia EV9', mark: 'electric', line: {ar: 'للأسطول أو للعائلة.', en: 'For a fleet or a family.'}},
  {name: 'Hyundai Santa Fe Hybrid', mark: 'hybrid', line: {ar: 'للمسافة.', en: 'For the distance.'}},
  {name: 'Kia Sorento Hybrid', mark: 'hybrid', line: {ar: 'للمسافة.', en: 'For the distance.'}},
];

const TECH: {title: Bi; text: Bi}[] = [
  {title: {ar: 'البطارية', en: 'The battery'}, text: {ar: 'معمار 800 فولت، ومنها GV90 وأيونيك 5 وGV60. الشحن السريع من السيارة، لا من صندوق يُشترى بعدها.', en: 'An 800-volt architecture, including the GV90, the Ioniq 5 and the GV60. Fast charging is part of the car, not a box bought later.'}},
  {title: {ar: 'مساعدة القيادة', en: 'Driver assistance'}, text: {ar: 'مساعدة على الطريق السريع، من هيونداي وكيا وجينيسيس. مساعدة، لا سيارة تقود نفسها.', en: 'Highway assistance from Hyundai, Kia and Genesis. Assistance, not a car that drives itself.'}},
  {title: {ar: 'المقصورة', en: 'The cabin'}, text: {ar: 'شاشة ومقعد وصوت كغرفة هادية، لا كقائمة كماليات.', en: 'Screen, seat and sound as a quiet room, not an options list.'}},
];

const MARK: Record<Mark, Bi> = {
  hybrid: {ar: 'هجين', en: 'Hybrid'},
  electric: {ar: 'كهرباء', en: 'Electric'},
};

const SOURCE = 'https://www.koreatimes.co.kr/economy/20260115/koreas-auto-exports-hit-record-72-bil-in-2025';
const PHOTO = 'https://commons.wikimedia.org/wiki/File:Genesis_GV90_JG1_Baena_Green_(5).jpg';
const LICENSE = 'https://creativecommons.org/licenses/by-sa/4.0';

export default function KoreanCars({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const t = (v: Bi) => (ar ? v.ar : v.en);
  return <Shell locale={locale} path="/korean-solutions/cars" here={ar ? 'السيارات' : 'Cars'}>
    <section className={styles.carsStage} aria-labelledby="cars-title">
      <div className={`${styles.gutter} ${styles.carsFlag}`}>
        <div className={styles.carsCopy}>
          <p className={`${styles.carsEyebrow} ${styles.latin}`} lang="en" dir="ltr">CARS · GENESIS</p>
          <h1 id="cars-title" className={`${styles.carsName} ${styles.latin}`} lang="en" dir="ltr">GV90</h1>
          <p className={styles.carsMark}>{t(MARK.electric)}</p>
          <p className={styles.carsLine}>{ar
            ? 'الأعلى في بيت جينيسيس. كهرباء، جديدة، ومن غير سعر في الصفحة.'
            : 'The top of the Genesis house. Electric, new, and with no price on this page.'}</p>
        </div>
        <figure className={styles.carsFigure}>
          <div className={styles.carsPhoto}><Image src="/ks/gv90.jpg" alt={ar ? 'جينيسيس GV90' : 'Genesis GV90'} fill sizes="(max-width:800px) 100vw, 720px" priority/></div>
          <figcaption className={styles.carsCaption}>{ar
            ? <>الصورة لجينيسيس GV90. <a href={PHOTO}>Damian B Oh</a>، <a href={LICENSE}>CC BY-SA 4.0</a>.</>
            : <>The photograph is the Genesis GV90. <a href={PHOTO}>Damian B Oh</a>, <a href={LICENSE}>CC BY-SA 4.0</a>.</>}</figcaption>
        </figure>
      </div>
    </section>

    <div className={styles.gutter}><div className={`${styles.inner} ${styles.carsBody}`}>
      <section className={styles.carsList} aria-labelledby="cars-list">
        <h2 id="cars-list">{ar ? 'قائمة واحدة' : 'One list'}</h2>
        <p className={styles.carsIntro}>{ar
          ? 'علامة على كل اسم. هجين أو كهرباء. الفخامة البيت، مش فلتر.'
          : 'A mark on each name. Hybrid or electric. Luxury is the house, not a filter.'}</p>
        <ul>
          {CARS.map(car => <li key={car.name}>
            <span className={`${styles.carsCar} ${styles.latin}`} lang="en" dir="ltr">{car.name}</span>
            <span className={styles.carsRowLine}>{t(car.line)}</span>
            <span className={styles.carsTag}>{t(MARK[car.mark])}</span>
          </li>)}
        </ul>
      </section>

      <section className={styles.carsTech} aria-labelledby="cars-tech">
        <h2 id="cars-tech">{ar ? 'التقنية' : 'Technology'}</h2>
        <p className={styles.carsIntro}>{ar ? 'ليست طرازًا. ثلاثة أشياء داخل السيارة.' : 'Not a model. Three things inside the car.'}</p>
        <div className={styles.carsTechGrid}>
          {TECH.map(item => <article key={item.title.en}><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}
        </div>
      </section>

      <section className={styles.carsFact} aria-labelledby="cars-fact">
        <p id="cars-fact" className={`${styles.carsNumber} ${styles.num}`}>14.8</p>
        <div>
          <p className={styles.carsFactUnit}>{ar ? 'مليار دولار' : 'billion dollars'}</p>
          <p>{ar
            ? 'صادرات كوريا من السيارات الهجين في 2025، بزيادة 30٪.'
            : 'Korean hybrid-car exports in 2025, up 30 percent.'}</p>
          <a href={SOURCE}>{ar ? 'كوريا تايمز عن وزارة التجارة · 15 يناير 2026' : 'Korea Times, citing the trade ministry · 15 January 2026'}</a>
        </div>
      </section>

      <p className={styles.carsOnly}>{ar
        ? 'جديدة فقط. لا مستعمل. VisionSeek لا تخزّن سيارات. تفتح الطلب.'
        : 'New only. Not used. VisionSeek does not stock cars. It opens the request.'}</p>
      <p className={styles.note}>{t(NO_PARTNERSHIP)}</p>

      <section id="request" className={styles.carsAsk} aria-labelledby="cars-ask">
        <h2 id="cars-ask">{ar ? 'اطلب سيارة' : 'Ask for a car'}</h2>
        <RequestForm locale={locale} kind="need" initialSector="السيارات" initialNeed={ar ? 'محتاج سيارة كورية جديدة.' : 'I need a new Korean car.'}/>
      </section>
    </div></div>
  </Shell>;
}

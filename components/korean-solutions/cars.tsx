import Image from 'next/image';
import RequestForm from './request-form';
import {Shell} from './pages';
import styles from './ks.module.css';
import {NO_PARTNERSHIP, type Bi} from '@/lib/korean-solutions-copy';

type Locale = 'ar' | 'en';
type Mark = 'hybrid' | 'electric';

type Role = 'wide' | 'pair' | 'band';

const CARS: {name: string; mark: Mark; role: Role; line: Bi}[] = [
  {name: 'Genesis Electrified G80', mark: 'electric', role: 'wide', line: {ar: 'سيدان للطريق الطويل.', en: 'A sedan for the long road.'}},
  {name: 'Genesis Electrified GV70', mark: 'electric', role: 'pair', line: {ar: 'للمدينة.', en: 'For the city.'}},
  {name: 'Hyundai Ioniq 5', mark: 'electric', role: 'pair', line: {ar: 'مجرّبة على الطريق من سنوات.', en: 'On the road for years.'}},
  {name: 'Kia EV9', mark: 'electric', role: 'band', line: {ar: 'ثلاثة صفوف. للأسطول أو للعائلة.', en: 'Three rows. For a fleet or a family.'}},
  {name: 'Hyundai Santa Fe Hybrid', mark: 'hybrid', role: 'pair', line: {ar: 'عائلة ومسافة.', en: 'A family, and distance.'}},
  {name: 'Kia Sorento Hybrid', mark: 'hybrid', role: 'pair', line: {ar: 'نفس المسافة، من كيا.', en: 'The same distance, from Kia.'}},
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
  const groups: Mark[] = ['electric', 'hybrid'];
  return <Shell locale={locale} path="/korean-solutions/cars" here={ar ? 'السيارات' : 'Cars'}>
    <section className={styles.carsHero} aria-labelledby="cars-title">
      <div className={styles.carsHeroPhoto}><Image src="/ks/gv90.jpg" alt="" fill sizes="100vw" priority/></div>
      <div className={`${styles.gutter} ${styles.carsHeroCopy}`}>
        <p className={`${styles.carsHeroEn} ${styles.latin}`} lang="en" dir="ltr">GENESIS · GV90</p>
        <h1 id="cars-title">{ar ? 'السيارات' : 'Cars'}</h1>
        <p>{ar
          ? 'الأعلى في بيت جينيسيس. كهرباء، ومن غير سعر.'
          : 'The top of the Genesis house. Electric, and with no price.'}</p>
      </div>
    </section>

    <div className={styles.gutter}><div className={`${styles.inner} ${styles.carsBody}`}>
      <p className={styles.carsCaption}>{ar
        ? <>الصورة لجينيسيس GV90. <a href={PHOTO}>Damian B Oh</a>، <a href={LICENSE}>CC BY-SA 4.0</a>.</>
        : <>The photograph is the Genesis GV90. <a href={PHOTO}>Damian B Oh</a>, <a href={LICENSE}>CC BY-SA 4.0</a>.</>}</p>

      <section className={styles.carsList} aria-labelledby="cars-list">
        <h2 id="cars-list">{ar ? 'الطرازات' : 'The models'}</h2>
        {groups.map(mark => {
          const items = CARS.filter(car => car.mark === mark);
          const wide = items.filter(car => car.role === 'wide');
          const pair = items.filter(car => car.role === 'pair');
          const band = items.filter(car => car.role === 'band');
          const Name = ({car}: {car: typeof CARS[number]}) => <>
            <span className={`${styles.carsCar} ${styles.latin}`} lang="en" dir="ltr">{car.name}</span>
            <p>{t(car.line)}</p>
          </>;
          return <div key={mark} className={styles.carsGroup}>
            <h3>{t(MARK[mark])}</h3>
            <div className={styles.carsMix}>
              {wide.map(car => <article key={car.name} className={styles.carsWide}><Name car={car}/></article>)}
              {pair.length > 0 && <div className={mark === 'hybrid' ? styles.carsPairSoft : styles.carsPair}>
                {pair.map(car => <article key={car.name}><Name car={car}/></article>)}
              </div>}
              {band.map(car => <article key={car.name} className={styles.carsBand}><Name car={car}/></article>)}
            </div>
          </div>;
        })}
      </section>

      <section className={styles.carsTech} aria-labelledby="cars-tech">
        <h2 id="cars-tech">{ar ? 'التقنية' : 'Technology'}</h2>
        <p className={styles.carsIntro}>{ar ? 'مش طراز رابع. موجودة جوه السيارة.' : 'Not a fourth model. It sits inside the car.'}</p>
        <dl>
          {TECH.map(item => <div key={item.title.en}><dt>{t(item.title)}</dt><dd>{t(item.text)}</dd></div>)}
        </dl>
      </section>

      <p className={styles.carsFact}>
        <span className={styles.num}>14.8</span> {ar ? 'مليار دولار، صادرات كوريا من الهجين في 2025، بزيادة 30٪.' : 'billion dollars. Korean hybrid exports in 2025, up 30 percent.'} <a href={SOURCE}>{ar ? 'المصدر' : 'Source'}</a>
      </p>
      <p className={styles.carsOnly}>{ar
        ? 'VisionSeek لا تخزّن سيارات. تفتح الطلب.'
        : 'VisionSeek does not stock cars. It opens the request.'}</p>
      <p className={styles.note}>{t(NO_PARTNERSHIP)}</p>

      <section id="request" className={styles.carsAsk} aria-labelledby="cars-ask">
        <h2 id="cars-ask">{ar ? 'اطلب سيارة' : 'Ask for a car'}</h2>
        <RequestForm locale={locale} kind="need" initialSector="السيارات" initialNeed={ar ? 'محتاج سيارة كورية جديدة.' : 'I need a new Korean car.'}/>
      </section>
    </div></div>
  </Shell>;
}

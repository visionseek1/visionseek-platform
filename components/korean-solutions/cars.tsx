import Image from 'next/image';
import RequestForm from './request-form';
import {Shell} from './pages';
import styles from './ks.module.css';
import {NO_PARTNERSHIP, type Bi} from '@/lib/korean-solutions-copy';

type Locale = 'ar' | 'en';

type Shot = {
  name: string;
  src: string;
  mark: Bi;
  line: Bi;
  span: 'lead' | 'half' | 'wide';
};

const SHOTS: Shot[] = [
  {name: 'Genesis Electrified G80', src: '/ks/g80.jpg', span: 'lead', mark: {ar: 'كهرباء', en: 'Electric'}, line: {ar: 'سيدان للطريق الطويل.', en: 'A sedan for the long road.'}},
  {name: 'Hyundai Ioniq 5', src: '/ks/ioniq.jpg', span: 'half', mark: {ar: 'كهرباء', en: 'Electric'}, line: {ar: 'على الطريق من سنوات.', en: 'On the road for years.'}},
  {name: 'Genesis Electrified GV70', src: '/ks/gv70.jpg', span: 'half', mark: {ar: 'كهرباء', en: 'Electric'}, line: {ar: 'للمدينة.', en: 'For the city.'}},
  {name: 'Kia EV9', src: '/ks/ev9.jpg', span: 'wide', mark: {ar: 'كهرباء', en: 'Electric'}, line: {ar: 'ثلاثة صفوف. للأسطول أو للعائلة.', en: 'Three rows. For a fleet or a family.'}},
  {name: 'Hyundai Santa Fe Hybrid', src: '/ks/santa.jpg', span: 'wide', mark: {ar: 'هجين', en: 'Hybrid'}, line: {ar: 'عائلة ومسافة. وسورينتو من كيا، لنفس المسافة.', en: 'A family, and distance. And the Sorento from Kia, for the same road.'}},
];

const TECH: {title: Bi; text: Bi}[] = [
  {title: {ar: 'البطارية', en: 'The battery'}, text: {ar: 'شحن سريع من السيارة نفسها. معمار 800 فولت، ومنها GV90 وأيونيك 5.', en: 'Fast charging from the car itself. An 800-volt architecture, including the GV90 and the Ioniq 5.'}},
  {title: {ar: 'الطريق', en: 'The road'}, text: {ar: 'مساعدة على الطريق السريع. مساعدة، لا سيارة تقود نفسها.', en: 'Help on the highway. Help, not a car that drives itself.'}},
  {title: {ar: 'جوه', en: 'Inside'}, text: {ar: 'شاشة، ومقعد، وصوت. أوضة هادية، مش قائمة كماليات.', en: 'A screen, a seat, a sound. A quiet room, not an options list.'}},
];

const SOURCE = 'https://www.koreatimes.co.kr/economy/20260115/koreas-auto-exports-hit-record-72-bil-in-2025';

function ShotCard({shot, t}: {shot: Shot; t: (v: Bi) => string}) {
  return <article className={`${styles.carsShot} ${shot.span === 'lead' ? styles.carsShotLead : ''} ${shot.span === 'wide' ? styles.carsShotWide : ''}`}>
    <div className={styles.carsShotPhoto}><Image src={shot.src} alt={shot.name} fill sizes={shot.span === 'half' ? '(max-width:800px) 100vw, 40vw' : '(max-width:800px) 100vw, 720px'}/></div>
    <div className={styles.carsShotCopy}>
      <span className={styles.carsShotMark}>{t(shot.mark)}</span>
      <span className={`${styles.carsCar} ${styles.latin}`} lang="en" dir="ltr">{shot.name}</span>
      <p>{t(shot.line)}</p>
    </div>
  </article>;
}

export default function KoreanCars({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const t = (v: Bi) => (ar ? v.ar : v.en);
  const [lead, ioniq, gv70, ev9, santa] = SHOTS;
  return <Shell locale={locale} path="/korean-solutions/cars" here={ar ? 'السيارات' : 'Cars'}>
    <section className={styles.carsHero} aria-labelledby="cars-title">
      <div className={styles.gutter}><div className={`${styles.inner} ${styles.carsHeroGrid}`}>
        <div className={styles.carsHeroCopy}>
          <p className={`${styles.carsHeroEn} ${styles.latin}`} lang="en" dir="ltr">GENESIS · GV90</p>
          <h1 id="cars-title">{ar ? 'السيارات' : 'Cars'}</h1>
          <p>{ar
            ? 'فوق البيت سيارة واحدة. وتحتها طريق: كهرباء، وهجين.'
            : 'One car at the top of the house. Under it, a road: electric, and hybrid.'}</p>
        </div>
        <div className={styles.carsHeroPhoto}><Image src="/ks/gv90.jpg" alt="Genesis GV90" fill sizes="(max-width:800px) 100vw, 560px" priority/></div>
      </div></div>
    </section>

    <section className={styles.carsGallery} aria-label={ar ? 'الطرازات' : 'The models'}>
      <div className={styles.gutter}><div className={styles.inner}>
        <ShotCard shot={lead} t={t}/>
        <div className={styles.carsShotRow}>
          <ShotCard shot={ioniq} t={t}/>
          <ShotCard shot={gv70} t={t}/>
        </div>
        <ShotCard shot={ev9} t={t}/>
        <ShotCard shot={santa} t={t}/>
      </div></div>
    </section>

    <div className={`${styles.gutter} ${styles.carsSheet}`}><div className={`${styles.inner} ${styles.carsBody}`}>
      <p className={styles.carsCaption}>{ar
        ? 'الصور: GV90 لداميان ب. أوه، وG80 وGV70 وEV9 لألكسندر ميغل، وأيونيك 5 لـ TTTNIS، وسانتا في لـ RL GNZLZ. الرخص CC BY-SA 4.0، وأيونيك 5 ملكية عامة.'
        : 'Photographs: the GV90 by Damian B Oh, the G80, GV70 and EV9 by Alexander Migl, the Ioniq 5 by TTTNIS, the Santa Fe by RL GNZLZ. CC BY-SA 4.0, and the Ioniq 5 is public domain.'}</p>

      <section className={styles.carsTech} aria-labelledby="cars-tech">
        <h2 id="cars-tech">{ar ? 'جوه السيارة' : 'Inside the car'}</h2>
        <div className={styles.carsPulse}>
          {TECH.map(item => <article key={item.title.en}><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}
        </div>
      </section>

      <p className={styles.carsFact}>
        <span className={styles.num}>14.8</span> {ar ? 'مليار دولار، صادرات كوريا من الهجين في 2025، بزيادة 30٪.' : 'billion dollars. Korean hybrid exports in 2025, up 30 percent.'} <a href={SOURCE}>{ar ? 'المصدر' : 'Source'}</a>
      </p>
      <p className={styles.carsOnly}>{ar ? 'من غير سعر في الصفحة. VisionSeek تفتح الطلب.' : 'No price on the page. VisionSeek opens the request.'}</p>
      <p className={styles.note}>{t(NO_PARTNERSHIP)}</p>

      <section id="request" className={styles.carsAsk} aria-labelledby="cars-ask">
        <h2 id="cars-ask">{ar ? 'اطلب سيارة' : 'Ask for a car'}</h2>
        <RequestForm locale={locale} kind="need" initialSector="السيارات" initialNeed={ar ? 'محتاج سيارة كورية.' : 'I need a Korean car.'}/>
      </section>
    </div></div>
  </Shell>;
}

import {COUNTRY_PATHS, LATER_IDS, MAP_VIEW, PILOT_IDS} from '@/lib/indices-map';
import {indicesContent} from '@/lib/indices';
import styles from './indices.module.css';

type Locale = 'ar' | 'en';

const PILOT_LABELS: Record<(typeof PILOT_IDS)[number], {en: string; ar: string; x: number; y: number}> = {
  eg: {en: 'Egypt', ar: 'مصر', x: 688, y: 214},
  sa: {en: 'Saudi Arabia', ar: 'السعودية', x: 948, y: 268},
  ae: {en: 'UAE', ar: 'الإمارات', x: 1098, y: 246},
  qa: {en: 'Qatar', ar: 'قطر', x: 1004, y: 206},
  kw: {en: 'Kuwait', ar: 'الكويت', x: 1008, y: 142},
  bh: {en: 'Bahrain', ar: 'البحرين', x: 1052, y: 198},
  om: {en: 'Oman', ar: 'عُمان', x: 1138, y: 368},
};

const MARKERS: {id: 'qa' | 'kw' | 'bh'; x: number; y: number}[] = [
  {id: 'qa', x: 1028, y: 246},
  {id: 'kw', x: 980, y: 168},
  {id: 'bh', x: 1021, y: 229},
];

export function CoverageMap({locale}: {locale: Locale}) {
  const {hub} = indicesContent;
  const label = (id: (typeof PILOT_IDS)[number]) => PILOT_LABELS[id][locale];
  const title = locale === 'ar'
    ? 'خريطة تغطية التجربة الأولى: مصر ودول الخليج الست. بلا قيم وبلا ترتيب.'
    : 'Coverage map of the first-edition pilot: Egypt and the six Gulf states. No values and no ranking.';
  return (
    <figure className={styles.map} aria-labelledby="indices-coverage">
      <figcaption className={styles.sectionHead}>
        <h2 id="indices-coverage">{hub.mapTitle[locale]}</h2>
        <p>{hub.mapIntro[locale]}</p>
      </figcaption>
      <div className={styles.mapFrame} dir="ltr">
        <svg
          className={styles.mapSvg}
          viewBox={`0 0 ${MAP_VIEW.w} ${MAP_VIEW.h}`}
          role="img"
          aria-label={title}
        >
          <title>{title}</title>
          <rect width={MAP_VIEW.w} height={MAP_VIEW.h} className={styles.mapSea}/>
          {LATER_IDS.map(id => (
            COUNTRY_PATHS[id]
              ? <path key={id} d={COUNTRY_PATHS[id]} className={styles.mapLater}/>
              : null
          ))}
          {PILOT_IDS.map(id => (
            COUNTRY_PATHS[id]
              ? <path key={id} d={COUNTRY_PATHS[id]} className={styles.mapPilot}/>
              : null
          ))}
          {MARKERS.map(mark => (
            <circle key={mark.id} cx={mark.x} cy={mark.y} r={mark.id === 'bh' ? 7 : 6} className={styles.mapDot}/>
          ))}
          {PILOT_IDS.map(id => {
            const item = PILOT_LABELS[id];
            return (
              <text key={`label-${id}`} x={item.x} y={item.y} className={styles.mapLabel}>
                {label(id)}
              </text>
            );
          })}
        </svg>
      </div>
      <ul className={styles.mapLegend}>
        <li><span className={styles.mapSwatchPilot} aria-hidden="true"/>{hub.mapPilotLabel[locale]}</li>
        <li><span className={styles.mapSwatchLater} aria-hidden="true"/>{hub.mapLaterLabel[locale]}</li>
      </ul>
    </figure>
  );
}

'use client';
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ks.module.css';
import type {Bi, Solution} from '@/lib/korean-solutions-copy';

type Locale = 'ar' | 'en';
type Card = {title: Bi; text: Bi; image: string; need: Bi};

/** Illustrative field photos only. Not a picture of the Korean product. Each item has its own photo. */
const PRODUCT_IMAGE: Record<string, string> = {
  'ai-mammography-reader': '/ks/mammo.jpg',
  'smart-heart-patch': '/ks/heart.jpg',
  'gait-training-robot': '/ks/gait.jpg',
  'dental-implants': '/ks/dental.jpg',
  'aesthetic-devices': '/ks/laser.jpg',
  'point-of-care-diagnostics': '/ks/analyzer.jpg',
  'elderly-care-call': '/ks/elder.jpg',
  'cardiac-arrest-early-warning': '/ks/monitor.jpg',
  'ai-security-cameras': '/ks/cctv.jpg',
  'container-smart-farms': '/ks/farm.jpg',
};

const ask = (sector: string, need: string) => {
  window.dispatchEvent(new CustomEvent('ks-need', {detail: {sector, need}}));
  document.getElementById('needs')?.scrollIntoView({behavior: 'smooth', block: 'start'});
};

const SECTIONS: {
  id: string;
  sector: string;
  image: string;
  short: Bi;
  title: Bi;
  line: Bi;
  source?: {href: string; label: Bi};
  match?: (s: Solution) => boolean;
  services: Card[];
}[] = [
  {
    id: 'health',
    sector: 'الصحة',
    image: '/ks/health.jpg',
    short: {ar: 'أجهزة طبية', en: 'Medical devices'},
    title: {ar: 'الأجهزة الطبية والتشخيص', en: 'Medical devices and diagnostics'},
    line: {
      ar: 'المستشفيات ومراكز الفحص تطلب أجهزة تشخيص وعلاج مجرّبة. صادرات كوريا من الأجهزة البصرية والطبية إلى مصر بلغت نحو 60 مليون دولار في 2025.',
      en: 'Hospitals and screening centres ask for proven diagnostic and treatment devices. Korean exports of optical and medical apparatus to Egypt were about $60 million in 2025.',
    },
    source: {href: 'https://tradingeconomics.com/south-korea/exports/egypt', label: {ar: 'COMTRADE · 2025', en: 'COMTRADE · 2025'}},
    match: s => s.sector === 'الصحة' || s.sector === 'الرعاية الاجتماعية',
    services: [],
  },
  {
    id: 'machines',
    sector: 'التصنيع',
    image: '/ks/workshop.jpg',
    short: {ar: 'معدات صناعية', en: 'Industrial equipment'},
    title: {ar: 'المعدات الصناعية وخطوط الإنتاج', en: 'Industrial equipment and production lines'},
    line: {
      ar: 'المصانع تطلب خطوطًا ومعدات وقطع غيار. صادرات الآلات والمعدات من كوريا إلى مصر بلغت نحو 191 مليون دولار في 2025.',
      en: 'Factories ask for lines, equipment and spare parts. Korean machinery exports to Egypt were about $191 million in 2025.',
    },
    source: {href: 'https://tradingeconomics.com/south-korea/exports/egypt', label: {ar: 'COMTRADE · 2025', en: 'COMTRADE · 2025'}},
    services: [
      {image: '/ks/line.jpg', title: {ar: 'خطوط الإنتاج والتعبئة', en: 'Production and packaging lines'}, text: {ar: 'خط كامل أو ماكينة ناقصة، مع التركيب والتشغيل.', en: 'A full line or the missing machine, with installation and start-up.'}, need: {ar: 'محتاج خط إنتاج أو تعبئة من كوريا.', en: 'I need a production or packaging line from Korea.'}},
      {image: '/ks/cnc.jpg', title: {ar: 'معدات الورش وقطع الغيار', en: 'Workshop equipment and spare parts'}, text: {ar: 'معدات تشغيل، وقطع الغيار التي يقف المصنع بدونها.', en: 'Shop equipment, and the spare parts a plant stops without.'}, need: {ar: 'محتاج معدات ورش أو قطع غيار من كوريا.', en: 'I need workshop equipment or spare parts from Korea.'}},
      {image: '/ks/pellets.jpg', title: {ar: 'خامات البلاستيك للمصانع', en: 'Plastic materials for factories'}, text: {ar: 'راتنجات وأفلام وقطع. صادرات البلاستيك من كوريا إلى مصر نحو 141 مليون دولار في 2025.', en: 'Resins, films and parts. Korean plastics exports to Egypt were about $141 million in 2025.'}, need: {ar: 'محتاج خامات أو منتجات بلاستيك صناعية من كوريا.', en: 'I need industrial plastic materials from Korea.'}},
    ],
  },
  {
    id: 'power',
    sector: 'الكهرباء والإلكترونيات',
    image: '/ks/lines.jpg',
    short: {ar: 'كهرباء وإلكترونيات', en: 'Power and electronics'},
    title: {ar: 'الكهرباء والإلكترونيات', en: 'Electrical equipment and electronics'},
    line: {
      ar: 'المشاريع تطلب كابلات ولوحات وبطاريات وإلكترونيات صناعية. صادرات كوريا الكهربائية والإلكترونية إلى مصر بلغت نحو 183 مليون دولار في 2025.',
      en: 'Projects ask for cables, switchgear, batteries and industrial electronics. Korean electrical and electronic exports to Egypt were about $183 million in 2025.',
    },
    source: {href: 'https://tradingeconomics.com/south-korea/exports/egypt', label: {ar: 'COMTRADE · 2025', en: 'COMTRADE · 2025'}},
    services: [
      {image: '/ks/cables.jpg', title: {ar: 'الكابلات ولوحات التوزيع', en: 'Cables and switchgear'}, text: {ar: 'توريد لمشروع قائم، مع المواصفة والكمية.', en: 'Supply for a live project, to the spec and the quantity.'}, need: {ar: 'محتاج كابلات أو لوحات توزيع من كوريا.', en: 'I need cables or switchgear from Korea.'}},
      {image: '/ks/battery.jpg', title: {ar: 'بطاريات وتخزين طاقة', en: 'Batteries and energy storage'}, text: {ar: 'أنظمة تخزين للمصنع أو للمحطة أو للمبنى.', en: 'Storage systems for a plant, a station or a building.'}, need: {ar: 'محتاج بطاريات أو تخزين طاقة من كوريا.', en: 'I need batteries or energy storage from Korea.'}},
      {image: '/ks/control.jpg', title: {ar: 'إلكترونيات القياس والتحكم', en: 'Measurement and control electronics'}, text: {ar: 'حساسات ووحدات تحكم لخط يعمل أصلًا.', en: 'Sensors and controllers for a line that is already running.'}, need: {ar: 'محتاج إلكترونيات قياس أو تحكم من كوريا.', en: 'I need measurement or control electronics from Korea.'}},
    ],
  },
  {
    id: 'water',
    sector: 'الطاقة',
    image: '/ks/plant.jpg',
    short: {ar: 'طاقة ومياه', en: 'Energy and water'},
    title: {ar: 'الطاقة والمياه', en: 'Energy and water'},
    line: {
      ar: 'الطلب في الخليج ومصر على معدات المحطات والتحلية والمضخات. صادرات كوريا إلى الشرق الأوسط بلغت 20.4 مليار دولار في 2025، للسنة الخامسة على التوالي.',
      en: 'The Gulf and Egypt ask for plant equipment, desalination and pumps. Korean exports to the Middle East reached $20.4 billion in 2025, a fifth straight year of growth.',
    },
    source: {href: 'https://www.korea.net/Government/Briefing-Room/Press-Releases/view?articleId=8461&type=O&insttCode=A110412', label: {ar: 'وزارة التجارة الكورية · 2025', en: 'Korean MOTIE · 2025'}},
    services: [
      {image: '/ks/towers.jpg', title: {ar: 'معدات محطات الطاقة', en: 'Power-plant equipment'}, text: {ar: 'معدات ومكوّنات لمحطة جديدة أو لتوسعة.', en: 'Equipment and components for a new plant or an extension.'}, need: {ar: 'محتاج معدات محطة طاقة من كوريا.', en: 'I need power-plant equipment from Korea.'}},
      {image: '/ks/desal.jpg', title: {ar: 'التحلية ومعالجة المياه', en: 'Desalination and water treatment'}, text: {ar: 'وحدات ومكوّنات لمحطة مياه، لا دراسة على الورق.', en: 'Units and components for a water plant, not a paper study.'}, need: {ar: 'محتاج معدات تحلية أو معالجة مياه من كوريا.', en: 'I need desalination or water-treatment equipment from Korea.'}},
      {image: '/ks/pumps.jpg', title: {ar: 'المضخات والأنظمة الملحقة', en: 'Pumps and related systems'}, text: {ar: 'مضخات وملحقاتها للتشغيل اليومي.', en: 'Pumps and their fittings for daily operation.'}, need: {ar: 'محتاج مضخات أو أنظمة ملحقة من كوريا.', en: 'I need pumps or related systems from Korea.'}},
    ],
  },
  {
    id: 'food',
    sector: 'الزراعة والغذاء',
    image: '/field-food.jpg',
    short: {ar: 'زراعة محمية', en: 'Protected farming'},
    title: {ar: 'الزراعة المحمية والتقنية', en: 'Protected and technical farming'},
    line: {
      ar: 'الحرارة وشح المياه يرفعان الطلب على زراعة محكومة، لا على استيراد الخضار من بعيد.',
      en: 'Heat and scarce water raise demand for controlled farming, not for vegetables shipped from far away.',
    },
    match: s => s.sector === 'الزراعة والغذاء',
    services: [],
  },
  {
    id: 'cities',
    sector: 'الأمن والمدن',
    image: '/ks/cameras.jpg',
    short: {ar: 'أمن ومدن', en: 'Security and cities'},
    title: {ar: 'الأمن والمدن', en: 'Security and cities'},
    line: {
      ar: 'المطارات والمنشآت والمدن تطلب مراقبة تعمل، لا شاشات لا يشاهدها أحد.',
      en: 'Airports, facilities and cities ask for surveillance that works, not screens nobody watches.',
    },
    match: s => s.sector === 'الأمن والمدن',
    services: [],
  },
];

function ProductCard({s, locale}: {s: Solution; locale: Locale}) {
  const ar = locale === 'ar';
  const t = (v: Bi) => (ar ? v.ar : v.en);
  const p = ar ? '/ar' : '';
  const image = PRODUCT_IMAGE[s.slug] || '/ks/health.jpg';
  return <article className={styles.offer}>
    <Link href={`${p}/korean-solutions/${s.slug}`}>
      <div className={styles.offerPhoto}><Image src={image} alt="" fill sizes="(max-width:760px) 100vw, 33vw"/></div>
      <div className={styles.offerBody}>
        <h3>{t(s.title) || s.title.ar}</h3>
        <p>{t(s.problem)}</p>
        <span>{ar ? 'التفاصيل' : 'Details'}</span>
      </div>
    </Link>
  </article>;
}

function ServiceCard({card, locale, sector}: {card: Card; locale: Locale; sector: string}) {
  const ar = locale === 'ar';
  const t = (v: Bi) => (ar ? v.ar : v.en);
  return <article className={styles.offer}>
    <div className={styles.offerPhoto}><Image src={card.image} alt="" fill sizes="(max-width:760px) 100vw, 33vw"/></div>
    <div className={styles.offerBody}>
      <h3>{t(card.title)}</h3>
      <p>{t(card.text)}</p>
      <button type="button" onClick={() => ask(sector, t(card.need))}>{ar ? 'محتاج هذا؟ تواصل معنا' : 'Need this? Contact us'}</button>
    </div>
  </article>;
}

export default function DemandSections({locale, solutions}: {locale: Locale; solutions: Solution[]}) {
  const ar = locale === 'ar';
  const t = (v: Bi) => (ar ? v.ar : v.en);
  const [active, setActive] = useState(SECTIONS[0].id);
  const section = SECTIONS.find(s => s.id === active) || SECTIONS[0];
  const listed = section.match ? solutions.filter(section.match) : [];
  return <div id="sections" className={styles.sections}>
    <div className={styles.tileRow} role="tablist" aria-label={ar ? 'أقسام الطلب' : 'Demand sections'}>
      {SECTIONS.map(s => <button key={s.id} type="button" role="tab" aria-selected={s.id === active} className={styles.tile} onClick={() => setActive(s.id)}>
        <span className={styles.tilePhoto}><Image src={s.image} alt="" fill sizes="(max-width:560px) 50vw, 200px"/></span>
        <span className={styles.tileName}>{t(s.short)}</span>
      </button>)}
    </div>
    <section className={styles.panel} aria-labelledby="demand-title">
      <div className={styles.banner}>
        <div className={styles.bannerPhoto}><Image src={section.image} alt="" fill sizes="(max-width:1240px) 100vw, 1240px" priority={section.id === 'health'}/></div>
        <div className={styles.bannerCopy}>
          <h2 id="demand-title">{t(section.title)}</h2>
          <p>{t(section.line)}</p>
          {section.source && <a className={styles.source} href={section.source.href} target="_blank" rel="noreferrer">{t(section.source.label)}</a>}
        </div>
      </div>
      <p className={styles.photoNote}>{ar
        ? 'الصور توضيحية للمجال، وليست صورة المنتج نفسه. بعض الصور من ويكيميديا كومنز بترخيص CC BY-SA: ISIPLAST لحبيبات البلاستيك، James Grellier لمحطة التحلية، Shefali.assam لجهاز المشي الآلي.'
        : 'Photos illustrate the field. They are not the product itself. Some photos via Wikimedia Commons, CC BY-SA: ISIPLAST (plastic pellets), James Grellier (desalination), Shefali.assam (gait robot).'}</p>
      <div className={styles.offerGrid}>
        {listed.map(s => <ProductCard key={s.slug} s={s} locale={locale}/>)}
        {section.services.map(card => <ServiceCard key={card.title.en} card={card} locale={locale} sector={section.sector}/>)}
      </div>
      <button type="button" className={styles.panelAsk} onClick={() => ask(section.sector, t(section.title))}>{ar ? 'محتاج من هذا القسم؟ تواصل معنا' : 'Need something in this section? Contact us'}</button>
    </section>
  </div>;
}

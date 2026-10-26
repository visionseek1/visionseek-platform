/**
 * Korea Gate | بوابة كوريا — public copy for /korea-gate and /ar/korea-gate.
 * Primary spec: korea-gate/2026-10-27-page-design-trust.md. Verified facts only.
 */

export type Locale = 'ar' | 'en';
export type Bi = {ar: string; en: string};
export const tx = (locale: Locale) => (v: Bi) => (locale === 'ar' ? v.ar : v.en);

export const GATE = '/korea-gate';
export const LOGO = '/korea-gate-logo.webp';
export const LOGO_SIZE = {width: 661, height: 547} as const;
export const UPDATED: Bi = {ar: '26 أكتوبر 2026', en: '26 October 2026'};
export const PROGRAM_LINE: Bi = {
  ar: 'بوابة كوريا برنامجٌ من VisionSeek.',
  en: 'Korea Gate is a programme of VisionSeek.',
};

export const SECTION_IDS = [
  'hero',
  'promise',
  'services',
  'read',
  'exclusive',
  'demand',
  'lead',
  'studies',
  'method',
  'independence',
  'limits',
  'founder',
  'request',
  'trust',
] as const;

export type Source = {label: Bi; href: string};

export const meta = {
  title: {ar: 'بوابة كوريا | VisionSeek', en: 'Korea Gate | VisionSeek'},
  description: {
    ar: 'بوابة كوريا: طريقُ المؤسسة العربية إلى القدرة الكورية. نعمل لصالح المؤسسة العربية وحدها، ونحوّل المعرفة الكورية في الصحة والدواء والذكاء الاصطناعي الطبي إلى قرارات موثّقة المصدر.',
    en: 'Korea Gate: the Arab institution’s path to Korean capability. We work for the Arab institution alone, and turn Korean knowledge in health, medicine and medical AI into sourced decisions.',
  },
};

export const hero = {
  brand: {ar: 'KOREA GATE · VISIONSEEK', en: 'KOREA GATE · VISIONSEEK'},
  tagline: 'Your Gateway to Korea',
  logoAlt: {ar: 'شعار بوابة كوريا', en: 'Korea Gate logo'},
  title: {
    ar: 'بوابة كوريا: طريقُ المؤسسة العربية إلى القدرة الكورية',
    en: 'Korea Gate: the Arab institution’s path to Korean capability',
  },
  lede: {
    ar: 'نحوّل المعرفة الكورية في الصحة والدواء والذكاء الاصطناعي الطبي إلى قرارات عربية موثّقة المصدر.',
    en: 'We turn Korean knowledge in health, medicine and medical AI into Arab decisions that carry their sources.',
  },
  fromInside: {
    ar: 'من داخل كوريا، بلغتك، ولمصلحة مؤسستك.',
    en: 'From inside Korea, in Arabic, for your institution.',
  },
  readCta: {ar: 'اقرأ دراسة مجانية', en: 'Read a free study'},
  requestCta: {ar: 'اطلب دراسة أو استشارة مجانية', en: 'Request a free study or consultation'},
};

export const promise = {
  kicker: {ar: 'الوعد', en: 'The pledge'},
  title: {ar: 'نمثّل المؤسسة العربية', en: 'We represent the Arab institution'},
  quote: {
    ar: 'نعمل لصالح المؤسسة العربية وحدها. كل معلومة نقدّمها معها مصدرها، وتاريخها، وبيانٌ صريح: هل هي مؤكدة أم استنتاج.',
    en: 'We work for the Arab institution alone. Every fact we present carries its source, its date, and a plain mark: confirmed, or an inference.',
  },
};

export type Service = {
  id: string;
  title: Bi;
  gets: Bi;
  tier: 'free' | 'paid';
  tierLabel: Bi;
};

export const servicesIntro: Bi = {
  ar: 'خدماتٌ محددة النطاق، تبدأ مجانًا. نوجّه ونُعِدّ ونقارن، والقرار والتقديم الرسمي يبقيان بيد مؤسستك.',
  en: 'Services of a defined scope, beginning at no charge. We guide, prepare and compare. The decision and the official filing remain with your institution.',
};

export const servicesHead = {
  kicker: {ar: 'الخدمات', en: 'Services'},
  title: {ar: 'خدمات تطلبها اليوم', en: 'Services you can request today'},
};

export const services: Service[] = [
  {
    id: 'consult',
    title: {ar: 'استشارة أولية (30 دقيقة)', en: 'First consultation (30 minutes)'},
    gets: {
      ar: 'محضر قصير: الاحتياج، وأقرب مسار كوري، والخطوة الأولى.',
      en: 'A short record: the need, the nearest Korean path, and the first step.',
    },
    tier: 'free',
    tierLabel: {ar: 'مجانية', en: 'Free'},
  },
  {
    id: 'study',
    title: {ar: 'دراسة مؤسسية عامة', en: 'General institution study'},
    gets: {
      ar: 'دراسة من ثلاث إلى أربع صفحات لنوع مؤسستك. خمس دراسات جاهزة للمستشفيات، ومصانع الدواء، والهيئات التنظيمية، والكليات، والذكاء الاصطناعي الطبي.',
      en: 'A three-to-four-page study for your kind of institution. Five studies are ready: hospitals, medicine manufacturers, regulators, colleges, and medical AI.',
    },
    tier: 'free',
    tierLabel: {ar: 'مجانية', en: 'Free'},
  },
  {
    id: 'memo',
    title: {ar: 'مذكرة الطريق الأولى', en: 'The first Gate Memo'},
    gets: {
      ar: 'مذكرة من صفحتين: الاحتياج، والخيارات الكورية، ومسار الامتلاك، والمخاطر، وملاحظات تنظيمية. المذكرة الأولى مجانية.',
      en: 'A two-page memo: the need, Korean options, the ownership path, risks, and regulatory notes. The first memo is free.',
    },
    tier: 'free',
    tierLabel: {ar: 'مجانية', en: 'Free'},
  },
  {
    id: 'feasibility',
    title: {ar: 'دراسة جدوى لمنتج أو تقنية من كوريا', en: 'Feasibility study for a Korean product or technology'},
    gets: {
      ar: 'الموقف التنظيمي في كوريا، والبدائل الكورية، والفجوة مع متطلبات بلدك، وقرار مقترح.',
      en: 'The Korean regulatory position, Korean alternatives, the gap with your country’s requirements, and a proposed decision.',
    },
    tier: 'paid',
    tierLabel: {ar: 'بأتعاب', en: 'Paid'},
  },
  {
    id: 'regulatory',
    title: {ar: 'دليل المسار التنظيمي وقائمة المستندات', en: 'Regulatory-path guide and document list'},
    gets: {
      ar: 'خريطة خطوات وقائمة مستندات ومقارنة متطلبات، ومراجعة الملف قبل أن تقدّمه مؤسستك بنفسها. نُعدّك للتقديم.',
      en: 'A step map, a document list, a comparison of requirements, and a review of the file before your institution files it itself. We prepare you to file.',
    },
    tier: 'paid',
    tierLabel: {ar: 'بأتعاب', en: 'Paid'},
  },
  {
    id: 'partners',
    title: {ar: 'خريطة الشركاء والمصادر الكورية', en: 'Map of Korean counterparts and sources'},
    gets: {
      ar: 'قائمة بجهات كورية — شركات ومستشفيات وجامعات وبرامج حكومية — ومصدر كل واحدة، دون تواصل باسم العميل.',
      en: 'A list of Korean parties — firms, hospitals, universities and public programmes — each with its source, and with no outreach in the client’s name.',
    },
    tier: 'paid',
    tierLabel: {ar: 'بأتعاب', en: 'Paid'},
  },
  {
    id: 'briefing',
    title: {ar: 'إحاطة عربية مخصّصة بالقواعد الكورية', en: 'A tailored Arabic briefing of Korean rules'},
    gets: {
      ar: 'ملخص عربي لقانون أو لائحة أو دعوة تمويل كورية، مع الرابط الرسمي. عدد الرادار يُقرأ مجانًا؛ الإحاطة المخصّصة بأتعاب.',
      en: 'An Arabic digest of a Korean statute, regulation or funding call, with the official link. The radar issue is free to read; a tailored briefing is paid.',
    },
    tier: 'paid',
    tierLabel: {ar: 'بأتعاب', en: 'Paid'},
  },
];

export const readHead = {
  kicker: {ar: 'اقرأ قبل أن تتواصل', en: 'Read before you write'},
  title: {ar: 'لا نطلب منك أن تثق بنا، بل أن تقرأ', en: 'We do not ask you to trust us. We ask you to read.'},
  lede: {
    ar: 'دليل حقيقي يُقرأ دون تسجيل: خمس دراسات، ومذكرة طريق نموذجية، وعدد من «ذكاء كوريا»، ومقتطف من خريطة القدرات.',
    en: 'A real brief, readable without a registration: five studies, a sample Gate Memo, an issue of Korea Intelligence, and an excerpt from the capability map.',
  },
};

export type DocKind = 'study' | 'sample';
export type DocCard = {
  kind: DocKind;
  slug: string;
  href: string;
  title: Bi;
  blurb: Bi;
  date: Bi;
  sources: number;
  badge?: Bi;
  extra?: Bi;
};

export const documents: DocCard[] = [
  {
    kind: 'study',
    slug: 'hospitals',
    href: `${GATE}/studies/hospitals`,
    title: {ar: 'المستشفيات', en: 'Hospitals'},
    blurb: {
      ar: 'أقوى قدرة: وحدة داخلية لتقييم الذكاء الاصطناعي وحوكمته. الخطوة الأولى: جرد الأدوات والأنظمة ومن يملك معرفتها.',
      en: 'Strongest capability: an internal unit to assess and govern AI. First step: an inventory of tools, systems, and who owns the know-how.',
    },
    date: UPDATED,
    sources: 11,
  },
  {
    kind: 'study',
    slug: 'pharma',
    href: `${GATE}/studies/pharma`,
    title: {ar: 'مصانع الدواء', en: 'Medicine manufacturers'},
    blurb: {
      ar: 'أقوى قدرة: فريق تشغيل معقّم وضبط جودة للبيولوجي. الخطوة الأولى: اختيار قدرة واحدة وترشيح ثلاثة إلى خمسة موظفين.',
      en: 'Strongest capability: a sterile-operations and quality team for biologics. First step: choose one capability and name three to five staff.',
    },
    date: UPDATED,
    sources: 12,
  },
  {
    kind: 'study',
    slug: 'regulators',
    href: `${GATE}/studies/regulators`,
    title: {ar: 'الهيئات التنظيمية', en: 'Regulators'},
    blurb: {
      ar: 'أقوى قدرة: إطار عربي للذكاء الاصطناعي في الأجهزة الطبية. الخطوة الأولى: اختيار ملف تنظيمي واحد لمقارنة مفصّلة.',
      en: 'Strongest capability: an Arab frame for AI in medical devices. First step: choose one regulatory file for a close comparison.',
    },
    date: UPDATED,
    sources: 10,
  },
  {
    kind: 'study',
    slug: 'universities',
    href: `${GATE}/studies/universities`,
    title: {ar: 'كليات الصيدلة والطب', en: 'Pharmacy and medicine colleges'},
    blurb: {
      ar: 'أقوى قدرة: مقرر ومختبر تدريب في التصنيع الحيوي وGMP. الخطوة الأولى: إرسال توصيف مقرر قائم للمقارنة.',
      en: 'Strongest capability: a course and a training lab in biomanufacturing and GMP. First step: send one existing course outline for comparison.',
    },
    date: UPDATED,
    sources: 7,
  },
  {
    kind: 'study',
    slug: 'medical-ai',
    href: `${GATE}/studies/medical-ai`,
    title: {ar: 'الذكاء الاصطناعي الطبي', en: 'Medical AI'},
    blurb: {
      ar: 'أقوى قدرة: ملف تنظيمي جاهز لعدة أسواق. الخطوة الأولى: اختيار منتج واحد لمصفوفة متطلبات.',
      en: 'Strongest capability: a regulatory file ready for several markets. First step: choose one product for a requirements matrix.',
    },
    date: UPDATED,
    sources: 9,
  },
  {
    kind: 'sample',
    slug: 'gate-memo',
    href: `${GATE}/samples/gate-memo`,
    title: {ar: 'نموذج مذكرة الطريق — الصحة والدواء', en: 'Sample Gate Memo — health and medicine'},
    blurb: {
      ar: 'مذكرة من صفحتين على قالب البوابة: احتياج، وخيارات كورية، ومسار امتلاك.',
      en: 'A two-page memo on the Gate template: the need, Korean options, and an ownership path.',
    },
    date: UPDATED,
    sources: 4,
    badge: {ar: 'مثالٌ توضيحي، لا يخصّ عميلًا حقيقيًا', en: 'An illustrative example. It does not belong to a real client.'},
  },
  {
    kind: 'sample',
    slug: 'radar',
    href: `${GATE}/samples/radar`,
    title: {ar: '«ذكاء كوريا» العدد 1', en: 'Korea Intelligence, issue 1'},
    blurb: {
      ar: 'أكتوبر 2026. أخبار الصحة والدواء، ومعها الرادار التنظيمي.',
      en: 'October 2026. Health and medicine news, with the regulatory radar.',
    },
    date: {ar: 'أكتوبر 2026', en: 'October 2026'},
    sources: 8,
  },
  {
    kind: 'sample',
    slug: 'capability-map',
    href: `${GATE}/samples/capability-map`,
    title: {ar: 'مقتطف من خريطة القدرات — الصحة والدواء', en: 'Excerpt from the capability map — health and medicine'},
    blurb: {
      ar: 'النسخة 1. جهات كورية حقيقية، وكل سطر برابط. ليست ترتيبًا ولا توصية.',
      en: 'Version 1. Real Korean parties, each row with a link. Not a ranking and not a recommendation.',
    },
    date: UPDATED,
    sources: 6,
    extra: {ar: 'مقتطف', en: 'Excerpt'},
  },
];

export const exclusiveHead = {
  kicker: {ar: 'ما لن تجده إلا هنا', en: 'What you will not find elsewhere'},
  title: {ar: 'قواعد كورية، بالعربية، مع نصّها الرسمي', en: 'Korean rules, in Arabic, with the official text'},
  lede: {
    ar: 'قواعد مكتوبة بالكورية وحدها، نقلناها إلى العربية مع نصّها الرسمي. ثلاثة أمثلة مؤكدة.',
    en: 'Rules written in Korean alone, carried into Arabic with their official text. Three confirmed examples.',
  },
};

export const exclusive = [
  {
    id: 'risk-docs',
    text: {
      ar: 'يُلزم القانون الكوري مشغّل الذكاء الاصطناعي في الصحة بحفظ مستندات إدارة المخاطر خمس سنوات، ومن حق المستشفى العربي أن يطلبها من المورّد.',
      en: 'Korean law requires a health-AI operator to keep risk-management records for five years. An Arab hospital is entitled to ask the supplier for them.',
    },
    mark: {ar: 'مؤكد بمصدر', en: 'Confirmed with a source'},
    source: {label: {ar: 'law.go.kr — اللائحة، المادة 27', en: 'law.go.kr — the enforcement decree, article 27'}, href: 'https://www.law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=198083'},
  },
  {
    id: 'digital-quality',
    text: {
      ar: 'المنتج الطبي الرقمي الحاصل على نظام جودة بموجب قانون المنتجات الطبية الرقمية يُعدّ مستوفيًا لجزء من التزامات قانون الذكاء الاصطناعي.',
      en: 'A digital medical product that holds a quality system under the Digital Medical Products Act is treated as meeting part of the duties of the AI Act.',
    },
    mark: {ar: 'مؤكد بمصدر', en: 'Confirmed with a source'},
    source: {label: {ar: 'law.go.kr — جدول اللائحة', en: 'law.go.kr — the decree schedule'}, href: 'https://www.law.go.kr/LSW/flDownload.do?bylClsCd=110201&flSeq=161163591&gubun='},
  },
  {
    id: 'cdmo-law',
    text: {
      ar: 'يسري القانون الكوري لتطوير صناعة التصنيع الحيوي بالتعاقد في 31 كانون الأول/ديسمبر 2026.',
      en: 'The Korean special act on the contract biologics-manufacturing industry takes effect on 31 December 2026.',
    },
    mark: {ar: 'مؤكد بمصدر', en: 'Confirmed with a source'},
    source: {label: {ar: 'law.go.kr — القانون رقم 21297', en: 'law.go.kr — Act no. 21297'}, href: 'https://law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010202&lsId=015006&lsRvsGubun=all'},
  },
];

export const demandHead = {
  kicker: {ar: 'ما يطلبه العالم العربي من كوريا', en: 'What the Arab world seeks from Korea'},
  title: {ar: 'ثلاث طبقات: منتج، ثم مشروع، ثم ذكاء اصطناعي', en: 'Three layers: a product, then a project, then AI'},
  lede: {
    ar: 'بلغت الصادرات الكورية إلى الشرق الأوسط 20.44 مليار دولار في 2025، منها 5.66 مليار للإمارات و4.86 مليار للسعودية، أي نحو 3% فقط من صادرات كوريا. الطلب العربي يقوم على ثلاث طبقات. الطبقة الثالثة — الذكاء الاصطناعي والصحة الرقمية — هي الأقرب إلى عمل البوابة، لأن قيمتها في المعرفة والتشغيل لا في الشحن.',
    en: 'Korean exports to the Middle East reached 20.44 billion dollars in 2025, of which 5.66 billion went to the UAE and 4.86 billion to Saudi Arabia — about 3% of Korea’s exports. Arab demand sits in three layers. The third — AI and digital health — is closest to the Gate’s work, because its value is in knowledge and operation, not in a shipment.',
  },
  offer: {ar: 'ما نقدّمه نحن', en: 'What we offer'},
  mark: {ar: 'مؤكد بمصدر', en: 'Confirmed with a source'},
};

export const demandLayers: {
  id: string;
  title: Bi;
  rows: {item: Bi; evidence: Bi; offer: Bi; source: Source}[];
}[] = [
  {
    id: 'products',
    title: {ar: 'طبقة المنتجات', en: 'The product layer'},
    rows: [
      {
        item: {ar: 'الأجهزة الطبية والبصرية وأجهزة القياس', en: 'Medical, optical and measuring devices'},
        evidence: {ar: '127 مليون دولار إلى السعودية في 2025.', en: '127 million dollars to Saudi Arabia in 2025.'},
        offer: {
          ar: 'مقارنة متطلبات التسجيل بين الهيئة الكورية وهيئة بلدك، وبناء قدرة التقييم الفني داخل المستشفى.',
          en: 'A comparison of registration requirements between the Korean authority and yours, and a technical-assessment capability inside the hospital.',
        },
        source: {label: {ar: 'تجميع UN Comtrade', en: 'UN Comtrade compilation'}, href: 'https://corplox.net/trade/kr/sa'},
      },
      {
        item: {ar: 'الأدوية', en: 'Medicines'},
        evidence: {ar: '54 مليون دولار إلى السعودية في 2025. وصادرات كوريا من المنتجات الصحية الحيوية بلغت 16.3 مليار دولار.', en: '54 million dollars to Saudi Arabia in 2025. Korea’s bio-health exports reached 16.3 billion dollars.'},
        offer: {
          ar: 'التركيز على قدرة التصنيع وضبط الجودة، لا على استيراد المنتج.',
          en: 'The focus is manufacturing and quality capability, not importing the finished product.',
        },
        source: {label: {ar: 'تجميع UN Comtrade · MOTIR', en: 'UN Comtrade compilation · MOTIR'}, href: 'https://english.motir.go.kr/eng/article/EATCLdfa319ada/2470/view'},
      },
    ],
  },
  {
    id: 'services',
    title: {ar: 'طبقة الخدمات والمشاريع', en: 'The services and projects layer'},
    rows: [
      {
        item: {ar: 'نظم معلومات المستشفيات والمستشفيات الذكية', en: 'Hospital information systems and smart hospitals'},
        evidence: {ar: 'تصدّر كوريا نظم معلومات المستشفيات إلى السعودية منذ 2012. واتفق البلدان على تحديث مذكرة 2016 لتشمل المستشفيات الذكية والجراحة الروبوتية والذكاء الاصطناعي.', en: 'Korea has exported hospital information systems to Saudi Arabia since 2012. The two countries agreed to update a 2016 memorandum to cover smart hospitals, robotic surgery and AI.'},
        offer: {
          ar: 'جرد الأنظمة، وتحديد من يملك المعرفة، وتأسيس وحدة حوكمة داخلية.',
          en: 'An inventory of systems, a clear account of who owns the know-how, and an internal governance unit.',
        },
        source: {label: {ar: 'وزارة الصحة والرعاية الاجتماعية الكورية', en: 'Korean Ministry of Health and Welfare'}, href: 'https://www.mohw.go.kr/board.es?act=view&bid=0032&list_no=1487844&mid=a20401000000'},
      },
      {
        item: {ar: 'تدريب الكوادر الصحية', en: 'Training of health personnel'},
        evidence: {ar: 'اتفقت كوريا والسعودية على توسيع التدريب ليشمل الممرضين والصيادلة والفنيين، مع دورات عبر الإنترنت وتجارب سريرية مشتركة.', en: 'Korea and Saudi Arabia agreed to widen training to nurses, pharmacists and technicians, with online courses and joint clinical work.'},
        offer: {
          ar: 'تصميم مسار امتلاك القدرة وربطه بالمقررات الجامعية.',
          en: 'A path to own the capability, tied to university courses.',
        },
        source: {label: {ar: 'Korea Biomedical Review', en: 'Korea Biomedical Review'}, href: 'https://www.koreabiomed.com/news/articleView.html?idxno=29501'},
      },
    ],
  },
  {
    id: 'ai',
    title: {ar: 'طبقة الذكاء الاصطناعي', en: 'The AI layer'},
    rows: [
      {
        item: {ar: 'مراكز بيانات الذكاء الاصطناعي — Stargate الإمارات', en: 'AI data centres — Stargate UAE'},
        evidence: {ar: 'انضمت كوريا إلى مشروع Stargate الإمارات في نوفمبر 2025. المخطط يصل إلى 5 غيغاواط، وأول 200 ميغاواط مقرر تشغيلها في 2026.', en: 'Korea joined the UAE Stargate project in November 2025. The plan reaches 5 gigawatts, with the first 200 megawatts due in 2026.'},
        offer: {
          ar: 'للمستشفيات والجامعات: سياسات استخدام الحوسبة السحابية وسيادة البيانات الصحية.',
          en: 'For hospitals and universities: policies for cloud use and the sovereignty of health data.',
        },
        source: {label: {ar: 'وزارة العلوم وتقنية المعلومات الكورية', en: 'Korean Ministry of Science and ICT'}, href: 'https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&mId=4&nttSeqNo=1192&sCode=eng'},
      },
      {
        item: {ar: 'حزمة صناعية مع Aramco Digital', en: 'An industrial package with Aramco Digital'},
        evidence: {ar: 'وقّعت سبع شركات كورية مذكرة تفاهم مع Aramco Digital في فبراير 2026.', en: 'Seven Korean firms signed a memorandum with Aramco Digital in February 2026.'},
        offer: {
          ar: 'نموذج قابل للنقل إلى القطاع الصحي.',
          en: 'A model that can be carried into the health sector.',
        },
        source: {label: {ar: 'korea.kr', en: 'korea.kr'}, href: 'https://www.korea.kr/news/policyNewsView.do?newsId=148958950'},
      },
      {
        item: {ar: 'الذكاء الاصطناعي الطبي', en: 'Medical AI'},
        evidence: {ar: 'عُرضت حلول كورية في التحليل السريري والسجل الطبي في التجمع الصحي العالمي 2025 بالرياض، واقترح الجانب السعودي التعاون عبر مستشفى صحة الافتراضي.', en: 'Korean tools for clinical analysis and the medical record were shown at the Global Health Exhibition 2025 in Riyadh. The Saudi side proposed cooperation through the Seha Virtual Hospital.'},
        offer: {
          ar: 'ملف تنظيمي لعدة أسواق، وتقييم داخلي للأدوات.',
          en: 'A regulatory file for several markets, and an internal assessment of the tools.',
        },
        source: {label: {ar: 'وزارة الصحة والرعاية الاجتماعية الكورية', en: 'Korean Ministry of Health and Welfare'}, href: 'https://www.mohw.go.kr/board.es?act=view&bid=0032&list_no=1487844&mid=a20401000000'},
      },
    ],
  },
];

export const demandSources: Source[] = [
  {label: {ar: 'KITA — تجارة كوريا مع الشرق الأوسط 2025', en: 'KITA — Korea’s Middle East trade, 2025'}, href: 'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=100059&siteId=1'},
  {label: {ar: 'MOTIR — صادرات 2025', en: 'MOTIR — 2025 exports'}, href: 'https://english.motir.go.kr/eng/article/EATCLdfa319ada/2470/view'},
];

export const leadHead = {
  kicker: {ar: 'مجالات الريادة الكورية', en: 'Korea’s domains of leadership'},
  title: {ar: 'أين تقف كوريا الأولى، وما الذي يُنقل قدرةً', en: 'Where Korea stands first, and what can be owned'},
  lede: {
    ar: 'لا نُدرج مجالًا إلا بدليل من مصدر تصنيف أو بيانات سوق. كل مجال موسوم: قدرةٌ تُنقل، أو تُشترى.',
    en: 'A domain is listed only with a ranking or a market source. Each one is marked: a capability that can be transferred, or one that is bought.',
  },
};

export const leadItems: {
  id: string;
  title: Bi;
  evidence: Bi;
  meaning: Bi;
  mode: 'transfer' | 'buy' | 'mixed';
  modeLabel: Bi;
  source: Source;
}[] = [
  {
    id: 'egov',
    title: {ar: 'الحكومة الإلكترونية', en: 'E-government'},
    evidence: {ar: 'المرتبة 4 من 193 في مسح الأمم المتحدة للحكومة الإلكترونية 2024.', en: 'Ranked 4 of 193 in the United Nations E-Government Survey 2024.'},
    meaning: {
      ar: 'القيمة للمؤسسة العربية في تطبيقات قطاعية محددة — كتسجيل الدواء والتتبّع — لا في الصورة العامة.',
      en: 'For an Arab institution the value sits in a sector application — medicine registration and traceability — not in the general rank.',
    },
    mode: 'transfer',
    modeLabel: {ar: 'قدرةٌ تُنقل', en: 'A capability to transfer'},
    source: {label: {ar: 'UN EGDI 2024', en: 'UN EGDI 2024'}, href: 'https://publicadministration.un.org/egovkb/en-us/Data/Country-Information/id/138-Republic-of-Korea'},
  },
  {
    id: 'robots',
    title: {ar: 'كثافة الروبوتات الصناعية', en: 'Industrial robot density'},
    evidence: {ar: 'الأولى عالميًا: 1,220 روبوتًا لكل 10,000 عامل في الصناعة التحويلية.', en: 'First in the world: 1,220 robots per 10,000 workers in manufacturing.'},
    meaning: {
      ar: 'أتمتة خطوط إنتاج الدواء وصيدليات المستشفيات. الأجهزة تُشترى؛ وهندسة الأتمتة وصيانتها قابلتان للنقل.',
      en: 'Automation of medicine lines and hospital pharmacies. The machines are bought; the engineering and the maintenance can be transferred.',
    },
    mode: 'mixed',
    modeLabel: {ar: 'تُشترى، وتُنقل هندستها', en: 'Bought; the engineering transfers'},
    source: {label: {ar: 'IFR', en: 'IFR'}, href: 'https://ifr.org/news/robot-density-surges-in-europe-asia-and-americas/'},
  },
  {
    id: 'lng',
    title: {ar: 'ناقلات الغاز المسال', en: 'LNG carriers'},
    evidence: {ar: '66% من الطلبات القائمة لناقلات الغاز المسال.', en: '66% of the existing order book for LNG carriers.'},
    meaning: {
      ar: 'يُشترى أساسًا. وتدريب الكوادر البحرية ممكن.',
      en: 'Bought, in the main. Training of seafarers is possible.',
    },
    mode: 'buy',
    modeLabel: {ar: 'تُشترى', en: 'Bought'},
    source: {label: {ar: 'Clarksons', en: 'Clarksons'}, href: 'https://www.clarksons.com/home/news-and-insights/2025/lng-shipping-short-term-headwinds-long-term-growth/'},
  },
  {
    id: 'hbm',
    title: {ar: 'الذاكرة عالية النطاق لرقائق الذكاء الاصطناعي', en: 'HBM memory for AI chips'},
    evidence: {ar: 'SK hynix تواصل الهيمنة على إنتاج الذاكرة عالية النطاق. وبلغت صادرات أشباه الموصلات الكورية 173.4 مليار دولار في 2025.', en: 'SK hynix continues to dominate HBM production. Korean semiconductor exports reached 173.4 billion dollars in 2025.'},
    meaning: {
      ar: 'أساس مراكز بيانات الذكاء الاصطناعي في الخليج. يُشترى فقط.',
      en: 'The base of Gulf AI data centres. Bought only.',
    },
    mode: 'buy',
    modeLabel: {ar: 'تُشترى', en: 'Bought'},
    source: {label: {ar: 'TrendForce · MOTIR', en: 'TrendForce · MOTIR'}, href: 'https://english.motir.go.kr/eng/article/EATCLdfa319ada/2470/view'},
  },
  {
    id: 'bio',
    title: {ar: 'الصحة الحيوية', en: 'Bio-health'},
    evidence: {ar: 'صادرات 16.3 مليار دولار في 2025. ويسري قانون تطوير صناعة التصنيع الحيوي بالتعاقد في 31 كانون الأول/ديسمبر 2026.', en: 'Exports of 16.3 billion dollars in 2025. The contract-biologics industry act takes effect on 31 December 2026.'},
    meaning: {
      ar: 'لمصانع الدواء والجامعات: التصنيع البيولوجي والتشغيل المعقّم. الكفاءات والجودة قابلة للنقل.',
      en: 'For manufacturers and universities: biomanufacturing and sterile operation. Skills and quality can be transferred.',
    },
    mode: 'transfer',
    modeLabel: {ar: 'قدرةٌ تُنقل', en: 'A capability to transfer'},
    source: {label: {ar: 'MOTIR · law.go.kr', en: 'MOTIR · law.go.kr'}, href: 'https://law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010202&lsId=015006&lsRvsGubun=all'},
  },
  {
    id: 'his',
    title: {ar: 'نظم معلومات المستشفيات', en: 'Hospital information systems'},
    evidence: {ar: 'تصدّر كوريا هذه النظم إلى السعودية منذ 2012.', en: 'Korea has exported these systems to Saudi Arabia since 2012.'},
    meaning: {
      ar: 'الحوكمة والتشغيل وملكية المعرفة قابلة للنقل.',
      en: 'Governance, operation and ownership of the know-how can be transferred.',
    },
    mode: 'transfer',
    modeLabel: {ar: 'قدرةٌ تُنقل', en: 'A capability to transfer'},
    source: {label: {ar: 'وزارة الصحة والرعاية الاجتماعية الكورية', en: 'Korean Ministry of Health and Welfare'}, href: 'https://www.mohw.go.kr/board.es?act=view&bid=0032&list_no=1487844&mid=a20401000000'},
  },
];

export const studiesHead = {
  kicker: {ar: 'الدراسات الخمس', en: 'The five studies'},
  title: {ar: 'اختر نوع مؤسستك', en: 'Choose your kind of institution'},
  lede: {
    ar: 'كل بطاقة تحمل أقوى قدرة والخطوة الأولى. الدراسة تُقرأ هنا، دون تسجيل.',
    en: 'Each card names the strongest capability and the first step. The study is read here, without a registration.',
  },
  cta: {ar: 'اقرأ الدراسة', en: 'Read the study'},
};

export const methodHead = {
  kicker: {ar: 'المنهجية ومعيار المصادر', en: 'Method and the source standard'},
  title: {ar: 'معيارنا: لا معلومة بلا مصدر', en: 'Our standard: no fact without a source'},
};

export const methodItems: {title: Bi; text: Bi}[] = [
  {
    title: {ar: 'وسم صريح على كل معلومة', en: 'A plain mark on every fact'},
    text: {
      ar: 'كل معلومة عليها وسم «مؤكد بمصدر» أو «استنتاج». لا تُخلط الاثنتان.',
      en: 'Every fact is marked “confirmed with a source” or “inference”. The two are not mixed.',
    },
  },
  {
    title: {ar: 'الرسمي الكوري أولًا', en: 'Official Korean sources first'},
    text: {
      ar: 'الأولوية للمصادر الرسمية الكورية — law.go.kr، وهيئة الغذاء والدواء الكورية، وkorea.kr — قبل الإعلام.',
      en: 'Official Korean sources come first — law.go.kr, the Korean Ministry of Food and Drug Safety, and korea.kr — ahead of the press.',
    },
  },
  {
    title: {ar: 'تاريخ آخر تحديث', en: 'A last-updated date'},
    text: {
      ar: 'كل صفحة تحمل تاريخ آخر تحديث. هذه الصفحة: 26 أكتوبر 2026.',
      en: 'Every page carries a last-updated date. This page: 26 October 2026.',
    },
  },
  {
    title: {ar: 'تقادم الأدلة', en: 'How evidence ages'},
    text: {
      ar: 'الأرقام التجارية تُراجع كل سنة، والتنظيمية كل ثلاثة أشهر. والمعلومة التي جاوزت مدتها تُعلَّم «قيد المراجعة».',
      en: 'Trade figures are reviewed each year, regulatory facts every three months. A fact past its term is marked “under review”.',
    },
  },
];

export const independence = {
  kicker: {ar: 'بيان الاستقلال', en: 'Independence'},
  title: {ar: 'مع المؤسسة العربية، لا مع البائع الكوري', en: 'With the Arab institution, not the Korean seller'},
  quote: {
    ar: 'نمثّل المؤسسة العربية لا البائع الكوري. لا نتقاضى عمولات من الشركات الكورية، ولا نروّج لمنتجٍ بعينه، ولا يملك أي طرف سلطةً على ما ننشره.',
    en: 'We represent the Arab institution, not the Korean seller. We take no commission from Korean firms, we promote no single product, and no party holds power over what we publish.',
  },
};

export const limits = {
  kicker: {ar: 'ما لا نفعله', en: 'What we do not do'},
  title: {ar: 'لكي تثق بما نفعله، نخبرك بما لا نفعله', en: 'To trust what we do, read what we will not do'},
  quote: {
    ar: 'لا نقدّم توظيفًا مدفوعًا، ولا استشاراتٍ استثمارية، ولا ترتيب سفر أو سكن، ولا معاملات تأشيرات، ولا نبيع منتجات، ولا نقدّم الملفات الرسمية نيابةً عنك.',
    en: 'We do not offer paid recruitment, investment advice, travel or lodging, visa paperwork, the sale of products, or the filing of official papers in your name.',
  },
};

export const founder = {
  kicker: {ar: 'المؤسس', en: 'The founder'},
  name: {ar: 'د. أحمد عبدالعليم', en: 'Ahmed Abdelalim'},
  role: {
    ar: 'المؤسس وكبير مهندسي القدرات، VisionSeek',
    en: 'Founder & Chief Capability Architect, VisionSeek',
  },
  degree: {ar: 'بكالوريوس صيدلة، جامعة الأزهر', en: 'BPharm, Al-Azhar University'},
  base: {ar: 'يقيم في إنتشون، كوريا.', en: 'Based in Incheon, Korea.'},
  papersLabel: {ar: 'بحثان محكّمان', en: 'Two peer-reviewed papers'},
  photo: '/ahmed-abdelalim-2026.jpg',
  photoAlt: {ar: 'د. أحمد عبدالعليم', en: 'Ahmed Abdelalim'},
  papers: [
    {
      text: {
        ar: 'Elkaeed EB, Eissa IH, Elkady H, Abdelalim A, et al. A Multistage In Silico Study of Natural Potential Inhibitors Targeting SARS-CoV-2 Main Protease. International Journal of Molecular Sciences، 2022.',
        en: 'Elkaeed EB, Eissa IH, Elkady H, Abdelalim A, et al. A Multistage In Silico Study of Natural Potential Inhibitors Targeting SARS-CoV-2 Main Protease. International Journal of Molecular Sciences, 2022.',
      },
      href: 'https://doi.org/10.3390/ijms23158407',
      doi: '10.3390/ijms23158407',
    },
    {
      text: {
        ar: 'Zaazouee MS, Alwarraqi AG, Mohammed YA, Badheeb MA, Farhat AM, Eleyan M, Morad A, Zeid MA, Mohamed AS, AbuEl-Enien H, Abdelalim A, et al. Dupilumab efficacy and safety in patients with moderate to severe asthma: A systematic review and meta-analysis. Frontiers in Pharmacology، 2022.',
        en: 'Zaazouee MS, Alwarraqi AG, Mohammed YA, Badheeb MA, Farhat AM, Eleyan M, Morad A, Zeid MA, Mohamed AS, AbuEl-Enien H, Abdelalim A, et al. Dupilumab efficacy and safety in patients with moderate to severe asthma: A systematic review and meta-analysis. Frontiers in Pharmacology, 2022.',
      },
      href: 'https://doi.org/10.3389/fphar.2022.992731',
      doi: '10.3389/fphar.2022.992731',
    },
  ],
};

export const request = {
  kicker: {ar: 'الدعوة', en: 'The invitation'},
  title: {ar: 'اطلب دراسة أو استشارة مجانية', en: 'Request a free study or consultation'},
  lede: {
    ar: 'أربعة حقول. الجهة، ونوعها، والبلد، والاحتياج في سطر.',
    en: 'Four fields. The institution, its type, the country, and the need in one line.',
  },
  org: {ar: 'الجهة', en: 'Institution'},
  type: {ar: 'نوع الجهة', en: 'Type of institution'},
  country: {ar: 'البلد', en: 'Country'},
  need: {ar: 'الاحتياج في سطر', en: 'The need, in one line'},
  submit: {ar: 'اطلب دراسة أو استشارة مجانية', en: 'Request a free study or consultation'},
  doneTitle: {ar: 'حُفظ طلبك في هذه الجلسة', en: 'Your request is held in this session'},
  doneBody: {
    ar: 'لم يُرسل إلى أي نظام خارج هذه الصفحة. الربط النهائي لنظام الاستقبال لم يُفتح بعد.',
    en: 'Nothing was sent outside this page. The live intake connection is not open yet.',
  },
  another: {ar: 'اكتب طلبًا آخر', en: 'Write another request'},
};

export const TYPES: {value: string; label: Bi}[] = [
  {value: 'hospital', label: {ar: 'مستشفى', en: 'Hospital'}},
  {value: 'pharma', label: {ar: 'مصنع دواء', en: 'Medicine manufacturer'}},
  {value: 'regulator', label: {ar: 'هيئة تنظيمية', en: 'Regulatory authority'}},
  {value: 'university', label: {ar: 'كلية صيدلة أو طب', en: 'Pharmacy or medicine college'}},
  {value: 'medical-ai', label: {ar: 'جهة ذكاء اصطناعي طبي', en: 'Medical-AI organisation'}},
  {value: 'other', label: {ar: 'نوع آخر', en: 'Another type'}},
];

export const COUNTRIES: {value: string; label: Bi}[] = [
  {value: 'مصر', label: {ar: 'مصر', en: 'Egypt'}},
  {value: 'السعودية', label: {ar: 'السعودية', en: 'Saudi Arabia'}},
  {value: 'الإمارات', label: {ar: 'الإمارات', en: 'United Arab Emirates'}},
  {value: 'قطر', label: {ar: 'قطر', en: 'Qatar'}},
  {value: 'الكويت', label: {ar: 'الكويت', en: 'Kuwait'}},
  {value: 'البحرين', label: {ar: 'البحرين', en: 'Bahrain'}},
  {value: 'عُمان', label: {ar: 'عُمان', en: 'Oman'}},
  {value: 'أخرى', label: {ar: 'بلد آخر', en: 'Another country'}},
];

export const trust = {
  updated: {ar: 'آخر تحديث', en: 'Last updated'},
  method: {ar: 'المنهجية', en: 'Method'},
  independence: {ar: 'بيان الاستقلال', en: 'Independence'},
  limits: {ar: 'ما لا نفعله', en: 'What we do not do'},
  privacy: {ar: 'الخصوصية', en: 'Privacy'},
};

export const chrome = {
  sections: {ar: 'أقسام بوابة كوريا', en: 'Korea Gate sections'},
  name: {ar: 'بوابة كوريا', en: 'Korea Gate'},
  readStudy: {ar: 'اقرأ الدراسة', en: 'Read the study'},
  readSample: {ar: 'اقرأ النموذج', en: 'Read the sample'},
  source: {ar: 'المصدر', en: 'Source'},
  confirmed: {ar: 'مؤكد بمصدر', en: 'Confirmed with a source'},
  inference: {ar: 'استنتاج', en: 'Inference'},
  back: {ar: 'بوابة كوريا', en: 'Korea Gate'},
  print: {ar: 'اطبع', en: 'Print'},
  sourcesCount: {ar: 'مصدرًا', en: 'sources'},
};

export function localePrefix(locale: Locale): string {
  return locale === 'ar' ? '/ar' : '';
}

export function gateHref(locale: Locale, path = ''): string {
  return `${localePrefix(locale)}${GATE}${path}`;
}

export const studies = documents.filter(d => d.kind === 'study');
export const samples = documents.filter(d => d.kind === 'sample');
export const studyBySlug = (slug: string) => studies.find(d => d.slug === slug);
export const sampleBySlug = (slug: string) => samples.find(d => d.slug === slug);
export const documentByPath = (kind: DocKind, slug: string) =>
  documents.find(d => d.kind === kind && d.slug === slug);

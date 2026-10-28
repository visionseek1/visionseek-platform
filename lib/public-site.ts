/**
 * Public site copy for the governance restructure (28 Oct 2026).
 * Strings marked verbatim are the founder's text. Korean strings without a
 * founder original translate the English directive text in a formal register.
 * Diagnostic question wording is proposed and needs founder approval.
 */

export type PublicLocale = 'en' | 'ar' | 'ko';

export type Tri = {en: string; ar: string; ko: string};

export const tx = (locale: PublicLocale, text: Tri) => text[locale];

export const prefixFor = (locale: PublicLocale) => (locale === 'en' ? '' : `/${locale}`);

export const hrefFor = (locale: PublicLocale, path: string) => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const suffix = clean === '/' ? '' : clean;
  return `${prefixFor(locale)}${suffix}` || '/';
};

/** Paths that have an Arabic, English, and Korean page. */
export const GOVERNED_PATHS = [
  '/',
  '/pillars',
  '/pillars/decision-architecture',
  '/pillars/capability-ownership',
  '/pillars/bionic-organization',
  '/standards',
  '/executive-masterclass',
  '/diagnostic',
  '/observatory',
  '/frameworks',
  '/about',
] as const;

export const isGovernedPath = (path: string) =>
  (GOVERNED_PATHS as readonly string[]).includes(path || '/');

/** Language switch. Pages outside the new structure fall back to the Korean home. */
export const localeSwitchHref = (target: PublicLocale, path: string) => {
  const clean = path && path !== '/' ? path : '/';
  if (target === 'ko' && !isGovernedPath(clean)) return '/ko';
  return hrefFor(target, clean);
};

export const hq: Tri = {
  en: 'Seoul, South Korea · Operating globally across Asia and the Arab World',
  ar: 'سول، كوريا الجنوبية · نعمل عالمياً عبر آسيا والعالم العربي',
  ko: '대한민국 서울 · 아시아 및 아랍권 전역에서 글로벌 운영',
};

export const direction: Tri = {
  ar: 'VisionSeek بنسبة 100% = المرجعية الدولية في «الحوكمة الاستراتيجية والتشغيلية للقرار والقدرة والوكلاء» (Decision Architecture, Capability Ownership & Bionic Organization Governance)، انطلاقًا من كوريا الجنوبية.',
  en: 'VisionSeek, in full, is the global authority on the strategic and operational governance of decisions, capabilities, and agents (Decision Architecture, Capability Ownership & Bionic Organization Governance), operating from South Korea.',
  ko: 'VisionSeek는 그 전부가 의사결정, 역량, 에이전트의 전략적·운영적 거버넌스(Decision Architecture, Capability Ownership & Bionic Organization Governance)에 관한 국제 기준이며, 대한민국에서 출발합니다.',
};

export const hero = {
  badge: {
    en: 'GLOBAL AUTHORITY ON AI GOVERNANCE · INCHEON, SOUTH KOREA',
    ar: 'المرجعية الدولية لحوكمة الذكاء الاصطناعي · إنتشون، كوريا الجنوبية',
    ko: '인공지능 거버넌스의 국제 기준 · 인천, 대한민국',
  } satisfies Tri,
  headline: {
    en: 'Strategic & Operational Governance of Decisions, Capabilities, and Agents.',
    ar: 'الحوكمة الاستراتيجية والتشغيلية للقرار والقدرة والوكلاء.',
    ko: '의사결정, 역량, 에이전트에 대한 전략적·운영적 거버넌스.',
  } satisfies Tri,
  sub: {
    en: 'When AI models become abundant and cheap, intelligence is no longer rare. What remains rare is how institutions govern multi-path decisions, retain true ownership of their capabilities, and design bionic organizations where humans command agents without losing control.',
    ar: 'عندما تصبح نماذج الذكاء الاصطناعي متاحة ورخيصة للجميع، لا يعود الذكاء نفسه نادراً؛ النادر هو كيف تحكم المؤسسات قراراتها الاستراتيجية بعيداً عن فخ الإجابة الواحدة، وكيف تمتلك القدرة بدلاً من استئجارها، وكيف تصمم مؤسسات هجينة يقود فيها البشرُ الوكلاءَ دون فقدان السيطرة.',
    ko: '인공지능 모델이 풍부하고 저렴해지면 지능 자체는 더 이상 희소하지 않습니다. 희소한 것은 기관이 다중 경로의 의사결정을 어떻게 통치하고, 역량의 진정한 소유권을 어떻게 지키며, 인간이 통제를 잃지 않은 채 에이전트를 지휘하는 바이오닉 조직을 어떻게 설계하는가입니다.',
  } satisfies Tri,
  standardsCta: {
    en: 'Explore the Global Standards',
    ar: 'استكشف المعايير الدولية',
    ko: '국제 표준을 살펴보십시오',
  } satisfies Tri,
  masterclassCta: {
    en: 'Enter the Executive Masterclass',
    ar: 'ادخل الماستركلاس التنفيذي',
    ko: '최고경영자 마스터클래스에 입장하십시오',
  } satisfies Tri,
};

export const assessCta: Tri = {
  en: 'Assess Your Institution',
  ar: 'افحص جاهزية مؤسستك',
  ko: '기관의 준비도를 진단하십시오',
};

export type NavItem = {path: string; en: string; ar: string; ko: string};

export const publicNav: NavItem[] = [
  {path: '/pillars', en: 'The Three Pillars', ar: 'الأركان الثلاثة', ko: '세 개의 기둥'},
  {path: '/standards', en: 'Global Standards', ar: 'المعايير الدولية', ko: '국제 표준'},
  {path: '/executive-masterclass', en: 'Executive Masterclass', ar: 'الماستركلاس التنفيذي', ko: '최고경영자 마스터클래스'},
  {path: '/diagnostic', en: 'Governance Diagnostic', ar: 'مقياس الحوكمة', ko: '거버넌스 진단'},
  {path: '/observatory', en: 'Research & Teardowns', ar: 'الأبحاث وتشريح القرارات', ko: '연구 및 의사결정 해부'},
  {path: '/frameworks', en: 'Open Frameworks', ar: 'الأطر المفتوحة', ko: '오픈 프레임워크'},
  {path: '/about', en: 'About the Institution', ar: 'عن المؤسسة', ko: '기관 소개'},
];

export const navLabel = (locale: PublicLocale, item: NavItem) => item[locale];

/** Footer record: existing public pages that stay reachable and are not in the new bar. */
export const recordLinks: NavItem[] = [
  {path: '/news', en: 'News', ar: 'أخبار', ko: '뉴스'},
  {path: '/reports', en: 'Reports', ar: 'تقارير', ko: '보고서'},
  {path: '/conferences', en: 'Conferences', ar: 'المؤتمرات', ko: '콘퍼런스'},
  {path: '/indices', en: 'Indices', ar: 'المؤشرات', ko: '지표'},
  {path: '/institute', en: 'VisionSeek Institute', ar: 'معهد VisionSeek', ko: 'VisionSeek 인스티튜트'},
  {path: '/work-with-us', en: 'Work with Us', ar: 'اعمل معنا', ko: '함께하기'},
  {path: '/work-with-us#competitions', en: 'Competitions', ar: 'المسابقات', ko: '공모'},
  {path: '/research', en: 'Research', ar: 'الأبحاث', ko: '연구'},
  {path: '/projects', en: 'Projects', ar: 'المشاريع', ko: '프로젝트'},
  {path: '/opportunities', en: 'R&D Opportunities', ar: 'فرص البحث والتطوير', ko: '연구개발 기회'},
  {path: '/start', en: 'Start', ar: 'البدء', ko: '시작'},
];

export const recordHeading: Tri = {
  en: 'Published work',
  ar: 'الأعمال المنشورة',
  ko: '공개된 작업',
};

export type Pillar = {
  id: '01' | '02' | '03';
  slug: string;
  standard: 'VS-STD-01' | 'VS-STD-02' | 'VS-STD-03';
  title: Tri;
  sub: Tri;
  body: Tri;
};

export const pillars: Pillar[] = [
  {
    id: '01',
    slug: 'decision-architecture',
    standard: 'VS-STD-01',
    title: {
      en: 'Decision Architecture',
      ar: 'معمارية وحوكمة القرار',
      ko: '인공지능 의사결정 아키텍처 및 거버넌스',
    },
    sub: {
      en: 'Breaking the Single-Track Trap & Multi-Paradigm Decision Verification.',
      ar: 'كسر "فخ الإجابة الواحدة" وتصادم المناهج قبل اعتماد الميزانيات.',
      ko: '단일 경로의 함정을 깨고, 예산이 확정되기 전에 복수의 패러다임을 검증합니다.',
    },
    body: {
      en: 'Most AI outputs rely on a single statistical consensus while hiding viable alternatives—leading enterprises into costly strategic errors. We establish the protocols for adversarial multi-paradigm verification and ground-truth injection before capital commitment.',
      ar: 'تُبنى أغلب إجابات الذكاء الاصطناعي على مسار إحصائي واحد وتُخفي البدائل الأخرى، مما يورّط المؤسسات في قرارات واستثمارات مكلفة في الاتجاه الخاطئ. نضع المعايير والمنهجيات اللازمة لإخضاع أي قرار استراتيجي لتصادم الخوارزميات المتضادة وحقن قيود الواقع الميداني قبل البناء عليه.',
      ko: '대부분의 인공지능 산출은 하나의 통계적 합의에 의존하고 유효한 대안을 숨깁니다. 그 결과 기관은 비용이 큰 전략적 오류로 들어갑니다. 우리는 자본을 투입하기 전에 대립하는 다중 패러다임 검증과 현장 진실의 주입을 위한 프로토콜을 수립합니다.',
    },
  },
  {
    id: '02',
    slug: 'capability-ownership',
    standard: 'VS-STD-02',
    title: {
      en: 'Capability Ownership',
      ar: 'حوكمة ملكية القدرة',
      ko: '인공지능 역량 소유권 및 주권',
    },
    sub: {
      en: 'Transitioning AI from a Rented Dependency into an Institutionally Owned Asset.',
      ar: 'تحويل الذكاء الاصطناعي من خدمة مستأجرة تخلق التبعية إلى قدرة مملوكة للمؤسسة.',
      ko: '인공지능을 임대한 의존에서 기관이 소유하는 자산으로 전환합니다.',
    },
    body: {
      en: 'True sovereignty cannot be rented. We establish the contractual standards, model-agnostic architectures, and ownership ladders that ensure your institution retains full control over its data, institutional memory, and operational capability if a vendor walks away tomorrow.',
      ar: 'السيادة لا تتحقق بشراء اشتراكات سحابية تتوقف بتوقف المورد. نُهندس الأطر التعاقدية والمعمارية المعزولة محلياً وموازين نقل المعرفة التي تضمن بقاء البيانات، والذاكرة المؤسسية، والقدرة التشغيلية مملوكة بالكامل داخل المؤسسة.',
      ko: '진정한 주권은 임대할 수 없습니다. 우리는 공급자가 내일 떠나도 기관이 데이터, 기관의 기억, 운영 역량을 완전히 통제하도록 계약 표준, 모델에 종속되지 않는 아키텍처, 소유권 사다리를 수립합니다.',
    },
  },
  {
    id: '03',
    slug: 'bionic-organization',
    standard: 'VS-STD-03',
    title: {
      en: 'Bionic Organization Governance',
      ar: 'حوكمة المؤسسات الهجينة والوكلاء',
      ko: '에이전트 및 바이오닉 조직 거버넌스',
    },
    sub: {
      en: 'The Science and Craft of Designing Human-Agent (Bionic) Organizations.',
      ar: 'علم وحرفة تصميم المؤسسات التي يعمل فيها البشر مع وكلاء الذكاء الاصطناعي (Agents).',
      ko: '인간과 에이전트가 함께 일하는 바이오닉 조직을 설계하는 과학과 기법입니다.',
    },
    body: {
      en: 'Functioning as the "Toyota Production System" for the agentic era, we define how organizations operate when autonomous agents execute core workflows under lean human leadership—establishing authority topologies, mandatory human choke points, and the AI Andon Cord.',
      ar: 'على خطى "نظام إنتاج تويوتا" في عصر الصناعة، نؤسس القواعد التشغيلية لعصر الوكلاء: كيف تُبنى وتُدار مؤسسة ينفذ نصف مهامها وكلاء ذكاء اصطناعي تحت إشراف بشر قليلين؟ نحدد خريطة الصلاحيات، المسؤولية، نقاط الحسم البشري الإلزامية، وحبل الإيقاف الذكي (AI Andon Cord) لمنع تراكم الأخطاء الآلية.',
      ko: '에이전트 시대의 「도요타 생산 시스템」으로서, 우리는 자율 에이전트가 핵심 업무 흐름을 수행하고 소수의 인간이 지휘할 때 조직이 어떻게 운영되는지를 정의합니다. 권한의 위상, 의무적 인간 결정 지점, 그리고 인공지능 안돈 코드를 수립합니다.',
    },
  },
];

export const pillarBySlug = (slug: string) => pillars.find(pillar => pillar.slug === slug);
export const pillarPath = (pillar: Pillar) => `/pillars/${pillar.slug}`;

export type Standard = {
  code: 'VS-STD-01' | 'VS-STD-02' | 'VS-STD-03';
  mark: string;
  pillar: Pillar['slug'];
  name: Tri;
};

export const standards: Standard[] = [
  {
    code: 'VS-STD-01',
    mark: 'MPDS',
    pillar: 'decision-architecture',
    name: {
      en: 'Multi-Path Decision Governance Standard',
      ar: 'معيار حوكمة القرار متعدد المسارات',
      ko: '다중 경로 의사결정 거버넌스 표준',
    },
  },
  {
    code: 'VS-STD-02',
    mark: 'ACOS',
    pillar: 'capability-ownership',
    name: {
      en: 'AI Capability Ownership & Sovereignty Standard',
      ar: 'معيار ملكية القدرة والسيادة التعاقدية',
      ko: '인공지능 역량 소유권 및 주권 표준',
    },
  },
  {
    code: 'VS-STD-03',
    mark: 'BOAGC',
    pillar: 'bionic-organization',
    name: {
      en: 'Bionic Organization & Agentic Governance Code',
      ar: 'الكود التشغيلي لحوكمة المؤسسات الهجينة والوكلاء',
      ko: '바이오닉 조직 및 에이전트 거버넌스 코드',
    },
  },
];

export const pdfButton: Tri = {
  en: 'Executive Summary PDF',
  ar: 'ملخص تنفيذي PDF',
  ko: '경영 요약 PDF',
};

/** Korean pages use the English PDF. Arabic and English each have their own file. */
export const standardPdf = (standard: Standard, locale: PublicLocale) =>
  `/standards/${standard.code.toLowerCase()}-${standard.mark.toLowerCase()}-${locale === 'ar' ? 'ar' : 'en'}.pdf`;

export const masterclass = {
  title: {
    ar: 'حوكمة الذكاء الاصطناعي: فخ الإجابة الواحدة وهندسة القرار والمؤسسة الهجينة',
    en: 'AI Governance: Escaping the Single-Track Trap & Architecting the Bionic Enterprise',
    ko: '인공지능 거버넌스: 단일 경로의 함정에서 벗어나 바이오닉 엔터프라이즈를 설계합니다',
  } satisfies Tri,
  sub: {
    ar: 'البرنامج التنفيذي لكشف البدائل الاستراتيجية الخفية، حماية ملكية القدرة، وقيادة المؤسسات في عصر الوكلاء.',
    en: 'The Executive Program for Uncovering Strategic Alternatives, Securing Capability Ownership, and Governing Autonomous Agents.',
    ko: '숨은 전략적 대안을 드러내고, 역량 소유권을 확보하며, 자율 에이전트를 통치하는 최고경영자 프로그램입니다.',
  } satisfies Tri,
  leader: {
    ar: 'د. أحمد عبدالعليم',
    en: 'Ahmed Abdelalim, Founder & Chief Capability Architect',
    ko: '아흐메드 압델알림, 설립자 겸 최고 역량 설계자',
  } satisfies Tri,
  outcomesHeading: {en: 'Outcomes', ar: 'المخرجات', ko: '성과'} satisfies Tri,
  outcomes: [
    {
      ar: 'إتقان منهجية ومصفوفة كشف البدائل الخوارزمية قبل القرارات الكبرى.',
      en: 'Command of the method and matrix that uncover algorithmic alternatives before major decisions.',
      ko: '중대한 결정 전에 알고리즘 대안을 드러내는 방법론과 매트릭스를 장악합니다.',
    },
    {
      ar: 'امتلاك دستور تصميم الخلايا الهجينة.',
      en: 'Ownership of the constitution for designing bionic cells.',
      ko: '하이브리드 셀 설계의 헌법을 보유합니다.',
    },
    {
      ar: 'شهادة الاعتماد التنفيذي الدولي في حوكمة الذكاء الاصطناعي من المؤسسة في كوريا الجنوبية.',
      en: 'The international executive accreditation in AI governance from the institution in South Korea.',
      ko: '대한민국의 본 기관이 수여하는 인공지능 거버넌스 국제 최고경영자 인증.',
    },
  ] satisfies Tri[],
};

export const diagnosticIntro: Tri = {
  ar: 'لو توقف مورد الذكاء الاصطناعي عن مؤسستك غداً، أو بنى فريقك خطة استراتيجية على إجابة أحادية من خوارزمية، أو أخطأ وكيل ذكي في عملية حرجة — ما الذي يحمي مؤسستك ومنصبك اليوم؟',
  en: 'If your AI vendor stopped tomorrow, or your team built a strategic plan on a single-track algorithmic answer, or an autonomous agent drifted in a critical workflow—what protects your institution today?',
  ko: '인공지능 공급자가 내일 중단하거나, 팀이 단일 경로의 알고리즘 답에 전략 계획을 세우거나, 자율 에이전트가 중대한 업무 흐름에서 이탈한다면—오늘 기관을 보호하는 것은 무엇입니까?',
};

/**
 * Proposed wording, needs founder approval.
 * Two questions per pillar, derived only from that pillar's subtitle and body.
 */
export const diagnosticQuestions: {pillar: Pillar['slug']; text: Tri}[] = [
  {
    pillar: 'decision-architecture',
    text: {
      en: 'Before capital is committed, does your institution force opposing methods to collide, or does the decision rest on one statistical path that hides the alternatives?',
      ar: 'قبل اعتماد المال، هل تُخضع المؤسسة القرار لتصادم المناهج المتعارضة، أم يبقى على مسار إحصائي واحد يُخفي البدائل؟',
      ko: '자본이 투입되기 전에, 기관은 상충하는 방법론을 충돌시키는가, 아니면 대안을 숨긴 단일 통계 경로에 결정을 맡기는가?',
    },
  },
  {
    pillar: 'decision-architecture',
    text: {
      en: 'Are field-reality constraints injected before you build on an AI answer, or is the commitment made to a single-track output?',
      ar: 'هل تُحقن قيود الواقع الميداني قبل البناء على إجابة الذكاء الاصطناعي، أم يُعتمد الالتزام على مخرج أحادي المسار؟',
      ko: '인공지능의 답 위에 구축하기 전에 현장의 제약이 주입되는가, 아니면 단일 경로의 산출에 투입이 결정되는가?',
    },
  },
  {
    pillar: 'capability-ownership',
    text: {
      en: 'If the AI vendor stopped tomorrow, would your institution retain its data, institutional memory, and operational capability?',
      ar: 'إذا توقف مورد الذكاء الاصطناعي غدًا، هل تبقى البيانات والذاكرة المؤسسية والقدرة التشغيلية ملكًا للمؤسسة؟',
      ko: '인공지능 공급자가 내일 중단해도, 데이터와 기관의 기억과 운영 역량은 기관 안에 남는가?',
    },
  },
  {
    pillar: 'capability-ownership',
    text: {
      en: 'Is the capability held inside locally isolated contractual and architectural frameworks, or does it end when the subscription ends?',
      ar: 'هل القدرة محفوظة داخل أطر تعاقدية ومعمارية معزولة محليًا، أم تنتهي بانتهاء الاشتراك؟',
      ko: '역량은 현지에서 격리된 계약·아키텍처 틀 안에 보유되는가, 아니면 구독이 끝나면 끝나는가?',
    },
  },
  {
    pillar: 'bionic-organization',
    text: {
      en: 'When agents execute core work, does the institution hold an authority map and mandatory human choke points?',
      ar: 'حين ينفذ الوكلاء العمل الجوهري، هل تملك المؤسسة خريطة صلاحيات ونقاط حسم بشري إلزامية؟',
      ko: '에이전트가 핵심 업무를 수행할 때, 기관은 권한 지도와 의무적 인간 결정 지점을 보유하는가?',
    },
  },
  {
    pillar: 'bionic-organization',
    text: {
      en: 'Is an AI Andon Cord in place to stop automated errors from compounding in a critical workflow?',
      ar: 'هل يعمل حبل الإيقاف الذكي لمنع تراكم الأخطاء الآلية في عملية حرجة؟',
      ko: '중대한 업무 흐름에서 자동화된 오류의 누적을 멈추는 인공지능 안돈 코드가 작동하는가?',
    },
  },
];

export const diagnosticUi = {
  protected: {en: 'Protection is in place', ar: 'الحماية قائمة', ko: '보호가 작동합니다'} satisfies Tri,
  exposed: {en: 'Exposure stands', ar: 'الانكشاف قائم', ko: '노출이 남아 있습니다'} satisfies Tri,
  result: {en: 'Exposure result', ar: 'نتيجة الانكشاف', ko: '노출 결과'} satisfies Tri,
  contained: {en: 'Contained', ar: 'محصور', ko: '통제 안에 있습니다'} satisfies Tri,
  open: {en: 'Exposure on one control', ar: 'انكشاف في ضابط واحد', ko: '통제 한 곳에서 노출이 확인됩니다'} satisfies Tri,
  critical: {en: 'Exposure on both controls', ar: 'انكشاف في الضابطين', ko: '두 통제 모두에서 노출이 확인됩니다'} satisfies Tri,
  contact: {en: 'Contact the institution', ar: 'تواصل مع المؤسسة', ko: '기관에 연락하십시오'} satisfies Tri,
  unanswered: {en: 'Answer both controls', ar: 'أجب عن الضابطين', ko: '두 통제에 답하십시오'} satisfies Tri,
};

export const observatoryCopy = {
  teardowns: {
    en: 'AI Decision Teardowns',
    ar: 'تشريح القرارات',
    ko: '인공지능 의사결정 해부',
  } satisfies Tri,
  watch: {
    en: 'Global Governance Observatory',
    ar: 'مرصد الحوكمة العالمي',
    ko: '글로벌 거버넌스 관측소',
  } satisfies Tri,
  allReports: {en: 'Reports', ar: 'التقارير', ko: '보고서'} satisfies Tri,
  allNews: {en: 'News', ar: 'أخبار', ko: '뉴스'} satisfies Tri,
};

export const readPillar: Tri = {en: 'Read the pillar', ar: 'اقرأ الركن', ko: '기둥을 읽으십시오'};
export const openStandard: Tri = {en: 'Open the standard', ar: 'افتح المعيار', ko: '표준을 여십시오'};

export const contactSubject = 'Governance Diagnostic';

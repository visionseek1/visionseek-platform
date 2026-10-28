/**
 * «موظفوك يضعون بيانات المؤسسة في أدوات ذكاء اصطناعي مجانية، والمنع وحده لا يوقفهم» — الإصدار 1.0.
 * النص العربي كما ورد في draft-ar-v1.0.md، والإنجليزي كما ورد في draft-en-v1.0.md.
 * لا اختراع لمحتوى ولا أرقام ولا مصادر. التوقيع بلا لقب دكتوراه: المؤسس وكبير مهندسي القدرات.
 */
export type Bi = {ar: string; en: string};

export type ReportSource = {
  id: number;
  tier: string;
  publisher: string;
  date: string;
  title: string;
  url: string;
};

export type MonoBlock =
  | {kind: "prose"; text: string}
  | {kind: "list"; items: readonly string[]}
  | {kind: "table"; columns: readonly string[]; rows: readonly (readonly string[])[]; note?: string};

export type MonoSection = {heading: string; blocks: MonoBlock[]};

export type MonoBody = {intro: string[]; sections: MonoSection[]};

export const paper = {
  slug: "shadow-ai-employee-data",
  title: {
    ar: "موظفوك يضعون بيانات المؤسسة في أدوات ذكاء اصطناعي مجانية، والمنع وحده لا يوقفهم",
    en: "Your Staff Are Putting Company Data Into Free AI Tools, and a Ban Alone Will Not Stop Them",
  },
  summary: {
    ar: "في السعودية والإمارات ومصر يستعمل أكثر من 9 من كل 10 موظفين الذكاء الاصطناعي في العمل. وثلاثة من كل أربعة يقولون إن لمؤسستهم سياسة له، ومع ذلك قال 47% إلى 56% إنهم استعملوه بطريقة تخالف السياسة. وفي الاستطلاع العالمي نفسه كان رفع بيانات الشركة إلى أدوات عامة أكثر شيوعًا حيث يوجد منع. والقانون في السعودية ومصر يضع الغرامة على المؤسسة، وفي مصر قد يصل العقاب إلى المدير نفسه. يعني: المنع على الورق لا يحمي البيانات، والحماية أن تعطي الموظف أداة آمنة أفضل من المجانية.",
    en: "In Saudi Arabia, the UAE and Egypt, more than 9 in 10 employees use AI at work. Three in four say their organization has a policy for it, yet 47% to 56% admit using AI in ways that break that policy. In the same global survey, uploading company data to public tools was more common where AI was banned. Saudi and Egyptian law put the fine on the institution, and in Egypt the penalty can reach the manager in person. A ban on paper does not protect the data; a safe tool that beats the free one does.",
  },
  cardSummary: {
    ar: "استطلاع KPMG وجامعة ملبورن: 47% إلى 56% من الموظفين في السعودية والإمارات ومصر استعملوا الذكاء الاصطناعي بخلاف سياسة مؤسستهم، والمنع ارتبط برفع بيانات أكثر لا أقل. خمس خطوات تبدأ بها المؤسسة غدًا.",
    en: "KPMG and University of Melbourne survey: 47% to 56% of employees in Saudi Arabia, the UAE and Egypt used AI against their organization's policy, and bans were linked to more data uploads, not fewer. Five steps an institution can start tomorrow.",
  },
  question: {
    ar: "موظفو المؤسسة يستعملون أدوات ذكاء اصطناعي عامة ببيانات العمل. هل يكفي المنع أو السياسة المكتوبة لحماية البيانات والمؤسسة من القانون؟",
    en: "Employees are using public AI tools with work data. Is a ban or a written policy enough to protect the data, and the institution, under the law?",
  },
  answer: {
    ar: "لا. السياسة موجودة عند ثلاثة أرباع المؤسسات تقريبًا، والمخالفة عند قرابة نصف الموظفين، والمنع ارتبط برفع بيانات أكثر. الحل أن تعطي المؤسسة موظفيها أداة آمنة بعقد واضح، وتحدد بالتصنيف ما يجوز إدخاله، وتدرّب وتقيس.",
    en: "No. About three in four organizations have a policy, close to half of employees break it, and bans were linked to more uploads. The fix is to give staff a safe tool under a clear contract, define by data class what may go in, then train and measure.",
  },
  publishedAt: "2026-10-28T13:50:00+09:00",
  date: "2026-10-28",
  dateLabel: {
    ar: "28 أكتوبر 2026",
    en: "28 October 2026",
  },
  versionLabel: "1.0",
  label: {
    ar: "مختبر VisionSeek · تقارير · الإصدار 1.0",
    en: "VisionSeek Lab · Reports · Version 1.0",
  },
  tag: "الحوكمة والبيانات",
  author: {
    ar: "أحمد عبدالعليم، المؤسس وكبير مهندسي القدرات",
    en: "Ahmed Abdelalim, Founder & Chief Capability Architect",
  },
  attribution: {
    ar: "مبني على بحث أجرته VisionSeek",
    en: "Based on research by VisionSeek",
  },
  pdfAr: "/reports/reports/shadow-ai-employee-data-ar.pdf",
  cover: "/reports/reports/shadow-ai-employee-data-cover.jpg",
  ogImage: "/reports/reports/shadow-ai-employee-data.og.png",
  coverWidth: 1600,
  coverHeight: 1200,
  ogWidth: 1200,
  ogHeight: 630,
  heroAlt: "تكوين هندسي داكن: كتل ليمونية مرتبة داخل إطار، وقطع صغيرة تتسرب من فتحة في جانبه نحو الخارج، فوق نقش عربي خافت",
  imageCredit: "رسم توضيحي: VisionSeek (مولَّد)",
  methodologyHref: "/reports/reports/methodology",
  readingMinutes: 7,
  corrections: [],
  stats: [
    {
      big: "47–56%",
      text: {
        ar: "من الموظفين في السعودية والإمارات ومصر استعملوا الذكاء الاصطناعي بطريقة تخالف سياسة مؤسستهم (KPMG وجامعة ملبورن 2025)",
        en: "of employees in Saudi Arabia, the UAE and Egypt used AI in ways that contravene their organization's policies (KPMG and University of Melbourne, 2025)",
      },
    },
    {
      big: "67%",
      text: {
        ar: "من الموظفين في مؤسسات تمنع الذكاء الاصطناعي التوليدي رفعوا بيانات الشركة إلى أدوات عامة، مقابل 33% حيث لا سياسة (عالميًا)",
        en: "of employees in organizations that ban generative AI uploaded company information to public tools, versus 33% where there is no policy (global)",
      },
    },
    {
      big: "5 ملايين",
      text: {
        ar: "ريال سعودي حد أعلى للغرامة على مخالفة نظام حماية البيانات الشخصية، وتُضاعف عند التكرار (المادة 36)",
        en: "Saudi riyals: the maximum fine for breaching the Personal Data Protection Law, doubled for repeat violations (Article 36)",
      },
    },
  ],
  sources: [
    {
      id: 1,
      tier: "ج (دراسة بمنهج منشور)",
      publisher: "KPMG & University of Melbourne",
      date: "2025-04",
      title: "Trust, attitudes and use of artificial intelligence: A global study 2025 (48,340 respondents, 47 countries)",
      url: "https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-global-report.pdf",
    },
    {
      id: 2,
      tier: "ج",
      publisher: "KPMG & University of Melbourne",
      date: "2025",
      title: "Trust, attitudes and use of AI 2025 — Saudi Arabia insights",
      url: "https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-saudi-arabia-snapshot.pdf.coredownload.inline.pdf",
    },
    {
      id: 3,
      tier: "ج",
      publisher: "KPMG & University of Melbourne",
      date: "2025",
      title: "Trust, attitudes and use of AI 2025 — United Arab Emirates insights",
      url: "https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-uae-snapshot.pdf.coredownload.inline.pdf",
    },
    {
      id: 4,
      tier: "ج",
      publisher: "KPMG & University of Melbourne",
      date: "2025",
      title: "Trust, attitudes and use of AI 2025 — Egypt insights",
      url: "https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2025/05/trust-attitudes-and-use-of-ai-egypt-snapshot.pdf.coredownload.inline.pdf",
    },
    {
      id: 5,
      tier: "ج (تقرير بمنهج منشور)",
      publisher: "IBM & Ponemon Institute",
      date: "2025-07",
      title: "Cost of a Data Breach Report 2025",
      url: "https://www.ibm.com/downloads/documents/us-en/137a3e32273ed1f5",
    },
    {
      id: 6,
      tier: "ب",
      publisher: "IBM Newsroom",
      date: "2025-07-30",
      title: "IBM Report: 13% of organizations reported breaches of AI models or applications",
      url: "https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls",
    },
    {
      id: 7,
      tier: "ب",
      publisher: "IBM Newsroom Middle East & Africa",
      date: "2025-07-30",
      title: "Cost of a Data Breach 2025 — Middle East findings",
      url: "https://mea.newsroom.ibm.com/codb-me-findings-2025",
    },
    {
      id: 8,
      tier: "أ",
      publisher: "Saudi Data & AI Authority (SDAIA)",
      date: "2023 (amended text)",
      title: "Personal Data Protection Law (Articles 1, 29, 35, 36)",
      url: "https://sdaia.gov.sa/en/SDAIA/about/Documents/PersonalDataProtectionLaw.pdf",
    },
    {
      id: 9,
      tier: "أ",
      publisher: "Saudi Data & AI Authority (SDAIA)",
      date: "2024-01 (reissued 2025)",
      title: "Generative Artificial Intelligence for Government — Guidelines (section 3.5)",
      url: "https://sdaia.gov.sa/en/SDAIA/about/Files/GenAIGuidelinesForGovernmentENCompressed.pdf",
    },
    {
      id: 10,
      tier: "أ",
      publisher: "Arab Republic of Egypt — Law No. 151 of 2020 (bilingual text)",
      date: "2020-07",
      title: "Personal Data Protection Law (Articles 41, 42, 47)",
      url: "https://www.privacylaws.com/media/3263/egypt-data-protection-law-151-of-2020.pdf",
    },
    {
      id: 11,
      tier: "د (صحافة)",
      publisher: "The Korea Herald",
      date: "2023-05-03",
      title: "Samsung bans AI chatbots after leak",
      url: "https://www.koreaherald.com/article/3118116",
    },
    {
      id: 12,
      tier: "د (صحافة)",
      publisher: "TechCrunch",
      date: "2023-05-02",
      title: "Samsung bans use of generative AI tools like ChatGPT after April internal data leak",
      url: "https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/",
    },
    {
      id: 13,
      tier: "ب",
      publisher: "Samsung Global Newsroom",
      date: "2023-11-08",
      title: "Samsung AI Forum 2023 Day 2 — Samsung Gauss",
      url: "https://news.samsung.com/global/samsung-ai-forum-2023-day-2-discussing-technological-trends-and-the-future-of-generative-ai",
    },
    {
      id: 14,
      tier: "أ",
      publisher: "Personal Information Protection Commission (PIPC), Korea",
      date: "2025-08-06",
      title: "Guideline on processing personal information in developing and using generative AI",
      url: "https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=11410",
    },
    {
      id: 15,
      tier: "د (مكتب محاماة)",
      publisher: "Kim & Chang",
      date: "2025-08-08",
      title: "PIPC Releases Guideline on Processing of Personal Information in Developing and Using Generative AI",
      url: "https://www.kimchang.com/en/insights/detail.kc?idx=32699&sch_section=4",
    },
  ],
  bodies: {
    ar: {
      intro: [
      "ادخل اليوم أي وزارة أو مستشفى أو بنك عربي، وستجد موظفًا يلصق نصًّا في نافذة ذكاء اصطناعي ليلخّصه أو يترجمه.",
      "قد يكون محضر اجتماع، أو ملف مريض، أو كشف حساب عميل.",
      "والأداة في الغالب مجانية، فتحها الموظف من حسابه الشخصي.",
      "**المؤسسة لا ترى ذلك، لكنها هي التي ستدفع الثمن.**",
      ],
      sections: [
      {
        heading: "الجواب باختصار: المنع على الورق لا يحمي البيانات، والأداة الآمنة تحميها",
        blocks: [
          {
            kind: "prose",
            text: "**الجواب:** موظفونا يستعملون الذكاء الاصطناعي فعلًا، وكثير منهم يستعمله خارج ما تسمح به المؤسسة. والمنع أو السياسة المكتوبة وحدهما لا يغيّران ذلك. ما يغيّره أن تعطي المؤسسة موظفيها أداة آمنة بعقد واضح، تكون أنفع من الأداة المجانية، ثم تدرّبهم وتقيس.",
          },
          {
            kind: "prose",
            text: "ثلاث رسائل تدعم هذا الجواب:",
          },
          {
            kind: "list",
            items: [
              "**الاستعمال واسع وخارج نظر المؤسسة.** أكثر من 9 من كل 10 موظفين في السعودية والإمارات ومصر يستعملون الذكاء الاصطناعي في العمل عن قصد [2][3][4]. وعالميًا، 70% يستعملون أدوات عامة مجانية، و42% فقط أدوات توفرها جهة العمل [1].",
              "**السياسة المكتوبة لا تكفي.** نحو ثلاثة أرباع الموظفين في الدول الثلاث يقولون إن لمؤسستهم سياسة، ومع ذلك خالفها 47% إلى 56% [2][3][4]. وعالميًا، كان رفع بيانات الشركة أعلى حيث يوجد منع (67%) منه حيث لا سياسة (33%) [1].",
              "**الثمن على المؤسسة ومديرها.** في السعودية تصل الغرامة إلى 5 ملايين ريال [8]. وفي مصر قد يُعاقب «المسؤول عن الإدارة الفعلية» بالعقوبة نفسها [10].",
            ],
          },
        ],
      },
      {
        heading: "كم موظفًا عندنا يستعمل الذكاء الاصطناعي في العمل؟",
        blocks: [
          {
            kind: "prose",
            text: "في 2025 نشرت KPMG مع جامعة ملبورن استطلاعًا شمل 48,340 شخصًا في 47 دولة، منها السعودية والإمارات ومصر. جُمعت الإجابات بين نوفمبر 2024 ومنتصف يناير 2025 [1].",
          },
          {
            kind: "prose",
            text: "النتيجة في منطقتنا أعلى من المتوسط العالمي. 92% في السعودية والإمارات، و91% في مصر، قالوا إنهم يستعملون الذكاء الاصطناعي في العمل عن قصد [2][3][4].",
          },
          {
            kind: "prose",
            text: "لكن بأي أداة؟ عالميًا، أغلب الموظفين يستعملون أدوات عامة مجانية (70%). و48% قالوا إنهم رفعوا معلومات الشركة، مثل أرقام المبيعات أو بيانات العملاء، إلى أدوات ذكاء اصطناعي عامة [1].",
          },
          {
            kind: "prose",
            text: "«الأداة العامة» هنا تعني خدمة مفتوحة للجميع على الإنترنت، لا تربطها بالمؤسسة أي عقد يحدد أين تُحفظ البيانات ومن يراها.",
          },
          {
            kind: "prose",
            text: "يعني: البيانات تخرج من المؤسسة كل يوم، من باب لا يراه أحد.",
          },
        ],
      },
      {
        heading: "لماذا لا تكفي السياسة المكتوبة؟",
        blocks: [
          {
            kind: "prose",
            text: "أغلب مؤسساتنا كتبت سياسة. لكن سلوك الموظف تحت ضغط العمل شيء آخر.",
          },
        ],
      },
      {
        heading: "الشكل 1: السياسة موجودة عند ثلاثة أرباع المؤسسات، والمخالفة عند قرابة نصف الموظفين",
        blocks: [
          {
            kind: "table",
            columns: [
              "الدولة",
              "يستعمل الذكاء الاصطناعي في العمل عن قصد",
              "يقول إن لمؤسسته سياسة للاستعمال المسؤول",
              "استعمله بطريقة تخالف السياسة",
              "اعتمد على النتيجة دون أن يتحقق من دقتها",
            ],
            rows: [
              [
                "السعودية [2]",
                "92%",
                "73%",
                "47%",
                "70%",
              ],
              [
                "الإمارات [3]",
                "92%",
                "73%",
                "56%",
                "72%",
              ],
              [
                "مصر [4]",
                "91%",
                "71%",
                "48%",
                "75%",
              ],
              [
                "المتوسط العالمي [1]",
                "—",
                "—",
                "44%",
                "66%",
              ],
            ],
            note: "*المصدر: KPMG وجامعة ملبورن، Trust, attitudes and use of AI 2025، صفحات الدول [2][3][4] والتقرير العالمي [1]. النسب من إجابات الموظفين أنفسهم، ويرجّح التقرير أنها أقل من الواقع لأن الناس يتحفظون في الاعتراف بالمخالفة [1].*",
          },
          {
            kind: "prose",
            text: "والمفاجأة في التقرير العالمي: الموظفون في مؤسسات تمنع الذكاء الاصطناعي التوليدي كانوا الأكثر رفعًا لبيانات الشركة إلى أدوات عامة [1].",
          },
        ],
      },
      {
        heading: "الشكل 2: حيث يوجد منع، رفع الموظفون بيانات الشركة أكثر لا أقل",
        blocks: [
          {
            kind: "table",
            columns: [
              "موقف المؤسسة من الذكاء الاصطناعي التوليدي",
              "نسبة من رفعوا معلومات الشركة إلى أدوات عامة",
            ],
            rows: [
              [
                "تمنعه",
                "67%",
              ],
              [
                "لديها سياسة توجّه استعماله",
                "56%",
              ],
              [
                "لا يعرف الموظف إن كانت هناك سياسة",
                "38%",
              ],
              [
                "لا سياسة لديها",
                "33%",
              ],
            ],
            note: "*المصدر: KPMG وجامعة ملبورن، التقرير العالمي 2025، ص 75 [1]. هذا ارتباط وليس سببًا مثبتًا. وتفسير التقرير نفسه أن المنع الصريح «قد يكون غير فعال»، وأن وجود السياسة «لا يضمن الالتزام» دون توجيه وتدريب واضحين.*",
          },
          {
            kind: "prose",
            text: "وتقول IBM إن 20% من المؤسسات التي تعرضت لاختراق في دراسة 2025 تعرضته بسبب «ذكاء اصطناعي في الظل»، أي أدوات يستعملها الموظفون دون علم المؤسسة. والمؤسسات التي ينتشر فيها هذا الاستعمال دفعت في المتوسط 670 ألف دولار زيادة في كلفة الاختراق [5].",
          },
          {
            kind: "prose",
            text: "و37% فقط من المؤسسات في الدراسة لديها سياسات لإدارة الذكاء الاصطناعي أو كشف استعماله في الظل [6]. وفي الشرق الأوسط بلغ متوسط كلفة الاختراق الواحد 27 مليون ريال سعودي، أي نحو 7.29 مليون دولار، ثاني أعلى متوسط بعد الولايات المتحدة [5][7].",
          },
          {
            kind: "prose",
            text: "يعني: المنع يدفع الاستعمال إلى الظل، ولا يوقفه.",
          },
        ],
      },
      {
        heading: "من يدفع الثمن إذا خرجت البيانات؟",
        blocks: [
          {
            kind: "prose",
            text: "هنا يصبح السؤال قانونيًا.",
          },
          {
            kind: "prose",
            text: "في السعودية، يعدّ نظام حماية البيانات الشخصية «البيانات الصحية» بيانات حساسة [8]. ويضع شروطًا لنقل البيانات خارج المملكة، منها مستوى حماية لا يقل عن مستوى النظام، وأن يقتصر النقل على أقل قدر لازم (المادة 29) [8].",
          },
          {
            kind: "prose",
            text: "وفي مصر، يعاقب القانون 151 لسنة 2020 على مخالفة قواعد نقل البيانات عبر الحدود، ويحمّل المدير الفعلي للمؤسسة المسؤولية إذا عَلِم وأسهم إخلاله في المخالفة [10].",
          },
        ],
      },
      {
        heading: "الشكل 3: القانون يضع الثمن على المؤسسة ومديرها، لا على الأداة المجانية",
        blocks: [
          {
            kind: "table",
            columns: [
              "النص",
              "ماذا يقول",
              "العقوبة القصوى المنصوص عليها",
            ],
            rows: [
              [
                "السعودية، نظام حماية البيانات الشخصية، المادة 36 [8]",
                "أي مخالفة للنظام أو لائحته غير المذكورة في المادة 35",
                "إنذار أو غرامة حتى 5 ملايين ريال، وتُضاعف عند التكرار",
              ],
              [
                "السعودية، المادة 35 [8]",
                "إفشاء بيانات حساسة أو نشرها بقصد الإضرار أو المنفعة الشخصية",
                "سجن حتى سنتين و/أو غرامة حتى 3 ملايين ريال",
              ],
              [
                "مصر، القانون 151 لسنة 2020، المادة 42 [10]",
                "مخالفة أحكام نقل البيانات الشخصية عبر الحدود",
                "حبس لا يقل عن 3 أشهر و/أو غرامة من 500 ألف إلى 5 ملايين جنيه",
              ],
              [
                "مصر، المادة 41 [10]",
                "نقل أو تداول بيانات حساسة دون موافقة صاحبها",
                "حبس لا يقل عن 3 أشهر و/أو غرامة من 500 ألف إلى 5 ملايين جنيه",
              ],
              [
                "مصر، المادة 47 [10]",
                "المسؤول عن الإدارة الفعلية للمؤسسة المخالفة",
                "العقوبات نفسها إذا ثبت علمه وأسهم إخلاله في المخالفة",
              ],
              [
                "السعودية، إرشادات سدايا للجهات الحكومية، البند 3.5 [9]",
                "لا يُدخل الموظف الحكومي في أدوات الذكاء الاصطناعي التوليدي بيانات مصنّفة «مقيّدة» أو أعلى",
                "إرشادات، لا عقوبة فيها بذاتها",
              ],
            ],
            note: "*المصدر: نص نظام حماية البيانات الشخصية المنشور على موقع سدايا [8]، وإرشادات سدايا [9]، ونص القانون المصري 151 لسنة 2020 [10]. هل يُعدّ لصق بيانات شخصية في أداة أجنبية «نقلًا» أو «إفشاءً» بالمعنى القانوني؟ هذا سؤال قانوني يحسمه المستشار القانوني لكل مؤسسة، ولا نجيب عنه هنا.*",
          },
          {
            kind: "prose",
            text: "يعني: الأداة مجانية للموظف، لكنها قد تكلّف المؤسسة ومديرها كثيرًا.",
          },
        ],
      },
      {
        heading: "ماذا فعلت كوريا حين واجهت المشكلة نفسها؟",
        blocks: [
          {
            kind: "prose",
            text: "في أبريل 2023 وجدت سامسونج ثلاث حالات رفع فيها مهندسوها شيفرة برمجية ومحاضر اجتماعات داخلية إلى ChatGPT. فمنعت الأدوات العامة على أجهزة الشركة من 1 مايو 2023، وقالت إنها تبني أدواتها الخاصة [11][12].",
          },
          {
            kind: "prose",
            text: "وبعد نحو ستة أشهر أعلنت سامسونج نموذجها Samsung Gauss، وقالت إنه «يُستعمل حاليًا لإنتاجية الموظفين»: كتابة الرسائل، وتلخيص الوثائق، والترجمة، والمساعدة في البرمجة [13].",
          },
          {
            kind: "prose",
            text: "وفي أغسطس 2025 أصدرت هيئة حماية المعلومات الشخصية الكورية (PIPC) دليلًا لاستعمال الذكاء الاصطناعي التوليدي [14]. ومما يوصي به للمؤسسة التي تستعمل نموذجًا خارجيًا: ترخيص مؤسسي بحماية قوية للبيانات، وبنود لحماية البيانات في العقد، والتحقق من نقل البيانات إلى الخارج [15].",
          },
          {
            kind: "prose",
            text: "يعني: كوريا لم تكتفِ بالمنع، بل وضعت بديلًا داخليًا وعقدًا واضحًا.",
          },
        ],
      },
      {
        heading: "ماذا يعني لصاحب القرار: خمس خطوات تبدأ غدًا",
        blocks: [
          {
            kind: "list",
            items: [
              "**اسألوا موظفيكم قبل أن تمنعوهم.** استطلاع قصير بلا أسماء: أي أدوات تستعملون، ولأي مهام؟",
              "**قدّموا أداة آمنة أنفع من المجانية.** ترخيص مؤسسي أو نموذج داخلي، بعقد يحدد مكان حفظ البيانات، ويمنع استعمالها في تدريب نماذج المورّد، ويعطي المؤسسة حق التدقيق [15].",
              "**اجعلوا القاعدة بلون التصنيف، لا بقائمة طويلة.** ما هو «عام» يمكن إدخاله، وما هو «مقيّد» أو أعلى لا يدخل إلا الأداة المعتمدة، كما في إرشادات سدايا للجهات الحكومية [9].",
              "**درّبوا على الحالات الحقيقية.** ملف مريض، كشف حساب، محضر مجلس. التقرير العالمي يربط الاستعمال غير المسؤول بنقص التدريب والتوجيه [1].",
              "**قيسوا كل ثلاثة أشهر.** نسبة الاستعمال عبر الأداة المعتمدة، وعدد الحالات المكتشفة، وتقرير قصير يصل إلى مجلس الإدارة.",
            ],
          },
        ],
      },
      {
        heading: "قراءة VisionSeek (رأي)",
        blocks: [
          {
            kind: "prose",
            text: "الذكاء الاصطناعي في الظل ليس مشكلة انضباط. إنه علامة على أن المؤسسة لم توفر الأداة التي يحتاجها الموظف.",
          },
          {
            kind: "prose",
            text: "وعلى سلّم الامتلاك، المؤسسة التي يعمل موظفوها بأدوات مجانية لا تقف حتى على درجة «الاستخدام»، لأنها لا تملك عقدًا ولا سجلًا ولا تعرف أين ذهبت بياناتها.",
          },
          {
            kind: "prose",
            text: "الترخيص المؤسسي بعقد واضح يضعها على درجة «الاستخدام» بشروطها. والأداة الداخلية المبنية على بياناتها، كما فعلت سامسونج، تقرّبها من «التكييف».",
          },
          {
            kind: "prose",
            text: "وبنود العقد التي تحدد مكان البيانات وحق التدقيق هي من صميم ما يراجعه برنامجنا **VS-P03 Clause**.",
          },
        ],
      },
      {
        heading: "الخلاصة",
        blocks: [
          {
            kind: "prose",
            text: "يعني: لا تسأل هل يستعمل موظفوك الذكاء الاصطناعي، بل بأي أداة ومن يملك ما يدخلها.",
          },
          {
            kind: "prose",
            text: "والأسئلة التي سنراقبها: هل تبدأ جهة رقابية عربية بالسؤال عن استعمال الموظفين للأدوات العامة في تفتيشها؟ وهل تصدر في مصر أول عقوبة بسبب نقل بيانات عبر أداة ذكاء اصطناعي؟",
          },
        ],
      },
      {
        heading: "المنهجية والمصادر",
        blocks: [
          {
            kind: "prose",
            text: "**النطاق:** استعمال الموظفين لأدوات الذكاء الاصطناعي العامة في السعودية والإمارات ومصر، والإطار القانوني للبيانات الشخصية في السعودية ومصر. **خارج النطاق:** قانون الإمارات، إذ لم نراجع نص عقوباته هنا، وهذا لا يعني غيابها. والقواعد القطاعية الخاصة مثل البنوك.",
          },
          {
            kind: "prose",
            text: "**البيانات:** أرقام الدول من صفحات الدول [2][3][4]. ونسبة رفع البيانات بحسب موقف المؤسسة رقم عالمي لا خاص بالدول الثلاث [1].",
          },
          {
            kind: "prose",
            text: "**ما لا نعرفه:** لا توجد في صفحات الدول نسبة من رفعوا بيانات الشركة إلى أدوات عامة. ولم نجد حكمًا منشورًا في السعودية أو مصر يخص لصق بيانات في أداة ذكاء اصطناعي، وهذا لا يعني أنه غير موجود. وهذا التقرير ليس رأيًا قانونيًا.",
          },
          {
            kind: "prose",
            text: "**سلّم الامتلاك:** لا نقيّم أي مؤسسة بعينها. والقراءة في قسم الرأي عامة.",
          },
          {
            kind: "prose",
            text: "**المصادر:** [1] KPMG وجامعة ملبورن، التقرير العالمي 2025 · [2] صفحة السعودية · [3] صفحة الإمارات · [4] صفحة مصر · [5] IBM، تقرير كلفة اختراق البيانات 2025 · [6] IBM، بيان 30/07/2025 · [7] IBM الشرق الأوسط وأفريقيا، 30/07/2025 · [8] سدايا، نظام حماية البيانات الشخصية · [9] سدايا، إرشادات الذكاء الاصطناعي التوليدي للجهات الحكومية · [10] مصر، القانون 151 لسنة 2020 · [11] The Korea Herald، 03/05/2023 · [12] TechCrunch، 02/05/2023 · [13] Samsung Newsroom، 08/11/2023 · [14] هيئة حماية المعلومات الشخصية الكورية، 06/08/2025 · [15] Kim & Chang، 08/08/2025. الروابط الكاملة في بيانات الملف.",
          },
        ],
      },
      ],
    },
    en: {
      intro: [
      "Walk into any Arab ministry, hospital or bank today and you will find an employee pasting text into an AI window to summarize or translate it.",
      "It might be meeting minutes, a patient file, or a customer's account statement.",
      "The tool is usually free, opened from the employee's personal account.",
      "**The institution does not see it, but the institution is the one that will pay.**",
      ],
      sections: [
      {
        heading: "The Short Answer: A Ban on Paper Does Not Protect Data; a Safe Tool Does",
        blocks: [
          {
            kind: "prose",
            text: "**The answer:** Our employees already use AI, and many of them use it outside what their institution allows. A ban or a written policy alone does not change that. What changes it is giving staff a safe tool under a clear contract, one that is more useful than the free tool, and then training them and measuring the result.",
          },
          {
            kind: "prose",
            text: "Three messages support this answer:",
          },
          {
            kind: "list",
            items: [
              "**Use is widespread and out of the institution's sight.** More than 9 in 10 employees in Saudi Arabia, the UAE and Egypt intentionally use AI at work [2][3][4]. Globally, 70% use free public tools, and only 42% use tools provided by their employer [1].",
              "**A written policy is not enough.** About three in four employees in the three countries say their organization has a policy, yet 47% to 56% have broken it [2][3][4]. Globally, uploading company information was higher where AI was banned (67%) than where there was no policy (33%) [1].",
              "**The cost falls on the institution and its management.** In Saudi Arabia fines reach SAR 5 million [8]. In Egypt the \"person responsible for the actual management\" can face the same penalties [10].",
            ],
          },
        ],
      },
      {
        heading: "How Many of Our Employees Use AI at Work?",
        blocks: [
          {
            kind: "prose",
            text: "In 2025 KPMG and the University of Melbourne published a survey of 48,340 people in 47 countries, including Saudi Arabia, the UAE and Egypt. Responses were collected between November 2024 and mid-January 2025 [1].",
          },
          {
            kind: "prose",
            text: "Our region scores above the global average. 92% in Saudi Arabia and the UAE, and 91% in Egypt, said they intentionally use AI at work [2][3][4].",
          },
          {
            kind: "prose",
            text: "But with which tool? Globally, most employees use free public tools (70%). And 48% said they had uploaded company information, such as sales figures or customer data, into public AI tools [1].",
          },
          {
            kind: "prose",
            text: "A \"public tool\" here means a service open to anyone on the internet, with no contract binding it to the institution on where data is stored and who can see it.",
          },
          {
            kind: "prose",
            text: "In short: data leaves the institution every day through a door nobody watches.",
          },
        ],
      },
      {
        heading: "Why Is a Written Policy Not Enough?",
        blocks: [
          {
            kind: "prose",
            text: "Most of our institutions have written a policy. But employee behaviour under work pressure is another matter.",
          },
        ],
      },
      {
        heading: "Exhibit 1: Three in four organizations have a policy, and close to half of employees break it",
        blocks: [
          {
            kind: "table",
            columns: [
              "Country",
              "Intentionally use AI at work",
              "Say their organization has policies for responsible use",
              "Used AI in ways that contravene policies",
              "Relied on AI output without checking its accuracy",
            ],
            rows: [
              [
                "Saudi Arabia [2]",
                "92%",
                "73%",
                "47%",
                "70%",
              ],
              [
                "UAE [3]",
                "92%",
                "73%",
                "56%",
                "72%",
              ],
              [
                "Egypt [4]",
                "91%",
                "71%",
                "48%",
                "75%",
              ],
              [
                "Global average [1]",
                "—",
                "—",
                "44%",
                "66%",
              ],
            ],
            note: "*Source: KPMG and University of Melbourne, Trust, attitudes and use of AI 2025, country insights [2][3][4] and global report [1]. Figures are self-reported by employees; the report notes they likely understate reality because people are reluctant to admit breaches [1].*",
          },
          {
            kind: "prose",
            text: "The surprise in the global report: employees in organizations that ban generative AI were the most likely to upload company information to public tools [1].",
          },
        ],
      },
      {
        heading: "Exhibit 2: Where AI is banned, employees uploaded more company data, not less",
        blocks: [
          {
            kind: "table",
            columns: [
              "Organization's stance on generative AI",
              "Share who uploaded company information to public tools",
            ],
            rows: [
              [
                "Bans it",
                "67%",
              ],
              [
                "Has a policy guiding its use",
                "56%",
              ],
              [
                "Employee does not know if there is a policy",
                "38%",
              ],
              [
                "No policy",
                "33%",
              ],
            ],
            note: "*Source: KPMG and University of Melbourne, global report 2025, p. 75 [1]. This is a correlation, not proven causation. The report's own reading is that outright bans \"may be ineffective\" and that having a policy \"does not guarantee compliance\" without clear guidance and education.*",
          },
          {
            kind: "prose",
            text: "IBM says 20% of the organizations in its 2025 study suffered a breach because of \"shadow AI\", meaning tools employees use without the organization's knowledge. Organizations with high levels of shadow AI paid on average USD 670,000 more per breach [5].",
          },
          {
            kind: "prose",
            text: "Only 37% of organizations in the study have policies to manage AI or detect shadow AI [6]. In the Middle East the average cost of a single breach was SAR 27 million, about USD 7.29 million, the second highest average after the United States [5][7].",
          },
          {
            kind: "prose",
            text: "In short: a ban pushes use into the shadows; it does not stop it.",
          },
        ],
      },
      {
        heading: "Who Pays If the Data Gets Out?",
        blocks: [
          {
            kind: "prose",
            text: "Here the question becomes a legal one.",
          },
          {
            kind: "prose",
            text: "In Saudi Arabia, the Personal Data Protection Law classifies \"health data\" as sensitive data [8]. It sets conditions for transferring data outside the Kingdom, including a level of protection no lower than the Law's and limiting transfer to the minimum necessary (Article 29) [8].",
          },
          {
            kind: "prose",
            text: "In Egypt, Law No. 151 of 2020 penalizes breaches of the cross-border transfer rules, and holds the institution's de facto manager liable if they knew and their failure contributed to the breach [10].",
          },
        ],
      },
      {
        heading: "Exhibit 3: The law puts the cost on the institution and its manager, not on the free tool",
        blocks: [
          {
            kind: "table",
            columns: [
              "Provision",
              "What it covers",
              "Maximum stated penalty",
            ],
            rows: [
              [
                "Saudi Arabia, PDPL, Article 36 [8]",
                "Any breach of the Law or its Regulations not covered by Article 35",
                "Warning or fine up to SAR 5 million, doubled for repeat violations",
              ],
              [
                "Saudi Arabia, Article 35 [8]",
                "Disclosing or publishing sensitive data with intent to harm or for personal benefit",
                "Up to 2 years' imprisonment and/or fine up to SAR 3 million",
              ],
              [
                "Egypt, Law 151 of 2020, Article 42 [10]",
                "Breaching the rules on cross-border movement of personal data",
                "At least 3 months' imprisonment and/or fine of EGP 500,000 to 5 million",
              ],
              [
                "Egypt, Article 41 [10]",
                "Transferring or circulating sensitive data without the data subject's consent",
                "At least 3 months' imprisonment and/or fine of EGP 500,000 to 5 million",
              ],
              [
                "Egypt, Article 47 [10]",
                "The person responsible for the actual management of the violating entity",
                "The same penalties, if knowledge and contributing breach of duty are proven",
              ],
              [
                "Saudi Arabia, SDAIA Generative AI Guidelines for Government, section 3.5 [9]",
                "Government employees must not enter data classified \"restricted\" or higher into generative AI tools",
                "Guidance; no penalty in itself",
              ],
            ],
            note: "*Source: PDPL text published by SDAIA [8], SDAIA guidelines [9], and the text of Egyptian Law 151 of 2020 [10]. Whether pasting personal data into a foreign tool counts legally as \"transfer\" or \"disclosure\" is a legal question for each institution's counsel; we do not answer it here.*",
          },
          {
            kind: "prose",
            text: "In short: the tool is free for the employee, but it can cost the institution and its manager a great deal.",
          },
        ],
      },
      {
        heading: "What Did Korea Do When It Faced the Same Problem?",
        blocks: [
          {
            kind: "prose",
            text: "In April 2023 Samsung found three cases in which engineers had uploaded source code and internal meeting minutes to ChatGPT. It banned public tools on company devices from 1 May 2023 and said it was building its own tools [11][12].",
          },
          {
            kind: "prose",
            text: "About six months later Samsung announced Samsung Gauss, saying it \"is currently used on employee productivity\": composing emails, summarizing documents, translation and coding assistance [13].",
          },
          {
            kind: "prose",
            text: "In August 2025 Korea's Personal Information Protection Commission (PIPC) issued a guideline on using generative AI [14]. Among its recommendations for an organization using an external model: enterprise licences with robust data protection, data protection clauses in the contract, and verification of overseas data transfer [15].",
          },
          {
            kind: "prose",
            text: "In short: Korea did not stop at a ban; it put an internal alternative and a clear contract in place.",
          },
        ],
      },
      {
        heading: "What It Means for Decision Makers: Five Steps Starting Tomorrow",
        blocks: [
          {
            kind: "list",
            items: [
              "**Ask your employees before you ban them.** A short anonymous survey: which tools do you use, and for what tasks?",
              "**Provide a safe tool that is more useful than the free one.** An enterprise licence or an internal model, under a contract that fixes where data is stored, forbids its use to train the vendor's models, and gives the institution audit rights [15].",
              "**Make the rule follow data classification, not a long list.** \"Public\" data may go in; \"restricted\" or higher goes only into the approved tool, as in SDAIA's guidelines for government entities [9].",
              "**Train on real cases.** A patient file, an account statement, board minutes. The global report links irresponsible use to a lack of training and guidance [1].",
              "**Measure every three months.** Share of use through the approved tool, number of detected cases, and a short report to the board.",
            ],
          },
        ],
      },
      {
        heading: "The VisionSeek View (Opinion)",
        blocks: [
          {
            kind: "prose",
            text: "Shadow AI is not a discipline problem. It is a sign that the institution has not provided the tool its employees need.",
          },
          {
            kind: "prose",
            text: "On the ownership ladder, an institution whose staff work with free tools does not even stand on the \"use\" rung: it has no contract, no record, and no knowledge of where its data went.",
          },
          {
            kind: "prose",
            text: "An enterprise licence with a clear contract puts it on the \"use\" rung on its own terms. An internal tool built on its own data, as Samsung did, brings it closer to \"adaptation\".",
          },
          {
            kind: "prose",
            text: "Contract clauses that fix where data lives and grant audit rights are at the core of what our **VS-P03 Clause** programme reviews.",
          },
        ],
      },
      {
        heading: "Conclusion",
        blocks: [
          {
            kind: "prose",
            text: "In short: do not ask whether your staff use AI; ask which tool, and who owns what goes into it.",
          },
          {
            kind: "prose",
            text: "Questions we will watch: Will an Arab regulator start asking about employees' use of public AI tools during inspections? And will Egypt issue its first penalty over data transferred through an AI tool?",
          },
        ],
      },
      {
        heading: "Methodology and Sources",
        blocks: [
          {
            kind: "prose",
            text: "**Scope:** Employee use of public AI tools in Saudi Arabia, the UAE and Egypt, and the personal data legal framework in Saudi Arabia and Egypt. **Out of scope:** UAE law, as we did not review its penalty provisions here (which does not mean they are absent), and sector-specific rules such as banking.",
          },
          {
            kind: "prose",
            text: "**Data:** Country figures from the country insights pages [2][3][4]. The upload rate by organizational stance is a global figure, not specific to the three countries [1].",
          },
          {
            kind: "prose",
            text: "**What we do not know:** The country pages do not report the share who uploaded company information to public tools. We found no published ruling in Saudi Arabia or Egypt concerning data pasted into an AI tool; that does not mean none exists. This report is not legal advice.",
          },
          {
            kind: "prose",
            text: "**Ownership ladder:** We do not rate any specific institution. The reading in the opinion section is general.",
          },
          {
            kind: "prose",
            text: "**Sources:** [1] KPMG and University of Melbourne, global report 2025 · [2] Saudi Arabia insights · [3] UAE insights · [4] Egypt insights · [5] IBM, Cost of a Data Breach Report 2025 · [6] IBM, press release 30/07/2025 · [7] IBM Middle East & Africa, 30/07/2025 · [8] SDAIA, Personal Data Protection Law · [9] SDAIA, Generative AI Guidelines for Government · [10] Egypt, Law 151 of 2020 · [11] The Korea Herald, 03/05/2023 · [12] TechCrunch, 02/05/2023 · [13] Samsung Newsroom, 08/11/2023 · [14] Korea PIPC, 06/08/2025 · [15] Kim & Chang, 08/08/2025. Full links in the file metadata.",
          },
        ],
      },
      ],
    },
  },
} as const;

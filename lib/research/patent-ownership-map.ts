/**
 * «من يملك الابتكار الخليجي؟ خريطة ملكية البراءات» — الإصدار 1.0.
 * النص العربي كما ورد في المصدر المعتمد (draft-ar-v1.0). الأرقام والمصادر كما هي.
 * لا اختراع لمحتوى، ولا وسم مراجعة، ولا لقب دكتوراه.
 */
export type Bi = {ar: string; en: string};

export const paper = {
  slug: 'patent-ownership-map',
  pdfAr: '/reports/reports/patent-ownership-map-ar.pdf',
  cover: '/reports/reports/patent-ownership-map-cover.jpg',
  date: '2026-10-25',
  dateLabel: {ar: '25 أكتوبر 2026', en: '25 October 2026'},
  versionLabel: {ar: 'الإصدار 1.0', en: 'Version 1.0'},
  label: {ar: 'مختبر VisionSeek · تقارير · الإصدار 1.0', en: 'VisionSeek Lab · Reports · Version 1.0'},
  lab: 'VISIONSEEK LAB · PATENT OWNERSHIP MAP',
  title: {ar: 'من يملك الابتكار الخليجي؟', en: 'Who Owns Gulf Innovation?'},
  question: {
    ar: 'خريطة ملكية البراءات',
    en: 'A Patent Ownership Map',
  },
  deck: {ar: 'تركيب منهجي للأدلة المنشورة · دول المجلس الست', en: 'Version 1.0'},
  fullTitle: {
    ar: 'من يملك الابتكار الخليجي؟ خريطة ملكية البراءات',
    en: 'Who Owns Gulf Innovation? A Patent Ownership Map',
  },
  author: {ar: 'أحمد عبدالعليم', en: 'Ahmed Abdelalim'},
  cardSummary: {
    ar: 'في 2024 جاءت 61.3% من طلبات البراءات المودعة لدى المكتب السعودي من غير المقيمين، وتراوحت النسبة بين 88.5% و98.5% في الإمارات وعُمان والكويت وقطر والبحرين. خريطة ملكية البراءات في دول المجلس الست والمجالات الحرجة السبعة.',
    en: 'In 2024, 61.3% of patent applications filed at the Saudi office came from non-residents, and the share ranged from 88.5% to 98.5% in the UAE, Oman, Kuwait, Qatar and Bahrain. A map of patent ownership across the six GCC states and seven critical fields.',
  },
  about: {
    heading: {ar: 'مفتاح الوسوم', en: 'How to read the marks'},
    body: '**مفتاح الوسوم:** [مؤكد بمصدر] = حقيقة منسوبة إلى رابط فُتح وقُرئ. [استنتاج] = قراءة VisionSeek التحليلية. «رأي منقول» = رأي معلّق يُعرض رأيًا لا بيانات. الخانات التي يحسبها الإصدار التالي مجمّعة في §8 «أسئلة مفتوحة للإصدار التالي».',
  },
  methodologyHref: '/reports/reports/methodology',
  methodologyLabel: {ar: 'منهجية التقارير', en: 'Reports Methodology'},
  doctrineHref: '/reports/reports/localization-doctrine',
  doctrineLabel: {ar: 'عقيدة التوطين', en: 'The Localization Doctrine'},
  headline: 'السوق الخليجية تُحمى ببراءات غيرها.',
  headlineNote: 'الخلاصة الأولى من هذا الإصدار',
  markersLegend: {
    heading: {ar: 'كيف تقرأ العلامات', en: 'How to read the marks'},
    items: [
      {kind: 's' as const, ar: '[مؤكد بمصدر] حقيقة منسوبة إلى رابط فُتح وقُرئ.', en: '[Verified] a fact attributed to a link that was opened and read.'},
      {kind: 'i' as const, ar: '[استنتاج] قراءة VisionSeek التحليلية.', en: '[Inference] a VisionSeek analytical reading.'},
      {kind: 'p' as const, ar: '«رأي منقول» رأي معلّق يُعرض رأيًا لا بيانات.', en: 'Quoted opinion, shown as opinion not data.'},
    ],
  },
  stats: [
    {big: '75.9%', text: 'حصة غير المقيم من 14,688 طلبًا في المكاتب الست (2024). [استنتاج: الحساب]'},
    {big: '61.3%', text: 'حصة غير المقيم في المكتب السعودي؛ وأدنى الحصة بين الدول الست. [مؤكد بمصدر: WIPO SA]'},
    {big: '1,195', text: 'وثيقة في مصفوفة المجالات السبعة بجنسية مقدّم الطلب. [مؤكد بمصدر: PATENTSCOPE §5.2]'},
    {big: '1,002', text: 'طلبًا لأرامكو من الطلبات المؤسسية في السعودية (17.01%). [مؤكد بمصدر: SAIP ص13]'},
  ],
  conclusions: {
    heading: {ar: 'الملخص التنفيذي: ست خلاصات', en: 'Executive summary: six findings'},
    items: [
      {
        title: '«السوق الخليجية تُحمى ببراءات غيرها.»',
        text: 'في 2024 جاءت 61.3% من طلبات البراءات المودعة لدى المكتب السعودي من غير المقيمين، وتراوحت النسبة بين 88.5% و98.5% في الإمارات وعُمان والكويت وقطر والبحرين [مؤكد بمصدر: [WIPO SA](https://www.wipo.int/edocs/statistics-country-profile/en/sa.pdf)، [AE](https://www.wipo.int/edocs/statistics-country-profile/en/ae.pdf)، [OM](https://www.wipo.int/edocs/statistics-country-profile/en/om.pdf)، [KW](https://www.wipo.int/edocs/statistics-country-profile/en/kw.pdf)، [QA](https://www.wipo.int/edocs/statistics-country-profile/en/qa.pdf)، [BH](https://www.wipo.int/edocs/statistics-country-profile/en/bh.pdf)].',
      },
      {
        title: '«الولايات المتحدة أكبر مصدر أجنبي في الدول الست كلها.»',
        text: 'تتصدّر الولايات المتحدة قائمة منشأ الطلبات غير المقيمة في كل دولة: 1,821 في السعودية، و1,259 في الإمارات، و683 في قطر (47.8%)، و299 في البحرين (42.3%)، و103 في كلٍّ من عُمان (32.1%) والكويت (32.4%) [مؤكد بمصدر: ملفات WIPO أعلاه].',
      },
      {
        title: '«السعودية وحدها تملك كتلة وطنية واضحة.»',
        text: 'أودع المقيمون 3,108 طلبات في السعودية مقابل 278 في الإمارات و98 في عُمان و30 في الكويت و21 في قطر و6 في البحرين (2024) [مؤكد بمصدر: ملفات WIPO]. وفي المجالات الحرجة السبعة يحمل مقدّمو الطلبات السعوديون 757 من 1,195 وثيقة في المصفوفة (63.3%)، والإماراتيون 332 (27.8%)؛ أي 91.1% للبلدين معًا [مؤكد بمصدر: PATENTSCOPE §5.2؛ استنتاج: الحساب].',
      },
      {
        title: '«الاتصالات والرقائق تقودان، والروبوتات شبه غائبة.»',
        text: 'تجمع الاتصالات 419 وثيقة والرقائق 220 والتقنية الحيوية 204 والذكاء الاصطناعي 165 والبطاريات 116 والسحابة 58، والروبوتات 13 فقط على مستوى الدول الست [مؤكد بمصدر: PATENTSCOPE §5.2؛ استنتاج: الحساب]. وقطر تتقدّم الإمارات في السحابة (15 مقابل 14) رغم صغر كتلتها الكلية [مؤكد بمصدر: PATENTSCOPE].',
      },
      {
        title: '«المالك الوطني الأكبر شركة طاقة.»',
        text: 'تصدّرت أرامكو المودعين المؤسسيين في السعودية بـ1,002 طلب (17.01% من الطلبات المؤسسية) في 2024، وتلتها Halliburton (3.40%) وSchlumberger Technology B.V (2.46%) وSABIC Global Technologies B.V. (1.29%) وجامعة الملك سعود (0.93%) وBaker Hughes (0.85%) [مؤكد بمصدر: SAIP، التقرير الإحصائي 2024، ص13].',
      },
      {
        title: '«العنوان ليس الهوية.»',
        text: 'تظهر سابك بكيان مسجّل باسم B.V.، فالمالك الوطني يودع عبر كيان خارجي؛ و«موقع المالك» وحده مؤشر مضلِّل [مؤكد بمصدر: SAIP ص13؛ Abdulfasi 2024] [استنتاج: الدلالة المنهجية]. ويحسب الإصدار التالي تقسيم نوع المالك وفجوة المخترع/المالك لكل خانة (§8).',
      },
    ],
  },
  method: {
    heading: {ar: 'ملخص المنهجية', en: 'Methodology summary'},
    items: [
      {label: 'السؤال', text: 'من يملك البراءات المرتبطة بدول المجلس الست في المجالات الحرجة السبعة، وأين يقيم المخترع مقارنةً بالمالك؟'},
      {label: 'وحدة التحليل', text: 'أسرة البراءة/الطلب، مصنّفة بثلاثة أبعاد: الدولة (6) × المجال (7، وفق ipc-cpc-mapping.md) × نوع المالك.'},
      {label: 'أنواع المالك', text: 'وطني · فرع أجنبي (كيان محلي لمجموعة أجنبية) · أجنبي · فرد · مشترك.'},
      {label: 'فجوة المخترع/المالك', text: 'مقارنة دولة إقامة المخترع بدولة المالك وجنسيته المؤسسية.'},
      {label: 'طبقات المصادر', text: 'أ رسمي/منظمة دولية · ب إفصاح أطراف · ج بحث محكّم/مركز أبحاث · د استشاري · هـ خيوط لا يُستشهد بها. الرسمي المتعارض يُعرض بطرفيه.'},
      {label: 'فحص التغطية السابقة', text: 'prior-coverage-check.md، مع تحقق «باحث» المستقل في bahith-verification.md.'},
      {label: 'مصادر البيانات الخام', text: 'WIPO PATENTSCOPE (مجموعة مكتب GCC، أكثر من 11,500 وثيقة ببليوغرافية) [مؤكد بمصدر: [WIPO، 2024](https://www.wipo.int/en/web/patentscope/w/news/2024/news_0002)]؛ الجريدة الرسمية لمكتب GCC بحقولها للمخترع والدولة ودولة الأولوية وقائمة تغيير الملكية [مؤكد بمصدر: [العدد 56](https://www.gccpo.org/Doc/PatentGazette/Gazette/Gazette-E/56.pdf)]؛ تقارير SAIP؛ جداول USPTO PTMT التي تحدد الأصل بإقامة المخترع الأول وتعرض المالك الأول.'},
    ],
  },
  ladder: {
    heading: {ar: 'الإطار: سلّم الامتلاك مطبّقًا على البراءات', en: 'The ownership ladder applied to patents'},
    exhibit: 'خمس درجات من الاستخدام إلى التصدير',
    exhibitNote: 'دلالة البراءة لكل درجة',
    columns: ['الدرجة', 'المعنى', 'دلالة البراءة [استنتاج]'],
    steps: [
      {n: '١', ar: 'استخدام', meaning: 'تشغيل تقنية أجنبية', note: 'براءة أجنبية المالك تحمي منتجًا يُباع في السوق المحلية'},
      {n: '٢', ar: 'تجميع', meaning: 'بناء وتشغيل محلي', note: 'براءة فرع أجنبي محلي أو مخترع مقيم لمالك أجنبي'},
      {n: '٣', ar: 'تكييف', meaning: 'تعديل لحاجات محلية', note: 'براءة تحسين بمالك وطني تطالب بأولوية أجنبية'},
      {n: '٤', ar: 'تصميم', meaning: 'ابتكار أصيل', note: 'براءة وطنية المالك والمخترع، أولوية محلية'},
      {n: '٥', ar: 'تصدير/معيار', meaning: 'قيمة خارج الحدود', note: 'براءة وطنية ممتدة دوليًا (PCT/مكاتب كبرى) أو معيارية'},
    ],
    pull: 'الامتلاك لا الاستخدام؛ عدد الطلبات المودعة في الدولة يقيس جاذبية السوق، وملكيتها تقيس القدرة.',
    pullNote: 'استنتاج',
  },
  official: {
    heading: {ar: 'ما تقوله الأرقام الرسمية', en: 'What the official numbers say'},
    total: {
      heading: 'الصورة الكلية (المكاتب الوطنية، 2024)',
      columns: ['الدولة', 'الإجمالي', 'مقيم', 'غير مقيم', 'حصة غير المقيم', 'أكبر مصدر أجنبي (العدد؛ الحصة كما يطبعها الملف)'],
      rows: [
        {country: 'السعودية', total: '8,029', resident: '3,108', nonresident: '4,921', share: '61.3%', foreign: 'الولايات المتحدة 1,821 (35.3%)'},
        {country: 'الإمارات', total: '3,598', resident: '278', nonresident: '3,320', share: '92.3%', foreign: 'الولايات المتحدة 1,259'},
        {country: 'قطر', total: '1,130', resident: '21', nonresident: '1,109', share: '98.1%', foreign: 'الولايات المتحدة 683 (47.8%)'},
        {country: 'عُمان', total: '855', resident: '98', nonresident: '757', share: '88.5%', foreign: 'الولايات المتحدة 103 (32.1%)'},
        {country: 'الكويت', total: '683', resident: '30', nonresident: '653', share: '95.6%', foreign: 'الولايات المتحدة 103 (32.4%)'},
        {country: 'البحرين', total: '393', resident: '6', nonresident: '387', share: '98.5%', foreign: 'الولايات المتحدة 299 (42.3%)'},
        {country: 'المجموع', total: '14,688', resident: '3,541', nonresident: '11,147', share: '75.9%', foreign: '—', strong: true},
      ],
      note: '[مؤكد بمصدر: ملفات WIPO الإحصائية القُطرية 2024 للدول الست، فُتحت في 2026-10-25، آخر تحديث للقاعدة 6/2026]. المجموع وحصته حساب VisionSeek [استنتاج]. تبني WIPO قائمة منشأ الطلبات غير المقيمة من البيانات الوطنية والإقليمية معًا (الملاحظة 7 في الملفات)، فلا تطابق قاعدة الحصة عمود «غير مقيم» [مؤكد بمصدر].',
    },
    saudi: {
      heading: 'السعودية بتفصيل المكتب الوطني',
      items: [
        '8,029 طلبًا في 2024 (+13.33%)، منها 5,890 من مؤسسات (73.35%) و2,139 من أفراد [مؤكد بمصدر: [SAIP ص10](https://www.saip.gov.sa/api/proxy-file?path=%2Fsites%2Fdefault%2Ffiles%2Fsaip_reports%2Fdocuments%2FAnnual-report-20.4.2025%20%281%29.pdf&action=view)]؛ حصة الأفراد نحو 26.6% [استنتاج: حساب].',
        '56.86% من الطلبات عبر معاهدة PCT، و3,464 طلبًا مباشرًا [مؤكد بمصدر: SAIP ص11].',
        '38.71% مقيم (3,108) و61.29% من الخارج (4,921) [مؤكد بمصدر: SAIP ص12].',
        '**تعارض رسمي معروض بطرفيه:** SAIP يذكر 1,718 طلبًا من الولايات المتحدة، وWIPO يذكر 1,821 [مؤكد بمصدر: SAIP ص12؛ WIPO SA]. وتذكر SAIP الصين 414 وهولندا 346 وألمانيا 269.',
      ],
    },
    procedure: {
      heading: 'الإطار الإجرائي',
      items: [
        'توقف مكتب براءات مجلس التعاون عن قبول الطلبات وفق نظام 1999 بقرار المجلس الأعلى في دورته 41 (العُلا، 5 يناير 2021) [مؤكد بمصدر: [إعلان المكتب](https://gccpo.org/AboutUsEn/ShowNews?id=66)]، ولا تُقبل طلبات جديدة بعد 6 يناير 2021؛ واستأنفت دول أعضاء أخرى استخدام المكتب بينما بقيت السعودية خارجه [مؤكد بمصدر: [WIPO INSPIRE](https://inspire.wipo.int/index.php/system/files/juri/sa.pdf)].',
        'النتيجة على التصميم: بيانات ما قبل 2021 في مجموعة GCC، وما بعدها في المكاتب الوطنية ومسار PCT [استنتاج].',
        'يقدّر تقرير Strategy& مدة التسجيل في GCC بـ42–48 شهرًا؛ رقم استشاري (مستوى د) يُعرض تقديرًا لا رقمًا معتمدًا [مؤكد بمصدر كتقدير: [Strategy&](https://www.strategyand.pwc.com/m1/en/reports/moving-beyond-bricks.pdf)].',
      ],
    },
    quoted: {
      heading: 'رأي منقول عن نمط الملكية',
      text: 'ينقل تقرير ESCWA عن Price وAl Debasi أن «البراءات القليلة نسبيًا الناشئة من دول المجلس جاءت أساسًا من صناعات الطاقة في السعودية والإمارات، وأودعها غالبًا مقيمون وافدون لا مواطنون، ومملوكة لشركة أجنبية، وتطالب بأولوية طلب أجنبي سابق» — **رأي معلّق قانوني لا بيانات**، ولا يمثّل موقف ESCWA [مؤكد بمصدر كنقل: [ESCWA، E/ESCWA/TDD/2019/5 (2019/2020)، الصفحة المطبوعة 13، الحاشية 42](https://www.unescwa.org/sites/default/files/pubs/pdf/intellectual-property-innovation-arab-region-english_0.pdf)، فُتح وطوبق النص في 2026-10-25]. وتضع ESCWA في الفقرة نفسها أن المنطقة العربية لم تشهد توليد براءات محلية ذات بعد تنافسي [مؤكد بمصدر: الموضع نفسه]. تصوغ هذه الورقة الرأي فرضيةً قابلة للقياس في المصفوفة (§8، س2) [استنتاج].',
    },
  },
  matrix: {
    heading: {ar: 'المصفوفة: الدول الست × المجالات السبعة × نوع المالك', en: 'The matrix: six states × seven fields × owner type'},
    status: '**حالة البيانات:** خانات المجالات الـ42 مكتملة من PATENTSCOPE (§5.2). تقسيم نوع المالك وفجوة المخترع/المالك يحسبهما الإصدار التالي من حقول PATENTSCOPE (§8، س1–س2).',
    totals: {
      heading: 'الصف الكلي: المؤكد اليوم لكل دولة',
      columns: ['الدولة', 'وثائق المجالات السبعة (§5.2)', 'الحصة من المصفوفة', 'ما هو مؤكد عن نوع المالك'],
      rows: [
        {country: 'السعودية', docs: '757', share: '63.3%', owner: 'وطني: أرامكو 1,002 طلب لدى SAIP، جامعة الملك سعود 0.93% من المؤسسي؛ وطني بكيان خارجي: SABIC Global Technologies B.V. 1.29%؛ أجنبي: Halliburton 3.40%، Schlumberger Technology B.V 2.46%، Baker Hughes 0.85%؛ أفراد: 2,139 طلبًا (26.6%) [مؤكد بمصدر: SAIP ص10، ص13]'},
        {country: 'الإمارات', docs: '332', share: '27.8%', owner: 'يُحسب في الإصدار التالي (§8، س1)'},
        {country: 'قطر', docs: '70', share: '5.9%', owner: 'يُحسب في الإصدار التالي (§8، س1)'},
        {country: 'الكويت', docs: '13', share: '1.1%', owner: 'يُحسب في الإصدار التالي (§8، س1)'},
        {country: 'البحرين', docs: '12', share: '1.0%', owner: 'يُحسب في الإصدار التالي (§8، س1)'},
        {country: 'عُمان', docs: '11', share: '0.9%', owner: 'يُحسب في الإصدار التالي (§8، س1)'},
        {country: 'المجموع', docs: '1,195', share: '100%', owner: '—', strong: true},
      ],
      note: '[مؤكد بمصدر للأعداد: PATENTSCOPE، patentscope-manual-queries.md؛ استنتاج: المجاميع والحصص حساب من خانات §5.2]. المجموع جمع للخانات، وخانتا الاتصالات والسحابة متداخلتان (H04L67/10 داخل H04L)، فهو حدّ أعلى لعدد الوثائق الفريدة [استنتاج]. ومقيم/غير مقيم في §4.1 يقيس إقامة المودع لدى المكتب، ووثائق §5.1 تقيس جنسية مقدّم الطلب عبر كل المكاتب، فلا يُجمع الجدولان [استنتاج].',
    },
    fields: {
      heading: 'المجالات السبعة: وثائق بجنسية مقدّم الطلب',
      columns: ['الدولة', 'رقائق', 'ذكاء اصطناعي', 'سحابة', 'اتصالات', 'روبوتات', 'بطاريات', 'تقنية حيوية'],
      rows: [
        {country: 'السعودية', cells: ['175', '90', '29', '239', '4', '92', '128']},
        {country: 'الإمارات', cells: ['30', '70', '14', '151', '7', '18', '42']},
        {country: 'قطر', cells: ['12', '4', '15', '17', '2', '4', '16']},
        {country: 'عُمان', cells: ['0', '1*', '0', '4', '0', '2', '4']},
        {country: 'الكويت', cells: ['3', '0', '0', '3', '0', '0', '7']},
        {country: 'البحرين', cells: ['0', '0', '0', '5', '0', '0', '7']},
        {country: 'مجموع المجال', cells: ['220', '165', '58', '419', '13', '116', '204'], strong: true},
      ],
      source: '[مؤكد بمصدر: PATENTSCOPE، استعلامات يدوية، patentscope-manual-queries.md]',
      footnote: '* عُمان/ذكاء اصطناعي: فتح الموقع الوثيقة WO2021221519 مباشرة، وهو سلوكه عند وجود نتيجة واحدة، فسُجّلت 1 [استنتاج].',
      totalsNote: 'مجاميع المجالات حساب VisionSeek من الخانات [استنتاج].',
      reading: '**قراءة الأرقام:** كل خانة = **عدد وثائق** PATENTSCOPE التي يحمل مقدّم طلبها جنسية الدولة (ANA:)، عبر كل المكاتب واللغات. الأرقام **ليست أسر براءات** (بلا تصفية العائلات)، وتقيس ملكية مقدّمي الطلب من الدولة لا الطلبات المودعة لدى مكتبها [استنتاج].',
    },
    memo: {
      heading: 'مذكرة المصدر',
      intro: 'PATENTSCOPE، الواجهة العامة، 2026-10-24، على جولتين بالمنهج نفسه: السعودية والإمارات 15:23–15:24 بتوقيت سيول (06:23:24–06:24:37 UTC)، وقطر وعُمان والكويت والبحرين 15:58–16:03 بتوقيت سيول (06:58:42–07:03:19 UTC)؛ كل المكاتب واللغات، مع التجذيع، بلا تصفية عائلات. يُضاف إلى كل استعلام «AND ANA:» برمز الدولة (SA، AE، QA، OM، KW، BH):',
      queries: [
        {field: 'رقائق', query: '(IC:H01L OR IC:H10*)'},
        {field: 'ذكاء اصطناعي', query: 'IC:G06N'},
        {field: 'سحابة', query: '(CPC:H04L67/10 OR CPC:G06F9/50)', note: 'رموز CPC للسحابة اختيار منهجي من VisionSeek، وتُراجع مطابقتها الكاملة في الإصدار التالي (§8، س5) [استنتاج]'},
        {field: 'اتصالات', query: 'IC:(H04B OR H04J OR H04M OR H04Q OR H01Q OR H04W OR H04L)', note: 'يشمل H04L كاملًا، فيتداخل مع خانة السحابة [استنتاج]'},
        {field: 'روبوتات', query: 'IC:B25J9'},
        {field: 'بطاريات', query: 'IC:H01M'},
        {field: 'تقنية حيوية', query: 'IC:(C07G OR C07K OR C12M OR C12N OR C12P OR C12Q OR C12R OR C12S)'},
      ],
      mapping: 'تعريف المجالات بالرموز: رقائق H01L/H10 · ذكاء اصطناعي G06N · سحابة H04L 67/10 + G06F 9/50 · اتصالات مجالا WIPO 3 و4 + H04W · روبوتات B25J 9 · بطاريات H01M + Y02E 60/10 · تقنية حيوية مجال WIPO 15 (التفاصيل في ipc-cpc-mapping.md).',
    },
    gap: {
      heading: 'فجوة المخترع/المالك',
      text: 'تُقاس الفجوة بثلاثة مؤشرات لكل دولة: (أ) مخترع مقيم ومالك أجنبي، (ب) مالك وطني بكيان خارجي، (ج) أولوية أجنبية لطلب مالك وطني. الحالة الموثقة اليوم: SABIC Global Technologies B.V. مثال مؤكد على المؤشر (ب) [مؤكد بمصدر: SAIP ص13]. النسب للدول الست تُحسب في الإصدار التالي (§8، س2) من حقول PATENTSCOPE وجريدة مكتب GCC [مؤكد بمصدر للحقول: [العدد 56](https://www.gccpo.org/Doc/PatentGazette/Gazette/Gazette-E/56.pdf)] وجداول USPTO PTMT التي تفصل إقامة المخترع الأول عن المالك الأول.',
    },
  },
  findings: {
    heading: {ar: 'النتائج حسب الدرجة', en: 'Findings by rung'},
    items: [
      {
        no: '1',
        title: 'الدرجة ١: الاستخدام (أقوى الإشارات)',
        text: '11,147 من 14,688 طلبًا في المكاتب الست (75.9%) لغير المقيمين، وتتراوح الحصة بين 61.3% (السعودية) و98.5% (البحرين)، والولايات المتحدة أكبر مصدر أجنبي في الدول الست كلها [مؤكد بمصدر للأرقام: WIPO؛ استنتاج للمجموع والدلالة]. معظم الحماية المسجّلة تخص تقنيات تُستخدم في السوق الخليجية ولا تُملك فيها [استنتاج].',
      },
      {
        no: '2',
        title: 'الدرجة ٢: التجميع',
        text: 'حضور شركات خدمات الطاقة الأجنبية بين كبار المودعين في السعودية (Halliburton 3.40% وSchlumberger 2.46% وBaker Hughes 0.85%) إشارة إلى نشاط هندسي أجنبي مرتبط بالسوق المحلية [مؤكد بمصدر: SAIP ص13؛ استنتاج للدلالة]. وحصة المخترعين المقيمين في براءاتها مؤشر الإصدار التالي (§8، س2).',
      },
      {
        no: '3',
        title: 'الدرجة ٣: التكييف',
        text: 'نمط «أولوية أجنبية» الوارد في الرأي المنقول عبر ESCWA فرضية تُقاس بحقل دولة الأولوية (§8، س2) [استنتاج].',
      },
      {
        no: '4',
        title: 'الدرجة ٤: التصميم',
        text: '3,108 طلبات مقيمة في السعودية، وأرامكو وحدها 1,002 طلب، مع حضور جامعي (جامعة الملك سعود) [مؤكد بمصدر]. وفي المجالات السبعة يحمل مقدّمو الطلبات السعوديون 757 وثيقة، أعلاها الاتصالات (239) والرقائق (175) والتقنية الحيوية (128)؛ والإماراتيون 332، أعلاها الاتصالات (151) والذكاء الاصطناعي (70) [مؤكد بمصدر: PATENTSCOPE]. وتبقى الكتلة في عُمان والكويت والبحرين بين 11 و13 وثيقة لكل منها، وصفرية في الرقائق أو الذكاء الاصطناعي أو السحابة في معظمها [مؤكد بمصدر: PATENTSCOPE]. ويوثق Abdulfasi (2024) مشهد البراءات السعودية حسب المؤسسة، ويحلل Abdul Fasi (2024) محفظة أرامكو [مؤكد بمصدر: [Abdulfasi](https://doi.org/10.3390/publications12040047)، [Abdul Fasi](https://doi.org/10.1007/s13132-023-01663-5)].',
      },
      {
        no: '5',
        title: 'الدرجة ٥: التصدير والمعيار',
        text: 'خانات المصفوفة تشمل كل المكاتب ومسار PCT، فوجود 757 وثيقة سعودية و332 إماراتية في المجالات السبعة يعكس امتدادًا خارج المكتب الوطني [مؤكد بمصدر للأعداد؛ استنتاج للدلالة]. ونشرت SAIP «تقرير واقع البراءات للمؤسسات السعودية في المكاتب الدولية» بتاريخ 26.02.2024 [مؤكد بمصدر: [صفحة التقرير](https://www.saip.gov.sa/ar/resources/ip-information/reports/db301817-d6bb-4555-9a91-a894dde0413f)]؛ وأرقامه وحصة المالكين الخليجيين في البراءات المعيارية تدخل الإصدار التالي (§8، س4).',
      },
    ],
  },
  prior: {
    heading: {ar: 'العلاقة بالأعمال السابقة', en: 'Relation to prior work'},
    items: [
      {title: 'Abdulfasi (2024)', text: 'مشهد البراءات السعودية حسب المؤسسة [مؤكد بمصدر].'},
      {title: 'Abdul Fasi (2024)', text: 'محفظة أرامكو، Journal of the Knowledge Economy 15(3) [مؤكد بمصدر].'},
      {title: 'El-Ouahi (2025)', text: 'براءات جامعات MENA عبر Derwent؛ السعودية في الصدارة، والسعودية وتركيا والمغرب 87% من البراءات الأكاديمية [مؤكد بمصدر: [ISSI 2025](https://doi.org/10.51408/issi2025_162)].'},
      {title: 'RDIA', text: 'قوة الاختراع السعودية حسب المجال؛ تتداخل معنا في بُعد المجال [مؤكد بمصدر: [RDIA](https://rdia.gov.sa/media/1zneaqf2/economies-of-the-future-rdi-national-priority-in-saudi-arabia-analytical-study_executive-summary.pdf)].'},
      {title: 'Price وAl Debasi عبر ESCWA', text: 'رأي نوعي عن الملكية الأجنبية.'},
      {title: 'مساهمة هذه الورقة', text: 'تضيف الورقة إلى هذه الأعمال، وفق فحص التغطية الموثق في prior-coverage-check.md وتحقق «باحث»، بناء مصفوفة الدول الست × المجالات السبعة × نوع المالك، مع فجوة المخترع/المالك، ووضعها على سلّم الامتلاك؛ وتتقاطع جزئيًا مع الأعمال الأربعة أعلاه [استنتاج].'},
    ],
  },
  questions: {
    heading: {ar: 'أسئلة مفتوحة للإصدار التالي', en: 'Open questions for the next edition'},
    items: [
      {title: 'تقسيم نوع المالك لكل خانة من الـ42', text: 'يصنّف الإصدار التالي كل وثيقة في §5.2 إلى وطني / فرع أجنبي / أجنبي / فرد، انطلاقًا من حقل جنسية مقدّم الطلب (ANA) وحقل إقامته واسمه في PATENTSCOPE، مع قاعدة: الكيان الخارجي لمالك وطني (مثل SABIC Global Technologies B.V.) = «وطني بكيان خارجي». يُستخرج ذلك بتنزيل قوائم النتائج عبر حساب PATENTSCOPE المجاني ضمن حدود شروط الاستخدام.'},
      {title: 'فجوة المخترع/المالك', text: 'مقارنة حقل إقامة المخترع وجنسيته بجنسية مقدّم الطلب (ANA) لكل وثيقة، وحقل بيانات الأولوية لقياس الأولوية الأجنبية؛ تُختبر بها فرضية Price وAl Debasi (وافدون، مالك أجنبي، أولوية أجنبية).'},
      {title: 'جداول USPTO PTMT', text: 'أرقام إقامة المخترع الأول مقابل المالك الأول للسعودية ([الجدول](https://www.uspto.gov/web/offices/ac/ido/oeip/taf/stcasga/sax_stcorg.htm)) تُدرج بعد الفتح المباشر.'},
      {title: 'الامتداد الدولي (الدرجة ٥)', text: 'أرقام تقرير SAIP عن البراءات السعودية في المكاتب الدولية؛ صفحة التقرير منشورة، ورابط الملف على بوابة الهيئة يعيد صفحة «غير موجودة» في 2026-10-25، فتُطلب نسخة محدّثة. وتُضاف حصة المالكين الخليجيين في البراءات المعيارية.'},
      {title: 'مطابقة رموز السحابة', text: 'مراجعة كاملة لرموز CPC للسحابة (H04L67/10، G06F9/50) وفصل تداخلها مع خانة الاتصالات.'},
      {title: 'الأصل المطبوع لرأي Price وAl Debasi', text: 'مطابقة ص142 من الكتاب (Routledge) بالنص المنقول في ESCWA.'},
      {title: 'أرقام أعمال سابقة', text: 'مطابقة أرقام El-Ouahi (2025) وأرقام محفظة أرامكو لدى Abdul Fasi (2024) من النصوص الكاملة قبل الاستشهاد بها رقمًا.'},
      {title: 'التوفيق بين SAIP وWIPO', text: 'الولايات المتحدة 1,718 طلبًا لدى SAIP مقابل 1,821 لدى WIPO؛ يُعرض الرقمان حتى يتضح سبب الفرق.'},
      {title: 'أثر 2021', text: 'هل تغيّر نمط الملكية بعد انتقال الإيداع من مكتب GCC إلى المكاتب الوطنية؟'},
      {title: 'مؤشر القدرة', text: 'هل يتحول هذا العمل إلى مكوّن سنوي في مؤشر القدرة التكنولوجية العربية؟ (قرار أحمد عبدالعليم)'},
    ],
  },
  scope: {
    heading: {ar: 'نطاق الإصدار ومصادره', en: 'Edition scope and sources'},
    items: [
      'يستند الإصدار إلى إحصاءات WIPO وSAIP الرسمية لعام 2024، وإلى 42 استعلامًا يدويًا على الواجهة العامة لـPATENTSCOPE بتاريخ 2026-10-24.',
      'خانات المصفوفة أعداد وثائق بجنسية مقدّم الطلب، لا أسر براءات، وخانتا الاتصالات والسحابة متداخلتان بالتصميم.',
      'يُستبعد رقم 25.8% المنسوب في Oxford Business Group إلى البراءات السعودية، لأنه حصة البرمجيات من تسجيلات حقوق المؤلف (SAIP 2024، ص35).',
      'رأي Price وAl Debasi معروض كما نقلته ESCWA، رأيًا لا بيانات؛ والمصادر من المستوى هـ خيوط لا يُستشهد بها.',
      'يحسب الإصدار التالي نوع المالك وفجوة المخترع/المالك (§8).',
    ],
    pull: 'الامتلاك لا الاستخدام.',
    pullNote: 'استنتاج',
  },
  sources: {
    heading: {ar: 'المصادر', en: 'Sources'},
    intro: 'فُتحت المصادر وقُرئت في أكتوبر 2026. حقوق النصوص الأصلية لأصحابها.',
    items: [
      {
        n: 1,
        name: 'WIPO، الملفات الإحصائية القُطرية 2024',
        links: [
          {label: 'السعودية', url: 'https://www.wipo.int/edocs/statistics-country-profile/en/sa.pdf'},
          {label: 'الإمارات', url: 'https://www.wipo.int/edocs/statistics-country-profile/en/ae.pdf'},
          {label: 'قطر', url: 'https://www.wipo.int/edocs/statistics-country-profile/en/qa.pdf'},
          {label: 'عُمان', url: 'https://www.wipo.int/edocs/statistics-country-profile/en/om.pdf'},
          {label: 'الكويت', url: 'https://www.wipo.int/edocs/statistics-country-profile/en/kw.pdf'},
          {label: 'البحرين', url: 'https://www.wipo.int/edocs/statistics-country-profile/en/bh.pdf'},
        ],
      },
      {n: 2, name: 'SAIP، التقرير الإحصائي 2024 (ص10–13)', url: 'https://www.saip.gov.sa/api/proxy-file?path=%2Fsites%2Fdefault%2Ffiles%2Fsaip_reports%2Fdocuments%2FAnnual-report-20.4.2025%20%281%29.pdf&action=view'},
      {n: 3, name: 'WIPO، إدراج مجموعة مكتب GCC في PATENTSCOPE (2024)', url: 'https://www.wipo.int/en/web/patentscope/w/news/2024/news_0002'},
      {n: 4, name: 'مكتب براءات مجلس التعاون، إعلان توقف قبول الطلبات', url: 'https://gccpo.org/AboutUsEn/ShowNews?id=66'},
      {n: 5, name: 'WIPO INSPIRE، بطاقة السعودية', url: 'https://inspire.wipo.int/index.php/system/files/juri/sa.pdf'},
      {n: 6, name: 'مكتب براءات مجلس التعاون، الجريدة الرسمية العدد 56', url: 'https://www.gccpo.org/Doc/PatentGazette/Gazette/Gazette-E/56.pdf'},
      {n: 7, name: 'ESCWA، Intellectual Property for Fostering Innovation in the Arab Region، E/ESCWA/TDD/2019/5 (2019/2020)، ص13', url: 'https://www.unescwa.org/sites/default/files/pubs/pdf/intellectual-property-innovation-arab-region-english_0.pdf'},
      {n: 8, name: 'Price, D. & Al Debasi, A. (2017/2018)، Protecting Intellectual Property in the Arabian Peninsula، Routledge (يُستشهد به عبر ESCWA)', url: 'https://doi.org/10.4324/9781315452975-1'},
      {n: 9, name: 'Abdulfasi, M. (2024)، Publications 12(4):47', url: 'https://doi.org/10.3390/publications12040047'},
      {n: 10, name: 'Abdul Fasi, M. (2024)، Journal of the Knowledge Economy 15(3):14486–14520', url: 'https://doi.org/10.1007/s13132-023-01663-5'},
      {n: 11, name: 'El-Ouahi, J. (2025)، ISSI 2025', url: 'https://doi.org/10.51408/issi2025_162'},
      {n: 12, name: 'RDIA، Economies of the Future (ملخص تنفيذي)', url: 'https://rdia.gov.sa/media/1zneaqf2/economies-of-the-future-rdi-national-priority-in-saudi-arabia-analytical-study_executive-summary.pdf'},
      {n: 13, name: 'Strategy&، Beyond bricks', url: 'https://www.strategyand.pwc.com/m1/en/reports/moving-beyond-bricks.pdf'},
      {n: 14, name: 'USPTO PTMT، Saudi Arabia Breakout by Organization 1969–2015', url: 'https://www.uspto.gov/web/offices/ac/ido/oeip/taf/stcasga/sax_stcorg.htm'},
      {n: 15, name: 'WIPO PATENTSCOPE، استعلامات يدوية بجنسية مقدّم الطلب (2026-10-24) — السجل في patentscope-manual-queries.md', url: 'https://patentscope.wipo.int'},
      {n: 16, name: 'SAIP، صفحة «تقرير واقع البراءات للمؤسسات السعودية في المكاتب الدولية» (نُشر 26.02.2024)', url: 'https://www.saip.gov.sa/ar/resources/ip-information/reports/db301817-d6bb-4555-9a91-a894dde0413f'},
    ],
  },
  closing: {
    heading: {ar: 'الخلاصة', en: 'The bottom line'},
    text: 'الامتلاك لا الاستخدام؛ عدد الطلبات المودعة في الدولة يقيس جاذبية السوق، وملكيتها تقيس القدرة.',
    strong: '[استنتاج]',
  },
  citation: 'Abdelalim, A. (2026). من يملك الابتكار الخليجي؟ خريطة ملكية البراءات (Version 1.0). VisionSeek Lab.',
};

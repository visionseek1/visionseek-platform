import type {Bi, Source} from '@/lib/korea-gate';

export type Mark = 'confirmed' | 'inference' | 'secondary';

export type DocBlock =
  | {kind: 'p'; text: Bi}
  | {kind: 'quote'; text: Bi}
  | {kind: 'facts'; rows: {label: Bi; value: Bi; mark: Mark; source?: Source}[]}
  | {kind: 'list'; items: {title?: Bi; text: Bi; mark?: Mark}[]}
  | {kind: 'note'; text: Bi};

export type DocumentBody = {
  slug: string;
  kind: 'study' | 'sample';
  title: Bi;
  lede: Bi;
  date: Bi;
  sources: number;
  badge?: Bi;
  sections: {id: string; title: Bi; blocks: DocBlock[]}[];
};

const role: DocBlock = {
  kind: 'note',
  text: {
    ar: 'بوابة كوريا تقف في صف المؤسسة العربية. لا نمثّل أي بائع كوري، ولا نتقاضى عمولة من الطرف الكوري. دورنا: تشخيص الاحتياج، ومطابقته مع ما في كوريا، ومتابعة النقل حتى تمتلك المؤسسة القدرة. الدراسة مجانية، وغرضها أن تنفع بذاتها.',
    en: 'Korea Gate stands with the Arab institution. We represent no Korean seller, and we take no commission from the Korean side. Our work is to diagnose the need, match it with what Korea actually holds, and follow the transfer until the institution owns the capability. The study is free, and it is meant to be useful on its own.',
  },
};

export const bodies: DocumentBody[] = [
  {
    slug: 'hospitals',
    kind: 'study',
    title: {ar: 'دراسة للمستشفيات العربية: حوكمة الذكاء الاصطناعي وملكية نظم المعلومات', en: 'A study for Arab hospitals: AI governance and ownership of information systems'},
    lede: {
      ar: 'دراسة عامة لنوع المؤسسة، بلا مستشفى مسمّى. أقوى قدرة تُمتلك: وحدة داخلية لتقييم الذكاء الاصطناعي وحوكمته.',
      en: 'A general study for this kind of institution, with no named hospital. The strongest capability to own: an internal unit that assesses and governs AI.',
    },
    date: {ar: '26 أكتوبر 2026', en: '26 October 2026'},
    sources: 11,
    sections: [
      {
        id: 'picture',
        title: {ar: 'الصورة الكبيرة', en: 'The picture'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'المستشفيات في الخليج ومصر تحت ضغطين في آن: توطين الكوادر، والتحول الرقمي والذكاء الاصطناعي. في السعودية بدأ تطبيق السعودة على مهن الأشعة والتغذية العلاجية والعلاج الطبيعي والمختبرات في أبريل 2025، ونسبة السعوديين في التمريض نحو 38% في 2026.',
              en: 'Hospitals in the Gulf and Egypt sit under two pressures at once: the localisation of staff, and the move to digital systems and AI. In Saudi Arabia, saudisation of radiology, clinical nutrition, physiotherapy and laboratory professions began in April 2025. Saudis were about 38% of the nursing workforce in 2026.',
            },
          },
          {
            kind: 'p',
            text: {
              ar: 'وكوريا سبق أن صدّرت نظام معلومات مستشفيات كاملًا إلى المنطقة: نظام BESTCare من مستشفى جامعة سيول الوطنية — بوندانغ يعمل في مستشفيات الشؤون الصحية بالحرس الوطني السعودي.',
              en: 'Korea has already exported a full hospital information system to the region: BESTCare, from Seoul National University Bundang Hospital, runs in the hospitals of the Saudi National Guard Health Affairs.',
            },
          },
        ],
      },
      {
        id: 'challenges',
        title: {ar: 'التحديات', en: 'The pressures'},
        blocks: [
          {
            kind: 'facts',
            rows: [
              {
                label: {ar: 'توطين مهن صحية', en: 'Localisation of health professions'},
                value: {ar: 'سعودة مهن محددة منذ أبريل 2025، ونسبة التمريض السعودي نحو 38% في 2026.', en: 'Saudisation of named professions from April 2025, and Saudi nurses at about 38% in 2026.'},
                mark: 'confirmed',
                source: {label: {ar: 'وزارة الصحة السعودية', en: 'Saudi Ministry of Health'}, href: 'https://www.moh.gov.sa/en/ministry/mediacenter/ads/pages/ads-2025-04-16-001.aspx'},
              },
              {
                label: {ar: 'حوكمة الذكاء الاصطناعي في أبوظبي', en: 'AI governance in Abu Dhabi'},
                value: {ar: 'سياسة دائرة الصحة ومعيار الذكاء الاصطناعي المسؤول (أكتوبر 2025) يشمل كل منشأة مرخّصة تشتري الذكاء الاصطناعي أو تشغّله.', en: 'The Department of Health policy and the Responsible AI Standard (October 2025) cover every licensed facility that buys or runs AI.'},
                mark: 'confirmed',
                source: {label: {ar: 'دائرة الصحة — أبوظبي', en: 'Department of Health — Abu Dhabi'}, href: 'https://www.doh.gov.ae/-/media/Feature/Resources/Standards/2025/Responsible-AI-Standard-V1.ashx'},
              },
              {
                label: {ar: 'حلول كورية معروضة في المنطقة', en: 'Korean tools already shown in the region'},
                value: {ar: 'سبع شركات ذكاء اصطناعي طبي كورية عُرضت في أبوظبي في 22 أكتوبر 2026، دون أن يعني العرض وجود قدرة تقييم مستقلة داخل المستشفى.', en: 'Seven Korean medical-AI firms were shown in Abu Dhabi on 22 October 2026. A showcase is not an independent assessment capability inside the hospital.'},
                mark: 'confirmed',
                source: {label: {ar: 'وام', en: 'WAM'}, href: 'https://www.wam.ae/en/article/c2us51d-seven-korean-companies-showcase-latest-healthcare'},
              },
            ],
          },
        ],
      },
      {
        id: 'korea',
        title: {ar: 'ما في كوريا', en: 'What Korea holds'},
        blocks: [
          {
            kind: 'list',
            items: [
              {
                title: {ar: 'نظام معلومات مستشفيات مُصدَّر', en: 'An exported hospital information system'},
                text: {ar: 'BESTCare مُطبّق في مستشفيات الحرس الوطني منذ 2016، ونسخة لاحقة تعاقدت عليها خدمات الهيئة الملكية في ينبع.', en: 'BESTCare has run in National Guard hospitals since 2016. A later edition was contracted by Royal Commission Health Services in Yanbu.'},
                mark: 'confirmed',
              },
              {
                title: {ar: 'قانون الذكاء الاصطناعي الأساسي', en: 'The Framework Act on AI'},
                text: {ar: 'سارٍ منذ 22 يناير 2026. الرعاية الصحية من مجالات «عالية التأثير»: إدارة مخاطر، وإشراف بشري، وحفظ مستندات.', en: 'In force since 22 January 2026. Health care is a high-impact domain: risk management, human oversight, and the keeping of records.'},
                mark: 'confirmed',
              },
              {
                title: {ar: 'إذن التسويق المحلي', en: 'A local marketing authorisation'},
                text: {ar: 'الأداة المقبولة في كوريا ليست مقبولة تلقائيًا في بلدك. الأدوات الطبية بالذكاء الاصطناعي في السعودية تحتاج إذن تسويق من الهيئة العامة للغذاء والدواء.', en: 'Acceptance in Korea is not acceptance in your country. Medical-AI tools in Saudi Arabia need a marketing authorisation from SFDA.'},
                mark: 'confirmed',
              },
            ],
          },
        ],
      },
      {
        id: 'own',
        title: {ar: 'قدرة تُمتلك', en: 'A capability to own'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'القدرة الأولى: وحدة داخل المستشفى تقيّم أدوات الذكاء الاصطناعي وتحكم استخدامها، وتعرف أي نظام معلومات يملك معرفته الفريق المحلي وأي نظام يبقى عند المورّد.',
              en: 'The first capability: a unit inside the hospital that assesses AI tools, governs their use, and knows which information-system know-how the local team owns and which remains with the vendor.',
            },
          },
        ],
      },
      {
        id: 'only',
        title: {ar: 'ما لن تجده إلا هنا', en: 'What you will not find elsewhere'},
        blocks: [
          {
            kind: 'list',
            items: [
              {
                text: {ar: 'القانون الكوري يُلزم مشغّل الذكاء الاصطناعي في الصحة بحفظ مستندات إدارة المخاطر خمس سنوات. يحق للمستشفى العربي أن يطلبها من المورّد.', en: 'Korean law requires a health-AI operator to keep risk-management records for five years. An Arab hospital may ask the supplier for them.'},
                mark: 'confirmed',
              },
              {
                text: {ar: 'المنتج الطبي الرقمي بنظام جودة بموجب قانون المنتجات الطبية الرقمية يُعدّ مستوفيًا لجزء من التزامات قانون الذكاء الاصطناعي.', en: 'A digital medical product with a quality system under the Digital Medical Products Act is treated as meeting part of the AI Act’s duties.'},
                mark: 'confirmed',
              },
            ],
          },
        ],
      },
      {
        id: 'step',
        title: {ar: 'الخطوة الأولى', en: 'The first step'},
        blocks: [
          {
            kind: 'quote',
            text: {
              ar: 'جرد الأدوات والأنظمة داخل المستشفى، وتسمية من يملك معرفة كل نظام.',
              en: 'An inventory of tools and systems inside the hospital, and a name for who owns the know-how of each system.',
            },
          },
        ],
      },
      {id: 'role', title: {ar: 'دور بوابة كوريا', en: 'The role of Korea Gate'}, blocks: [role]},
    ],
  },
  {
    slug: 'pharma',
    kind: 'study',
    title: {ar: 'دراسة لمصانع الدواء: من التعبئة إلى تشغيلٍ معقّم تمتلكه', en: 'A study for medicine manufacturers: from fill-and-finish to sterile operation you own'},
    lede: {
      ar: 'دراسة عامة لنوع المؤسسة، بلا مصنع مسمّى. أقوى قدرة تُمتلك: فريق تشغيل معقّم وضبط جودة للبيولوجي.',
      en: 'A general study for this kind of institution, with no named plant. The strongest capability to own: a sterile-operations and quality team for biologics.',
    },
    date: {ar: '26 أكتوبر 2026', en: '26 October 2026'},
    sources: 12,
    sections: [
      {
        id: 'picture',
        title: {ar: 'الصورة الكبيرة', en: 'The picture'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'الحكومات العربية الكبرى تدفع المصانع نحو التوطين، ولا سيما في البيولوجي واللقاحات. السعودية أطلقت الاستراتيجية الوطنية للتقنية الحيوية بمنصة تصنيع حيوي محلية. ومصر وضعت خطة لتوطين أكثر من نصف اللقاحات بحلول 2030.',
              en: 'The large Arab governments are pushing plants toward localisation, above all in biologics and vaccines. Saudi Arabia launched a national biotechnology strategy with a domestic biomanufacturing platform. Egypt set a plan to localise more than half of its vaccines by 2030.',
            },
          },
          {
            kind: 'p',
            text: {
              ar: 'العقدة ليست المبنى. منظمة الصحة العالمية تلاحظ أن أغلب مصنّعي المنطقة كانوا يستوردون المادة ويقتصرون على التعبئة والتغليف.',
              en: 'The knot is not the building. WHO notes that most manufacturers in the region imported the substance and stopped at fill-and-finish.',
            },
          },
        ],
      },
      {
        id: 'korea',
        title: {ar: 'ما في كوريا', en: 'What Korea holds'},
        blocks: [
          {
            kind: 'facts',
            rows: [
              {
                label: {ar: 'قانون التصنيع الحيوي بالتعاقد', en: 'The contract-biologics act'},
                value: {ar: 'القانون رقم 21297 صدر في 30 ديسمبر 2025 ويسري في 31 ديسمبر 2026. وينص على تسجيل «مصنّع للتصدير» وتعيين جهات لتدريب الكوادر.', en: 'Act no. 21297 was issued on 30 December 2025 and takes effect on 31 December 2026. It provides for the listing of an “export manufacturer” and for the designation of staff-training bodies.'},
                mark: 'confirmed',
                source: {label: {ar: 'law.go.kr', en: 'law.go.kr'}, href: 'https://law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010202&lsId=015006&lsRvsGubun=all'},
              },
              {
                label: {ar: 'هيئة الغذاء والدواء الكورية لدى منظمة الصحة العالمية', en: 'The Korean authority on the WHO list'},
                value: {ar: 'أُدرجت الهيئة منذ أكتوبر 2023، وتوسّع الإدراج في أغسطس 2025 ليشمل كل الوظائف التنظيمية للأدوية واللقاحات.', en: 'The authority has been listed since October 2023. The listing widened in August 2025 to every regulatory function for medicines and vaccines.'},
                mark: 'confirmed',
                source: {label: {ar: 'منظمة الصحة العالمية', en: 'World Health Organization'}, href: 'https://www.who.int/news/item/07-08-2025-who-designates-new-who-listed-authorities--strengthening-global-access-to-quality-assured-medical-products'},
              },
              {
                label: {ar: 'تدريب عملي في سونغدو', en: 'Practical training in Songdo'},
                value: {ar: 'برنامج Yonsei K-NIBRT ومركز التدريب العالمي للتصنيع الحيوي، بدعم المنظمة: أسبوع تشغيل معقّم وأسبوع ضبط جودة تحليلي، للعاملين في دول الدخل المتوسط الأدنى.', en: 'Yonsei K-NIBRT and the Global Bio Training Hub, with WHO support: a week of sterile operation and a week of analytical quality, for staff in lower-middle-income countries.'},
                mark: 'confirmed',
                source: {label: {ar: 'K-NIBRT', en: 'K-NIBRT'}, href: 'https://www.knibrt.com/fro_end_eng/html/dep_07/7200.php'},
              },
            ],
          },
        ],
      },
      {
        id: 'only',
        title: {ar: 'ما لن تجده إلا هنا', en: 'What you will not find elsewhere'},
        blocks: [
          {
            kind: 'list',
            items: [
              {
                text: {ar: 'دورات التدريب الكورية المدعومة ليست مفتوحة للجميع. تصنيف البنك الدولي للسنة المالية 2027 يضع مصر في «دخل متوسط أدنى» والسعودية والإمارات في «دخل مرتفع». مصانع مصر أقرب إلى الأهلية؛ ومصانع الخليج تحتاج مسارًا آخر.', en: 'Supported Korean training courses are not open to all. The World Bank classification for fiscal 2027 places Egypt in “lower middle income” and Saudi Arabia and the UAE in “high income”. Egyptian plants sit closer to eligibility; Gulf plants need another path.'},
                mark: 'confirmed',
              },
              {
                text: {ar: 'هيئة الدواء المصرية أضافت الهيئة الكورية إلى قائمة الدول المرجعية في 2024. والقائمة المحدّثة تسري في 1 يناير 2027 وتذكر كوريا بنطاق أدوية ولقاحات.', en: 'Egypt’s drug authority added the Korean authority to its reference-country list in 2024. The updated list takes effect on 1 January 2027 and names Korea for medicines and vaccines.'},
                mark: 'confirmed',
              },
              {
                text: {ar: 'مسار التحقق والمختصر السعودي للأدوية يقبل هيئات أمريكا وأوروبا فقط. الهيئة الكورية ليست من بينها.', en: 'Saudi Arabia’s verification and abridged path for medicines accepts only the American and European authorities. The Korean authority is not among them.'},
                mark: 'confirmed',
              },
              {
                text: {ar: 'عقود ترخيص حصرية قائمة في المنطقة تقيّد خيارات منتجات بعينها. مثال مؤكد: اتفاق Celltrion وHikma لستة منتجات بيوسيميلر في المنطقة.', en: 'Exclusive licence contracts already in the region constrain some product choices. A confirmed example: the Celltrion–Hikma agreement for six biosimilars in the region.'},
                mark: 'confirmed',
              },
            ],
          },
        ],
      },
      {
        id: 'step',
        title: {ar: 'الخطوة الأولى', en: 'The first step'},
        blocks: [
          {
            kind: 'quote',
            text: {
              ar: 'اختيار قدرة واحدة — تشغيل معقّم أو ضبط جودة — وترشيح ثلاثة إلى خمسة موظفين قبل دورة 2027.',
              en: 'Choose one capability — sterile operation or quality control — and name three to five staff before the 2027 intake.',
            },
          },
        ],
      },
      {id: 'role', title: {ar: 'دور بوابة كوريا', en: 'The role of Korea Gate'}, blocks: [role]},
    ],
  },
  {
    slug: 'regulators',
    kind: 'study',
    title: {ar: 'دراسة للهيئات التنظيمية: قراءة النص الكوري، لا ترجمته السطحية', en: 'A study for regulators: reading the Korean text, not a thin translation'},
    lede: {
      ar: 'دراسة عامة لنوع المؤسسة، بلا هيئة مسمّاة. أقوى قدرة تُمتلك: إطار عربي للذكاء الاصطناعي في الأجهزة الطبية، مبني على النص الكوري الأصلي.',
      en: 'A general study for this kind of institution, with no named authority. The strongest capability to own: an Arab frame for AI in medical devices, built on the original Korean text.',
    },
    date: {ar: '26 أكتوبر 2026', en: '26 October 2026'},
    sources: 10,
    sections: [
      {
        id: 'picture',
        title: {ar: 'الصورة الكبيرة', en: 'The picture'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'هيئة الدواء المصرية بلغت مستوى النضج الثالث لدى منظمة الصحة العالمية في اللقاحات ثم في الأدوية. وهيئة الغذاء والدواء الكورية جهة مدرجة لدى المنظمة، وتوسّع إدراجها في 2025 ليشمل كل الوظائف للأدوية واللقاحات.',
              en: 'Egypt’s drug authority reached WHO maturity level 3 for vaccines, then for medicines. The Korean authority is a WHO-listed authority; its listing widened in 2025 to every function for medicines and vaccines.',
            },
          },
        ],
      },
      {
        id: 'korea',
        title: {ar: 'ما في كوريا', en: 'What Korea holds'},
        blocks: [
          {
            kind: 'facts',
            rows: [
              {
                label: {ar: 'مسار مراجعة 240 يومًا', en: 'A 240-day review path'},
                value: {ar: 'بدأ في 1 يونيو 2026 للأدوية الجديدة والبيوسيميلر والأجهزة المبتكرة.', en: 'It began on 1 June 2026 for new medicines, biosimilars and innovative devices.'},
                mark: 'confirmed',
                source: {label: {ar: 'هيئة الغذاء والدواء الكورية', en: 'Korean Ministry of Food and Drug Safety'}, href: 'https://www.mfds.go.kr/eng/brd/m_61/view.do?seq=188'},
              },
              {
                label: {ar: 'قانون المنتجات الطبية الرقمية', en: 'The Digital Medical Products Act'},
                value: {ar: 'سرى في 24 يناير 2025، وبعض أحكامه في 24 يناير 2026.', en: 'It took effect on 24 January 2025, with some provisions on 24 January 2026.'},
                mark: 'confirmed',
                source: {label: {ar: 'KLRI', en: 'KLRI'}, href: 'https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=69563&key=36&type=part'},
              },
              {
                label: {ar: 'قانون التصنيع الحيوي بالتعاقد', en: 'The contract-biologics act'},
                value: {ar: 'يسري في 31 ديسمبر 2026.', en: 'It takes effect on 31 December 2026.'},
                mark: 'confirmed',
                source: {label: {ar: 'law.go.kr', en: 'law.go.kr'}, href: 'https://law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010202&lsId=015006&lsRvsGubun=all'},
              },
            ],
          },
        ],
      },
      {
        id: 'only',
        title: {ar: 'ما لن تجده إلا هنا', en: 'What you will not find elsewhere'},
        blocks: [
          {
            kind: 'list',
            items: [
              {
                text: {ar: 'التفاصيل التشغيلية — لوائح قانون التصنيع الحيوي بالتعاقد، ومقترحات الهيئة الكورية المفتوحة للتعليق — منشورة بالكورية. التغطية الإنجليزية جزئية، والعربية لم نجدها.', en: 'The operating detail — the decrees under the contract-biologics act, and the Korean authority’s open proposals — is published in Korean. English coverage is partial. We have not found an Arabic text.'},
                mark: 'inference',
              },
              {
                text: {ar: 'رغم إدراج الهيئة الكورية الكامل لدى المنظمة في 2025، مسار التحقق والمختصر السعودي للأدوية يقبل هيئات أمريكا وأوروبا فقط.', en: 'Even with the Korean authority’s full WHO listing in 2025, Saudi Arabia’s verification and abridged path for medicines accepts only the American and European authorities.'},
                mark: 'confirmed',
              },
              {
                text: {ar: 'مصر أدرجت الهيئة الكورية مرجعًا منذ قائمة 2024، مع شرط تقييم الحاجة. والقائمة الجديدة تسري في 1 يناير 2027 مربوطة بوظائف الإدراج لدى المنظمة.', en: 'Egypt listed the Korean authority as a reference from the 2024 list, with a need-assessment condition. The new list takes effect on 1 January 2027, tied to the functions of the WHO listing.'},
                mark: 'confirmed',
              },
            ],
          },
        ],
      },
      {
        id: 'step',
        title: {ar: 'الخطوة الأولى', en: 'The first step'},
        blocks: [
          {
            kind: 'quote',
            text: {
              ar: 'اختيار ملف تنظيمي واحد قائم، فنعد مقارنة عربية مفصّلة بين وضع الهيئة والنص الكوري الأصلي.',
              en: 'Choose one live regulatory file. We prepare a close Arabic comparison between the authority’s position and the original Korean text.',
            },
          },
        ],
      },
      {id: 'role', title: {ar: 'دور بوابة كوريا', en: 'The role of Korea Gate'}, blocks: [role]},
    ],
  },
  {
    slug: 'universities',
    kind: 'study',
    title: {ar: 'دراسة لكليات الصيدلة والطب: مقرر ومختبر على نمط التدريب الكوري', en: 'A study for pharmacy and medicine colleges: a course and a lab on the Korean training pattern'},
    lede: {
      ar: 'دراسة عامة لنوع المؤسسة، بلا جامعة مسمّاة. أقوى قدرة تُمتلك: مقرر ومختبر تدريب في التصنيع الحيوي وGMP باسم الكلية.',
      en: 'A general study for this kind of institution, with no named university. The strongest capability to own: a course and a training lab in biomanufacturing and GMP, in the college’s name.',
    },
    date: {ar: '26 أكتوبر 2026', en: '26 October 2026'},
    sources: 7,
    sections: [
      {
        id: 'picture',
        title: {ar: 'الصورة الكبيرة', en: 'The picture'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'خطط توطين الدواء والبيولوجي تحتاج خرّيجين مدرَّبين على التصنيع الحيوي وضبط الجودة والتنظيم الرقمي. كوريا بنت منظومة تدريب صناعي-أكاديمي للتصنيع الحيوي في سونغدو، وقانون التصنيع بالتعاقد ينص على تعيين جهات لتدريب الكوادر بشروط قاعات ومختبرات ومناهج.',
              en: 'Plans to localise medicine and biologics need graduates trained in biomanufacturing, quality and digital regulation. Korea built an industrial-academic training system for biomanufacturing in Songdo. The contract-manufacturing act provides for the designation of training bodies, with conditions on rooms, laboratories and curricula.',
            },
          },
        ],
      },
      {
        id: 'korea',
        title: {ar: 'ما في كوريا', en: 'What Korea holds'},
        blocks: [
          {
            kind: 'list',
            items: [
              {
                title: {ar: 'تدريب عملي بدعم المنظمة', en: 'Practical training with WHO support'},
                text: {ar: 'Yonsei K-NIBRT ومركز التدريب العالمي: تشغيل معقّم وضبط جودة تحليلي لدول الدخل المتوسط الأدنى.', en: 'Yonsei K-NIBRT and the Global Bio Training Hub: sterile operation and analytical quality for lower-middle-income countries.'},
                mark: 'confirmed',
              },
              {
                title: {ar: 'جهات تدريب الكوادر في القانون الجديد', en: 'Staff-training bodies in the new act'},
                text: {ar: 'يسري في 31 ديسمبر 2026، ويعيّن جهات تدريب بشروط منشورة.', en: 'It takes effect on 31 December 2026 and designates training bodies under published conditions.'},
                mark: 'confirmed',
              },
              {
                title: {ar: 'أولوية الذكاء الاصطناعي في مصر', en: 'AI as a national priority in Egypt'},
                text: {ar: 'الاستراتيجية المصرية 2025–2030 تضع الذكاء الاصطناعي أولوية وطنية. مواكبة المناهج استنتاج منّا.', en: 'Egypt’s 2025–2030 strategy sets AI as a national priority. That curricula must follow is our inference.'},
                mark: 'confirmed',
              },
            ],
          },
        ],
      },
      {
        id: 'own',
        title: {ar: 'قدرات تُمتلك', en: 'Capabilities to own'},
        blocks: [
          {
            kind: 'list',
            items: [
              {text: {ar: 'مقرر أو دبلومة في التصنيع الحيوي وGMP باسم الكلية، بعد مقارنة المنهج القائم بمكونات البرامج الكورية وتدريب أعضاء هيئة التدريس.', en: 'A course or a diploma in biomanufacturing and GMP in the college’s name, after the current syllabus is compared with the Korean programmes and faculty are trained as trainers.'}},
              {text: {ar: 'مختبر تدريب شبه صناعي تديره الكلية. نحن لا نورد معدات.', en: 'A near-industrial training laboratory run by the college. We do not supply equipment.'}},
              {text: {ar: 'مقرر حوكمة للذكاء الاصطناعي الطبي: محتوى مقارن بالعربية بين كوريا والسعودية وأبوظبي ومصر.', en: 'A course on the governance of medical AI: an Arabic comparison of Korea, Saudi Arabia, Abu Dhabi and Egypt.'}},
            ],
          },
        ],
      },
      {
        id: 'only',
        title: {ar: 'ما لن تجده إلا هنا', en: 'What you will not find elsewhere'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'شروط جهات تدريب الكوادر في لوائح قانون التصنيع بالتعاقد منشورة بالكورية، وهي عمليًا مواصفات مختبر تدريبي يمكن للكلية العربية أن تستلهمها. والأهلية الخفية باقية: الدخل الوطني يقرر من يدخل الدورة المدعومة.',
              en: 'The conditions for staff-training bodies in the decrees of the contract-manufacturing act are published in Korean. In practice they are a specification for a training laboratory that an Arab college can draw on. The hidden condition remains: national income decides who enters a supported course.',
            },
          },
        ],
      },
      {
        id: 'step',
        title: {ar: 'الخطوة الأولى', en: 'The first step'},
        blocks: [
          {
            kind: 'quote',
            text: {
              ar: 'إرسال توصيف مقرر واحد قائم في التكنولوجيا الحيوية أو الصيدلة الصناعية، فنرد بمقارنة نقاط الفجوة مع البرامج الكورية.',
              en: 'Send the outline of one existing course in biotechnology or industrial pharmacy. We return a comparison of the gaps with the Korean programmes.',
            },
          },
        ],
      },
      {id: 'role', title: {ar: 'دور بوابة كوريا', en: 'The role of Korea Gate'}, blocks: [role]},
    ],
  },
  {
    slug: 'medical-ai',
    kind: 'study',
    title: {ar: 'دراسة لوحدات الذكاء الاصطناعي الطبي: الملف التنظيمي قدرة، لا المنتج وحده', en: 'A study for medical-AI units: the regulatory file is the capability, not the product alone'},
    lede: {
      ar: 'دراسة عامة لنوع المؤسسة، بلا جهة مسمّاة. أقوى قدرة تُمتلك: ملف تنظيمي جاهز لعدة أسواق.',
      en: 'A general study for this kind of institution, with no named organisation. The strongest capability to own: a regulatory file ready for several markets.',
    },
    date: {ar: '26 أكتوبر 2026', en: '26 October 2026'},
    sources: 9,
    sections: [
      {
        id: 'picture',
        title: {ar: 'الصورة الكبيرة', en: 'The picture'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'الذكاء الاصطناعي الطبي يتحرك في المنطقة، والتنظيم يلحق به: إرشاد الهيئة السعودية للأجهزة بالذكاء الاصطناعي، ومعيار أبوظبي للذكاء الاصطناعي المسؤول في أكتوبر 2025، واستراتيجية مصر 2025–2030 التي تضع الصحة ضمن الأولويات.',
              en: 'Medical AI is moving in the region, and regulation is following: the Saudi guidance on AI devices, Abu Dhabi’s Responsible AI Standard of October 2025, and Egypt’s 2025–2030 strategy, which places health among its priorities.',
            },
          },
          {
            kind: 'p',
            text: {
              ar: 'كوريا جمعت قانونًا عامًا للذكاء الاصطناعي — سارٍ منذ 22 يناير 2026، والصحة مجال عالي التأثير — وقانونًا خاصًا للمنتجات الطبية الرقمية. وشركات كورية تعمل فعلًا في الخليج.',
              en: 'Korea has joined a general AI act — in force since 22 January 2026, with health a high-impact domain — to a specific act on digital medical products. Korean firms already operate in the Gulf.',
            },
          },
        ],
      },
      {
        id: 'korea',
        title: {ar: 'ما في كوريا', en: 'What Korea holds'},
        blocks: [
          {
            kind: 'facts',
            rows: [
              {
                label: {ar: 'حفظ المستندات خمس سنوات', en: 'Records kept for five years'},
                value: {ar: 'اللائحة تُلزم مشغّل المجال عالي التأثير بإدارة مخاطر وإشراف بشري وحفظ مستندات خمس سنوات.', en: 'The decree requires a high-impact operator to manage risk, keep a human in oversight, and retain records for five years.'},
                mark: 'confirmed',
                source: {label: {ar: 'law.go.kr — المادة 27', en: 'law.go.kr — article 27'}, href: 'https://www.law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=198083'},
              },
              {
                label: {ar: 'التوافق بين القانونين', en: 'How the two acts meet'},
                value: {ar: 'المنتج الطبي الرقمي بنظام جودة يُعدّ مستوفيًا لجزء من التزامات قانون الذكاء الاصطناعي.', en: 'A digital medical product with a quality system is treated as meeting part of the AI Act’s duties.'},
                mark: 'confirmed',
                source: {label: {ar: 'law.go.kr', en: 'law.go.kr'}, href: 'https://www.law.go.kr/LSW/flDownload.do?bylClsCd=110201&flSeq=161163591&gubun='},
              },
              {
                label: {ar: 'تأكيد «عالي التأثير»', en: 'Confirmation of “high impact”'},
                value: {ar: 'وزارة العلوم وتقنية المعلومات تؤكد التصنيف خلال ثلاثين يومًا، قابلة للتمديد مرة.', en: 'The science ministry confirms the classification within thirty days, extendable once.'},
                mark: 'confirmed',
                source: {label: {ar: 'وزارة العلوم وتقنية المعلومات', en: 'Ministry of Science and ICT'}, href: 'https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&nttSeqNo=1191'},
              },
            ],
          },
        ],
      },
      {
        id: 'own',
        title: {ar: 'قدرات تُمتلك', en: 'Capabilities to own'},
        blocks: [
          {
            kind: 'list',
            items: [
              {text: {ar: 'ملف تنظيمي يجمع متطلبات السعودية وأبوظبي وكوريا في مصفوفة واحدة باسم الجهة.', en: 'A regulatory file that gathers the requirements of Saudi Arabia, Abu Dhabi and Korea in one matrix, in the organisation’s name.'}},
              {text: {ar: 'نظام إدارة مخاطر وإشراف بشري على هيكل المستندات المطلوب كوريًا، يطبّق داخل الجهة.', en: 'A risk-management and human-oversight system on the Korean record structure, applied inside the organisation.'}},
              {text: {ar: 'منهجية تقييم سريري ولغوي للعربية تجريها الجهة بنفسها.', en: 'A clinical and linguistic evaluation method for Arabic, run by the organisation itself.'}},
            ],
          },
        ],
      },
      {
        id: 'only',
        title: {ar: 'ما لن تجده إلا هنا', en: 'What you will not find elsewhere'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'جدول التوافق بين قانون الذكاء الاصطناعي وقانون المنتجات الطبية الرقمية منشور في ملحق بالكورية. وهو يبيّن أي التزامات تسقط عن المنتج إذا قام نظام الجودة. والقبول في كوريا لا يغني عن إذن التسويق السعودي وفق إرشاد الأجهزة بالذكاء الاصطناعي.',
              en: 'The concordance table between the AI Act and the Digital Medical Products Act is published as a Korean schedule. It shows which duties fall away when the quality system is in place. Acceptance in Korea does not replace a Saudi marketing authorisation under the AI-devices guidance.',
            },
          },
        ],
      },
      {
        id: 'step',
        title: {ar: 'الخطوة الأولى', en: 'The first step'},
        blocks: [
          {
            kind: 'quote',
            text: {
              ar: 'اختيار منتج واحد، فنعد مصفوفة متطلبات تجمع السعودية وأبوظبي وكوريا في صفحة واحدة.',
              en: 'Choose one product. We prepare a one-page matrix of requirements across Saudi Arabia, Abu Dhabi and Korea.',
            },
          },
        ],
      },
      {id: 'role', title: {ar: 'دور بوابة كوريا', en: 'The role of Korea Gate'}, blocks: [role]},
    ],
  },
  {
    slug: 'gate-memo',
    kind: 'sample',
    title: {ar: 'مذكرة الطريق — الصحة والدواء', en: 'Gate Memo — health and medicine'},
    lede: {
      ar: 'مثالٌ توضيحي على قالب المذكرة. لا يخصّ عميلًا حقيقيًا. المؤسسة افتراضية: مصنع دواء عربي متوسط يريد أن يمتلك قدرة تشغيل معقّم للبيولوجي.',
      en: 'An illustrative example on the memo template. It does not belong to a real client. The institution is hypothetical: a mid-size Arab medicine plant that wants to own sterile operation for biologics.',
    },
    date: {ar: '26 أكتوبر 2026', en: '26 October 2026'},
    sources: 4,
    badge: {ar: 'مثالٌ توضيحي، لا يخصّ عميلًا حقيقيًا', en: 'An illustrative example. It does not belong to a real client.'},
    sections: [
      {
        id: 'need',
        title: {ar: '1. الاحتياج', en: '1. The need'},
        blocks: [
          {
            kind: 'p',
            text: {
              ar: 'المصنع — في هذا المثال — يصنّع أقراصًا وحقنًا صغيرة الجزيئات، ويستورد بيولوجيًا جاهزًا، وليس لديه خبرة تشغيل معقّم للبيولوجي ولا تحليل جودة له. الهدف المعلن للمجلس: امتلاك قدرة التعبئة المعقّمة وضبط الجودة خلال ثلاث سنوات، لا عقد توريد.',
              en: 'The plant — in this example — makes small-molecule tablets and injectables, imports finished biologics, and has no sterile-operations or quality analytics for biologics. The board’s stated aim: to own sterile fill-and-finish and quality control within three years, not a supply contract.',
            },
          },
        ],
      },
      {
        id: 'options',
        title: {ar: '2. خيارات كورية', en: '2. Korean options'},
        blocks: [
          {
            kind: 'facts',
            rows: [
              {
                label: {ar: 'Celltrion — شركة بيوسيميلر', en: 'Celltrion — a biosimilar firm'},
                value: {ar: 'اتفاق ترخيص حصري مع Hikma لستة منتجات في المنطقة (أكتوبر 2025). النموذج القائم توريد وترخيص. سؤال المذكرة: هل تبقى مساحة لنقل خطوة تصنيع؟', en: 'An exclusive licence with Hikma for six products in the region (October 2025). The standing model is supply and licence. The memo’s question: is there still room to transfer a manufacturing step?'},
                mark: 'confirmed',
                source: {label: {ar: 'Hikma', en: 'Hikma'}, href: 'https://www.hikma.com/news/hikma-and-celltrion-strengthen-partnership-to-expand-biosimilar-access-in-mena/'},
              },
              {
                label: {ar: 'Yonsei K-NIBRT — تدريب', en: 'Yonsei K-NIBRT — training'},
                value: {ar: 'برنامج 2026 فيه أسبوع تشغيل معقّم وأسبوع ضبط جودة. الأهلية: عاملون في التصنيع الحيوي بدول الدخل المتوسط الأدنى. تقديم 2026 أُغلق في 28 أغسطس.', en: 'The 2026 programme held a week of sterile operation and a week of quality analytics. Eligibility: staff in biomanufacturing in lower-middle-income countries. The 2026 intake closed on 28 August.'},
                mark: 'confirmed',
                source: {label: {ar: 'K-NIBRT', en: 'K-NIBRT'}, href: 'https://www.knibrt.com/fro_end_eng/html/dep_07/7200.php'},
              },
              {
                label: {ar: 'هيئة الغذاء والدواء الكورية — منظِّم', en: 'Korean Ministry of Food and Drug Safety — the regulator'},
                value: {ar: 'مسار مراجعة مستهدف 240 يومًا بدأ في 1 يونيو 2026. يفيد المصنع معيارًا مرجعيًا، لا شريك تصنيع.', en: 'A 240-day target review path began on 1 June 2026. It serves the plant as a reference standard, not as a manufacturing partner.'},
                mark: 'confirmed',
                source: {label: {ar: 'MFDS', en: 'MFDS'}, href: 'https://www.mfds.go.kr/eng/brd/m_61/view.do?seq=188'},
              },
            ],
          },
        ],
      },
      {
        id: 'path',
        title: {ar: '3. مسار الامتلاك', en: '3. The ownership path'},
        blocks: [
          {
            kind: 'list',
            items: [
              {title: {ar: 'تشخيص', en: 'Diagnosis'}, text: {ar: 'فجوة القدرة: المعدات، والأفراد، ونظام الجودة، والتنظيم المحلي. علامة النجاح: موافقة المجلس على نطاق واحد.', en: 'The capability gap: equipment, people, the quality system, local regulation. Success: the board agrees one scope.'}},
              {title: {ar: 'مطابقة', en: 'Matching'}, text: {ar: 'قائمة قصيرة بجهات كورية وأسئلة لكل جهة. علامة النجاح: جهتان تدخلان نقاشًا فنيًا. التواصل مع الطرف الكوري لا يتم إلا بقرار المؤسس.', en: 'A short list of Korean parties and questions for each. Success: two parties enter a technical discussion. Outreach to the Korean side happens only on the founder’s decision.'}},
              {title: {ar: 'نقل', en: 'Transfer'}, text: {ar: 'تدريب فريق المصنع، وإجراءات مكتوبة باسم المصنع، ودفعة تجريبية. علامة النجاح: الفريق المحلي يشغّل دون الطرف الكوري.', en: 'The plant’s team is trained, procedures are written in the plant’s name, and a trial batch is run. Success: the local team operates without the Korean side.'}},
              {title: {ar: 'امتلاك', en: 'Ownership'}, text: {ar: 'ملف قدرة باسم المؤسسة وتقييم مستقل للنتيجة.', en: 'A capability file in the institution’s name, and an independent reading of the result.'}},
            ],
          },
        ],
      },
      {
        id: 'risks',
        title: {ar: '4. المخاطر', en: '4. Risks'},
        blocks: [
          {
            kind: 'list',
            items: [
              {text: {ar: 'الشريك الكوري يفضّل أن يبيع لا أن ينقل. يُحدَّد بند النقل شرطًا قبل أي نقاش.', en: 'The Korean counterpart may prefer to sell rather than transfer. The transfer clause is set as a condition before any discussion.'}, mark: 'inference'},
              {text: {ar: 'أهلية التدريب قد لا تنطبق على بلد المؤسسة. تُراجع شروط كل دفعة قبل أي وعد.', en: 'Training eligibility may not apply to the institution’s country. Each intake’s terms are read before any undertaking.'}, mark: 'inference'},
              {text: {ar: 'عقود حصرية قائمة — كاتفاق Celltrion وHikma — تقيّد منتجات بعينها. يُراجع نطاق الحصرية قبل اقتراح منتج.', en: 'Standing exclusive contracts — such as Celltrion–Hikma — constrain some products. The scope of exclusivity is read before a product is proposed.'}, mark: 'confirmed'},
            ],
          },
        ],
      },
      {
        id: 'next',
        title: {ar: '5. الخطوة التالية', en: '5. The next step'},
        blocks: [
          {
            kind: 'quote',
            text: {
              ar: 'المجلس يحدّد: هل «التشغيل المعقّم للبيولوجي» هو النطاق؟ إن كان كذلك، تُعدّ قائمة الأسئلة للجهات الكورية. حدود المذكرة: VisionSeek ليست وكيلًا لأي طرف كوري ولا تتقاضى منه عمولة. والمذكرة ليست مشورة استثمارية ولا قانونية.',
              en: 'The board decides: is sterile biologics operation the scope? If it is, the question list for Korean parties is prepared. Limits of the memo: VisionSeek is agent to no Korean party and takes no commission from one. The memo is neither investment advice nor legal advice.',
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'radar',
    kind: 'sample',
    title: {ar: 'ذكاء كوريا — العدد 1، أكتوبر 2026', en: 'Korea Intelligence — issue 1, October 2026'},
    lede: {
      ar: 'أخبار الصحة والدواء، ومعها الرادار التنظيمي. كل بند بمصدره ووسمه. العدد يُقرأ مجانًا.',
      en: 'Health and medicine news, with the regulatory radar. Every item carries its source and its mark. The issue is free to read.',
    },
    date: {ar: 'أكتوبر 2026', en: 'October 2026'},
    sources: 8,
    sections: [
      {
        id: 'news',
        title: {ar: 'الأخبار', en: 'The news'},
        blocks: [
          {
            kind: 'facts',
            rows: [
              {
                label: {ar: 'قانون الذكاء الاصطناعي ولائحته', en: 'The AI Act and its decree'},
                value: {ar: 'ساريان منذ 22 يناير 2026. الرعاية الصحية مجال عالي التأثير. المشغّل يدير المخاطر ويُبقي إشرافًا بشريًا ويحفظ المستندات خمس سنوات.', en: 'In force since 22 January 2026. Health care is high-impact. The operator manages risk, keeps human oversight, and retains records for five years.'},
                mark: 'confirmed',
                source: {label: {ar: 'وزارة العلوم وتقنية المعلومات', en: 'Ministry of Science and ICT'}, href: 'https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&mId=4&mPid=2&nttSeqNo=1214&sCode=eng'},
              },
              {
                label: {ar: 'التوافق مع قانون المنتجات الطبية الرقمية', en: 'Concordance with the Digital Medical Products Act'},
                value: {ar: 'المنتج الطبي الرقمي بنظام جودة يُعدّ مستوفيًا لجزء من التزامات قانون الذكاء الاصطناعي. السريان 24 يناير 2026.', en: 'A digital medical product with a quality system is treated as meeting part of the AI Act’s duties. Effect: 24 January 2026.'},
                mark: 'confirmed',
                source: {label: {ar: 'law.go.kr', en: 'law.go.kr'}, href: 'https://www.law.go.kr/LSW/flDownload.do?bylClsCd=110201&flSeq=161163591&gubun='},
              },
              {
                label: {ar: 'مسار 240 يومًا', en: 'The 240-day path'},
                value: {ar: 'بدأ في 1 يونيو 2026 للأدوية الجديدة والبيوسيميلر والأجهزة المبتكرة.', en: 'It began on 1 June 2026 for new medicines, biosimilars and innovative devices.'},
                mark: 'confirmed',
                source: {label: {ar: 'MFDS — 28 مايو 2026', en: 'MFDS — 28 May 2026'}, href: 'https://www.mfds.go.kr/eng/brd/m_61/view.do?seq=188'},
              },
              {
                label: {ar: 'Medical Korea في أبوظبي', en: 'Medical Korea in Abu Dhabi'},
                value: {ar: 'في 22 أكتوبر 2026 عُرضت سبع شركات ذكاء اصطناعي طبي كورية في أبوظبي.', en: 'On 22 October 2026 seven Korean medical-AI firms were shown in Abu Dhabi.'},
                mark: 'confirmed',
                source: {label: {ar: 'وام', en: 'WAM'}, href: 'https://www.wam.ae/en/article/c2us51d-seven-korean-companies-showcase-latest-healthcare'},
              },
              {
                label: {ar: 'تدريب التصنيع الحيوي', en: 'Biomanufacturing training'},
                value: {ar: 'الجزء العملي من برنامج 2026 عُقد في سونغدو من 2 إلى 27 نوفمبر. التقديم أُغلق في 28 أغسطس. الدورة التالية تُراجع عند إعلانها.', en: 'The practical part of the 2026 programme ran in Songdo from 2 to 27 November. Applications closed on 28 August. The next intake is read when it is announced.'},
                mark: 'confirmed',
                source: {label: {ar: 'K-NIBRT', en: 'K-NIBRT'}, href: 'https://www.knibrt.com/fro_end_eng/html/dep_07/7200.php'},
              },
            ],
          },
        ],
      },
      {
        id: 'radar',
        title: {ar: 'الرادار التنظيمي', en: 'The regulatory radar'},
        blocks: [
          {
            kind: 'facts',
            rows: [
              {
                label: {ar: 'قانون التصنيع الحيوي بالتعاقد', en: 'The contract-biologics act'},
                value: {ar: 'سريان 31 ديسمبر 2026.', en: 'Takes effect on 31 December 2026.'},
                mark: 'confirmed',
                source: {label: {ar: 'law.go.kr', en: 'law.go.kr'}, href: 'https://law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010202&lsId=015006&lsRvsGubun=all'},
              },
              {
                label: {ar: 'تعديل مقترح لسلامة الأدوية', en: 'A proposed amendment on drug safety'},
                value: {ar: 'منع إعلانات مولّدة بالذكاء الاصطناعي توحي بتوصية طبيب أو صيدلي، بسريان مقترح في 27 نوفمبر 2026. البند مقترح، وليس نهائيًا.', en: 'A ban on AI-generated advertisements that imply a doctor’s or a pharmacist’s recommendation, with a proposed effect of 27 November 2026. The item is a proposal, not a final rule.'},
                mark: 'secondary',
                source: {label: {ar: 'MFDS — ملف التعليق', en: 'MFDS — the comment file'}, href: 'https://www.mfds.go.kr/brd/m_209/down.do?brd_id=data0009&data_tp=A&file_seq=1&seq=44293'},
              },
              {
                label: {ar: 'تأكيد «عالي التأثير»', en: 'Confirmation of “high impact”'},
                value: {ar: 'خلال ثلاثين يومًا، قابلة للتمديد مرة. سارٍ.', en: 'Within thirty days, extendable once. In force.'},
                mark: 'confirmed',
                source: {label: {ar: 'وزارة العلوم وتقنية المعلومات', en: 'Ministry of Science and ICT'}, href: 'https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&nttSeqNo=1191'},
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'capability-map',
    kind: 'sample',
    title: {ar: 'خريطة القدرات — الصحة والدواء، النسخة 1', en: 'Capability map — health and medicine, version 1'},
    lede: {
      ar: 'مقتطف. جهات كورية حقيقية، وكل سطر برابط. الخريطة ليست ترتيبًا ولا توصية. تقديرات الملاءمة وإمكانية الامتلاك استنتاج، ولذلك لا تُعرض هنا.',
      en: 'An excerpt. Real Korean parties, each row with a link. The map is not a ranking and not a recommendation. Judgements of fit and of transferability are inferences, so they are not shown here.',
    },
    date: {ar: '26 أكتوبر 2026', en: '26 October 2026'},
    sources: 6,
    sections: [
      {
        id: 'map',
        title: {ar: 'جهات مؤكدة', en: 'Confirmed parties'},
        blocks: [
          {
            kind: 'facts',
            rows: [
              {
                label: {ar: 'بيوسيميلر — Celltrion', en: 'Biosimilars — Celltrion'},
                value: {ar: 'اتفاق ترخيص حصري مع Hikma لستة منتجات في المنطقة، في 6 أكتوبر 2025.', en: 'An exclusive licence with Hikma for six products in the region, dated 6 October 2025.'},
                mark: 'confirmed',
                source: {label: {ar: 'Hikma', en: 'Hikma'}, href: 'https://www.hikma.com/news/hikma-and-celltrion-strengthen-partnership-to-expand-biosimilar-access-in-mena/'},
              },
              {
                label: {ar: 'تدريب التصنيع الحيوي — Yonsei K-NIBRT', en: 'Biomanufacturing training — Yonsei K-NIBRT'},
                value: {ar: 'برنامج عملي بدعم منظمة الصحة العالمية في سونغدو.', en: 'A practical programme in Songdo, with WHO support.'},
                mark: 'confirmed',
                source: {label: {ar: 'K-NIBRT', en: 'K-NIBRT'}, href: 'https://www.knibrt.com/fro_end_eng/html/dep_07/7200.php'},
              },
              {
                label: {ar: 'تنظيم الدواء والأجهزة — هيئة الغذاء والدواء الكورية', en: 'Medicine and device regulation — MFDS'},
                value: {ar: 'مسار مراجعة 240 يومًا للأدوية الجديدة والبيوسيميلر والأجهزة المبتكرة.', en: 'A 240-day review path for new medicines, biosimilars and innovative devices.'},
                mark: 'confirmed',
                source: {label: {ar: 'MFDS', en: 'MFDS'}, href: 'https://www.mfds.go.kr/eng/brd/m_61/view.do?seq=188'},
              },
              {
                label: {ar: 'ذكاء اصطناعي للأشعة — حضور خليجي', en: 'Radiology AI — a Gulf presence'},
                value: {ar: 'سبع شركات كورية، منها Lunit وVUNO، عُرضت في Medical Korea أبوظبي في 22 أكتوبر 2026.', en: 'Seven Korean firms, among them Lunit and VUNO, were shown at Medical Korea Abu Dhabi on 22 October 2026.'},
                mark: 'confirmed',
                source: {label: {ar: 'وام', en: 'WAM'}, href: 'https://www.wam.ae/en/article/c2us51d-seven-korean-companies-showcase-latest-healthcare'},
              },
              {
                label: {ar: 'إطار حوكمة الذكاء الاصطناعي الطبي', en: 'A frame for governing medical AI'},
                value: {ar: 'قانون الذكاء الاصطناعي الأساسي وقانون المنتجات الطبية الرقمية. مرجع للجهات العربية التي تكتب لوائحها.', en: 'The Framework Act on AI and the Digital Medical Products Act. A reference for Arab authorities writing their own rules.'},
                mark: 'confirmed',
                source: {label: {ar: 'وزارة العلوم وتقنية المعلومات', en: 'Ministry of Science and ICT'}, href: 'https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&mId=4&mPid=2&nttSeqNo=1214&sCode=eng'},
              },
            ],
          },
        ],
      },
    ],
  },
];

export function bodyBySlug(kind: 'study' | 'sample', slug: string): DocumentBody | undefined {
  return bodies.find(b => b.kind === kind && b.slug === slug);
}

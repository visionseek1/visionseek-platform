export type Locale = 'ar' | 'en';
type Text = Record<Locale, string>;
const t = (ar: string, en: string): Text => ({ar, en});
export type Project = {
  id: string; slug: string; kind: 'supply' | 'fleet'; stage: Text; region: Text;
  title: Text; summary: Text; question: Text; idea: Text; significance: Text;
  vision: Text; beneficiary: Text; promise: Text;
  possibilities: {title: Text; text: Text}[];
  sources: {title: Text; publisher: string; date: string; url: string; note: Text}[];
};

// Public portfolio content only. Delivery plans and commercial targeting do not belong here.
export const projects: Project[] = [
  {
    id: 'VS-E01', slug: 'egypt-lng-supply', kind: 'supply',
    stage: t('فكرة قيد الاستكشاف', 'Concept under exploration'),
    region: t('مصر', 'Egypt'),
    title: t('أمن إمدادات الغاز المسال في مصر', 'Floating LNG supply security in Egypt'),
    summary: t('تصور لمنظومة تربط قدرات التغييز العائمة باحتياجات الشبكة، وتفتح خيارات أوسع أمام تأمين إمدادات الطاقة.', 'A concept connecting floating regasification capacity to grid needs, opening more possibilities for resilient energy supply.'),
    question: t('ماذا لو امتلكت منظومة الإمداد خيارات أوسع حين تتغير احتياجاتها؟', 'What if a supply system had more options when its needs change?'),
    idea: t('نستكشف كيف يمكن ربط وحدات التخزين والتغييز العائمة والموانئ والخبرات العالمية في منظومة تمنح المؤسسات مرونة أكبر في تأمين الغاز. يبدأ التصور من مصر، حيث تلتقي البنية البحرية باحتياجات الكهرباء والصناعة.', 'We are exploring how floating storage and regasification units, ports and global expertise could connect into a system that gives institutions greater supply flexibility. The concept starts with Egypt, where maritime infrastructure meets electricity and industrial demand.'),
    significance: t('أمن الطاقة يرتبط بقدرة المنظومة على الاستجابة لتغيّر الطلب ومصادر الإمداد. التكامل بين الميناء والوحدة العائمة والشبكة يفتح مجالًا للنظر إلى هذه الأصول كقدرة واحدة.', 'Energy security depends on a system’s ability to respond to changing demand and supply. Connecting the port, floating unit and grid creates an opportunity to consider these assets as one capability.'),
    vision: t('ننظر إلى مصر بوصفها نقطة انطلاق لفكرة أوسع: وصل احتياجات الطاقة بالقدرات البحرية والتقنية المتاحة عالميًا، ومنها الخبرات الكورية، لبناء خيارات تناسب المؤسسة وظروفها.', 'Egypt is the starting point for a wider idea: connecting energy needs with global maritime and technical capabilities, including Korean expertise, to create options suited to each institution and its context.'),
    beneficiary: t('منظومات الطاقة ومؤسسات استيراد الغاز والبنية التحتية.', 'Energy systems, gas import institutions and infrastructure organizations.'),
    promise: t('مرونة أكبر من البحر إلى الشبكة.', 'Greater flexibility from vessel to grid.'),
    possibilities: [
      {title:t('استجابة لتغيّر الاحتياج', 'Respond to changing needs'),text:t('استكشاف كيف يمكن لقدرات التغييز العائمة أن تدعم مرونة الإمداد عبر ظروف مختلفة.', 'Explore how floating regasification capacity could support supply flexibility across different conditions.')},
      {title:t('تكامل الأصول', 'Connected assets'),text:t('النظر إلى السفينة والميناء والشبكة والعلاقات التشغيلية كأجزاء من قدرة مترابطة.', 'Consider the vessel, port, grid and operating relationships as parts of a connected capability.')},
      {title:t('خيارات عالمية أقرب', 'Global possibilities, within reach'),text:t('ربط الاحتياج المحلي بالخبرات والتقنيات والقدرات البحرية الموجودة حول العالم.', 'Connect local needs to existing global expertise, technology and maritime capabilities.')},
    ],
    sources: [
      {publisher:'وزارة البترول والثروة المعدنية المصرية',date:'2026-06-12',url:'https://www.petroleum.gov.eg/ar-eg/media-center/news/news-pages/Pages/mop_12062026_01.aspx',title:t('منظومة استيراد الغاز والتغييز في مصر', 'Egypt’s LNG import and regasification system'),note:t('بيان رسمي يصف دور وحدات التغييز في السخنة ودمياط في دعم إمدادات الغاز.', 'An official release describes the supply role of regasification units at Ain Sokhna and Damietta.')},
      {publisher:'Höegh Evi',date:'2025-05-12',url:'https://hoeghevi.com/hoegh-evi-signs-fsru-charter-with-egas-supporting-egypts-role-as-energy-hub-in-the-middle-east/',title:t('تحويل ناقلة إلى قدرة استيراد عائمة', 'Converting a carrier into floating import capacity'),note:t('أعلنت الشركة عقد غاندريا مع إيجاس وتحويلها إلى وحدة تغييز، مع نشر مخطط في الربع الأخير من 2026. الموعد المذكور خطة معلنة، وليس تأكيدًا للتسليم.', 'The company announced the Gandria charter with EGAS and conversion to an FSRU, with deployment planned for Q4 2026. That date is an announced plan, not confirmation of delivery.')},
    ],
  },
  {
    id:'VS-E02',slug:'gulf-lng-fleet',kind:'fleet',
    stage:t('تصور مستقبلي', 'Future concept'),region:t('الخليج', 'Gulf region'),
    title:t('كفاءة ومرونة أساطيل الغاز المسال', 'LNG fleet efficiency and resilience'),
    summary:t('تصور لربط السفن والتقنيات والخبرات داخل أساطيل الغاز، حتى تتحول قوة الأصول إلى قدرة تشغيلية أكثر ترابطًا.', 'A concept connecting vessels, technologies and expertise across LNG fleets, turning the strength of individual assets into a more connected operating capability.'),
    question:t('ماذا يمكن أن يحقق الأسطول عندما تتصل قدراته؟', 'What could a fleet achieve when its capabilities connect?'),
    idea:t('نستكشف كيف يمكن للأساطيل التي تجمع سفنًا وتقنيات من مصادر مختلفة أن تستفيد من المعرفة والتكامل بينها. التركيز على العلاقة بين الأصول والفرق والموردين، وما قد تفتحه من فرص للأداء والمرونة.', 'We are exploring how fleets with vessels and technologies from different sources could benefit from shared knowledge and integration. The focus is on connections between assets, teams and suppliers, and the opportunities they may open for performance and resilience.'),
    significance:t('كل سفينة تحمل قدرات وخبرات مختلفة. الفكرة أن ننظر إلى ما يستطيع الأسطول تحقيقه ككل، وكيف تصل المعرفة المناسبة إلى الأشخاص والقرارات التي تحتاجها.', 'Every vessel brings different capabilities and expertise. The idea is to consider what the fleet could achieve as a whole, and how the right knowledge can reach the people and decisions that need it.'),
    vision:t('نرى فرصة لربط احتياجات المؤسسات الخليجية بخبرات الصناعة البحرية العالمية، ومنها كوريا، واستكشاف قدرات تتجاوز حدود كل أصل منفرد. هذا تصور مستقبلي ضمن اهتمامنا بالطاقة والنقل البحري.', 'We see an opportunity to connect Gulf institutions’ needs with global maritime expertise, including Korea, and explore capabilities beyond any single asset. This is a future concept within our energy and maritime interests.'),
    beneficiary:t('ملاك ومشغلو أساطيل الغاز ومؤسسات النقل البحري للطاقة.', 'Gas fleet owners, operators and maritime energy organizations.'),
    promise:t('أصول متعددة. قدرة أكثر ترابطًا.', 'Multiple assets. A more connected capability.'),
    possibilities:[
      {title:t('معرفة تتصل', 'Connected knowledge'),text:t('استكشاف ما تتيحه مشاركة الخبرة بين السفن والفرق والتقنيات المختلفة.', 'Explore what shared expertise could make possible across vessels, teams and technologies.')},
      {title:t('نظرة للأسطول كله', 'A fleet-wide perspective'),text:t('فهم العلاقات بين جاهزية الأصول ومتطلبات التشغيل وأولويات المؤسسة.', 'Understand the relationships between asset readiness, operating needs and institutional priorities.')},
      {title:t('استعداد للمستقبل', 'Readiness for what comes next'),text:t('متابعة ما تفتحه التطورات البحرية والتقنية من خيارات للأساطيل القائمة والجديدة.', 'Explore the options that maritime and technological advances open for existing and new fleets.')},
    ],
    sources:[
      {publisher:'ADNOC Logistics & Services',date:'2026-04-27',url:'https://adnocls.ae/en/news-and-media/press-releases/2026/al-taweelah-delivery-of-sixth-next-generation-lng-carrier',title:t('توسع أساطيل الغاز عبر قدرات عالمية', 'LNG fleet expansion through global capabilities'),note:t('أعلنت أدنوك للإمداد والخدمات استلام ناقلة سادسة من جيانغنان، وأشارت إلى طلبات بناء في كوريا. يوضح الخبر السياق الصناعي؛ ولا يثبت وجود فجوة تشغيلية.', 'ADNOC L&S reported a sixth Jiangnan delivery and referenced Korean newbuild orders. This illustrates the industrial context; it does not establish an operating gap.')},
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find(project => project.slug === slug);
export const projectPath = (slug: string, locale: Locale) => `${locale === 'ar' ? '/ar' : ''}/projects/${slug}`;
export const projectInquiry = (project: Project, locale: Locale) => `${locale === 'ar' ? '/ar' : ''}/start?${new URLSearchParams({from:'projects', idea:`${project.id} — ${project.title[locale]}`})}`;

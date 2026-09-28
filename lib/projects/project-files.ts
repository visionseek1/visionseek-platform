import type {Text} from './index';
const t=(ar:string,en:string):Text=>({ar,en});
export type ProjectMilestone={id:string;title:Text;description:Text;state:'current'|'planned'|'completed';evidenceUrl?:string};
export type ProjectUpdate={id:string;date:string;kind:'scope'|'research'|'partnership'|'test'|'delivery';title:Text;body:Text;visibility:'draft'|'public';evidenceUrl?:string};
export type ProjectFile={
 version:string;updatedAt:string;stage:Text;stageNote:Text;challenge:Text;role:Text;engagement:Text;
 workstreams:{id:string;title:Text;body:Text}[];
 deliverables:{title:Text;body:Text}[];
 partnerNeeds:Text[];milestones:ProjectMilestone[];updates:ProjectUpdate[];
};
/** Public project dossiers. Internal tasks/client details never belong in this catalog. */
export const projectFiles:Record<string,ProjectFile>={
 'VS-P07':{
  version:'0.2',updatedAt:'2026-09-28',stage:t('تحديد نطاق المشروع','Project scoping'),
  stageNote:t('ملف أولي لمناقشة التكليف مع جهة مستوردة. لم يُعلن بعد عن عميل أو وحدة متعاقد عليها أو تشغيل ميداني.', 'An initial project file for discussing a mandate with an importing institution. No client, contracted unit or field operation has been announced.'),
  challenge:t('تحتاج المؤسسة إلى إمداد غاز يمكن الاعتماد عليه، وإلى قرار واضح بشأن الوحدة العائمة والميناء ونموذج التشغيل. المشروع يربط هذه القرارات في مسار واحد يناسب احتياج الشبكة وأولويات المؤسسة.', 'An institution needs dependable gas supply and a coherent decision on the floating unit, port and operating model. This project connects those decisions around grid needs and institutional priorities.'),
  role:t('نطوّر تصور المشروع مع المؤسسة، ونربط الاحتياج بالخيارات التقنية والتشغيلية، ونحدد الخبرات والشركاء اللازمين. يتوسع دور التنفيذ وفق النطاق المتفق عليه ومع الجهات المتخصصة في الوحدات والموانئ والشبكات.', 'We develop the project proposition with the institution, connect its needs to technical and operating options, and identify the expertise and partners required. Delivery responsibilities expand under an agreed scope with specialists in floating units, ports and grids.'),
  engagement:t('تكليف أول لتطوير نموذج الإمداد وملف القرار. يحدد مع المؤسسة البدائل التي تستحق التطوير، والمخرجات المطلوبة للانتقال إلى التفاوض أو التصميم التفصيلي أو التنفيذ مع الشركاء.', 'An initial mandate to develop the supply model and decision package. With the institution, it identifies which alternatives merit development and what is needed to proceed to negotiation, detailed design or delivery with partners.'),
  workstreams:[
   {id:'supply-model',title:t('نموذج الإمداد','Supply model'),body:t('دراسة بدائل الاستئجار وتحويل ناقلة والامتلاك والتشغيل في ضوء احتياج المؤسسة.', 'Assess charter, carrier conversion and ownership/operation options against institutional needs.')},
   {id:'grid-interface',title:t('الوحدة والميناء والشبكة','Unit, port and grid'),body:t('تحديد المتطلبات والواجهات التي ينبغي أن تعمل معًا ليصل الغاز إلى الشبكة.', 'Define the requirements and interfaces that must work together to supply the grid.')},
   {id:'delivery-partners',title:t('منظومة الشركاء','Delivery partners'),body:t('تحديد الأدوار المطلوبة من ملاك الوحدات والمشغلين والخبراء وشركاء الصناعة.', 'Define the roles required from unit owners, operators, specialists and industry partners.')},
   {id:'operating-readiness',title:t('الجاهزية للتنفيذ','Delivery readiness'),body:t('ربط كل بديل بما يحتاجه من بيانات وتحقق واتفاقات قبل الانتقال إلى التنفيذ.', 'Connect each option to the data, validation and agreements needed before delivery.')},
  ],
  deliverables:[
   {title:t('ملف قرار الإمداد','Supply decision package'),body:t('مقارنة للبدائل وافتراضاتها ومتطلباتها والمفاضلات التي تحتاج المؤسسة إلى حسمها.', 'An options comparison with assumptions, requirements and the trade-offs the institution must resolve.')},
   {title:t('تصور المنظومة المطلوبة','System proposition'),body:t('خريطة أولية تربط الوحدة والميناء والشبكة والتشغيل وتوضح ما يحتاج دراسة متخصصة.', 'An initial map of the unit, port, grid and operations, identifying where specialist studies are needed.')},
   {title:t('مسار تطوير قابل للتكليف','A commissionable development scope'),body:t('مخرجات المرحلة التالية وأدوار الشركاء ومتطلبات الانتقال إليها، لتحديد نطاق اتفاق منفصل.', 'Next-stage outputs, partner roles and prerequisites that can form a separately agreed delivery scope.')},
  ],
  partnerNeeds:[t('مؤسسة مستوردة أو جهة مسؤولة عن أمن إمداد الغاز.', 'An importing institution or organization responsible for gas supply security.'),t('ملاك وحدات عائمة ومشغلون وخبراء موانئ وشبكات.', 'Floating-unit owners, operators, port specialists and grid experts.'),t('شركاء هندسة وتحويل وصيانة بحسب النموذج المختار.', 'Engineering, conversion and maintenance partners appropriate to the chosen model.')],
  milestones:[
   {id:'define',state:'current',title:t('تحديد النطاق المؤسسي','Define the institutional scope'),description:t('تحديد الجهة واحتياج الإمداد وحدود التكليف والمخرجات المتفق عليها.', 'Identify the institution, supply need, mandate boundaries and agreed deliverables.')},
   {id:'compare',state:'planned',title:t('تطوير الخيارات','Develop the options'),description:t('تحليل البدائل ومتطلبات المنظومة بالبيانات المتاحة والمعتمدة.', 'Develop alternatives and system requirements using available, agreed data.')},
   {id:'align',state:'planned',title:t('تكوين مسار التنفيذ','Assemble the delivery path'),description:t('تحديد الشركاء ومسؤولياتهم والتحقق المطلوب قبل الالتزام.', 'Identify partners, responsibilities and validation required before commitment.')},
   {id:'deliver',state:'planned',title:t('تنفيذ النطاق المتفق عليه','Deliver the agreed scope'),description:t('الانتقال إلى التنفيذ والمتابعة بعد اتفاق المؤسسة والشركاء.', 'Proceed to delivery and monitoring after agreement with the institution and partners.')},
  ],
  updates:[{id:'p07-scope-v02',date:'2026-09-28',kind:'scope',visibility:'public',title:t('إصدار ملف المشروع ونطاق التعاون','Project profile and engagement scope issued'),body:t('تحدد هذه النسخة غرض المشروع ومسارات العمل ومخرجات التكليف الأول وأدوار الشركاء المطلوبة. هذا تحديث لملف المشروع؛ لا يمثل بدء تشغيل أو تعاقدًا مع عميل.', 'This revision defines the project purpose, workstreams, initial engagement outputs and required partner roles. It is a project-profile update, not an operating launch or a client contract.'),evidenceUrl:'#scope'}],
 },
 'VS-P08':{
  version:'0.2',updatedAt:'2026-09-28',stage:t('تحديد نطاق المشروع','Project scoping'),
  stageNote:t('مسار تطوير مقترح لمناقشته مع مالك أسطول وشركاء تقنية. لا يوجد معيار بديل أثبتته VisionSeek أو ترخيص حصلت عليه حتى الآن.', 'A proposed development path for discussion with a fleet owner and technology partners. VisionSeek has not yet proven an alternative standard or obtained a technology licence.'),
  challenge:t('يريد مالك الأسطول مساحة أكبر للاختيار في تقنية احتواء الغاز وحقوق استخدامها. المشروع يدرس كيف تتحول احتياجات الأسطول إلى مسار تفاوض وترخيص، أو إلى مشروع لتأهيل بديل تقني وإثباته.', 'A fleet owner wants greater choice in LNG containment technology and usage rights. This project examines how fleet requirements can support a licensing negotiation or a program to qualify and prove a technical alternative.'),
  role:t('نصمم المشروع حول احتياج مالك الأسطول، ونجمع مسار التقنية والترخيص والإثبات وشركاء الصناعة. يتولى المطورون والجهات المتخصصة أعمال التصميم والاختبار والتقييم ضمن مسؤوليات واتفاقات محددة.', 'We shape the project around the fleet owner’s needs, connecting technology, licensing, validation and industry partners. Developers and specialist organizations undertake design, testing and assessment under defined responsibilities and agreements.'),
  engagement:t('تكليف أول لتطوير خيارات الاحتواء على مستوى الأسطول، وتحديد جدوى مسار الترخيص أو تأهيل البديل، وما يتطلبه كل منهما قبل إطلاق مشروع إثبات مستقل.', 'An initial mandate to develop fleet-level containment options and examine the viability and prerequisites of licensing or qualifying an alternative before commissioning a separate validation project.'),
  workstreams:[
   {id:'fleet-needs',title:t('متطلبات الأسطول','Fleet requirements'),body:t('صياغة الاحتياج التقني والتشغيلي الذي ستُقيّم الخيارات على أساسه.', 'Define the technical and operating needs against which options will be assessed.')},
   {id:'technology-options',title:t('التقنية وحقوق استخدامها','Technology and usage rights'),body:t('تحديد الخيارات التي يمكن تقييمها ومتطلبات الوصول إلى حقوق استخدامها وتطويرها.', 'Identify assessable options and the requirements for accessing usage and development rights.')},
   {id:'qualification',title:t('الإثبات والتأهيل','Validation and qualification'),body:t('تصميم مسار التحقق الفني والتصنيف المطلوب مع الجهات المختصة قبل الاستخدام.', 'Develop the technical validation and classification path with relevant specialists before use.')},
   {id:'industrial-coalition',title:t('الشراكة الصناعية','Industrial partnership'),body:t('ربط مالك الأسطول بمطور التقنية والحوض والخبرات اللازمة لمسار التطوير.', 'Connect the fleet owner, technology developer, shipyard and expertise needed for development.')},
  ],
  deliverables:[
   {title:t('ملف خيارات الأسطول','Fleet options dossier'),body:t('احتياج الأسطول والخيارات المحتملة وحدود المعرفة والحقوق التي تحتاج تحققًا.', 'Fleet needs, potential options, knowledge gaps and rights that require verification.')},
   {title:t('تصور الترخيص أو التأهيل','Licensing or qualification proposition'),body:t('تحديد ما يمكن التفاوض عليه وما يحتاج تطويرًا وإثباتًا قبل اعتباره خيارًا عمليًا.', 'Define what can be negotiated and what needs development and proof before becoming a practical option.')},
   {title:t('نطاق مشروع الإثبات','Validation project scope'),body:t('الأطراف والمخرجات وأدلة القبول المطلوبة لتكليف مرحلة تطوير لاحقة عند ملاءمتها.', 'Participants, deliverables and acceptance evidence for a separately commissioned development stage, where appropriate.')},
  ],
  partnerNeeds:[t('مالك أسطول يرغب في تطوير خياراته التقنية والترخيصية.', 'A fleet owner seeking to develop technology and licensing options.'),t('مطورو تقنيات احتواء الغاز وأصحاب حقوقها.', 'LNG containment technology developers and rights holders.'),t('أحواض بناء سفن وجهات تصنيف وخبراء اختبار وتقييم.', 'Shipyards, classification bodies, testing specialists and assessors.')],
  milestones:[
   {id:'define',state:'current',title:t('تحديد احتياج الأسطول','Define the fleet need'),description:t('بلورة المتطلبات وحدود المشروع مع مالك أسطول محتمل.', 'Frame requirements and project boundaries with a prospective fleet owner.')},
   {id:'map',state:'planned',title:t('تقييم الخيارات والحقوق','Assess options and rights'),description:t('تقييم الخيارات المتاحة وشروط الوصول إلى التقنية والمعرفة اللازمة.', 'Assess options and access requirements for technology and know-how.')},
   {id:'qualify',state:'planned',title:t('تكوين مشروع الإثبات','Shape the validation project'),description:t('تحديد الشركاء ومسار الاختبار والتقييم ومعايير القبول.', 'Identify partners, testing and assessment paths, and acceptance criteria.')},
   {id:'prove',state:'planned',title:t('إثبات النطاق المتفق عليه','Validate the agreed scope'),description:t('تنفيذ الإثبات عند اعتماد نطاقه وتمويله وشراكاته؛ ثم تقييم الانتقال إلى الاستخدام.', 'Run validation once scope, funding and partnerships are agreed, then assess transition to use.')},
  ],
  updates:[{id:'p08-scope-v02',date:'2026-09-28',kind:'scope',visibility:'public',title:t('إصدار ملف المشروع ومسار التأهيل المقترح','Project profile and proposed qualification path issued'),body:t('تحدد هذه النسخة العلاقة بين متطلبات الأسطول والترخيص وتأهيل التقنية والشراكة الصناعية، والمخرجات التي يمكن مناقشة تكليفها. لا تتضمن نتائج اختبار أو موافقات أو حقوق تقنية حصلت عليها VisionSeek.', 'This revision connects fleet requirements, licensing, technology qualification and industrial partnership, and defines outputs that can be discussed for commissioning. It does not report tests, approvals or technology rights obtained by VisionSeek.'),evidenceUrl:'#scope'}],
 },
};
export const projectFileById=(id:string)=>projectFiles[id];
export const publicProjectUpdates=(file:ProjectFile)=>file.updates.filter(update=>update.visibility==='public').sort((a,b)=>b.date.localeCompare(a.date));

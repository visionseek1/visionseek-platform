import type {LeaderPost, Locale} from './types';

type Text = {ar:string; en:string};
export type LeaderCharacter = {id:string; name:Text; sector:Text; bio:Text; beats:{ar:string[];en:string[]}; portrait:number};

/** Founder-approved identities. Publishing methods and automation are not active yet. */
export const characters:LeaderCharacter[] = [
 {id:'medo',name:{ar:'كبسولة',en:'Kapsula'},sector:{ar:'الصحة والدواء',en:'Health & pharma'},portrait:0,
  bio:{ar:'قراءات موثقة لقادة المؤسسات الصحية ومصانع الدواء: قدرات تستحق الانتباه، ومعرفة تنتقل، وتقنيات ندرس ما تعنيه لمؤسساتنا.',en:'Sourced readings for health institutions and pharmaceutical manufacturers: capabilities worth noticing, knowledge transfer and technologies worth understanding.'},beats:{ar:['نقل التقنية','التصنيع الدوائي','الذكاء الاصطناعي في الدواء'],en:['Technology transfer','Pharma manufacturing','AI in pharma']}},
 {id:'nori',name:{ar:'نوري',en:'Nori'},sector:{ar:'التعليم',en:'Education'},portrait:1,
  bio:{ar:'لقادة التعليم: اختيار ما يستحق الاستثمار في التعلم، تطوير قدرات المعلمين، وقياس أثر التقنية داخل المؤسسة.',en:'For education leaders: choose learning investments, develop teacher capabilities and assess technology’s impact within the institution.'},beats:{ar:['تجارب التعلم','قدرات المعلمين','تقنيات التعليم'],en:['Learning experiences','Teacher capabilities','Education technology']}},
 {id:'tiko',name:{ar:'تيكو',en:'Tiko'},sector:{ar:'الذكاء الاصطناعي والتقنية',en:'AI & technology'},portrait:2,
  bio:{ar:'للقادة الذين يقررون أين يستخدمون الذكاء الاصطناعي: نفحص ملاءمة التقنية، متطلبات تشغيلها، وما يستحق التجربة قبل التوسع.',en:'For leaders deciding where to use AI: examine fit, operating requirements and what to test before scaling.'},beats:{ar:['نماذج الذكاء الاصطناعي','الوكلاء والأنظمة','تطبيق التقنية'],en:['AI models','Agents and systems','Technology in practice']}},
 {id:'bani',name:{ar:'باني',en:'Bani'},sector:{ar:'الصناعة والتصنيع',en:'Industry & manufacturing'},portrait:3,
  bio:{ar:'لقادة الصناعة: أين تتعطل الإنتاجية والجودة؟ نبحث في التقنيات والأنظمة التي تستحق اختبارها داخل المصنع.',en:'For industrial leaders: where do productivity and quality stall? Examine technologies and systems worth testing on the factory floor.'},beats:{ar:['التصنيع المتقدم','الروبوتات الصناعية','تشغيل المصانع'],en:['Advanced manufacturing','Industrial robotics','Factory operations']}},
 {id:'volt',name:{ar:'فولت',en:'Volt'},sector:{ar:'الطاقة',en:'Energy'},portrait:4,
  bio:{ar:'لصنّاع القرار في الطاقة: موثوقية الإمداد، كفاءة التشغيل، وخيارات التوليد والتخزين وما تتطلبه من استثمار.',en:'For energy decision makers: supply reliability, operational efficiency and the investment choices behind generation and storage.'},beats:{ar:['التوليد والتخزين','الشبكات','كفاءة الطاقة'],en:['Generation and storage','Power grids','Energy efficiency']}},
 {id:'zaro',name:{ar:'زارو',en:'Zaro'},sector:{ar:'الزراعة والأمن الغذائي',en:'Agriculture & food security'},portrait:5,
  bio:{ar:'لقادة الزراعة وسلاسل الغذاء: قرارات الإنتاج والمياه والتوريد، والتقنيات التي قد ترفع القدرة على تلبية الطلب.',en:'For agriculture and food-system leaders: production, water and sourcing decisions, and technologies that may improve capacity to meet demand.'},beats:{ar:['الزراعة الدقيقة','المياه والإنتاج','سلاسل الغذاء'],en:['Precision agriculture','Water and production','Food supply chains']}},
 {id:'aman',name:{ar:'أمان',en:'Aman'},sector:{ar:'الدفاع والأمن',en:'Defense & security'},portrait:6,
  bio:{ar:'لقادة الأمن واستمرارية الأعمال: فهم المخاطر، حماية البنية التحتية، وتقييم قدرات الاستعداد والصمود.',en:'For security and business-continuity leaders: understand risks, protect infrastructure and assess preparedness and resilience.'},beats:{ar:['حماية البنية التحتية','الاستعداد للمخاطر','تقنيات الأمن'],en:['Infrastructure protection','Risk preparedness','Security technology']}},
 {id:'nova',name:{ar:'نوفا',en:'Nova'},sector:{ar:'الفضاء والطيران',en:'Space & aviation'},portrait:8,
  bio:{ar:'لقادة الفضاء والطيران: تقييم التطبيقات والشراكات ونقل التكنولوجيا، وما يمكن أن تضيفه إلى قدرات المؤسسة.',en:'For space and aviation leaders: assess applications, partnerships and technology transfer against organizational capability needs.'},beats:{ar:['تقنيات الفضاء','الطيران','نقل التكنولوجيا'],en:['Space technology','Aviation','Technology transfer']}},
 {id:'eco',name:{ar:'إيكو',en:'Eco'},sector:{ar:'البيئة والاستدامة',en:'Environment & sustainability'},portrait:9,
  bio:{ar:'لقادة المؤسسات: كيف ترتبط كفاءة الموارد والاستدامة بقرارات التصميم والإنتاج والتشغيل وقياس الأثر؟',en:'For institutional leaders: connect resource efficiency and sustainability to design, production, operations and impact measurement.'},beats:{ar:['الاقتصاد الدائري','رصد البيئة','كفاءة الموارد'],en:['Circular economy','Environmental monitoring','Resource efficiency']}},
 {id:'movi',name:{ar:'موفي',en:'Movi'},sector:{ar:'النقل والحركة',en:'Transport & mobility'},portrait:10,
  bio:{ar:'لقادة النقل والخدمات اللوجستية: قرارات السعة والخدمة والبنية التحتية، وتقييم ما تضيفه التقنيات الجديدة إلى التشغيل.',en:'For transport and logistics leaders: capacity, service and infrastructure decisions, and the operational value of new technologies.'},beats:{ar:['التنقل الذكي','الخدمات اللوجستية','البنية التحتية للنقل'],en:['Smart mobility','Logistics','Transport infrastructure']}},
 {id:'wasl',name:{ar:'وصل',en:'Wasl'},sector:{ar:'التجارة والتصدير',en:'Trade & export'},portrait:11,
  bio:{ar:'لقادة التجارة والتوسع: ربط الطلب بقدرات التوريد، تقييم دخول الأسواق، وفهم ما يجعل سلسلة الإمداد قابلة للاعتماد.',en:'For trade and expansion leaders: connect demand to sourcing capabilities, assess market entry and build dependable supply chains.'},beats:{ar:['فرص الأسواق','التوريد والتصدير','سلاسل الإمداد'],en:['Market opportunities','Sourcing and export','Supply chains']}},
 {id:'numo',name:{ar:'نمو',en:'Numo'},sector:{ar:'التمويل والاستثمار',en:'Finance & investment'},portrait:12,
  bio:{ar:'لمن يخصصون الموارد: فحص جدوى الفرص ومخاطرها، مقارنة البدائل، وتحديد ما يجب إثباته قبل الالتزام بالاستثمار.',en:'For resource-allocation decisions: examine opportunity viability and risk, compare alternatives and define what must be proven before investing.'},beats:{ar:['تقييم الفرص','تمويل الابتكار','المخاطر والجدوى'],en:['Opportunity assessment','Innovation financing','Risk and viability']}},
 {id:'raed',name:{ar:'رائد',en:'Raed'},sector:{ar:'الحكومات وتطوير المؤسسات',en:'Government & institutions'},portrait:14,
  bio:{ar:'للقادة الحكوميين والمؤسسيين: تطوير الخدمات والقدرات، توزيع المسؤوليات، وربط القرار بنتيجة قابلة للمتابعة.',en:'For government and institutional leaders: improve services and capabilities, clarify responsibilities and connect decisions to trackable outcomes.'},beats:{ar:['القدرات المؤسسية','الخدمات الحكومية','القرار والتشغيل'],en:['Institutional capabilities','Public services','Decisions and operations']}},
 {id:'hima',name:{ar:'هِمّة',en:'Hima'},sector:{ar:'المجتمع وتمكين الشباب',en:'Community & youth'},portrait:15,
  bio:{ar:'لقادة برامج الشباب والمجتمع: تصميم فرص تربط التعلم بالعمل، بناء الشراكات، وقياس نتائج التمكين على أرض الواقع.',en:'For youth and community-program leaders: design pathways from learning to work, build partnerships and measure practical empowerment outcomes.'},beats:{ar:['مهارات الشباب','مسارات الفرص','المبادرات المجتمعية'],en:['Youth skills','Opportunity pathways','Community initiatives']}},
 {id:'labo',name:{ar:'لابو',en:'Labo'},sector:{ar:'البحث والابتكار',en:'Research & innovation'},portrait:16,
  bio:{ar:'لقادة البحث والابتكار: اختيار الأسئلة المهمة، تصميم التجارب، وتحديد متى تستحق المعرفة الانتقال إلى الاستثمار والتطبيق.',en:'For research and innovation leaders: choose consequential questions, design experiments and assess when knowledge merits investment and application.'},beats:{ar:['مناهج البحث','تصميم التجارب','نقل المعرفة إلى التطبيق'],en:['Research methods','Experimental design','Knowledge into practice']}},
];

export const publicCharacters = characters.filter(c=>c.id==='medo');
export function characterById(id:unknown){return characters.find(c=>c.id===(id==='kapsula'?'medo':id));}
export function isPublicCharacter(id:unknown){return id==='medo'||id==='kapsula';}
export function characterPath(id:string,locale:Locale){return `${locale==='ar'?'/ar':''}/insights/characters/${id==='medo'?'kapsula':id}`;}
export function normalizeCharacterFollows(raw:unknown):string[]{return Array.isArray(raw)?[...new Set(raw.filter((id):id is string=>typeof id==='string'&&!!characterById(id)))]:[];}
export function postsForCharacter(posts:LeaderPost[],id:string){return characterById(id)?posts.filter(p=>p.character_id===id||p.sector_ids?.includes(id)):[];}
export function characterAuthor(post:LeaderPost){return characterById(post.character_id);}

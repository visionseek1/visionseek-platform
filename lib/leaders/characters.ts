import type {LeaderPost, Locale} from './types';

type Text = {ar:string; en:string};
export type LeaderCharacter = {id:string; name:Text; sector:Text; bio:Text; beats:{ar:string[];en:string[]}; portrait:number};

/** Founder-approved identities. Publishing methods and automation are not active yet. */
export const characters:LeaderCharacter[] = [
 {id:'medo',name:{ar:'ميدو',en:'Medo'},sector:{ar:'الصحة',en:'Health'},portrait:0,
  bio:{ar:'من المختبر إلى الرعاية: أفكار وتقنيات تساعدنا على فهم ما يمكن أن يتغير في الصحة.',en:'From the lab to care: ideas and technologies shaping what health could become.'},beats:{ar:['تقنيات الرعاية','البحث الطبي','تطوير المؤسسات الصحية'],en:['Care technology','Medical research','Health institutions']}},
 {id:'nori',name:{ar:'نوري',en:'Nori'},sector:{ar:'التعليم',en:'Education'},portrait:1,
  bio:{ar:'كيف نتعلم أفضل، وكيف نعطي المعلم والمؤسسة التعليمية قدرات جديدة؟ هنا مساحة هذا السؤال.',en:'How can we learn better and give teachers and institutions new capabilities? This is the place to explore.'},beats:{ar:['تجارب التعلم','قدرات المعلمين','تقنيات التعليم'],en:['Learning experiences','Teacher capabilities','Education technology']}},
 {id:'tiko',name:{ar:'تيكو',en:'Tiko'},sector:{ar:'الذكاء الاصطناعي والتقنية',en:'AI & technology'},portrait:2,
  bio:{ar:'نتجاوز أسماء الأدوات إلى ما تستطيع فعله: أي تقنية تستحق التجربة، وأين تصنع فرقًا؟',en:'Beyond tool names: what can a technology do, where does it matter, and what is worth testing?'},beats:{ar:['نماذج الذكاء الاصطناعي','الوكلاء والأنظمة','تطبيق التقنية'],en:['AI models','Agents and systems','Technology in practice']}},
 {id:'bani',name:{ar:'باني',en:'Bani'},sector:{ar:'الصناعة والتصنيع',en:'Industry & manufacturing'},portrait:3,
  bio:{ar:'الأفكار تصبح أقوى حين تُصنع. نستكشف ما يرفع قدرة المصنع، من التصميم إلى التشغيل.',en:'Ideas grow stronger when they are built. Explore factory capabilities from design to operation.'},beats:{ar:['التصنيع المتقدم','الروبوتات الصناعية','تشغيل المصانع'],en:['Advanced manufacturing','Industrial robotics','Factory operations']}},
 {id:'volt',name:{ar:'فولت',en:'Volt'},sector:{ar:'الطاقة',en:'Energy'},portrait:4,
  bio:{ar:'طاقة يمكن الاعتماد عليها: من توليدها وتخزينها إلى استخدامها بكفاءة في الواقع.',en:'Energy we can depend on: from generation and storage to efficient use in the real world.'},beats:{ar:['التوليد والتخزين','الشبكات','كفاءة الطاقة'],en:['Generation and storage','Power grids','Energy efficiency']}},
 {id:'zaro',name:{ar:'زارو',en:'Zaro'},sector:{ar:'الزراعة والأمن الغذائي',en:'Agriculture & food security'},portrait:5,
  bio:{ar:'من الأرض إلى الغذاء، نبحث عن المعرفة والتقنيات التي تساعدنا على إنتاج أفضل بموارد أذكى.',en:'From soil to food, explore knowledge and technologies for better production and wiser resource use.'},beats:{ar:['الزراعة الدقيقة','المياه والإنتاج','سلاسل الغذاء'],en:['Precision agriculture','Water and production','Food supply chains']}},
 {id:'aman',name:{ar:'أمان',en:'Aman'},sector:{ar:'الدفاع والأمن',en:'Defense & security'},portrait:6,
  bio:{ar:'ننظر إلى الحماية والاستعداد: كيف تفهم المؤسسات المخاطر وتبني القدرة على الصمود؟',en:'A focus on protection and preparedness: how can institutions understand risk and build resilience?'},beats:{ar:['حماية البنية التحتية','الاستعداد للمخاطر','تقنيات الأمن'],en:['Infrastructure protection','Risk preparedness','Security technology']}},
 {id:'nova',name:{ar:'نوفا',en:'Nova'},sector:{ar:'الفضاء والطيران',en:'Space & aviation'},portrait:8,
  bio:{ar:'ما يحدث فوقنا يفتح فرصًا على الأرض. نستكشف تقنيات الفضاء والطيران وما تتيحه للمؤسسات.',en:'What happens above us creates opportunities on Earth. Explore space and aviation technologies and their uses.'},beats:{ar:['تقنيات الفضاء','الطيران','نقل التكنولوجيا'],en:['Space technology','Aviation','Technology transfer']}},
 {id:'eco',name:{ar:'إيكو',en:'Eco'},sector:{ar:'البيئة والاستدامة',en:'Environment & sustainability'},portrait:9,
  bio:{ar:'حلول تحافظ على الموارد وتعمل في الواقع: نربط البيئة بقرارات التصميم والإنتاج والتشغيل.',en:'Practical ways to protect resources, connecting the environment to design, production and operations.'},beats:{ar:['الاقتصاد الدائري','رصد البيئة','كفاءة الموارد'],en:['Circular economy','Environmental monitoring','Resource efficiency']}},
 {id:'movi',name:{ar:'موفي',en:'Movi'},sector:{ar:'النقل والحركة',en:'Transport & mobility'},portrait:10,
  bio:{ar:'كيف يتحرك الناس والبضائع بصورة أفضل؟ مساحة لتقنيات النقل والخدمات التي تربط الأماكن.',en:'How can people and goods move better? Explore transport technologies and services connecting places.'},beats:{ar:['التنقل الذكي','الخدمات اللوجستية','البنية التحتية للنقل'],en:['Smart mobility','Logistics','Transport infrastructure']}},
 {id:'wasl',name:{ar:'وصل',en:'Wasl'},sector:{ar:'التجارة والتصدير',en:'Trade & export'},portrait:11,
  bio:{ar:'بين احتياج في سوق وقدرة في سوق آخر تبدأ فرصة. نتابع ما يصل الموردين بالمؤسسات والعملاء.',en:'An opportunity begins where demand in one market meets capability in another. Connect suppliers, institutions and customers.'},beats:{ar:['فرص الأسواق','التوريد والتصدير','سلاسل الإمداد'],en:['Market opportunities','Sourcing and export','Supply chains']}},
 {id:'numo',name:{ar:'نمو',en:'Numo'},sector:{ar:'التمويل والاستثمار',en:'Finance & investment'},portrait:12,
  bio:{ar:'فهم الفرصة قبل تخصيص الموارد: كيف نفحص الجدوى والمخاطر وما يستحق أن ينمو؟',en:'Understand the opportunity before committing resources: examine viability, risk and what deserves to grow.'},beats:{ar:['تقييم الفرص','تمويل الابتكار','المخاطر والجدوى'],en:['Opportunity assessment','Innovation financing','Risk and viability']}},
 {id:'raed',name:{ar:'رائد',en:'Raed'},sector:{ar:'الحكومات وتطوير المؤسسات',en:'Government & institutions'},portrait:14,
  bio:{ar:'من القرار إلى مؤسسة أقدر على العمل: نستكشف الخدمات والأنظمة والقدرات التي تحسّن حياة الناس.',en:'From decisions to more capable institutions: explore services, systems and capabilities that improve lives.'},beats:{ar:['القدرات المؤسسية','الخدمات الحكومية','القرار والتشغيل'],en:['Institutional capabilities','Public services','Decisions and operations']}},
 {id:'hima',name:{ar:'هِمّة',en:'Hima'},sector:{ar:'المجتمع وتمكين الشباب',en:'Community & youth'},portrait:15,
  bio:{ar:'الموهبة تحتاج فرصة ومسارًا. نبحث عن طرق تصل التعلم بالعمل والمبادرة بأثر في المجتمع.',en:'Talent needs an opportunity and a path. Connect learning with work and initiative with community impact.'},beats:{ar:['مهارات الشباب','مسارات الفرص','المبادرات المجتمعية'],en:['Youth skills','Opportunity pathways','Community initiatives']}},
 {id:'labo',name:{ar:'لابو',en:'Labo'},sector:{ar:'البحث والابتكار',en:'Research & innovation'},portrait:16,
  bio:{ar:'الفكرة بداية، والتجربة تكشف الطريق. هنا نتابع البحث وكيف تتحول المعرفة إلى قدرة قابلة للاختبار.',en:'Ideas start the journey; experiments reveal the path. Explore research and how knowledge becomes a testable capability.'},beats:{ar:['مناهج البحث','تصميم التجارب','نقل المعرفة إلى التطبيق'],en:['Research methods','Experimental design','Knowledge into practice']}},
];

export function characterById(id:unknown){return characters.find(c=>c.id===id);}
export function characterPath(id:string,locale:Locale){return `${locale==='ar'?'/ar':''}/insights/characters/${id}`;}
export function normalizeCharacterFollows(raw:unknown):string[]{return Array.isArray(raw)?[...new Set(raw.filter((id):id is string=>typeof id==='string'&&!!characterById(id)))]:[];}
export function postsForCharacter(posts:LeaderPost[],id:string){return characterById(id)?posts.filter(p=>p.character_id===id||p.sector_ids?.includes(id)):[];}
export function characterAuthor(post:LeaderPost){return characterById(post.character_id);}

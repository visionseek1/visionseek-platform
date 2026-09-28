import {t,type Entry,type Section} from './schema';
import {programEntries} from './programs';
import {workshopEntries} from './workshops';
import {guideEntries} from './guides';
import {newsEntries} from './news';
export * from './schema';
export const entries:Entry[]=[...programEntries,...workshopEntries,...guideEntries,...newsEntries];
const link=(href:string,en:string,ar:string)=>({href,label:t(en,ar)});
export const sections:Section[]=[
 {id:'work-with-us',title:t('Work with Us','اعمل معنا'),eyebrow:t('CONNECT · CONTRIBUTE · BUILD','تواصل · ساهم · ابنِ'),intro:t('Bring an important need, a deep expertise or a capability the world should use. Find your path into a mission.','قدّم احتياجًا مهمًا أو خبرة عميقة أو قدرة تستحق الاستخدام. اكتشف مسارك للمشاركة في مهمة.'),image:'industry',links:[link('/start','Build your solutions with us','ابنِ حلولك معنا'),link('/work-with-us/new-to-visionseek','New to VisionSeek','ابدأ مع VisionSeek'),link('/work-with-us/how-to-respond','How to respond','كيف تشارك؟'),link('/work-with-us/prepare-a-concept','Prepare a concept','جهّز تصورًا'),link('/work-with-us/review-and-selection','Review & selection','المراجعة والاختيار'),link('/work-with-us/transition','Transition to use','النقل للتشغيل')]},
 {id:'programs',title:t('Programs','البرامج'),eyebrow:t('PROGRAMS WE ARE BUILDING','برامج نعمل على بنائها'),intro:t('Explore the programs VisionSeek is developing for institutions and governments. Start with HLO — Highest Level One.','تعرّف على البرامج التي نطوّرها للمؤسسات والحكومات. نبدأ ببرنامج HLO — Highest Level One.'),image:'chips',links:[link('/programs','Our programs','برامجنا'),link('/programs/hlo','HLO — Highest Level One','برنامج HLO'),link('/programs/program-lifecycle','How programs develop','كيف نطوّر البرامج؟')]},
 {id:'news',title:t('News','الأخبار'),eyebrow:t('IDEAS · RESEARCH · INSTITUTIONAL LEARNING','أفكار · بحث · تعلم مؤسسي'),intro:t('VisionSeek perspectives and attributed research references on building what should become possible.','رؤى VisionSeek ومراجع بحثية منسوبة إلى مصادرها حول بناء ما ينبغي أن يصبح ممكنًا.'),image:'science',links:[link('/news','All news & notes','كل الأخبار والمقالات'),link('/news/media','Media & inquiries','الإعلام والاستفسارات'),link('/insights','Leaders House','بيت القادة'),link('/programs/spotlights','Research spotlights','تحت المجهر')]},
 {id:'workshops',title:t('Workshops','ورش العمل'),eyebrow:t('ONE WEEK. ONE QUESTION. ONE USEFUL OUTPUT.','كل أسبوع. سؤال محدد. مخرج مفيد.'),intro:t('A weekly working rhythm to frame capabilities, assemble knowledge, design proof and learn from reality.','إيقاع عمل أسبوعي لصياغة القدرات وتجميع المعرفة وتصميم الإثبات والتعلم من الواقع.'),image:'industry',notice:t('Six planned workshop formats. Dates, hosts and attendance are confirmed separately.','ست صيغ لورش مخططة. تُؤكد المواعيد والميسّرون والحضور بصورة منفصلة.'),links:[link('/workshops','The weekly cycle','الدورة الأسبوعية'),link('/workshops/how-workshops-work','How it works','كيف تعمل الورش؟'),link('/workshops/rewinds','Notes & outcomes','السجلات والمخرجات')]},
 {id:'about',title:t('About','عن VisionSeek'),eyebrow:t('SEE WHAT COULD BE. MAKE IT POSSIBLE.','نرى ما يمكن أن يكون. ونجعله ممكنًا.'),intro:t('The vision, people and operating principles behind VisionSeek.','الرؤية والأشخاص ومبادئ التشغيل وراء VisionSeek.'),image:'space',links:[link('/about','Our vision','رؤيتنا'),link('/method','Our method','منهجنا'),link('/about/operating-model','Operating model','نموذج التشغيل'),link('/about/program-questions','Program questions','أسئلة البرنامج'),link('/about/people','People','الأشخاص'),link('/about/governance','Governance','الحوكمة'),link('/about/learning-from-darpa','Learning from DARPA','التعلم من DARPA')]}
];
export const getSection=(id:string)=>sections.find(s=>s.id===id);
export const getEntry=(section:string,slug:string)=>entries.find(e=>e.section===section&&e.slug===slug);
export const entryPath=(e:Entry)=>`/${e.section}/${e.slug}`;
export const titleForPath=(path:string,locale:'en'|'ar')=>{
 const [section,slug]=path.split('/').filter(Boolean);
 if(!slug)return getSection(section)?.title[locale]??({'method':locale==='ar'?'منهجنا':'Our method','insights':locale==='ar'?'بيت القادة':'Leaders House'} as Record<string,string>)[section]??section;
 return getEntry(section,slug)?.title[locale]??(path.includes('physical-ai')?(locale==='ar'?'تقرير الذكاء الاصطناعي المادي':'Physical AI report'):locale==='ar'?'اكتشف المزيد':'Explore more');
};

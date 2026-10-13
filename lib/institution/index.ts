import {t,type Entry,type Section} from './schema';
import {readContentFile} from './content-files';
import {isArchived} from '@/lib/visibility';
import {programEntries,opportunityEntries} from './programs';
import {workshopEntries} from './workshops';
import {guideEntries} from './guides';
import {newsEntries} from './news';
export * from './schema';
export const entries:Entry[]=[...programEntries,...opportunityEntries,...workshopEntries,...guideEntries,...newsEntries];
/** The six section headers (title, eyebrow, intro, image, notice, links). Edited from /admin («مقدمات صفحات الأقسام»). */
export const sections:Section[]=readContentFile<{sections:Section[]}>('sections.json').sections.map(section=>({...section,links:section.links.filter(link=>!isArchived(link.href)),notice:section.notice&&section.notice.en?section.notice:undefined}));
export const getSection=(id:string)=>sections.find(s=>s.id===id);
export const getEntry=(section:string,slug:string)=>entries.find(e=>e.section===section&&e.slug===slug);
/** Public URL of a section. «workshops» is served as /masterclass; the id stays so content and /admin keep working. */
export const sectionPath=(id:string)=>id==='workshops'?'/masterclass':`/${id}`;
const sectionForSegment=(segment:string)=>segment==='masterclass'?'workshops':segment;
export const entryPath=(e:Entry)=>`${sectionPath(e.section)}/${e.slug}`;
export const titleForPath=(path:string,locale:'en'|'ar')=>{
 const [segment,slug]=path.split('/').filter(Boolean);const section=sectionForSegment(segment??'');
 if(!slug)return getSection(section)?.title[locale]??({'method':locale==='ar'?'منهجنا':'Our method','insights':locale==='ar'?'بيت القادة':'Leaders House'} as Record<string,string>)[section]??section;
 return getEntry(section,slug)?.title[locale]??(path.includes('physical-ai')?(locale==='ar'?'تقرير الذكاء الاصطناعي المادي':'Physical AI report'):locale==='ar'?'اكتشف المزيد':'Explore more');
};

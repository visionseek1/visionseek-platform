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
/** Public URL of a section. Institute is the umbrella; old Masterclass doors stay at /masterclass. */
export const sectionPath=(id:string)=>id==='workshops'?'/institute':`/${id}`;
const sectionForSegment=(segment:string)=>segment==='masterclass'||segment==='institute'?'workshops':segment;
export const entryPath=(e:Entry)=>e.section==='workshops'?`/masterclass/${e.slug}`:`${sectionPath(e.section)}/${e.slug}`;
export const titleForPath=(path:string,locale:'en'|'ar')=>{
 const [segment,slug]=path.split('/').filter(Boolean);const section=sectionForSegment(segment??'');
 if(segment==='institute'&&slug==='masterclass')return locale==='ar'?'ماستر كلاس':'Masterclass';
 if(segment==='institute'&&slug==='fellowship')return locale==='ar'?'زمالة VisionSeek':'VisionSeek Fellowship';
 if(segment==='korean-solutions'||segment==='korea-gate')return locale==='ar'?'بوابة كوريا':'Korea Gate';
 if(path.endsWith('localization-doctrine'))return locale==='ar'?'عقيدة التوطين':'The Localization Doctrine';
 if(path.endsWith('single-track-trap'))return locale==='ar'?'حوكمة الذكاء الاصطناعي':'AI Governance workshop';
 if(!slug){
  if(segment==='masterclass')return locale==='ar'?'ماستر كلاس':'Masterclass';
  if(segment==='institute')return locale==='ar'?'معهد VisionSeek':'VisionSeek Institute';
  return getSection(section)?.title[locale]??({'method':locale==='ar'?'منهجنا':'Our method','insights':locale==='ar'?'بيت القادة':'Leaders House'} as Record<string,string>)[section]??section;
 }
 return getEntry(section,slug)?.title[locale]??(path.includes('physical-ai')?(locale==='ar'?'تقرير الذكاء الاصطناعي المادي':'Physical AI report'):locale==='ar'?'اكتشف المزيد':'Explore more');
};

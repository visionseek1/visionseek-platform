import {t,type Entry,type SectionId,type Text,type Block} from './schema';
import {communities} from '@/components/capability/content';
import {readContentDir,hrefs} from './content-files';
const guide=(section:SectionId,slug:string,title:Text,summary:Text,blocks:Block[],related:string[]=[],image='cities'):Entry=>({section,slug,title,summary,blocks,related,image,category:t('Guide & operating model','دليل ونموذج تشغيل'),status:t('VisionSeek approach','منهج VisionSeek')});
type GuideFile={position:number;section:SectionId;slug:string;title:Text;summary:Text;image?:string;blocks:Block[];related?:{href:string}[];source?:{title:string;url:string}};
/** Guide and about pages. Edited from /admin («صفحات الدليل»); the six community pages below are generated from content.ts. */
export const guideEntries:Entry[]=readContentDir<GuideFile>('guides').map(file=>{
 const entry=guide(file.section,file.slug,file.title,file.summary,file.blocks,hrefs(file.related),file.image||'cities');
 if(file.source&&file.source.title&&file.source.url)entry.source=file.source;
 return entry;
});
for(const c of communities){guideEntries.push(guide('work-with-us',c.id,t(c.en,c.ar),t(c.textEn,c.textAr),[{title:t('Where we can begin','من أين نبدأ؟'),body:t(c.detailEn,c.detailAr)},{title:t('A useful contribution','مساهمة مفيدة'),items:[t('Define the capability or expertise you want to bring.','حدد القدرة أو الخبرة التي تريد تقديمها.'),t('Share relevant, verifiable evidence and the conditions for collaboration.','شارك أدلة مرتبطة قابلة للتحقق وشروط التعاون.'),t('Choose a bounded next step with a responsible owner.','اختر خطوة تالية محددة لها مسؤول واضح.')]}],['/programs','/opportunities','/work-with-us/prepare-a-concept']));}

import {z} from 'zod';
const text=(max:number)=>z.string().trim().max(max);
export const httpsUrl=z.string().trim().max(2000).refine(value=>{if(!value)return true;try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}},'Use an HTTPS URL');
export const draftContentSchema=z.object({
 title_ar:text(240),title_en:text(240),summary_ar:text(4000),summary_en:text(4000),author:text(200),
 kind:z.enum(['report','brief','working_paper','evidence_review']),topics:text(300),country:text(150),
 cover_url:httpsUrl,cover_alt:text(300),report_file_url:httpsUrl,
 sections:z.array(z.object({heading_ar:text(240),heading_en:text(240),body_ar:text(25000),body_en:text(25000)}).strict()).max(40),
 sources:z.array(z.object({title:text(300),url:httpsUrl.refine(value=>!!value),note:text(1200)}).strict()).max(100),
 methodology_ar:text(8000),methodology_en:text(8000),limitations_ar:text(6000),limitations_en:text(6000),
}).strict().refine(d=>!!(d.title_ar||d.title_en),{message:'Add a title',path:['title_ar']});
export type ReportDraftContent=z.infer<typeof draftContentSchema>;
export const draftState=z.enum(['draft','review','archived']);
export const createDraftSchema=z.object({id:z.string().uuid(),content:draftContentSchema}).strict();
export const updateDraftSchema=z.object({revision:z.number().int().nonnegative(),status:draftState,content:draftContentSchema}).strict();
export type ReportDraft={id:string;owner_id:string;status:z.infer<typeof draftState>;revision:number;content:ReportDraftContent;created_at:string;updated_at:string};
export function emptyReportDraft():ReportDraftContent{return {title_ar:'',title_en:'',summary_ar:'',summary_en:'',author:'VisionSeek',kind:'report',topics:'',country:'',cover_url:'',cover_alt:'',report_file_url:'',sections:[{heading_ar:'',heading_en:'',body_ar:'',body_en:''}],sources:[],methodology_ar:'',methodology_en:'',limitations_ar:'',limitations_en:''};}
export function reviewGaps(d:ReportDraftContent){const complete=(locale:'ar'|'en')=>!!d[`title_${locale}`]&&!!d[`summary_${locale}`]&&d.sections.some(s=>!!s[`body_${locale}`])&&!!d[`methodology_${locale}`]&&!!d[`limitations_${locale}`];return {language:complete('ar')||complete('en'),sources:d.sources.length>0,author:!!d.author};}

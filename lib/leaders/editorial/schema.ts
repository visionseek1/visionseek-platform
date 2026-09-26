import {z} from 'zod';
export const pilotCharacters=['tiko','labo'] as const;
export const editorialStates=['inbox','generating','draft','review','approved','rejected','handed_off'] as const;
export type EditorialState=typeof editorialStates[number];
const short=z.string().trim().min(1).max(180);
export const sourceUrl=z.string().trim().max(2000).url().refine(value=>{try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}},'Use an HTTPS source URL');
export const sourceSchema=z.object({character_id:z.enum(pilotCharacters),source_url:sourceUrl,source_label:z.string().trim().min(1).max(120),source_title:short,source_excerpt:z.string().trim().min(100).max(16000)}).strict();
export const draftSchema=z.object({title:short,body:z.string().trim().min(50).max(5000),title_en:z.string().trim().max(180),body_en:z.string().trim().max(5000),why_it_matters:z.string().trim().min(15).max(1200),next_step:z.string().trim().min(10).max(1000),claims:z.array(z.object({claim:z.string().trim().min(5).max(700),evidence_quote:z.string().trim().min(10).max(700)}).strict()).min(1).max(5),limitations:z.array(z.string().trim().min(5).max(700)).min(1).max(5)}).strict();
export type EditorialDraft=z.infer<typeof draftSchema>;
export type EditorialItem=z.infer<typeof sourceSchema>&{id:string;owner_id:string;status:EditorialState;revision:number;draft:EditorialDraft|null;source_method:'manual'|'fetched';source_fetched_at:string|null;source_checked:boolean;review_note:string|null;model:string|null;last_error:string|null;generation_started_at:string|null;post_id:string|null;created_at:string;updated_at:string;history:{action:string;at:string}[]};
export const actionSchema=z.object({action:z.enum(['save','request_review','approve','reject','handoff','reopen']),revision:z.number().int().nonnegative(),draft:draftSchema.optional(),source_checked:z.boolean().optional(),note:z.string().trim().max(2000).optional()}).strict();
export function normalizeEvidence(value:string){return value.normalize('NFKC').replace(/\s+/gu,' ').trim();}
export function validateDraft(value:unknown,source:string){const draft=draftSchema.parse(value);const evidence=normalizeEvidence(source);for(const c of draft.claims){if(!evidence.includes(normalizeEvidence(c.evidence_quote)))throw new Error('EVIDENCE_MISMATCH');}return draft;}
export const sourceCatalog=[
 {id:'palantir-ontology',character_id:'tiko',label:'Palantir',title:'Ontology overview',url:'https://www.palantir.com/docs/foundry/ontology/overview/'},
 {id:'darpa-heilmeier',character_id:'labo',label:'DARPA',title:'The Heilmeier Catechism',url:'https://www.darpa.mil/about/heilmeier-catechism'},
 {id:'nasa-transfer',character_id:'labo',label:'NASA',title:'Technology licensing',url:'https://technology.nasa.gov/license'},
] as const;
export const outputSchema={type:'object',additionalProperties:false,properties:{title:{type:'string'},body:{type:'string'},title_en:{type:'string'},body_en:{type:'string'},why_it_matters:{type:'string'},next_step:{type:'string'},claims:{type:'array',items:{type:'object',additionalProperties:false,properties:{claim:{type:'string'},evidence_quote:{type:'string'}},required:['claim','evidence_quote']}},limitations:{type:'array',items:{type:'string'}}},required:['title','body','title_en','body_en','why_it_matters','next_step','claims','limitations']};

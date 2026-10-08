import {readContentDir, readContentFile} from '@/lib/institution/content-files';

/**
 * Sectors, tracks and the public project concepts. Edited from /admin («المشاريع: المجالات والمسارات» و«تصوّرات المشاريع»).
 * Server-side only (node:fs). Client components receive what they need as props; see components/institution/start-page.tsx.
 */
export type Locale = 'ar' | 'en';
export type Text = Record<Locale, string>;
export type SectorIcon = 'energy'|'chips'|'flight'|'defense'|'robotics'|'health'|'agriculture'|'cities';
export type Sector = {slug:string; title:Text; intro:Text; icon:SectorIcon; anchors:string[]; focus:Text[]};
export type Track = {slug:string; sector:string; title:Text; intro:Text};
export type ProjectKind = 'supply'|'containment';
export type ProjectStatus = 'concept'|'active'|'completed';
export type ProjectMilestone={id:string;title:Text;description:Text;state:'current'|'planned'|'completed';evidenceUrl?:string};
export type ProjectUpdate={id:string;date:string;kind:'scope'|'research'|'partnership'|'test'|'delivery';title:Text;body:Text;visibility:'draft'|'public';evidenceUrl?:string};
/** The public dossier of a concept. Internal tasks and client details never belong here. */
export type ProjectFile={
 version:string;updatedAt:string;stage:Text;stageNote:Text;challenge:Text;role:Text;engagement:Text;
 workstreams:{id:string;title:Text;body:Text}[];
 deliverables:{title:Text;body:Text}[];
 partnerNeeds:Text[];milestones:ProjectMilestone[];updates:ProjectUpdate[];
};
export type Project = {
  position?:number;
  id:string; slug:string; sector:string; track:string; kind:ProjectKind;
  status:ProjectStatus; featuredOrder?:number;
  title:Text; summary:Text; ambition:Text; idea:Text; beneficiary:Text;
  outcomes:{title:Text;text:Text}[];
  file?:ProjectFile;
};
type Catalog = {conceptNotice:Text; status:Record<ProjectStatus,Text>; sectors:Sector[]; tracks:Track[]};

const catalog = readContentFile<Catalog>('projects/catalog.json');
export const conceptNotice:Text = catalog.conceptNotice;
export const sectors:Sector[] = catalog.sectors;
export const tracks:Track[] = catalog.tracks;
// Founder-defined public concepts. No country mandate, client or delivered technology is asserted.
export const projects:Project[] = readContentDir<Project>('projects/concepts');

export const prefix = (locale:Locale) => locale==='ar'?'/ar':'';
export const projectStatus:Record<ProjectStatus,Text> = catalog.status;
export const featuredProjects = projects.filter(p=>p.featuredOrder!==undefined).sort((a,b)=>a.featuredOrder!-b.featuredOrder!);
export const sectorBySlug = (slug:string) => sectors.find(item=>item.slug===slug);
export const projectBySlug = (slug:string) => projects.find(item=>item.slug===slug);
export const sectorPath = (slug:string,locale:Locale) => `${prefix(locale)}/projects/${slug}`;
export const trackPath = (track:Track,locale:Locale) => `${sectorPath(track.sector,locale)}/${track.slug}`;
export const projectPath = (slug:string,locale:Locale) => {const project=projectBySlug(slug);if(!project)throw new Error(`Unknown project: ${slug}`);return `${sectorPath(project.sector,locale)}/${project.track}/${project.slug}`;};
export type ProjectInquiryIntent='commission'|'partner';
export const projectInquiry = (project:Project,locale:Locale,intent:ProjectInquiryIntent='commission') => `${prefix(locale)}/start?${new URLSearchParams({from:'projects',project:project.id,intent,idea:`${project.id} — ${project.title[locale]}`})}`;
export const projectRoutes = [
  ...sectors.map(item=>[item.slug]),
  ...tracks.map(item=>[item.sector,item.slug]),
  ...projects.map(item=>[item.sector,item.track,item.slug]),
];
export type ProjectRoute = {kind:'sector';data:Sector}|{kind:'track';data:Track}|{kind:'project';data:Project};
export function resolveProjectRoute(parts:string[]):ProjectRoute|undefined {
  if(parts.length===1){const data=sectorBySlug(parts[0]);if(data)return {kind:'sector',data};}
  if(parts.length===2){const data=tracks.find(item=>item.sector===parts[0]&&item.slug===parts[1]);if(data)return {kind:'track',data};}
  if(parts.length===3){const data=projects.find(item=>item.sector===parts[0]&&item.track===parts[1]&&item.slug===parts[2]);if(data)return {kind:'project',data};}
}

export const conceptCount = (count:number,locale:Locale) => locale==='ar'?(count===2?'تصوّران مقترحان':`${new Intl.NumberFormat('ar').format(count)} تصوّرات مقترحة`):`${count} proposed concept${count===1?'':'s'}`;

/** What the enquiry page needs to label an inbound project link; passed from the server page into the client form. */
export type ProjectOption = {id:string; title:Text};
export const projectOptions:ProjectOption[] = projects.map(({id,title})=>({id,title}));

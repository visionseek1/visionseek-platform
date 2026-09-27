import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ProjectDetail} from '@/components/projects/project-pages';
import {projects,projectBySlug,projectPath} from '@/lib/projects';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(project=>({slug:project.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const project=projectBySlug(slug);if(!project)return {};
 return {title:project.title.ar+' | VisionSeek',description:project.summary.ar,alternates:{canonical:projectPath(slug,'ar'),languages:{en:projectPath(slug,'en'),ar:projectPath(slug,'ar')}}};
}
export default async function Page({params}:Props){const {slug}=await params;const project=projectBySlug(slug);if(!project)notFound();return <ProjectDetail project={project} locale="ar"/>;}

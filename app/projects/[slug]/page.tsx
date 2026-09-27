import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ProjectDetail} from '@/components/projects/project-pages';
import {projects,projectBySlug,projectPath} from '@/lib/projects';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(project=>({slug:project.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const project=projectBySlug(slug);if(!project)return {};
 return {title:project.title.en+' | VisionSeek',description:project.summary.en,alternates:{canonical:projectPath(slug,'en'),languages:{en:projectPath(slug,'en'),ar:projectPath(slug,'ar')}}};
}
export default async function Page({params}:Props){const {slug}=await params;const project=projectBySlug(slug);if(!project)notFound();return <ProjectDetail project={project} locale="en"/>;}

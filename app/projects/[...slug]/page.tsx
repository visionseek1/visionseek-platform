import {notFound} from 'next/navigation';
import {ProjectRoutePage,projectRouteMetadata} from '@/components/projects/route-page';
import {projectRoutes,resolveProjectRoute} from '@/lib/projects';
export const dynamicParams=false;
export function generateStaticParams(){return projectRoutes.map(slug=>({slug}));}
type Props={params:Promise<{slug:string[]}>};
export async function generateMetadata({params}:Props){return projectRouteMetadata((await params).slug,'en');}
export default async function Page({params}:Props){const route=resolveProjectRoute((await params).slug);if(!route)notFound();return <ProjectRoutePage route={route} locale="en"/>;}

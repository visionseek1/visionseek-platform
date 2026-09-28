import type {Metadata} from 'next';
import {resolveProjectRoute, type ProjectRoute, type Locale} from '@/lib/projects';
import {SectorPage,TrackPage,ProjectDetail} from './project-pages';
export function ProjectRoutePage({route,locale}:{route:ProjectRoute;locale:Locale}) {
  if(route.kind==='sector')return <SectorPage sector={route.data} locale={locale}/>;
  if(route.kind==='track')return <TrackPage track={route.data} locale={locale}/>;
  return <ProjectDetail project={route.data} locale={locale}/>;
}
export function projectRouteMetadata(parts:string[],locale:Locale):Metadata {
  const route=resolveProjectRoute(parts);if(!route)return {};
  const path=`/projects/${parts.join('/')}`;
  return {title:`${route.data.title[locale]} | VisionSeek`,description:route.kind==='project'?route.data.summary[locale]:route.data.intro[locale],alternates:{canonical:`${locale==='ar'?'/ar':''}${path}`,languages:{en:path,ar:`/ar${path}`}}};
}

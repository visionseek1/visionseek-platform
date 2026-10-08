import type { MetadataRoute } from "next";
import {entries as institutionEntries, sections, entryPath} from "@/lib/institution";
import {workshops} from "@/lib/institution/workshops";
import {characters,characterPath} from '@/lib/leaders/characters';
import {showPublicCharacters} from '@/lib/leaders/presentation';

import {projectRoutes} from '@/lib/projects';
import {isArchived} from '@/lib/visibility';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries = [
    {path:"/about/what-we-do",priority:0.9},{path:"/ar/about/what-we-do",priority:0.9},
    ...projectRoutes.flatMap(parts=>['','/ar'].map(prefix=>({path:`${prefix}/projects/${parts.join('/')}`,priority:0.8}))),
    ...["/reports", "/ar/reports", "/reports/methodology", "/ar/reports/methodology", "/reports/agent-governance", "/ar/reports/agent-governance"].map(path => ({path, priority: 0.7})),
    ...(showPublicCharacters?[...characters.flatMap(c=>[{path:characterPath(c.id,'ar'),priority:0.6},{path:characterPath(c.id,'en'),priority:0.6}]),
      {path:'/insights/characters',priority:0.7},{path:'/ar/insights/characters',priority:0.7}]:[]),
    ...sections.filter(s=>!["about","work-with-us"].includes(s.id)).flatMap(s=>[{path:`/${s.id}`,priority:0.8},{path:`/ar/${s.id}`,priority:0.8}]),
    ...institutionEntries.flatMap(e=>[{path:entryPath(e),priority:0.7},{path:`/ar${entryPath(e)}`,priority:0.7}]),
    ...workshops.flatMap(item=>[{path:`/workshops/${item.slug}`,priority:0.75},{path:`/ar/workshops/${item.slug}`,priority:0.75}]),
    ...["method", "about", "work-with-us", "start"].flatMap(path => [{ path: `/${path}`, priority: 0.8 }, { path: `/ar/${path}`, priority: 0.8 }]),
    { path: "", priority: 1 },
    { path: "/ar", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/ar/projects", priority: 0.8 },
    { path: "/insights", priority: 0.85 },
    { path: "/ar/insights", priority: 0.85 },
    { path: "/privacy", priority: 0.3 },
    { path: "/ar/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/ar/terms", priority: 0.3 },
  ];

  return entries.filter(({path}) => !isArchived(path || '/')).map(({ path, priority }) => ({
    url: `https://visionseek.org${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

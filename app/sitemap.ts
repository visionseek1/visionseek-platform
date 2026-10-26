import type { MetadataRoute } from "next";
import {entries as institutionEntries, sections, entryPath, sectionPath} from "@/lib/institution";
import {workshops} from "@/lib/institution/workshops";
import {characters,characterPath} from '@/lib/leaders/characters';
import {showPublicCharacters} from '@/lib/leaders/presentation';

import {projectRoutes} from '@/lib/projects';
import {isArchived} from '@/lib/visibility';
import {insights} from '@/lib/insights';
import {liveIndices} from '@/lib/indices';
import ksData from '@/content/korean-solutions.json';

// Korean Solutions pages known at build time (the JSON copy of the Notion database).
const koreanSolutions = ksData.solutions;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries = [
    {path:"/about/what-we-do",priority:0.9},{path:"/ar/about/what-we-do",priority:0.9},
    ...projectRoutes.flatMap(parts=>['','/ar'].map(prefix=>({path:`${prefix}/projects/${parts.join('/')}`,priority:0.8}))),
    ...["/reports/methodology", "/ar/reports/methodology", "/reports/agent-governance", "/ar/reports/agent-governance"].map(path => ({path, priority: 0.7})),
    ...(showPublicCharacters?[...characters.flatMap(c=>[{path:characterPath(c.id,'ar'),priority:0.6},{path:characterPath(c.id,'en'),priority:0.6}]),
      {path:'/leaders-house/characters',priority:0.7},{path:'/ar/leaders-house/characters',priority:0.7}]:[]),
    ...sections.filter(s=>!["about","work-with-us"].includes(s.id)).flatMap(s=>[{path:sectionPath(s.id),priority:0.8},{path:`/ar${sectionPath(s.id)}`,priority:0.8}]),
    ...institutionEntries.flatMap(e=>[{path:entryPath(e),priority:0.7},{path:`/ar${entryPath(e)}`,priority:0.7}]),
    ...workshops.flatMap(item=>[{path:`/masterclass/${item.slug}`,priority:0.75},{path:`/ar/masterclass/${item.slug}`,priority:0.75}]),
    {path:'/masterclass',priority:0.8},{path:'/ar/masterclass',priority:0.8},
    {path:'/masterclass/single-track-trap',priority:0.75},{path:'/ar/masterclass/single-track-trap',priority:0.75},
    {path:'/institute',priority:0.8},{path:'/ar/institute',priority:0.8},
    {path:'/institute/masterclass',priority:0.75},{path:'/ar/institute/masterclass',priority:0.75},
    {path:'/institute/fellowship',priority:0.75},{path:'/ar/institute/fellowship',priority:0.75},
    ...["method", "about", "work-with-us", "start"].flatMap(path => [{ path: `/${path}`, priority: 0.8 }, { path: `/ar/${path}`, priority: 0.8 }]),
    { path: "/conferences", priority: 0.75 },
    { path: "/ar/conferences", priority: 0.75 },
    { path: "", priority: 1 },
    { path: "/ar", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/ar/projects", priority: 0.8 },
    {path: '/korea-gate', priority: 0.85}, {path: '/ar/korea-gate', priority: 0.85},
    {path: '/korea-gate/studies/hospitals', priority: 0.7}, {path: '/ar/korea-gate/studies/hospitals', priority: 0.7},
    {path: '/korea-gate/studies/pharma', priority: 0.7}, {path: '/ar/korea-gate/studies/pharma', priority: 0.7},
    {path: '/korea-gate/studies/regulators', priority: 0.7}, {path: '/ar/korea-gate/studies/regulators', priority: 0.7},
    {path: '/korea-gate/studies/universities', priority: 0.7}, {path: '/ar/korea-gate/studies/universities', priority: 0.7},
    {path: '/korea-gate/studies/medical-ai', priority: 0.7}, {path: '/ar/korea-gate/studies/medical-ai', priority: 0.7},
    {path: '/korea-gate/samples/gate-memo', priority: 0.65}, {path: '/ar/korea-gate/samples/gate-memo', priority: 0.65},
    {path: '/korea-gate/samples/radar', priority: 0.65}, {path: '/ar/korea-gate/samples/radar', priority: 0.65},
    {path: '/korea-gate/samples/capability-map', priority: 0.65}, {path: '/ar/korea-gate/samples/capability-map', priority: 0.65},
    {path: '/indices', priority: 0.8}, {path: '/ar/indices', priority: 0.8},
    ...liveIndices().flatMap(item => [{path: `/indices/${item.slug}`, priority: 0.75}, {path: `/ar/indices/${item.slug}`, priority: 0.75}]),
    ...koreanSolutions.flatMap(k => [{path: `/korean-solutions/${k.slug}`, priority: 0.7}, {path: `/ar/korean-solutions/${k.slug}`, priority: 0.7}]),
    { path: "/reports", priority: 0.85 },
    { path: "/ar/reports", priority: 0.85 },
    { path: "/research", priority: 0.85 },
    { path: "/ar/research", priority: 0.85 },
    ...insights.notes.flatMap(n => [{path: `/reports/notes/${n.slug}`, priority: 0.7}, {path: `/ar/reports/notes/${n.slug}`, priority: 0.7}]),
    ...insights.frameworks.flatMap(f => [{path: `/reports/frameworks/${f.slug}`, priority: 0.7}, {path: `/ar/reports/frameworks/${f.slug}`, priority: 0.7}]),
    {path: '/reports/reports', priority: 0.75}, {path: '/ar/reports/reports', priority: 0.75},
    {path: '/reports/research', priority: 0.75}, {path: '/ar/reports/research', priority: 0.75},
    ...[...insights.reports, ...insights.research].filter(r => r.page).flatMap(r => [{path: r.page as string, priority: 0.75}, {path: `/ar${r.page}`, priority: 0.75}]),
    { path: "/leaders-house", priority: 0.85 },
    { path: "/ar/leaders-house", priority: 0.85 },
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

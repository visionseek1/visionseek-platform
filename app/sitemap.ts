import type { MetadataRoute } from "next";
import {entries as institutionEntries, sections, entryPath} from "@/lib/institution";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries = [
    ...sections.filter(s=>!["about","work-with-us"].includes(s.id)).flatMap(s=>[{path:`/${s.id}`,priority:0.8},{path:`/ar/${s.id}`,priority:0.8}]),
    ...institutionEntries.flatMap(e=>[{path:entryPath(e),priority:0.7},{path:`/ar${entryPath(e)}`,priority:0.7}]),
    ...["method", "about", "work-with-us"].flatMap(path => [{ path: `/${path}`, priority: 0.8 }, { path: `/ar/${path}`, priority: 0.8 }]),
    { path: "", priority: 1 },
    { path: "/ar", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/ar/projects", priority: 0.8 },
    { path: "/insights", priority: 0.85 },
    { path: "/ar/insights", priority: 0.85 },
    { path: "/insights/physical-ai", priority: 0.8 },
    { path: "/ar/insights/physical-ai", priority: 0.8 },
    { path: "/privacy", priority: 0.3 },
    { path: "/ar/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/ar/terms", priority: 0.3 },
  ];

  return entries.map(({ path, priority }) => ({
    url: `https://visionseek.org${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

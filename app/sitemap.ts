import type { MetadataRoute } from "next";
import insights from "@/public/insights.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const signalEntries = insights.items.flatMap((item) => [
    { path: `/brief/${item.id}`, priority: 0.55 },
    { path: `/ar/brief/${item.id}`, priority: 0.55 },
  ]);
  const entries = [
    { path: "", priority: 1 },
    { path: "/ar", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/ar/projects", priority: 0.8 },
    { path: "/brief", priority: 0.9 },
    { path: "/ar/brief", priority: 0.9 },
    { path: "/brief/physical-ai", priority: 0.8 },
    { path: "/ar/brief/physical-ai", priority: 0.8 },
    ...signalEntries,
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

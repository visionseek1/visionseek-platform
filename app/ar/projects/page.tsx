import type { Metadata } from "next";
import ProjectsPage from "@/components/projects-page";

export const metadata: Metadata = {
  title: "المجالات التي نستكشفها | VisionSeek",
  description: "ثمانية مجالات تنظر إليها VisionSeek. لا يوجد مشروع مُعلن.",
  alternates: {
    canonical: "/ar/projects",
    languages: { en: "/projects", ar: "/ar/projects" },
  },
};

export default function ArabicProjects() {
  return <ProjectsPage locale="ar" />;
}

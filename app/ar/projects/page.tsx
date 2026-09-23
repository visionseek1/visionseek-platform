import type { Metadata } from "next";
import ProjectsPage from "@/components/projects-page";

export const metadata: Metadata = {
  title: "المجالات التي نستكشفها | VisionSeek",
  description: "مجالات تستكشفها VisionSeek في الفضاء والدرونز والمدن والصحة والطاقة والروبوتات والغذاء. ليست قائمة مشروعات مُسلَّمة.",
  alternates: {
    canonical: "/ar/projects",
    languages: { en: "/projects", ar: "/ar/projects" },
  },
};

export default function ArabicProjects() {
  return <ProjectsPage locale="ar" />;
}

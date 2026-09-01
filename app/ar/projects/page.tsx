import type { Metadata } from "next";
import ProjectsPage from "@/components/projects-page";

export const metadata: Metadata = {
  title: "مشروعات التكنولوجيا والابتكار المستقبلي | VisionSeek",
  description: "استكشف مشروعات VisionSeek في الفضاء والدرونز والذكاء الاصطناعي والروبوتات ومدن المستقبل والصحة والطاقة والزراعة المستدامة.",
  alternates: {
    canonical: "/ar/projects",
    languages: { en: "/projects", ar: "/ar/projects" },
  },
};

export default function ArabicProjects() {
  return <ProjectsPage locale="ar" />;
}

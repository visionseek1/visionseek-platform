import type { Metadata } from "next";
import ProjectsPage from "@/components/projects-page";

export const metadata: Metadata = {
  title: "المشروعات — VisionSeek",
  description: "استكشف المجالات والأنظمة المستقبلية التي تعمل VisionSeek على تطويرها.",
  alternates: {
    canonical: "/ar/projects",
    languages: { en: "/projects", ar: "/ar/projects" },
  },
};

export default function ArabicProjects() {
  return <ProjectsPage locale="ar" />;
}

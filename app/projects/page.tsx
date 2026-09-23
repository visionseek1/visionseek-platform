import type { Metadata } from "next";
import ProjectsPage from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Fields We Explore | VisionSeek",
  description: "Seven fields VisionSeek is watching. No announced venture.",
  alternates: {
    canonical: "/projects",
    languages: { en: "/projects", ar: "/ar/projects" },
  },
};

export default function Projects() {
  return <ProjectsPage locale="en" />;
}

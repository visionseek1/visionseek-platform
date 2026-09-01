import type { Metadata } from "next";
import ProjectsPage from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Projects — VisionSeek",
  description: "Explore the fields and future-facing systems VisionSeek is working to advance.",
  alternates: {
    canonical: "/projects",
    languages: { en: "/projects", ar: "/ar/projects" },
  },
};

export default function Projects() {
  return <ProjectsPage locale="en" />;
}

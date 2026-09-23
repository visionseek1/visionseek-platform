import type { Metadata } from "next";
import ProjectsPage from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Fields We Explore | VisionSeek",
  description: "Fields VisionSeek is exploring across aerospace, drones, cities, health, energy, robotics, and food. Not a list of delivered projects.",
  alternates: {
    canonical: "/projects",
    languages: { en: "/projects", ar: "/ar/projects" },
  },
};

export default function Projects() {
  return <ProjectsPage locale="en" />;
}

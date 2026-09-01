import type { Metadata } from "next";
import ProjectsPage from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Future Technology & Innovation Projects | VisionSeek",
  description: "Explore VisionSeek projects across aerospace, drones, AI, robotics, future cities, health, climate, energy, and sustainable agriculture.",
  alternates: {
    canonical: "/projects",
    languages: { en: "/projects", ar: "/ar/projects" },
  },
};

export default function Projects() {
  return <ProjectsPage locale="en" />;
}

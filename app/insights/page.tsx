import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "Government Technology Insights & Briefings | VisionSeek",
  description: "Original VisionSeek briefings for governments on AI, robotics, aerospace, science, energy, climate, agriculture, and national capability.",
  alternates: {
    canonical: "/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function Insights() {
  return <InsightsPage locale="en" />;
}

import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "Signals & Briefings | VisionSeek",
  description: "A sensor, not the institution: one VisionSeek brief and the latest eight signals for public leaders.",
  alternates: {
    canonical: "/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function Insights() {
  return <InsightsPage locale="en" />;
}

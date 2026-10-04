import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "Kapsula | VisionSeek",
  description: "Sourced readings for health and pharma leaders: technology transfer, manufacturing, quality and AI. Posts, short videos and stories by Kapsula, from VisionSeek.",
  alternates: {
    canonical: "/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function Insights() {
  return <InsightsPage locale="en" />;
}

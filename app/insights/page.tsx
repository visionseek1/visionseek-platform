import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "Leaders House | VisionSeek",
  description: "A daily home for executives, institutional leaders and decision makers. Explore shifts, opportunities and capabilities through posts, short videos and stories.",
  alternates: {
    canonical: "/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function Insights() {
  return <InsightsPage locale="en" />;
}

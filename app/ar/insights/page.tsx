import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "بيت القادة | VisionSeek",
  description: "فيديوهات قصيرة، ستوريز، وأفكار عملية للقادة وصنّاع القرار.",
  alternates: {
    canonical: "/ar/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function ArabicInsights() {
  return <InsightsPage locale="ar" />;
}

import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "بيت القادة | VisionSeek",
  description: "بيت يومي للمديرين التنفيذيين والقادة وصنّاع القرار: تحولات وفرص وأفكار لبناء القدرات، في منشورات وفيديوهات وقصص قصيرة.",
  alternates: {
    canonical: "/ar/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function ArabicInsights() {
  return <InsightsPage locale="ar" />;
}

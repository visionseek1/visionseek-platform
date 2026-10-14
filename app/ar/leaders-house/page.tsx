import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "بيت القادة | VisionSeek",
  description: "بيت يومي للمديرين التنفيذيين والقادة وصنّاع القرار: تحولات وفرص وأفكار لبناء القدرات، في منشورات وفيديوهات وقصص قصيرة.",
  alternates: {
    canonical: "/ar/leaders-house",
    languages: { en: "/leaders-house", ar: "/ar/leaders-house" },
  },
};

export default function ArabicInsights() {
  return <InsightsPage locale="ar" />;
}

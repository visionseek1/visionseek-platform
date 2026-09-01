import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "رؤى وإحاطات تكنولوجية للحكومات | VisionSeek",
  description: "إحاطات VisionSeek الأصلية للحكومات حول الذكاء الاصطناعي والروبوتات والفضاء والعلم والطاقة والمناخ والزراعة والقدرة الوطنية.",
  alternates: {
    canonical: "/ar/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function ArabicInsights() {
  return <InsightsPage locale="ar" />;
}

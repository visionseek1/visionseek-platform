import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "إشارات وإحاطات | VisionSeek",
  description: "مستشعر وليس المؤسسة: إحاطة واحدة من VisionSeek وآخر ثماني إشارات لصُنّاع القرار.",
  alternates: {
    canonical: "/ar/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function ArabicInsights() {
  return <InsightsPage locale="ar" />;
}

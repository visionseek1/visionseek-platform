import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "كبسولة | VisionSeek",
  description: "قراءات موثقة لقادة الصحة والدواء: نقل التقنية، التصنيع، الجودة والذكاء الاصطناعي. منشورات وفيديوهات وقصص من كبسولة، برعاية VisionSeek.",
  alternates: {
    canonical: "/ar/insights",
    languages: { en: "/insights", ar: "/ar/insights" },
  },
};

export default function ArabicInsights() {
  return <InsightsPage locale="ar" />;
}

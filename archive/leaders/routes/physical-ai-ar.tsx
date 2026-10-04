import type { Metadata } from "next";
import ReportPage from "@/components/report-page";

export const metadata: Metadata = {
  title: "الذكاء الاصطناعي المادي: أجندة للحكومات | VisionSeek",
  description: "إحاطة حكومية من VisionSeek حول تحويل الذكاء الاصطناعي المادي إلى قدرة وطنية وقيمة عامة وبنية موثوقة.",
  alternates: { canonical: "/ar/insights/physical-ai", languages: { en: "/insights/physical-ai", ar: "/ar/insights/physical-ai" } },
};

export default function ArabicPhysicalAIReport() { return <ReportPage locale="ar" />; }

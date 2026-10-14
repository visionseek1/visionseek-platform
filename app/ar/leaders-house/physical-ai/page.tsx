import type { Metadata } from "next";
import ReportPage from "@/components/report-page";

export const metadata: Metadata = {
  title: "الذكاء الاصطناعي المادي: أجندة للحكومات | VisionSeek",
  description: "إحاطة حكومية من VisionSeek حول تحويل الذكاء الاصطناعي المادي إلى قدرة وطنية وقيمة عامة وبنية موثوقة.",
  alternates: { canonical: "/ar/leaders-house/physical-ai", languages: { en: "/leaders-house/physical-ai", ar: "/ar/leaders-house/physical-ai" } },
};

export default function ArabicPhysicalAIReport() { return <ReportPage locale="ar" />; }

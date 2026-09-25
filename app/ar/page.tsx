import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | Make It Possible.",
  description: "تبني VisionSeek قدرات جديدة للمؤسسات والحكومات. نحدد القدرة ونجمع أفضل الأشخاص والمعرفة والتقنيات، ثم نختبر ونشغّل ونطوّر.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function ArabicHome() {
  return <HomePage locale="ar" />;
}

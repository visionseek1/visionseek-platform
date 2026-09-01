import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | بناء المستقبل بالتكنولوجيا والعلم وريادة الأعمال",
  description: "VisionSeek مؤسسة عالمية في إنتشون تجمع التكنولوجيا والعلم والتصميم وريادة الأعمال لبناء مشروعات ومنتجات وأنظمة مستقبلية قابلة للتوسع.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function ArabicHome() {
  return <HomePage locale="ar" />;
}

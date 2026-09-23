import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | بناء المستقبل بالتكنولوجيا والعلم وريادة الأعمال",
  description: "تربط VisionSeek قدرات موجودة بالفعل في عمل تستطيع حكومة أو شركة أن تديره. إنتشون، كوريا الجنوبية.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function ArabicHome() {
  return <HomePage locale="ar" />;
}

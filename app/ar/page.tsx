import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek — نحن نبني ما هو قادم",
  description: "تجمع VisionSeek بين التكنولوجيا والعلم والتصميم وريادة الأعمال لتحويل الإمكانات الجديدة إلى مشروعات ومنتجات وأنظمة قابلة للتنفيذ والتوسع.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function ArabicHome() {
  return <HomePage locale="ar" />;
}

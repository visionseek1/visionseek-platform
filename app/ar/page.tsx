import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | Make It Possible.",
  description: "VisionSeek استوديو للفرص والقدرات عبر القطاعات. نكتشف الفرص عند التقاء القطاعات، ونجمع التقنيات والمعرفة والشركاء لتحويلها إلى مشروعات وقدرات قابلة للتنفيذ.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function ArabicHome() {
  return <HomePage locale="ar" />;
}

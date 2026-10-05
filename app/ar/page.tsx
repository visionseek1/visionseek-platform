import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | Make It Possible.",
  description: "VisionSeek استوديو للفرص والقدرات والحلول العابرة للقطاعات. نكتشف الفرص عند التقاء القطاعات، ونجمع التقنيات والمعرفة والشركاء لتحويلها إلى مشروعات وقدرات وحلول قابلة للتنفيذ.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function ArabicHome() {
  return <HomePage locale="ar" />;
}

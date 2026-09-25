import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | هندسة الفرص — Make It Possible.",
  description: "هندسة الفرص. نربط الأفكار والتكنولوجيا والأشخاص لنحوّل الإمكانات إلى قدرات تعمل في الواقع. إنتشون، كوريا الجنوبية.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function ArabicHome() {
  return <HomePage locale="ar" />;
}

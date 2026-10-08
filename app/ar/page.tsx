import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | أعلى مستوى ممكن",
  description: "تبني VisionSeek قدرات للمؤسسات، والذكاء الاصطناعي في مقدمتها، عبر Highest Level One: تجميع داخل المؤسسة بين فرق الهندسة ومن يتخذ القرار. استوديو متعدد القطاعات لمصر والخليج.",
  openGraph: {
    title: "VisionSeek | أعلى مستوى ممكن",
    description: "تبني VisionSeek قدرات للمؤسسات، والذكاء الاصطناعي في مقدمتها، عبر Highest Level One: تجميع داخل المؤسسة بين فرق الهندسة ومن يتخذ القرار. استوديو متعدد القطاعات لمصر والخليج.",
  },
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function ArabicHome() {
  return <HomePage locale="ar" />;
}

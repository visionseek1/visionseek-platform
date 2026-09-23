import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | Future Technology, Science & Venture Building",
  description: "VisionSeek connects capabilities that already exist into work a government or a company can actually operate.",
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function EnglishHome() {
  return <HomePage locale="en" />;
}

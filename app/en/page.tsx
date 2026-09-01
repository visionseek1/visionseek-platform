import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek — We Build What Comes Next",
  description: "VisionSeek brings together technology, science, design, and entrepreneurship to turn emerging possibilities into scalable projects, products, and systems.",
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function EnglishHome() {
  return <HomePage locale="en" />;
}

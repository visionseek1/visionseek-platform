import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | Make It Possible.",
  description: "Opportunity engineering. We connect ideas, technology and people to turn what could be into capabilities that work.",
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function EnglishHome() {
  return <HomePage locale="en" />;
}

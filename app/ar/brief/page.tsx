import type { Metadata } from "next";
import { Suspense } from "react";
import BriefPage from "@/components/brief-page";

export const metadata: Metadata = {
  title: "إحاطة | VisionSeek",
  description: "إشارات وإحاطات. قراءة عامة.",
  alternates: {
    canonical: "/ar/brief",
    languages: { en: "/brief", ar: "/ar/brief" },
  },
};

export default function ArabicBrief() {
  return (
    <Suspense fallback={null}>
      <BriefPage locale="ar" />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import BriefPage from "@/components/brief-page";

export const metadata: Metadata = {
  title: "بيت القادة | VisionSeek",
  description: "قراءة عامة للقادة.",
  alternates: {
    canonical: "/ar/leaders",
    languages: { en: "/leaders", ar: "/ar/leaders" },
  },
};

export default function ArabicBrief() {
  return (
    <Suspense fallback={null}>
      <BriefPage locale="ar" />
    </Suspense>
  );
}

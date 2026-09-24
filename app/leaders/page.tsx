import type { Metadata } from "next";
import { Suspense } from "react";
import BriefPage from "@/components/brief-page";

export const metadata: Metadata = {
  title: "Leaders House | VisionSeek",
  description: "Open reading for leaders.",
  alternates: {
    canonical: "/leaders",
    languages: { en: "/leaders", ar: "/ar/leaders" },
  },
};

export default function Brief() {
  return (
    <Suspense fallback={null}>
      <BriefPage locale="en" />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import BriefPage from "@/components/brief-page";

export const metadata: Metadata = {
  title: "Brief | VisionSeek",
  description: "Signals and briefings. Public reading.",
  alternates: {
    canonical: "/brief",
    languages: { en: "/brief", ar: "/ar/brief" },
  },
};

export default function Brief() {
  return (
    <Suspense fallback={null}>
      <BriefPage locale="en" />
    </Suspense>
  );
}

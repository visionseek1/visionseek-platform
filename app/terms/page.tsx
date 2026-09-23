import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms | VisionSeek",
  description: "Terms for using the public VisionSeek website. Fields are exploration, insights are a sensor, and no obligation arises without a written agreement.",
  alternates: {
    canonical: "/terms",
    languages: { en: "/terms", ar: "/ar/terms" },
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <LegalPage locale="en" kind="terms" />;
}

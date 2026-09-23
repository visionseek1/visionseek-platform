import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy | VisionSeek",
  description: "How the public VisionSeek website handles visits and messages. No accounts, no advertising cookies, no sale of data.",
  alternates: {
    canonical: "/privacy",
    languages: { en: "/privacy", ar: "/ar/privacy" },
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage locale="en" kind="privacy" />;
}

import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "الخصوصية | VisionSeek",
  description: "كيف يتعامل موقع VisionSeek العام مع الزيارة والرسائل. لا حسابات، ولا ملفات إعلانية، ولا بيع للبيانات.",
  alternates: {
    canonical: "/ar/privacy",
    languages: { en: "/privacy", ar: "/ar/privacy" },
  },
};

export default function ArabicPrivacyPage() {
  return <LegalPage locale="ar" kind="privacy" />;
}

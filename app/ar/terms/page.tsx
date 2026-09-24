import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "الشروط | VisionSeek",
  description: "شروط استخدام موقع VisionSeek. المجالات استكشاف، وبيت القادة مستشعر، ولا ينشأ التزام إلا باتفاق مكتوب.",
  alternates: {
    canonical: "/ar/terms",
    languages: { en: "/terms", ar: "/ar/terms" },
  },
};

export default function ArabicTermsPage() {
  return <LegalPage locale="ar" kind="terms" />;
}

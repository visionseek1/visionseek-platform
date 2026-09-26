import type { Metadata } from "next";
import ReportsCenter from "@/components/reports/center";

export const metadata: Metadata = {
  title: "التقارير | VisionSeek",
  alternates: { canonical: "/ar/reports", languages: { en: "/reports", ar: "/ar/reports" } },
};
export default function Page() { return <ReportsCenter locale="ar" />; }

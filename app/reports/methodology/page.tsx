import type { Metadata } from "next";
import ReportsCenter from "@/components/reports/center";

export const metadata: Metadata = {
  title: "Methods & standards | VisionSeek",
  alternates: { canonical: "/reports/methodology", languages: { en: "/reports/methodology", ar: "/ar/reports/methodology" } },
};
export default function Page() { return <ReportsCenter locale="en" methodology />; }

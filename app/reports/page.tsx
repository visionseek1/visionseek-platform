import type { Metadata } from "next";
import ReportsCenter from "@/components/reports/center";

export const metadata: Metadata = {
  title: "Reports | VisionSeek",
  alternates: { canonical: "/reports", languages: { en: "/reports", ar: "/ar/reports" } },
};
export default function Page() { return <ReportsCenter locale="en" />; }

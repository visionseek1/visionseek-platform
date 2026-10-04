import type { Metadata } from "next";
import ReportPage from "@/components/report-page";

export const metadata: Metadata = {
  title: "Physical AI: A Government Agenda | VisionSeek",
  description: "A VisionSeek government brief on turning physical AI into national capability, public value, and trusted infrastructure.",
  alternates: { canonical: "/insights/physical-ai", languages: { en: "/insights/physical-ai", ar: "/ar/insights/physical-ai" } },
};

export default function PhysicalAIReport() { return <ReportPage locale="en" />; }

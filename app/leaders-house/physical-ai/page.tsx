import type { Metadata } from "next";
import ReportPage from "@/components/report-page";

export const metadata: Metadata = {
  title: "Physical AI: A Government Agenda | VisionSeek",
  description: "A VisionSeek government brief on turning physical AI into national capability, public value, and trusted infrastructure.",
  alternates: { canonical: "/leaders-house/physical-ai", languages: { en: "/leaders-house/physical-ai", ar: "/ar/leaders-house/physical-ai" } },
};

export default function PhysicalAIReport() { return <ReportPage locale="en" />; }

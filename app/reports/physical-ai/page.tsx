import type { Metadata } from "next";
import ReportReader from "@/components/reports/reader";
export const metadata: Metadata = { title: "Physical AI | VisionSeek Reports", description: "An archival VisionSeek strategic brief with references and limitations.", alternates: {canonical: "/leaders-house/physical-ai", languages: {ar:"/ar/reports/physical-ai",en:"/reports/physical-ai"}} };
export default function Page(){return <ReportReader locale="en"/>;}

import type { Metadata } from "next";
import ReportReader from "@/components/reports/reader";
export const metadata: Metadata = { title: "الذكاء الاصطناعي المادي | تقارير VisionSeek", description: "إحاطة استراتيجية من أرشيف VisionSeek مع مراجعها وحدود استخدامها.", alternates: {canonical: "/ar/insights/physical-ai", languages: {ar:"/ar/reports/physical-ai",en:"/reports/physical-ai"}} };
export default function Page(){return <ReportReader locale="ar"/>;}

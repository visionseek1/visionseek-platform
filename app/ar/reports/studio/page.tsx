import type { Metadata } from "next";
import ReportsStudio from "@/components/reports/studio";
export const metadata:Metadata={title:"إدارة التقارير | VisionSeek",robots:{index:false,follow:false}};
export default function Page(){return <ReportsStudio locale="ar"/>;}

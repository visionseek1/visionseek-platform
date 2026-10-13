import type { Metadata } from "next";
import AgentGovernanceBrief from "@/components/reports/agent-governance";
export const metadata: Metadata = { title: "حين يتصرّف الوكيل، مَن يُسأل؟ | VisionSeek", description: "حوكمة الوكلاء الأذكياء في الخليج ومصر: ما الذي يفرضه القانون اليوم، بمصادره.", alternates: {canonical: "/ar/reports/agent-governance", languages: {ar:"/ar/reports/agent-governance",en:"/reports/agent-governance"}} };
export default function Page(){return <AgentGovernanceBrief locale="ar"/>;}

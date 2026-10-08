import type { Metadata } from "next";
import AgentGovernanceBrief from "@/components/reports/agent-governance";
export const metadata: Metadata = { title: "When the agent acts, who answers for it? | VisionSeek", description: "AI agent governance in the Gulf and Egypt: what the law already demands, with sources.", alternates: {canonical: "/reports/agent-governance", languages: {ar:"/ar/reports/agent-governance",en:"/reports/agent-governance"}} };
export default function Page(){return <AgentGovernanceBrief locale="en"/>;}

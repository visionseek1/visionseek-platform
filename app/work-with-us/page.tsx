import type { Metadata } from "next";
import InteriorPage from "@/components/capability/interior-page";
export const metadata: Metadata = { title: "Work with VisionSeek | VisionSeek", description: "Define the capability. Assemble the right people and the best available knowledge and technology. Prove, operate and evolve.", alternates: { canonical: "/work-with-us", languages: { en: "/work-with-us", ar: "/ar/work-with-us" } }, openGraph: { title: "Work with VisionSeek | VisionSeek", url: "/work-with-us" } };
export default function Page() { return <InteriorPage locale="en" kind="work-with-us"/>; }

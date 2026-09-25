import type { Metadata } from "next";
import InteriorPage from "@/components/capability/interior-page";
export const metadata: Metadata = { title: "About VisionSeek | VisionSeek", description: "Define the capability. Assemble the right people and the best available knowledge and technology. Prove, operate and evolve.", alternates: { canonical: "/about", languages: { en: "/about", ar: "/ar/about" } }, openGraph: { title: "About VisionSeek | VisionSeek", url: "/about" } };
export default function Page() { return <InteriorPage locale="en" kind="about"/>; }

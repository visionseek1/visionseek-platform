import type { Metadata } from "next";
import InteriorPage from "@/components/capability/interior-page";
export const metadata: Metadata = { title: "Our Method | VisionSeek", description: "Define the capability. Assemble the right people and the best available knowledge and technology. Prove, operate and evolve.", alternates: { canonical: "/method", languages: { en: "/method", ar: "/ar/method" } }, openGraph: { title: "Our Method | VisionSeek", url: "/method" } };
export default function Page() { return <InteriorPage locale="en" kind="method"/>; }

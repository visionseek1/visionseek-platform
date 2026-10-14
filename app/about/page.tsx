import type { Metadata } from "next";
import {OG_IMAGES} from '@/lib/seo';
import InteriorPage from "@/components/capability/interior-page";
export const metadata: Metadata = { title: "About VisionSeek | VisionSeek", description: "Define the capability. Assemble the right people and the best available knowledge and technology. Prove, operate and evolve.", alternates: { canonical: "/about", languages: { en: "/about", ar: "/ar/about" } }, openGraph: { images:OG_IMAGES,title: "About VisionSeek | VisionSeek", url: "/about" } };
export default function Page() { return <InteriorPage locale="en" kind="about"/>; }

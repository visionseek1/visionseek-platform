import type { Metadata } from "next";
import InteriorPage from "@/components/capability/interior-page";
export const metadata: Metadata = { title: "عن VisionSeek | VisionSeek", description: "نحدد القدرة ونجمّع الأشخاص والمعرفة والتقنيات لبنائها واختبارها وتشغيلها.", alternates: { canonical: "/ar/about", languages: { en: "/about", ar: "/ar/about" } }, openGraph: { title: "عن VisionSeek | VisionSeek", url: "/ar/about" } };
export default function Page() { return <InteriorPage locale="ar" kind="about"/>; }

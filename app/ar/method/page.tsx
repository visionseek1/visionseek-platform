import type { Metadata } from "next";
import InteriorPage from "@/components/capability/interior-page";
export const metadata: Metadata = { title: "منهجنا | VisionSeek", description: "نحدد القدرة ونجمّع الأشخاص والمعرفة والتقنيات لبنائها واختبارها وتشغيلها.", alternates: { canonical: "/ar/method", languages: { en: "/method", ar: "/ar/method" } }, openGraph: { title: "منهجنا | VisionSeek", url: "/ar/method" } };
export default function Page() { return <InteriorPage locale="ar" kind="method"/>; }

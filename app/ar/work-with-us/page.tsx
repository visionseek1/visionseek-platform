import type { Metadata } from "next";
import InteriorPage from "@/components/capability/interior-page";
export const metadata: Metadata = { title: "اعمل معنا | VisionSeek", description: "نحدد القدرة ونجمّع الأشخاص والمعرفة والتقنيات لبنائها واختبارها وتشغيلها.", alternates: { canonical: "/ar/work-with-us", languages: { en: "/work-with-us", ar: "/ar/work-with-us" } }, openGraph: { title: "اعمل معنا | VisionSeek", url: "/ar/work-with-us" } };
export default function Page() { return <InteriorPage locale="ar" kind="work-with-us"/>; }

import type {Metadata} from "next";
import {SystemView} from "@/components/medical/pages";
import {medical} from "@/lib/medical";

const title = `${medical.system.title.ar} | VisionSeek`;
const description = medical.system.intro.ar;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/ar/system", languages: {en: "/system", ar: "/ar/system"}},
  openGraph: {title, description, url: "/ar/system"},
};

export default function Page() {
  return <SystemView locale="ar" />;
}

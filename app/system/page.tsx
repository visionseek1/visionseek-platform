import type {Metadata} from "next";
import {SystemPage} from "@/components/preview/interior";
import {medical} from "@/lib/medical";

const title = `${medical.system.title.en} | VisionSeek`;
const description = medical.system.intro.en;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/system", languages: {en: "/system", ar: "/ar/system"}},
  openGraph: {title, description, url: "/system"},
};

export default function Page() {
  return <SystemPage locale="en" />;
}

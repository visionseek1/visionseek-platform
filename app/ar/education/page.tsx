import type {Metadata} from "next";
import {EducationView} from "@/components/medical/pages";
import {medical} from "@/lib/medical";

const title = `${medical.education.title.ar} | VisionSeek`;
const description = medical.education.intro.ar;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/ar/education", languages: {en: "/education", ar: "/ar/education"}},
  openGraph: {title, description, url: "/ar/education"},
};

export default function Page() {
  return <EducationView locale="ar" />;
}

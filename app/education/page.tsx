import type {Metadata} from "next";
import {EducationPage} from "@/components/preview/interior";
import {medical} from "@/lib/medical";

const title = `${medical.education.title.en} | VisionSeek`;
const description = medical.education.intro.en;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/education", languages: {en: "/education", ar: "/ar/education"}},
  openGraph: {title, description, url: "/education"},
};

export default function Page() {
  return <EducationPage locale="en" />;
}

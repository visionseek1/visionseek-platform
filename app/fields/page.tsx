import type {Metadata} from "next";
import {FieldsPage} from "@/components/preview/interior";
import {medical} from "@/lib/medical";

const title = `${medical.fieldsPage.title.en} | VisionSeek`;
const description = medical.fieldsPage.intro.en;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/fields", languages: {en: "/fields", ar: "/ar/fields"}},
  openGraph: {title, description, url: "/fields"},
};

export default function Page() {
  return <FieldsPage locale="en" />;
}

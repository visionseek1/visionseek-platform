import type {Metadata} from "next";
import {FieldsView} from "@/components/medical/pages";
import {medical} from "@/lib/medical";

const title = `${medical.fieldsPage.title.ar} | VisionSeek`;
const description = medical.fieldsPage.intro.ar;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/ar/fields", languages: {en: "/fields", ar: "/ar/fields"}},
  openGraph: {title, description, url: "/ar/fields"},
};

export default function Page() {
  return <FieldsView locale="ar" />;
}

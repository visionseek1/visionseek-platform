import type { Metadata } from "next";
import WorkshopsSectionPage from "@/components/workshops/section-page";
import { workshopSection } from "@/lib/workshops/section";

const text = workshopSection("ar");

export const metadata: Metadata = {
  title: `${text.name} | VisionSeek`,
  description: text.promise,
  alternates: {
    canonical: "/ar/workshops",
    languages: { en: "/workshops", ar: "/ar/workshops" },
  },
  openGraph: {
    title: `${text.name} | VisionSeek`,
    description: text.promise,
    url: "/ar/workshops",
  },
};

export default function Page() {
  return <WorkshopsSectionPage locale="ar" />;
}

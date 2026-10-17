import type {Metadata} from "next";
import BiohealthPage from "@/components/biohealth/biohealth-page";

export const metadata: Metadata = {
  title: "VisionSeek BioHealth | Sovereign Biomanufacturing & Clinical Intelligence",
  description: "From molecular compute to bioprocess. South Korea to the Arab world.",
  alternates: {canonical: "/biohealth", languages: {en: "/biohealth", ar: "/ar/biohealth"}},
};

export default function Page() {
  return <BiohealthPage locale="en"/>;
}

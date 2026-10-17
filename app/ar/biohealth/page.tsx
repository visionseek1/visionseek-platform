import type {Metadata} from "next";
import BiohealthPage from "@/components/biohealth/biohealth-page";

export const metadata: Metadata = {
  title: "الذراع الحيوي | VisionSeek BioHealth",
  description: "من المعالجة الجزيئية إلى سيادة التصنيع الدوائي. من كوريا الجنوبية إلى الخليج ومصر.",
  alternates: {canonical: "/ar/biohealth", languages: {en: "/biohealth", ar: "/ar/biohealth"}},
};

export default function Page() {
  return <BiohealthPage locale="ar"/>;
}

import type {Metadata} from "next";
import DomainsPage from "@/components/domains/domains-page";

export const metadata: Metadata = {
  title: "قطاعات القدرات الحرجة | VisionSeek",
  description: "أربعة قطاعات للقدرات الحرجة، من كوريا الجنوبية إلى العالم العربي.",
  alternates: {canonical: "/ar/domains", languages: {en: "/domains", ar: "/ar/domains"}},
};

export default function Page() {
  return <DomainsPage locale="ar"/>;
}

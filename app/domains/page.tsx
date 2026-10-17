import type {Metadata} from "next";
import DomainsPage from "@/components/domains/domains-page";

export const metadata: Metadata = {
  title: "Capability domains | VisionSeek",
  description: "Four critical capability domains, from South Korea to the Arab world.",
  alternates: {canonical: "/domains", languages: {en: "/domains", ar: "/ar/domains"}},
};

export default function Page() {
  return <DomainsPage locale="en"/>;
}

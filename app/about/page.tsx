import type {Metadata} from "next";
import AboutStudio from "@/components/capability/about-studio";

const description = "VisionSeek is a cross-sector studio for opportunities, capabilities and solutions. From South Korea, we connect Arab institutions to the capability they need, and build it with them so it stays theirs.";

export const metadata: Metadata = {
  title: "About VisionSeek | VisionSeek",
  description,
  alternates: {canonical: "/about", languages: {en: "/about", ar: "/ar/about"}},
  openGraph: {title: "About VisionSeek | VisionSeek", description, url: "/about"},
};

export default function Page() {
  return <AboutStudio locale="en"/>;
}

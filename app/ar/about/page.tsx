import type {Metadata} from "next";
import AboutStudio from "@/components/capability/about-studio";

const description = "VisionSeek استوديو للفرص والقدرات والحلول العابرة للقطاعات. من كوريا الجنوبية، نصل المؤسسات العربية بالقدرة التي تحتاجها، ونبنيها معها لتبقى ملكًا لها.";

export const metadata: Metadata = {
  title: "عن VisionSeek | VisionSeek",
  description,
  alternates: {canonical: "/ar/about", languages: {en: "/about", ar: "/ar/about"}},
  openGraph: {title: "عن VisionSeek | VisionSeek", description, url: "/ar/about"},
};

export default function Page() {
  return <AboutStudio locale="ar"/>;
}

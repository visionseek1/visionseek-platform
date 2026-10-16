import type {Metadata} from "next";
import copy from "@/content/home-directions.json";
import HomeDirection from "@/components/preview/home-direction";

export const metadata: Metadata = {
  title: "VisionSeek | The medical field",
  description: copy.hero.sentence.en,
  alternates: {canonical: "/", languages: {en: "/", ar: "/ar"}},
  openGraph: {title: "VisionSeek | The medical field", description: copy.hero.sentence.en, url: "/"},
};

export default function Home() {
  return <HomeDirection locale="en" />;
}

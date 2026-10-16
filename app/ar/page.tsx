import type {Metadata} from "next";
import copy from "@/content/home-directions.json";
import HomeDirection from "@/components/preview/home-direction";

const title = "VisionSeek | المجال الطبي";
const description = copy.hero.sentence.ar;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/ar", languages: {en: "/", ar: "/ar"}},
  openGraph: {title, description, url: "/ar"},
};

export default function ArabicHome() {
  return <HomeDirection locale="ar" />;
}

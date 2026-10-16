import type {Metadata} from "next";
import HomeDirection from "@/components/preview/home-direction";

export const metadata: Metadata = {
  title: "اتجاه أ | VisionSeek",
  robots: {index: false, follow: false, googleBot: {index: false, follow: false}},
  alternates: {canonical: "/ar/preview/home-a", languages: {en: "/preview/home-a", ar: "/ar/preview/home-a"}},
};

export default function Page() {
  return <HomeDirection locale="ar" path="/preview/home-a" />;
}

import type {Metadata} from "next";
import HomeDirection from "@/components/preview/home-direction";

export const metadata: Metadata = {
  title: "Direction A | VisionSeek",
  robots: {index: false, follow: false, googleBot: {index: false, follow: false}},
  alternates: {canonical: "/preview/home-a", languages: {en: "/preview/home-a", ar: "/ar/preview/home-a"}},
};

export default function Page() {
  return <HomeDirection locale="en" tone="a" />;
}

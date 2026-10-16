import type {Metadata} from "next";
import HomeDirection from "@/components/preview/home-direction";
import {kufi} from "@/components/preview/kufi";

export const metadata: Metadata = {
  title: "Direction B | VisionSeek",
  robots: {index: false, follow: false, googleBot: {index: false, follow: false}},
  alternates: {canonical: "/preview/home-b", languages: {en: "/preview/home-b", ar: "/ar/preview/home-b"}},
};

export default function Page() {
  return <HomeDirection locale="en" tone="b" fontClass={kufi.variable} />;
}

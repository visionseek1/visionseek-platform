import type {Metadata} from "next";
import {AboutPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "About VisionSeek",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/about",
    "languages": {
      "ar": "/ar/about",
      "en": "/about",
      "ko": "/ko/about"
    }
  },
  "openGraph": {
    "title": "About VisionSeek",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/about",
    "locale": "en_US"
  }
};
export default function Page(){return <AboutPage locale="en"/>;}

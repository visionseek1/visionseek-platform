import type {Metadata} from "next";
import {PharmaceuticalPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "Pharmaceuticals | VisionSeek",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/pharmaceuticals",
    "languages": {
      "ar": "/ar/pharmaceuticals",
      "en": "/pharmaceuticals",
      "ko": "/ko/pharmaceuticals"
    }
  },
  "openGraph": {
    "title": "Pharmaceuticals | VisionSeek",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/pharmaceuticals",
    "locale": "en_US"
  }
};
export default function Page(){return <PharmaceuticalPage locale="en"/>;}

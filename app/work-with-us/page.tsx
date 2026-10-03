import type {Metadata} from "next";
import {WorkPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "Work with us | VisionSeek",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/work-with-us",
    "languages": {
      "ar": "/ar/work-with-us",
      "en": "/work-with-us",
      "ko": "/ko/work-with-us"
    }
  },
  "openGraph": {
    "title": "Work with us | VisionSeek",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/work-with-us",
    "locale": "en_US"
  }
};
export default function Page(){return <WorkPage locale="en"/>;}

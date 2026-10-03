import type {Metadata} from "next";
import {AboutPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "Critical Capability Transfer",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/about/what-we-do",
    "languages": {
      "ar": "/ar/about/what-we-do",
      "en": "/about/what-we-do",
      "ko": "/ko/about/what-we-do"
    }
  },
  "openGraph": {
    "title": "Critical Capability Transfer",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/about/what-we-do",
    "locale": "en_US"
  }
};
export default function Page(){return <AboutPage locale="en" overview/>;}

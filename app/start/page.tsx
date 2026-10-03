import type {Metadata} from "next";
import FocusContact from "@/components/focus/contact-form";
export const metadata:Metadata={
  "title": "Discuss your need or introduce your capability",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/start",
    "languages": {
      "ar": "/ar/start",
      "en": "/start",
      "ko": "/ko/start"
    }
  },
  "openGraph": {
    "title": "Discuss your need or introduce your capability",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/start",
    "locale": "en_US"
  }
};
export default function Page(){return <FocusContact locale="en"/>;}

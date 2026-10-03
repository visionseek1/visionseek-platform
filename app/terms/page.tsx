import type {Metadata} from "next";
import FocusLegal from "@/components/focus/legal";
export const metadata:Metadata={
  "title": "Terms | VisionSeek",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/terms",
    "languages": {
      "ar": "/ar/terms",
      "en": "/terms",
      "ko": "/ko/terms"
    }
  },
  "openGraph": {
    "title": "Terms | VisionSeek",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/terms",
    "locale": "en_US"
  }
};
export default function Page(){return <FocusLegal locale="en" kind="terms"/>;}

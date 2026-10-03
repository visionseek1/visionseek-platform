import type {Metadata} from "next";
import FocusLegal from "@/components/focus/legal";
export const metadata:Metadata={
  "title": "Privacy & data | VisionSeek",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/privacy",
    "languages": {
      "ar": "/ar/privacy",
      "en": "/privacy",
      "ko": "/ko/privacy"
    }
  },
  "openGraph": {
    "title": "Privacy & data | VisionSeek",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/privacy",
    "locale": "en_US"
  }
};
export default function Page(){return <FocusLegal locale="en" kind="privacy"/>;}

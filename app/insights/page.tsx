import type {Metadata} from "next";
import FocusLeaders from "@/components/focus/leaders";
export const metadata:Metadata={
  "title": "Leaders House | Health & pharmaceuticals",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/insights",
    "languages": {
      "ar": "/ar/insights",
      "en": "/insights",
      "ko": "/ko/insights"
    }
  },
  "openGraph": {
    "title": "Leaders House | Health & pharmaceuticals",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/insights",
    "locale": "en_US"
  }
};
export default function Page(){return <FocusLeaders locale="en"/>;}

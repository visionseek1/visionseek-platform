import type {Metadata} from "next";
import HomePage from "@/components/home-page";
export const metadata:Metadata={
  "title": "VisionSeek | Make It Possible.",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/",
    "languages": {
      "ar": "/ar",
      "en": "/",
      "ko": "/ko"
    }
  },
  "openGraph": {
    "title": "VisionSeek | Make It Possible.",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/",
    "locale": "en_US"
  }
};
export default function Page(){return <HomePage locale="en"/>;}

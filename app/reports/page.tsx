import type {Metadata} from "next";
import FocusReports from "@/components/focus/reports";
export const metadata:Metadata={
  "title": "Reports | VisionSeek",
  "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
  "alternates": {
    "canonical": "/reports",
    "languages": {
      "ar": "/ar/reports",
      "en": "/reports",
      "ko": "/ko/reports"
    }
  },
  "openGraph": {
    "title": "Reports | VisionSeek",
    "description": "We transfer critical capabilities already working in Korea to institutions in Egypt and the Gulf. Pharmaceuticals is our first specialization.",
    "url": "/reports",
    "locale": "en_US"
  }
};
export default function Page(){return <FocusReports locale="en"/>;}

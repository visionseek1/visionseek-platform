import type {Metadata} from "next";
import HomePage from "@/components/home-page";
export const metadata:Metadata={
  "title": "VisionSeek | Make It Possible.",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko",
    "languages": {
      "ar": "/ar",
      "en": "/",
      "ko": "/ko"
    }
  },
  "openGraph": {
    "title": "VisionSeek | Make It Possible.",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko",
    "locale": "ko_KR"
  }
};
export default function Page(){return <HomePage locale="ko"/>;}

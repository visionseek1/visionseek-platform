import type {Metadata} from "next";
import FocusReports from "@/components/focus/reports";
export const metadata:Metadata={
  "title": "보고서 | VisionSeek",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko/reports",
    "languages": {
      "ar": "/ar/reports",
      "en": "/reports",
      "ko": "/ko/reports"
    }
  },
  "openGraph": {
    "title": "보고서 | VisionSeek",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko/reports",
    "locale": "ko_KR"
  }
};
export default function Page(){return <FocusReports locale="ko"/>;}

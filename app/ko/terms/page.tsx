import type {Metadata} from "next";
import FocusLegal from "@/components/focus/legal";
export const metadata:Metadata={
  "title": "이용약관 | VisionSeek",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko/terms",
    "languages": {
      "ar": "/ar/terms",
      "en": "/terms",
      "ko": "/ko/terms"
    }
  },
  "openGraph": {
    "title": "이용약관 | VisionSeek",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko/terms",
    "locale": "ko_KR"
  }
};
export default function Page(){return <FocusLegal locale="ko" kind="terms"/>;}

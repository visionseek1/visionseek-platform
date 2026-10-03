import type {Metadata} from "next";
import FocusLegal from "@/components/focus/legal";
export const metadata:Metadata={
  "title": "개인정보 및 데이터 | VisionSeek",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko/privacy",
    "languages": {
      "ar": "/ar/privacy",
      "en": "/privacy",
      "ko": "/ko/privacy"
    }
  },
  "openGraph": {
    "title": "개인정보 및 데이터 | VisionSeek",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko/privacy",
    "locale": "ko_KR"
  }
};
export default function Page(){return <FocusLegal locale="ko" kind="privacy"/>;}

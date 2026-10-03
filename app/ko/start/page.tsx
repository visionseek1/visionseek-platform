import type {Metadata} from "next";
import FocusContact from "@/components/focus/contact-form";
export const metadata:Metadata={
  "title": "기관의 필요 또는 보유 역량 상담",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko/start",
    "languages": {
      "ar": "/ar/start",
      "en": "/start",
      "ko": "/ko/start"
    }
  },
  "openGraph": {
    "title": "기관의 필요 또는 보유 역량 상담",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko/start",
    "locale": "ko_KR"
  }
};
export default function Page(){return <FocusContact locale="ko"/>;}

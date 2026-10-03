import type {Metadata} from "next";
import FocusLeaders from "@/components/focus/leaders";
export const metadata:Metadata={
  "title": "리더스 하우스 | 보건·제약",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko/insights",
    "languages": {
      "ar": "/ar/insights",
      "en": "/insights",
      "ko": "/ko/insights"
    }
  },
  "openGraph": {
    "title": "리더스 하우스 | 보건·제약",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko/insights",
    "locale": "ko_KR"
  }
};
export default function Page(){return <FocusLeaders locale="ko"/>;}

import type {Metadata} from "next";
import {PharmaceuticalPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "제약 | VisionSeek",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko/pharmaceuticals",
    "languages": {
      "ar": "/ar/pharmaceuticals",
      "en": "/pharmaceuticals",
      "ko": "/ko/pharmaceuticals"
    }
  },
  "openGraph": {
    "title": "제약 | VisionSeek",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko/pharmaceuticals",
    "locale": "ko_KR"
  }
};
export default function Page(){return <PharmaceuticalPage locale="ko"/>;}

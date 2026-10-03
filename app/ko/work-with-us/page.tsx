import type {Metadata} from "next";
import {WorkPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "협력 문의 | VisionSeek",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko/work-with-us",
    "languages": {
      "ar": "/ar/work-with-us",
      "en": "/work-with-us",
      "ko": "/ko/work-with-us"
    }
  },
  "openGraph": {
    "title": "협력 문의 | VisionSeek",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko/work-with-us",
    "locale": "ko_KR"
  }
};
export default function Page(){return <WorkPage locale="ko"/>;}

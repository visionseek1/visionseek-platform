import type {Metadata} from "next";
import {AboutPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "핵심 역량 이전",
  "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
  "alternates": {
    "canonical": "/ko/about/what-we-do",
    "languages": {
      "ar": "/ar/about/what-we-do",
      "en": "/about/what-we-do",
      "ko": "/ko/about/what-we-do"
    }
  },
  "openGraph": {
    "title": "핵심 역량 이전",
    "description": "한국에서 실제 활용되는 핵심 역량을 이집트와 걸프 지역 기관으로 이전합니다. 제약이 첫 번째 전문 분야입니다.",
    "url": "/ko/about/what-we-do",
    "locale": "ko_KR"
  }
};
export default function Page(){return <AboutPage locale="ko" overview/>;}

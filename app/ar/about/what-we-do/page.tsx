import type {Metadata} from "next";
import {AboutPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "نقل القدرات الحرجة",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/about/what-we-do",
    "languages": {
      "ar": "/ar/about/what-we-do",
      "en": "/about/what-we-do",
      "ko": "/ko/about/what-we-do"
    }
  },
  "openGraph": {
    "title": "نقل القدرات الحرجة",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/about/what-we-do",
    "locale": "ar_EG"
  }
};
export default function Page(){return <AboutPage locale="ar" overview/>;}

import type {Metadata} from "next";
import {AboutPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "عن VisionSeek",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/about",
    "languages": {
      "ar": "/ar/about",
      "en": "/about",
      "ko": "/ko/about"
    }
  },
  "openGraph": {
    "title": "عن VisionSeek",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/about",
    "locale": "ar_EG"
  }
};
export default function Page(){return <AboutPage locale="ar"/>;}

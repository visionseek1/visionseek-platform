import type {Metadata} from "next";
import {PharmaceuticalPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "الصناعة الدوائية | VisionSeek",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/pharmaceuticals",
    "languages": {
      "ar": "/ar/pharmaceuticals",
      "en": "/pharmaceuticals",
      "ko": "/ko/pharmaceuticals"
    }
  },
  "openGraph": {
    "title": "الصناعة الدوائية | VisionSeek",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/pharmaceuticals",
    "locale": "ar_EG"
  }
};
export default function Page(){return <PharmaceuticalPage locale="ar"/>;}

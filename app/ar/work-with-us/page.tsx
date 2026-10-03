import type {Metadata} from "next";
import {WorkPage} from "@/components/focus/pages";
export const metadata:Metadata={
  "title": "اعمل معنا | VisionSeek",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/work-with-us",
    "languages": {
      "ar": "/ar/work-with-us",
      "en": "/work-with-us",
      "ko": "/ko/work-with-us"
    }
  },
  "openGraph": {
    "title": "اعمل معنا | VisionSeek",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/work-with-us",
    "locale": "ar_EG"
  }
};
export default function Page(){return <WorkPage locale="ar"/>;}

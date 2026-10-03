import type {Metadata} from "next";
import FocusLegal from "@/components/focus/legal";
export const metadata:Metadata={
  "title": "شروط الاستخدام | VisionSeek",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/terms",
    "languages": {
      "ar": "/ar/terms",
      "en": "/terms",
      "ko": "/ko/terms"
    }
  },
  "openGraph": {
    "title": "شروط الاستخدام | VisionSeek",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/terms",
    "locale": "ar_EG"
  }
};
export default function Page(){return <FocusLegal locale="ar" kind="terms"/>;}

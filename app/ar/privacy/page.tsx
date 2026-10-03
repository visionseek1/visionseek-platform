import type {Metadata} from "next";
import FocusLegal from "@/components/focus/legal";
export const metadata:Metadata={
  "title": "الخصوصية والبيانات | VisionSeek",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/privacy",
    "languages": {
      "ar": "/ar/privacy",
      "en": "/privacy",
      "ko": "/ko/privacy"
    }
  },
  "openGraph": {
    "title": "الخصوصية والبيانات | VisionSeek",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/privacy",
    "locale": "ar_EG"
  }
};
export default function Page(){return <FocusLegal locale="ar" kind="privacy"/>;}

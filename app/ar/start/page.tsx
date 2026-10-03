import type {Metadata} from "next";
import FocusContact from "@/components/focus/contact-form";
export const metadata:Metadata={
  "title": "ناقش احتياجك أو عرّفنا بقدرتك",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/start",
    "languages": {
      "ar": "/ar/start",
      "en": "/start",
      "ko": "/ko/start"
    }
  },
  "openGraph": {
    "title": "ناقش احتياجك أو عرّفنا بقدرتك",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/start",
    "locale": "ar_EG"
  }
};
export default function Page(){return <FocusContact locale="ar"/>;}

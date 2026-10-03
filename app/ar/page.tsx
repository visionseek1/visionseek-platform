import type {Metadata} from "next";
import HomePage from "@/components/home-page";
export const metadata:Metadata={
  "title": "VisionSeek | Make It Possible.",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar",
    "languages": {
      "ar": "/ar",
      "en": "/",
      "ko": "/ko"
    }
  },
  "openGraph": {
    "title": "VisionSeek | Make It Possible.",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar",
    "locale": "ar_EG"
  }
};
export default function Page(){return <HomePage locale="ar"/>;}

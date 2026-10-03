import type {Metadata} from "next";
import FocusReports from "@/components/focus/reports";
export const metadata:Metadata={
  "title": "التقارير | VisionSeek",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/reports",
    "languages": {
      "ar": "/ar/reports",
      "en": "/reports",
      "ko": "/ko/reports"
    }
  },
  "openGraph": {
    "title": "التقارير | VisionSeek",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/reports",
    "locale": "ar_EG"
  }
};
export default function Page(){return <FocusReports locale="ar"/>;}

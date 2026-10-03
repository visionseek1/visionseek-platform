import type {Metadata} from "next";
import FocusLeaders from "@/components/focus/leaders";
export const metadata:Metadata={
  "title": "بيت القادة | الصحة والدواء",
  "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
  "alternates": {
    "canonical": "/ar/insights",
    "languages": {
      "ar": "/ar/insights",
      "en": "/insights",
      "ko": "/ko/insights"
    }
  },
  "openGraph": {
    "title": "بيت القادة | الصحة والدواء",
    "description": "ننقل القدرات الحرجة التي تعمل بالفعل في كوريا إلى مؤسسات في مصر والخليج. الصناعة الدوائية أول تخصص نركز عليه.",
    "url": "/ar/insights",
    "locale": "ar_EG"
  }
};
export default function Page(){return <FocusLeaders locale="ar"/>;}

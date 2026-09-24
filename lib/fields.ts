export type Field = {
  id: string;
  title: string;
  english: string;
  description: string;
  englishDescription: string;
  topics: string[];
  image: string;
  alt: string;
};

export const fields: Field[] = [
  { id: "space", title: "الفضاء والصواريخ", english: "Space & Aerospace", description: "أنظمة وتقنيات تفتح فرصًا جديدة في الفضاء والطيران.", englishDescription: "Systems and technologies opening new possibilities across space and aerospace.", topics: ["Space + Aerospace"], image: "/field-space.jpg", alt: "صاروخ ينطلق إلى الفضاء وقت الغروب" },
  { id: "drones", title: "الدرونز والأنظمة الجوية", english: "Drones & Aerial Systems", description: "منصات جوية ذكية للنقل والمراقبة والخدمات اللوجستية.", englishDescription: "Intelligent aerial platforms for transport, observation, and logistics.", topics: ["Transport", "Logistics"], image: "/field-drones.jpg", alt: "درون حديث يحلق في الهواء" },
  { id: "cities", title: "مدن المستقبل", english: "Future Cities", description: "بنية تحتية مترابطة تجعل المدن أكثر ذكاءً واستجابة.", englishDescription: "Connected infrastructure that makes cities more intelligent and responsive.", topics: ["Connectivity", "Computing + AI"], image: "/field-cities.jpg", alt: "شبكات رقمية ترمز إلى مدن المستقبل" },
  { id: "science", title: "العلم والصحة", english: "Science & Health", description: "تحويل الاكتشاف العلمي إلى حلول تحسن صحة الإنسان.", englishDescription: "Turning scientific discovery into solutions that improve human health.", topics: ["Health"], image: "/field-science.jpg", alt: "باحث يعمل داخل مختبر حديث" },
  { id: "energy", title: "الطاقة والمناخ", english: "Energy & Climate", description: "أنظمة طاقة مرنة وحلول عملية لمستقبل منخفض الكربون.", englishDescription: "Resilient energy systems and practical solutions for a low-carbon future.", topics: ["Energy", "Sustainability"], image: "/field-energy.jpg", alt: "ألواح شمسية وتوربينات رياح" },
  { id: "robots", title: "الروبوتات والصناعة الذكية", english: "Robotics & Smart Industry", description: "روبوتات وذكاء اصطناعي يعيدان تشكيل الإنتاج والعمل.", englishDescription: "Robotics and artificial intelligence reshaping production and work.", topics: ["Robotics", "Computing + AI"], image: "/field-industry.jpg", alt: "روبوتات داخل مصنع متقدم" },
  { id: "agriculture", title: "الزراعة والغذاء المستدام", english: "Agriculture & Sustainable Food", description: "تقنيات تعزز الإنتاج الزراعي وتبني نظمًا غذائية مستدامة.", englishDescription: "Technologies that strengthen agriculture and build sustainable food systems.", topics: ["Sustainability"], image: "/field-food.jpg", alt: "صوب زراعية حديثة من الجو" },
  { id: "chips", title: "الرقائق والمواد", english: "Chips & Materials", description: "رقائق ومواد متقدمة تفتح قدرات جديدة في الحوسبة والتصنيع.", englishDescription: "Chips and advanced materials opening new capabilities in computing and manufacturing.", topics: ["Computing + AI"], image: "/field-chips.jpg", alt: "رقائق إلكترونية ومواد متقدمة" },
];

export const fieldTopics = [
  "All Projects",
  "Space + Aerospace",
  "Computing + AI",
  "Connectivity",
  "Energy",
  "Health",
  "Logistics",
  "Robotics",
  "Sustainability",
  "Transport",
  "Waste",
];

export const fieldTopicArabic: Record<string, string> = {
  "All Projects": "كل المجالات",
  "Space + Aerospace": "الفضاء والطيران",
  "Computing + AI": "الحوسبة والذكاء الاصطناعي",
  Connectivity: "الاتصال",
  Energy: "الطاقة",
  Health: "الصحة",
  Logistics: "الخدمات اللوجستية",
  Robotics: "الروبوتات",
  Sustainability: "الاستدامة",
  Transport: "النقل",
  Waste: "المخلفات",
};

export function fieldById(id: string) {
  return fields.find((field) => field.id === id) ?? null;
}

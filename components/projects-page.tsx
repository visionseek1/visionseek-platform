"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SiteHeader from "@/components/site-header";

const projects = [
  { id: "space", title: "الفضاء والصواريخ", english: "Space & Aerospace", description: "أنظمة وتقنيات تفتح فرصًا جديدة في الفضاء والطيران.", englishDescription: "Systems and technologies opening new possibilities across space and aerospace.", topics: ["Space + Aerospace"], image: "/field-space.jpg" },
  { id: "drones", title: "الدرونز والأنظمة الجوية", english: "Drones & Aerial Systems", description: "منصات جوية ذكية للنقل والمراقبة والخدمات اللوجستية.", englishDescription: "Intelligent aerial platforms for transport, observation, and logistics.", topics: ["Transport", "Logistics"], image: "/field-drones.jpg" },
  { id: "cities", title: "مدن المستقبل", english: "Future Cities", description: "بنية تحتية مترابطة تجعل المدن أكثر ذكاءً واستجابة.", englishDescription: "Connected infrastructure that makes cities more intelligent and responsive.", topics: ["Connectivity", "Computing + AI"], image: "/field-cities.jpg" },
  { id: "science", title: "العلم والصحة", english: "Science & Health", description: "تحويل الاكتشاف العلمي إلى حلول تحسن صحة الإنسان.", englishDescription: "Turning scientific discovery into solutions that improve human health.", topics: ["Health"], image: "/field-science.jpg" },
  { id: "energy", title: "الطاقة والمناخ", english: "Energy & Climate", description: "أنظمة طاقة مرنة وحلول عملية لمستقبل منخفض الكربون.", englishDescription: "Resilient energy systems and practical solutions for a low-carbon future.", topics: ["Energy", "Sustainability"], image: "/field-energy.jpg" },
  { id: "robots", title: "الروبوتات والصناعة الذكية", english: "Robotics & Smart Industry", description: "روبوتات وذكاء اصطناعي يعيدان تشكيل الإنتاج والعمل.", englishDescription: "Robotics and artificial intelligence reshaping production and work.", topics: ["Robotics", "Computing + AI"], image: "/field-industry.jpg" },
  { id: "agriculture", title: "الزراعة والغذاء المستدام", english: "Agriculture & Sustainable Food", description: "تقنيات تعزز الإنتاج الزراعي وتبني نظمًا غذائية مستدامة.", englishDescription: "Technologies that strengthen agriculture and build sustainable food systems.", topics: ["Sustainability"], image: "/field-food.jpg" },
  { id: "chips", title: "الرقائق والمواد", english: "Chips & Materials", description: "رقائق ومواد متقدمة تفتح قدرات جديدة في الحوسبة والتصنيع.", englishDescription: "Chips and advanced materials opening new capabilities in computing and manufacturing.", topics: ["Computing + AI"], image: "/field-chips.jpg" },
];

const topics = [
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

const topicArabic: Record<string, string> = {
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

export default function ProjectsPage({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  const [topic, setTopic] = useState("All Projects");
  const [status, setStatus] = useState("Exploring");

  const visibleProjects = useMemo(() => {
    if (status === "Announced") return [];
    if (topic === "All Projects") return projects;
    return projects.filter((project) => project.topics.includes(topic));
  }, [status, topic]);

  return (
    <main className={`projects-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <SiteHeader
        locale={locale}
        languageHref={ar ? "/projects" : "/ar/projects"}
        items={[
          { href: ar ? "/ar" : "/", label: ar ? "الرئيسية" : "HOME" },
          { href: ar ? "/ar/insights" : "/insights", label: ar ? "رؤى" : "INSIGHTS" },
          { href: ar ? "/ar#vision" : "/#vision", label: ar ? "الرؤية" : "VISION" },
          { href: ar ? "/ar#founder" : "/#founder", label: ar ? "المؤسس" : "FOUNDER" },
          { href: ar ? "/ar#contact" : "/#contact", label: ar ? "تواصل" : "CONTACT" },
        ]}
      />

      <section className="projects-hero">
        <p className="projects-kicker">VISIONSEEK / {ar ? "المجالات" : "FIELDS"}</p>
        <h1>{ar ? "المجالات" : "Fields"}</h1>
        <div className="projects-intro single-language">
          <p>{ar ? "ثمانية مجالات ننظر إليها. لا يوجد على هذه الصفحة مشروع مُعلن." : "Eight fields we are watching. No announced venture."}</p>
        </div>
      </section>

      <section className="projects-index">
        <aside className="project-filters" aria-label={ar ? "مرشحات المجالات" : "Field filters"}>
          <div className="filter-block">
            <h2>{ar ? "المجالات" : "Fields"}</h2>
            <button className={topic === "All Projects" ? "active" : ""} onClick={() => setTopic("All Projects")}>{ar ? "كل المجالات" : "All fields"}</button>
          </div>
          <div className="filter-block">
            <h2>{ar ? "الحالة" : "Status"}</h2>
            <button className={status === "Exploring" ? "active" : ""} onClick={() => setStatus("Exploring")}>{ar ? "قيد الاستكشاف" : "Exploring"}</button>
            <button className={status === "Announced" ? "active" : ""} onClick={() => setStatus("Announced")}>{ar ? "مُعلن" : "Announced"}</button>
          </div>
          <div className="filter-block">
            <h2>{ar ? "المجال" : "Topic"}</h2>
            {topics.slice(1).map((item) => (
              <button key={item} className={topic === item ? "active" : ""} onClick={() => { setTopic(item); setStatus("Exploring"); }}>
                {ar ? topicArabic[item] : item}
              </button>
            ))}
          </div>
        </aside>

        <div className="projects-list" aria-live="polite">
          {visibleProjects.length ? visibleProjects.map((project, index) => (
            <article className="project-row" id={project.id} key={project.id}>
              <div className="project-image">
                <Image src={project.image} alt={ar ? project.title : project.english} fill sizes="(max-width: 850px) 100vw, 58vw" />
              </div>
              <div className="project-meta">
                <span>{String(index + 1).padStart(2, "0")} / {ar ? "مجال" : "FIELD"}</span>
                <h2>{ar ? project.title : project.english}</h2>
                <p>{ar ? project.description : project.englishDescription}</p>
                <small>{project.topics.map((item) => ar ? topicArabic[item] : item).join(" · ")}</small>
              </div>
            </article>
          )) : (
            <div className="projects-empty">
              <span>{ar ? "مُعلن" : "ANNOUNCED"}</span>
              <h2>{ar ? "لا توجد مشروعات مُعلنة حتى الآن." : "No announced ventures yet."}</h2>
              <p>{ar ? "هذه الصفحة تعرض مجالات الاستكشاف، لا تسليمًا مكتملًا." : "This page lists fields of exploration, not completed delivery."}</p>
            </div>
          )}
        </div>
      </section>

      <section className="projects-contact">
        <p>{ar ? "هل ترى فرصة يمكن أن نبنيها معًا؟" : "Do you see an opportunity we can build together?"}</p>
        <a href="mailto:abdelalim@visionseek.org">{ar ? "ابدأ محادثة" : "START A CONVERSATION"} <span>↗</span></a>
        <nav className="footer-legal" aria-label={ar ? "روابط قانونية" : "Legal"}>
          <Link href={ar ? "/ar/privacy" : "/privacy"}>{ar ? "الخصوصية" : "PRIVACY"}</Link>
          <Link href={ar ? "/ar/terms" : "/terms"}>{ar ? "الشروط" : "TERMS"}</Link>
        </nav>
      </section>
    </main>
  );
}

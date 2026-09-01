"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const projects = [
  { id: "space", title: "الفضاء والصواريخ", english: "Space & Aerospace", topics: ["Space + Aerospace"], image: "/field-space.jpg" },
  { id: "drones", title: "الدرونز والأنظمة الجوية", english: "Drones & Aerial Systems", topics: ["Transport", "Logistics"], image: "/field-drones.jpg" },
  { id: "cities", title: "مدن المستقبل", english: "Future Cities", topics: ["Connectivity", "Computing + AI"], image: "/field-cities.jpg" },
  { id: "science", title: "العلم والصحة", english: "Science & Health", topics: ["Health"], image: "/field-science.jpg" },
  { id: "energy", title: "الطاقة والمناخ", english: "Energy & Climate", topics: ["Energy", "Sustainability"], image: "/field-energy.jpg" },
  { id: "robots", title: "الروبوتات والصناعة الذكية", english: "Robotics & Smart Industry", topics: ["Robotics", "Computing + AI"], image: "/field-industry.jpg" },
  { id: "agriculture", title: "الزراعة والغذاء المستدام", english: "Agriculture & Sustainable Food", topics: ["Sustainability"], image: "/field-food.jpg" },
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
  "All Projects": "كل المشروعات",
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
  const [status, setStatus] = useState("Current");

  const visibleProjects = useMemo(() => {
    if (status === "Graduated") return [];
    if (topic === "All Projects") return projects;
    return projects.filter((project) => project.topics.includes(topic));
  }, [status, topic]);

  return (
    <main className={`projects-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <header className="topbar">
        <Link className="logo" href={ar ? "/ar" : "/"} aria-label="VisionSeek home">
          <Image src="/visionseek-logo-v2.png" alt="VisionSeek" width={1920} height={440} priority />
        </Link>
        <nav aria-label={ar ? "التنقل الرئيسي" : "Primary navigation"}>
          <Link href={ar ? "/ar" : "/"}>{ar ? "الرئيسية" : "HOME"}</Link>
          <Link href={ar ? "/ar#vision" : "/#vision"}>{ar ? "الرؤية" : "VISION"}</Link>
          <Link href={ar ? "/ar#founder" : "/#founder"}>{ar ? "المؤسس" : "FOUNDER"}</Link>
          <Link href={ar ? "/ar#contact" : "/#contact"}>{ar ? "تواصل" : "CONTACT"}</Link>
          <Link className="language-link" href={ar ? "/projects" : "/ar/projects"}>{ar ? "EN" : "العربية"}</Link>
          <span className="nav-node" aria-hidden="true" />
        </nav>
      </header>

      <section className="projects-hero">
        <p className="projects-kicker">VISIONSEEK / {ar ? "المشروعات" : "PROJECTS"}</p>
        <h1>{ar ? "المشروعات" : "Projects"}</h1>
        <div className="projects-intro single-language">
          <p>{ar ? "مجالات نعمل على استكشافها الآن وتحويل الإمكانات داخلها إلى مبادرات ومشروعات قابلة للنمو." : "Explore the fields we are working in now — and the ideas we are developing into scalable ventures."}</p>
        </div>
      </section>

      <section className="projects-index">
        <aside className="project-filters" aria-label={ar ? "مرشحات المشروعات" : "Project filters"}>
          <div className="filter-block">
            <h2>{ar ? "كل المشروعات" : "All Projects"}</h2>
            <button className={topic === "All Projects" ? "active" : ""} onClick={() => setTopic("All Projects")}>{ar ? "كل المشروعات" : "All Projects"}</button>
          </div>
          <div className="filter-block">
            <h2>{ar ? "الحالة" : "Status"}</h2>
            <button className={status === "Current" ? "active" : ""} onClick={() => setStatus("Current")}>{ar ? "حالية" : "Current"}</button>
            <button className={status === "Graduated" ? "active" : ""} onClick={() => setStatus("Graduated")}>{ar ? "متخرجة" : "Graduated"}</button>
          </div>
          <div className="filter-block">
            <h2>{ar ? "المجال" : "Topic"}</h2>
            {topics.slice(1).map((item) => (
              <button key={item} className={topic === item ? "active" : ""} onClick={() => { setTopic(item); setStatus("Current"); }}>
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
                <span>{String(index + 1).padStart(2, "0")} / {ar ? "حالي" : "CURRENT"}</span>
                <h2>{ar ? project.title : project.english}</h2>
                <small>{project.topics.map((item) => ar ? topicArabic[item] : item).join(" · ")}</small>
              </div>
            </article>
          )) : (
            <div className="projects-empty">
              <span>{ar ? "متخرجة" : "GRADUATED"}</span>
              <h2>{ar ? "لا توجد مشروعات متخرجة نعلن عنها حتى الآن." : "Nothing announced here yet."}</h2>
              <p>{ar ? "نحن نبني بعناية." : "We are building carefully."}</p>
            </div>
          )}
        </div>
      </section>

      <section className="projects-contact">
        <p>{ar ? "هل ترى فرصة يمكن أن نبنيها معًا؟" : "Do you see an opportunity we can build together?"}</p>
        <a href="mailto:abdelalim@visionseek.org">{ar ? "ابدأ محادثة" : "START A CONVERSATION"} <span>↗</span></a>
      </section>
    </main>
  );
}

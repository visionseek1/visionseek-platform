"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SiteHeader from "@/components/site-header";
import { fields as projects, fieldTopics as topics, fieldTopicArabic as topicArabic } from "@/lib/fields";

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
          { href: ar ? "/ar/leaders" : "/leaders", label: ar ? "بيت القادة" : "Leaders House" },
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

import Image from "next/image";
import Link from "next/link";
import { communities, type Locale } from "./content";

export default function CapabilityFooter({locale}: {locale: Locale}) {
  const ar = locale === "ar"; const p = ar ? "/ar" : "";
  return <footer className="vs-footer">
    <div className="vs-footer-top"><div><Image src="/visionseek-logo-v2.png" alt="VisionSeek" width={220} height={51}/><p>{ar ? "نكتشف ما يصبح ممكنًا عندما تتصل الأفكار والتقنيات والأشخاص والأسواق والمؤسسات، ثم نحدد الشكل الصحيح لجعله واقعًا." : "We discover what becomes possible when ideas, technologies, people, markets and institutions connect. Then we find the right form to make it real."}</p><strong>Make It Possible.</strong></div>
      <nav aria-label={ar ? "VisionSeek" : "Explore VisionSeek"}><h3>{ar ? "اكتشف VisionSeek" : "Explore VisionSeek"}</h3><Link href={`${p}/about`}>{ar ? "رؤيتنا" : "Our vision"}</Link><Link href={`${p}/method`}>{ar ? "منهجنا" : "Our method"}</Link><Link href={`${p}/projects`}>{ar ? "مجالات الاستكشاف" : "Fields of exploration"}</Link><Link href={`${p}/insights`}>{ar ? "بيت القادة" : "Leaders House"}</Link><Link href={`${p}/about#founder`}>{ar ? "المؤسس" : "Our founder"}</Link></nav>
      <nav aria-label={ar ? "العمل معنا" : "Work with us"}><h3>{ar ? "اعمل معنا" : "Work with us"}</h3>{communities.map(c => <Link key={c.id} href={`${p}/work-with-us#${c.id}`}>{ar ? c.ar : c.en}</Link>)}</nav>
    </div>
    <div className="vs-footer-bottom"><span>© 2026 VisionSeek</span><span>{ar ? "إنتشون، كوريا الجنوبية" : "Incheon, South Korea"}</span><nav aria-label={ar ? "روابط قانونية" : "Legal"}><Link href={`${p}/privacy`}>{ar ? "الخصوصية" : "Privacy"}</Link><Link href={`${p}/terms`}>{ar ? "الشروط" : "Terms"}</Link></nav></div>
  </footer>;
}

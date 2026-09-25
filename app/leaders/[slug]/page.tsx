import type { Metadata } from "next";
import BriefSignal from "@/components/brief-signal";
import BriefSignalLookup from "@/components/brief-signal-lookup";
import ReportPage from "@/components/report-page";
import { briefEntries, getBrief } from "@/lib/brief";

type Params = { slug: string };

export function generateStaticParams() {
  return briefEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBrief(slug);
  const enPath = `/leaders/${slug}`;
  const arPath = `/ar/leaders/${slug}`;
  return {
    title: entry ? `${entry.title.en} | VisionSeek` : "Leaders House | VisionSeek",
    description: entry?.summary.en ?? "Open reading for leaders.",
    alternates: { canonical: enPath, languages: { en: enPath, ar: arPath } },
  };
}

export default async function BriefArticle({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (slug === "physical-ai") return <ReportPage locale="en" />;
  const entry = getBrief(slug);
  if (entry) return <BriefSignal locale="en" entry={entry} />;
  return <BriefSignalLookup locale="en" slug={slug} />;
}

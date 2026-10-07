import type { Metadata } from 'next';
import PipelineReader from '@/components/reports/pipeline-reader';
import { lineReport } from '@/lib/reports/pipeline';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const report = lineReport(id);
  const hidden = !report || report.status !== 'published';
  return {
    title: report ? `${report.title.en} | VisionSeek` : 'Report | VisionSeek',
    robots: hidden ? { index: false, follow: false } : undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PipelineReader locale="en" id={id} />;
}

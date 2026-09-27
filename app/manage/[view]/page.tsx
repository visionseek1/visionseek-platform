import { notFound } from "next/navigation";
import ManageRoom, { type View } from "@/components/manage/room";
const views = ["modules", "tasks", "approvals", "activity", "agents"];
export const dynamicParams = false;
export function generateStaticParams() {
  return views.map((view) => ({ view }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;
  if (!views.includes(view)) notFound();
  return <ManageRoom view={view as View} />;
}

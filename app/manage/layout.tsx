import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "غرفة الإدارة | VisionSeek",
  robots: { index: false, follow: false },
  alternates: { canonical: "/manage", languages: {} },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

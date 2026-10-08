import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "VisionSeek | The Highest Level One",
  description:
    "VisionSeek builds capabilities for institutions, especially AI, through Highest Level One: assembled in-house between engineering teams and decision-makers. A multi-sector studio for Egypt and the Gulf.",
  openGraph: {
    title: "VisionSeek | The Highest Level One",
    description:
      "VisionSeek builds capabilities for institutions, especially AI, through Highest Level One: assembled in-house between engineering teams and decision-makers. A multi-sector studio for Egypt and the Gulf.",
  },
};

export default function Home() {
  return <HomePage locale="en" />;
}

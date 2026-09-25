"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { briefHref, type Locale } from "@/lib/brief";

const returnKey = "visionseek.leaders.return";

function subscribeReturn() {
  return () => undefined;
}

function readReturn() {
  return window.sessionStorage.getItem(returnKey) ?? "";
}

function safeReturn(value: string, fallback: string) {
  if (value === "/leaders" || value.startsWith("/leaders?") || value === "/ar/leaders" || value.startsWith("/ar/leaders?")) return value;
  return fallback;
}

export default function LeadersReturnLink({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const fallback = briefHref(locale);
  const stored = useSyncExternalStore(subscribeReturn, readReturn, () => "");
  return <Link href={safeReturn(stored, fallback)}>{children}</Link>;
}

"use client";

import { useSyncExternalStore } from "react";
import { readFollowedIds, readFollowedServer, subscribeFollowed, writeFollowedIds, type Locale } from "@/lib/brief";

export default function FollowField({ locale, fieldId }: { locale: Locale; fieldId: string }) {
  const followed = useSyncExternalStore(subscribeFollowed, readFollowedIds, readFollowedServer);
  const on = followed.includes(fieldId);
  const ar = locale === "ar";
  return (
    <button
      type="button"
      className="leaders-follow"
      aria-pressed={on}
      onClick={() => writeFollowedIds(on ? followed.filter((id) => id !== fieldId) : [...followed, fieldId])}
    >
      {on ? (ar ? "تتابعه" : "Following") : (ar ? "تابع هذا المجال" : "Follow this field")}
    </button>
  );
}

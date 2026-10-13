import { pushConfigured } from "@/lib/webpush";

/** المفتاح العام لـ VAPID (مش سر) عشان المتصفح يشترك في الإشعارات. */
export function GET() {
  if (!pushConfigured()) return Response.json({ ok: false, reason: "VAPID keys are not set" }, { status: 503 });
  return Response.json({ ok: true, key: process.env.VAPID_PUBLIC_KEY }, { headers: { "cache-control": "no-store" } });
}

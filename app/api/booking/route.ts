import { createHmac, timingSafeEqual } from "node:crypto";
import { createLead, notionConfigured } from "@/lib/notion-room";

/**
 * Cal.com webhook (15 Oct 2026): every booking of the free 30-minute session lands on the clients board in the
 * operations platform (stage «جلسة تعريفية»). Cal.com itself sends the confirmation emails from hello@visionseek.org.
 * The webhook secret lives in Vercel as CAL_WEBHOOK_SECRET, set by Dr. Ahmed; without it every request is refused.
 */
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

function verify(raw: string, signature: string | null): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature.trim());
  return a.length === b.length && timingSafeEqual(a, b);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(request: Request) {
  const raw = await request.text();
  if (!verify(raw, request.headers.get("x-cal-signature-256"))) return json({ ok: false, error: "signature" }, 401);
  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "bad" }, 400);
  }
  const event = String(body?.triggerEvent || "");
  if (event !== "BOOKING_CREATED") return json({ ok: true, ignored: event });
  const p = body?.payload || {};
  const attendee = (p.attendees || [])[0] || {};
  const name = String(attendee.name || "").trim();
  const email = String(attendee.email || "").trim();
  const org = String(p.responses?.organization?.value || p.responses?.company?.value || "").trim();
  const start = String(p.startTime || "").slice(0, 16).replace("T", " ");
  if (!name && !email) return json({ ok: false, error: "attendee" }, 400);
  if (!notionConfigured()) return json({ ok: false, error: "unavailable" }, 503);
  try {
    await createLead({
      name: org || name,
      stage: "جلسة تعريفية",
      decider: name,
      note: `حجز من الموقع (Cal.com) · ${start} UTC · ${email}`,
      by: "الموقع",
    });
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "save" }, 502);
  }
}

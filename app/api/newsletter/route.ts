import { addNewsletterSubscriber, notionConfigured, validEmail } from "@/lib/notion-room";

/**
 * اشتراك النشرة الشهرية لـ VisionSeek Insights.
 * بيسجّل البريد بس في قاعدة «النشرة الشهرية — المشتركين» (قطاع الظهور والتواصل).
 * مفيش أي إرسال للمشتركين من الموقع: الإرسال بموافقة د. أحمد.
 */
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export async function POST(request: Request) {
  // من نفس الموقع بس
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "origin" }, 403);
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad" }, 400);
  }
  const s = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  // خانة مخفية: البشر ما بيملوهاش، والبرامج الآلية بتملاها
  if (s("website")) return json({ ok: true });
  const email = s("email").toLowerCase();
  if (!validEmail(email)) return json({ ok: false, error: "email" }, 400);
  if (!notionConfigured()) return json({ ok: false, error: "unavailable" }, 503);
  const locale = s("locale") === "en" ? "en" : "ar";
  try {
    const r = await addNewsletterSubscriber(email, locale, s("page"));
    return json({ ok: true, status: r });
  } catch {
    return json({ ok: false, error: "save" }, 502);
  }
}

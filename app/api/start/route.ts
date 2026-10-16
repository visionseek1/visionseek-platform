import { SITE_SOURCES, validEmail } from "@/lib/lead-intake";
import { notionConfigured, recordClientIntake } from "@/lib/notion-room";
import { isPreview } from "@/lib/room-auth";

/**
 * فورم /start: يحفظ صف عميل بمرحلة «جديد» ومصدر «الموقع — جلسة مجانية».
 * بعد الحفظ الزائر يختار واتساب أو البريد بنفسه. مفيش أي رسالة أو رد آلي من هنا.
 * المعاينة بترجع نجاح من غير كتابة، عشان تجربة الفورم ما تدخلش صفوف في قاعدة العملاء.
 */
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "origin" }, 403);
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad" }, 400);
  }
  const s = (k: string, max: number) => (typeof body[k] === "string" ? (body[k] as string).replace(/\s+/g, " ").trim().slice(0, max) : "");
  if (s("website", 200)) return json({ ok: true });
  const name = s("name", 80);
  const organization = s("organization", 100);
  const email = s("email", 254).toLowerCase();
  const need = typeof body.need === "string" ? body.need.replace(/\r/g, "").trim().slice(0, 600) : "";
  const idea = s("idea", 180);
  const from = s("from", 20);
  const intent = s("intent", 20);
  const locale = s("locale", 4) === "en" ? "en" : "ar";
  if (!need) return json({ ok: false, error: "missing" }, 400);
  if (!validEmail(email)) return json({ ok: false, error: "email" }, 400);
  const extra = [
    from === "projects" && idea ? `المشروع: ${idea}` : from === "workshops" && idea ? `ماستركلاس: ${idea}` : idea ? `السياق: ${idea}` : "",
    from === "projects" ? `نوع الطلب: ${intent === "partner" ? "شراكة" : "تكليف"}` : "",
    `لغة الصفحة: ${locale === "ar" ? "عربي" : "إنجليزي"}`,
    "مفيش رد آلي — الزائر يختار واتساب أو البريد بنفسه.",
  ].filter(Boolean).join("\n");
  if (isPreview()) return json({ ok: true, preview: true });
  if (!notionConfigured()) return json({ ok: false, error: "unavailable" }, 503);
  try {
    await recordClientIntake({ name, organization, email, need, source: SITE_SOURCES.start, extra }, { requireEmail: true });
    return json({ ok: true });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code === "email") return json({ ok: false, error: "email" }, 400);
    if (code === "missing" || code === "title") return json({ ok: false, error: "missing" }, 400);
    return json({ ok: false, error: "save" }, 502);
  }
}

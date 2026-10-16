import { getSolution } from "@/lib/korean-solutions";
import { SITE_SOURCES, validEmail } from "@/lib/lead-intake";
import { notionConfigured, recordClientIntake } from "@/lib/notion-room";
import { isPreview } from "@/lib/room-auth";

/**
 * «حلول من كوريا»: «احتياجك» و«اطلب هذا الحل».
 * الطلب يتحفظ في «العملاء» بمصدر «الموقع — حلول من كوريا». الإيميل المكرر يلحق على الملاحظة.
 * مفيش رسالة للزائر من هنا: الفريق يرد بالإيد.
 * المعاينة ما تكتبش على Notion.
 */
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const PLACES: Record<string, string> = {
  "مصر": "مصر", "egypt": "مصر", "السعودية": "السعودية", "saudi arabia": "السعودية", "ksa": "السعودية", "المملكة العربية السعودية": "السعودية",
  "الإمارات": "الإمارات", "الامارات": "الإمارات", "uae": "الإمارات", "united arab emirates": "الإمارات", "قطر": "قطر", "qatar": "قطر",
  "الكويت": "باقي الخليج", "kuwait": "باقي الخليج", "البحرين": "باقي الخليج", "bahrain": "باقي الخليج", "عمان": "باقي الخليج", "عُمان": "باقي الخليج", "oman": "باقي الخليج",
};
const SECTORS = new Set(["الصحة", "الرعاية الاجتماعية", "الأمن والمدن", "الزراعة والغذاء", "الطاقة", "التصنيع", "مجال آخر"]);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "origin" }, 403);
  let body: Record<string, unknown> = {};
  try { body = await request.json(); } catch { return json({ ok: false, error: "bad" }, 400); }
  const s = (k: string, max: number) => (typeof body[k] === "string" ? (body[k] as string).replace(/\s+/g, " ").trim().slice(0, max) : "");
  if (s("website", 200)) return json({ ok: true });
  const kind = s("kind", 20) === "solution" ? "solution" : "need";
  const org = s("org", 200); const country = s("country", 80); const email = s("email", 254).toLowerCase();
  const need = typeof body.need === "string" ? body.need.trim().slice(0, 2000) : "";
  const sector = SECTORS.has(s("sector", 40)) ? s("sector", 40) : "";
  const locale = s("locale", 4) === "en" ? "en" : "ar";
  if (!org || (kind === "need" && !need)) return json({ ok: false, error: "missing" }, 400);
  if (!validEmail(email)) return json({ ok: false, error: "email" }, 400);
  let title = "";
  if (kind === "solution") {
    const sol = await getSolution(s("solution", 80));
    if (!sol) return json({ ok: false, error: "missing" }, 400);
    title = sol.title.ar;
  }
  const extra = [
    kind === "solution" ? `حلول من كوريا — طلب حل: ${title}` : `حلول من كوريا — احتياج${sector ? ` (${sector})` : ""}`,
    country ? `البلد: ${country}` : "",
    `لغة الصفحة: ${locale === "ar" ? "عربي" : "إنجليزي"}`,
    "مفيش رد آلي — الرد من الفريق بالإيد.",
  ].filter(Boolean).join("\n");
  if (isPreview()) return json({ ok: true, preview: true });
  if (!notionConfigured()) return json({ ok: false, error: "unavailable" }, 503);
  try {
    await recordClientIntake({
      organization: org,
      email,
      need,
      source: SITE_SOURCES.korean,
      extra,
      place: PLACES[country.toLowerCase()],
      sector: "الشراكات ونقل التكنولوجيا",
    }, { requireEmail: true });
    return json({ ok: true });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code === "email") return json({ ok: false, error: "email" }, 400);
    return json({ ok: false, error: "save" }, 502);
  }
}

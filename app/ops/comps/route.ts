import { cookieIsOwner, cookieIsValid, isPreview, readCookie } from "@/lib/room-auth";
import { createComp, notionConfigured, updateComp } from "@/lib/notion-room";

/**
 * المسابقات (16 أكتوبر 2026): إضافة مسابقة، وتحديث الحالة والموعد والرابط.
 * الكتابة في قاعدة «المسابقات» بس. لا حذف. للمالك فقط. في المعاينة مفيش أي كتابة.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const cookie = readCookie(request.headers.get("cookie"));
  if (!cookieIsValid(cookie)) return Response.redirect(`${origin}/ops`, 303);
  let f: FormData;
  try { f = await request.formData(); } catch { return Response.redirect(`${origin}/ops?r=err#comps`, 303); }
  const g = (k: string) => { const v = f.get(k); return typeof v === "string" ? v.trim() : ""; };
  const hash = "#" + (g("back").replace(/[^a-z0-9._\-/]/gi, "").slice(0, 80) || "comps");
  const to = (r: string) => Response.redirect(`${origin}/ops?r=${r}${hash}`, 303);
  if (isPreview()) return to("preview");
  if (!cookieIsOwner(cookie)) return to("readonly");
  if (!notionConfigured()) return to("err");
  try {
    const action = g("action");
    if (action === "create") {
      await createComp({ name: g("name"), link: g("link"), status: g("status"), due: g("due") });
      return to("comp");
    }
    if (action === "update") {
      await updateComp(g("id"), { status: g("status") || undefined, due: f.has("due") ? g("due") : undefined, link: f.has("link") ? g("link") : undefined });
      return to("saved");
    }
    return to("err");
  } catch {
    return to("err");
  }
}

import { cookieIsOwner, cookieIsValid, isPreview, readCookie } from "@/lib/room-auth";
import { createPub, notionConfigured, updatePub } from "@/lib/notion-room";

/**
 * الأبحاث والنشر (16 أكتوبر 2026): إضافة صف، وتحديث الحالة والرابط والتاريخ.
 * الكتابة في قاعدة «الأبحاث والنشر» بس. لا حذف. للمالك فقط. في المعاينة مفيش أي كتابة.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const cookie = readCookie(request.headers.get("cookie"));
  if (!cookieIsValid(cookie)) return Response.redirect(`${origin}/ops`, 303);
  let f: FormData;
  try { f = await request.formData(); } catch { return Response.redirect(`${origin}/ops?r=err#research`, 303); }
  const g = (k: string) => { const v = f.get(k); return typeof v === "string" ? v.trim() : ""; };
  const hash = "#" + (g("back").replace(/[^a-z0-9._\-/]/gi, "").slice(0, 80) || "research");
  const to = (r: string) => Response.redirect(`${origin}/ops?r=${r}${hash}`, 303);
  if (isPreview()) return to("preview");
  if (!cookieIsOwner(cookie)) return to("readonly");
  if (!notionConfigured()) return to("err");
  try {
    const action = g("action");
    if (action === "create") {
      await createPub({ title: g("title"), type: g("kind"), status: g("status"), venue: g("venue"), link: g("link"), date: g("date") });
      return to("pub");
    }
    if (action === "update") {
      await updatePub(g("id"), { status: g("status") || undefined, link: f.has("link") ? g("link") : undefined, date: f.has("date") ? g("date") : undefined });
      return to("saved");
    }
    return to("err");
  } catch {
    return to("err");
  }
}

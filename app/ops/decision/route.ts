import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { notionConfigured, updateDecision } from "@/lib/notion-room";

/**
 * الإصدار 6 — القرار بضغطة: «اعتمد» أو «مش دلوقتي» من الغرفة مباشرة.
 * يكتب في قاعدة «القرارات» فقط (الحالة + القرار النهائي + تاريخ الحسم). للمالك فقط.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!cookieIsValid(readCookie(request.headers.get("cookie")))) return Response.redirect(`${origin}/ops`, 303);
  let f: FormData;
  try { f = await request.formData(); } catch { return Response.redirect(`${origin}/ops?r=err`, 303); }
  const g = (k: string) => { const v = f.get(k); return typeof v === "string" ? v.trim() : ""; };
  const back = g("back").replace(/[^a-z0-9.\-]/gi, "").slice(0, 40);
  const to = (r: string) => Response.redirect(`${origin}/ops?r=${r}${back ? "#" + back : ""}`, 303);
  if (!notionConfigured()) return to("err");
  try {
    const verdict = g("verdict") === "ok" ? "اتحسم" : g("verdict") === "later" ? "مؤجل" : "";
    if (!verdict) return to("err");
    await updateDecision(g("id"), verdict, g("note").slice(0, 300));
    return to("dec");
  } catch {
    return to("err");
  }
}

import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { createLearnBranch, createLearnEntry, notionConfigured, updateLearnBranch } from "@/lib/notion-room";

/**
 * محرّك التعلم («اللي أحمد بيتعلمه»): مدخل جديد، فرع جديد، تحديث فرع، وقرار «قفل أو إلغاء».
 * الكتابة محصورة في قاعدتي «محرّك التعلم — المدخلات» و«— الفروع». لا حذف. للمالك فقط.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!cookieIsValid(readCookie(request.headers.get("cookie")))) return Response.redirect(`${origin}/ops`, 303);
  let f: FormData;
  try { f = await request.formData(); } catch { return Response.redirect(`${origin}/ops?r=err`, 303); }
  const g = (k: string) => { const v = f.get(k); return typeof v === "string" ? v.trim() : ""; };
  const back = g("back").replace(/[^a-z0-9._\-/]/gi, "").slice(0, 80);
  const to = (r: string) => Response.redirect(`${origin}/ops?r=${r}${back ? "#" + back : ""}`, 303);
  if (!notionConfigured()) return to("err");
  try {
    const action = g("action");
    if (action === "entry") {
      await createLearnEntry(g("idea"), g("notes"));
      return to("learn");
    }
    if (action === "branch") {
      await createLearnBranch({ entry: g("entry"), entryNum: g("num"), type: g("kind"), owner: g("owner"), due: g("due"), next: g("next"), dependsOn: g("depends") });
      return to("learn");
    }
    if (action === "update") {
      await updateLearnBranch(g("id"), {
        status: g("status") || undefined,
        owner: f.has("owner") ? g("owner") : undefined,
        due: f.has("due") ? g("due") : undefined,
        next: f.has("next") ? g("next") : undefined,
      });
      return to("saved");
    }
    if (action === "decide") {
      // الفرع الأحمر: «قفل» أو «إلغاء» — القرار بيتسجّل بسببه
      const status = g("verdict") === "close" ? "اتقفل" : g("verdict") === "cancel" ? "اتلغى" : "";
      if (!status) return to("err");
      await updateLearnBranch(g("id"), { status, reason: g("reason") });
      return to("dec");
    }
    return to("err");
  } catch {
    return to("err");
  }
}

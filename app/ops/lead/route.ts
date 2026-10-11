import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { notionConfigured, updateLeadStage } from "@/lib/notion-room";

/**
 * لوحة العملاء: تحريك كارت عميل لمرحلة تانية (سحب أو زرار من الغرفة).
 * الكتابة محصورة في «المرحلة» و«ملاحظة» و«المتابعة الجاية» بقاعدة «عملاء — خط المتابعة». للمالك فقط.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!cookieIsValid(readCookie(request.headers.get("cookie")))) return Response.redirect(`${origin}/ops`, 303);
  if (!notionConfigured()) return Response.redirect(`${origin}/ops?r=err#leads`, 303);

  let f: FormData;
  try {
    f = await request.formData();
  } catch {
    return Response.redirect(`${origin}/ops?r=err#leads`, 303);
  }
  const g = (k: string) => {
    const v = f.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  try {
    await updateLeadStage(g("id"), g("stage"), f.has("note") ? g("note") : undefined, f.has("followup") ? g("followup") : undefined);
    return Response.redirect(`${origin}/ops?r=saved#leads`, 303);
  } catch {
    return Response.redirect(`${origin}/ops?r=err#leads`, 303);
  }
}

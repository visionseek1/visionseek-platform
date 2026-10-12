import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { createLead, notionConfigured, updateLeadMap, updateLeadStage } from "@/lib/notion-room";

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
  // جهة جديدة على اللوحة بخانات الخريطة (من د. أحمد أو نقلًا عن nimo)
  if (g("action") === "create") {
    try {
      await createLead({ name: g("name"), stage: g("stage"), type: g("type"), place: g("place"), service: g("service"), outcome: g("outcome"), followup: g("followup"), decider: g("decider"), note: g("note"), signal: g("signal"), signalUrl: g("signalUrl"), by: g("by") });
      return Response.redirect(`${origin}/ops?r=saved#leads`, 303);
    } catch {
      return Response.redirect(`${origin}/ops?r=err#leads`, 303);
    }
  }
  // خانات خريطة العملاء والخدمات: النوع · المكان · الخدمة · النتيجة المقفولة والموعد · الإشارة (لكروت S5)
  if (g("action") === "map") {
    const opt = (k: string) => (f.has(k) ? g(k) : undefined);
    try {
      await updateLeadMap(g("id"), { type: opt("type"), place: opt("place"), service: opt("service"), outcome: opt("outcome"), followup: opt("followup"), signal: opt("signal"), signalUrl: opt("signalUrl") });
      return Response.redirect(`${origin}/ops?r=saved#leads`, 303);
    } catch {
      return Response.redirect(`${origin}/ops?r=err#leads`, 303);
    }
  }
  try {
    await updateLeadStage(g("id"), g("stage"), f.has("note") ? g("note") : undefined, f.has("followup") ? g("followup") : undefined);
    return Response.redirect(`${origin}/ops?r=saved#leads`, 303);
  } catch {
    return Response.redirect(`${origin}/ops?r=err#leads`, 303);
  }
}

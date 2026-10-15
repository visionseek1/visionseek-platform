import { cookieIsOwner, cookieIsValid, isPreview, readCookie } from "@/lib/room-auth";
import { addContact, createLead, notionConfigured, updateLeadMap, updateLeadStage } from "@/lib/notion-room";

/**
 * نظام العملاء (المرحلة 1): تحريك كارت عميل على الخط، وبياناته، وتسجيل تواصل عليه.
 * الكتابة في قاعدتين بس: «عملاء — خط المتابعة» و«سجل التواصل». للمالك فقط (المراجع بيقرا بس). مفيش إرسال لأي عميل من هنا.
 * في المعاينة (VERCEL_ENV مش production) مفيش أي كتابة على Notion — الطلب بيرجع «معاينة — مفيش حفظ».
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const cookie = readCookie(request.headers.get("cookie"));
  if (!cookieIsValid(cookie)) return Response.redirect(`${origin}/ops`, 303);

  let f: FormData;
  try {
    f = await request.formData();
  } catch {
    return Response.redirect(`${origin}/ops?r=err#clients`, 303);
  }
  const g = (k: string) => {
    const v = f.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  const opt = (k: string) => (f.has(k) ? g(k) : undefined);
  // الرجوع لنفس الصفحة في المنصة (مثلًا #client/<id>)، وإلا لصفحة العملاء
  const hash = "#" + (g("back").replace(/[^a-z0-9._\-/]/gi, "").slice(0, 80) || "clients");
  if (isPreview()) return Response.redirect(`${origin}/ops?r=preview${hash}`, 303);
  if (!cookieIsOwner(cookie)) return Response.redirect(`${origin}/ops?r=readonly${hash}`, 303);
  if (!notionConfigured()) return Response.redirect(`${origin}/ops?r=err${hash}`, 303);
  const action = g("action");
  // جهة جديدة على اللوحة (من د. أحمد، أو نقلًا عن nimo، أو من نتيجة رادار). المصدر مطلوب — السيرفر بيرفض من غيره.
  if (action === "create") {
    if (!g("source")) return Response.redirect(`${origin}/ops?r=nosource${hash}`, 303);
    try {
      await createLead({ name: g("name"), stage: g("stage"), type: g("type"), place: g("place"), service: g("service"), outcome: g("outcome"), followup: g("followup"), decider: g("decider"), note: g("note"), signal: g("signal"), signalUrl: g("signalUrl"), by: g("by"), value: g("value"), forecast: g("forecast"), track: g("track"), source: g("source"), sector: g("sector"), next: g("next"), email: g("email") });
      return Response.redirect(`${origin}/ops?r=saved${hash}`, 303);
    } catch {
      return Response.redirect(`${origin}/ops?r=err${hash}`, 303);
    }
  }
  // بيانات العميل: المصدر · القطاع · الخطوة الجاية وموعدها · الإيميل · خانات الخريطة · ترتيب القطع · المنحة
  if (action === "map") {
    try {
      await updateLeadMap(g("id"), { type: opt("type"), place: opt("place"), service: opt("service"), outcome: opt("outcome"), followup: opt("followup"), signal: opt("signal"), signalUrl: opt("signalUrl"), value: opt("value"), reason: opt("reason"), forecast: opt("forecast"), track: opt("track"), pieces: opt("pieces"), grant: opt("grant"), source: opt("source"), sector: opt("sector"), next: opt("next"), email: opt("email"), lastContact: opt("lastContact") });
      return Response.redirect(`${origin}/ops?r=saved${hash}`, 303);
    } catch {
      return Response.redirect(`${origin}/ops?r=err${hash}`, 303);
    }
  }
  // تسجيل تواصل: صف في «سجل التواصل» + «آخر تواصل» على الكارت (وممكن الخطوة الجاية وموعدها في نفس النموذج)
  if (action === "contact") {
    try {
      await addContact({ lead: g("id"), channel: g("channel"), direction: g("direction"), summary: g("summary"), details: g("details"), by: g("by"), date: g("date"), next: opt("next"), followup: g("followup") });
      return Response.redirect(`${origin}/ops?r=contact${hash}`, 303);
    } catch {
      return Response.redirect(`${origin}/ops?r=err${hash}`, 303);
    }
  }
  // تحريك المرحلة (سحب على اللوحة أو زرار في صفحة العميل). الإغلاق بياخد سبب.
  try {
    await updateLeadStage(g("id"), g("stage"), opt("note"), opt("followup"), opt("reason"));
    return Response.redirect(`${origin}/ops?r=saved${hash}`, 303);
  } catch {
    return Response.redirect(`${origin}/ops?r=err#clients`, 303);
  }
}

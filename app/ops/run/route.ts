import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { createEngineRequest, notionConfigured } from "@/lib/notion-room";

/**
 * المستوى 2: زرار «شغّل دورة» في الغرفة. يكتب سطرًا في قاعدة «طلبات المحرك» في Notion
 * (الحالة: جديد)، ومهمة مجدولة تلقطه وتشغّل الدورة وتكتب النتيجة. للمالك فقط (كوكي الغرفة).
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!cookieIsValid(readCookie(request.headers.get("cookie")))) {
    return Response.redirect(`${origin}/ops`, 303);
  }
  if (!notionConfigured()) return Response.redirect(`${origin}/ops?r=err#eng`, 303);

  let engine = "الدورة كاملة";
  let note = "";
  try {
    const form = await request.formData();
    const e = form.get("engine");
    const n = form.get("note");
    if (typeof e === "string") engine = e;
    if (typeof n === "string") note = n.trim();
  } catch {
    /* نموذج فاضي = الدورة كاملة بلا ملاحظة */
  }

  try {
    await createEngineRequest(engine, note);
    return Response.redirect(`${origin}/ops?r=ok#eng`, 303);
  } catch {
    return Response.redirect(`${origin}/ops?r=err#eng`, 303);
  }
}

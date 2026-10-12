import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { notionConfigured, updateMethodStatus } from "@/lib/notion-room";

/**
 * المنهجيات: اعتماد أو إيقاف أو ترجيع لمسودة. للمالك فقط (د. أحمد بكلمة سر الغرفة).
 * الكتابة محصورة في «الحالة» و«اعتمدها» و«اتعتمدت يوم» و«آخر تحديث». لا حذف ولا تعديل للنص.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!cookieIsValid(readCookie(request.headers.get("cookie")))) return Response.redirect(`${origin}/ops`, 303);
  if (!notionConfigured()) return Response.redirect(`${origin}/ops?r=err#methods`, 303);
  let f: FormData;
  try {
    f = await request.formData();
  } catch {
    return Response.redirect(`${origin}/ops?r=err#methods`, 303);
  }
  const g = (k: string) => {
    const v = f.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  try {
    await updateMethodStatus(g("id"), g("status"));
    return Response.redirect(`${origin}/ops?r=saved#methods`, 303);
  } catch {
    return Response.redirect(`${origin}/ops?r=err#methods`, 303);
  }
}

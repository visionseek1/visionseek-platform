import { passwordIsValid, reviewCookie, reviewPasswordIsValid, roomConfigured, sessionCookie } from "@/lib/room-auth";

/** يستقبل كلمة السر من نموذج /room ويحط كوكي الجلسة. فشل = رجوع للنموذج بعلامة خطأ، بلا تفاصيل. */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!roomConfigured()) return Response.redirect(`${origin}/ops`, 303);

  // تهدئة بسيطة ضد التخمين: كل محاولة تاخد وقت ثابت.
  await new Promise((r) => setTimeout(r, 400));

  let password = "";
  try {
    const form = await request.formData();
    const v = form.get("password");
    password = typeof v === "string" ? v : "";
  } catch {
    password = "";
  }

  // كلمة سر المراجعة (قراءة بس) بتتقبل في المعاينة فقط؛ في الإنتاج مفيش غير كلمة السر الأساسية.
  if (!passwordIsValid(password)) {
    if (reviewPasswordIsValid(password)) {
      return new Response(null, { status: 303, headers: { location: `${origin}/ops`, "set-cookie": reviewCookie(), "cache-control": "no-store" } });
    }
    return Response.redirect(`${origin}/ops?e=1`, 303);
  }
  return new Response(null, {
    status: 303,
    headers: { location: `${origin}/ops`, "set-cookie": sessionCookie(), "cache-control": "no-store" },
  });
}

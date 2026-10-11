import { passwordIsValid, roomConfigured, sessionCookie } from "@/lib/room-auth";

/** يستقبل كلمة السر من نموذج /room ويحط كوكي الجلسة. فشل = رجوع للنموذج بعلامة خطأ، بلا تفاصيل. */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!roomConfigured()) return Response.redirect(`${origin}/room`, 303);

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

  if (!passwordIsValid(password)) {
    return Response.redirect(`${origin}/room?e=1`, 303);
  }
  return new Response(null, {
    status: 303,
    headers: { location: `${origin}/room`, "set-cookie": sessionCookie(), "cache-control": "no-store" },
  });
}

import { clearCookie } from "@/lib/room-auth";

/** خروج من غرفة العمليات: يمسح الكوكي ويرجّع لصفحة الدخول. */
export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  return new Response(null, {
    status: 303,
    headers: { location: `${origin}/ops`, "set-cookie": clearCookie(), "cache-control": "no-store" },
  });
}

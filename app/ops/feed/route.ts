import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { changesSince, readLiveRoom } from "@/lib/notion-room";

/** للصفحة المفتوحة: إيه اللي اتغيّر بعد ?since= (ISO). الصفحة بتسأل كل دقيقة ونص وتعرض توست وإشعار متصفح. */
export async function GET(request: Request) {
  if (!cookieIsValid(readCookie(request.headers.get("cookie")))) return Response.json({ ok: false }, { status: 401 });
  const since = new URL(request.url).searchParams.get("since") || "";
  try {
    const live = await readLiveRoom();
    if (!live) return Response.json({ ok: true, at: new Date().toISOString(), change: null });
    const change = since ? changesSince(live, since) : null;
    return Response.json({ ok: true, at: live.at, change }, { headers: { "cache-control": "no-store" } });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

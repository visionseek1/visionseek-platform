import { cookieIsValid, readCookie, roomConfigured } from "@/lib/room-auth";
import { roomHtml } from "./room-html";

/**
 * /room — غرفة عمليات VisionSeek. منطقة خاصة: الطريق اللي بتمشي فيه الأقسام،
 * مش صفحة عامة. دخول بكلمة سر (ROOM_PASSWORD في Vercel)، ولا تُفهرس.
 */
const headers = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow",
};

function page(title: string, body: string): string {
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="/favicon.ico">
<title>${title}</title>
<style>
:root{--bg:#f6f5f2;--panel:#fff;--line:#e3e0d9;--fg:#1b1a17;--mute:#6b675e;--need:#c43d2b}
@media (prefers-color-scheme:dark){:root{--bg:#14130f;--panel:#1d1b16;--line:#2c2924;--fg:#ece8df;--mute:#a39e93;--need:#e2654f;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--fg);font-family:"IBM Plex Sans Arabic",system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif;padding:16px}
.box{width:100%;max-width:380px;border:1px solid var(--line);border-radius:12px;background:var(--panel);padding:22px}
h1{font-size:18px;margin:0 0 4px}
p{margin:0 0 14px;color:var(--mute);font-size:14px;line-height:1.6}
label{display:block;font-size:13px;color:var(--mute);margin-bottom:6px}
input{width:100%;font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--fg)}
button{margin-top:12px;width:100%;font:inherit;font-weight:600;padding:10px;border:1px solid var(--fg);border-radius:8px;background:var(--fg);color:var(--bg);cursor:pointer}
.err{color:var(--need);font-size:13px;margin:0 0 10px}
</style>
</head>
<body><div class="box">${body}</div></body>
</html>`;
}

export function GET(request: Request) {
  if (!roomConfigured()) {
    return new Response(
      page(
        "غرفة العمليات · مقفولة",
        `<h1>الغرفة مقفولة</h1><p>كلمة السر لسه ما اتحطّتش. تتضاف من إعدادات Vercel كمتغير بيئة باسم <code>ROOM_PASSWORD</code> (8 حروف على الأقل)، ومن غيرها الغرفة ما تفتحش لأي حد.</p>`,
      ),
      { status: 503, headers },
    );
  }
  if (cookieIsValid(readCookie(request.headers.get("cookie")))) {
    return new Response(roomHtml, { headers });
  }
  const url = new URL(request.url);
  const wrong = url.searchParams.get("e") === "1";
  return new Response(
    page(
      "غرفة العمليات · دخول",
      `<h1>غرفة عمليات VisionSeek</h1><p>منطقة خاصة. الطريق اللي بتمشي فيه الأقسام.</p>
${wrong ? '<p class="err">كلمة السر مش صح.</p>' : ""}
<form method="post" action="/room/login"><label for="p">كلمة السر</label><input id="p" name="password" type="password" autocomplete="current-password" required autofocus><button type="submit">ادخل</button></form>`,
    ),
    { status: wrong ? 401 : 200, headers },
  );
}

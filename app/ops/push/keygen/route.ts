import { generateKeyPairSync, randomBytes } from "node:crypto";
import { cookieIsValid, readCookie } from "@/lib/room-auth";
import { pushConfigured } from "@/lib/webpush";

/**
 * يولّد زوج مفاتيح VAPID مرة واحدة ويعرضه للمالك في المتصفح بس عشان ينسخه إلى Vercel.
 * ما بيتخزنش في أي مكان على السيرفر. بيقفل تلقائيًا لما المفاتيح تتحط.
 */
export function GET(request: Request) {
  if (!cookieIsValid(readCookie(request.headers.get("cookie")))) return new Response("", { status: 401 });
  const headers = { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" };
  if (pushConfigured()) return new Response(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><body style="font-family:system-ui;padding:24px"><h2>مفاتيح الإشعارات موجودة بالفعل</h2><p>ارجع للغرفة وفعّل الإشعارات من القايمة.</p><a href="/ops">رجوع</a></body></html>`, { headers });
  const { privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
  const jwk = privateKey.export({ format: "jwk" }) as { d: string; x: string; y: string };
  const pub = Buffer.concat([Buffer.from([4]), Buffer.from(jwk.x, "base64url"), Buffer.from(jwk.y, "base64url")]).toString("base64url");
  const priv = jwk.d;
  const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>مفاتيح الإشعارات</title>
<style>body{font-family:"IBM Plex Sans Arabic",system-ui;padding:24px;max-width:720px;margin:auto;line-height:1.7}code{display:block;direction:ltr;text-align:left;word-break:break-all;background:#f3f1ec;padding:10px;border-radius:8px;font-size:13px}button{font:inherit;padding:6px 12px;border-radius:8px;border:1px solid #ccc;background:#fff;cursor:pointer;margin-top:6px}ol li{margin-bottom:14px}</style></head><body>
<h2>مفاتيح الإشعارات (مرة واحدة)</h2>
<p>الصفحة دي بتتولّد في لحظتها ومش بتتخزن. انسخ التلات قيم دول وحطهم في Vercel → Settings → Environment Variables (Production + Preview)، وبعدها Redeploy.</p>
<ol>
<li><b>VAPID_PUBLIC_KEY</b><code id="a">${pub}</code><button onclick="cp('a')">نسخ</button></li>
<li><b>VAPID_PRIVATE_KEY</b> (سر — ما تبعتهوش لأي حد)<code id="b">${priv}</code><button onclick="cp('b')">نسخ</button></li>
<li><b>CRON_SECRET</b> (سر — لإشعار الصبح اليومي)<code id="c">${randomBytes(24).toString("base64url")}</code><button onclick="cp('c')">نسخ</button></li>
</ol>
<p>لو قفلت الصفحة قبل ما تنسخ، افتحها تاني وهتطلع مفاتيح جديدة — عادي، المهم اللي في Vercel يبقى زوج واحد.</p>
<p><a href="/ops">رجوع للغرفة</a></p>
<script>function cp(id){navigator.clipboard.writeText(document.getElementById(id).textContent).then(()=>{alert("اتنسخ")}).catch(()=>{const r=document.createRange();r.selectNodeContents(document.getElementById(id));const s=getSelection();s.removeAllRanges();s.addRange(r);});}</script>
</body></html>`;
  return new Response(html, { headers });
}

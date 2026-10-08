import {randomBytes} from "node:crypto";
import {DECAP_CALLBACK_PATH, DECAP_SITE_ORIGIN, allowedScope, decapClientId, decapOauthReady, htmlPage, stateCookie} from "@/lib/decap-oauth";

export function GET(request: Request) {
  if (!decapOauthReady()) {
    return new Response(htmlPage("غرفة التحكم", "<h1>تسجيل الدخول غير جاهز</h1><p>مفتاح GitHub لم يُضبط بعد على Vercel. الخطوات في وصف طلب الدمج، والحقول: DECAP_OAUTH_CLIENT_ID و DECAP_OAUTH_CLIENT_SECRET.</p>"), {
      status: 503,
      headers: {"content-type": "text/html; charset=utf-8", "cache-control": "no-store"},
    });
  }
  const url = new URL(request.url);
  if (url.searchParams.get("provider") && url.searchParams.get("provider") !== "github") {
    return new Response("unsupported provider", {status: 400});
  }
  const state = randomBytes(16).toString("hex");
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", decapClientId());
  authorize.searchParams.set("redirect_uri", `${DECAP_SITE_ORIGIN}${DECAP_CALLBACK_PATH}`);
  authorize.searchParams.set("scope", allowedScope(url.searchParams.get("scope")));
  authorize.searchParams.set("state", state);
  return new Response(null, {
    status: 302,
    headers: {
      location: authorize.toString(),
      "set-cookie": stateCookie(state),
      "cache-control": "no-store",
    },
  });
}

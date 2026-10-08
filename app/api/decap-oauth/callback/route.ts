import {DECAP_CALLBACK_PATH, DECAP_SITE_ORIGIN, DECAP_STATE_COOKIE, clearStateCookie, decapClientId, decapClientSecret, decapOauthReady, htmlPage, readCookie} from "@/lib/decap-oauth";

const post = (kind: "success" | "error", payload: unknown) => {
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  const message = `authorization:github:${kind}:${json}`;
  return new Response(htmlPage("غرفة التحكم", `<p>${kind === "success" ? "تم تسجيل الدخول. أغلق هذه النافذة إن بقيت مفتوحة." : "تعذر تسجيل الدخول."}</p>
<script>
(function () {
  var site = ${JSON.stringify(DECAP_SITE_ORIGIN)};
  var handshake = "authorizing:github";
  var result = ${JSON.stringify(message)};
  window.addEventListener("message", function (event) {
    if (event.origin !== site) return;
    if (!window.opener || event.source !== window.opener || event.data !== handshake) return;
    window.opener.postMessage(result, site);
  });
  if (!window.opener) {
    document.body.insertAdjacentHTML("beforeend", "<p>لم نجد نافذة اللوحة. افتح الغرفة من جديد.</p>");
    return;
  }
  window.opener.postMessage(handshake, site);
})();
</script>`), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "set-cookie": clearStateCookie(),
    },
  });
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const expected = readCookie(request.headers.get("cookie"), DECAP_STATE_COOKIE);
  const state = url.searchParams.get("state") ?? "";
  if (!decapOauthReady()) return post("error", {message: "OAuth client is not configured"});
  if (!expected || state !== expected) return post("error", {message: "OAuth state did not match"});
  const code = url.searchParams.get("code");
  const denied = url.searchParams.get("error");
  if (denied || !code) return post("error", {message: denied || "GitHub did not return a code"});
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {"accept": "application/json", "content-type": "application/json"},
    body: JSON.stringify({
      client_id: decapClientId(),
      client_secret: decapClientSecret(),
      code,
      redirect_uri: `${DECAP_SITE_ORIGIN}${DECAP_CALLBACK_PATH}`,
      state,
    }),
  });
  const tokenJson = await tokenResponse.json() as {access_token?: string; error?: string; error_description?: string};
  if (!tokenResponse.ok || !tokenJson.access_token) {
    return post("error", {message: tokenJson.error_description || tokenJson.error || "GitHub token exchange failed"});
  }
  return post("success", {token: tokenJson.access_token, provider: "github"});
}

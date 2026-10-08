export const DECAP_SITE_ORIGIN = "https://visionseek.org";
export const DECAP_CALLBACK_PATH = "/api/decap-oauth/callback";
export const DECAP_STATE_COOKIE = "decap_oauth_state";

export const decapClientId = () => process.env.DECAP_OAUTH_CLIENT_ID ?? "";
export const decapClientSecret = () => process.env.DECAP_OAUTH_CLIENT_SECRET ?? "";
export const decapOauthReady = () => Boolean(decapClientId() && decapClientSecret());

export const allowedScope = (requested: string | null) => {
  if (requested === "repo" || requested === "public_repo") return requested;
  return "public_repo";
};

export const stateCookie = (state: string) =>
  `${DECAP_STATE_COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/decap-oauth; Max-Age=600`;

export const clearStateCookie = () =>
  `${DECAP_STATE_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/api/decap-oauth; Max-Age=0`;

export const readCookie = (header: string | null, name: string) => {
  if (!header) return "";
  const hit = header.split(";").map(part => part.trim()).find(part => part.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : "";
};

export const htmlPage = (title: string, body: string) => `<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${title}</title></head>
<body style="font-family:Georgia,serif;padding:2rem;line-height:1.7">${body}</body>
</html>`;

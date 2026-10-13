import assert from "node:assert/strict";
import test from "node:test";
import { generateKeyPairSync } from "node:crypto";

// الملف TypeScript؛ نشغّله بتجريد الأنواع (Node 22+).
const mod = await import("../lib/webpush.ts");

test("encrypts exactly like the RFC 8291 test vector", () => {
  const b64 = (s) => Buffer.from(s, "base64url");
  const body = mod.encryptPayload(
    Buffer.from("When I grow up, I want to be a watermelon", "utf8"),
    "BCVxsr7N_eNgVRqvHtD0zTZsEc6-VV-JvLexhqUzORcxaOzi6-AYWXvTBHm4bjyPjs7Vd8pZGH6SRpkNtoIAiw4",
    "BTBZMqHH6r4Tts7J_aSIgg",
    { asPrivateKey: b64("yfWPiYE-n46HLnH0KqZOF1fJJU3MYrct3AELtAQ-oRw"), salt: b64("DGv6ra1nlYgDCS1FRnbzlw") },
  );
  assert.equal(
    body.toString("base64url"),
    "DGv6ra1nlYgDCS1FRnbzlwAAEABBBP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6TlzAC8wEqKK6PBru3jl7A_yl95bQpu6cVPTpK4Mqgkf1CXztLVBSt2Ks3oZwbuwXPXLWyouBWLVWGNWQexSgSxsj_Qulcy4a-fN",
  );
});

test("signs a VAPID token for the endpoint origin", () => {
  const { privateKey, publicKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
  const jwk = privateKey.export({ format: "jwk" });
  const pub = Buffer.concat([Buffer.from([4]), Buffer.from(jwk.x, "base64url"), Buffer.from(jwk.y, "base64url")]).toString("base64url");
  const auth = mod.vapidAuthorization("https://fcm.googleapis.com/fcm/send/abc", pub, jwk.d, "https://visionseek.org", 1_800_000_000);
  assert.match(auth, /^vapid t=[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+, k=/);
  const claims = JSON.parse(Buffer.from(auth.split("t=")[1].split(".")[1], "base64url").toString());
  assert.equal(claims.aud, "https://fcm.googleapis.com");
  assert.equal(claims.exp, 1_800_000_000 + 43200);
  void publicKey;
});

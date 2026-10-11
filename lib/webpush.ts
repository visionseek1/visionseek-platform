import { createCipheriv, createECDH, createHash, createHmac, createPrivateKey, createSign, randomBytes } from "node:crypto";

/**
 * Web Push بلا مكتبات خارجية: تشفير RFC 8291 (aes128gcm) + توقيع VAPID (RFC 8292).
 * المفاتيح من البيئة: VAPID_PUBLIC_KEY (base64url, 65 بايت غير مضغوط)، VAPID_PRIVATE_KEY (base64url, 32 بايت).
 * لا يطبع أي مفتاح. يُختبر بمتجه RFC 8291 في tests/webpush.test.mjs.
 */

export const b64u = {
  enc: (b: Buffer | Uint8Array) => Buffer.from(b).toString("base64url"),
  dec: (s: string) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64"),
};

function hkdfExtract(salt: Buffer, ikm: Buffer): Buffer {
  return createHmac("sha256", salt).update(ikm).digest();
}
function hkdfExpand(prk: Buffer, info: Buffer, len: number): Buffer {
  // len <= 32 يكفي هنا (مفتاح 16 و nonce 12 و IKM 32)
  return createHmac("sha256", prk).update(Buffer.concat([info, Buffer.from([1])])).digest().subarray(0, len);
}

export type EncryptOptions = { asPrivateKey?: Buffer; salt?: Buffer };

/** يشفّر الحمولة لمشترك (p256dh, auth) ويرجّع جسم الطلب بصيغة aes128gcm. */
export function encryptPayload(plaintext: Buffer, p256dh: string, auth: string, opt: EncryptOptions = {}): Buffer {
  const uaPublic = b64u.dec(p256dh);
  const authSecret = b64u.dec(auth);
  if (uaPublic.length !== 65 || authSecret.length !== 16) throw new Error("bad subscription keys");
  const ecdh = createECDH("prime256v1");
  if (opt.asPrivateKey) ecdh.setPrivateKey(opt.asPrivateKey);
  else ecdh.generateKeys();
  const asPublic = ecdh.getPublicKey();
  const shared = ecdh.computeSecret(uaPublic);
  const salt = opt.salt ?? randomBytes(16);

  const prkKey = hkdfExtract(authSecret, shared);
  const keyInfo = Buffer.concat([Buffer.from("WebPush: info\0", "utf8"), uaPublic, asPublic]);
  const ikm = hkdfExpand(prkKey, keyInfo, 32);
  const prk = hkdfExtract(salt, ikm);
  const cek = hkdfExpand(prk, Buffer.from("Content-Encoding: aes128gcm\0", "utf8"), 16);
  const nonce = hkdfExpand(prk, Buffer.from("Content-Encoding: nonce\0", "utf8"), 12);

  const padded = Buffer.concat([plaintext, Buffer.from([2])]);
  const cipher = createCipheriv("aes-128-gcm", cek, nonce);
  const ct = Buffer.concat([cipher.update(padded), cipher.final(), cipher.getAuthTag()]);

  const header = Buffer.alloc(16 + 4 + 1);
  salt.copy(header, 0);
  header.writeUInt32BE(4096, 16);
  header[20] = asPublic.length;
  return Buffer.concat([header, asPublic, ct]);
}

/** رأس Authorization لـ VAPID: vapid t=<jwt>, k=<public> */
export function vapidAuthorization(endpoint: string, publicKey: string, privateKey: string, subject: string, nowSec = Math.floor(Date.now() / 1000)): string {
  const aud = new URL(endpoint).origin;
  const header = b64u.enc(Buffer.from(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const claims = b64u.enc(Buffer.from(JSON.stringify({ aud, exp: nowSec + 12 * 3600, sub: subject })));
  const input = `${header}.${claims}`;
  const priv = b64u.dec(privateKey);
  const pub = b64u.dec(publicKey);
  // JWK → KeyObject (x, y من المفتاح العام غير المضغوط)
  const key = createPrivateKey({
    key: { kty: "EC", crv: "P-256", d: b64u.enc(priv), x: b64u.enc(pub.subarray(1, 33)), y: b64u.enc(pub.subarray(33, 65)) },
    format: "jwk",
  });
  const sig = createSign("SHA256").update(input).sign({ key, dsaEncoding: "ieee-p1363" });
  return `vapid t=${input}.${b64u.enc(sig)}, k=${publicKey}`;
}

export type PushSubscription = { endpoint: string; keys: { p256dh: string; auth: string } };

/** يبعت إشعارًا واحدًا. يرجّع رمز الحالة (201 نجاح، 404/410 الاشتراك انتهى). */
export async function sendPush(sub: PushSubscription, payload: object, ttlSec = 3600): Promise<number> {
  const pub = process.env.VAPID_PUBLIC_KEY || "";
  const priv = process.env.VAPID_PRIVATE_KEY || "";
  const subject = process.env.VAPID_SUBJECT || "https://visionseek.org";
  if (!pub || !priv) throw new Error("VAPID keys are not set");
  const body = encryptPayload(Buffer.from(JSON.stringify(payload), "utf8"), sub.keys.p256dh, sub.keys.auth);
  const res = await fetch(sub.endpoint, {
    method: "POST",
    headers: {
      authorization: vapidAuthorization(sub.endpoint, pub, priv, subject),
      "content-encoding": "aes128gcm",
      "content-type": "application/octet-stream",
      ttl: String(ttlSec),
      urgency: "normal",
    },
    body: new Uint8Array(body.buffer, body.byteOffset, body.byteLength),
  });
  return res.status;
}

export function pushConfigured(): boolean {
  return !!(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
}

export function endpointId(endpoint: string): string {
  return createHash("sha256").update(endpoint).digest("hex").slice(0, 24);
}

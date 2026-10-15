import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * غرفة العمليات (/ops): دخول خاص بكلمة سر واحدة من متغير البيئة ROOM_PASSWORD.
 * لا كلمة سر في المستودع. لو المتغير مش موجود، الغرفة مقفولة بالكامل.
 * الكوكي بتحمل HMAC لكلمة السر، مش كلمة السر نفسها.
 */
export const ROOM_COOKIE = "vs_room";
const COOKIE_DAYS = 30;

function secret(): string | null {
  const s = process.env.ROOM_PASSWORD;
  return s && s.length >= 8 ? s : null;
}

export function roomConfigured(): boolean {
  return secret() !== null;
}

export function roomToken(password: string): string {
  return createHmac("sha256", password).update("visionseek-room-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function passwordIsValid(candidate: string): boolean {
  const s = secret();
  return s !== null && safeEqual(roomToken(candidate), roomToken(s));
}

/** بيئة المعاينة (Vercel preview أو تشغيل محلي): مفيش كتابة على Notion من مسارات العملاء، وبيُقبل فيها دخول المراجعة. */
export function isPreview(): boolean {
  return process.env.VERCEL_ENV !== "production";
}

/**
 * دخول قراءة بس للمراجعة (مراجعة nimo 15 أكتوبر): كلمة سر تانية ROOM_REVIEW_PASSWORD، بتشتغل في المعاينة بس، مش في الإنتاج.
 * الكوكي بتحمل HMAC مختلف عن كوكي المالك، فالسيرفر يعرف الدور من غير ما يحتاج خانة زيادة.
 */
function reviewSecret(): string | null {
  const s = process.env.ROOM_REVIEW_PASSWORD;
  return isPreview() && s && s.length >= 8 ? s : null;
}
export function reviewToken(password: string): string {
  return createHmac("sha256", password).update("visionseek-room-review-v1").digest("hex");
}
export function reviewPasswordIsValid(candidate: string): boolean {
  const s = reviewSecret();
  return s !== null && safeEqual(reviewToken(candidate), reviewToken(s));
}
export function reviewCookie(): string {
  const s = reviewSecret();
  if (s === null) throw new Error("ROOM_REVIEW_PASSWORD is not set");
  return `${ROOM_COOKIE}=${reviewToken(s)}; Path=/ops; HttpOnly; Secure; SameSite=Strict; Max-Age=${24 * 60 * 60}`;
}

export type RoomRole = "owner" | "review";
/** دور صاحب الكوكي: مالك (كلمة السر الأساسية)، أو مراجع (قراءة بس)، أو لا شيء. */
export function cookieRole(value: string | undefined): RoomRole | null {
  if (typeof value !== "string") return null;
  const s = secret();
  if (s !== null && safeEqual(value, roomToken(s))) return "owner";
  const r = reviewSecret();
  if (r !== null && safeEqual(value, reviewToken(r))) return "review";
  return null;
}

/** يقرأ الغرفة: المالك أو المراجع. */
export function cookieIsValid(value: string | undefined): boolean {
  return cookieRole(value) !== null;
}

/** يكتب في الغرفة: المالك بس. المراجع بيشوف ولا يحفظ. */
export function cookieIsOwner(value: string | undefined): boolean {
  return cookieRole(value) === "owner";
}

export function sessionCookie(): string {
  const s = secret();
  if (s === null) throw new Error("ROOM_PASSWORD is not set");
  const maxAge = COOKIE_DAYS * 24 * 60 * 60;
  return `${ROOM_COOKIE}=${roomToken(s)}; Path=/ops; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

export function clearCookie(): string {
  return `${ROOM_COOKIE}=; Path=/ops; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function readCookie(header: string | null): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === ROOM_COOKIE) return rest.join("=");
  }
  return undefined;
}

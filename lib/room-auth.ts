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

export function cookieIsValid(value: string | undefined): boolean {
  const s = secret();
  return s !== null && typeof value === "string" && safeEqual(value, roomToken(s));
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

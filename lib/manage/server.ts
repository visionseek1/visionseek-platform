import { createClient } from "@supabase/supabase-js";
import { ZodError } from "zod";
export class ManageError extends Error {
  constructor(
    public status: number,
    public code: string,
  ) {
    super(code);
  }
}
export async function authenticate(request: Request) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ") || header.length > 10000)
    throw new ManageError(401, "SIGN_IN_REQUIRED");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new ManageError(503, "DATABASE_NOT_CONFIGURED");
  const token = header.slice(7),
    client = createClient(url, key, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user || data.user.is_anonymous)
    throw new ManageError(401, "SIGN_IN_REQUIRED");
  return { client, user: data.user };
}
export function response(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
export function databaseFailure(error: {
  code?: string;
  message?: string;
}): never {
  const code = [
    "ACCESS_DENIED",
    "REVISION_CONFLICT",
    "STATE_CONFLICT",
    "INVALID_INPUT",
    "IDEMPOTENCY_CONFLICT",
    "ASSIGNMENT_INVALID",
    "DELIVERABLE_MISMATCH",
    "MODULE_DISABLED",
  ].find((c) => error.message?.includes(c));
  if (code)
    throw new ManageError(
      code === "ACCESS_DENIED"
        ? 403
        : ["INVALID_INPUT", "ASSIGNMENT_INVALID", "MODULE_DISABLED"].includes(
              code,
            )
          ? 422
          : 409,
      code,
    );
  if (
    ["42P01", "42883", "PGRST202", "PGRST205", "3F000"].includes(
      error.code || "",
    )
  )
    throw new ManageError(503, "ROOM_NOT_INSTALLED");
  if (["23502", "23514", "22P02", "22007", "22008"].includes(error.code || ""))
    throw new ManageError(400, "INVALID_INPUT");
  if (error.code === "42501") throw new ManageError(403, "ACCESS_DENIED");
  throw new ManageError(503, "DATABASE_UNAVAILABLE");
}
export function failure(error: unknown) {
  if (error instanceof ManageError)
    return response({ error: error.code }, error.status);
  if (error instanceof ZodError || error instanceof SyntaxError)
    return response({ error: "INVALID_INPUT" }, 400);
  return response({ error: "REQUEST_FAILED" }, 500);
}
export async function readBody(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new ManageError(415, "JSON_REQUIRED");
  const reader = request.body?.getReader();
  if (!reader) throw new ManageError(400, "INVALID_INPUT");
  let size = 0;
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 40000) {
      await reader.cancel();
      throw new ManageError(413, "INPUT_TOO_LARGE");
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

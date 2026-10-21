import {
  commandSchema,
  type Grant,
  type Principal,
} from "@/lib/manage/contracts";
import { modules } from "@/lib/manage/registry";
import {
  authenticate,
  databaseFailure,
  failure,
  ManageError,
  readBody,
  response,
} from "@/lib/manage/server";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const { client } = await authenticate(request);
    const { data, error } = await client.rpc("manage_snapshot");
    if (error) databaseFailure(error);
    const principal = data.principal as Principal;
    return response({
      ...data,
      modules: modules.filter(
        (m) =>
          principal.kind === "founder" ||
          data.grants.some(
            (g: Grant) =>
              g.principal_id === principal.id &&
              g.module_id === m.moduleId &&
              g.actions.includes("read"),
          ),
      ),
    });
  } catch (e) {
    return failure(e);
  }
}
export async function POST(request: Request) {
  try {
    const { client } = await authenticate(request);
    const key = request.headers.get("idempotency-key");
    if (!key || !/^[a-zA-Z0-9_-]{16,120}$/.test(key))
      throw new ManageError(400, "IDEMPOTENCY_KEY_REQUIRED");
    const command = commandSchema.parse(await readBody(request));
    if (
      command.type === "createTask" &&
      !modules.some(
        (m) =>
          m.moduleId === command.moduleId &&
          m.workflowEnabled &&
          !["planned", "paused"].includes(m.readiness),
      )
    )
      throw new ManageError(422, "MODULE_DISABLED");
    const { data, error } = await client.rpc("manage_command", {
      payload: command,
      request_key: key,
    });
    if (error) databaseFailure(error);
    return response(data);
  } catch (e) {
    return failure(e);
  }
}

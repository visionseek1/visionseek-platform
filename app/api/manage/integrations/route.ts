import { authenticate, databaseFailure, failure, ManageError, response } from "@/lib/manage/server";
import { readGithubActivity } from "@/lib/manage/github-activity";
import { handovers } from "@/lib/manage/registry";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const { client } = await authenticate(request);
    const { data, error } = await client.rpc("manage_snapshot");
    if (error) databaseFailure(error);
    if (data?.principal?.kind !== "founder" || !data.principal.enabled)
      throw new ManageError(403, "ACCESS_DENIED");
    return response({ sources: await readGithubActivity(), handovers });
  } catch (error) { return failure(error); }
}

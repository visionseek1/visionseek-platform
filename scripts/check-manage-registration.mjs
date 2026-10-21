import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { buildCatalog } from "./generate-manage-registry.mjs";
export function checkRegistration(changed, handovers) {
  const code = changed.filter(p => /^(app|components|lib|db|modules)\//.test(p) && p !== "lib/manage/catalog.generated.ts");
  if (!code.length) return [];
  const delivered = handovers.filter(h => changed.includes(`docs/manage-room/handovers/${h.id}.json`));
  return code.filter(file => !delivered.some(h => h.changedPaths.some(p => p.endsWith("/") ? file.startsWith(p) : file === p)));
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const base = process.env.MANAGE_BASE_SHA;
    if (!base || !/^[a-f0-9]{40}$/i.test(base)) throw new Error("Set MANAGE_BASE_SHA to the pull request base commit.");
    const changed = execFileSync("git", ["diff", "--no-renames", "--name-only", `${base}...HEAD`], { encoding: "utf8" }).trim().split("\n").filter(Boolean);
    const { handovers } = await buildCatalog(process.cwd());
    const missing = checkRegistration(changed, handovers);
    if (missing.length) throw new Error(`Changes need an updated room handover:\n${missing.join("\n")}`);
    console.log("ROOM_HANDOVER_PASS");
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}

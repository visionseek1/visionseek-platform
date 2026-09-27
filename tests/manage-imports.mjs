import fs from "node:fs/promises";
import ts from "typescript";
async function compile(file, deps = {}) {
  let code = ts.transpileModule(
    await fs.readFile(new URL(file, import.meta.url), "utf8"),
    {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ES2022,
      },
    },
  ).outputText;
  for (const [name, url] of Object.entries(deps))
    for (const q of ["'", '"'])
      code = code.replaceAll(`from ${q}${name}${q}`, `from '${url}'`);
  return `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
}
export const contractsUrl = await compile("../lib/manage/contracts.ts", {
  zod: import.meta.resolve("zod"),
});
export const registryUrl = await compile("../lib/manage/registry.ts", {
  "./contracts": contractsUrl,
});
const serverUrl = await compile("../lib/manage/server.ts", {
  "@supabase/supabase-js": import.meta.resolve("@supabase/supabase-js"),
  zod: import.meta.resolve("zod"),
});
export const apiUrl = await compile("../app/api/manage/route.ts", {
  "@/lib/manage/contracts": contractsUrl,
  "@/lib/manage/registry": registryUrl,
  "@/lib/manage/server": serverUrl,
});

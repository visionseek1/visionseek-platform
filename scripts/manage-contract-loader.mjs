import { readFile } from "node:fs/promises";
import ts from "typescript";
export async function loadContract(file) {
  const source = await readFile(new URL(`../lib/manage/${file}.ts`, import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText.replace('from "zod"', `from ${JSON.stringify(import.meta.resolve("zod"))}`);
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
}

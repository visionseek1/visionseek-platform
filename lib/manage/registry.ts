import { manifestSchema, type ModuleManifest } from "./contracts";
import { handoverSchema } from "./integration-contract";
import { manifestInputs, handoverInputs } from "./catalog.generated";
export function validateRegistry(values: unknown[]): ModuleManifest[] {
  const parsed = values.map(v => manifestSchema.parse(v));
  if (new Set(parsed.map(v => v.moduleId)).size !== parsed.length)
    throw new Error("DUPLICATE_MODULE");
  return parsed.sort((a, b) => a.sortOrder - b.sortOrder);
}
export const modules = validateRegistry(manifestInputs);
export const handovers = handoverInputs.map(value => handoverSchema.parse(value));

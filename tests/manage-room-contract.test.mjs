import { test } from "node:test";
import assert from "node:assert/strict";
import { contractsUrl, registryUrl } from "./manage-imports.mjs";
const { commandSchema, manifestSchema } = await import(contractsUrl),
  { modules, validateRegistry } = await import(registryUrl);
test("module expansion, duplicate IDs and unsafe routes", () => {
  assert.ok(modules.some(m => m.moduleId === "projects"));
  const next = { ...modules[3], moduleId: "new-unit" };
  assert.equal(validateRegistry([...modules, next]).length, modules.length + 1);
  assert.throws(
    () => validateRegistry([...modules, modules[0]]),
    /DUPLICATE_MODULE/,
  );
  for (const patch of [
    { adminEntryPoint: "//evil.example" },
    { adminEntryPoint: "/../room" },
    { docsUrl: "https://user:secret@example.com" },
    {
      capabilities: [
        { action: "publish", enabled: false, disabledReason: null },
      ],
    },
  ])
    assert.equal(
      manifestSchema.safeParse({ ...next, ...patch }).success,
      false,
    );
});
test("unmerged editors unavailable and no agent tools registered", () => {
  assert.ok(
    modules.every(
      (m) => m.agentTools.length === 0 && m.healthEvidence.result === "unknown",
    ),
  );
  assert.ok(
    modules
      .filter((m) => ["programs", "training"].includes(m.moduleId))
      .every((m) => !m.editorAvailable),
  );
});
test("strict delivery contract rejects stale/unsafe inputs and unsupported actions", () => {
  const body = {
    type: "submitDeliverable",
    taskId: "11111111-1111-4111-8111-111111111111",
    revision: 1,
    summary: "Delivered",
    version: "v1",
    evidence: ["https://example.com"],
    branch: null,
    commit: null,
    workspace: "Workspace A",
  };
  assert.equal(commandSchema.safeParse(body).success, true);
  for (const patch of [
    { revision: 0 },
    { revision: undefined },
    { evidence: ["javascript:alert(1)"] },
    { evidence: ["https://user:secret@example.com"] },
    { branch: "feature/test" },
    { commit: "abc" },
    { publish: true },
    { workspace: "" },
  ])
    assert.equal(commandSchema.safeParse({ ...body, ...patch }).success, false);
  for (const type of ["publish", "merge", "grant", "activateAgent"])
    assert.equal(commandSchema.safeParse({ ...body, type }).success, false);
});

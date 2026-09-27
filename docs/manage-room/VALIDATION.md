# Validation — reconstructed branch

Base: current main 108c883. No AGENTS.md in the repository. Reconstruction follows the
user-provided Room Spec v1; preserves /room and unit-owned files. Prior unpushed commits
were pruned; their old 47-test result is not reused as proof for this branch.

## Scope implemented

Six room views, four validated manifests, existing Leaders editor navigation, honest disabled
states for unmerged editors; identity and per-unit authorization; tasks, immutable deliveries,
founder review, revision conflicts, request idempotency, durable atomic activity.

## Tests

- manage-room-contract: expansion without changing units, unsafe/duplicate manifests, command
  validation, no publish/merge/grant/agent activation, incomplete code evidence.
- manage-room-db: executes real SQL in isolated PGlite with mock auth schema and DB roles;
  denies anonymous/unprovisioned/forged metadata/direct tables/cross-module/other executor;
  verifies stale edits, replay, version-bound founder review, history, independent workspace
  submissions, revocation, RLS and invoker wrappers.
- manage-room-api: actual handlers and Supabase client with mocked Auth/Data transport backed
  by the real isolated workflow; private cache, authorization, payload bounds, save/reopen,
  replay, 403/409 mapping. No network calls to a live customer DB.

Run npm run lint; production npm run build; node --test tests/*.test.mjs.
Final execution results and preview evidence are appended after completion.

## Remaining acceptance gates

Hosted isolated schema/identity setup, Supabase advisors, real concurrent requests,
authenticated mobile/desktop browser end-to-end, and Leaders editor save/reopen.
Reports/programs handovers remain with their owners. MCP remains deferred.
No live DB or production data writes, auth provisioning, DNS/secrets changes are performed.

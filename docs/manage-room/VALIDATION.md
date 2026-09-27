# Validation — reconstructed branch

Base: current main 108c883. No AGENTS.md in the repository. Reconstruction follows the
user-provided Room Spec v1; preserves /room and unit-owned files. Prior unpushed commits
were pruned; their old 47-test result is not reused as proof for this branch.

## Scope implemented

Six room views, four validated manifests, existing Leaders and Reports editor navigation,
honest disabled states for unmerged editors; identity and per-unit authorization; tasks, immutable deliveries,
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
Fresh execution on 27 September 2026 after integrating main 8feafd6 (Reports):
- npm ci --ignore-scripts, full lint, production build and git diff --check: passed.
- node --test tests/*.test.mjs: 65 passed, 0 failed (41 existing, 24 room tests).
- Local production HTTP: six room views, /room, Leaders studio and Reports studio: 200;
  noindex on room pages; unknown room view: 404; unauthenticated API GET/POST: 401,
  SIGN_IN_REQUIRED, private/no-store.
- The earlier 51-test result applies to the reconstruction before Reports entered main.
- Unit-owned editor files and their permissions match main 8feafd6; the added dependency
  is development-only PGlite 0.5.8.

Draft PR: https://github.com/visionseek1/visionseek-platform/pull/41
Branch preview alias, reported by Vercel:
https://visionseek-platform-8u24-git-feat-manage-room-a671d3-visionseek.vercel.app/manage
The first code commit b03a725 triggered deployment dpl_C1Yycrvmjh4c8XrCvCxWTGocJuSW.
A cloud-browser visit reached Vercel sign-in, and authenticated connector fetch returned
an SSO redirect. Deployment access protection is preserved. This is not evidence of an
app rendering or authenticated workflow check. Final deployment status is recorded in PR.

## Remaining acceptance gates

Hosted isolated schema/identity setup, Supabase advisors, real concurrent requests,
authenticated mobile/desktop browser end-to-end, and Leaders editor save/reopen.
Reports save/reopen through this room and Programs handover remain with their owners. MCP remains deferred.
No live DB or production data writes, auth provisioning, DNS/secrets changes are performed.

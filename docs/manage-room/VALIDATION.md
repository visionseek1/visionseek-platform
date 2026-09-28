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

## Acceptance gates recorded before database installation

Hosted isolated schema/identity setup, Supabase advisors, real concurrent requests,
authenticated mobile/desktop browser end-to-end, and Leaders editor save/reopen.
Reports save/reopen through this room and Programs handover remain with their owners. MCP remains deferred.
No live DB or production data writes, auth provisioning, DNS/secrets changes are performed.

## Continuation — 28 September 2026 (Asia/Seoul)

The browser session hook had reproducible races: a late mutation could reload a previous
account, an initial session read could overwrite a newer auth event, and same-tick saves
could send twice. Five new regression cases failed before the fix. The hook now binds
operations to an account generation, verifies the current session before submitting, ignores
retired callbacks and prevents duplicate pending operations. Token refresh keeps draft identity.
A confirmed successful write is still reported as saved when only its subsequent refresh fails,
so the UI closes the submitted form instead of inviting a duplicate create.

- Full lint and production build: passed.
- Local suite: 80 passed, 0 failed, including 12 session tests and 3 room integration tests.
- The room integration tests use the actual React forms, session hook, API handlers and SQL in
  isolated PGlite; Auth/Data transport is mocked. They cover create, deliver, founder acceptance,
  reopen with retained history, revision comparison preserving unsaved text, and account changes.
  Next links/images and Dialog are DOM adapters: these tests do not prove browser layout/focus.
- Added Room concurrency CI using disposable PostgreSQL 17.6 and independent psql connections.
  It requires both writers to be observed waiting on database locks before release, then checks
  revision conflict, identical-key replay and differing-payload idempotency rejection. It accepts
  only a loopback URL with database name visionseek_manage_test. Its execution result is in PR.
- Read-only Supabase inspection: VisionSeek has no development branches; manage_snapshot and
  manage_private.principals are absent. No live schema, identity, role or grant changed.

Hosted Supabase authentication, advisors after installation, mobile/desktop visual checks and
real unit-editor save/reopen through the room remain separate acceptance gates. CI PostgreSQL
and PGlite do not substitute for those checks.

## Existing-project installation — 28 September 2026, 19:04 KST

The user corrected the earlier separate-project proposal, requested reuse of the existing
Supabase project, and approved continuing. Applied the reviewed additive installer using
apply_migration; migration version 20260928100405, name install_visionseek_manage_room.
Installer SHA-256: a8ff2569b3e1a37be253084fc39e6cd94b2d27568100c2d1b79d391442fc656a.
The SQL body is unchanged from the tested implementation; only its header comment was updated.

- All eight manage_private tables have RLS enabled. Direct anon/authenticated table reads and
  authenticated inserts are denied. Public wrappers remain SECURITY INVOKER; private workflow
  entrypoints have empty search_path, qualified references and live principal checks.
- Before/after hashes match for public table ACL/RLS configuration, columns, policies, existing
  function definitions/ACLs and editor membership. All 13 existing table row counts and the
  existing auth account count also match. This is schema/permission/count evidence, not a
  content-by-content checksum of every existing data row.
- Transaction-local SQL checks denied anonymous snapshot/command execution, unprovisioned
  authenticated snapshot/command calls, and direct task reads. The checks rolled back and
  created no identity, principal, task or audit record. These are DB authorization checks,
  not proof of a hosted JWT/browser login flow.
- Security advisors show eight informational RLS-without-policy entries: intentional default
  denial for RPC-only private tables. No new WARN/ERROR findings. Reference:
  https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy
- The pre-existing leaked-password-protection warning remains unchanged; auth configuration
  was not altered. Reference:
  https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
- No new project/branch, paid resource, auth identity, room principal, DNS/secret change or
  production web deployment. Existing public site tables and editor access were preserved.

Next: verify the founder's existing site account, provision its room principal, then verify
authenticated browser use through normal Vercel access. No separate hosted project is needed.
The PR remains a draft. Native PostgreSQL concurrency run 36335231064 passed previously;
the prior 80-test/lint/build results still apply to the unchanged application and SQL body.

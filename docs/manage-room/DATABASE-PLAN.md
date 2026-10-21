# Database plan — existing VisionSeek project

Installer: db/visionseek-manage.sql. It creates eight tables in manage_private, two public
SECURITY INVOKER RPC wrappers, and private workflow helpers. No existing unit table is
modified. No auth user, principal, founder or grant is automatically provisioned.

## Authorization model

The app uses the user's Bearer session with the existing publishable/anon client key.
getUser verifies identity on the server. The DB verifies auth.uid and live enabled principal
membership. User metadata and editor membership never grant institutional rights. Anonymous
auth accounts are denied. Agents are constrained to disabled with no auth_user_id.

All eight tables have RLS and no permissive policies, and all direct table privileges are
revoked. Only authenticated users can execute the public wrappers. Definer entrypoints live
in the non-exposed private schema, have fixed empty search_path and qualified names, and
re-check actor/scope. The privileged transaction is necessary to enforce immutable
submissions, version-bound decisions, audit and idempotency atomically. Helpers are not
client-callable. No service-role key is used by web code.

## Activation sequence and current state

1. The user directed reuse of the existing VisionSeek Supabase project and approved continuing
   on that basis on 28 September 2026. No new project, branch or paid resource is required.
2. Reviewed and installed db/visionseek-manage.sql once through apply_migration in the existing
   project. Migration: 20260928100405_install_visionseek_manage_room. Do not rerun the installer:
   it intentionally fails instead of hiding schema drift. Keep manage_private out of exposed
   Data API schemas. Existing Vercel/Supabase settings were not changed.
3. Completed founder provisioning after the user explicitly supplied their existing site login.
   Matched exactly one confirmed, non-anonymous, active auth.users record and created one enabled
   founder principal referencing its UUID. No auth account was created or modified. Authority
   came from the founder's explicit instruction, not metadata or leaders_editors membership.
4. Provision additional human principals and per-module grants only when approved. Keep agents off.
5. Security advisors and live SQL denial checks passed as documented in VALIDATION.md. Existing
   tables, columns, policies, function definitions/ACLs, editor membership and row counts matched
   their pre-installation baseline. The installer did not create a principal; step 3 added it
   separately. Subsequent SQL checks confirmed founder RPC access and unchanged editor membership.
6. Complete authenticated browser checks using the existing account and normal Vercel
   sign-in. Review merging/publishing the room separately; the PR remains a draft.

## Rollback and limits

Disable principals or revoke the RPC entrypoints after review and revert the web commit;
retain records. No schema drop or destructive migration reversal. A Git revert does not
restore data. Reopening creates a new task revision and clears the current acceptance pointer;
all immutable submissions and decisions remain in history.

Activity view shows 200 recent successful events; full ledger is retained. Rejected requests
return explicit errors but rejected-attempt security telemetry is not implemented. Tasks and
submissions target a small internal deployment; add pagination before high-volume use.
PGlite tests exercise PostgreSQL semantics in one process and do not prove concurrent hosted
connections or replace Supabase advisors.

Read-only catalog inspection in the earlier session (2026-09-27) found manage_snapshot and
manage_private.principals absent. That is time-bound evidence, not a current installation claim.

## Superseded proposal

An earlier proposal suggested a separate hosted test branch/project. It was never created.
The user rejected that direction and requested the existing project instead. Do not request
branch cost approval or create another resource to continue this work. Disposable PGlite and
native PostgreSQL CI remain available for synthetic workflow and concurrency tests.

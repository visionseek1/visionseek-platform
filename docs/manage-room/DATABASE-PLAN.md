# Database plan — separate activation gate

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

## Activation sequence (not executed)

1. Confirm isolated hosted test database/branch and backup plan; do not assume Vercel preview
   has a separate DB. Review SQL, function owner, grants, FK checks and test results.
2. Run installer once through the authorized migration mechanism. It intentionally fails on
   re-run instead of hiding schema drift. Keep manage_private out of exposed Data API schemas.
3. Verify founder's existing auth.users UUID out of band, then explicitly create one enabled
   founder principal. Never derive founder authority from browser email or leaders_editors.
4. Provision approved human principals and per-module room grants separately. Keep agents off.
5. Run Supabase advisors and authenticated save/reopen, cross-module, concurrent request and
   review tests in the isolated environment before reviewing production activation.
6. Review merge and live installation separately. A PR or preview is not activation approval.

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

## Prepared isolated activation proposal — not executed

Parent project: VisionSeek (lckngioonokzxkrdwkez). Proposed branch: manage-room-test.
The connected organization is bdrcfvcwvkjwstiwrgtq; provider tools require user confirmation of
that organization before quoting, and confirmation of the quoted branch cost before creation.
There are currently no existing development branches to reuse (read-only inspection, 28 Sep KST).

After those confirmations: create the isolated branch without production records; verify its
new project_ref; install the reviewed room SQL there; create only synthetic test identities and
explicit test grants; run authenticated save/reopen, access and advisor checks. Bind only the
feat/manage-room-20260927 Vercel preview environment to that branch's public Supabase settings.
Keep production environment settings and existing founder/editor identities unchanged. Hosted
browser validation still requires the normal Vercel sign-in. Merge and production activation
remain a later reviewable action after these checks.

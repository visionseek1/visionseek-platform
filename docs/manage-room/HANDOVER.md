# VisionSeek room handover

Read BRIEF.md, MODULE-CONTRACT.md, DATABASE-PLAN.md, VALIDATION.md.

Routes: /manage, /manage/modules, /manage/tasks, /manage/approvals, /manage/activity,
/manage/agents. Generic access shell contains no private task records. Browser sessions reuse
existing Supabase auth; API checks identity and DB scope.

API: GET/POST /api/manage, Bearer user token. Mutations require Idempotency-Key.
Commands: createTask, editTask, setState, submitDeliverable, review. No delete, publish,
merge, grant, service-role or agent execution endpoint.

Task states: queued / in_progress / blocked / submitted / accepted / cancelled.
Only founder can reopen accepted/submitted work to queued or cancelled. Reopening clears the
current submission pointer and preserves history. Review requires assigned founder, current
revision, current deliverable. Request changes returns to in_progress. Saved submissions
cannot be overwritten. Retry identical timed-out requests with same key; a 409 requires
human comparison and an explicit updated revision. UI preserves form input on conflicts and
token refresh; clears private state on account change.

Workspace labels on submissions are human-entered provenance, not authenticated agent identity.
No messages were sent to other workspaces. Give unit owners MODULE-CONTRACT before integration.
The room schema was subsequently installed in the existing project with user authorization;
see DATABASE-PLAN.md. Existing unit permissions, DNS and secrets were not changed.

Recovery note: automated cleanup removed unpushed local work. This branch reconstructs it
against newer main and is verified afresh. User authorized public branch publication and PR/
preview on 2026-09-28 (Asia/Seoul). Merging/publishing the room remains separately reviewable.

Integration update: Reports entered main 8feafd6 during publication. That revision is merged
into this branch; the Reports manifest now links to its existing studio without changing
its permissions, data or editor. Live health through this room remains unknown.

Draft PR: https://github.com/visionseek1/visionseek-platform/pull/41

Continuation: session races and confirmed-save/failed-refresh handling are fixed; 80 local tests
pass. Session regression tests and complete form/API/SQL tests are included. Room concurrency
CI adds native PostgreSQL lock/replay checks. See VALIDATION.md and PR for exact execution results.
The separate hosted project/branch proposal was superseded by the user's instruction to reuse
the existing Supabase project. Migration 20260928100405 installed the eight private room tables
and scoped RPCs there. Pre/post checks confirmed existing public schema and editor membership
unchanged. No additional resource or auth identity was created. The user then supplied their
existing site login; it matched one confirmed active auth record. One enabled founder principal
is now linked to that account. Founder snapshot/command authorization passed SQL checks; direct
table access remains denied. No task or test audit data was retained. Hosted browser verification
still requires the user's normal Vercel and site sign-in. The PR is still a draft.

Shared workspace extension: see WORKSPACE-INTEGRATION.md and root AGENTS.md. The module
sources are now modules/*.json, discovered by npm run manage:registry. Ten existing/planned
units are registered; registration alone does not activate their room tasks. /manage/integrations
and its founder-only read API show live repository PR/main activity and the versioned handover
ledger. The Room registration CI check requires updated handovers for changed application code.
This integrates current main ed7cb36, including the other workspace's project files and HLO
positioning; no unit-owned source was rewritten. Chat/Notion text is not automatically synced.

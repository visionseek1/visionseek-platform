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
No live DB writes, permissions, DNS, secrets or production deployment are part of this PR.

Recovery note: automated cleanup removed unpushed local work. This branch reconstructs it
against newer main and is verified afresh. User authorized public branch publication and PR/
preview on 2026-09-28 (Asia/Seoul). Production activation remains separately reviewable.

Integration update: Reports entered main 8feafd6 during publication. That revision is merged
into this branch; the Reports manifest now links to its existing studio without changing
its permissions, data or editor. Live health through this room remains unknown.

Draft PR: https://github.com/visionseek1/visionseek-platform/pull/41

# Shared workspace integration — operating brief

Outcome requested by the founder: existing and future VisionSeek work should arrive in one
management room instead of remaining isolated in separate GPT workspaces.
Owner: management-room workspace for the integration; each unit workspace for its handover;
Dr Ahmed Abdelalim for institutional acceptance and production publication.
Delivery milestone: this preview update. No deadline was supplied for the other workspaces.

## What updates automatically

1. `/manage/integrations` reads the public repository's latest 50 open PRs, 20 closed PRs and
   20 main commits. A new PR appears on the next successful refresh (five-minute cache).
   Pagination limits, source failures and stale reads are visible. A main commit is not
   proof of deployment; a merged PR is not acceptance of the feature.
2. Every `modules/*.json` registration is discovered at dev/build time. There is no separate
   hardcoded list of units in the room. A module appears in that deployment after its code
   and registration are integrated. Other branches' pending changes are visible in the PR feed.
3. `docs/manage-room/handovers/*.json` supplies the versioned handover ledger. Updating one
   regenerates the catalog; the Room registration CI check rejects changed application files
   with no updated handover covering their paths. The check is installed in this branch; it
   applies repository-wide after merge. Branch-protection settings have not been changed, so
   this is a failing CI check, not a claim that administrators cannot bypass merging.

## Instructions to give every GPT workspace

> Work in the existing visionseek1/visionseek-platform repository. Read AGENTS.md and
> docs/manage-room/WORKSPACE-INTEGRATION.md. Reuse the current unit, auth and source of truth.
> Open/update a draft PR early. Before each delivery, add/update the unit manifest and a
> handover JSON with the workspace, module IDs, outcome, changed paths, acceptance evidence,
> dependencies and remaining work. Run npm run manage:registry and commit its output.
> Preserve IDs and existing records. Do not call merged code published or tested merely
> because the file exists. Keep production publication with the founder.

This instruction needs to reach a workspace once (or be read from current main). There is
no ambient ability to read or instruct every separate ChatGPT conversation. Work kept only in
a chat or local branch without a PR/deposit cannot be discovered by this integration.

## Register a unit or deliver a feature

- Copy the shape of `modules/projects.json`, choose a stable ID, and keep workflowEnabled
  false until the existing Supabase project has an explicitly reviewed registration/grant.
  A discovered module/card does not create an editor, DB table, publishing right or credential.
- Copy the handover shape from `docs/manage-room/handovers/shared-workspace-integration.json`.
  Use a stable feature ID matching the filename and existing module IDs. `changedPaths` takes
  exact filenames or directory prefixes ending in `/`; cover the actual changes.
- Run `npm run manage:registry`, then `npm run manage:check`. For a PR coverage check:
  `MANAGE_BASE_SHA=<full-base-sha> npm run manage:handover` after committing.
- Record new non-code outputs as handovers with source links if approved for this public
  repository. Otherwise attach evidence to a private room task using the existing account.
- The workspace name and handover content are declared provenance; verified actors and
  institutional decisions remain in the room DB's task/delivery/review workflow.

## Existing sources and boundaries

GitHub owns code, public module registration and release handovers. Supabase owns private
tasks, deliveries, decisions and activity. Notion/document stores retain their original
documents and are linked as evidence; they are not silently mirrored. Unit editors keep
their records and permissions. ChatGPT is a place of work, not an automatic event source.

The module catalog now includes Leaders, Reports, Programs, Training, Projects, Website,
R&D Opportunities, Workshops, Work with Us and Management. Only the previously activated
Leaders/Reports/Programs room workflows are enabled. Other cards are discovery/navigation;
they do not imply the units have functioning editors. Projects use the existing stable IDs
and source files; their draft/publish editor remains a separate delivery described in
`docs/projects/MANAGEMENT_ROOM_INTEGRATION.md`.

## Security, failure behavior and validation

The integration endpoint authenticates the current user and checks the live enabled founder
principal before any GitHub read. It is read-only, private/no-store and has no publishing,
merge or execution action. Only fixed public GitHub URLs are requested; session credentials
never leave Supabase/app requests. Input links are constructed from validated PR numbers/SHAs.
GitHub payloads are bounded, parsed and displayed as text; returned contents are not executed.
The cache contains only public metadata and is not an authorization cache. Failed reads retain
timestamped data for at most one day, or explicitly report unavailable. No new service/key/cost
is required; provider rate limits can delay discovery and are reported as source failure.

References: https://docs.github.com/en/rest/pulls/pulls and
https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api.

Acceptance: a new module is discovered without editing the registry implementation; missing
handover fails CI; cross-account/unauthorized reads fail; GitHub failure is not shown as empty
successful work; merged/closed/draft/main states remain distinct; existing editors remain intact.

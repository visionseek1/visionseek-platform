# Project updates ↔ shared management room

Public workspace revision: 28 September 2026. This is an integration contract, not a claim that the administration feature is live.

## Stable identities

Public project IDs are VS-P07 and VS-P08. Sector and specialty remain `energy/lng`. Canonical routes are produced by `projectPath` in `lib/projects/index.ts`; do not key administration records by Arabic/English titles. The Projects feature is on `feature/lng-projects`, PR40. The management room is a separate workstream and has not been merged into this feature.

## Existing public sources

- `lib/projects/index.ts`: identity, titles, summary, beneficiary, current status and featured order.
- `lib/projects/project-files.ts`: versioned public project profile; institutional challenge, VisionSeek role, initial engagement, workstreams, deliverables and partner needs.
- `ProjectMilestone`: stable ID, localized title/description, current/planned/completed state and optional evidence URL.
- `ProjectUpdate`: stable ID, event date, kind (scope/research/partnership/test/delivery), localized title/body, draft/public visibility and optional evidence link.
- `publicProjectUpdates` exposes only public records. Public page is server rendered; draft update content must not be passed to a client component or API response.
- `projectInquiry(project, locale, intent)` carries identity and `commission` or `partner` into the manual enquiry page. This creates no lead record and sends no message by itself.

## Editor the room should provide

1. Select a project by ID; edit its public profile as a draft.
2. Append an update with event date, category, evidence/output attachment, and Arabic/English text. Preserve update IDs and revision history.
3. Set a milestone to completed only with an actual output/evidence and founder review. Never derive completion percentages from page creation.
4. Preview the exact public project page; explicitly publish or unpublish selected content. Preserve earlier revisions for rollback.
5. Keep confidential client work, tasks, budgets, contracts and internal findings in private room records. Only an approved public projection reaches the website.
6. Reuse the room's server-side authorization and audit log. Do not add a separate browser-only password check or publish directly with client credentials.

## Integration acceptance

- Room edits a draft without changing the public page.
- Approved publication changes only the selected project/update; public reads never contain private records.
- A project-specific enquiry retains ID, title and request type even when a visitor edits the message body.
- Old links and the featured-project order survive the storage migration.
- Concurrent edits surface a revision conflict instead of overwriting another editor.
- Publish/unpublish/rollback each have an audit record and a verified public result.

Until this integration is built, changes are committed in the two catalog files and released via the existing reviewed deployment process. Automatic publication remains disabled.

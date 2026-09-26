# Branch handoff — 2026-09-27

Implemented: bilingual reports library and methodology pages; Reports immediately before News in main navigation; searchable index and publication-type filters; dedicated reader with contents, references, citation copy and print; private reports studio with authenticated persistent drafts. Historical Physical AI content stays unchanged and is not described as independently reviewed research.

## Verified
- npm ci with existing lockfile: success; no package changes.
- TypeScript noEmit and targeted ESLint: passed.
- Next production build: passed; 176 static pages plus the private draft API routes. Dummy local Supabase values used only for build.
- Seven tests passed: three catalogue-contract tests and four draft-schema/security/readiness tests. These check software behavior, not scientific accuracy.
- Supabase transaction test passed: authorized editor inserts revision 0, updates to revision 1; stale revision matches no rows; non-editor cannot read or insert. Test fixtures rolled back; zero reports left in the new table.
- RLS and grants checked: anonymous read denied; authenticated DELETE/TRUNCATE denied; owner/editor policies installed. Revision trigger prevents ownership or identity changes.
- Supabase security advisor: no report-table finding. Existing project warning for disabled leaked-password protection remains unchanged.
- git diff --check: passed.

## Preview verification
Current revision awaits automatic branch deployment and browser checks. Earlier branch revision was visually inspected in the cloud browser.

## Limitations
- Authenticated browser create/save has not been exercised; authorization/storage tested at database layer.
- No direct file upload: cover/PDF and source assets are HTTPS links.
- Draft storage is private to each editor. Ready for review is a workflow label; it does not publish or certify a report.
- The reviewed report catalogue remains empty; the only indexed publication is the real historical Physical AI brief.
- Analysis tools are documented candidates, not installed integrations or globally ranked products. Independent scientific roles and first commissioned report remain unassigned.
- Branch only: no main merge or deliberate production website deployment. The additive private-draft schema is already installed in the connected database; existing content and memberships were not changed.

Next scientific execution unit: choose a question within the editorial agenda, obtain licensed source data, reproduce a documented result and complete independent review before admitting a report to the reviewed catalogue.

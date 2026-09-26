# VisionSeek — Build state

Updated: **2026-09-26**. Owner: Dr. Ahmed. Every merge requires founder approval.

## Working now

- Production: `https://visionseek.org`, main `4e0a43c31e18693cafc8de964a2a5938357f023f` at inspection.
- Existing bilingual Next.js site, six proposed program concepts, eight fields and operational `/room`.
- Supabase project `lckngioonokzxkrdwkez` active, PostgreSQL 17 in Seoul.
- Leaders House PR [#29](https://github.com/visionseek1/visionseek-platform/pull/29): preview with real database and private media storage. Owner login, upload → draft → publish → play → archive exercised successfully with a two-second MP4. Test post is archived.
- Public RLS visibility and non-editor write restrictions tested using rolled-back transactions. Bookmark persistence, search and story controls tested in the browser.

## Not live / not connected

| Item | State | Reason / next step |
|---|---|---|
| New Leaders House on production | Awaiting approval | PR #29 is not merged |
| Capabilities Room code M0–M5 | Not started | Step 0 explicitly requires founder approval first |
| Capabilities Room schema and ingestion | Not created | Architecture only at this stage |
| OpenAlex / patent / GDELT / geospatial ingestion | Not connected | Official documentation checked; no Room pipeline run |
| OpenRouter | Subscription confirmed by founder | Project key, balance and model settings not inspected |
| Trigger.dev | Subscription confirmed by founder | Project, plan limits, key and jobs not inspected; proposed ingestion scheduler |
| Hetzner | Subscription confirmed by founder | Server resources, access and backups not inspected |
| n8n | Subscription confirmed by founder | Instance URL, access and plan not inspected; proposed review/integration workflows |
| Apache AGE | Unavailable in managed project extension list | Proposed Neo4j Community on Hetzner for M3 |
| PatentsView | Current API operation unverified | Official migration notice; verify resumption or use EPO OPS |
| OpenSky / Global Fishing Watch | Deferred | Commercial-use terms need compatible permission |

## Approved vs proposed

- Existing program cards remain **proposed, not launched or funded**.
- [Step 0 report](docs/CAPABILITIES_STEP0.md) and [source registry](DATA_SOURCES.md) are proposals for review.
- No Capabilities source is presented as live, no AI calls were made for it, no DNS changes, no direct push to main.
- Proposed sequence: approve Step 0 → M0 with one verified source → individual PRs for M1–M5.

## Verification limits

- Leaders House browser verification used a desktop viewport. Responsive CSS is implemented; physical mobile device testing remains a review item.
- Existing preview health workflow can accept Vercel protection without the bypass secret; it is not proof of data functionality by itself.
- No subscription plan or service quota has been inferred from the founder's confirmation of an account.
- Update this file only after a claimed integration has actually run and its evidence has been recorded.

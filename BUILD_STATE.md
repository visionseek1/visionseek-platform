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

- Founder requirement: the entire Capabilities Room is private to Dr. Ahmed, with delegated assistant access only. [Private access design](docs/PRIVATE_ROOM_ACCESS.md) supersedes public navigation, anonymous data reads and automatic Room-to-Leaders publishing. Owner checks, RLS, private files, scoped MCP and negative-access tests are required for M0; none are implemented for the new Room yet.
- Founder authorizes adding important discoveries to the private candidate catalogue during ongoing work. OpenSandbox, OpenLineage and OPA were added with official sources and acceptance gates; none is installed or running. Candidate discovery does not create a background monitoring job or bypass the existing implementation/merge gates.
- Existing program cards remain **proposed, not launched or funded**.
- [Step 0 report](docs/CAPABILITIES_STEP0.md) and [source registry](DATA_SOURCES.md) are proposals for review.
- [Capability catalogue](docs/CAPABILITY_CATALOG.md) includes all 14 founder-supplied capabilities with unique IDs, seven functional families, sector mappings to the existing eight fields, separate tool categories, rarity tags and acceptance criteria. This is a design update only; none of these additions is claimed operational.
- Founder clarification incorporated in [capability portfolio](docs/CAPABILITY_PORTFOLIO.md): integrate reusable capabilities for sensing, understanding, decision optimization, program proof and execution. OR-Tools, MLflow and optional industrial robotics simulation are candidate extensions, not installed integrations or automatic M0 scope.
- [MCP integration design](docs/MCP_INTEGRATION.md) incorporates the founder's requirement to expose capabilities to existing assistants and consume suitable external tools. Feature selection compares against direct chat with its available connectors. MCP server/client compatibility and account entitlement remain untested; proposed M0 acceptance includes one real read via MCP after Step 0 approval.
- [Advanced capability selection](docs/FRONTIER_CAPABILITY_SELECTION.md) records official Palantir/Microsoft/Google/NVIDIA candidates and the founder-confirmed Cursor/Grok/Claude resources. No integration, assistant delegation, new subscription or scheduled discovery job has been run. Current TimesFM 3.0 weights are excluded from commercial production under their documented license; a suitable earlier release or alternative needs benchmarking.
- No Capabilities source is presented as live, no AI calls were made for it, no DNS changes, no direct push to main.
- Proposed sequence: approve Step 0 → M0 with one verified source → individual PRs for M1–M5.

## Verification limits

- Leaders House browser verification used a desktop viewport. Responsive CSS is implemented; physical mobile device testing remains a review item.
- Existing preview health workflow can accept Vercel protection without the bypass secret; it is not proof of data functionality by itself.
- No subscription plan or service quota has been inferred from the founder's confirmation of an account.
- Update this file only after a claimed integration has actually run and its evidence has been recorded.

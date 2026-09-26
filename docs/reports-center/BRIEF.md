# VisionSeek Reports — operational brief
Date: 2026-09-27 (Asia/Seoul)
Base: dcaa5eb1b8a186a8b2c6280e21b6039300b2a4f6 (origin/main at branch creation)
Branch: feat/reports-center-20260927

## Outcome
A bilingual reports center on the existing website, with a transparent editorial method and a structured publication contract. Regional leadership and institutional reliance are ambitions, not established endorsements.

## Authority and continuity
Current founder instruction authorizes work on a separate branch from latest main. No merge or production deployment is included.
Read institutional reference v1.4: https://app.notion.com/p/3e7e8808b7a681cbab73ed80b340a457
The department operates through a research/editorial agenda. Country selection is evidence-led; Egypt-first was superseded. Existing Physical AI brief is historical content, not newly verified research.

## Scope and hypotheses
1. Readers need a library and a clear way to inspect methodology, sources, versions and review status.
2. Open tools can support reproducible work; documentation review is not an operational benchmark.
3. The first production report needs a commissioned question, available data and independent review; no fabricated reports or statistics will populate the section.

## Deliverables, owners and timing
- This development session: ChatGPT implements /reports and /ar/reports, editorial-method pages, source register and report metadata validation.
- Before branch handoff: ChatGPT verifies type/lint/build where environment permits and records exact limitations.
- Before first report: Dr Ahmed approves question/resources; scientific editor and independent reviewer remain unassigned. No invented calendar commitment.
- Before publication: named human approver accepts a version-specific evidence package.

## Acceptance
Bilingual responsive pages; existing content preserved; no invented completed reports; every proposed tool distinguished from an installed integration; every reviewed report requires sources, limitations, review evidence and version metadata. Initial public-library increment did not change live data, credentials or database schemas. The subsequent founder request for report entry authorizes private draft storage, described below.

## Institutional design
Commission → protocol → source/rights checks → immutable raw inputs → analysis + sensitivity → independent review → revision → human publication approval → version archive/corrections.
Track claim type, evidence status and review status separately. AI assists extraction/code/drafting but does not grant scientific acceptance. Restricted data can have a reproducibility access procedure rather than public redistribution.

## Reference decisions (documentation checked 2026-09-27)
- OECD methods: https://www.oecd.org/en/data/methods.html — assess relevance, accuracy, coherence and comparability; not just attractive charts.
- World Bank DIME: https://github.com/worldbank/dime-standards — reproducibility and research standards; adapt to each study, no claimed certification.
- Jupyter: https://jupyter.org/ — share computational notebooks.
- DuckDB: https://duckdb.org/ — analytical SQL over tabular files; MIT license documented on official site.
- Quarto: https://quarto.org/ — scientific publishing from a reusable source.
These are selected candidate capabilities, not a claim they are universally the strongest. Initial evaluation: same public dataset, identical result, clean rerun, documented version/license, Arabic export, cost and review effort. QGIS/KNIME/Superset and other tools are future candidates only when a question needs them.

## Design revision — founder feedback, 27 September
The founder rejected the initial visual treatment and requested Reports in the primary navigation. Revision restores the existing black/white/lime tokens and fonts. Reports is a full top-level navigation section, including the existing mobile menu. Removed duplicated utility link.
Reference review: MGI research themes (https://www.mckinsey.com/mgi/our-research/all-research), OECD publication taxonomy (https://www.oecd.org/en/publications.html), World Bank research/publications (https://www.worldbank.org/ext/en/research-publications). World Bank was also visually inspected in-browser: a leading publication with prominent title, cover and direct reading/download action. Adapted publication hierarchy and editorial spacing, not their brand assets or claims. Reused existing VisionSeek industrial image as illustrative cover; no source data or invented research added.

## Revision 3 — reader experience and founder navigation order
Founder request: Reports immediately before News; the department has not yet reached the intended international standard.
This iteration targets the reading journey: concise publication-led index, real search and type filtering, a dedicated bilingual report reader, contents navigation, original source list, publication/review record, print and citation-copy actions. One genuine archival brief remains one publication, not multiple fabricated editions. No new research findings or claim of independent review. Existing Insights route and text preserved by extracting a shared source module.
Reference inspected: RAND Research & Commentary (https://www.rand.org/pubs.html): explicit publication types and searchable catalogue. MGI research themes: subject-led discovery. These inform UI structure, not a claimed partnership or scientific equivalence.
Acceptance this session: navigation order, accurate filter/empty states, bilingual reader, source navigation and copy citation, build/types/lint; inspect the published preview. Scientific next gate remains an original analysis with licensed inputs, reproducible calculation and independent review.

## Reports studio — founder request for report entry
Routes: /ar/reports/studio and /reports/studio. Reuses existing Supabase sign-in and leaders_editors membership; does not add members or expose service credentials. Editors can create/edit their own private bilingual drafts, organize sections, attach source and cover/PDF links, preview, export JSON, mark ready for review, archive and restore. The review label is administrative, not independent scientific approval. No public publishing action is provided.
Private reports_drafts storage was installed on the connected VisionSeek Supabase project with owner-scoped RLS and explicit SELECT/INSERT/UPDATE grants only. Existing users, roles and publication content were not modified. A database trigger preserves identity and increments revision; the application uses revision checks to reject stale saves. Database test fixtures were rolled back. SQL install script is db/reports-drafts.sql; deployed migrations are reports_private_drafts and reports_drafts_explicit_grants.
Limits: latest 200 drafts, 100 KB request limit, external HTTPS file links (no direct upload), no collaborative assignment, scheduled publication or approval workflow. Unsaved edits warn before editor navigation, switching documents, refresh, sign-out and browser unload. API is private/no-store; studio pages are noindex.

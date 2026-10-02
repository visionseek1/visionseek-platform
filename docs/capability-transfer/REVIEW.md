# Homepage proposal — Critical Capability Transfer

Prepared 2026-10-03 Asia/Seoul. Status: founder review, preview only.
Baseline: main ed7cb367779b30d8fe17d92bf8020786b6176605 (PR43).

## Source and scope
Founder instruction in this conversation: make critical capability transfer central to homepage storytelling; preserve Make It Possible, branding and navigation; do not publish production. Copy is a proposal, not a statement of proven project delivery. No new claims about customers, partners or performance.

## Order
1. Static hero: Make It Possible; specific outcome and concise explanation; start CTA.
2. Exists globally / VisionSeek connects missing elements / operates locally.
3. Discover / identify need / architect transfer / connect / deploy and validate, with a tangible output per stage.
4. Six connected ingredients, operational outcome, illustrative industrial AI example.
5. Programs, R&D Opportunities, Projects, Reports, Work with Us; dedicated HLO and Leaders House cards.
6. Outcome-led contact and founder link.

## Exact changes from published homepage
Replace rotating three-slide hero with a fixed message: explanation is visible without waiting or clicking. Replace the home-only InstitutionExplainer, editorial question/readings, InstitutionHome program-concept and workshop/news previews, MethodSpotlight, community and sector grids, and duplicate contact blocks with the six-section narrative above. These underlying pages and components remain unchanged. Keep current header/footer/logo/fonts/colors and existing routes. HLO remains linked to its existing program description; no claim that it equals or cancels any earlier program. No PR44 rejected redesign or PR45 pending logo strip included.

## Copy
Complete bilingual copy: components/transfer/content.ts. Rendering: components/home-page.tsx. Responsive styles: components/transfer/home.module.css. All new user-facing text is provided in AR and EN.

## Decisions to review
Arabic headline proposed: «ننقل القدرات المتقدمة من العالم إلى مؤسستك.» It starts with a concrete outcome. The technical name «نقل القدرات الحرجة» appears in the next section. English preserves the founder's proposed headline verbatim. The latest request includes R&D Opportunities; retain the existing link and nav for this proposal rather than applying the earlier unpublished removal. No change to HLO operational status or admin/report-editor models.

## Ten-second comprehension
The first screen states: global discovery, the institution as recipient, connected implementation, and a working capability. No carousel delay and no need to understand Capability Architecture. Editorial heuristic only: no independent first-time-user test has been conducted. Acceptance before publication: show the first screen for 10 seconds to 3 people unfamiliar with VisionSeek; at least 2 should describe finding global capabilities and making them work in an institution, without classifying the offer as introductions alone.

## Next action
Founder reviews copy and preview. Website agent applies feedback; publication requires a new explicit approval for this proposal. Navigation and all destination workflows are retained, not redesigned or operationally validated by this change.

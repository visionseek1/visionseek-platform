# Leaders House — UX review and repair

## Brief
- Requested outcome: a clear white social reading experience, direct vertical video navigation, and practical reuse of mature open-source components.
- Owner/executor: Codex. Product acceptance: Dr. Ahmed Abdelalim.
- Scope: PR29 preview; no main merge, production publishing, account/permission/database changes.
- Checkpoint: 26 September 2026. Acceptance: visible first content sooner; correct video entry/share; usable discovery, keyboard focus and collections; no new paid dependency.
- Hypothesis: compact discovery and clearer controls reduce effort to reach and reuse an idea. Improved retention is NOT measured or claimed.

## Findings and implemented response
| Finding from code or desktop inspection | Response |
| --- | --- |
| Expanded editorial digest occupies much of the initial viewport | Radix Collapsible, closed initially; sources remain accessible |
| Stories repeat topic labels and require horizontal scrolling without explicit controls | Embla horizontal carousel, unique story titles, previous/next controls, RTL and reduced-motion options |
| Feed cards contain hidden/inert video players with native controls under an entry overlay | Poster-only preview; neutral branded placeholder for uploads without posters; zero feed video elements |
| Native sharing has no visible link fallback | Share dialog exposes a selectable URL, copy action and optional device sharing |
| Shared video URLs open a text-only detail | Open vertical player; separately retain shared posts outside the loaded page |
| No chronological ordering option | Explicit For you / Latest controls; Latest does not privilege featured posts |
| Controlled dialogs have no Trigger to restore focus | Reader-specific Radix wrapper remembers and restores the opener; translated 44px close controls |
| Several dialog controls retain dark-theme colors | Correct reader actions, checkboxes, focus rings and touch target size |
| Image post detail loses the image | Include original media in expanded detail |
| Fullscreen player inherits grid sizing from generic dialog | Explicit block container and full-height scroll rail |
| Topic/collection buttons expose visual selection only | aria-pressed state |
| Mobile heading does not clearly show the Arabic product name | Bilingual product identity in header |

## Reuse and sources
- Radix Primitives, installed `radix-ui`: Dialog focus behavior and Collapsible. No added package. https://www.radix-ui.com/primitives/docs/components/dialog and https://www.radix-ui.com/primitives/docs/components/collapsible
- Embla Carousel React 8.x, already installed: story swipe, RTL, resize/reinit, focus navigation. Version-specific API: https://www.embla-carousel.com/docs/v8/api/options
- Video performance guidance: https://web.dev/articles/lazy-loading-video — poster-first rendering; mount active and neighboring reel players only.
- Open-source licenses remain in dependency distributions. No third-party videos or brand assets copied.

## Deliberate deferrals
- A learned recommendation engine needs sufficient content and real behavior data; current For you is explicit topic ranking, not TikTok's proprietary system.
- Adaptive bitrate/transcoding and generated thumbnails need a separate media pipeline and cost decision. Existing upload size/codec limitations remain.
- Cross-device saves require reader accounts and server-side ownership, outside this change.
- Pagination uses created_at and can miss equal-timestamp boundaries; search only covers loaded posts. A query/cursor redesign is a separate data-layer task.
- Expiring signed media URLs still need refresh for very long sessions.
- A physical phone and real touch test is pending. Do not equate desktop testing with mobile acceptance.
- CSS still contains historical overrides; scoped cleanup is deferred until this design is accepted.

## Validation record
Local checks and exact deployed-head browser results are recorded in PR29 after the preview is ready. Do not infer successful browser testing from a passing build.

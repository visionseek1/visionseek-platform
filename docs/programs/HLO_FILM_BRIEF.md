# HLO — established program and explainer film

Date: 2026-09-28. Owner/executor: Codex website workspace. Approver: Dr. Ahmed Abdelalim. Target: a working bilingual preview in this session; production publication remains separate.

## Founder correction

HLO is an existing VisionSeek program, not a program waiting to be built. The founder explicitly corrected the catalogue's "Programs we are building" and first-pilot framing. This instruction supersedes the stage assumption in CATALOG_BRIEF.md and the former public first-pilot note. It does not assert completed client engagements, measured results or an automated operating system.

## Outcome

Present HLO confidently as a VisionSeek program. Explain how it connects an institution with global opportunities and capabilities it may not even see, to pursue the highest level it can practically reach. Replace development-stage copy in both languages and on all shared public surfaces.

## Film

Create an original 56-second, eight-scene motion-graphics film in Arabic and English. The supplied Palantir AIP screenshot is a reference for visual presence and explanatory product presentation only. Do not copy footage, logos or proprietary interfaces. Use VisionSeek's dark/lime visual language and the website's Arabic font.

Narrative: unseen global opportunity → institution's ambition → wider field of vision → relevant opportunities → assembled solution → evidence → operating capability → HLO / Make It Possible. Visuals are diagrams of the method, not screenshots of operating software, client data or promised results. Silent by design, with readable on-screen copy and a full accessible transcript.

## Delivery and acceptance

- Same open PR #44, branch feature/programs-hlo-first; preserve R&D removal and HLO-first catalogue.
- HLO program hero and prominent film; manual play, native pause/seek/fullscreen, chapters, transcript and an error fallback.
- MP4 H.264/yuv420p, fast start, 1280×720; no autoplay or mandatory heavy download before playing.
- Bilingual public copy, contact path retained; no database, automation or private-room changes.
- Check exported frames, duration/codec, build, lint, navigation regression and live video playback/chapters. Include limitations in the handoff.

The reproducible renderer lives in scripts/hlo-film; shared bilingual storyboard is lib/programs/hlo-film.json. Public assets live in public/media/hlo. These are part of the Git-backed site, with no separate external media dependency.

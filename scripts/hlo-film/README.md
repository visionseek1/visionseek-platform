# Reproducing the HLO film

The two 56-second public films are original motion diagrams of VisionSeek's method. They do not contain stock footage, a copied Palantir interface, a customer case, invented performance metrics, narration or music. Founder reference: the Palantir AIP screenshot supplied on 2026-09-28. See `docs/programs/HLO_FILM_BRIEF.md` for positioning and approval scope.

The canonical story is `lib/programs/hlo-film.json`; it also supplies the website's chapter navigation and accessible transcript. After changing the story, regenerate both videos and posters before deployment. Do not change chapter timestamps without changing the renderer's scene timing.

Requirements: Python 3, Pillow with RAQM, numpy, ffmpeg with libx264. The renderer uses IBM Plex Sans Arabic, matching the website. Download the Regular and SemiBold TTFs from `https://github.com/google/fonts/tree/main/ofl/ibmplexsansarabic` into a temporary directory as `arabic.ttf` and `arabic-bold.ttf`. Font license: SIL Open Font License. Font binaries are not redistributed here.

```bash
python scripts/hlo-film/render.py --fonts /absolute/font/directory --locale ar
python scripts/hlo-film/render.py --fonts /absolute/font/directory --locale en
```

Use `--stills --review-dir /absolute/review/directory` to inspect frames before rendering. Output: `public/media/hlo/hlo-film-{ar,en}.mp4` and matching `-poster.jpg`. Videos: H.264, yuv420p, 1280×720, 24 fps, fast-start MP4, no audio. Public playback is manual with `preload="none"`, native controls/fullscreen, seekable chapters and an HTML transcript. No third-party player or media host is required.

Validation for this revision: production build and ESLint pass; bilingual navigation and project regression checks; inspect story frames; verify both MP4 duration/codecs with ffprobe; verify live play, pause, chapter seeking, transcript and programme contact links. Final live-preview evidence is kept in PR #44. Physical mobile-device testing is not asserted.

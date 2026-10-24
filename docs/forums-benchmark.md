# Forums page — benchmark

Visited 24 October 2026 at a 1440×900 desktop viewport. Computed styles were read from the live pages (Chrome headless). Used as a layout standard, not as a claim of equivalent status.

| Site | URL |
| --- | --- |
| Munich Security Conference | [securityconference.org/en](https://securityconference.org/en/), [/msc](https://securityconference.org/en/msc/), [/msc-2026](https://securityconference.org/en/msc-2026/) |
| World Economic Forum Annual Meeting | [weforum.org/meetings/...-2026](https://www.weforum.org/meetings/world-economic-forum-annual-meeting-2026/) |
| Raisina Dialogue | [raisinadialogue.org](https://raisinadialogue.org/), [/raisina-2026](https://raisinadialogue.org/raisina-2026/) |
| IISS Shangri-La Dialogue | [iiss.org/.../shangri-la-dialogue-2026](https://www.iiss.org/events/shangri-la-dialogue/shangri-la-dialogue-2026/) |
| Milken Institute Global Conference | [milkeninstitute.org/events/global-conference-2026](https://milkeninstitute.org/events/global-conference-2026) |

## Page section order

| Site | Order from the top |
| --- | --- |
| MSC home | Institution welcome → next-edition date as a plain sentence → named meeting types → news → publications. |
| MSC /msc | Forum name → one mandate paragraph → **MSC 2027** edition block (dates + venue) → past editions. |
| MSC 2026 | Edition name as H1 → dates and venue in the lead → What to Expect → named rule (Munich Rule) → agenda / participants / media cards. |
| WEF AM | Edition H1 → date + city + theme → **Overview** (about + why) → What to know / film → related stories. |
| Raisina home | Edition title → dates → one-sentence mandate → theme name → satellite events (some marked invite-only). |
| Raisina 2026 | Edition + dates → about + theme essay → **Thematic Pillars** (named, with prose) → inauguration / curator / hosts / speakers → publications. |
| Shangri-La 2026 | Named summit + year → date and city as two metadata items → one edition paragraph → recordings and session titles (these *are* the themes). |
| Milken GC 2026 | Date above the title → H1 → theme line → about → Event Details (date + venue) → FAQ (what / who / where / how) → speakers → past editions. |

Shared spine: **name → edition facts → about → why this meeting → themes → format or rule → participation (only if named) → a quiet close.**

## Hero pattern

- The **forum name is the page**. MSC about: H1 “Munich Security Conference”. WEF: H1 is the edition. Shangri-La: “The IISS Shangri-La Dialogue 2026”. Milken: “Global Conference 2026”. Raisina uses a large edition title (H2 on the live DOM, 34px / 700).
- Date and city sit **next to the title as type**, not as a chip stack. MSC: “The MSC 2027 will take place from February 12 to 14, 2027.” Shangri-La: two items under the H1 — “29th–31st May 2026” and “Singapore”. Milken: “3 – 6 May 2026” above the H1. WEF: “19–23 January 2026” and “Davos-Klosters, Switzerland” as two facts.
- Photography is real or absent. None of these sites stretch a decorative raster to fill a 16:9 hole. Type carries the hero; an image, if present, is a photograph of the room or a film still.

## Typography scale (computed)

| Site | H1 | H2 | Body / lead |
| --- | --- | --- | --- |
| MSC | 42px / 400 / 50.4px (lh 1.20), Realist | 40px / 400 / 48px — almost the same size as H1 | Intended body ~18px / 25.2px (lh 1.40) |
| WEF | 48px / 900 / 56px (lh 1.17), Akkurat | 40px / 900 / 48px (“Overview”) | Editorial column, not a cookie banner |
| Raisina | Edition title 34px / 700 / 43.7px, Raleway | Pillar titles as H3 under “Thematic Pillars” | 16px / 500 / 29px (lh 1.81), column **655px** |
| Shangri-La | 64px / 400 / 69.8px (lh 1.09), Playfair Display | Session titles in a serif display | Serif body (Noto Serif) |
| Milken | 60px / 500 / 66px (lh 1.10), Lato | Section titles ~48px | 18px / 400 / 27px (lh 1.50), about column **843px** |

The useful rule: **H2 is a real title (34–40px), not a 12–14px coloured label.** Body is 16–18px with line-height 1.5–1.8.

## Line length

Raisina’s mandate column is 655px at 16px — about **65–75 characters**. Milken’s about column is 843px at 18px — the upper end of a comfortable measure, still a column, not full bleed. MSC’s H1 itself is only 417–481px wide; the welcome is a short line, not a paragraph stretched across the viewport.

Apply **60–75ch** on every editorial block. Do not let body copy ride the full 1440px.

## Spacing

These pages use a large, even section rhythm: a short hero, then blocks separated by a hairline or a full-width band, not a stack of tight cards. Raisina’s body line-height (29px on 16px) is the most readable; MSC is tighter (1.4). A consistent **8px grid** (section padding 64px desktop / 40px mobile, 20–24px between short paragraphs) matches the calm of those interiors better than uneven `!important` margins.

## Editions, dates, venue

Always three facts, in type:

1. **Which edition** (62nd MSC, 56th Annual Meeting, 11th Raisina, 23rd Shangri-La, 29th Global Conference).
2. **When** — a range if they have days; a month if they do not.
3. **Where** — city, then a hall only when it is public (Bayerischer Hof, Shangri-La Hotel, Beverly Hilton).

If a hall is not public, they still name the **city**. They do not invent a room.

## Pillars / themes

- Raisina: a heading “Thematic Pillars”, then **named** pillars with a short essay each — not icons, not a blog grid.
- WEF: **one** named theme (“A Spirit of Dialogue”), then the overview explains it.
- Shangri-La: plenary titles *are* the themes.
- MSC: topics appear in prose (“European security… security implications of technological advances”), not as a tag cloud on the home.
- Milken: “Solving Challenges” names fields in a sentence.

Named list, then one line each. No illustrated cards.

## Speakers / participation

Raisina and Milken name people only when the names exist. MSC links to a Participants page after the fact. Shangri-La lists keynote names on the edition page. **None of them invent a speaker wall.** Invite-only is stated as a fact (Raisina satellites, Shangri-La ministerial roundtables, MSC credentialing).

If we have no names, we describe **who is invited**, not who will speak.

## CTA

- MSC home: no public signup. Accreditation lives on a Media Hub.
- WEF: credentialed meeting, not a web form on the hero.
- Raisina: “Get in Touch” (address / email / phone) at the foot; satellites marked invite-only.
- Shangri-La: “Contact the team” in a utility list.
- Milken: downloads and “Recommend a Speaker” — after the about, not as a registration dump on the H1.

The close is a **quiet request** (mailto or a later credential). No `<form>` on the page.

## Imagery

Photographs of rooms and people, or a film. Logos stay logos. A sharp mark is acceptable when there is no photography. A 1280×720 raster stretched full-bleed fails this test.

## What VisionSeek will take

1. The forum name is the H1; “Conferences” stays a breadcrumb.
2. The edition line is a fact in type: **First edition: April 2027, Incheon** / **الإصدار الأول: أبريل 2027، إنتشون**. City only. No day, no hall.
3. A four-fact strip under the title (edition / when / where / access), in the Shangri-La + Milken manner.
4. Real section titles (About / Why / Themes / Format), sized like MSC/WEF H2s, not lime micro-labels.
5. Measure locked at ~68ch; short paragraphs; 8px spacing grid.
6. Themes as a named list of the seven technologies — no cards.
7. The Incheon Advisory Council and the Localization Awards sit **inside** the Incheon Dialogue block. Status is a fact in type (composition announced at the Dialogue; awards announced there). Not a second hero. No member names or photos.
8. Register-interest close is a lime button that opens mail. No form, no invented speakers, partners, numbers, or venue beyond Incheon.

## What VisionSeek will not copy

No invented speakers, partners, sponsors, halls, or day-of-month. No blog/news card dump. No MSC/WEF photography we do not have. The page uses approved wording and the existing vector marks (Korea–Arabia arc; awards symbol). The Council names no members. The awards name no judges, no prize money, and no day.

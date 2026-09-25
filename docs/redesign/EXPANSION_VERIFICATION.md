# Institutional expansion verification

Date: 2026-09-25 UTC
Branch: redesign/darpa-capability

## Scope
Eight bilingual section directories and 59 detail entries per locale. Existing brand and founder content retained. Program concepts, exploratory opportunities, proposed office mandates, career participation roles and six weekly workshop formats are explicitly identified as proposed rather than operating/funded/confirmed.

## Checks completed
- ESLint passed.
- Production Next.js build passed: 154 routes generated.
- All three Node tests passed, including bilingual section coverage and local links/hash destinations in generated institutional pages.
- git diff --check passed.
- Vercel preview for commit 389df07839cab9e51a8c28b038437ca62617b13d reached READY.
- Browser: eight Arabic header links and program dropdown rendered; keyboard activation and Escape exercised.
- Browser: program search VS-P01 returned 1/10 results; program-concept filter returned 6/10.
- Browser: synthetic concept inputs produced correct Arabic Markdown, displayed unsent status and download control; download button activated. No email was sent. Downloaded file bytes were not inspected.
- Browser: document width 1348 within viewport width 1363 on homepage and concept form.
- Small follow-up: prevent legacy header wrapper from clipping expanded navigation.

## Limits
Narrow viewport browser verification unavailable in this runtime; responsive CSS implemented. The website has no automatic application-submission backend or confirmed workshop booking system. No production promotion performed. Actual dates, appointments, funding and operating programs require owner-supplied facts.

# Vercel

This repository is a vinext + Cloudflare Worker app (ChatGPT Sites lineage).
It does not emit `.next`.

If Vercel auto-detects Next.js, the deploy fails with:
`The Next.js output directory ".next" was not found`.

In the Vercel project: Framework Preset = Other. Do not use the Next.js preset.
A green build still does not mean the Worker/D1 portal runtime is on Vercel.
Production cutover stays a land decision, not a preset toggle.

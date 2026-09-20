# Vercel preview deployment

This repository runs as a native Next.js App Router application on Vercel.

Set these environment variables in the Vercel project for Preview and Production
before enabling any Supabase-backed feature:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Do not commit environment files or keys. The Vercel project must use the
Next.js framework preset. Preview deployment is independent from the
`visionseek.org` custom domain.

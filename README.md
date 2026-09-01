# VisionSeek Website

The public website for VisionSeek, an institution bringing together technology,
science, design, and entrepreneurship to build new products, platforms,
ventures, and capabilities.

## Technology

- Next.js-compatible App Router through vinext
- React and TypeScript
- Tailwind CSS
- Cloudflare Workers deployment through ChatGPT Sites

## Local development

Use Node.js 22 or newer.

```bash
npm ci
npm run dev
```

## Quality checks

```bash
npm run lint
npm test
```

Pull requests run linting, tests, a production build, dependency review, and
CodeQL analysis. Dependabot checks npm packages weekly and GitHub Actions
monthly.

## Security

Report vulnerabilities privately to `abdelalim@visionseek.org`. See
[SECURITY.md](SECURITY.md) for the disclosure policy. Do not include secrets in
the repository; deployment credentials and service keys must be configured in
the hosting platform.

## Deployment

Production is managed through ChatGPT Sites. The source is committed before
each saved and deployed version so every release remains traceable and
reversible.

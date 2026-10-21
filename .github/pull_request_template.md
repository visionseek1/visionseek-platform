## Summary

Describe what changed and why.

## Verification

- [ ] `npm run lint`
- [ ] `npm test`
- [ ] Security and privacy impact reviewed
- [ ] Mobile and desktop behavior checked when UI changed

## Deployment notes

List configuration changes, migrations, external services, or rollback steps.

## Shared management room handover

- Workspace and module IDs:
- Handover file (`docs/manage-room/handovers/<feature-id>.json`):
- Evidence and remaining work:
- [ ] Existing unit/source/auth reused; new unit registered in `modules/` if needed
- [ ] `npm run manage:registry` and `npm run manage:check` passed
- [ ] Generated catalog committed; changed application paths covered by this handover
- [ ] Publication/operational readiness stated separately from code merge

See `docs/manage-room/WORKSPACE-INTEGRATION.md` and `AGENTS.md`.

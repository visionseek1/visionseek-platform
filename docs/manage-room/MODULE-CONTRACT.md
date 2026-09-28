# Unit handover contract

Runtime validation: lib/manage/contracts.ts; source registrations: modules/*.json.
Run npm run manage:registry to generate the shared catalog; lib/manage/registry.ts validates it.
Supply schemaVersion, stable moduleId, bilingual names, description, approved icon, order,
public routes, adminEntryPoint, owner, codeRef, docsUrl, readiness, capabilities with disabled
reasons, permission vocabulary, agentTools, healthEvidence, migrations/dependencies,
rollbackNotes, workflowEnabled and acceptanceEvidence. V1 deliberately accepts no agent tools.

Readiness is independent of publication. editorAvailable means code is in this release;
it does not prove saving or live health. Health stays unknown until an authorized user
opens, saves, then reopens the same unit output through the room.

| Unit | Evidence | Behavior | Next owner handover |
|---|---|---|---|
| Leaders | main 108c883 has existing studio | Existing editor link, own editor permissions | Save/reopen evidence |
| Reports | main 8feafd6 has existing studio | Existing editor link, own editor permissions | Save/reopen through the room |
| Programs | branch at dcaa5eb | Editor unavailable | Deliver actual editor and contract |
| Training | test registration only | Planned; mutations disabled | Future implementation and evidence |

Room permissions ONLY control room operations. They do not create leaders_editors
membership or publishing rights. Existing editor files and records are untouched.
Notion remains documentation; GitHub code; application DB operational state. The integration
view automatically reads public PR/main activity, while chat/Notion contents are linked through
explicit handovers, not automatically mirrored. See WORKSPACE-INTEGRATION.md.

To add a unit: add modules/<module-id>.json with workflowEnabled=false, then regenerate the
catalog. It appears in that build without editing the registry implementation. To activate
room tasks separately, submit an additive manage_private.modules row with
work_enabled=false in the reviewed DB change; grant verified principals only approved actions;
then integrate the editor and enable capabilities after unit-owner acceptance. The database
module row is workflow eligibility, not duplicate content. Set workflowEnabled=true only after
the reviewed DB registration. Tests discover new manifests without changing existing unit logic.
Registering never creates APIs or credentials. Current additional discovery cards cover Projects,
Website, R&D Opportunities, Workshops, Work with Us and Management; their room workflows are off.

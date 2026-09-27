# Unit handover contract

Runtime validation: lib/manage/contracts.ts; registry: lib/manage/registry.ts.
Supply schemaVersion, stable moduleId, bilingual names, description, approved icon, order,
public routes, adminEntryPoint, owner, codeRef, docsUrl, readiness, capabilities with disabled
reasons, permission vocabulary, agentTools, healthEvidence, migrations/dependencies,
rollbackNotes and acceptanceEvidence. V1 deliberately accepts no agent tools.

Readiness is independent of publication. editorAvailable means code is in this release;
it does not prove saving or live health. Health stays unknown until an authorized user
opens, saves, then reopens the same unit output through the room.

| Unit | Evidence | Behavior | Next owner handover |
|---|---|---|---|
| Leaders | main 108c883 has existing studio | Existing editor link, own editor permissions | Save/reopen evidence |
| Reports | separate branch 6166424 | Editor disabled here | Manifest, auth adapter, reviewed integration |
| Programs | branch at dcaa5eb | Editor unavailable | Deliver actual editor and contract |
| Training | test registration only | Planned; mutations disabled | Future implementation and evidence |

Room permissions ONLY control room operations. They do not create leaders_editors
membership or publishing rights. Existing editor files and records are untouched.
Notion remains documentation; GitHub code; application DB operational state. No automatic sync.

To add a unit: validate a new manifest; submit an additive manage_private.modules row with
work_enabled=false in the reviewed DB change; grant verified principals only approved actions;
then integrate the editor and enable capabilities after unit-owner acceptance. The database
module row is workflow eligibility, not duplicate content. Tests register a fifth manifest
without changing any existing unit logic. Registering never creates APIs or credentials.

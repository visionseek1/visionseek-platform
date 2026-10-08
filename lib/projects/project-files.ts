import {projects, type ProjectFile} from './index';

export type {ProjectFile, ProjectMilestone, ProjectUpdate} from './index';

/** The dossier now lives inside each concept's JSON (content/projects/concepts/<slug>.json, key `file`). */
export const projectFileById=(id:string):ProjectFile|undefined=>projects.find(project=>project.id===id)?.file;
export const publicProjectUpdates=(file:ProjectFile)=>file.updates.filter(update=>update.visibility==='public').sort((a,b)=>b.date.localeCompare(a.date));

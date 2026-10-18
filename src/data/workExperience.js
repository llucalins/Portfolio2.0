import { selectedWork } from './selectedWork.js';

// A portfolio priority (kind) is not evidence of a commercial engagement.
// Set engagement only after an explicit confirmation: freelance or independent.
export const groupWork = (projects = selectedWork) => ({
  freelance: projects.filter((project) => project.engagement === 'freelance'),
  independent: projects.filter((project) => project.engagement === 'independent'),
  unclassified: projects.filter((project) => !['freelance', 'independent'].includes(project.engagement))
});

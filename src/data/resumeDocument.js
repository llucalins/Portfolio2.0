import { professionalProfile } from './professionalProfile.js';
import { selectedWork } from './selectedWork.js';
import { pt } from '../translations/pt.js';
import { en } from '../translations/en.js';

export const resumePdfPath = (language) => `/resumes/lucas-virginio-${language === 'en' ? 'en' : 'pt-br'}.pdf`;
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

// Facts and selection live in the shared profile; PDF editorial copy stays separate
// from the complete web resume so PDF refinements don't change /work or site styling.
export function resumeMarkup(language = 'pt') {
  const copy = language === 'en' ? en : pt;
  const t = (key) => key.split('.').reduce((value, part) => value[part], copy);
  const localize = (value) => typeof value === 'string' ? value : value[language];
  const section = (title, body) => `<section><h2>${escape(title)}</h2>${body}</section>`;
  const p = (text, className = '') => `<p${className ? ` class="${className}"` : ''}>${escape(text)}</p>`;
  const list = (items) => `<ul>${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ul>`;
  const projectMarkup = (project) => {
    const title = escape(localize(project.title));
    const heading = project.repositoryUrl ? `<a href="${escape(project.repositoryUrl)}">${title}</a>` : title;
    const contribution = project.resume ? t(project.resume.contributionKey) : project.scope[language];
    const stack = project.resume?.technologies || project.stack;
    return `<article class="document-project"><h3>${heading}</h3>${p(contribution)}${p(stack.join(' · '), 'document-stack')}</article>`;
  };
  // Undated freelancer activity is deliberately separate from the dated chronology.
  // Projects may enter that activity only with an explicitly confirmed engagement.
  const freelanceProjects = selectedWork.filter((project) => project.engagement === 'freelance');
  const freelance = `<article class="document-entry document-freelance">
    <h3>${escape(t(professionalProfile.freelance.titleKey))}</h3>
    ${p(t(professionalProfile.freelance.pdfDescriptionKey))}
    ${list(t(professionalProfile.freelance.pdfBulletsKey))}
    ${freelanceProjects.map(projectMarkup).join('')}
  </article>`;
  const projects = professionalProfile.resume.projectIds
    .map((id) => selectedWork.find((project) => project.id === id))
    .filter((project) => project && project.engagement !== 'freelance');
  const contacts = [...professionalProfile.contacts, professionalProfile.portfolio];
  const employment = professionalProfile.experiences.map((experience) => {
    const bulletsKey = professionalProfile.resume.experienceBullets[experience.id] || experience.resumeBulletsKey;
    return `<article class="document-entry">
      <h3>${escape(t(experience.companyKey))}</h3>
      <p class="document-position"><strong>${escape(t(experience.titleKey))}</strong><span class="document-period"> · ${escape(t(experience.periodKey))}</span></p>
      ${bulletsKey ? list(t(bulletsKey)) : p(t(experience.descriptionKey))}
    </article>`;
  }).join('');

  return `<article class="resume-document" lang="${language === 'pt' ? 'pt-BR' : 'en'}">
    <header><h1>${escape(professionalProfile.name)}</h1>${p(t(professionalProfile.roleKey), 'document-role')}
      <p class="document-contacts">${contacts.map((contact) => `<a href="${escape(contact.href)}">${escape(contact.value)}</a>`).join(' · ')}</p>
    </header>
    ${section(t('resumePdf.summary'), p(t('resumePdf.summaryText')))}
    ${section(t('resumePdf.skills'), professionalProfile.resume.skillGroups.map((group) => `<p><strong>${escape(t(group.titleKey))}:</strong> ${escape(group.keys.map(t).join(', '))}</p>`).join(''))}
    ${section(t('resumePage.experience'), employment + freelance)}
    ${projects.length ? section(t('resumePdf.projectHeading'), projects.map(projectMarkup).join('')) : ''}
    ${section(t('resumePdf.education'), professionalProfile.education.map((item) => p(`${t(`${item.baseKey}.degree`)} — ${t(`${item.baseKey}.institution`)} | ${t(`${item.baseKey}.year`)}`)).join('') + `<p class="document-languages"><strong>${escape(t('resumePage.languages'))}:</strong> ${escape(professionalProfile.languages.map((item) => t(item.labelKey)).join(' · '))}</p>`)}
  </article>`;
}

// All selectors are scoped to the hidden print document; the website keeps its design.
export const resumeStyles = `
@page { size: A4; margin: 13mm 16mm;
  @top-left { content: none; } @top-center { content: none; } @top-right { content: none; }
  @bottom-left { content: none; } @bottom-center { content: none; } @bottom-right { content: none; }
}
.resume-document {
  --document-ink: #1c1c1e; --document-body: #2b2b2e; --document-secondary: #535359;
  font-family: Arial, Helvetica, sans-serif; font-size: 10.25pt; font-weight: 400;
  line-height: 1.3; color: var(--document-body); background: #fff; text-align: left;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.resume-document * { box-sizing: border-box; margin: 0; padding: 0; letter-spacing: normal; text-transform: none; }
.resume-document h1 { color: var(--document-ink); font-size: 20pt; line-height: 1.12; font-weight: 700; letter-spacing: -.4pt; }
.resume-document .document-role { color: var(--document-body); font-size: 11pt; margin-top: 4pt; }
.resume-document .document-contacts { color: var(--document-secondary); font-size: 10pt; margin-top: 5pt; line-height: 1.4; }
.resume-document a { color: inherit; text-decoration: none; }
.resume-document section { margin-top: 8pt; padding: 0; }
.resume-document h2 { color: var(--document-secondary); font-size: 10pt; line-height: 1.25; font-weight: 700; letter-spacing: .65pt; text-transform: uppercase; margin-bottom: 5pt; break-after: avoid; }
.resume-document h3 { color: var(--document-ink); font-size: 10.75pt; line-height: 1.25; font-weight: 700; break-after: avoid; }
.resume-document strong { font-weight: 700; }
.resume-document .document-position { margin-top: 2pt; font-size: 10pt; }
.resume-document .document-period, .resume-document .document-stack { color: var(--document-secondary); font-size: 10pt; }
.resume-document p + p { margin-top: 2pt; }
.resume-document .document-entry, .resume-document .document-project { margin-top: 7pt; break-inside: avoid; }
.resume-document .document-entry:first-of-type, .resume-document .document-project:first-of-type { margin-top: 0; }
.resume-document .document-entry > p:not(.document-position), .resume-document .document-project > p { margin-top: 3pt; }
.resume-document ul { padding-left: 12pt; margin-top: 4pt; }
.resume-document li { padding-left: 1pt; }
.resume-document li + li { margin-top: 2pt; }
.resume-document p { orphans: 2; widows: 2; }
.resume-document .document-languages { margin-top: 4pt; }
`;

import { professionalProfile } from './professionalProfile.js';
import { selectedWork } from './selectedWork.js';
import { KNOWN_CERTIFICATES } from '../utils/autoDetector.js';
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
  const section = (title, body, className = '') => `<section${className ? ` class="${className}"` : ''}><h2>${escape(title)}</h2>${body}</section>`;
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
      ${p(t(experience.titleKey), 'document-position')}
      ${p(t(experience.periodKey), 'document-period')}
      ${list(bulletsKey ? t(bulletsKey) : [t(experience.descriptionKey)])}
    </article>`;
  }).join('');

  const skills = professionalProfile.resume.skillGroups.map((group) => `<li><strong>${escape(t(group.titleKey))}:</strong> ${escape(group.keys.map(t).join(', '))}</li>`).join('');
  const languages = `<li><strong>${escape(t('resumePage.languages'))}:</strong> ${escape(professionalProfile.languages.map((item) => t(item.labelKey)).join(' · '))}</li>`;
  const education = professionalProfile.education.map((item) => `<article class="document-education">
    <h3>${escape(t(`${item.baseKey}.institution`))}</h3>
    ${p(t(`${item.baseKey}.degree`), 'document-position')}
    ${p(t(`${item.baseKey}.year`), 'document-period')}
  </article>`).join('');
  const certificates = professionalProfile.resume.certificateFilenames.map((filename) => {
    const certificate = KNOWN_CERTIFICATES[filename];
    const url = new URL(`/certificates/${encodeURIComponent(filename)}`, professionalProfile.portfolio.href).href;
    return `<article class="document-certificate"><h3>${escape(t(`projects.certificates.${certificate.titleKey}`))}</h3>
      <p>${escape(certificate.issuer)} - ${escape(certificate.date)} - <a href="${escape(url)}">${escape(t('resumePdf.certificate'))}</a></p></article>`;
  }).join('');

  return `<article class="resume-document" lang="${language === 'pt' ? 'pt-BR' : 'en'}">
    <header><h1>${escape(professionalProfile.name)}</h1>${p(t(professionalProfile.roleKey), 'document-role')}
      <p class="document-contacts">${contacts.map((contact) => `<a href="${escape(contact.href)}">${escape(contact.id === 'linkedin' ? t(contact.labelKey) : contact.value)}</a>`).join(' <strong> | </strong> ')}</p>
    </header>
    ${section(t('resumePdf.skillsHeading'), `<ul class="document-skills">${skills}${languages}</ul>`)}
    ${section(t('resumePdf.experienceHeading'), employment + freelance)}
    ${projects.length ? section(t('resumePdf.projectHeading'), projects.map(projectMarkup).join(''), 'document-projects') : ''}
    ${section(t('resumePdf.educationHeading'), education)}
    ${section(t('resumePdf.certificatesHeading'), p(t('resumePdf.courses'), 'document-courses-label') + certificates)}
  </article>`;
}

// All selectors are scoped to the hidden print document; the website keeps its design.
export const resumeStyles = `
@font-face { font-family: "Resume Carlito"; src: url("/fonts/carlito/Carlito-Regular.ttf") format("truetype"); font-style: normal; font-weight: 400; }
@font-face { font-family: "Resume Carlito"; src: url("/fonts/carlito/Carlito-Bold.ttf") format("truetype"); font-style: normal; font-weight: 700; }
@page { size: A4; margin: 20mm;
  @top-left { content: none; } @top-center { content: none; } @top-right { content: none; }
  @bottom-left { content: none; } @bottom-center { content: none; } @bottom-right { content: none; }
}
.resume-document {
  font-family: "Resume Carlito", Calibri, sans-serif; font-size: 10.5pt; font-weight: 400;
  line-height: 1.32; color: #000; background: #fff; text-align: left;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.resume-document * { box-sizing: border-box; margin: 0; padding: 0; letter-spacing: normal; text-transform: none; }
.resume-document header { text-align: center; }
.resume-document h1 { font-size: 14pt; line-height: 1.2; font-weight: 700; }
.resume-document .document-role { font-size: 12.5pt; line-height: 1.2; font-weight: 700; margin-top: 4pt; }
.resume-document .document-contacts { font-size: 10.5pt; line-height: 1.2; margin-top: 4pt; white-space: nowrap; }
.resume-document a { color: inherit; text-decoration: none; }
.resume-document section { margin-top: 12pt; padding: 0; }
.resume-document header + section { margin-top: 8pt; }
.resume-document h2 { border-top: .5pt solid #808080; margin-inline: 3.5pt; padding-top: 5pt; margin-bottom: 10pt; font-size: 12pt; line-height: 1.2; font-weight: 700; text-align: center; text-transform: uppercase; break-after: avoid; }
.resume-document header + section h2 { margin-bottom: 8pt; }
.resume-document h3 { font-size: 12pt; line-height: 1.2; font-weight: 700; break-after: avoid; }
.resume-document strong { font-weight: 700; }
.resume-document .document-position { font-size: 10.5pt; line-height: 1.2; font-weight: 700; margin-top: 2pt; break-after: avoid; }
.resume-document .document-period { color: #424242; font-size: 10pt; line-height: 1.2; margin-top: 2pt; break-after: avoid; }
.resume-document .document-entry + .document-entry { margin-top: 20pt; }
.resume-document ul { padding-left: 27pt; margin-top: 9pt; list-style-type: disc; }
.resume-document li { text-align: justify; padding-left: 0; orphans: 2; widows: 2; }
.resume-document li::marker { content: '●   '; font-family: Arial, sans-serif; font-size: 10.5pt; }
.resume-document .document-skills { padding-left: 18pt; margin-top: 0; line-height: 1.2; }
.resume-document .document-entry > h3, .resume-document .document-project > h3 { break-after: avoid; }
.resume-document .document-freelance > p { margin-top: 2pt; }
.resume-document .document-project + .document-project, .resume-document .document-education + .document-education { margin-top: 14pt; }
.resume-document .document-project > p { margin-top: 4pt; text-align: justify; }
.resume-document .document-stack { color: #424242; font-size: 10pt; }
.resume-document .document-education, .resume-document .document-certificate { break-inside: avoid; }
.resume-document .document-projects { break-inside: avoid; }
.resume-document .document-education h3, .resume-document .document-certificate h3 { font-size: 10.5pt; }
.resume-document .document-courses-label { font-size: 11pt; text-transform: uppercase; text-decoration: underline; margin-bottom: 10pt; break-after: avoid; }
.resume-document .document-certificate { line-height: 1.2; }
.resume-document .document-certificate + .document-certificate { margin-top: 14pt; }
.resume-document .document-certificate a { text-decoration: underline; }
.resume-document .document-project h3 { font-size: 10.5pt; }
.resume-document p { orphans: 2; widows: 2; }
`;

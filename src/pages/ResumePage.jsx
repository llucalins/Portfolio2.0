import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { localizeSkillCategory, professionalProfile } from '../data/professionalProfile';
import { selectedWork } from '../data/selectedWork';
import ResumeCertificates from '../components/ResumeCertificates';
import FreelanceExperience from '../components/FreelanceExperience';
import { groupWork } from '../data/workExperience';
import { resumeMarkup, resumeStyles, resumePdfPath } from '../data/resumeDocument';
import './ResumePage.css';

const ResumePage = () => {
  const { t } = useTranslation();
  const { isPortuguese } = useLanguage();
  const [searchParams] = useSearchParams();
  const language = isPortuguese ? 'pt' : 'en';
  const skills = professionalProfile.skillCategories.map((category) => localizeSkillCategory(category, t));
  const workGroups = groupWork(selectedWork);
  const localize = (value) => typeof value === 'string' ? value : value[language];
  const renderProject = (project, Heading = 'h3') => (
    <article key={project.id} className="resume-project" data-project-id={project.id}>
      <Heading>{localize(project.title)}</Heading>
      <p className="resume-project-description">{project.description[language]}</p>
      <p className="resume-project-stack"><strong>{t('experience.technologies')}:</strong> {project.stack.join(' · ')}</p>
      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">{t('work.demo')} <span aria-hidden="true">↗</span></a>}
      {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t('work.repositoryLabel')} ${localize(project.title)}`}>{t('resumePage.repository')} <span aria-hidden="true">↗</span></a>}
    </article>
  );

  useEffect(() => {
    if (searchParams.get('print') === '1') {
      window.location.replace(resumePdfPath(language));
    }
  }, [searchParams, language]);

  return (
    <section className="resume-page" aria-labelledby="resume-name">
      <style>{resumeStyles}</style>
      <div className="resume-print-document" dangerouslySetInnerHTML={{ __html: resumeMarkup(language) }} />
      <div className="container resume-shell">
        <div className="resume-actions">
          <p>{t('resumePage.eyebrow')}</p>
          <a className="resume-pdf-link" href={resumePdfPath(language)} target="_blank" rel="noopener noreferrer">{t('resumePage.viewPdf')}</a>
        </div>

        <div className="resume-grid">
          <div className="resume-primary">
            <header className="resume-intro">
              <h1 id="resume-name">{professionalProfile.name}</h1>
              <p className="resume-role">{t(professionalProfile.roleKey)}</p>
              <div className="resume-summary">
                {professionalProfile.summaryKeys.map((key) => <p key={key}>{t(key)}</p>)}
              </div>
            </header>

            <section className="resume-section" aria-labelledby="resume-experience-title">
              <h2 id="resume-experience-title">{t('resumePage.experience')}</h2>
              <div className="resume-timeline">
                {professionalProfile.experiences.map((experience) => {
                  const bulletsKey = professionalProfile.resume.experienceBullets[experience.id] || experience.resumeBulletsKey || experience.bulletsKey;
                  const bullets = bulletsKey ? t(bulletsKey) : [t(experience.descriptionKey)];
                  return (
                    <article key={experience.id} className="resume-entry" data-experience-id={experience.id}>
                      <div className="resume-entry-heading">
                        <div>
                          <h3>{t(experience.companyKey)}</h3>
                          <p>{t(experience.titleKey)}</p>
                        </div>
                        <time>{t(experience.periodKey)}</time>
                      </div>
                      <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="resume-section" aria-labelledby="resume-independent-title">
              <h2 id="resume-independent-title">{t('experience.independentActivity')}</h2>
              <FreelanceExperience />
              <div className="resume-independent-group" role="region" aria-labelledby="resume-organizations-title">
                <h3 id="resume-organizations-title">{t('experience.organizations')}</h3>
                {workGroups.freelance.map((project) => renderProject(project, 'h4'))}
              </div>
              <div className="resume-independent-group" role="region" aria-labelledby="resume-authored-title">
                <h3 id="resume-authored-title">{t('experience.independent')}</h3>
                {workGroups.independent.map((project) => renderProject(project, 'h4'))}
              </div>
            </section>

            {workGroups.unclassified.length > 0 && <section className="resume-section" aria-labelledby="resume-projects-title">
              <h2 id="resume-projects-title">{t('experience.complementary')}</h2>
              <p className="resume-work-note">{t('experience.complementaryIntro')}</p>
              {workGroups.unclassified.map((project) => renderProject(project))}
            </section>}

            <section className="resume-section" aria-labelledby="resume-education-title">
              <h2 id="resume-education-title">{t('resumePage.education')}</h2>
              <div className="resume-education-list">
                {professionalProfile.education.map((item) => (
                  <article key={item.id} className="resume-education-item">
                    <div>
                      <h3>{t(`${item.baseKey}.degree`)}</h3>
                      <p>{t(`${item.baseKey}.institution`)}</p>
                    </div>
                    <time>{t(`${item.baseKey}.year`)}</time>
                    <p>{t(`${item.baseKey}.description`)}</p>
                  </article>
                ))}
              </div>
            </section>

          </div>

          <aside className="resume-sidebar" aria-label={t('resumePage.sidebarLabel')}>
            <section aria-labelledby="resume-contact-title">
              <h2 id="resume-contact-title">{t('resumePage.contact')}</h2>
              <ul className="resume-contact-list">
                {professionalProfile.contacts.map((contact) => {
                  const value = contact.valueKey ? t(contact.valueKey) : contact.value;
                  return (
                    <li key={contact.id}>
                      <span>{t(contact.labelKey)}</span>
                      {contact.href ? (
                        <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{value}</a>
                      ) : <strong>{value}</strong>}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section aria-labelledby="resume-technologies-title">
              <h2 id="resume-technologies-title">{t('resumePage.technologies')}</h2>
              {skills.map((category) => (
                <div key={category.id} className="resume-skill-group">
                  <h3>{category.title}</h3>
                  <p>{category.skills.join(' · ')}</p>
                </div>
              ))}
            </section>

            <section aria-labelledby="resume-languages-title">
              <h2 id="resume-languages-title">{t('resumePage.languages')}</h2>
              <ul className="resume-specialties">
                {professionalProfile.languages.map((item) => (
                  <li key={item.id}>{t(item.labelKey)}</li>
                ))}
              </ul>
            </section>
            <ResumeCertificates />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ResumePage;

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
  const technologies = skills.filter((category) => category.id !== 'specialties');
  const specialties = skills.find((category) => category.id === 'specialties');
  const workGroups = groupWork(selectedWork);
  const localize = (value) => typeof value === 'string' ? value : value[language];
  const renderProject = (project) => (
    <article key={project.id} className="resume-project" data-project-id={project.id}>
      <h3>{localize(project.title)}</h3>
      <p>{project.description[language]}</p>
      <p><strong>{t('work.scope')}:</strong> {project.scope[language]}</p>
      <p><strong>{t('experience.technologies')}:</strong> {project.stack.join(' · ')}</p>
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
                  const bulletsKey = experience.resumeBulletsKey || experience.bulletsKey;
                  const bullets = bulletsKey ? t(bulletsKey) : [];
                  return (
                    <article key={experience.id} className="resume-entry">
                      <div className="resume-entry-heading">
                        <div>
                          <h3>{t(experience.companyKey)}</h3>
                          <p>{t(experience.titleKey)}</p>
                        </div>
                        <time>{t(experience.periodKey)}</time>
                      </div>
                      <p className="resume-entry-description">{t(experience.descriptionKey)}</p>
                      {bullets.length > 0 && (
                        <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="resume-section" aria-labelledby="resume-freelance-title">
              <h2 id="resume-freelance-title">{t('experience.freelance')}</h2>
              <FreelanceExperience />
              {workGroups.freelance.map(renderProject)}
            </section>

            {workGroups.independent.length > 0 && <section className="resume-section" aria-labelledby="resume-independent-title">
              <h2 id="resume-independent-title">{t('experience.independent')}</h2>
              {workGroups.independent.map(renderProject)}
            </section>}

            {workGroups.unclassified.length > 0 && <section className="resume-section" aria-labelledby="resume-projects-title">
              <h2 id="resume-projects-title">{t('experience.complementary')}</h2>
              <p className="resume-work-note">{t('experience.complementaryIntro')}</p>
              {workGroups.unclassified.map(renderProject)}
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
              {technologies.map((category) => (
                <div key={category.id} className="resume-skill-group">
                  <h3>{category.title}</h3>
                  <p>{category.skills.join(' · ')}</p>
                </div>
              ))}
            </section>

            <section aria-labelledby="resume-specialties-title">
              <h2 id="resume-specialties-title">{t('resumePage.specialties')}</h2>
              <ul className="resume-specialties">
                {specialties.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
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

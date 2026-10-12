import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { localizeSkillCategory, professionalProfile } from '../data/professionalProfile';
import { selectedWork } from '../data/selectedWork';
import './ResumePage.css';

const ResumePage = () => {
  const { t } = useTranslation();
  const { isPortuguese } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const language = isPortuguese ? 'pt' : 'en';
  const skills = professionalProfile.skillCategories.map((category) => localizeSkillCategory(category, t));
  const technologies = skills.filter((category) => category.id !== 'specialties');
  const specialties = skills.find((category) => category.id === 'specialties');
  const primaryProjects = selectedWork.filter((project) => project.kind === 'primary');
  const localize = (value) => typeof value === 'string' ? value : value[language];

  useEffect(() => {
    if (searchParams.get('print') !== '1') return undefined;

    const timeout = window.setTimeout(() => {
      window.print();
      setSearchParams({}, { replace: true });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [searchParams, setSearchParams]);

  return (
    <section className="resume-page" aria-labelledby="resume-name">
      <div className="container resume-shell">
        <div className="resume-actions">
          <p>{t('resumePage.eyebrow')}</p>
          <button type="button" onClick={() => window.print()}>{t('resumePage.print')}</button>
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
                  const bullets = experience.bulletsKey ? t(experience.bulletsKey) : [];
                  return (
                    <article key={experience.id} className="resume-entry">
                      <div className="resume-entry-heading">
                        <div>
                          <h3>{t(experience.titleKey)}</h3>
                          <p>{t(experience.companyKey)}</p>
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

            <section className="resume-section" aria-labelledby="resume-projects-title">
              <h2 id="resume-projects-title">{t('resumePage.projects')}</h2>
              {primaryProjects.map((project) => (
                <article key={project.id} className="resume-project">
                  <h3>{localize(project.title)}</h3>
                  <p>{project.description[language]}</p>
                  <p><strong>{t('resumePage.scope')}:</strong> {project.scope[language]}</p>
                  {project.repositoryUrl && (
                    <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                      {t('resumePage.repository')} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
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
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ResumePage;

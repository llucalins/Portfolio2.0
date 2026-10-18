import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { selectedWork } from '../data/selectedWork';
import { professionalProfile } from '../data/professionalProfile';
import { groupWork } from '../data/workExperience';
import { getRepositoryMetadata } from '../services/github';
import FreelanceExperience from './FreelanceExperience';
import './SelectedWork.css';

const SelectedWork = () => {
  const { t, language } = useTranslation();
  const [metadata, setMetadata] = useState({});
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const groups = groupWork();
  const localize = (value) => typeof value === 'string' ? value : value[language];

  useEffect(() => {
    let active = true;
    Promise.allSettled(selectedWork.filter((project) => project.repository).map(async (project) => ({
      id: project.id, data: await getRepositoryMetadata(project.repository)
    }))).then((results) => {
      if (!active) return;
      setMetadata(Object.fromEntries(results.filter((result) => result.status === 'fulfilled').map((result) => [result.value.id, result.value.data])));
      setApiUnavailable(results.some((result) => result.status === 'rejected'));
    });
    return () => { active = false; };
  }, []);

  const renderProject = (project) => (
    <article key={project.id} className="experience-project" data-project-id={project.id}>
      <div className="experience-project-heading">
        <p>{localize(project.category)}</p>
        <h3>{localize(project.title)}</h3>
      </div>
      <div className="experience-project-body">
        <dl>
          <div><dt>{t('experience.context')}</dt><dd>{project.description[language]}</dd></div>
          <div><dt>{t('work.scope')}</dt><dd>{project.scope[language]}</dd></div>
          <div><dt>{t('experience.technologies')}</dt><dd>{project.stack.join(' · ')}</dd></div>
        </dl>
        <div className="experience-project-links">
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">{t('work.demo')} <span aria-hidden="true">↗</span></a>}
          {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t('work.repositoryLabel')} ${localize(project.title)}`}>{t('work.repository')} <span aria-hidden="true">↗</span></a>}
        </div>
        {metadata[project.id]?.language && <p className="experience-repository-fact">{t('experience.repositoryLanguage')}: {metadata[project.id].language}</p>}
      </div>
    </article>
  );

  return (
    <section className="selected-work experience-page" aria-labelledby="selected-work-title">
      <div className="container">
        <header className="selected-work-heading">
          <span className="section-index" aria-hidden="true">/work</span>
          <div><p className="selected-work-kicker">{t('experience.kicker')}</p><h1 id="selected-work-title" className="selected-work-title">{t('work.title')}</h1><p className="selected-work-intro">{t('work.intro')}</p></div>
        </header>

        <section className="experience-section" aria-labelledby="company-experience-title">
          <h2 id="company-experience-title">{t('experience.companies')}</h2>
          {professionalProfile.experiences.map((experience) => (
            <article className="experience-employment" key={experience.id} data-experience-id={experience.id}>
              <header><p className="experience-period">{t(experience.periodKey)}</p><h3>{t(experience.companyKey)}</h3><p className="experience-role">{t(experience.titleKey)}</p></header>
              <div className="experience-employment-body">
                <p>{t(experience.descriptionKey)}</p>
                {experience.bulletsKey && <><h4>{t('experience.responsibilities')}</h4><ul>{t(experience.resumeBulletsKey || experience.bulletsKey).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></>}
              </div>
            </article>
          ))}
        </section>

        <section className="experience-section" aria-labelledby="freelance-experience-title">
          <h2 id="freelance-experience-title">{t('experience.freelance')}</h2>
          <FreelanceExperience />
          {groups.freelance.map(renderProject)}
        </section>

        {groups.independent.length > 0 && <section className="experience-section" aria-labelledby="independent-work-title"><h2 id="independent-work-title">{t('experience.independent')}</h2>{groups.independent.map(renderProject)}</section>}
        {groups.unclassified.length > 0 && <section className="experience-section" aria-labelledby="complementary-work-title"><h2 id="complementary-work-title">{t('experience.complementary')}</h2><p className="experience-section-intro">{t('experience.complementaryIntro')}</p>{groups.unclassified.map(renderProject)}</section>}
        {apiUnavailable && <p className="work-api-note" role="status">{t('work.apiUnavailable')}</p>}
      </div>
    </section>
  );
};

export default SelectedWork;

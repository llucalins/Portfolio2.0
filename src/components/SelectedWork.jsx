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

  const renderProject = (project, Heading = 'h3') => (
    <article key={project.id} className="experience-project" data-project-id={project.id}>
      <div className="experience-project-heading">
        <Heading>{localize(project.title)}</Heading>
      </div>
      <div className="experience-project-body">
        <p className="experience-project-description">{project.description[language]}</p>
        <dl className="experience-project-stack">
          <dt>{t('experience.technologies')}</dt>
          <dd>{project.stack.join(' · ')}</dd>
        </dl>
        {(project.demoUrl || project.repositoryUrl) && <div className="experience-project-links">
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">{t('work.demo')} <span aria-hidden="true">↗</span></a>}
          {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t('work.repositoryLabel')} ${localize(project.title)}`}>{t('work.repository')} <span aria-hidden="true">↗</span></a>}
        </div>}
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
          {professionalProfile.experiences.map((experience) => {
            const bulletsKey = professionalProfile.resume.experienceBullets[experience.id] || experience.resumeBulletsKey;
            const bullets = bulletsKey ? t(bulletsKey) : [t(experience.descriptionKey)];
            return (
              <article className="experience-employment" key={experience.id} data-experience-id={experience.id}>
                <header><p className="experience-period">{t(experience.periodKey)}</p><h3>{t(experience.companyKey)}</h3><p className="experience-role">{t(experience.titleKey)}</p></header>
                <div className="experience-employment-body">
                  <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              </article>
            );
          })}
        </section>

        <section className="experience-section" aria-labelledby="independent-activity-title">
          <h2 id="independent-activity-title">{t('experience.independentActivity')}</h2>
          <FreelanceExperience />
          <div className="experience-independent-group" role="region" aria-labelledby="organization-work-title">
            <h3 id="organization-work-title">{t('experience.organizations')}</h3>
            {groups.freelance.map((project) => renderProject(project, 'h4'))}
          </div>
          <div className="experience-independent-group" role="region" aria-labelledby="authored-work-title">
            <h3 id="authored-work-title">{t('experience.independent')}</h3>
            {groups.independent.map((project) => renderProject(project, 'h4'))}
          </div>
        </section>

        {groups.unclassified.length > 0 && <section className="experience-section" aria-labelledby="complementary-work-title"><h2 id="complementary-work-title">{t('experience.complementary')}</h2><p className="experience-section-intro">{t('experience.complementaryIntro')}</p>{groups.unclassified.map((project) => renderProject(project))}</section>}
        {apiUnavailable && <p className="work-api-note" role="status">{t('work.apiUnavailable')}</p>}
      </div>
    </section>
  );
};

export default SelectedWork;

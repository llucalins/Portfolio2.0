import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { selectedWork } from '../data/selectedWork';
import { getRepositoryMetadata } from '../services/github';
import './SelectedWork.css';

const SelectedWork = () => {
  const { isPortuguese } = useLanguage();
  const { t } = useTranslation();
  const [metadata, setMetadata] = useState({});
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const language = isPortuguese ? 'pt' : 'en';
  const primaryProjects = selectedWork.filter((project) => project.kind === 'primary');
  const complementaryProjects = selectedWork.filter((project) => project.kind === 'complementary');
  const localize = (value) => typeof value === 'string' ? value : value[language];

  useEffect(() => {
    let active = true;
    const publicProjects = selectedWork.filter((project) => project.repository);

    Promise.allSettled(
      publicProjects.map(async (project) => ({
        id: project.id,
        data: await getRepositoryMetadata(project.repository)
      }))
    ).then((results) => {
      if (!active) return;

      const availableMetadata = {};
      let hasFailure = false;

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          availableMetadata[result.value.id] = result.value.data;
        } else {
          hasFailure = true;
        }
      });

      setMetadata(availableMetadata);
      setApiUnavailable(hasFailure);
    });

    return () => {
      active = false;
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return null;

    return new Intl.DateTimeFormat(isPortuguese ? 'pt-BR' : 'en-US', {
      month: 'short',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <section id="projects" className="selected-work" aria-labelledby="selected-work-title">
      <div className="container">
        <header className="selected-work-heading">
          <span className="section-index" aria-hidden="true">/work</span>
          <div>
            <p className="selected-work-kicker">{t('work.kicker')}</p>
            <h1 id="selected-work-title" className="selected-work-title">{t('work.title')}</h1>
            <p className="selected-work-intro">{t('work.intro')}</p>
          </div>
        </header>

        <div className="work-list">
          {primaryProjects.map((project) => {
            const repositoryMetadata = metadata[project.id];
            const updatedAt = formatDate(repositoryMetadata?.updatedAt);
            const facts = [
              repositoryMetadata?.language && `${t('work.language')}: ${repositoryMetadata.language}`,
              repositoryMetadata?.stars > 0 && `${repositoryMetadata.stars} ${t('work.stars')}`,
              repositoryMetadata?.forks > 0 && `${repositoryMetadata.forks} ${t('work.forks')}`,
              updatedAt && `${t('work.updated')}: ${updatedAt}`
            ].filter(Boolean);

            return (
              <article key={project.id} className="work-case">
                <div className="work-case-index">
                  <p>{localize(project.category)}</p>
                </div>

                <div className="work-case-main">
                  <h2>{localize(project.title)}</h2>
                  <p className="work-case-description">{project.description[language]}</p>

                  <div className="work-case-details">
                    <div>
                      <h3>{t('work.scope')}</h3>
                      <p>{project.scope[language]}</p>
                    </div>
                    <div>
                      <h3>{t('work.stack')}</h3>
                      <ul aria-label={t('work.stack')}>
                        {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                <aside className="work-case-meta" aria-live="polite">
                  {facts.length > 0 && (
                    <ul>
                      {facts.map((fact) => <li key={fact}>{fact}</li>)}
                    </ul>
                  )}
                  <div className="work-case-links">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        {t('work.demo')} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.repositoryUrl ? (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t('work.repositoryLabel')} ${localize(project.title)}`}
                      >
                        {t('work.repository')} <span aria-hidden="true">↗</span>
                      </a>
                    ) : <p>{t('work.noPublicUrl')}</p>}
                  </div>
                </aside>
              </article>
            );
          })}
        </div>

        <section className="work-complementary" aria-labelledby="work-complementary-title">
          <header>
            <p>{t('work.complementaryKicker')}</p>
            <h2 id="work-complementary-title">{t('work.complementaryTitle')}</h2>
          </header>
          <div className="work-complementary-list">
            {complementaryProjects.map((project) => (
              <article key={project.id}>
                <p className="work-complementary-category">{localize(project.category)}</p>
                <h3>{localize(project.title)}</h3>
                <p>{project.description[language]}</p>
                <ul aria-label={t('work.stack')}>
                  {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <small>{project.scope[language]}</small>
              </article>
            ))}
          </div>
        </section>

        {apiUnavailable && <p className="work-api-note" role="status">{t('work.apiUnavailable')}</p>}
      </div>
    </section>
  );
};

export default SelectedWork;

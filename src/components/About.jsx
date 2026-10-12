import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { professionalProfile } from '../data/professionalProfile';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  const experiences = professionalProfile.experiences.map((experience) => ({
    id: experience.id,
    year: t(experience.periodKey),
    title: t(experience.titleKey),
    company: t(experience.companyKey),
    description: t(experience.descriptionKey)
  }));

  const education = professionalProfile.education.map((item) => ({
    id: item.id,
    year: t(`${item.baseKey}.year`),
    degree: t(`${item.baseKey}.degree`),
    institution: t(`${item.baseKey}.institution`),
    description: t(`${item.baseKey}.description`)
  }));

  return (
    <section id="about" className="about">
      <div className="container">
        <header className="about-heading">
          <span className="section-index" aria-hidden="true">02</span>
          <h2 className="section-title">{t('about.title')}</h2>
        </header>

        <div className="about-intro">
          <h3>{t('about.subtitle')}</h3>
          <p>{t('about.description')}</p>
        </div>

        <dl className="about-stats">
          <div><dt>1+</dt><dd>{t('about.experience')}</dd></div>
          <div><dt>21+</dt><dd>{t('about.projects')}</dd></div>
          <div><dt>100%</dt><dd>{t('about.clients')}</dd></div>
        </dl>

        <div className="about-details">
          <section className="career-section" aria-labelledby="experience-heading">
            <h3 id="experience-heading">{t('about.professionalExperience')}</h3>
            <ol className="career-list">
                {experiences.map((exp) => (
                  <li key={exp.id}>
                    <time>{exp.year}</time>
                    <div>
                      <h4>{exp.title}</h4>
                      <h5>{exp.company}</h5>
                      <p>{exp.description}</p>
                    </div>
                  </li>
                ))}
            </ol>
          </section>

          <section className="career-section" aria-labelledby="education-heading">
            <h3 id="education-heading">{t('about.education')}</h3>
            <ol className="career-list">
                {education.map((edu) => (
                  <li key={edu.id}>
                    <time>{edu.year}</time>
                    <div>
                      <h4>{edu.degree}</h4>
                      <h5>{edu.institution}</h5>
                      <p>{edu.description}</p>
                    </div>
                  </li>
                ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;

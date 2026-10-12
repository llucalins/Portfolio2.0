import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { localizeSkillCategory, professionalProfile } from '../data/professionalProfile';
import './Skills.css';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = professionalProfile.skillCategories.map((category) => (
    localizeSkillCategory(category, t)
  ));

  return (
    <section id="skills" className="skills">
      <div className="container">
        <header className="skills-heading">
          <span className="section-index" aria-hidden="true">03</span>
          <div>
            <h2 className="section-title">{t('skills.title')}</h2>
            <p className="section-subtitle">{t('skills.subtitle')}</p>
          </div>
        </header>

        <div className="skills-content">
          {skillCategories.map((category, categoryIndex) => (
            <article key={category.id} className="skill-category">
              <div className="category-header">
                <span aria-hidden="true">{String(categoryIndex + 1).padStart(2, '0')}</span>
                <h3>{category.title}</h3>
              </div>

              <ul className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

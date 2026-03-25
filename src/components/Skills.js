import React from 'react';
import { FaCode, FaDatabase, FaTools, FaCogs, FaPlug, FaStar } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';
import './Skills.css';

const Skills = () => {
  const { t } = useTranslation();
  
  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: <FaCode />,
      skills: [
        t('skills.vue3'),
        t('skills.vue2'),
        t('skills.typescript'),
        t('skills.javascript'),
        t('skills.react'),
        t('skills.html5'),
        t('skills.css3'),
        t('skills.vite'),
      ]
    },
    {
      title: t('skills.stateManagement'),
      icon: <FaCogs />,
      skills: [
        t('skills.pinia'),
        t('skills.vuex'),
        t('skills.contextApi'),
      ]
    },
    {
      title: t('skills.apisIntegration'),
      icon: <FaPlug />,
      skills: [
        t('skills.restApis'),
        t('skills.backendIntegration'),
        t('skills.swagger'),
        t('skills.insomnia'),
      ]
    },
    {
      title: t('skills.database'),
      icon: <FaDatabase />,
      skills: [
        t('skills.postgresql'),
      ]
    },
    {
      title: t('skills.toolsVersioning'),
      icon: <FaTools />,
      skills: [
        t('skills.git'),
        t('skills.github'),
      ]
    },
    {
      title: t('skills.differentials'),
      icon: <FaStar />,
      skills: [
        t('skills.componentization'),
        t('skills.responsiveness'),
        t('skills.performance'),
        t('skills.dashboardsSaas'),
        t('skills.frontendBackendComm'),
      ]
    },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">{t('skills.title')}</h2>
        <p className="section-subtitle">{t('skills.subtitle')}</p>
        
        <div className="skills-content">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <div className="category-header">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skills-tags">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

import React from 'react';
import { FaCode, FaDatabase } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';
import './Skills.css';

const Skills = () => {
  const { t } = useTranslation();
  
  const skillCategories = [
    {
      title: t('skills.programmingLanguages'),
      icon: <FaCode />,
      skills: [
        { name: t('skills.java'), level: 85 },
        { name: t('skills.python'), level: 80 },
        { name: t('skills.csharp'), level: 80 },
        { name: t('skills.javascript'), level: 75 },
        { name: t('skills.programmingLogic'), level: 90 }
      ]
    },
    {
      title: t('skills.frameworksPlatforms'),
      icon: <FaDatabase />,
      skills: [
        { name: t('skills.dotnet'), level: 85 },
        { name: t('skills.flutter'), level: 75 },
        { name: t('skills.nodejs'), level: 70 },
        { name: t('skills.react'), level: 70 },
        { name: t('skills.ides'), level: 90 }
      ]
    },

  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">{t('skills.title')}</h2>
        
        <div className="skills-content">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <div className="category-header">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="skills-summary">
          <div className="summary-item">
            <h4>{t('skills.languages')}</h4>
            <p>{t('skills.summary.languages')}</p>
          </div>
          <div className="summary-item">
            <h4>{t('skills.frameworksPlatforms')}</h4>
            <p>{t('skills.summary.frameworks')}</p>
          </div>
          <div className="summary-item">
            <h4>{t('skills.knowledge')}</h4>
            <p>{t('skills.summary.knowledge')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 
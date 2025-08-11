import React from 'react';
import { FaUser, FaGraduationCap, FaBriefcase, FaHeart } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  
  const experiences = [
    {
      year: t('about.experiences.fullstack.year'),
      title: t('about.experiences.fullstack.title'),
      company: t('about.experiences.fullstack.company'),
      description: t('about.experiences.fullstack.description')
    },
    {
      year: t('about.experiences.frontend.year'),
      title: t('about.experiences.frontend.title'),
      company: t('about.experiences.frontend.company'),
      description: t('about.experiences.frontend.description')
    },
    {
      year: t('about.experiences.student.year'),
      title: t('about.experiences.student.title'),
      company: t('about.experiences.student.company'),
      description: t('about.experiences.student.description')
    }
  ];

  const education = [
    {
      year: t('about.educationItems.software.year'),
      degree: t('about.educationItems.software.degree'),
      institution: t('about.educationItems.software.institution'),
      description: t('about.educationItems.software.description')
    },
    {
      year: t('about.educationItems.pronatec.year'),
      degree: t('about.educationItems.pronatec.degree'),
      institution: t('about.educationItems.pronatec.institution'),
      description: t('about.educationItems.pronatec.description')
    },
    {
      year: t('about.educationItems.dio.year'),
      degree: t('about.educationItems.dio.degree'),
      institution: t('about.educationItems.dio.institution'),
      description: t('about.educationItems.dio.description')
    },
    {
      year: t('about.educationItems.highschool.year'),
      degree: t('about.educationItems.highschool.degree'),
      institution: t('about.educationItems.highschool.institution'),
      description: t('about.educationItems.highschool.description')
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        
        <div className="about-content">
          <div className="about-text">
                         <div className="about-intro">
               <h3>{t('about.subtitle')}</h3>
               <p>
                 {t('about.description')}
               </p>
             </div>
            
                         <div className="about-stats">
               <div className="stat-item">
                 <FaUser className="stat-icon" />
                 <div className="stat-content">
                   <h4>1+ Ano</h4>
                   <p>{t('about.experience')}</p>
                 </div>
               </div>
                               <div className="stat-item">
                  <FaBriefcase className="stat-icon" />
                  <div className="stat-content">
                    <h4>21+ Certificados</h4>
                    <p>{t('about.projects')}</p>
                  </div>
                </div>
               <div className="stat-item">
                 <FaHeart className="stat-icon" />
                 <div className="stat-content">
                   <h4>100%</h4>
                   <p>{t('about.clients')}</p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="about-details">
            <div className="experience-section">
              <h3><FaBriefcase /> {t('about.professionalExperience')}</h3>
              <div className="timeline">
                {experiences.map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">{exp.year}</div>
                      <h4>{exp.title}</h4>
                      <h5>{exp.company}</h5>
                      <p>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="education-section">
              <h3><FaGraduationCap /> {t('about.education')}</h3>
              <div className="timeline">
                {education.map((edu, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">{edu.year}</div>
                      <h4>{edu.degree}</h4>
                      <h5>{edu.institution}</h5>
                      <p>{edu.description}</p>
                    </div>
                  </div>
                ))}
                             </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
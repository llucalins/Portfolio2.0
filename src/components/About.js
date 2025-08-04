import React from 'react';
import { FaUser, FaGraduationCap, FaBriefcase, FaHeart } from 'react-icons/fa';
import './About.css';

const About = () => {
  const experiences = [
    {
      year: '2023 - Presente',
      title: 'Desenvolvedor Full Stack',
      company: 'Empresa Atual',
      description: 'Desenvolvimento de aplicações web modernas usando React, Node.js e tecnologias cloud.'
    },
    {
      year: '2021 - 2023',
      title: 'Desenvolvedor Frontend',
      company: 'Empresa Anterior',
      description: 'Criação de interfaces responsivas e otimização de performance de aplicações web.'
    },
    {
      year: '2020 - 2021',
      title: 'Estagiário de Desenvolvimento',
      company: 'Primeira Empresa',
      description: 'Aprendizado prático em desenvolvimento web e colaboração em projetos reais.'
    }
  ];

  const education = [
    {
      year: '2018 - 2022',
      degree: 'Bacharel em Ciência da Computação',
      institution: 'Universidade Exemplo',
      description: 'Foco em desenvolvimento de software e tecnologias web.'
    },
    {
      year: '2022',
      degree: 'Certificação AWS',
      institution: 'Amazon Web Services',
      description: 'Especialização em serviços cloud e arquitetura de aplicações.'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">Sobre Mim</h2>
        
        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <h3>Quem sou eu?</h3>
              <p>
                Sou um desenvolvedor apaixonado por tecnologia e inovação, com experiência 
                em desenvolvimento full stack e uma forte base em ciência da computação. 
                Minha jornada na programação começou há alguns anos e desde então tenho 
                trabalhado em diversos projetos desafiadores.
              </p>
              <p>
                Acredito que a tecnologia tem o poder de transformar vidas e estou sempre 
                em busca de aprender novas tecnologias e metodologias para criar soluções 
                cada vez melhores.
              </p>
            </div>
            
            <div className="about-stats">
              <div className="stat-item">
                <FaUser className="stat-icon" />
                <div className="stat-content">
                  <h4>3+ Anos</h4>
                  <p>de Experiência</p>
                </div>
              </div>
              <div className="stat-item">
                <FaBriefcase className="stat-icon" />
                <div className="stat-content">
                  <h4>20+ Projetos</h4>
                  <p>Concluídos</p>
                </div>
              </div>
              <div className="stat-item">
                <FaHeart className="stat-icon" />
                <div className="stat-content">
                  <h4>100%</h4>
                  <p>Dedicação</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-details">
            <div className="experience-section">
              <h3><FaBriefcase /> Experiência Profissional</h3>
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
              <h3><FaGraduationCap /> Educação</h3>
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
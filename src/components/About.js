import React from 'react';
import { FaUser, FaGraduationCap, FaBriefcase, FaHeart } from 'react-icons/fa';
import './About.css';

const About = () => {
  const experiences = [
    {
      year: '2024 - Presente',
      title: 'Desenvolvedor Full Stack',
      company: 'Freelancer',
      description: 'Desenvolvimento de aplicações web completas usando React, Node.js, TypeScript e tecnologias modernas.'
    },
    {
      year: '2023 - 2024',
      title: 'Desenvolvedor Frontend',
      company: 'Projetos Pessoais',
      description: 'Criação de interfaces responsivas e otimização de performance de aplicações web.'
    },
    {
      year: '2022 - 2023',
      title: 'Estudante de Desenvolvimento',
      company: 'Cursos Online',
      description: 'Aprendizado prático em desenvolvimento web através de cursos e projetos pessoais.'
    }
  ];

  const education = [
    {
      year: '2025 - Presente',
      degree: 'Bacharelado em Engenharia de Software',
      institution: 'UniFatecie',
      description: 'Curso em andamento com foco em desenvolvimento de software e tecnologias web.'
    },
    {
      year: '2018',
      degree: 'Formação Técnica PRONATEC',
      institution: 'PRONATEC',
      description: 'Formação técnica profissional através do Programa Nacional de Acesso ao Ensino Técnico e Emprego.'
    },
    {
      year: '2024',
      degree: 'Certificados DIO',
      institution: 'Digital Innovation One',
      description: 'Múltiplos certificados em desenvolvimento Full Stack, DevOps e tecnologias modernas.'
    },
    {
      year: '2019',
      degree: 'Ensino Médio',
      institution: 'Colégio Menino Jesus de Praga',
      description: 'Concluído com foco em preparação para o ensino superior.'
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
                 Sou um desenvolvedor apaixonado por tecnologia e inovação, com foco em 
                 desenvolvimento full stack e uma forte base em engenharia de software. 
                 Minha jornada na programação começou com formação técnica através do PRONATEC
                 e desde então tenho trabalhado em diversos projetos pessoais e freelancer.
               </p>
               <p>
                 Acredito que a tecnologia tem o poder de transformar vidas e estou sempre 
                 em busca de aprender novas tecnologias e metodologias para criar soluções 
                 cada vez melhores. Atualmente estou cursando Engenharia de Software na 
                 UniFatecie e desenvolvendo projetos pessoais para aprimorar minhas habilidades.
               </p>
             </div>
            
                         <div className="about-stats">
               <div className="stat-item">
                 <FaUser className="stat-icon" />
                 <div className="stat-content">
                   <h4>1+ Ano</h4>
                   <p>de Experiência</p>
                 </div>
               </div>
                               <div className="stat-item">
                  <FaBriefcase className="stat-icon" />
                  <div className="stat-content">
                    <h4>21+ Certificados</h4>
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
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Olá, eu sou <span className="highlight">Seu Nome</span>
            </h1>
            <h2 className="hero-subtitle">
              Desenvolvedor Full Stack
            </h2>
            <p className="hero-description">
              Apaixonado por criar soluções inovadoras e experiências digitais excepcionais. 
              Especializado em desenvolvimento web moderno com foco em performance e usabilidade.
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                Ver Projetos
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Entre em Contato
              </button>
            </div>
            
            <div className="hero-links">
              <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="mailto:seu-email@exemplo.com" className="social-link">
                <FaEnvelope />
              </a>
              <a href="/curriculo.pdf" download className="social-link">
                <FaDownload />
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image">
              <div className="code-animation">
                <div className="code-line">
                  <span className="code-keyword">const</span> <span className="code-variable">developer</span> = {'{'}
                </div>
                <div className="code-line">
                  <span className="code-property">name:</span> <span className="code-string">'Seu Nome'</span>,
                </div>
                <div className="code-line">
                  <span className="code-property">role:</span> <span className="code-string">'Full Stack Developer'</span>,
                </div>
                <div className="code-line">
                  <span className="code-property">passion:</span> <span className="code-string">'Criar soluções inovadoras'</span>
                </div>
                <div className="code-line">{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero; 
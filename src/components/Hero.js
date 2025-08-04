import React from 'react';
import ProfileCard from './ProfileCard';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const profileData = {
    name: "Lucas Virginio",
    title: "Full Stack Developer",
    handle: "lin.s30",
    status: "Online",
    avatarUrl: "/lucas-virginio-avatar.png",
    contactText: "Contato",
    showUserInfo: true,
    enableTilt: true,
    enableMobileTilt: false,
    mobileTiltSensitivity: 5
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Olá, eu sou <span className="highlight">Lucas Virginio</span>
            </h1>
            <h2 className="hero-subtitle">
              Full Stack Developer
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
          </div>
          
          <div className="hero-visual">
            <ProfileCard 
              {...profileData}
              onContactClick={() => scrollToSection('contact')}
            />
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
import React from 'react';
import ProfileCard from './ProfileCard';
import { useTranslation } from '../hooks/useTranslation';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const profileData = {
    name: "Lucas Virginio",
    title: t('hero.title'),
    handle: "lin.s30",
    status: t('profileCard.online'),
    avatarUrl: "/lucas-virginio-avatar.png",
    contactText: t('profileCard.contact'),
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
              {t('hero.greeting')} <span className="highlight">Lucas Virginio</span>
            </h1>
            <h2 className="hero-subtitle">
              {t('hero.title')}
            </h2>
            <p className="hero-description">
              {t('hero.description')}
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('about')}
              >
                {t('hero.aboutMe')}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                {t('hero.contactMe')}
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
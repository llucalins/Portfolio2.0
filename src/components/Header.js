import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleLanguage, isPortuguese } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2>L.V</h2>
          </div>
          
          <div className="language-toggle">
            <button 
              onClick={toggleLanguage}
              className="lang-btn"
              aria-label={`Mudar para ${isPortuguese ? 'Inglês' : 'Português'}`}
              title={`Clique para mudar para ${isPortuguese ? 'Inglês' : 'Português'}`}
            >
              {isPortuguese ? 'EN' : 'PT'}
            </button>
            <span className="lang-hint">
              {isPortuguese ? 'Translate' : 'Traduzir'}
            </span>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><button onClick={() => scrollToSection('home')}>{t('nav.home')}</button></li>
              <li><button onClick={() => scrollToSection('about')}>{t('nav.about')}</button></li>
              <li><button onClick={() => scrollToSection('skills')}>{t('nav.skills')}</button></li>
              <li><button onClick={() => scrollToSection('projects')}>{t('nav.projects')}</button></li>
              <li><button onClick={() => scrollToSection('contact')}>{t('nav.contact')}</button></li>
            </ul>
          </nav>
          
          <div 
            className={`mobile-menu-btn ${isMenuOpen ? 'nav-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const firstNavItemRef = useRef(null);
  const { toggleLanguage, isPortuguese } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const background = [...document.querySelectorAll('main, .footer')];
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        const controls = [...headerRef.current.querySelectorAll('a, button')]
          .filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    firstNavItemRef.current?.focus();

    return () => {
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 53.751rem)');
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const selectLanguage = (language) => {
    if ((language === 'pt') !== isPortuguese) toggleLanguage();
  };

  const navItems = [
    ['/', 'nav.home'],
    ['/work', 'nav.projects'],
    ['/resume', 'nav.resume'],
    ['/contact', 'nav.contact'],
  ];

  return (
    <header ref={headerRef} className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-shell">
        <Link className="wordmark" to="/" onClick={() => setIsMenuOpen(false)} aria-label={t('nav.home')}>
          <span className="wordmark-logo-frame" aria-hidden="true">
            <img
              className="wordmark-logo"
              src="/logo-lv.png.png"
              alt=""
              width="1254"
              height="1254"
            />
          </span>
        </Link>

        <nav id="primary-navigation" className={`nav ${isMenuOpen ? 'nav-open' : ''}`} aria-label={t('nav.primaryLabel')}>
          <ul className="nav-list">
            {navItems.map(([path, label], index) => (
              <li key={path}>
                <NavLink
                  ref={index === 0 ? firstNavItemRef : null}
                  to={path}
                  end={path === '/'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(label)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <div className="language-toggle" role="group" aria-label={t('nav.languageLabel')}>
            <button onClick={() => selectLanguage('pt')} aria-pressed={isPortuguese}>PT</button>
            <span aria-hidden="true">/</span>
            <button onClick={() => selectLanguage('en')} aria-pressed={!isPortuguese}>EN</button>
          </div>

          <button
            ref={menuButtonRef}
            className={`mobile-menu-btn ${isMenuOpen ? 'nav-open' : ''}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

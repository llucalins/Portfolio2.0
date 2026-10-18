import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';
import { professionalProfile } from '../data/professionalProfile';
import { resumePdfPath } from '../data/resumeDocument';
import './Footer.css';

const socialIcons = {
  github: <FaGithub aria-hidden="true" />,
  linkedin: <FaLinkedin aria-hidden="true" />,
  email: <FaEnvelope aria-hidden="true" />
};

const Footer = () => {
  const { t, language } = useTranslation();
  const currentYear = new Date().getFullYear();
  const socialLinks = professionalProfile.contacts.filter((contact) => socialIcons[contact.id]);
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-intro">
            <p className="footer-name">{professionalProfile.name}</p>
            <p>{t('footer.description')}</p>
          </div>

          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/work">{t('nav.projects')}</Link></li>
              <li><Link to="/resume">{t('nav.resume')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.socialMedia')}</h4>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={t(link.labelKey)}
                >
                  {socialIcons[link.id]}
                </a>
              ))}
            </div>

            <div className="resume-download-section">
              <a
                href={resumePdfPath(language)}
                download
                className="resume-download-btn"
                title={t('footer.downloadResumeTitle')}
              >
                <FaFilePdf aria-hidden="true" />
                <span className="resume-text">{t('footer.downloadResume')}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>© {currentYear} {t('footer.rights')}.</p>
          </div>

          <button
            className="scroll-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' })}
            aria-label={t('footer.scrollToTop')}
          >
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

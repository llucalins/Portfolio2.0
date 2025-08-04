import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaGithub />,
      url: 'https://github.com/llucalins',
      label: 'GitHub'
    },
    {
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/lucas-virginio-55311627b',
      label: 'LinkedIn'
    },
    {
      icon: <FaEnvelope />,
      url: 'mailto:lvirginio.dev@gmail.com',
      label: 'Email'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Lucas Virginio</h3>
            <p>
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras 
              e experiências digitais excepcionais.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul className="footer-links">
              <li><button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>Início</button></li>
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>Sobre</button></li>
              <li><button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Projetos</button></li>
              <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contato</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p>
              © {currentYear} Lucas Virginio. Todos os direitos reservados.
            </p>
            <p className="made-with">
              Feito com <FaHeart className="heart-icon" /> usando React
            </p>
          </div>
          
          <button className="scroll-top" onClick={scrollToTop}>
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
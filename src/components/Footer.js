import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaFilePdf } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaGithub />,
      url: 'https://github.com/llucalins',
      label: t('footer.github')
    },
    {
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/lucas-virginio-55311627b',
      label: t('footer.linkedin')
    },
    {
      icon: <FaEnvelope />,
      url: 'mailto:lvirginio.dev@gmail.com',
      label: t('footer.email')
    }
  ];

  const generatePDF = () => {
    // Criar conteúdo HTML para o PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Lucas Virginio - {t('footer.resume')}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #667eea;
            font-size: 2.5em;
            margin: 0;
            font-weight: 700;
          }
          .header h2 {
            color: #764ba2;
            font-size: 1.3em;
            margin: 10px 0;
            font-weight: 400;
          }
          .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin: 15px 0;
            font-size: 0.9em;
          }
          .section {
            margin: 30px 0;
          }
          .section h3 {
            color: #667eea;
            font-size: 1.4em;
            border-bottom: 2px solid #667eea;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .timeline-item {
            margin: 20px 0;
            padding-left: 20px;
            border-left: 3px solid #667eea;
            position: relative;
          }
          .timeline-item::before {
            content: '';
            position: absolute;
            left: -8px;
            top: 0;
            width: 13px;
            height: 13px;
            background: #667eea;
            border-radius: 50%;
          }
          .timeline-year {
            color: #764ba2;
            font-weight: 600;
            font-size: 0.9em;
            margin-bottom: 5px;
          }
          .timeline-item h4 {
            color: #333;
            margin: 5px 0;
            font-size: 1.1em;
          }
          .timeline-item h5 {
            color: #667eea;
            margin: 5px 0;
            font-size: 1em;
          }
          .timeline-item p {
            margin: 5px 0;
            color: #666;
            font-size: 0.9em;
          }
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 15px 0;
          }
          .skill-category {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
          }
          .skill-category h4 {
            color: #667eea;
            margin: 0 0 10px 0;
            font-size: 1.1em;
          }
          .skill-category ul {
            margin: 0;
            padding-left: 20px;
          }
          .skill-category li {
            margin: 3px 0;
          }
          .certificates {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin: 15px 0;
          }
          .certificate {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            border: 1px solid #e9ecef;
          }
          .experience {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #764ba2;
          }
          .social-links {
            text-align: center;
            margin: 20px 0;
            font-size: 0.9em;
          }
          .social-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 10px;
          }
          .social-links a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Lucas Virginio</h1>
          <h2>${t('hero.title')}</h2>
          <div class="contact-info">
            <span>📧 lvirginio.dev@gmail.com</span>
            <span>📱 +55 (83) 98602-3472</span>
            <span>📍 Campina Grande, Paraíba</span>
          </div>
        </div>

        <div class="section">
          <h3>${t('about.education')}</h3>
                     <div class="timeline-item">
             <div class="timeline-year">${t('about.educationItems.software.year')}</div>
             <h4>${t('about.educationItems.software.degree')}</h4>
             <h5>${t('about.educationItems.software.institution')}</h5>
             <p>${t('about.educationItems.software.description')}</p>
           </div>
           <div class="timeline-item">
             <div class="timeline-year">${t('about.educationItems.pronatec.year')}</div>
             <h4>${t('about.educationItems.pronatec.degree')}</h4>
             <h5>${t('about.educationItems.pronatec.institution')}</h5>
             <p>${t('about.educationItems.pronatec.description')}</p>
           </div>
           <div class="timeline-item">
             <div class="timeline-year">${t('about.educationItems.dio.year')}</div>
             <h4>${t('about.educationItems.dio.degree')}</h4>
             <h5>${t('about.educationItems.dio.institution')}</h5>
             <p>${t('about.educationItems.dio.description')}</p>
           </div>
           <div class="timeline-item">
             <div class="timeline-year">${t('about.educationItems.highschool.year')}</div>
             <h4>${t('about.educationItems.highschool.degree')}</h4>
             <h5>${t('about.educationItems.highschool.institution')}</h5>
             <p>${t('about.educationItems.highschool.description')}</p>
           </div>
        </div>

        <div class="section">
          <h3>${t('about.professionalExperience')}</h3>
          <div class="timeline-item">
             <div class="timeline-year">${t('about.experiences.fullstack.year')}</div>
             <h4>${t('about.experiences.fullstack.title')}</h4>
             <h5>${t('about.experiences.fullstack.company')}</h5>
             <p>${t('about.experiences.fullstack.description')}</p>
           </div>
           <div class="timeline-item">
             <div class="timeline-year">${t('about.experiences.frontend.year')}</div>
             <h4>${t('about.experiences.frontend.title')}</h4>
             <h5>${t('about.experiences.frontend.company')}</h5>
             <p>${t('about.experiences.frontend.description')}</p>
           </div>
           <div class="timeline-item">
             <div class="timeline-year">${t('about.experiences.student.year')}</div>
             <h4>${t('about.experiences.student.title')}</h4>
             <h5>${t('about.experiences.student.company')}</h5>
             <p>${t('about.experiences.student.description')}</p>
           </div>
        </div>

        <div class="section">
          <h3>${t('skills.title')}</h3>
          <div class="skills-grid">
            <div class="skill-category">
              <h4>${t('skills.programmingLanguages')}</h4>
              <ul>
                                                 <li>${t('skills.java')} (85%)</li>
                <li>${t('skills.python')} (80%)</li>
                <li>${t('skills.csharp')} (80%)</li>
                <li>${t('skills.javascript')} (75%)</li>
                <li>${t('skills.programmingLogic')} (90%)</li>
              </ul>
            </div>
            <div class="skill-category">
              <h4>${t('skills.frameworksPlatforms')}</h4>
              <ul>
                <li>${t('skills.dotnet')} (85%)</li>
                <li>${t('skills.flutter')} (75%)</li>
                <li>${t('skills.nodejs')} (70%)</li>
                <li>${t('skills.react')} (70%)</li>
                <li>${t('skills.ides')} (90%)</li>
              </ul>
            </div>
            <div class="skill-category">
              <h4>${t('skills.knowledge')}</h4>
              <ul>
                                                 <li>${t('skills.summary.knowledge').split(', ')[0]}</li>
                <li>${t('skills.summary.knowledge').split(', ')[1]}</li>
                <li>${t('skills.summary.knowledge').split(', ')[2]}</li>
                <li>${t('skills.summary.knowledge').split(', ')[3]}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>${t('projects.title')} (21+)</h3>
          <div class="certificates">
            <div class="certificate">${t('skills.java')} Developer</div>
            <div class="certificate">${t('skills.python')} Developer</div>
            <div class="certificate">${t('skills.csharp')} Developer</div>
            <div class="certificate">${t('skills.javascript')} Developer</div>
            <div class="certificate">${t('skills.react')} Developer</div>
            <div class="certificate">${t('skills.nodejs')} Developer</div>
            <div class="certificate">${t('skills.dotnet')} Developer</div>
            <div class="certificate">${t('skills.flutter')} Developer</div>
            <div class="certificate">Full Stack Developer</div>
            <div class="certificate">DevOps</div>
            <div class="certificate">Cloud Computing</div>
            <div class="certificate">${t('skills.summary.knowledge').split(', ')[0]}</div>
            <div class="certificate">${t('skills.programmingLogic')}</div>
            <div class="certificate">${t('skills.ides')}</div>
             <div class="certificate">Git & GitHub</div>
             <div class="certificate">Metodologias Ágeis</div>
             <div class="certificate">Clean Code</div>
             <div class="certificate">TDD</div>
             <div class="certificate">DDD</div>
             <div class="certificate">Arquitetura de Software</div>
          </div>
        </div>

        <div class="section">
          <h3>${t('footer.aboutMe')}</h3>
          <div class="experience">
            <p>${t('footer.aboutDescription1')}</p>
            <p>${t('footer.aboutDescription2')}</p>
          </div>
        </div>

        <div class="social-links">
          <a href="https://www.linkedin.com/in/lucas-virginio-55311627b" target="_blank">${t('footer.linkedin')}</a>
          <a href="https://github.com/llucalins" target="_blank">${t('footer.github')}</a>
          <a href="mailto:lvirginio.dev@gmail.com">${t('footer.email')}</a>
        </div>
      </body>
      </html>
    `;

    // Criar blob e abrir em nova aba para impressão
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    
    // Aguardar carregamento e imprimir
    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print();
      };
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <p>
              {t('footer.description')}
            </p>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>{t('nav.about')}</button></li>
              <li><button onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}>{t('nav.skills')}</button></li>
              <li><button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>{t('nav.projects')}</button></li>
              <li><button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>{t('nav.contact')}</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.socialMedia')}</h4>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            {/* Botão de Download do Currículo */}
            <div className="resume-download-section">
              <button 
                onClick={generatePDF} 
                className="resume-download-btn"
                title={t('footer.downloadResumeTitle')}
              >
                <FaFilePdf className="resume-icon" />
                <span className="resume-text">{t('footer.downloadResume')}</span>
                <div className="resume-glow"></div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p>
              © {currentYear} {t('footer.rights')}.
            </p>
          </div>
          
          <button 
            className="scroll-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('footer.scrollToTop')}
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
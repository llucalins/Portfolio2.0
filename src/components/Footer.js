import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaFilePdf } from 'react-icons/fa';
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

  const generatePDF = () => {
    // Criar conteúdo HTML para o PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Lucas Virginio - Currículo</title>
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
          <h2>Desenvolvedor Full Stack</h2>
          <div class="contact-info">
            <span>📧 lvirginio.dev@gmail.com</span>
            <span>📱 +55 (83) 98602-3472</span>
            <span>📍 Campina Grande, Paraíba</span>
          </div>
        </div>

        <div class="section">
          <h3>Educação</h3>
          <div class="timeline-item">
            <div class="timeline-year">2025 - Presente</div>
            <h4>Bacharelado em Engenharia de Software</h4>
            <h5>UniFatecie</h5>
            <p>Curso em andamento com foco em desenvolvimento de software e tecnologias web.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2018</div>
            <h4>Formação Técnica PRONATEC</h4>
            <h5>PRONATEC</h5>
            <p>Formação técnica profissional através do Programa Nacional de Acesso ao Ensino Técnico e Emprego.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2024</div>
            <h4>Certificados DIO</h4>
            <h5>Digital Innovation One</h5>
            <p>Múltiplos certificados em desenvolvimento Full Stack, DevOps e tecnologias modernas.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2019</div>
            <h4>Ensino Médio</h4>
            <h5>Colégio Menino Jesus de Praga</h5>
            <p>Concluído com foco em preparação para o ensino superior.</p>
          </div>
        </div>

        <div class="section">
          <h3>Experiência Profissional</h3>
          <div class="timeline-item">
            <div class="timeline-year">2024 - Presente</div>
            <h4>Desenvolvedor Full Stack</h4>
            <h5>Freelancer</h5>
            <p>Desenvolvimento de aplicações web completas usando React, Node.js, TypeScript e tecnologias modernas.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2023 - 2024</div>
            <h4>Desenvolvedor Frontend</h4>
            <h5>Projetos Pessoais</h5>
            <p>Criação de interfaces responsivas e otimização de performance de aplicações web.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2022 - 2023</div>
            <h4>Estudante de Desenvolvimento</h4>
            <h5>Cursos Online</h5>
            <p>Aprendizado prático em desenvolvimento web através de cursos e projetos pessoais.</p>
          </div>
        </div>

        <div class="section">
          <h3>Habilidades Técnicas</h3>
          <div class="skills-grid">
            <div class="skill-category">
              <h4>Linguagens de Programação</h4>
              <ul>
                <li>Java (85%)</li>
                <li>Python (80%)</li>
                <li>C# (80%)</li>
                <li>JavaScript (75%)</li>
                <li>Lógica de Programação (90%)</li>
              </ul>
            </div>
            <div class="skill-category">
              <h4>Frameworks & Plataformas</h4>
              <ul>
                <li>.NET (85%)</li>
                <li>Flutter (75%)</li>
                <li>Node.js (70%)</li>
                <li>React (70%)</li>
                <li>IDEs (90%)</li>
              </ul>
            </div>
            <div class="skill-category">
              <h4>Conhecimentos</h4>
              <ul>
                <li>Algoritmos</li>
                <li>Fluxogramas</li>
                <li>Client-Server</li>
                <li>Cloud Computing</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>Certificados (21+)</h3>
          <div class="certificates">
            <div class="certificate">Java Developer</div>
            <div class="certificate">Python Developer</div>
            <div class="certificate">C# Developer</div>
            <div class="certificate">JavaScript Developer</div>
            <div class="certificate">React Developer</div>
            <div class="certificate">Node.js Developer</div>
            <div class="certificate">.NET Developer</div>
            <div class="certificate">Flutter Developer</div>
            <div class="certificate">Full Stack Developer</div>
            <div class="certificate">DevOps</div>
            <div class="certificate">Cloud Computing</div>
            <div class="certificate">Algoritmos</div>
            <div class="certificate">Lógica de Programação</div>
            <div class="certificate">IDEs</div>
            <div class="certificate">Git & GitHub</div>
            <div class="certificate">Metodologias Ágeis</div>
            <div class="certificate">Clean Code</div>
            <div class="certificate">TDD</div>
            <div class="certificate">DDD</div>
            <div class="certificate">Arquitetura de Software</div>
          </div>
        </div>

        <div class="section">
          <h3>Sobre Mim</h3>
          <div class="experience">
            <p>Sou um desenvolvedor apaixonado por tecnologia e inovação, com foco em desenvolvimento full stack e uma forte base em engenharia de software. Minha jornada na programação começou com formação técnica através do PRONATEC e desde então tenho trabalhado em diversos projetos pessoais e freelancer.</p>
            <p>Acredito que a tecnologia tem o poder de transformar vidas e estou sempre em busca de aprender novas tecnologias e metodologias para criar soluções cada vez melhores. Atualmente estou cursando Engenharia de Software na UniFatecie e desenvolvendo projetos pessoais para aprimorar minhas habilidades.</p>
          </div>
        </div>

        <div class="social-links">
          <a href="https://www.linkedin.com/in/lucas-virginio-55311627b" target="_blank">LinkedIn</a>
          <a href="https://github.com/llucalins" target="_blank">GitHub</a>
          <a href="mailto:lvirginio.dev@gmail.com">Email</a>
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
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras 
              e experiências digitais excepcionais.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>Sobre</button></li>
              <li><button onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}>Habilidades</button></li>
              <li><button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>Certificados</button></li>
              <li><button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contato</button></li>
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
                title="Baixar Currículo em PDF"
              >
                <FaFilePdf className="resume-icon" />
                <span className="resume-text">Baixar Currículo</span>
                <div className="resume-glow"></div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p>
              © {currentYear} Todos os direitos reservados.
            </p>
          </div>
          
          <button 
            className="scroll-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
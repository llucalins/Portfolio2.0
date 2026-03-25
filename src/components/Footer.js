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
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Lucas Virginio - ${t('footer.resume')}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet">
        <style>
          :root {
            --ink: #0f172a;
            --ink-soft: #334155;
            --muted: #64748b;
            --accent: #6366f1;
            --accent-soft: #e0e7ff;
            --surface: #f8fafc;
            --line: #e2e8f0;
          }

          @page {
            margin: 14mm 14mm 11mm 14mm;
            size: A4;
          }

          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
            line-height: 1.5;
            color: var(--ink-soft);
            background: #fff;
            font-size: 10.5pt;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* ── Header ── */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 20px;
            padding: 18px 20px;
            margin-bottom: 18px;
            background: linear-gradient(125deg, #0f172a 0%, #1e293b 55%, #312e81 100%);
            border-radius: 10px;
            box-shadow: 0 4px 24px rgba(15, 23, 42, 0.12);
          }
          .header-name {
            font-size: 26pt;
            font-weight: 700;
            color: #fff;
            line-height: 1.05;
            letter-spacing: -0.03em;
          }
          .header-name span {
            display: block;
          }
          .header-name span:last-child {
            font-weight: 600;
            opacity: 0.92;
          }
          .header-contacts {
            text-align: right;
            font-size: 8.75pt;
            color: #cbd5e1;
            line-height: 1.75;
          }
          .header-contacts .label {
            color: #a5b4fc;
            font-weight: 600;
            margin-right: 4px;
          }
          .header-contacts a {
            color: #e2e8f0;
            text-decoration: none;
            border-bottom: 1px solid rgba(226, 232, 240, 0.35);
          }

          /* ── Section titles ── */
          .section-title {
            font-size: 9.5pt;
            font-weight: 700;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.14em;
            margin: 20px 0 10px 0;
            padding-left: 12px;
            border-left: 3px solid var(--accent);
            line-height: 1.3;
          }

          /* ── Summary ── */
          .summary {
            font-size: 10pt;
            color: var(--ink-soft);
            line-height: 1.58;
            margin-bottom: 2px;
            padding: 12px 14px;
            background: var(--surface);
            border-radius: 8px;
            border: 1px solid var(--line);
            border-left: 3px solid var(--accent);
          }

          /* ── Skills list ── */
          .skills-list {
            font-size: 10pt;
            line-height: 1.65;
            padding: 10px 12px;
            background: var(--surface);
            border-radius: 8px;
            border: 1px solid var(--line);
          }
          .skills-list .row {
            margin-bottom: 6px;
            padding-bottom: 6px;
            border-bottom: 1px dashed var(--line);
          }
          .skills-list .row:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }
          .skills-list .cat {
            font-weight: 600;
            color: var(--ink);
          }

          /* ── Experience ── */
          .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 4px;
          }
          .exp-title {
            font-weight: 700;
            font-size: 10.5pt;
            color: var(--ink);
          }
          .exp-period {
            font-size: 8.5pt;
            color: var(--accent);
            font-weight: 700;
            background: var(--accent-soft);
            padding: 3px 10px;
            border-radius: 999px;
            white-space: nowrap;
          }
          .exp-company {
            font-size: 9.5pt;
            color: var(--accent);
            font-weight: 600;
            margin-bottom: 6px;
          }
          .exp-desc {
            font-size: 9.5pt;
            color: var(--muted);
            font-style: italic;
            margin-bottom: 8px;
            line-height: 1.5;
          }
          .exp-bullets {
            padding-left: 18px;
            font-size: 9.5pt;
            color: var(--ink-soft);
            line-height: 1.55;
          }
          .exp-bullets li {
            margin-bottom: 4px;
          }
          .exp-bullets li::marker {
            color: var(--accent);
          }
          .exp-block {
            margin-bottom: 16px;
            padding-left: 12px;
            border-left: 2px solid var(--line);
          }

          /* ── Education ── */
          .edu-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 0;
            padding: 10px 0;
            border-bottom: 1px solid var(--line);
          }
          .edu-item:last-child {
            border-bottom: none;
          }
          .edu-degree {
            font-weight: 600;
            font-size: 10pt;
            color: var(--ink);
          }
          .edu-inst {
            font-size: 9.5pt;
            color: var(--muted);
            margin-top: 2px;
          }
          .edu-year {
            font-size: 9pt;
            color: var(--ink);
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
            background: var(--surface);
            padding: 4px 10px;
            border-radius: 6px;
            border: 1px solid var(--line);
          }
        </style>
      </head>
      <body>

        <!-- HEADER -->
        <div class="header">
          <div class="header-name">
            <span>LUCAS</span>
            <span>VIRGINIO</span>
          </div>
          <div class="header-contacts">
            <div><span class="label">Telefone:</span> (83) 9 8602-3472</div>
            <div><span class="label">E-mail:</span> lvirginio.dev@gmail.com</div>
            <div><span class="label">LinkedIn:</span> <a href="https://www.linkedin.com/in/lucas-virginio-55311627b">lucas-virginio-55311627b</a></div>
            <div><span class="label">GitHub:</span> <a href="https://github.com/llucalins">llucalins</a></div>
          </div>
        </div>

        <!-- RESUMO PROFISSIONAL -->
        <div class="section-title">Resumo Profissional</div>
        <p class="summary">
          Desenvolvedor Frontend com experiência prática em Vue 3, TypeScript, Pinia e React, atuando na construção de interfaces para e-commerce com live integrada, dashboards operacionais e produtos digitais. Experiência com integração de APIs, organização de estado, PostgreSQL e ferramentas como Swagger e Insomnia. Busco oportunidades em frontend onde eu possa contribuir com interfaces de qualidade, boa estrutura de código e visão de produto.
        </p>

        <!-- COMPETÊNCIAS TÉCNICAS -->
        <div class="section-title">Competências Técnicas</div>
        <div class="skills-list">
          <div class="row"><span class="cat">Linguagens de Programação:</span> JavaScript, TypeScript</div>
          <div class="row"><span class="cat">Frameworks e Bibliotecas:</span> Vue 3, Vue 2, React, Vite</div>
          <div class="row"><span class="cat">Gerenciamento de Estado:</span> Pinia, Vuex, Context API</div>
          <div class="row"><span class="cat">Estilização:</span> CSS3, HTML5, Responsividade</div>
          <div class="row"><span class="cat">Integração e APIs:</span> APIs REST, Swagger, Insomnia</div>
          <div class="row"><span class="cat">Banco de Dados:</span> PostgreSQL</div>
          <div class="row"><span class="cat">Ferramentas de Versionamento:</span> Git, GitHub</div>
        </div>

        <!-- EXPERIÊNCIA -->
        <div class="section-title">Experiência</div>

        <div class="exp-block">
          <div class="exp-header">
            <span class="exp-title">Desenvolvedor Frontend — Atuação Remota</span>
            <span class="exp-period">2024 (9 meses)</span>
          </div>
          <div class="exp-desc">Atuação remota no desenvolvimento frontend de sistemas web voltados para diferentes contextos de negócio, com foco em interfaces funcionais, integração com APIs e organização de aplicações escaláveis.</div>
          <ul class="exp-bullets">
            <li>Desenvolvimento de interfaces para estruturas de e-commerce com live integrada.</li>
            <li>Criação e manutenção de dashboard para gerenciamento de medições, com comunicação entre sistema web e aplicativo mobile.</li>
            <li>Desenvolvimento de dashboard de controle para assistentes de WhatsApp, com foco em usabilidade e operação.</li>
            <li>Implementação de funcionalidades utilizando Vue 3, TypeScript e Vite.</li>
            <li>Gerenciamento de estado da aplicação com Pinia.</li>
            <li>Integração com APIs e apoio ao fluxo de comunicação com backend e banco de dados PostgreSQL.</li>
            <li>Utilização de Swagger e Insomnia para validação, documentação e testes de endpoints.</li>
            <li>Organização de componentes e telas com foco em manutenção, clareza e experiência do usuário.</li>
          </ul>
        </div>

        <div class="exp-block">
          <div class="exp-header">
            <span class="exp-title">Desenvolvedor Frontend</span>
            <span class="exp-period">2023 - 2024</span>
          </div>
          <div class="exp-company">Projetos Pessoais</div>
          <ul class="exp-bullets">
            <li>Criação de interfaces responsivas e otimização de performance de aplicações web com foco em componentização e boas práticas de desenvolvimento frontend.</li>
          </ul>
        </div>

        <div class="exp-block">
          <div class="exp-header">
            <span class="exp-title">Estudante de Desenvolvimento</span>
            <span class="exp-period">2022 - 2023</span>
          </div>
          <div class="exp-company">Cursos Online</div>
          <ul class="exp-bullets">
            <li>Aprendizado prático em desenvolvimento web através de cursos e projetos pessoais, com foco em fundamentos de frontend e tecnologias modernas.</li>
          </ul>
        </div>

        <!-- EDUCAÇÃO -->
        <div class="section-title">Educação</div>

        <div class="edu-item">
          <div>
            <div class="edu-degree">Bacharelado em Engenharia de Software</div>
            <div class="edu-inst">UniFatecie</div>
          </div>
          <div class="edu-year">2025 - Presente</div>
        </div>

        <div class="edu-item">
          <div>
            <div class="edu-degree">Formação Técnica PRONATEC</div>
            <div class="edu-inst">PRONATEC</div>
          </div>
          <div class="edu-year">2018</div>
        </div>

        <div class="edu-item">
          <div>
            <div class="edu-degree">Certificados DIO</div>
            <div class="edu-inst">Digital Innovation One — Desenvolvimento web, frontend e tecnologias modernas</div>
          </div>
          <div class="edu-year">2024</div>
        </div>

      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    
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

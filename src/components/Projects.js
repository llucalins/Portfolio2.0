import React, { useState, useEffect } from 'react';
import { FaDownload, FaFilePdf, FaEye, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { autoDetectAllCertificates } from '../utils/autoDetector';
import { useTranslation } from '../hooks/useTranslation';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Função para detectar automaticamente os certificados na pasta
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        console.log('🔍 Iniciando detecção automática de certificados...');
        const detectedCertificates = await autoDetectAllCertificates();
        console.log('✅ Certificados detectados:', detectedCertificates);
        
        console.log('📋 Lista final com todos os certificados:', detectedCertificates.map(c => c.filename));
        setCertificates(detectedCertificates);
      } catch (error) {
        console.error('❌ Erro ao carregar certificados:', error);
        setCertificates([]);
      }
    };

    loadCertificates();
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleCount(showAll ? 6 : certificates.length);
  };

  const visibleCertificates = certificates.slice(0, visibleCount);
  const hasMoreCertificates = certificates.length > 6;


  const downloadCertificate = (filename) => {
    try {
      const link = document.createElement('a');
      link.href = `/certificates/${encodeURIComponent(filename)}`;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Download iniciado:', filename);
    } catch (error) {
      console.error('Erro no download:', error);
      // Fallback - abrir em nova aba
      openPdfPreview(filename);
    }
  };

  const openPdfPreview = (filename) => {
    try {
      // Abrir PDF em nova aba com parâmetros para visualização
      const pdfUrl = `/certificates/${encodeURIComponent(filename)}`;
      console.log('Abrindo PDF:', pdfUrl);
      
      const newWindow = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      
      if (!newWindow) {
        // Fallback se popup for bloqueado
        console.log('Popup bloqueado, abrindo na mesma aba');
        window.location.href = pdfUrl;
      }
    } catch (error) {
      console.error('Erro ao abrir PDF:', error);
      // Fallback para download
      downloadCertificate(filename);
    }
  };



  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">{t('projects.title')}</h2>
        
        <div className="projects-grid">
          {visibleCertificates.map(certificate => (
            <div key={certificate.id} className={`project-card ${certificate.featured ? 'featured' : ''}`}>
              <div className="project-image">
                <div className="certificate-preview-container">
                  <iframe
                    src={`/certificates/${encodeURIComponent(certificate.filename)}#toolbar=0&navpanes=0&scrollbar=0`}
                    className={`certificate-iframe ${certificate.filename === 'PRONATEC.pdf' ? 'pronatec-rotation' : ''}`}
                    title={certificate.title}
                    onError={(e) => {
                      console.log('❌ Erro no iframe:', certificate.filename, e);
                      // Fallback visual se iframe falhar
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'certificate-fallback';
                      fallback.innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 2rem;">
                          <div style="margin-bottom: 1rem;">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                          </div>
                          <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 600;">${certificate.title}</h4>
                          <p style="margin: 0 0 0.25rem 0; font-size: 0.9rem; opacity: 0.9;">${certificate.issuer}</p>
                          <small style="font-size: 0.8rem; opacity: 0.7;">${certificate.date}</small>
                        </div>
                      `;
                      e.target.parentNode.appendChild(fallback);
                    }}
                    onLoad={(e) => {
                      console.log('✅ Iframe carregado com sucesso:', certificate.filename);
                    }}
                    ref={(iframe) => {
                      // Timeout para forçar fallback se demorar muito
                      if (iframe) {
                        console.log('🔄 Configurando timeout para:', certificate.filename);
                        setTimeout(() => {
                          try {
                            if (iframe.contentDocument && iframe.contentDocument.body.innerHTML === '') {
                              console.log('⏰ Timeout - forçando fallback para:', certificate.filename);
                              iframe.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'certificate-fallback';
                              fallback.innerHTML = `
                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 2rem;">
                                  <div style="margin-bottom: 1rem;">
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                    </svg>
                                  </div>
                                  <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 600;">${certificate.title}</h4>
                                  <p style="margin: 0 0 0.25rem 0; font-size: 0.9rem; opacity: 0.9;">${certificate.issuer}</p>
                                  <small style="font-size: 0.8rem; opacity: 0.7;">${certificate.date}</small>
                                </div>
                              `;
                              iframe.parentNode.appendChild(fallback);
                            }
                          } catch (error) {
                            console.log('⚠️ Erro no timeout check:', error);
                          }
                        }, 3000); // 3 segundos de timeout para dar mais tempo
                      }
                    }}
                  />
                </div>
                <div className="certificate-overlay">
                  <div className="certificate-actions">
                    <button 
                      className="certificate-action-btn"
                      onClick={() => openPdfPreview(certificate.filename)}
                      title={t('projects.viewCertificate')}
                    >
                      <FaEye />
                      <span>{t('projects.viewCertificate')}</span>
                    </button>
                    <button 
                      className="certificate-action-btn"
                      onClick={() => downloadCertificate(certificate.filename)}
                      title={t('projects.downloadCertificate')}
                    >
                      <FaDownload />
                      <span>{t('projects.downloadCertificate')}</span>
                    </button>
                  </div>
                </div>
                {certificate.featured && (
                  <div className="featured-badge">
                    {t('projects.featured')}
                  </div>
                )}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{certificate.title}</h3>
                <p className="project-description">{certificate.description}</p>
                
                <div className="project-technologies">
                  <span className="technology-tag">{certificate.issuer}</span>
                  <span className="technology-tag">{certificate.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {hasMoreCertificates && (
          <div className="show-more-container">
            <button 
              className="show-more-btn"
              onClick={toggleShowAll}
              title={showAll ? t('projects.showLess') : t('projects.showAll')}
            >
              {showAll ? <FaChevronUp /> : <span>+</span>}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 
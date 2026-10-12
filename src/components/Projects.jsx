import React, { useEffect, useState } from 'react';
import { FaDownload, FaEye, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { autoDetectAllCertificates } from '../utils/autoDetector';
import { useTranslation } from '../hooks/useTranslation';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setCertificates(await autoDetectAllCertificates());
      } catch (error) {
        console.error('Erro ao carregar certificados:', error);
        setCertificates([]);
      }
    };

    loadCertificates();
  }, []);

  const visibleCertificates = showAll ? certificates : certificates.slice(0, 6);
  const hasMoreCertificates = certificates.length > 6;

  return (
    <section id="certificates" className="projects">
      <div className="container">
        <header className="projects-heading">
          <span className="section-index" aria-hidden="true">04</span>
          <h2 className="section-title">{t('projects.title')}</h2>
        </header>

        <div className="certificates-list">
          {visibleCertificates.map((certificate, index) => {
            const certificateUrl = `/certificates/${encodeURIComponent(certificate.filename)}`;

            return (
              <article key={certificate.id} className="certificate-row">
                <span className="certificate-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="certificate-content">
                  <div className="certificate-title-line">
                    <h3>
                      {certificate.titleKey
                        ? t(`projects.certificates.${certificate.titleKey}`)
                        : certificate.title}
                    </h3>
                    {certificate.featured && (
                      <span className="featured-label">{t('projects.featured')}</span>
                    )}
                  </div>
                  <p>{certificate.description}</p>
                  <p className="certificate-meta">
                    <span>{certificate.issuer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{certificate.date}</span>
                  </p>
                </div>

                <div className="certificate-actions">
                  <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
                    <FaEye aria-hidden="true" />
                    <span>{t('projects.viewCertificate')}</span>
                  </a>
                  <a href={certificateUrl} download={certificate.filename}>
                    <FaDownload aria-hidden="true" />
                    <span>{t('projects.downloadCertificate')}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {hasMoreCertificates && (
          <div className="show-more-container">
            <button className="show-more-btn" type="button" onClick={() => setShowAll(value => !value)}>
              {showAll ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
              <span>{showAll ? t('projects.showLess') : t('projects.showAll')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

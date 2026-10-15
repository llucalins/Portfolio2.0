import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { autoDetectAllCertificates } from '../utils/autoDetector';

// Selected for the web/mobile role; the complete list remains available on screen.
const PRINT_CERTIFICATES = new Set(['gitGitHub', 'softwareStructure', 'clientServer', 'flutterIntro']);

const ResumeCertificates = ({ onReady }) => {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    autoDetectAllCertificates()
      .then((items) => {
        if (active) setCertificates(items);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) onReady?.(true);
  }, [loading, onReady]);

  return (
    <section className="resume-section resume-certificates" aria-labelledby="resume-certificates-title">
      <h2 id="resume-certificates-title">{t('resumePage.certificates')}</h2>
      {loading && <p className="resume-status" role="status">{t('resumePage.loadingCertificates')}</p>}
      {!loading && certificates.length === 0 && (
        <p className="resume-status" role="status">{t('resumePage.noCertificates')}</p>
      )}
      {certificates.length > 0 && (
        <ul>
          {certificates.map((certificate) => {
            const title = certificate.titleKey
              ? t(`projects.certificates.${certificate.titleKey}`)
              : certificate.title;

            return (
              <li key={certificate.id} className={PRINT_CERTIFICATES.has(certificate.titleKey) ? undefined : 'resume-certificate-web-only'}>
                <a
                  href={`/certificates/${encodeURIComponent(certificate.filename)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t('resumePage.openCertificate')}: ${title}`}
                >
                  <strong>{title}</strong>
                  <span>{certificate.issuer} · {certificate.date}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ResumeCertificates;

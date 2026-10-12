import React from 'react';
import { professionalProfile } from '../data/professionalProfile';
import { useTranslation } from '../hooks/useTranslation';
import './ContactPage.css';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <section className="contact-page" aria-labelledby="contact-page-title">
      <div className="container contact-page-shell">
        <header className="contact-page-header">
          <p className="contact-page-eyebrow">/contact</p>
          <div>
            <h1 id="contact-page-title">{t('contactPage.title')}</h1>
            <p className="contact-page-intro">{t('contactPage.intro')}</p>
          </div>
        </header>

        <address className="contact-directory" aria-label={t('contactPage.directoryLabel')}>
          {professionalProfile.contacts.map((contact) => {
            const label = t(contact.labelKey);
            const value = contact.valueKey ? t(contact.valueKey) : contact.value;
            const isExternal = contact.href?.startsWith('http');

            return contact.href ? (
              <a
                className="contact-directory-row"
                href={contact.href}
                key={contact.id}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={isExternal ? `${label}: ${value} (${t('contactPage.newTab')})` : `${label}: ${value}`}
              >
                <span className="contact-directory-label">{label}</span>
                <strong>{value}</strong>
                <span className="contact-directory-arrow" aria-hidden="true">↗</span>
              </a>
            ) : (
              <div className="contact-directory-row" key={contact.id}>
                <span className="contact-directory-label">{label}</span>
                <strong>{value}</strong>
              </div>
            );
          })}
        </address>
      </div>
    </section>
  );
};

export default ContactPage;

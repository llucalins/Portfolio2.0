import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './HomeOverview.css';

const HomeOverview = () => {
  const { t } = useTranslation();
  const destinations = [
    {
      path: '/work',
      title: t('homeOverview.workTitle'),
      description: t('homeOverview.workDescription')
    },
    {
      path: '/resume',
      title: t('homeOverview.resumeTitle'),
      description: t('homeOverview.resumeDescription')
    }
  ];

  return (
    <section className="home-overview" aria-labelledby="home-overview-title">
      <div className="container">
        <div className="home-overview-intro">
          <p className="home-overview-label">{t('homeOverview.label')}</p>
          <div>
            <h2 id="home-overview-title">{t('homeOverview.title')}</h2>
            <p>{t('homeOverview.description')}</p>
          </div>
        </div>

        <nav className="home-destinations" aria-label={t('homeOverview.navigationLabel')}>
          {destinations.map((destination) => (
            <Link key={destination.path} to={destination.path}>
              <span className="home-destination-copy">
                <h3>{destination.title}</h3>
                <span>{destination.description}</span>
              </span>
              <span className="home-destination-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>

        <div className="home-contact-callout">
          <p>{t('homeOverview.contactPrompt')}</p>
          <Link to="/contact">
            {t('homeOverview.contactLink')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeOverview;

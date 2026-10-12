import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './RoutePage.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <section className="route-page" aria-labelledby="not-found-title">
      <div className="container route-page-content">
        <p className="route-page-eyebrow">404</p>
        <h1 id="not-found-title">{t('routes.notFound.title')}</h1>
        <p>{t('routes.notFound.description')}</p>
        <Link to="/">{t('routes.backHome')} <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
};

export default NotFoundPage;

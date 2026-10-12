import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RouteEffects from '../components/RouteEffects';
import { useTranslation } from '../hooks/useTranslation';

const AppLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="App">
      <RouteEffects />
      <a className="skip-link" href="#main-content">{t('nav.skipToContent')}</a>
      <Header />
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;

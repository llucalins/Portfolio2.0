import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from './useTranslation';
import { professionalProfile } from '../data/professionalProfile';

export const useMetaTags = () => {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const routePath = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
    const routeKey = {
      '/': 'home',
      '/work': 'work',
      '/resume': 'resume',
      '/contact': 'contact'
    }[routePath] || 'notFound';

    const pageTitles = {
      home: t(professionalProfile.roleKey),
      work: t('routes.work.title'),
      resume: t('routes.resume.title'),
      contact: t('routes.contact.title'),
      notFound: t('routes.notFound.title')
    };
    const descriptions = {
      home: t('profile.metaDescription'),
      work: t('work.intro'),
      resume: t('profile.metaDescription'),
      contact: t('contactPage.intro'),
      notFound: t('routes.notFound.description')
    };
    const title = routeKey === 'home'
      ? `${professionalProfile.name} | ${pageTitles.home}`
      : `${pageTitles[routeKey]} | ${professionalProfile.name} | ${pageTitles.home}`;
    const description = descriptions[routeKey];
    const canonicalUrl = new URL(routePath || '/', window.location.origin).toString();

    const setContent = (selector, value) => {
      document.querySelector(selector)?.setAttribute('content', value);
    };

    document.title = title;
    setContent('meta[name="description"]', description);
    setContent('meta[property="og:title"]', title);
    setContent('meta[property="og:description"]', description);
    setContent('meta[property="og:url"]', canonicalUrl);
    setContent('meta[property="og:locale"]', language === 'pt' ? 'pt_BR' : 'en_US');
    setContent('meta[property="twitter:title"]', title);
    setContent('meta[property="twitter:description"]', description);
    setContent('meta[property="twitter:url"]', canonicalUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
  }, [language, pathname, t]);
};

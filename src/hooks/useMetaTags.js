import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useMetaTags = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const updateMetaTags = () => {
      if (language === 'pt') {
        document.querySelector('meta[property="og:title"]').setAttribute('content', 'Lucas Virginio | Desenvolvedor Frontend');
        document.querySelector('meta[property="og:description"]').setAttribute('content', 'Portfólio de Lucas Virginio, desenvolvedor frontend com foco em Vue 3, TypeScript, Pinia, React, integração com APIs, PostgreSQL e construção de interfaces modernas.');
        document.querySelector('meta[property="twitter:title"]').setAttribute('content', 'Lucas Virginio | Desenvolvedor Frontend');
        document.querySelector('meta[property="twitter:description"]').setAttribute('content', 'Portfólio de Lucas Virginio, desenvolvedor frontend com foco em Vue 3, TypeScript, Pinia, React, integração com APIs, PostgreSQL e construção de interfaces modernas.');
        document.querySelector('meta[property="og:locale"]').setAttribute('content', 'pt_BR');
        document.title = 'Lucas Virginio | Desenvolvedor Frontend';
      } else {
        document.querySelector('meta[property="og:title"]').setAttribute('content', 'Lucas Virginio | Frontend Developer');
        document.querySelector('meta[property="og:description"]').setAttribute('content', 'Portfolio of Lucas Virginio, frontend developer focused on Vue 3, TypeScript, Pinia, React, API integration, PostgreSQL and modern interface development.');
        document.querySelector('meta[property="twitter:title"]').setAttribute('content', 'Lucas Virginio | Frontend Developer');
        document.querySelector('meta[property="twitter:description"]').setAttribute('content', 'Portfolio of Lucas Virginio, frontend developer focused on Vue 3, TypeScript, Pinia, React, API integration, PostgreSQL and modern interface development.');
        document.querySelector('meta[property="og:locale"]').setAttribute('content', 'en_US');
        document.title = 'Lucas Virginio | Frontend Developer';
      }
    };

    updateMetaTags();
  }, [language]);
};

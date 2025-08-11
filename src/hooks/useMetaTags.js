import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useMetaTags = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const updateMetaTags = () => {
      if (language === 'pt') {
        // Português
        document.querySelector('meta[property="og:title"]').setAttribute('content', 'Lucas Virginio - Desenvolvedor Full Stack');
        document.querySelector('meta[property="og:description"]').setAttribute('content', 'Portfólio profissional de Lucas Virginio - Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.');
        document.querySelector('meta[property="twitter:title"]').setAttribute('content', 'Lucas Virginio - Desenvolvedor Full Stack');
        document.querySelector('meta[property="twitter:description"]').setAttribute('content', 'Portfólio profissional de Lucas Virginio - Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.');
        document.querySelector('meta[property="og:locale"]').setAttribute('content', 'pt_BR');
        document.title = 'Lucas Virginio - Desenvolvedor Full Stack';
      } else {
        // Inglês
        document.querySelector('meta[property="og:title"]').setAttribute('content', 'Lucas Virginio - Full Stack Developer');
        document.querySelector('meta[property="og:description"]').setAttribute('content', 'Professional portfolio of Lucas Virginio - Full Stack Developer passionate about creating innovative solutions and exceptional digital experiences.');
        document.querySelector('meta[property="twitter:title"]').setAttribute('content', 'Lucas Virginio - Full Stack Developer');
        document.querySelector('meta[property="twitter:description"]').setAttribute('content', 'Professional portfolio of Lucas Virginio - Full Stack Developer passionate about creating innovative solutions and exceptional digital experiences.');
        document.querySelector('meta[property="og:locale"]').setAttribute('content', 'en_US');
        document.title = 'Lucas Virginio - Full Stack Developer';
      }
    };

    updateMetaTags();
  }, [language]);
};

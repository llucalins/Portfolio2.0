import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './PreviewTester.css';

const PreviewTester = () => {
  const { t } = useTranslation();

  const testUrls = [
    {
      name: 'Facebook Debugger',
      url: 'https://developers.facebook.com/tools/debug/',
      description: 'Teste como seu link aparece no Facebook'
    },
    {
      name: 'Twitter Card Validator',
      url: 'https://cards-dev.twitter.com/validator',
      description: 'Teste como seu link aparece no Twitter'
    },
    {
      name: 'LinkedIn Post Inspector',
      url: 'https://www.linkedin.com/post-inspector/',
      description: 'Teste como seu link aparece no LinkedIn'
    },
    {
      name: 'WhatsApp Preview',
      url: 'https://wa.me/?text=https://portfolio2-0-two-bay.vercel.app/',
      description: 'Teste como seu link aparece no WhatsApp'
    }
  ];

  return (
    <div className="preview-tester">
      <h2>🧪 Teste de Preview</h2>
      <p>Use estas ferramentas para testar como seu link aparece quando compartilhado:</p>
      
      <div className="test-tools">
        {testUrls.map((tool, index) => (
          <div key={index} className="test-tool">
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="test-button"
            >
              Testar Preview
            </a>
          </div>
        ))}
      </div>

      <div className="preview-info">
        <h3>📱 O que foi implementado:</h3>
        <ul>
          <li>✅ <strong>Open Graph</strong> - Para Facebook, WhatsApp, LinkedIn</li>
          <li>✅ <strong>Twitter Cards</strong> - Para Twitter</li>
          <li>✅ <strong>Meta tags dinâmicas</strong> - Baseadas no idioma</li>
          <li>✅ <strong>Imagem de preview</strong> - Otimizada para redes sociais</li>
          <li>✅ <strong>SEO melhorado</strong> - Sitemap, robots.txt, manifest</li>
        </ul>
      </div>

      <div className="current-url">
        <h3>🔗 URL para testar:</h3>
        <code>https://portfolio2-0-two-bay.vercel.app/</code>
        <button 
          onClick={() => navigator.clipboard.writeText('https://portfolio2-0-two-bay.vercel.app/')}
          className="copy-button"
        >
          Copiar URL
        </button>
      </div>
    </div>
  );
};

export default PreviewTester;

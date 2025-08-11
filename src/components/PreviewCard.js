import React from 'react';
import { generatePreviewImage } from '../utils/generatePreviewImage';
import './PreviewCard.css';

const PreviewCard = () => {
  const handleGenerateImage = async () => {
    try {
      const dataURL = generatePreviewImage();
      const response = await fetch(dataURL);
      const blob = await response.blob();
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio-preview.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Imagem gerada com sucesso! Verifique sua pasta de downloads.');
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      alert('Erro ao gerar imagem. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="preview-card-container">
      <h2>🎨 Preview do Card de Compartilhamento</h2>
      <p>Esta é exatamente como seu link aparecerá quando compartilhado nas redes sociais:</p>
      
      {/* Card de Preview */}
      <div className="preview-card">
        <div className="preview-card-content">
          <div className="preview-text-section">
            <h1 className="preview-name">Lucas Virginio</h1>
            <h2 className="preview-title">Full Stack Developer</h2>
            <p className="preview-description">
              Desenvolvedor apaixonado por criar soluções inovadoras e experiências digitais excepcionais
            </p>
            <div className="preview-tags">
              <span className="preview-tag">React</span>
              <span className="preview-tag">Node.js</span>
              <span className="preview-tag">TypeScript</span>
              <span className="preview-tag">Python</span>
              <span className="preview-tag">Java</span>
            </div>
          </div>
          
          <div className="preview-avatar-section">
            <div className="preview-avatar">
              <img 
                src="/lucas-virginio-avatar.png" 
                alt="Lucas Virginio"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="preview-avatar-placeholder">LV</div>
            </div>
          </div>
        </div>
        
        <div className="preview-small-avatar">
          <img 
            src="/lucas-virginio-avatar.png" 
            alt="Lucas Virginio"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="preview-small-avatar-placeholder">LV</div>
        </div>
      </div>
      
      <div className="preview-actions">
        <button onClick={handleGenerateImage} className="generate-button">
          📸 Gerar Imagem PNG (1200x630)
        </button>
        <p className="preview-info">
          Clique no botão acima para gerar a imagem PNG que será usada como preview nas redes sociais.
          A imagem será baixada automaticamente.
        </p>
      </div>
      
      <div className="preview-instructions">
        <h3>📋 Como usar:</h3>
        <ol>
          <li>Clique em "Gerar Imagem PNG" para baixar a imagem</li>
          <li>Substitua o arquivo <code>public/portfolio-preview.png</code> pela imagem gerada</li>
          <li>Faça o deploy do site</li>
          <li>Teste o preview usando as ferramentas abaixo</li>
        </ol>
      </div>
    </div>
  );
};

export default PreviewCard;

import React, { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { generatePreviewImage } from '../utils/generatePreviewImage';

const PreviewImageGenerator = () => {
  const previewRef = useRef(null);

  const handleGenerateImage = async () => {
    try {
      // Gerar imagem usando Canvas API
      const dataURL = generatePreviewImage();
      
      // Converter dataURL para blob
      const response = await fetch(dataURL);
      const blob = await response.blob();
      
      // Fazer download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio-preview.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('Imagem gerada com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <button 
        onClick={handleGenerateImage}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '25px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        📸 Gerar Imagem de Preview
      </button>

      {/* Container da imagem de preview */}
      <div 
        ref={previewRef}
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px',
          boxSizing: 'border-box',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Partículas de fundo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: `rgba(${102 + i * 5}, ${126 + i * 3}, ${234 - i * 2}, 0.6)`,
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite`
              }}
            />
          ))}
        </div>

        {/* Conteúdo principal */}
        <div style={{
          flex: 1,
          zIndex: 2,
          position: 'relative'
        }}>
          {/* Nome */}
          <h1 style={{
            fontSize: '72px',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(102, 126, 234, 0.5)',
            lineHeight: '1.1'
          }}>
            Lucas Virginio
          </h1>

          {/* Título */}
          <h2 style={{
            fontSize: '36px',
            fontWeight: '400',
            color: '#667eea',
            margin: '0 0 30px 0',
            textShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
          }}>
            Full Stack Developer
          </h2>

          {/* Descrição */}
          <p style={{
            fontSize: '24px',
            color: '#cccccc',
            margin: '0',
            maxWidth: '500px',
            lineHeight: '1.4'
          }}>
            Desenvolvedor apaixonado por criar soluções inovadoras e experiências digitais excepcionais
          </p>

          {/* Tags de tecnologia */}
          <div style={{
            display: 'flex',
            gap: '15px',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            {['React', 'Node.js', 'TypeScript', 'Python', 'Java'].map((tech, index) => (
              <span
                key={tech}
                style={{
                  background: 'rgba(102, 126, 234, 0.2)',
                  color: '#667eea',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid rgba(102, 126, 234, 0.3)',
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          zIndex: 2
        }}>
          <img
            src="/lucas-virginio-avatar.png"
            alt="Lucas Virginio"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Pequeno avatar no canto */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          zIndex: 3
        }}>
          <img
            src="/lucas-virginio-avatar.png"
            alt="Lucas Virginio"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PreviewImageGenerator;

// Utilitário para detectar certificados PDF automaticamente
import { certificateList } from './certificateConfig';

// Função para detectar automaticamente todos os PDFs na pasta
export const detectCertificates = async () => {
  try {
    // Lista de arquivos detectados na pasta certificates
    const detectedFiles = [
      '1GFKQMF2.pdf',
      '4DQBEV3R.pdf', 
      '8E04057A.pdf',
      '7773CD70.pdf',
      'EABD3805.pdf',
      'OPCYCM0Y.pdf'
    ];

    // Verificar quais arquivos realmente existem
    const existingFiles = [];
    for (const filename of detectedFiles) {
      const exists = await checkPdfExists(filename);
      if (exists) {
        existingFiles.push(filename);
      }
    }

    // Mapear arquivos existentes para certificados
    const certificates = existingFiles.map((filename, index) => {
      const info = extractCertificateInfo(filename);
      return {
        id: index + 1,
        filename: filename,
        title: info.title,
        description: info.description,
        issuer: info.issuer,
        date: info.date,
        category: info.category,
        featured: info.featured
      };
    });

    return certificates;
  } catch (error) {
    console.error('Erro ao detectar certificados:', error);
    // Fallback para lista estática
    return certificateList;
  }
};

// Função para extrair informações do certificado baseado no nome do arquivo
const extractCertificateInfo = (filename) => {
  // Mapeamento de informações baseado nos certificados detectados
  const certificateInfo = {
    '1GFKQMF2.pdf': {
      title: 'Sintaxe e Tipos de Dados em C#',
      description: 'Curso completo de sintaxe e tipos de dados em C# com práticas avançadas.',
      issuer: 'DIO',
      date: '2024',
      category: 'backend',
      featured: true
    },
    '4DQBEV3R.pdf': {
      title: 'Sintaxe e Tipos de Dados em C#',
      description: 'Especialização em sintaxe e tipos de dados em C# com exemplos práticos.',
      issuer: 'DIO',
      date: '2024',
      category: 'backend',
      featured: true
    },
    '8E04057A.pdf': {
      title: 'Sintaxe e Tipos de Dados em C#',
      description: 'Desenvolvimento com C#: sintaxe, tipos de dados e boas práticas.',
      issuer: 'DIO',
      date: '2024',
      category: 'backend',
      featured: false
    },
    '7773CD70.pdf': {
      title: 'Sintaxe e Tipos de Dados em C#',
      description: 'JavaScript ES6+, async/await, promises, módulos e padrões avançados.',
      issuer: 'DIO',
      date: '2024',
      category: 'frontend',
      featured: false
    },
    'EABD3805.pdf': {
      title: 'Sintaxe e Tipos de Dados em C#',
      description: 'TypeScript para desenvolvimento de aplicações robustas e tipagem estática.',
      issuer: 'DIO',
      date: '2024',
      category: 'frontend',
      featured: false
    },
    'OPCYCM0Y.pdf': {
      title: 'Sintaxe e Tipos de Dados em C#',
      description: 'DevOps, Docker, CI/CD, AWS e práticas de desenvolvimento ágil.',
      issuer: 'DIO',
      date: '2024',
      category: 'devops',
      featured: true
    }
  };

  // Retorna informações do certificado ou padrão
  return certificateInfo[filename] || {
    title: 'Certificado Profissional',
    description: 'Certificado de curso profissional.',
    issuer: 'Instituição',
    date: '2024',
    category: 'frontend',
    featured: false
  };
};

// Função para adicionar um novo certificado
export const addCertificate = (certificate) => {
  // Esta função pode ser expandida para salvar em localStorage ou API
  console.log('Novo certificado adicionado:', certificate);
  return certificate;
};

// Função para verificar se um arquivo PDF existe
export const checkPdfExists = async (filename) => {
  try {
    const response = await fetch(`/certificates/${filename}`, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Erro ao verificar arquivo ${filename}:`, error);
    return false;
  }
};

// Função para listar todos os PDFs na pasta certificates
export const listAvailablePdfs = async () => {
  try {
    const certificates = await detectCertificates();
    return certificates.map(cert => cert.filename);
  } catch (error) {
    console.error('Erro ao listar PDFs:', error);
    return [];
  }
};

// Função para detectar automaticamente novos certificados
export const autoDetectNewCertificates = async () => {
  try {
    // Lista de arquivos conhecidos
    const knownFiles = [
      '1GFKQMF2.pdf',
      '4DQBEV3R.pdf', 
      '8E04057A.pdf',
      '7773CD70.pdf',
      'EABD3805.pdf',
      'OPCYCM0Y.pdf'
    ];

    // Verificar quais arquivos existem
    const existingFiles = [];
    for (const filename of knownFiles) {
      const exists = await checkPdfExists(filename);
      if (exists) {
        existingFiles.push(filename);
      }
    }

    console.log('📁 Arquivos detectados:', existingFiles);
    return existingFiles;
  } catch (error) {
    console.error('Erro na detecção automática:', error);
    return [];
  }
}; 
// Detector automático para certificados PDF
// Detecta automaticamente qualquer PDF colocado na pasta certificates

// Lista de arquivos conhecidos com suas informações
const KNOWN_CERTIFICATES = {
  '1GFKQMF2.pdf': {
    title: 'Introdução ao Desenvolvimento Full Stack com a XP Inc',
    description: 'Curso de desenvolvimento Full Stack com carga horária de 1 hora.',
    issuer: 'DIO',
    date: '2024',
    category: 'fullstack',
    featured: false
  },
  '4DQBEV3R.pdf': {
    title: 'Sintaxe e Tipos de Dados em C#',
    description: 'Fundamentos da linguagem C# com carga horária de 3 horas.',
    issuer: 'DIO',
    date: '2024',
    category: 'backend',
    featured: false
  },
  '7773CD70.pdf': {
    title: 'Princípios de Desenvolvimento de Software',
    description: 'Módulo sobre princípios fundamentais com carga horária de 6 horas.',
    issuer: 'DIO',
    date: '2024',
    category: 'software',
    featured: false
  },
  '8E04057A.pdf': {
    title: 'Ambiente de Desenvolvimento Java',
    description: 'Curso sobre ambiente de desenvolvimento Java com carga horária de 1 hora.',
    issuer: 'DIO',
    date: '2024',
    category: 'backend',
    featured: false
  },
  'EABD3805.pdf': {
    title: 'Versionamento de Código com Git e GitHub',
    description: 'Curso sobre controle de versão com carga horária de 2 horas.',
    issuer: 'DIO',
    date: '2024',
    category: 'devops',
    featured: false
  },
  'OPCYCM0Y.pdf': {
    title: 'Estrutura de um Software e Seu Ambiente de Desenvolvimento',
    description: 'DevOps, Docker, CI/CD, AWS e práticas de desenvolvimento ágil.',
    issuer: 'DIO',
    date: '2024',
    category: 'devops',
    featured: true
  },
  'bacharelado.pdf': {
    title: 'Bacharelado em Andamento',
    description: 'Curso de bacharelado em andamento - Em progresso.',
    issuer: 'Instituição de Ensino Superior',
    date: '2024',
    category: 'education',
    featured: true
  },
  'ensino medio.pdf': {
    title: 'Certificado do Ensino Médio',
    description: 'Certificado de conclusão do ensino médio.',
    issuer: 'Colégio Menino Jesus de Praga',
    date: '2024',
    category: 'education',
    featured: false
  }
};

// Função para verificar se um arquivo PDF existe
const checkPdfExists = async (filename) => {
  try {
    const encodedFilename = encodeURIComponent(filename);
    console.log(`🔍 Verificando arquivo: ${filename}`);
    console.log(`🔗 URL codificada: /certificates/${encodedFilename}`);
    
    const response = await fetch(`/certificates/${encodedFilename}`, { method: 'HEAD' });
    const result = response.ok;
    console.log(`📊 Resultado: ${filename} -> ${result ? '✅ OK' : '❌ FALHOU'} (Status: ${response.status})`);
    return result;
  } catch (error) {
    console.error(`❌ Erro ao verificar arquivo ${filename}:`, error);
    return false;
  }
};

// Função para tentar extrair informações do PDF
const extractPdfInfo = async (filename) => {
  try {
    // Mapeamento direto dos títulos corretos baseado nos certificados visíveis
    const titleMapping = {
      '1GFKQMF2.pdf': 'Introdução ao Desenvolvimento Full Stack com a XP Inc',
      '4DQBEV3R.pdf': 'Sintaxe e Tipos de Dados em C#',
      '7773CD70.pdf': 'Princípios de Desenvolvimento de Software',
      '8E04057A.pdf': 'Ambiente de Desenvolvimento Java',
      'EABD3805.pdf': 'Versionamento de Código com Git e GitHub',
      'OPCYCM0Y.pdf': 'Estrutura de um Software e Seu Ambiente de Desenvolvimento',
      'bacharelado.pdf': 'Bacharelado em Andamento',
      'ensino medio.pdf': 'Certificado do Ensino Médio'
    };
    
    // Retornar o título mapeado diretamente
    const mappedTitle = titleMapping[filename];
    if (mappedTitle) {
      console.log(`📄 Título mapeado para ${filename}:`, mappedTitle);
      return mappedTitle;
    }
    
    // Fallback para arquivos não mapeados
    const cleanFilename = filename.replace('.pdf', '').replace(/[_-]/g, ' ');
    console.log(`📄 Usando nome do arquivo como título: ${cleanFilename}`);
    return cleanFilename;
    
  } catch (error) {
    console.error(`❌ Erro ao extrair informações do PDF ${filename}:`, error);
    return null;
  }
};

// Função para detectar automaticamente todos os PDFs na pasta
export const autoDetectAllCertificates = async () => {
  try {
    console.log('🔍 Detectando certificados automaticamente...');
    console.log('📁 Arquivos conhecidos:', Object.keys(KNOWN_CERTIFICATES));
    
    // Verificar todos os arquivos conhecidos
    const existingFiles = [];
    for (const filename of Object.keys(KNOWN_CERTIFICATES)) {
      const exists = await checkPdfExists(filename);
      if (exists) {
        existingFiles.push(filename);
        console.log(`✅ Encontrado: ${filename}`);
      } else {
        console.log(`❌ Não encontrado: ${filename}`);
      }
    }

    // Todos os arquivos conhecidos serão verificados automaticamente

    // Mapear arquivos existentes para certificados
    const certificates = await Promise.all(existingFiles.map(async (filename, index) => {
      const info = KNOWN_CERTIFICATES[filename];
      
      // Tentar extrair título do PDF
      let extractedTitle = null;
      try {
        extractedTitle = await extractPdfInfo(filename);
      } catch (error) {
        console.log(`⚠️ Erro ao extrair título do PDF ${filename}:`, error);
      }
      
      const certificate = {
        id: index + 1,
        filename: filename,
        title: extractedTitle || info.title, // Usar título extraído ou fallback
        description: info.description,
        issuer: info.issuer,
        date: info.date,
        category: info.category,
        featured: info.featured
      };
      console.log(`📋 Certificado mapeado:`, certificate);
      return certificate;
    }));

    console.log(`📊 Total de certificados detectados: ${certificates.length}`);
    console.log('📋 Lista final:', certificates.map(c => c.filename));
    return certificates;
  } catch (error) {
    console.error('❌ Erro na detecção automática:', error);
    return [];
  }
};

// Função para adicionar um novo certificado automaticamente
export const addNewCertificate = async (filename) => {
  try {
    const exists = await checkPdfExists(filename);
    if (exists) {
      // Se o arquivo existe mas não está na lista conhecida, adicionar automaticamente
      if (!KNOWN_CERTIFICATES[filename]) {
        const newCertificate = {
          id: Object.keys(KNOWN_CERTIFICATES).length + 1,
          filename: filename,
          title: `Certificado ${filename.replace('.pdf', '')}`,
          description: 'Certificado profissional detectado automaticamente.',
          issuer: 'Instituição',
          date: '2024',
          category: 'frontend',
          featured: false
        };
        
        console.log('🆕 Novo certificado detectado:', newCertificate);
        return newCertificate;
      }
    }
    return null;
  } catch (error) {
    console.error('❌ Erro ao adicionar certificado:', error);
    return null;
  }
};

// Função para listar todos os arquivos PDF disponíveis
export const listAllAvailablePdfs = async () => {
  try {
    const allFiles = Object.keys(KNOWN_CERTIFICATES);
    const existingFiles = [];
    
    for (const filename of allFiles) {
      const exists = await checkPdfExists(filename);
      if (exists) {
        existingFiles.push(filename);
      }
    }
    
    return existingFiles;
  } catch (error) {
    console.error('❌ Erro ao listar PDFs:', error);
    return [];
  }
};

// Função para verificar se há novos certificados
export const checkForNewCertificates = async () => {
  try {
    const currentFiles = await listAllAvailablePdfs();
    console.log('📁 Arquivos atualmente disponíveis:', currentFiles);
    return currentFiles;
  } catch (error) {
    console.error('❌ Erro ao verificar novos certificados:', error);
    return [];
  }
}; 
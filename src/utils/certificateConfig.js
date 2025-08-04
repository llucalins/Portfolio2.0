// Configuração fácil para adicionar novos certificados
// Basta adicionar seus certificados nesta lista

export const certificateList = [
  // Certificados Frontend
  {
    id: 1,
    title: 'Sintaxe e Tipos de Dados em C#',
    description: 'Curso completo de sintaxe e tipos de dados em C# com práticas avançadas.',
    filename: '1GFKQMF2.pdf',
    category: 'backend',
    issuer: 'DIO',
    date: '2024',
    featured: true
  },
  {
    id: 2,
    title: 'Sintaxe e Tipos de Dados em C#',
    description: 'Especialização em sintaxe e tipos de dados em C# com exemplos práticos.',
    filename: '4DQBEV3R.pdf',
    category: 'backend',
    issuer: 'DIO',
    date: '2024',
    featured: true
  },
  {
    id: 3,
    title: 'Sintaxe e Tipos de Dados em C#',
    description: 'JavaScript ES6+, async/await, promises, módulos e padrões avançados.',
    filename: '7773CD70.pdf',
    category: 'frontend',
    issuer: 'DIO',
    date: '2024',
    featured: false
  },
  {
    id: 4,
    title: 'Sintaxe e Tipos de Dados em C#',
    description: 'TypeScript para desenvolvimento de aplicações robustas e tipagem estática.',
    filename: 'EABD3805.pdf',
    category: 'frontend',
    issuer: 'DIO',
    date: '2024',
    featured: false
  },

  // Certificados Backend
  {
    id: 5,
    title: 'Sintaxe e Tipos de Dados em C#',
    description: 'Desenvolvimento com C#: sintaxe, tipos de dados e boas práticas.',
    filename: '8E04057A.pdf',
    category: 'backend',
    issuer: 'DIO',
    date: '2024',
    featured: false
  },

  // Certificados DevOps
  {
    id: 6,
    title: 'Sintaxe e Tipos de Dados em C#',
    description: 'DevOps, Docker, CI/CD, AWS e práticas de desenvolvimento ágil.',
    filename: 'OPCYCM0Y.pdf',
    category: 'devops',
    issuer: 'DIO',
    date: '2024',
    featured: true
  }
];

// Como adicionar um novo certificado:
// 1. Coloque o arquivo PDF na pasta public/certificates/
// 2. Adicione uma nova entrada nesta lista seguindo o formato:
/*
{
  id: 7, // próximo número disponível
  title: 'Nome do seu certificado',
  description: 'Descrição detalhada do certificado',
  filename: 'nome-do-arquivo.pdf', // nome exato do arquivo na pasta
  category: 'frontend', // ou 'backend' ou 'devops'
  issuer: 'Instituição que emitiu',
  date: '2024',
  featured: false // true para destacar, false para normal
}
*/ 
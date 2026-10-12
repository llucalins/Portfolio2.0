export const selectedWork = [
  {
    id: 'vmais-comunicacao',
    kind: 'primary',
    repository: 'llucalins/VmaisHomePage',
    repositoryUrl: 'https://github.com/llucalins/VmaisHomePage',
    title: 'Vmais Comunicação',
    category: {
      pt: 'Aplicação Full Stack',
      en: 'Full Stack application'
    },
    description: {
      pt: 'Aplicação Full Stack em monorepo que combina um website institucional com a base de um sistema administrativo de agenda, incluindo interface, API, autenticação, persistência e containers.',
      en: 'A Full Stack monorepo combining an institutional website with the foundation of an administrative scheduling system, including interface, API, authentication, persistence, and containers.'
    },
    scope: {
      pt: 'Website e base administrativa integrados por uma API REST, com autenticação e ambiente conteinerizado.',
      en: 'Website and administrative foundation connected through a REST API, with authentication and a containerized environment.'
    },
    stack: ['React', 'JavaScript', 'Vite', 'Styled Components', 'Java 21', 'Spring Boot', 'Spring Security', 'JPA', 'PostgreSQL', 'Flyway', 'Docker']
  },
  {
    id: 'info-dbeta',
    kind: 'primary',
    repository: 'llucalins/Info.DBeta',
    repositoryUrl: 'https://github.com/llucalins/Info.DBeta',
    demoUrl: 'https://info-d-beta.vercel.app',
    title: 'InfoD.beta',
    category: {
      pt: 'Educação digital',
      en: 'Digital education'
    },
    description: {
      pt: 'Aplicação educacional criada a partir de dificuldades observadas no ensino de informática, com atividades interativas para desenvolver digitação, coordenação com mouse e autonomia digital.',
      en: 'An educational application based on difficulties observed while teaching computer skills, using interactive activities to develop typing, mouse coordination, and digital autonomy.'
    },
    scope: {
      pt: 'Atividades interativas executadas no navegador, com versão pública disponível para demonstração.',
      en: 'Browser-based interactive activities with a public version available for demonstration.'
    },
    stack: ['React 18', 'JavaScript', 'Vite', 'HTML', 'CSS']
  },
  {
    id: 'sistema-agendamento',
    kind: 'primary',
    repository: 'llucalins/lava-auto-agendamento',
    repositoryUrl: 'https://github.com/llucalins/lava-auto-agendamento',
    title: {
      pt: 'Sistema de Agendamento',
      en: 'Scheduling System'
    },
    category: {
      pt: 'Produto em desenvolvimento',
      en: 'Product in development'
    },
    description: {
      pt: 'Sistema em desenvolvimento para agendamento de serviços automotivos, construído sobre uma base moderna em Next.js e PostgreSQL.',
      en: 'A system in development for scheduling automotive services, built on a modern Next.js and PostgreSQL foundation.'
    },
    scope: {
      pt: 'Em desenvolvimento. Catálogo, disponibilidade, reservas, administração e segurança permanecem módulos planejados na arquitetura e documentação.',
      en: 'In development. Catalog, availability, bookings, administration, and security remain modules planned in the architecture and documentation.'
    },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL (pg)', 'Zod', 'Vitest', 'Playwright']
  },
  {
    id: 'grow-ai',
    kind: 'primary',
    title: 'Grow AI',
    category: {
      pt: 'IA local e Full Stack',
      en: 'Local AI and Full Stack'
    },
    description: {
      pt: 'Aplicação Full Stack com integração de IA local, API Java/Spring Boot, autenticação e persistência em PostgreSQL.',
      en: 'A Full Stack application integrating local AI, a Java/Spring Boot API, authentication, and PostgreSQL persistence.'
    },
    scope: {
      pt: 'Integração entre interface web, API REST, autenticação, banco de dados e execução local de IA.',
      en: 'Integration across a web interface, REST API, authentication, database, and locally hosted AI.'
    },
    stack: ['React', 'Vite', 'Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'REST APIs', 'Local AI']
  },
  {
    id: 'painel-semanal',
    kind: 'complementary',
    title: {
      pt: 'Painel Semanal / Gestão de Trabalho',
      en: 'Weekly Panel / Work Management'
    },
    category: {
      pt: 'Projeto complementar',
      en: 'Complementary project'
    },
    description: {
      pt: 'Aplicação para organização semanal e gestão de tarefas, reunindo autenticação, persistência e automações.',
      en: 'An application for weekly organization and task management, bringing together authentication, persistence, and automations.'
    },
    scope: {
      pt: 'Projeto sem link público confirmado.',
      en: 'Project without a confirmed public link.'
    },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Auth', 'Automation']
  },
  {
    id: 'agente-ia-escolar',
    kind: 'complementary',
    title: {
      pt: 'Agente de IA Escolar Local',
      en: 'Local School AI Agent'
    },
    category: {
      pt: 'Projeto complementar',
      en: 'Complementary project'
    },
    description: {
      pt: 'Agente local voltado a documentos e rotinas administrativas escolares, conectando uma interface web a modelos executados com Ollama.',
      en: 'A local agent for school documents and administrative routines, connecting a web interface to models run with Ollama.'
    },
    scope: {
      pt: 'Projeto sem link público confirmado.',
      en: 'Project without a confirmed public link.'
    },
    stack: ['Java', 'Spring Boot', 'React', 'Ollama']
  }
];

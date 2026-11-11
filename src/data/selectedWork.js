export const selectedWork = [
  {
    id: 'vmais-comunicacao',
    resume: { contributionKey: 'resumePdf.vmaisContribution', technologies: ['React', 'Vite', 'JavaScript', 'Java 21', 'Spring Boot', 'PostgreSQL', 'Docker'] },
    kind: 'primary',
    engagement: 'freelance',
    title: 'Vmais Comunicação',
    description: {
      pt: 'Aplicação Full Stack com frontend React e backend Java/Spring Boot integrados por APIs REST. Implementação de autenticação, agenda e funcionalidades administrativas, com persistência relacional em PostgreSQL. Utilização de Vite no frontend e Docker para organizar o ambiente de execução.',
      en: 'Full Stack application with a React frontend and Java/Spring Boot backend connected through REST APIs. Implementation of authentication, scheduling, and administrative features with relational PostgreSQL persistence. Vite supports frontend development, while Docker organizes the application’s execution environment.'
    },
    stack: ['React', 'JavaScript', 'Vite', 'Styled Components', 'Java 21', 'Spring Boot', 'Spring Security', 'JPA', 'PostgreSQL', 'Flyway', 'Docker']
  },
  {
    id: 'memorial-monte-sinai',
    resume: { contributionKey: 'resumePdf.monteSinaiContribution', technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Amazon S3', 'Amazon CloudFront', 'AWS CLI'] },
    kind: 'primary',
    engagement: 'freelance',
    demoUrl: 'https://d24we0nttwbgey.cloudfront.net',
    title: 'Memorial Monte Sinai',
    description: {
      pt: 'Aplicação web institucional com Next.js, React e TypeScript, estruturada em componentes reutilizáveis, interfaces responsivas e animações com GSAP. Integração com WhatsApp e Google Maps, exportação estática e hospedagem em Amazon S3 com distribuição por CloudFront. Automação de deploy com AWS CLI.',
      en: 'Institutional web application built with Next.js, React, and TypeScript, using reusable components, responsive interfaces, and GSAP animations. Integration with WhatsApp and Google Maps, static export, and Amazon S3 hosting with CloudFront distribution. Deployment automation implemented with AWS CLI.'
    },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'GSAP', 'React Bits', 'Amazon S3', 'Amazon CloudFront', 'AWS IAM', 'AWS CLI']
  },
  {
    id: 'sistema-agendamento',
    resume: { contributionKey: 'resumePdf.schedulingContribution', technologies: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL (pg)'] },
    kind: 'primary',
    engagement: 'independent',
    repository: 'llucalins/lava-auto-agendamento',
    repositoryUrl: 'https://github.com/llucalins/lava-auto-agendamento',
    title: {
      pt: 'Lava Auto — Sistema de Agendamento',
      en: 'Lava Auto — Scheduling System'
    },
    description: {
      pt: 'Sistema Full Stack de agendamento de serviços automotivos, com catálogo, gerenciamento de disponibilidade, confirmação de reservas e acompanhamento por código. Implementação de regras de negócio, APIs, validação de entrada e persistência relacional, integrando funcionalidades administrativas com Next.js, TypeScript e PostgreSQL.',
      en: 'Full Stack application for automotive service scheduling, with a catalog, availability management, booking confirmation, and code-based tracking. Implementation of business rules, APIs, input validation, and relational persistence, integrating administrative features with Next.js, TypeScript, and PostgreSQL.'
    },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL (pg)', 'Zod', 'Vitest', 'Playwright']
  },
  {
    id: 'info-dbeta',
    resume: { contributionKey: 'resumePdf.infoDBetaContribution', technologies: ['React 18', 'JavaScript', 'Vite', 'HTML', 'CSS'] },
    kind: 'primary',
    engagement: 'independent',
    demoUrl: 'https://info-d-beta.vercel.app',
    title: 'InfoD.beta',
    description: {
      pt: 'Aplicação educacional interativa com React e JavaScript, com atividades de digitação, coordenação com mouse e desenvolvimento de habilidades digitais. Implementação de componentes reutilizáveis e gerenciamento de estados e eventos para conduzir as atividades e responder às interações no navegador.',
      en: 'Interactive educational application built with React and JavaScript, featuring typing exercises, mouse coordination activities, and digital skills practice. Reusable components and state and event management guide the activities and respond to user interactions directly in the browser.'
    },
    stack: ['React 18', 'JavaScript', 'Vite', 'HTML', 'CSS']
  },
  {
    id: 'grow-ai',
    kind: 'primary',
    engagement: 'unclassified',
    title: 'Grow AI',
    description: {
      pt: 'Aplicação Full Stack que integra uma interface React a um backend Java/Spring Boot por APIs REST. Implementação de autenticação e persistência relacional com PostgreSQL, com integração a IA executada localmente e ambiente de execução organizado com Docker.',
      en: 'Full Stack application connecting a React interface to a Java/Spring Boot backend through REST APIs. Implementation of authentication and relational PostgreSQL persistence, with integration of locally hosted AI and an application execution environment organized with Docker.'
    },
    stack: ['React', 'Vite', 'Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'REST APIs', 'Local AI']
  },
  {
    id: 'painel-semanal',
    kind: 'complementary',
    engagement: 'unclassified',
    title: {
      pt: 'Painel Semanal / Gestão de Trabalho',
      en: 'Weekly Panel / Work Management'
    },
    description: {
      pt: 'Aplicação web para organização semanal e gestão de tarefas, com autenticação, persistência relacional e automações. Implementação com Next.js e TypeScript, utilizando Prisma para acesso ao PostgreSQL e integração entre as funcionalidades da aplicação e os dados armazenados.',
      en: 'Web application for weekly planning and task management, combining authentication, relational persistence, and automation. Implementation with Next.js and TypeScript uses Prisma to access PostgreSQL and connects the application’s task management features to the stored data.'
    },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Auth', 'Automation']
  },
  {
    id: 'agente-ia-escolar',
    kind: 'complementary',
    engagement: 'unclassified',
    title: {
      pt: 'Agente de IA Escolar Local',
      en: 'Local School AI Agent'
    },
    description: {
      pt: 'Aplicação web voltada a documentos e rotinas administrativas escolares, conectando uma interface React a modelos de IA executados localmente com Ollama. Integração por backend Java/Spring Boot para comunicação entre a interface e o serviço de inferência local.',
      en: 'Web application for school documents and administrative routines, connecting a React interface to AI models running locally with Ollama. A Java/Spring Boot backend provides integration between the web interface and the local model inference service.'
    },
    stack: ['Java', 'Spring Boot', 'React', 'Ollama']
  },
  {
    id: 'mr-roobot-ai-office',
    resume: { contributionKey: 'resumePdf.mrRoobotContribution', technologies: ['Hermes Agent', 'DeskRPG'] },
    kind: 'complementary',
    engagement: 'unclassified',
    title: 'Mr Roobot AI Office',
    description: {
      pt: 'Configuração de agentes de IA especializados em arquitetura, backend, frontend e QA com Hermes Agent, com definição de papéis para organizar atividades de desenvolvimento de software. Exploração da integração com DeskRPG, utilizando ambas as ferramentas como componentes de terceiros.',
      en: 'Configuration of AI agents specialized in architecture, backend, frontend, and QA using Hermes Agent, with defined roles to organize software development activities. Exploration of integration with DeskRPG, using both products as third-party tools within the agent environment.'
    },
    stack: ['Hermes Agent', 'DeskRPG']
  }
];

# Revisão editorial dos projetos

## Contrato

Esta etapa substitui a apresentação anterior de contexto/escopo/estado por nome, uma descrição técnica curta, tecnologias e links disponíveis. As classificações e seções permanecem as aprovadas. As oito descrições PT/EN devem explicar o que foi desenvolvido e como, sem acompanhar andamento, negociação, homologação, ambientes de demonstração ou pendências. O PDF mantém cinco trabalhos selecionados com resumos menores.

`description` passa a ser o único texto de apresentação web. `scope` será removido depois da migração dos dois componentes e do fallback do PDF. Os rótulos de categoria, redundantes com as seções e a descrição, também saem dos cards e do cadastro quando não tiverem consumidores. As classificações continuam em `engagement`, usando `groupWork` sem mudanças.

A integração de DeskRPG será descrita como exploração, preservando a diferença entre configuração de assistentes e uma integração concluída. Hermes Agent e DeskRPG permanecem identificados como ferramentas de terceiros. Não se acrescentam funcionalidades não documentadas para atingir a faixa preferencial de palavras.

## Plano e evidências iniciais

1. Inspecionar dados, consumidores e fontes disponíveis.
2. Atualizar os verificadores para a nova apresentação, preservando os testes de classificação, experiências e layout.
3. Revisar os oito textos e cinco resumos PT/EN; migrar os consumidores e remover campos/rótulos sem uso.
4. Gerar PDFs, executar verificadores/build, inspecionar imagens e comparar o conteúdo profissional preservado.

Vmais: autenticação em `backend/src/main/java/br/com/vmais/agenda/auth/AuthController.java`, restrições em `config/SecurityConfig.java`, operações de agenda em `event/AgendaItemController.java`, migração relacional `V1__create_admin_agenda_schema.sql`, cliente frontend `frontend/src/services/api.js` e arquivos Docker em `infra/` no repositório local `VmaisHomePage`. Leitura apenas; nenhum arquivo daquele repositório alterado.

Lava Auto: arquivos locais de validação de entrada e listagem administrativa, migrações e testes de agendamento sustentam regras de negócio, disponibilidade, persistência e recursos administrativos. Memorial: configuração de exportação estática, componentes e dependências locais sustentam o frontend e as animações; o script existente sustenta a publicação via AWS CLI. Os demais textos ficam limitados aos fatos já documentados e fornecidos pelo usuário.

Os dois links de demonstração retornaram HTTP 200 em 11/11/2026. A ferramenta web não conseguiu abri-los; a verificação HTTP foi concluída com `curl` fora do sandbox. Nenhum novo link foi criado.

## Resultado da implementação e revisão

- Oito projetos revisados em PT/EN, com descrições entre 35 e 41 palavras, sem ampliar as funcionalidades documentadas.
- Cards de /work e /resume no padrão nome → descrição técnica → tecnologias → links disponíveis. Removidas as seções de contexto/escopo/estado e os rótulos de categoria redundantes com os agrupamentos existentes.
- Removidos os campos scope/category dos projetos, os estilos exclusivos desses rótulos e as traduções de escopo/contexto sem consumidores. O fallback do gerador PDF agora usa description; os cinco projetos selecionados usam resumos próprios mais curtos.
- Classificações, IDs, nomes, ordem, stacks, links e seleção do PDF preservados. Nenhum projeto duplicado ou removido.
- Os textos da introdução da página e de Outros projetos também deixam de prometer informações sobre andamento.
- Experiências profissionais, competências, contatos, formação, certificados e título preservados. Comparação estrutural com o estado inicial concluída por /tmp/portfolio-project-editorial/check-preservation.mjs. professionalProfile.js e FreelanceExperience.jsx mantêm o mesmo SHA-256.
- Revisão de correção factual, equivalência PT/EN, clareza, reutilização da estrutura, escape de HTML, proteção de links e custo de renderização: sem achados impeditivos. Sem novas dependências ou mudanças de infraestrutura.

## Verificações

- npm run build: passou.
- npm run resume:pdf: passou.
- node scripts/verify-experience.mjs: passou em desktop/mobile PT/EN, com verificações adicionais em 320, 390, 768, 1024 e 1440 px. Estrutura editorial, textos, links, classificações, experiências, competências e ausência de overflow verificados.
- node scripts/verify-resumes.mjs: passou em PT/EN e desktop/mobile. Projetos sem texto de acompanhamento, resumos menores que a descrição web, ausência de duplicação, links, fontes, margens, paginação e fluxos de download/visualização preservados.
- git diff --check: passou.
- Regressão anterior à implementação: a validação falhou ao detectar scope ainda presente. Após a migração, passou. O teste de texto foi ajustado para não confundir “especializados em desenvolvimento de software” com um estado de andamento; o texto factual foi preservado.
- Links públicos preservados: Memorial Monte Sinai, InfoD.beta e repositório do Lava Auto retornaram HTTP 200.
- PDFs PT/EN: duas páginas A4 por idioma, margens de 20 mm e fontes a partir de 10 pt. As quatro páginas foram inspecionadas visualmente.
- Capturas dos três grupos de projetos em /work e /resume, nos dois idiomas e em 1440/390 px: 24 imagens em /tmp/portfolio-project-editorial/. Os verificadores também mantêm suas capturas e checagens em larguras adicionais.

## Arquivos desta etapa

- src/data/selectedWork.js
- src/data/resumeDocument.js
- src/components/SelectedWork.jsx
- src/components/SelectedWork.css
- src/pages/ResumePage.jsx
- src/pages/ResumePage.css
- src/translations/pt.js
- src/translations/en.js
- scripts/verify-experience.mjs
- scripts/verify-resumes.mjs
- public/resumes/lucas-virginio-pt-br.pdf
- public/resumes/lucas-virginio-en.pdf
- docs/project-editorial-review.md

## Limites e pendências

Nenhum bloqueio de implementação identificado; homologação do usuário pendente. A validação móvel deste portfólio foi emulada em Chromium/Playwright. A confirmação HTTP dos links registra sua disponibilidade no momento da verificação, sem auditoria das aplicações externas. Para projetos sem fonte local identificada, a redação se limita às informações já documentadas e fornecidas pelo usuário. Não se afirma que a integração com DeskRPG foi concluída.

Permanece o aviso preexistente MODULE_TYPELESS_PACKAGE_JSON nos scripts Node. O navegador e as verificações HTTP exigiram execução fora do sandbox em chamadas bloqueadas pelas restrições locais. Nenhuma dependência foi instalada. Alterações locais anteriores e references/ preservadas, sem commit, push, merge ou deploy.

## Descrições finais — PT-BR

### Vmais Comunicação

Aplicação Full Stack com frontend React e backend Java/Spring Boot integrados por APIs REST. Implementação de autenticação, agenda e funcionalidades administrativas, com persistência relacional em PostgreSQL. Utilização de Vite no frontend e Docker para organizar o ambiente de execução.

**Tecnologias / Technologies:** React · JavaScript · Vite · Styled Components · Java 21 · Spring Boot · Spring Security · JPA · PostgreSQL · Flyway · Docker

**Resumo PDF / PDF summary:** Integração de frontend React e API REST Java/Spring Boot, com autenticação, agenda, funcionalidades administrativas, persistência PostgreSQL e ambiente Docker.

**Stack PDF:** React · Vite · JavaScript · Java 21 · Spring Boot · PostgreSQL · Docker

### Memorial Monte Sinai

Aplicação web institucional com Next.js, React e TypeScript, estruturada em componentes reutilizáveis, interfaces responsivas e animações com GSAP. Integração com WhatsApp e Google Maps, exportação estática e hospedagem em Amazon S3 com distribuição por CloudFront. Automação de deploy com AWS CLI.

**Tecnologias / Technologies:** Next.js 16 · React 19 · TypeScript · Tailwind CSS · GSAP · React Bits · Amazon S3 · Amazon CloudFront · AWS IAM · AWS CLI

**Demonstração / Demo:** https://d24we0nttwbgey.cloudfront.net

**Resumo PDF / PDF summary:** Frontend responsivo com componentes e animações, integração com WhatsApp e Google Maps, exportação estática e hospedagem S3/CloudFront. Automação de deploy com AWS CLI.

**Stack PDF:** Next.js 16 · React 19 · TypeScript · Tailwind CSS · Amazon S3 · Amazon CloudFront · AWS CLI

### Lava Auto — Sistema de Agendamento

Sistema Full Stack de agendamento de serviços automotivos, com catálogo, gerenciamento de disponibilidade, confirmação de reservas e acompanhamento por código. Implementação de regras de negócio, APIs, validação de entrada e persistência relacional, integrando funcionalidades administrativas com Next.js, TypeScript e PostgreSQL.

**Tecnologias / Technologies:** Next.js 16 · React 19 · TypeScript · PostgreSQL (pg) · Zod · Vitest · Playwright

**Repositório / Repository:** https://github.com/llucalins/lava-auto-agendamento

**Resumo PDF / PDF summary:** Agendamento com catálogo, disponibilidade, confirmação e acompanhamento de reservas por código. Regras de negócio, APIs, validação de entrada, funcionalidades administrativas e persistência PostgreSQL.

**Stack PDF:** Next.js 16 · React 19 · TypeScript · PostgreSQL (pg)

### InfoD.beta

Aplicação educacional interativa com React e JavaScript, com atividades de digitação, coordenação com mouse e desenvolvimento de habilidades digitais. Implementação de componentes reutilizáveis e gerenciamento de estados e eventos para conduzir as atividades e responder às interações no navegador.

**Tecnologias / Technologies:** React 18 · JavaScript · Vite · HTML · CSS

**Demonstração / Demo:** https://info-d-beta.vercel.app

**Resumo PDF / PDF summary:** Atividades interativas de digitação e coordenação com mouse, com componentes React e gerenciamento de estados e eventos para desenvolver habilidades digitais.

**Stack PDF:** React 18 · JavaScript · Vite · HTML · CSS

### Grow AI

Aplicação Full Stack que integra uma interface React a um backend Java/Spring Boot por APIs REST. Implementação de autenticação e persistência relacional com PostgreSQL, com integração a IA executada localmente e ambiente de execução organizado com Docker.

**Tecnologias / Technologies:** React · Vite · Java 21 · Spring Boot · PostgreSQL · Docker · REST APIs · Local AI

### Painel Semanal / Gestão de Trabalho

Aplicação web para organização semanal e gestão de tarefas, com autenticação, persistência relacional e automações. Implementação com Next.js e TypeScript, utilizando Prisma para acesso ao PostgreSQL e integração entre as funcionalidades da aplicação e os dados armazenados.

**Tecnologias / Technologies:** Next.js · TypeScript · PostgreSQL · Prisma · Auth · Automation

### Agente de IA Escolar Local

Aplicação web voltada a documentos e rotinas administrativas escolares, conectando uma interface React a modelos de IA executados localmente com Ollama. Integração por backend Java/Spring Boot para comunicação entre a interface e o serviço de inferência local.

**Tecnologias / Technologies:** Java · Spring Boot · React · Ollama

### Mr Roobot AI Office

Configuração de agentes de IA especializados em arquitetura, backend, frontend e QA com Hermes Agent, com definição de papéis para organizar atividades de desenvolvimento de software. Exploração da integração com DeskRPG, utilizando ambas as ferramentas como componentes de terceiros.

**Tecnologias / Technologies:** Hermes Agent · DeskRPG

**Resumo PDF / PDF summary:** Configuração de agentes especializados em desenvolvimento de software com Hermes Agent e exploração da integração com DeskRPG. Ambas são ferramentas de terceiros.

**Stack PDF:** Hermes Agent · DeskRPG

## Descrições finais — EN

### Vmais Comunicação

Full Stack application with a React frontend and Java/Spring Boot backend connected through REST APIs. Implementation of authentication, scheduling, and administrative features with relational PostgreSQL persistence. Vite supports frontend development, while Docker organizes the application’s execution environment.

**Tecnologias / Technologies:** React · JavaScript · Vite · Styled Components · Java 21 · Spring Boot · Spring Security · JPA · PostgreSQL · Flyway · Docker

**Resumo PDF / PDF summary:** Integration of a React frontend and Java/Spring Boot REST API, with authentication, scheduling, administrative features, PostgreSQL persistence, and Docker.

**Stack PDF:** React · Vite · JavaScript · Java 21 · Spring Boot · PostgreSQL · Docker

### Memorial Monte Sinai

Institutional web application built with Next.js, React, and TypeScript, using reusable components, responsive interfaces, and GSAP animations. Integration with WhatsApp and Google Maps, static export, and Amazon S3 hosting with CloudFront distribution. Deployment automation implemented with AWS CLI.

**Tecnologias / Technologies:** Next.js 16 · React 19 · TypeScript · Tailwind CSS · GSAP · React Bits · Amazon S3 · Amazon CloudFront · AWS IAM · AWS CLI

**Demonstração / Demo:** https://d24we0nttwbgey.cloudfront.net

**Resumo PDF / PDF summary:** Responsive frontend with components and animations, WhatsApp and Google Maps integration, static export, and S3/CloudFront hosting. Deployment automation with AWS CLI.

**Stack PDF:** Next.js 16 · React 19 · TypeScript · Tailwind CSS · Amazon S3 · Amazon CloudFront · AWS CLI

### Lava Auto — Scheduling System

Full Stack application for automotive service scheduling, with a catalog, availability management, booking confirmation, and code-based tracking. Implementation of business rules, APIs, input validation, and relational persistence, integrating administrative features with Next.js, TypeScript, and PostgreSQL.

**Tecnologias / Technologies:** Next.js 16 · React 19 · TypeScript · PostgreSQL (pg) · Zod · Vitest · Playwright

**Repositório / Repository:** https://github.com/llucalins/lava-auto-agendamento

**Resumo PDF / PDF summary:** Scheduling with a catalog, availability, booking confirmation, and code-based tracking. Business rules, APIs, input validation, administrative features, and PostgreSQL persistence.

**Stack PDF:** Next.js 16 · React 19 · TypeScript · PostgreSQL (pg)

### InfoD.beta

Interactive educational application built with React and JavaScript, featuring typing exercises, mouse coordination activities, and digital skills practice. Reusable components and state and event management guide the activities and respond to user interactions directly in the browser.

**Tecnologias / Technologies:** React 18 · JavaScript · Vite · HTML · CSS

**Demonstração / Demo:** https://info-d-beta.vercel.app

**Resumo PDF / PDF summary:** Interactive typing and mouse coordination activities, using React components and state and event management to develop digital skills.

**Stack PDF:** React 18 · JavaScript · Vite · HTML · CSS

### Grow AI

Full Stack application connecting a React interface to a Java/Spring Boot backend through REST APIs. Implementation of authentication and relational PostgreSQL persistence, with integration of locally hosted AI and an application execution environment organized with Docker.

**Tecnologias / Technologies:** React · Vite · Java 21 · Spring Boot · PostgreSQL · Docker · REST APIs · Local AI

### Weekly Panel / Work Management

Web application for weekly planning and task management, combining authentication, relational persistence, and automation. Implementation with Next.js and TypeScript uses Prisma to access PostgreSQL and connects the application’s task management features to the stored data.

**Tecnologias / Technologies:** Next.js · TypeScript · PostgreSQL · Prisma · Auth · Automation

### Local School AI Agent

Web application for school documents and administrative routines, connecting a React interface to AI models running locally with Ollama. A Java/Spring Boot backend provides integration between the web interface and the local model inference service.

**Tecnologias / Technologies:** Java · Spring Boot · React · Ollama

### Mr Roobot AI Office

Configuration of AI agents specialized in architecture, backend, frontend, and QA using Hermes Agent, with defined roles to organize software development activities. Exploration of integration with DeskRPG, using both products as third-party tools within the agent environment.

**Tecnologias / Technologies:** Hermes Agent · DeskRPG

**Resumo PDF / PDF summary:** Configuration of specialized software development agents with Hermes Agent and exploration of integration with DeskRPG. Both are third-party tools.

**Stack PDF:** Hermes Agent · DeskRPG

# Revisão profissional — relatório para homologação

Branch: `feat/monte-sinai-portfolio`. Alterações locais, sem commit, push, merge ou deploy.

## Organização anterior e final

Antes: sete grupos de competências no cadastro web e quatro definições separadas para o PDF; atuação freelancer descrita apenas pelo Memorial; Vmais, InfoD.beta e Lava Auto sem classificação; Mr Roobot disponível apenas no PDF. Trabalhos para organizações também entravam nos projetos selecionados do PDF.

Agora: quatro categorias compartilhadas entre currículo web e PDFs. Na web: Experiência profissional → Atuação independente (Trabalhos para organizações / Projetos autorais) → Outros projetos. No PDF: Competências técnicas → Experiência profissional → Atuação independente (Vmais/Memorial) → Projetos selecionados (Lava Auto/InfoD.beta/Mr Roobot) → Educação → Cursos e certificados. A home mantém sua stack resumida e seu título.

## Classificação final

| Projeto | Contrato de dados | Apresentação |
|---|---|---|
| Vmais Comunicação | freelance | Trabalho para organização; base de website e funcionalidades administrativas implementada, sem inferir conclusão de todo o produto ou implantação comercial |
| Memorial Monte Sinai | freelance | Projeto comercial independente em apresentação ao cliente (2026), com demonstração publicada |
| Lava Auto | independent | Produto Full Stack autoral em desenvolvimento, demonstração local e dados sintéticos |
| InfoD.beta | independent | Aplicação educacional autoral com demonstração pública |
| Grow AI | unclassified | Projeto complementar; classificação comercial não inferida |
| Painel Semanal | unclassified | Projeto complementar; sem link público confirmado |
| Agente de IA Escolar Local | unclassified | Projeto complementar; sem link público confirmado |
| Mr Roobot AI Office | unclassified | Experimento em desenvolvimento com ferramentas de terceiros |

O contrato `engagement` e o agrupador `groupWork` existentes foram reutilizados. O cadastro exclusivo do Mr Roobot no currículo foi incorporado a `selectedWork`, evitando duas fontes para o mesmo projeto. Os três vínculos, cargos, datas, contatos e título foram preservados. Não foram acrescentados contratos, datas para Vmais, domínios oficiais, bancos, IA ou serviços AWS ao Memorial.

## Decisões editoriais e visuais

- Responsabilidades profissionais em tópicos objetivos, sem repetir um resumo equivalente imediatamente antes da lista. Instrutor resumido em dois tópicos com planejamento, formação, mais de 100 alunos e acompanhamento da certificação. Administrativo com menor extensão visual.
- Introdução única de atuação independente, seguida de dois subgrupos. Cada projeto aparece uma única vez por página; oito projetos no catálogo web e cinco selecionados no PDF.
- PDF com rótulos de competências alinhados em uma coluna e tecnologias na outra; texto alinhado à esquerda, sem espaçamento artificial de justificação. Cores, fontes, navegação e animações do website preservadas.
- A seleção do PDF prioriza aplicação prática para organizações, produto Full Stack, aplicação educacional originada de necessidade real e experimento com agentes. As descrições compactas do currículo são distintas do contexto/solução/escopo do portfólio.

## Verificações e evidências

- `npm run build`: passou.
- `npm run resume:pdf`: passou; PDFs PT/EN regenerados.
- `node scripts/verify-experience.mjs`: passou em PT/EN e desktop/mobile; classificação explícita, oito projetos sem perda/duplicação, estado comercial correto, links preservados, competências compartilhadas, título, datas, SEO e GitHub sucesso/falha.
- Larguras adicionais de 320, 768 e 1024 px em PT/EN: sem overflow de conteúdo em `/work` e `/resume`; desktop principal em 1440 px e mobile com emulação iPhone 13.
- `node scripts/verify-resumes.mjs`: passou em PT/EN e desktop/mobile. Cinco projetos selecionados sem duplicação, organizações separadas dos vínculos, downloads idênticos aos arquivos locais, links e fluxo legado de PDF preservados.
- Ambos os PDFs: duas páginas A4, margens de 20 mm, fontes Carlito incorporadas, texto selecionável e marcado, tamanho mínimo de 10 pt. Cada registro de projeto e vínculo permanece inteiro na página. Atuação independente continua na segunda página antes dos projetos selecionados.
- Inspeção visual das quatro páginas de PDF e das seções alteradas do website; evidências em `/tmp/portfolio-organization-review/`.
- `git diff --check`: passou.
- Regressão antes da implementação: o verificador atualizado falhou porque Vmais ainda não estava no grupo freelancer. Após os ajustes, os verificadores passaram. A validação de links, categorias e datas usa também expectativas explícitas, além dos dados compartilhados.

## Revisão de qualidade

Revisão do diff concluída quanto à correção factual, clareza, reaproveitamento dos contratos existentes, links externos com proteção de nova aba, escape do HTML do currículo e ausência de dependências ou processamento adicional significativo. Sem achados impeditivos. Os testes verificam classificação, conteúdo, links e layout; nenhuma validação foi desativada para obter aprovação.

## Limitações e pendências

Nenhum bloqueio de implementação identificado. A homologação final do usuário permanece pendente. Testes móveis do portfólio feitos por emulação, sem novo teste em dispositivo físico; a homologação física descrita no Memorial é o fato informado pelo usuário sobre aquele projeto. Os links externos foram conferidos quanto a destino e presença, sem auditoria de disponibilidade ou conclusão comercial dos projetos externos. GitHub foi simulado para testes determinísticos de sucesso/falha.

Os scripts Node ainda emitem o aviso preexistente `MODULE_TYPELESS_PACKAGE_JSON`. Não há comandos npm de lint ou tipagem neste repositório. O Chromium precisou de execução fora do sandbox em chamadas bloqueadas pela restrição de inicialização. Nenhuma dependência ou configuração de infraestrutura foi alterada. A pasta `references/` permaneceu intacta e não rastreada.

## Arquivos alterados ou adicionados nesta entrega consolidada

- Dados: `src/data/professionalProfile.js`, `src/data/selectedWork.js`, `src/data/resumeDocument.js`.
- Interface: `src/components/FreelanceExperience.jsx`, `src/components/SelectedWork.jsx`, `src/components/SelectedWork.css`, `src/pages/ResumePage.jsx`, `src/pages/ResumePage.css`.
- Traduções: `src/translations/pt.js`, `src/translations/en.js`.
- Verificação: `scripts/verify-experience.mjs`, `scripts/verify-resumes.mjs`.
- PDFs: `public/resumes/lucas-virginio-pt-br.pdf`, `public/resumes/lucas-virginio-en.pdf`.
- Documentação: `docs/resume-editorial.md`, `docs/professional-organization-spec.md`, `docs/professional-organization-review.md`, `tasks/plan.md`, `tasks/todo.md`.

Os arquivos `workExperience.js` e `generate-resumes.mjs` foram inspecionados e reutilizados sem mudança. Os ajustes anteriores válidos do Memorial e a documentação anterior foram preservados e refinados conforme a nova classificação solicitada.

## Textos finais — PT-BR

**Desenvolvedor Full Stack | TypeScript e Integração de IA**

### Competências

- **Front-end e Mobile:** TypeScript · React · Next.js · JavaScript · React Native · HTML · CSS
- **Back-end e Integrações:** Node.js · Java · Spring Boot · Python · APIs REST · APIs da OpenAI
- **Banco de Dados e Cloud:** PostgreSQL · SQL · Amazon S3 · Amazon CloudFront · AWS IAM
- **Engenharia e Ferramentas:** Git · GitHub · Docker · AWS CLI · Arquitetura de aplicações web · Testes automatizados · Debugging · Automação de deploy · Documentação técnica

### Experiência profissional

**Anderson Rios Consultoria · Remoto — Desenvolvedor Full Stack | mai/2025 — dez/2025**

- Desenvolvimento web com React, Next.js, TypeScript, JavaScript, Node.js e Python; implementação e consumo de APIs REST.
- Participação em funcionalidades de medição de ambientes e projeção virtual de móveis com IA e na integração com APIs da OpenAI.
- Desenvolvimento mobile com React Native para Android e iOS: telas, componentes e funcionalidades.
- Participação na definição de arquitetura; Git, Docker, troubleshooting, correção de bugs e documentação.

**Prefeitura de Esperança — Instrutor de Informática | mar/2023 — ago/2025**

- Planejamento e condução de atividades de formação em informática, com foco em competências digitais e autonomia dos participantes.
- Capacitação e acompanhamento de mais de 100 alunos em ferramentas computacionais e produtividade digital, contribuindo para a conclusão e certificação da formação.

**Prefeitura de Esperança — Profissional Administrativo | jan/2021 — mar/2023**

Atuação com documentação, planilhas, registros e apoio a processos administrativos.

### Atuação independente — introdução web

Desenvolvimento de aplicações web para organizações e de produtos por iniciativa própria, com implementação de interfaces, APIs, regras de negócio, persistência e publicação conforme o escopo de cada projeto.

### Atuação independente — currículo

Desenvolvimento de software para organizações e de produtos autorais. Trabalhos para organizações:

**Vmais Comunicação**

Desenvolvimento freelancer Full Stack para organização: interfaces React integradas à API REST Java/Spring Boot, funcionalidades administrativas, persistência PostgreSQL e ambiente Docker. Base de website e funcionalidades administrativas implementada.

React · Vite · JavaScript · Java 21 · Spring Boot · PostgreSQL · Docker

**Memorial Monte Sinai**

Projeto comercial independente em fase de apresentação ao cliente (2026). Frontend Next.js/React/TypeScript com componentes responsivos e animações; WhatsApp e Google Maps. Exportação estática, S3 privado, CloudFront, IAM e publicação via AWS CLI com sincronização e invalidação de cache. Testes automatizados e validação mobile em dispositivo real. Demonstração publicada.

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Amazon S3 · Amazon CloudFront · AWS CLI

### Projetos selecionados — currículo

**Lava Auto — Sistema de Agendamento**

Produto Full Stack autoral: regras de negócio, catálogo, disponibilidade, confirmação e acompanhamento de reservas por código; funcionalidades administrativas, persistência PostgreSQL e testes automatizados. Em desenvolvimento, com demonstração local e dados sintéticos.

Next.js 16 · React 19 · TypeScript · PostgreSQL (pg)

**InfoD.beta**

Projeto autoral originado de dificuldades observadas no ensino de informática. Atividades interativas de digitação e coordenação com mouse para desenvolver autonomia digital. Demonstração pública disponível.

React 18 · JavaScript · Vite · HTML · CSS

**Mr Roobot AI Office**

Projeto experimental em desenvolvimento: configuração de agentes de arquitetura, backend, frontend e QA com Hermes Agent e exploração da integração com DeskRPG. Ambas são ferramentas de terceiros.

Hermes Agent · DeskRPG

### Contexto e escopo — portfólio

**Vmais Comunicação — Desenvolvimento freelancer para organização**

Aplicação Full Stack em monorepo que combina um website institucional com a base de um sistema administrativo de agenda, incluindo interface, API, autenticação, persistência e containers.

Base implementada para website e funcionalidades administrativas, com integração frontend/backend por API REST, autenticação, persistência relacional em PostgreSQL e ambiente Docker.

React · JavaScript · Vite · Styled Components · Java 21 · Spring Boot · Spring Security · JPA · PostgreSQL · Flyway · Docker


**Memorial Monte Sinai — Projeto comercial independente · 2026**

Aplicação institucional e comercial para apresentar o Memorial Monte Sinai e facilitar o contato via WhatsApp e a localização pelo Google Maps. Frontend com Next.js 16, React 19 e TypeScript, organizado em componentes interativos e layouts responsivos, com Tailwind CSS, GSAP e React Bits.

Projeto comercial desenvolvido de forma independente, em fase de apresentação ao cliente. Demonstração publicada com exportação estática do Next.js, bucket privado Amazon S3 e distribuição via CloudFront com CDN, cache e HTTPS. Permissões com AWS IAM e publicação automatizada com AWS CLI: build, sincronização de arquivos e invalidação de cache. Testes automatizados, tipagem, lint e build executados; responsividade homologada em dispositivo móvel real.

Next.js 16 · React 19 · TypeScript · Tailwind CSS · GSAP · React Bits · Amazon S3 · Amazon CloudFront · AWS IAM · AWS CLI

Demonstração / Demo: https://d24we0nttwbgey.cloudfront.net

**Lava Auto — Sistema de Agendamento — Produto Full Stack autoral · Em desenvolvimento**

Aplicação Full Stack em TypeScript, Next.js e PostgreSQL para agendamento de serviços automotivos, com catálogo, disponibilidade, confirmação de reservas e acompanhamento por código.

Em desenvolvimento, com demonstração local e dados sintéticos. Estruturação da aplicação, regras de negócio e testes automatizados. Painel com agenda, reservas e status; gestão de estabelecimento, serviços, calendário e promoções; controle de acesso e persistência. Sem homologação em produção ou processamento de pagamentos.

Next.js 16 · React 19 · TypeScript · PostgreSQL (pg) · Zod · Vitest · Playwright

Repositório / Repository: https://github.com/llucalins/lava-auto-agendamento

**InfoD.beta — Projeto autoral · Educação digital**

Aplicação educacional criada a partir de dificuldades observadas no ensino de informática, com atividades interativas para desenvolver digitação, coordenação com mouse e autonomia digital.

Atividades interativas executadas no navegador, com versão pública disponível para demonstração.

React 18 · JavaScript · Vite · HTML · CSS

Demonstração / Demo: https://info-d-beta.vercel.app

**Grow AI — IA local e Full Stack**

Aplicação Full Stack com integração de IA local, API Java/Spring Boot, autenticação e persistência em PostgreSQL.

Integração entre interface web, API REST, autenticação, banco de dados e execução local de IA.

React · Vite · Java 21 · Spring Boot · PostgreSQL · Docker · REST APIs · Local AI


**Painel Semanal / Gestão de Trabalho — Projeto complementar**

Aplicação para organização semanal e gestão de tarefas, reunindo autenticação, persistência e automações.

Projeto sem link público confirmado.

Next.js · TypeScript · PostgreSQL · Prisma · Auth · Automation


**Agente de IA Escolar Local — Projeto complementar**

Agente local voltado a documentos e rotinas administrativas escolares, conectando uma interface web a modelos executados com Ollama.

Projeto sem link público confirmado.

Java · Spring Boot · React · Ollama


**Mr Roobot AI Office — Projeto experimental em desenvolvimento**

Configuração de agentes especializados em arquitetura, backend, frontend e QA com Hermes Agent e exploração da integração com DeskRPG.

Experimento em desenvolvimento com ferramentas de terceiros: Hermes Agent e DeskRPG. Sem repositório público confirmado.

Hermes Agent · DeskRPG


## Textos finais — EN

**Full Stack Developer | TypeScript & AI Integration**

### Competências

- **Front-end and Mobile:** TypeScript · React · Next.js · JavaScript · React Native · HTML · CSS
- **Back-end and Integrations:** Node.js · Java · Spring Boot · Python · REST APIs · OpenAI APIs
- **Databases and Cloud:** PostgreSQL · SQL · Amazon S3 · Amazon CloudFront · AWS IAM
- **Engineering and Tools:** Git · GitHub · Docker · AWS CLI · Web application architecture · Automated testing · Debugging · Deployment automation · Technical documentation

### Experiência profissional

**Anderson Rios Consultoria · Remote — Full Stack Developer | May 2025 — Dec 2025**

- Web development with React, Next.js, TypeScript, JavaScript, Node.js, and Python; implementation and consumption of REST APIs.
- Participation in room measurement and AI-powered virtual furniture projection features and OpenAI API integration.
- Mobile development with React Native for Android and iOS: screens, components, and features.
- Participation in architecture definition; Git, Docker, troubleshooting, bug fixes, and documentation.

**City of Esperança — Computer Skills Instructor | Mar 2023 — Aug 2025**

- Planned and delivered computer skills training focused on digital competencies and participant autonomy.
- Trained and supported more than 100 students in computing tools and digital productivity, helping them complete their training and earn certification.

**City of Esperança — Administrative Professional | Jan 2021 — Mar 2023**

Work involving documentation, spreadsheets, records, and administrative process support.

### Atuação independente — introdução web

Web applications for organizations and independently initiated products, covering interfaces, APIs, business rules, persistence, and publishing according to each project’s scope.

### Atuação independente — currículo

Software development for organizations and independently initiated products. Work for organizations:

**Vmais Comunicação**

Freelance Full Stack development for an organization: React interfaces integrated with a Java/Spring Boot REST API, administrative features, PostgreSQL persistence, and Docker. Implemented website and administrative foundation.

React · Vite · JavaScript · Java 21 · Spring Boot · PostgreSQL · Docker

**Memorial Monte Sinai**

Independent commercial project being presented to the client (2026). Next.js/React/TypeScript frontend with responsive components and animations; WhatsApp and Google Maps links. Static export, private S3, CloudFront, IAM, and AWS CLI publishing with synchronization and cache invalidation. Automated tests and validation on a real mobile device. Published demonstration.

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Amazon S3 · Amazon CloudFront · AWS CLI

### Projetos selecionados — currículo

**Lava Auto — Scheduling System**

Independent Full Stack product: business rules, catalog, availability, booking confirmation and code-based tracking; administrative features, PostgreSQL persistence, and automated tests. In development, with a local demonstration and synthetic data.

Next.js 16 · React 19 · TypeScript · PostgreSQL (pg)

**InfoD.beta**

Independent project based on difficulties observed while teaching computer skills. Interactive typing and mouse coordination activities to develop digital autonomy. Public demonstration available.

React 18 · JavaScript · Vite · HTML · CSS

**Mr Roobot AI Office**

Experimental project in development: configuration of architecture, backend, frontend, and QA agents with Hermes Agent, and exploration of integration with DeskRPG. Both are third-party tools.

Hermes Agent · DeskRPG

### Contexto e escopo — portfólio

**Vmais Comunicação — Freelance development for an organization**

A Full Stack monorepo combining an institutional website with the foundation of an administrative scheduling system, including interface, API, authentication, persistence, and containers.

Implemented foundation for a website and administrative features, with frontend/backend REST API integration, authentication, relational PostgreSQL persistence, and Docker.

React · JavaScript · Vite · Styled Components · Java 21 · Spring Boot · Spring Security · JPA · PostgreSQL · Flyway · Docker


**Memorial Monte Sinai — Independent commercial project · 2026**

An institutional and commercial application presenting Memorial Monte Sinai, with WhatsApp contact and Google Maps location links. The frontend uses Next.js 16, React 19, and TypeScript, with interactive components and responsive layouts built with Tailwind CSS, GSAP, and React Bits.

An independently developed commercial project being presented to the client. Published demonstration using Next.js static export, a private Amazon S3 bucket, and CloudFront delivery with CDN, caching, and HTTPS. AWS IAM permissions and AWS CLI publishing automation cover build, file synchronization, and cache invalidation. Automated tests, type checks, lint, and build completed; responsiveness validated on a real mobile device.

Next.js 16 · React 19 · TypeScript · Tailwind CSS · GSAP · React Bits · Amazon S3 · Amazon CloudFront · AWS IAM · AWS CLI

Demonstração / Demo: https://d24we0nttwbgey.cloudfront.net

**Lava Auto — Scheduling System — Independent Full Stack product · In development**

A Full Stack application with TypeScript, Next.js, and PostgreSQL for automotive service scheduling, including a catalog, availability, booking confirmation, and code-based tracking.

In development, with a local demonstration and synthetic data. Application structure, business rules, and automated tests. Panel for calendar, bookings, and status; establishment, service, calendar, and promotion management; access control and persistence. No production acceptance or payment processing.

Next.js 16 · React 19 · TypeScript · PostgreSQL (pg) · Zod · Vitest · Playwright

Repositório / Repository: https://github.com/llucalins/lava-auto-agendamento

**InfoD.beta — Independent project · Digital education**

An educational application based on difficulties observed while teaching computer skills, using interactive activities to develop typing, mouse coordination, and digital autonomy.

Browser-based interactive activities with a public version available for demonstration.

React 18 · JavaScript · Vite · HTML · CSS

Demonstração / Demo: https://info-d-beta.vercel.app

**Grow AI — Local AI and Full Stack**

A Full Stack application integrating local AI, a Java/Spring Boot API, authentication, and PostgreSQL persistence.

Integration across a web interface, REST API, authentication, database, and locally hosted AI.

React · Vite · Java 21 · Spring Boot · PostgreSQL · Docker · REST APIs · Local AI


**Weekly Panel / Work Management — Complementary project**

An application for weekly organization and task management, bringing together authentication, persistence, and automations.

Project without a confirmed public link.

Next.js · TypeScript · PostgreSQL · Prisma · Auth · Automation


**Local School AI Agent — Complementary project**

A local agent for school documents and administrative routines, connecting a web interface to models run with Ollama.

Project without a confirmed public link.

Java · Spring Boot · React · Ollama


**Mr Roobot AI Office — Experimental project in development**

Configuration of specialized architecture, backend, frontend, and QA agents using Hermes Agent, and exploration of integration with DeskRPG.

Experiment in development using third-party tools: Hermes Agent and DeskRPG. No confirmed public repository.

Hermes Agent · DeskRPG


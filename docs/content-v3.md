# Correção de conteúdo profissional — Portfólio V3

Conteúdo abaixo extraído do DOM de `/resume` no Chromium após a atualização. As traduções substituem os textos anteriores. Não houve alteração de CSS, layout, TechText, SideRays, logo, dados de projetos ou formação nesta correção.

## PT-BR

Desenvolvedor Full Stack | React Native | React | TypeScript

Desenvolvedor Full Stack com experiência profissional na construção de aplicações web e mobile, atuando no desenvolvimento de interfaces, implementação de funcionalidades, integração de APIs REST e estruturação de sistemas.

Experiência prática com React Native no desenvolvimento de aplicações multiplataforma para Android e iOS, incluindo implementação de interfaces interativas e integração com APIs da OpenAI.

Anderson Rios Consultoria · Remoto — maio/2025 a dezembro/2025

- Desenvolvimento de telas, interfaces e funcionalidades mobile com React Native para Android e iOS.
- Implementação de funcionalidades associadas à medição de ambientes e projeção virtual de móveis com IA.
- Participação na integração com APIs da OpenAI.
- Desenvolvimento Full Stack com React, Next.js, TypeScript, JavaScript, Node.js e Python.
- Implementação e consumo de APIs REST.
- Definição de arquitetura e estruturação de sistemas.
- Versionamento com Git e utilização de Docker.
- Troubleshooting, correção de bugs e documentação.

## EN

Full Stack Developer | React Native | React | TypeScript

Full Stack Developer with professional experience building web and mobile applications, working on interface development, feature implementation, REST API integration, and systems structuring.

Hands-on experience with React Native developing cross-platform applications for Android and iOS, including interactive interface implementation and integration with OpenAI APIs.

Anderson Rios Consultoria · Remote — May 2025 to December 2025

- Development of mobile screens, interfaces, and features with React Native for Android and iOS.
- Implementation of features related to room measurement and AI-powered virtual furniture projection.
- Participation in OpenAI API integration.
- Full Stack development with React, Next.js, TypeScript, JavaScript, Node.js, and Python.
- Implementation and consumption of REST APIs.
- Architecture definition and systems structuring.
- Version control with Git and use of Docker.
- Troubleshooting, bug fixes, and documentation.

## Implementação

- `professionalProfile.js`: título compartilhado, stack da Home e competências de React Native e APIs da OpenAI.
- Traduções PT/EN: resumo, experiência Anderson Rios, apresentação, descrição da Home, textos auxiliares e rodapé atualizados.
- Hero: passa a consumir o título e a stack do perfil, preservando sua estrutura e os componentes visuais.
- Metadados estáticos e dinâmicos: título, descrição, Open Graph, Twitter e palavras-chave atualizados.
- Resume e Skills recebem o conteúdo atualizado pelas chaves e categorias já consumidas; nenhuma mudança de layout necessária.

## Validação

- `npm run build`: passou.
- `git diff --check`: passou.
- `/resume`: título completo, dois parágrafos e oito responsabilidades conferidos no DOM em PT-BR e EN.
- `/resume?print=1`: `window.print` interceptado para confirmar a chamada com o resumo e as oito responsabilidades atualizados. Retorno automático para `/resume` confirmado. O diálogo nativo de impressão não foi aberto no teste automatizado.
- PDFs PT/EN gerados com mídia de impressão e regras existentes. PDF PT-BR confirmado em A4, três páginas; texto extraído contém React Native, Android, iOS, OpenAI e as oito responsabilidades.
- Três experiências, duas formações e quatro projetos relevantes continuam renderizados.
- Home e Resume sem rolagem horizontal em 1440, 390 e 320 px nos dois idiomas; sem erros JavaScript.
- Captura da Home mobile revisada para conferir o título mais longo.

Nenhum problema bloqueante encontrado. Nenhuma biblioteca adicionada. Sem commit, push ou deploy.

# Alinhamento profissional — 4 de novembro de 2026

Posicionamento PT: **Desenvolvedor Full Stack | TypeScript e Integração de IA**.
Posicionamento EN: **Full Stack Developer | TypeScript & AI Integration**.

Hero, apresentação, resumos, metadados SEO, manifest, imagem de compartilhamento e currículos passam a priorizar TypeScript, aplicações web, APIs, persistência de dados e integração de IA. React Native permanece nas competências e na experiência real. Empresas, funções, datas, formação e contribuições profissionais foram preservadas; apenas a ordem das responsabilidades no PDF mudou para iniciar pelo desenvolvimento web.

## Projetos existentes e evidências

- A API GitHub confirmou `VmaisHomePage` e `Info.DBeta` como privados. Seus links e identificadores usados para consultas públicas foram removidos dos dados compartilhados, mantendo os projetos no site e a seleção do PDF. A demonstração `https://info-d-beta.vercel.app` respondeu HTTP 200 e foi mantida.
- Lava Auto continua público. A referência consultada foi a `main` remota em `ef05804164ed0fbe039f7724dd4792c32bf69ce2`, cujo README confirma catálogo, disponibilidade, confirmação e acompanhamento de reservas, painel administrativo, gestão de estabelecimento/serviços/calendário/promoções e controles de acesso. A descrição mantém o estado de desenvolvimento, demonstração local com dados sintéticos e ausência de homologação em produção e processamento de pagamentos. Fonte: [README nessa revisão](https://github.com/llucalins/lava-auto-agendamento/blob/ef05804164ed0fbe039f7724dd4792c32bf69ce2/README.md).
- Os outros projetos existentes mantêm o conteúdo e a classificação anterior; não foram acrescentadas funcionalidades ou alegações de conclusão. Não se atribuiu vínculo comercial aos projetos sem confirmação.
- Mr Roobot AI Office, Hermes Agent e DeskRPG não faziam parte do portfólio e não foram adicionados, conforme esclarecimento do usuário. Nenhuma autoria de plataforma de terceiros foi atribuída ao profissional.

## Verificações

- `npm ci`: passou. Informou duas vulnerabilidades moderadas; dependências e lockfile não foram alterados. Não foi executada auditoria geral.
- `npm run build`: passou.
- `npm run resume:pdf`: passou; gerou os arquivos PT-BR e EN.
- `node scripts/verify-experience.mjs`: passou em PT/EN, desktop/mobile, incluindo falha e sucesso simulados da API GitHub.
- `node scripts/verify-resumes.mjs`: passou em PT/EN, desktop/mobile; conteúdo factual, seleção de projetos, downloads, visualização e redirecionamento legado, links, margens, texto selecionável e uma página A4 por idioma.
- Conferência adicional com Playwright: traduções com as mesmas chaves; rotas `/`, `/work`, `/resume`, `/contact` e página inexistente em PT/EN a 1440, 390 e 320 px; títulos, SEO da Home, links internos, ausência de links para os dois repositórios privados, ausência de overflow horizontal e erros JavaScript.
- Inspeção visual das duas páginas PDF rasterizadas e da Home em desktop/mobile: sem cortes ou sobreposição do novo título.
- Comparação automática com o Git: experiências, empresas, datas, tecnologias, contribuições e formação idênticas à revisão anterior em PT/EN; responsabilidades editoriais do PDF apenas reordenadas. Exatamente seis projetos existentes preservados.
- `git diff --check` e revisão do diff: passaram.

## Ocorrências resolvidas

A primeira geração de PDFs falhou ao iniciar Chromium dentro do sandbox (`Operation not permitted`). A repetição autorizada fora do sandbox passou, sem mudar o gerador.

A primeira execução da verificação de currículo falhou em `Experiência profissional`: a busca encontrava essa expressão no novo resumo antes do cabeçalho e interpretava a ordem como incorreta. O script agora procura o título em uma linha completa. A verificação da ordem das cinco seções foi preservada e a repetição passou. As antigas expectativas de disponibilidade/reservas apenas planejadas também foram substituídas por verificações do escopo atualizado.

A comparação adicional de fatos também encontrou um bloqueio do sandbox ao chamar Git dentro do Node (`spawnSync git EPERM`). A repetição autorizada passou.

Os scripts Node emitiram o aviso existente `MODULE_TYPELESS_PACKAGE_JSON`; executaram com sucesso. Nenhuma alteração de arquitetura, layout, dependências ou outros repositórios. Sem push ou merge.

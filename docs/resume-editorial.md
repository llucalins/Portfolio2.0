# Currículo editorial — versão vigente

## Síntese

Avaliação de design: **Good**. PDFs PT-BR/EN com uma página A4 cada, uma coluna, corpo 10,25 pt, contatos 10 pt, nome 20 pt e margens 13/16 mm. Hierarquia por peso, espaçamento e três tons escuros; sem ornamentos. Contrastes sobre branco: títulos 17,01:1, corpo 14,12:1 e metadados 7,64:1.

## Skill aplicada

`apple-design`: fundamentos de documentos, sem convenções de interfaces Apple.

- `typography.md › Conveying hierarchy`: “Minimize the number of typefaces you use”. Uma família sans-serif com fontes incorporadas.
- `layout.md › Visual hierarchy`: “Order content by relative importance.” Empresas e responsabilidades precedem projetos.
- `writing.md › Getting started`: “Be clear.” Responsabilidades concisas; planejamento identificado.

## Conteúdo

Anderson Rios (mai–dez/2025), as duas funções na Prefeitura e atuação Full Stack freelancer. Freelance agora descreve interfaces web, APIs, estruturação e persistência. Sem datas fictícias.

Vmais e Agendamento estão em Projetos selecionados: o vínculo freelancer permanece não confirmado. Reservas e disponibilidade continuam planejadas. Nenhum cliente ou contrato foi inventado. Os demais projetos foram omitidos por concisão.

## Arquivos e validação

Alterados: `resumeDocument.js`, `professionalProfile.js`, `selectedWork.js`, traduções PT/EN, `verify-resumes.mjs`, os dois PDFs e documentação. Gerador existente reaproveitado; sem dependências novas.

Todas as páginas finais rasterizadas e inspecionadas. Testados texto pesquisável, ordem, margens, seis links, fidelidade factual, classificação e downloads PT/EN em desktop/mobile. `npm run build` e `git diff --check` passaram.

Fontes do site protegidas por comparação SHA-256. `/resume` mantém os 17 certificados. Sem commit, push ou deploy.

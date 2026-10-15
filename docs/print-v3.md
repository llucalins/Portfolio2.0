# Ajustes finais V3

## Título

- PT-BR: Desenvolvedor Full Stack | Web & Mobile
- EN: Full Stack Developer | Web & Mobile

Atualizado nas chaves de título das traduções, nas páginas que usam o perfil, nos títulos dinâmicos de todas as rotas, no HTML inicial/Open Graph/Twitter e no manifesto. Os cargos históricos permanecem com suas denominações reais. React Native, React e TypeScript continuam nas competências e na experiência Anderson Rios.

## Impressão

Duas páginas A4 em PT-BR e EN, verificadas em PDFs gerados pelo Chromium, sem escala de redução:

1. Apresentação, resumo completo, três experiências com todas as responsabilidades e duas formações.
2. Quatro projetos relevantes com descrições, escopos e links, contatos, tecnologias, especialidades, idiomas e certificados selecionados.

A impressão usa largura total, margens de 12 mm, corpo e responsabilidades em 10 pt, informações auxiliares em 9,5 pt e cabeçalhos de seção em 9 pt. As quebras separam as páginas sem cortar artigos. O fundo de impressão é claro, inclusive quando o navegador usa aparência escura. O conteúdo dos projetos e da formação não foi alterado.

O componente de certificados existia, mas estava desconectado do currículo. Foi reconectado usando os dados e estilos existentes: 17 certificados completos na web, com quatro selecionados por CSS para impressão:

- Versionamento de Código com Git e GitHub.
- Estrutura de um Software e Seu Ambiente de Desenvolvimento.
- Entendendo Comunicação Client x Server.
- Introdução ao Flutter.

A seleção privilegia fundamentos de sistemas, colaboração, integração web e desenvolvimento mobile. Não atribui certificações de React Native ou OpenAI que não constam nos arquivos existentes.

O fluxo `/resume?print=1` aguarda a renderização dos certificados e o carregamento das fontes antes de chamar a impressão. No teste automatizado, a chamada de `window.print` foi interceptada; o diálogo nativo não foi aberto.

## Validação

- `npm run build`: passou, 124 módulos.
- `git diff --check`: passou.
- Títulos conferidos em Home, Work, Contact e Resume nos dois idiomas.
- 17 certificados visíveis na web e quatro na mídia de impressão.
- Três experiências, duas formações e quatro projetos presentes na impressão.
- `/resume?print=1`: chamada confirmada após os 17 certificados carregarem, seguida do retorno para `/resume`.
- PDFs PT-BR e EN: duas páginas cada, 594,96 × 841,92 pt (A4).
- Páginas renderizadas dos PDFs revisadas para conferir legibilidade e distribuição.

Os ajustes de composição estão restritos a `@media print`. Hero, animações, logo, design geral e dados dos projetos preservados. Sem novas bibliotecas, commit, push ou deploy.

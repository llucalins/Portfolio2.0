# Currículos PDF — layout de referência

Atualizado em 4 de novembro de 2026. O template de `resumeDocument.js` reproduz a organização visual do currículo fornecido em `references/cv_referencia.pdf`, inspecionado visualmente nas três páginas e medido com Poppler. O conteúdo permanece o de Lucas Virginio.

## Medidas e organização

| Elemento | Referência | Template de Lucas |
| --- | --- | --- |
| Página | A4, aproximadamente 596 × 842 pt | A4, aproximadamente 595 × 842 pt |
| Margens | Texto principal a aproximadamente 56,7 pt da borda | 20 mm, aproximadamente 56,7 pt |
| Fonte | Calibri normal e negrito | Carlito normal e negrito, métricas compatíveis, incorporada |
| Nome | Centralizado, 16 pt, negrito | Centralizado, 16 pt, negrito |
| Cargo | Centralizado, aproximadamente 15 pt, negrito | Centralizado, 15 pt, negrito |
| Contatos | Centralizados, uma linha, 12 pt, separador vertical | Mesmo formato; LinkedIn identificado pelo nome com URL completa no link |
| Seções | Títulos centralizados, maiúsculas, aproximadamente 14 pt e linha cinza superior | Mesmo formato, linha de 0,5 pt |
| Corpo | Aproximadamente 12 pt; responsabilidades justificadas, entrelinha próxima de 1,4 | 12 pt e entrelinha 1,4 |
| Experiência | Empresa, cargo e período em linhas distintas, à esquerda | Mesmo formato; período em 11 pt e cinza escuro |
| Listas | Marcadores circulares; primeiro bloco de experiência com texto a aproximadamente 92,7 pt | Marcadores circulares, recuo de 36 pt a partir da margem |
| Educação | Instituição, curso e ano em linhas distintas | Mesmo formato com as duas formações reais |
| Certificados | Título em negrito; instituição, ano e link sublinhado na linha seguinte | Mesmo formato com quatro certificados existentes |

A referência contém pequenas variações de recuo entre experiências. O template usa o recuo do primeiro bloco, de forma consistente. As quebras dependem do texto real em cada idioma: não se introduziram quebras manuais nem redução de escala para fixar a quantidade de páginas.

A sequência é competências, experiência, projetos selecionados, educação, cursos e certificados. Os projetos têm seção própria e não são classificados como emprego ou contrato. O resumo separado foi omitido do PDF para seguir a abertura da referência diretamente pelas competências; os resumos do site continuam intactos. Idiomas integram a lista de competências, como na referência.

O histórico profissional e as contribuições não foram reescritos. A atividade freelancer permanece sem período inventado. Os certificados são os quatro já selecionados para impressão no componente existente: Git/GitHub, estrutura de software, comunicação cliente-servidor e introdução ao Flutter. Títulos, instituições, anos e arquivos são reutilizados do cadastro existente. A lista de 17 certificados da página web permanece intacta.

## Fontes e geração

Calibri não está instalada no ambiente. A alternativa livre Carlito preserva as métricas e proporções da família da referência. Os dois arquivos locais e sua licença OFL estão em `public/fonts/carlito/`. Não foi adicionada dependência npm.

Origem das fontes: [googlefonts/carlito, revisão 3a810cab](https://github.com/googlefonts/carlito/tree/3a810cab78ebd6e2e4eed42af9e8453c4f9b850a/fonts/ttf). O gerador incorpora essas fontes como dados locais antes da impressão, funcionando sem servidor ou consulta de rede. Os PDFs possuem texto selecionável, fontes incorporadas e links clicáveis de contato, projeto público e certificados.

O PDF de referência pertence ao material fornecido pelo usuário; não foi copiado para `public/` nem incluído no commit. Seus dados pessoais e profissionais não foram transpostos.

## Validação

- `npm run resume:pdf`: passou, com três páginas A4 por idioma.
- Inspeção visual das seis páginas geradas e comparação com as três páginas da referência: cabeçalho, títulos, linhas divisórias, fontes, margens, recuos, blocos de experiência, educação e certificados conferidos; sem cortes ou sobreposições.
- `node scripts/verify-resumes.mjs`: passou em PT/EN, desktop/mobile. Além dos fluxos de download, visualização e redirecionamento, verifica fatos profissionais, seleção de projetos, certificados, links, fontes Carlito incorporadas, centralização pelo texto do PDF, empresa/cargo/período em linhas consecutivas e margens de 20 mm em todas as páginas. A antiga exigência de uma página foi substituída por duas ou três, conforme a tarefa.
- `node scripts/verify-experience.mjs`: passou nos dois idiomas, desktop/mobile e nos cenários de falha/sucesso da API GitHub; experiência e projetos do site preservados.
- `npm run build`: passou. O arquivo CSS do site manteve o mesmo hash (`index-aXyDzLFY.css`); os seletores do documento permanecem restritos a `.resume-document`, usado na impressão.
- `git diff --check`: passou.

Os avisos existentes de módulos sem `type` no `package.json` continuam sendo emitidos pelos scripts Node. Não houve alteração de experiências, dependências, rotas, componentes visíveis ou design do website. Sem push ou merge.

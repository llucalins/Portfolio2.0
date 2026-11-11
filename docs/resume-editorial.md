# Currículos PDF — layout de referência

Atualizado em 4 de novembro de 2026. O template de `resumeDocument.js` reproduz a organização visual do currículo fornecido em `references/cv_referencia.pdf`, inspecionado visualmente nas três páginas e medido com Poppler. O conteúdo permanece o de Lucas Virginio. No ajuste final, a escala tipográfica e os espaçamentos foram compactados para limitar os dois idiomas a duas páginas, preservando a identidade visual.

## Medidas e organização

| Elemento | Referência | Template de Lucas |
| --- | --- | --- |
| Página | A4, aproximadamente 596 × 842 pt | A4, aproximadamente 595 × 842 pt |
| Margens | Texto principal a aproximadamente 56,7 pt da borda | 20 mm, aproximadamente 56,7 pt |
| Fonte | Calibri normal e negrito | Carlito normal e negrito, métricas compatíveis, incorporada |
| Nome | Centralizado, 16 pt, negrito | Centralizado, 14 pt, negrito |
| Cargo | Centralizado, aproximadamente 15 pt, negrito | Centralizado, 12,5 pt, negrito |
| Contatos | Centralizados, uma linha, 12 pt, separador vertical | Mesmo formato em 10,5 pt; LinkedIn identificado pelo nome com URL completa no link |
| Seções | Títulos centralizados, maiúsculas, aproximadamente 14 pt e linha cinza superior | Mesmo formato em 12 pt, linha de 0,5 pt |
| Corpo | Aproximadamente 12 pt; responsabilidades justificadas, entrelinha próxima de 1,4 | 10,5 pt e entrelinha 1,32 |
| Experiência | Empresa, cargo e período em linhas distintas, à esquerda | Mesmo formato; empresa em 12 pt, cargo em 10,5 pt e período em 10 pt e cinza escuro |
| Listas | Marcadores circulares; primeiro bloco de experiência com texto a aproximadamente 92,7 pt | Marcadores circulares, recuo proporcional de 27 pt a partir da margem |
| Educação | Instituição, curso e ano em linhas distintas | Mesmo formato com as duas formações reais |
| Certificados | Título em negrito; instituição, ano e link sublinhado na linha seguinte | Mesmo formato com três certificados existentes |

A referência contém pequenas variações de recuo entre experiências. O template usa um recuo proporcional consistente. As quebras dependem do texto real em cada idioma: não se introduziram quebras manuais nem escala de impressão reduzida. Os tamanhos em pontos e os espaçamentos foram ajustados diretamente; os projetos permanecem agrupados.

A sequência é competências, experiência, projetos selecionados, educação, cursos e certificados. Os projetos têm seção própria e não são classificados como emprego ou contrato. O resumo separado foi omitido do PDF para seguir a abertura da referência diretamente pelas competências; os resumos do site continuam intactos. Idiomas integram a lista de competências, como na referência.

As três experiências existentes permanecem com suas empresas, funções e períodos. No PDF, a descrição de Instrutor de Informática foi substituída pelos três tópicos fornecidos pelo usuário, com tradução profissional em inglês e os dois resultados de mais de 100 alunos. A atividade freelancer permanece identificada como tal na mesma seção de experiência profissional, sem período ou cliente inventado. Os certificados são Git/GitHub, estrutura de software e comunicação cliente-servidor; apenas Introdução ao Flutter foi retirado da seleção do PDF. Títulos, instituições, anos e arquivos restantes são reutilizados do cadastro existente. A lista de 17 certificados da página web permanece intacta.

Mr Roobot AI Office foi acrescentado aos projetos do PDF, identificado como experimental e em desenvolvimento. O escopo se limita à configuração de agentes especializados em arquitetura, backend, frontend e QA com Hermes Agent e à exploração da integração com DeskRPG. Ambas as ferramentas são atribuídas a terceiros. Não há alegação de conclusão, vínculo remunerado, cliente ou repositório público. Os dados adicionais e os tópicos de instrutor ficam na seleção editorial do PDF; os componentes visíveis e o design do site não foram alterados.

## Fontes e geração

Calibri não está instalada no ambiente. A alternativa livre Carlito preserva as métricas e proporções da família da referência. Os dois arquivos locais e sua licença OFL estão em `public/fonts/carlito/`. Não foi adicionada dependência npm.

Origem das fontes: [googlefonts/carlito, revisão 3a810cab](https://github.com/googlefonts/carlito/tree/3a810cab78ebd6e2e4eed42af9e8453c4f9b850a/fonts/ttf). O gerador incorpora essas fontes como dados locais antes da impressão, funcionando sem servidor ou consulta de rede. Os PDFs possuem texto selecionável, fontes incorporadas e links clicáveis de contato, projeto público e certificados.

O PDF de referência pertence ao material fornecido pelo usuário; não foi copiado para `public/` nem incluído no commit. Seus dados pessoais e profissionais não foram transpostos.

## Validação

- `npm run resume:pdf`: passou, com duas páginas A4 por idioma.
- Inspeção visual das quatro páginas geradas a 96 dpi (escala equivalente a 100% no navegador) e comparação com as três páginas da referência: cabeçalho, títulos, linhas divisórias, fontes, margens, recuos, blocos de experiência, educação e certificados conferidos; sem cortes ou sobreposições.
- `node scripts/verify-resumes.mjs`: passou em PT/EN, desktop/mobile. Além dos fluxos de download, visualização e redirecionamento, verifica fatos profissionais, seleção de projetos, certificados, links, fontes Carlito incorporadas, centralização pelo texto do PDF, empresa/cargo/período em linhas consecutivas e margens de 20 mm em todas as páginas. A verificação agora limita a paginação a no máximo duas páginas, recusa texto abaixo de 10 pt e detecta títulos de seção isolados.
- `node scripts/verify-experience.mjs`: passou nos dois idiomas, desktop/mobile e nos cenários de falha/sucesso da API GitHub; experiência e projetos do site preservados.
- `npm run build`: passou. O arquivo CSS do site manteve o mesmo hash (`index-aXyDzLFY.css`); os seletores do documento permanecem restritos a `.resume-document`, usado na impressão.
- Na etapa anterior de compactação, o texto integral foi preservado. Na revisão de conteúdo atual, os testes verificam os três tópicos de instrutor em PT/EN, a inclusão do projeto experimental e a exclusão apenas do certificado de Flutter. As outras experiências, datas, projetos e certificados foram preservados.
- Os três projetos permanecem agrupados na segunda página; espaçamento entre experiências reduzido de 36 para 20 pt, entre registros de 24 para 14 pt e antes das listas de 18 para 9 pt. Nenhum tamanho de texto inferior a 10 pt.
- `git diff --check`: passou.

Na primeira execução do ajuste final, a busca de cabeçalhos não reconheceu o título de projetos no início da segunda página: o texto extraído usa um caractere de quebra de página. O script agora normaliza esse separador antes de verificar a ordem dos títulos; a repetição passou, mantendo a verificação da ordem das seções.

Os avisos existentes de módulos sem `type` no `package.json` continuam sendo emitidos pelos scripts Node. Não houve alteração de dependências, rotas, componentes visíveis ou design do website. As alterações editoriais dos PDFs seguem os dados e tópicos expressamente fornecidos pelo usuário. Alterações do ajuste final mantidas locais, sem novo commit, push ou merge; resultados apresentados ao usuário antes de qualquer novo commit.

## Memorial Monte Sinai — 2026

A atuação freelancer antes descrita genericamente passa a identificar o Memorial Monte Sinai e o ano confirmado de 2026, sem acrescentar meses ou aprovação comercial definitiva. As três experiências anteriores e o título profissional foram preservados.

O projeto tem classificação freelancer explícita e demonstração em https://d24we0nttwbgey.cloudfront.net, sem link de repositório. No website, aparece junto à experiência freelancer, seguindo o agrupamento existente. No PDF, as responsabilidades ficam em Experiência profissional e o resultado técnico em Projetos selecionados, sem repetir o projeto nas duas seções. Os textos PT/EN descrevem frontend, exportação estática, Amazon S3 privado, CloudFront, IAM e publicação com AWS CLI, conforme as informações fornecidas para esta atualização.

Validação local:

- `npm run resume:pdf`: PDFs PT/EN regenerados, duas páginas A4 por idioma.
- `npm run build`: passou.
- `node scripts/verify-experience.mjs`: passou em desktop e mobile, PT/EN; verificados agrupamento freelancer, tecnologias, link da demonstração, ausência de link de repositório e ausência de transbordamento horizontal.
- `node scripts/verify-resumes.mjs`: passou em desktop e mobile, PT/EN; verificadas seleção de projetos, ano, links, downloads, margens de 20 mm, fontes a partir de 10 pt e duas páginas A4.
- Inspeção visual das quatro páginas dos PDFs e capturas das seções freelancer em `/work` e `/resume`, desktop e mobile. Evidências locais em `/tmp/monte-sinai-review/`.
- Teste de regressão: a substituição temporária de `repositoryUrl || demoUrl` por `repositoryUrl && demoUrl` fez a verificação falhar pela ausência do link da demonstração no documento de impressão. Código restaurado após o teste.

Não há scripts npm de lint ou tipagem neste repositório; as menções a essas verificações no conteúdo descrevem o trabalho informado no projeto Memorial Monte Sinai. A validação móvel deste portfólio utiliza emulação Chromium, sem novo teste em aparelho físico. As verificações de navegador exigiram execução fora do sandbox devido à restrição de inicialização do Chromium. Permanece o aviso preexistente `MODULE_TYPELESS_PACKAGE_JSON` nos scripts Node.

Sem novas dependências, mudanças de CSS, infraestrutura, commit, push, merge ou deploy. A pasta local `references/` permanece não rastreada e preservada.


## Organização profissional consolidada

A revisão consolidada substitui a organização descrita na etapa anterior: vínculos profissionais, atuação independente para organizações (Vmais/Memorial) e projetos autorais selecionados (Lava Auto/InfoD.beta/Mr Roobot). O Memorial permanece em apresentação ao cliente, com demonstração publicada. As competências agora usam quatro categorias compartilhadas. Ver `professional-organization-spec.md` e `professional-organization-review.md` para critérios, textos finais PT/EN, arquivos, evidências e limitações. PDFs regenerados com duas páginas A4 por idioma, fontes a partir de 10 pt e margens de 20 mm; sem commit, push, merge ou deploy.

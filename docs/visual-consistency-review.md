# Padronização visual e editorial — experiências e currículo

Branch: `feat/monte-sinai-portfolio`. Conteúdo e organização aprovados preservados; sem redesign.

## Causa e contrato visual

`SelectedWork.jsx` e `ResumePage.jsx` alternavam entre lista de responsabilidades e parágrafo conforme existia uma chave de tópicos. O administrativo tinha apenas descrição e recebia uma estrutura distinta. Além disso, seletores com seu `data-experience-id` reduziam padding e, em `/work`, o tamanho do nome da organização.

Todas as experiências agora usam organização, cargo, período e uma lista semântica. A descrição administrativa aprovada é o único item de sua lista, sem nova responsabilidade ou resumo repetido. O número de itens permanece 4/2/1; a diferença de extensão vem do conteúdo.

Contrato aplicado:

- Mesmos estilos de organização, cargo e período para as três entradas de cada página, sem exceções individuais.
- Mesmo padding, largura de conteúdo, recuo e separador por tipo de entrada.
- Marcador `disc outside`, tamanho herdado do texto e cor secundária existente.
- Listas web com recuo de 1,25 rem, entrelinha de 1,75 e intervalo de 0,5 rem entre itens.
- `/work` preserva a composição em duas colunas no desktop e vertical no mobile. `/resume` mantém sua estrutura e os pontos de quebra existentes.
- Projetos preservam categoria, nome, contexto, escopo/estado, tecnologias e links. A linha de links só é renderizada quando há um destino, eliminando espaço vazio arbitrário.
- Competências preservam as quatro categorias e todos os itens, com estilos comuns de títulos e tecnologias.

O PDF já utilizava listas nas três experiências e um único padrão para projetos e competências. O template e seus estilos foram preservados, incluindo margens, fontes e espaçamento; os arquivos foram regenerados e verificados novamente.

## Escopo desta etapa

Arquivos de implementação alterados:

- `src/components/SelectedWork.jsx`
- `src/components/SelectedWork.css`
- `src/pages/ResumePage.jsx`
- `src/pages/ResumePage.css`

Verificação e artefatos:

- `scripts/verify-experience.mjs`
- `scripts/verify-resumes.mjs`
- `public/resumes/lucas-virginio-pt-br.pdf`
- `public/resumes/lucas-virginio-en.pdf`
- Este relatório.

Dados, traduções, classificação de projetos, competências e template PDF têm hashes SHA-256 idênticos aos do início desta etapa. O registro está em `/tmp/portfolio-visual-review/approved-content.sha256`. `FreelanceExperience.jsx` foi inspecionado e preservado. As alterações locais anteriores e `references/` permaneceram intactas.

## Verificação

- `npm run build`: passou.
- `npm run resume:pdf`: passou.
- `node scripts/verify-experience.mjs`: valida PT/EN, estrutura e estilos calculados das três experiências, marcadores, recuos, espaçamentos, separadores, projetos e competências. Inclui 1440, 768, 390 e 320 px, além de 1024 px já coberto anteriormente, e ausência de overflow.
- `node scripts/verify-resumes.mjs`: passou em desktop/mobile e PT/EN; listas 4/2/1, ausência de parágrafos redundantes, marcadores e recuos uniformes, projetos no padrão título/descrição/tecnologias, seleção sem duplicações e fluxos de PDF preservados.
- `git diff --check`: passou.
- Regressão reproduzida antes da correção: o teste falhou com listas 4/2/0, identificando o administrativo sem marcador.
- Inspeção visual antes/depois das experiências web e das quatro páginas dos PDFs. Ambos os documentos mantêm duas páginas A4, margens de 20 mm e fontes de pelo menos 10 pt.

## Evidências

Capturas em `/tmp/portfolio-visual-review/`:

- Antes: `before-work-1440.png`, `before-work-390.png`, `before-resume-1440.png`, `before-resume-390.png`.
- Depois: `after-{work|resume}-{pt|en}-{1440|768|390|320}.png` (16 capturas).
- PDFs inspecionados: `pdf-pt-1.png`, `pdf-pt-2.png`, `pdf-en-1.png`, `pdf-en-2.png`.

Os verificadores existentes também mantêm capturas de projetos e competências em `/tmp/portfolio-organization-review/`.

## Revisão e limites

Revisão de correção, legibilidade, reaproveitamento dos padrões existentes, segurança e custo de renderização sem achados impeditivos. Nenhum componente, dependência, efeito, dado profissional ou serviço de infraestrutura foi acrescentado.

O MCP de Chrome DevTools não está disponível; a inspeção de DOM, estilos calculados e imagens foi realizada com Chromium/Playwright. Algumas inicializações exigiram execução fora do sandbox. Testes móveis por emulação, sem aparelho físico. Permanece o aviso preexistente `MODULE_TYPELESS_PACKAGE_JSON` nos scripts Node.

Homologação do usuário pendente. Nenhum reset, commit, push, merge ou deploy executado.

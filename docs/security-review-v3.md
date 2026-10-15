# Avaliação de segurança para publicação da V3

Data da revisão: 15/10/2026. Escopo: aplicação React + Vite, renderização exclusivamente no cliente, na branch `redesign-v3`.

## Resultado e critério de publicação

`npm audit --json` e `npm audit` reportam duas dependências afetadas de severidade moderada: `react-router` e `react-router-dom`, ambas na versão 6.30.6. São dois advisories no router e um alerta transitivo no pacote DOM, não quatro vulnerabilidades independentes. Nenhum alerta alto ou crítico. O comando continua encerrando com código 1; a análise abaixo não remove nem suprime os alertas.

Não foi identificado caminho explorável para esses dois advisories na configuração e nos fluxos atuais do portfólio. Essa conclusão é específica ao código revisado e não declara a biblioteca corrigida.

## GHSA-337j-9hxr-rhxg — SSR hydration

O [advisory do mantenedor](https://github.com/remix-run/react-router/security/advisories/GHSA-337j-9hxr-rhxg) restringe a falha a SSR/hydration em Framework/Data Mode e exclui Declarative Mode.

Evidência local: `src/index.jsx` usa `ReactDOM.createRoot` e `BrowserRouter`; `src/App.jsx` declara `Routes`/`Route`. Não há SSR, `hydrateRoot`, `StaticRouter`, `RouterProvider`, erros serializados do servidor ou dados de hydration recebidos pela aplicação. O build Vite gera arquivos estáticos. Portanto, falta o fluxo de desserialização SSR necessário à exploração.

Risco residual: a conclusão deve ser revista antes de introduzir SSR, hydration manual ou dados de erro do servidor. A dependência instalada permanece na faixa afetada.

## GHSA-wrjc-x8rr-h8h6 — redirecionamento externo

O [advisory do mantenedor](https://github.com/remix-run/react-router/security/advisories/GHSA-wrjc-x8rr-h8h6) descreve navegação externa inesperada quando caminhos fornecidos por atacante chegam aos mecanismos de navegação. Esta falha também pode atingir aplicações sem SSR; a ausência de SSR, por si só, não a mitiga.

Evidência local:

- Header, Footer, Hero e NotFoundPage usam destinos locais fixos.
- Os destinos em HomeOverview são definidos no próprio código (`/work` e `/resume`).
- Não há `useNavigate`, `navigate`, redirecionamento pós-login ou parâmetros `next`/`returnTo` consumidos pela aplicação.
- Resume lê somente `print=1` e limpa os parâmetros mantendo a rota; não usa valores recebidos como destino.
- Os links externos de projetos e contatos vêm de dados locais versionados. O serviço GitHub usa uma raiz fixa e retorna somente linguagem, contagens e data; os metadados remotos não definem URLs de navegação.
- Path/hash são usados para metadados, identificação de rota e rolagem local, sem conversão para um destino externo.

Não há, no fluxo atual, entrada controlada por visitante ou API externa alimentando um destino do router. Risco residual: qualquer nova navegação dinâmica deve rejeitar destinos não locais por uma allowlist de rotas ou validar origem e protocolo antes de navegar. Reavaliar também se os dados hoje locais passarem a vir de CMS/API.

## Correções compatíveis com a versão 6

Consulta ao registro com `npm view react-router-dom@6 version --json`: a última versão publicada da linha 6 é 6.30.6, já instalada e fixada no manifesto/lockfile. Ambos os advisories apontam 7.18.0 como primeira versão corrigida. Não foi localizada versão 6 publicada que corrija esses alertas.

Não foi usado `npm audit fix --force`, migração para 7, override de dependências internas ou patch manual da biblioteca. Um backport local introduziria manutenção de código de terceiros e exigiria uma validação independente; não é apresentado como correção oficial. Os alertas permanecem visíveis para acompanhamento de futuros backports ou migração planejada.

## Git e integridade

`git fetch origin` atualizou a main para `31fc8b9`. A main havia incorporado a V3 inicial via PR #1; sua árvore era idêntica à base local `1c7d182`. Integração por `git merge --ff-only origin/main`, sem reset ou reescrita de histórico. As alterações e arquivos não rastreados foram copiados para backup fora do repositório e os hashes dos 157 arquivos locais foram conferidos após a integração, sem diferenças.

O commit usa uma seleção explícita de código e relatórios. A skill local `.agents/` e `skills-lock.json` permanecem fora. Artefatos de build, capturas, PDFs de teste, backup e scripts de validação não entram no commit. Os contatos profissionais já públicos são preservados; a revisão dos candidatos não identificou credenciais, chaves privadas ou documentos pessoais novos. O `.env` preexistente contém apenas a porta de desenvolvimento e não é alterado.

## Validação da versão

- `npm run build`: aprovado, 124 módulos.
- `git diff --check`: aprovado.
- `npm audit`: dois alertas moderados avaliados acima; zero altos/críticos.
- Build de produção servido localmente; Home, Work, Resume, Contact e 404 conferidos nos dois idiomas em larguras de 320, 390 e 1440 px.
- Troca PT-BR/EN, título Web & Mobile, conteúdo profissional, menu mobile, Escape, foco e restauração de interação com o conteúdo conferidos.
- `/resume?print=1`: chamada de impressão confirmada após carregar os 17 certificados; quatro certificados visíveis na mídia de impressão.
- PDFs em PT-BR e EN: duas páginas A4, corpo de 10 pt, experiências/formação/projetos preservados. O teste intercepta `window.print`; não opera o diálogo nativo.

A autorização de publicação permite alertas moderados tecnicamente avaliados sem risco relevante identificado nos fluxos atuais. Não equivale a uma auditoria de penetração completa. Não há merge da branch na main nem deploy manual nesta entrega.

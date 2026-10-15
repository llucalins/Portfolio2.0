# Refinamento do portfólio

Aplicação web React + Vite destinada a apresentar experiência profissional e projetos. A assinatura permanece no logo LV e no Hero com TechText, letras arrastáveis e SideRays. Foram aplicados princípios de legibilidade, hierarquia e adaptação da skill apple-design; convenções nativas de macOS/iOS não foram transplantadas para a web.

## Melhorias realizadas

- **Alta — legibilidade:** o cinza auxiliar passou de #77746e (4,07:1 sobre #111015) para #96938d (6,18:1). Texto secundário #aaa7a0: 7,89:1; principal #f4f3ef: 17,06:1; amarelo #eab308: 9,88:1. Fonte existente preservada. Escala compartilhada: rótulos 12 px, texto auxiliar 14 px, corpo 16 px e títulos fluidos de 44 a 76 px, nos valores padrão do navegador. Referência: `typography.md › Ensuring legibility`: “Use font sizes that most people can read easily.”
- **Média — hierarquia e alinhamento:** cabeçalho alinhado ao contêiner de conteúdo; títulos Work, Contact e Resume usam a mesma escala; entrelinhas menos comprimidas; títulos e detalhes agrupados por espaço. A coluna lateral do currículo perdeu o espaçamento global de seção que criava intervalos excessivos. Referência: `layout.md › Visual hierarchy`: “Align elements to make them easier to scan”.
- **Alta — navegação por teclado:** menu mobile mantém o foco no cabeçalho, torna conteúdo de fundo inerte, fecha por Escape com retorno do foco e fecha ao entrar no breakpoint desktop. O menu permite rolagem em telas baixas. Referência: `accessibility.md › Speech`: “Let people use the keyboard alone to navigate and interact with your app.”
- **Média — controles e feedback:** idioma com alvo de 44 × 44 px, links de navegação e ações ampliados, rota ativa mobile com sublinhado, feedback consistente em links e linhas interativas. Referência: `accessibility.md › Mobility`: “Offer sufficiently sized controls.”
- **Média — responsividade:** projetos passam a uma coluna em telas estreitas; datas podem quebrar; ações do currículo podem ocupar mais de uma linha. Sem exclusão de funções por largura. Referência: `layout.md › Adaptability`: “Be prepared for text-size changes.”
- **Baixa — contenção visual:** removida numeração ornamental dos projetos, mantidas categorias reais. Sem novos efeitos ou bibliotecas. Preferências de maior contraste e menor transparência recebem tratamento CSS; redução de movimento existente foi preservada. Referência: `motion.md › Best practices`: “Add motion purposefully, supporting the experience without overshadowing it.”

Decisões de composição e escala são julgamento de design aplicado ao portfólio. A identidade escura foi mantida conforme solicitado; não foi criada uma variante clara. A navegação continua no cabeçalho e vira menu em larguras compactas. Não se adicionou uma nova animação: o Hero já concentra a expressão visual.

Estrutura regular: logo / navegação / idioma; conteúdo em colunas de contexto, leitura e ações. Estrutura compacta: logo / idioma / menu; título, contexto, leitura e ações empilhados. Superfície #17161c diferencia hover sem acrescentar elementos decorativos.

## Validação

- `npm run build`: passou (122 módulos).
- `git diff --check`: passou; Git também informou normalizações CRLF/LF em arquivos preexistentes.
- Chromium: quatro rotas em 1440, 390 e 320 px, sem rolagem horizontal e sem erros JavaScript.
- Capturas revisadas de Home mobile, Work desktop, Resume mobile e Contact desktop.
- Menu: fundo inerte e retorno do foco após Escape confirmados.
- Alternância para EN confirmada (`html lang="en"`). Não foi realizada auditoria completa com leitor de tela, nem verificação manual em dispositivos físicos.
- PDF do currículo gerado com tamanho A4, três páginas. Não se propõe limitar o currículo a uma página.
- Código dos dados profissionais, traduções, serviço GitHub, TechText e SideRays preservado. Os gestos de arraste e a disponibilidade remota da API GitHub não foram testados neste roteiro.

## Problemas encontrados

O ambiente estava sem o binding nativo do Rolldown e impedia o Vite de iniciar. `npm ci` restaurou as dependências pelo lockfile, sem alterar manifestos ou adicionar bibliotecas.

`npm audit` reporta duas dependências com severidade moderada: react-router e react-router-dom. A correção indicada exige migração principal para a versão 7; não foi aplicada para preservar o escopo funcional. Isso é um resultado da auditoria de dependências, não uma confirmação de exploração no portfólio.

Nenhum commit, push ou deploy realizado.

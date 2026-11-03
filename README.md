# Portfolio2.0 — Lucas Virginio

Portfólio pessoal em React para apresentar trajetória profissional, trabalhos selecionados, currículo e contatos. A aplicação usa React Router para navegação, conteúdo em português e inglês e PDFs do currículo disponíveis nos dois idiomas.

## Executar localmente

Use Node.js **24 LTS** e npm. O `package.json` ainda fixa Node.js 20.19.4 na configuração Volta, uma pendência de manutenção: [Node.js 20 está fora de suporte](https://nodejs.org/en/about/previous-releases). Confira `node --version` antes de instalar as dependências. Se usar Volta, selecione Node 24 explicitamente nos comandos npm, por exemplo, `volta run --node 24 npm ci`, até que o pin seja atualizado.

```bash
git clone https://github.com/llucalins/Portfolio2.0.git
cd Portfolio2.0
npm ci
npm run dev
```

Abra `http://localhost:3000`. O Vite usa a porta 3000 com `strictPort`; libere essa porta ou informe outra com `PORT=3001 npm run dev`. Nenhum token do GitHub é necessário: as consultas a repositórios usam a API pública.

## Páginas e funcionalidades

| Rota | Conteúdo |
| --- | --- |
| `/` | Apresentação e visão geral do perfil |
| `/work` | Experiência profissional e trabalhos selecionados |
| `/resume` | Currículo, competências, formação, certificados e acesso ao PDF |
| `/contact` | Links de contato por e-mail, GitHub e LinkedIn |

Outros caminhos exibem a página de rota não encontrada. O contato é feito pelos links disponíveis; a aplicação não implementa envio de mensagens por formulário.

Os dados dos projetos são locais. Quando disponível, a API pública do GitHub complementa a apresentação com linguagem, estrelas e forks. O serviço mantém cache no navegador por 15 minutos e o conteúdo local permanece disponível quando a API falha. A preferência de idioma também usa armazenamento local.

## Stack e organização

React 18, JavaScript, React Router 6, Vite 8, CSS, React Icons e OGL. Playwright é usado pelos scripts de verificação e geração de PDF.

| Arquivo ou diretório | Responsabilidade |
| --- | --- |
| `src/App.jsx` | Rotas da aplicação |
| `src/pages/` | Páginas de apresentação, experiência, currículo e contato |
| `src/layouts/` | Estrutura compartilhada de navegação |
| `src/data/professionalProfile.js` | Dados do perfil, contatos, formação e competências |
| `src/data/selectedWork.js` | Trabalhos selecionados e links de repositórios |
| `src/data/resumeDocument.js` | Conteúdo e estilos usados para gerar os PDFs |
| `src/translations/` | Textos em português e inglês |
| `src/services/github.js` | Consulta pública ao GitHub, timeout e cache |
| `public/resumes/` | PDFs em português e inglês |
| `public/certificates/` | Arquivos de certificados |
| `scripts/` | Geração e verificação do currículo e da experiência |

Ao atualizar informações profissionais, mantenha coerência entre os dados, as traduções e o PDF. Não atribua projetos à experiência de uma empresa sem confirmação.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` ou `npm start` | Servidor de desenvolvimento Vite |
| `npm run build` | Gera os arquivos estáticos em `dist/` |
| `npm run preview` | Serve o build local na porta configurada |
| `npm run resume:pdf` | Gera novamente os dois PDFs em `public/resumes/` |

Não há scripts `test`, `lint` ou `typecheck` definidos no `package.json`. Os scripts de verificação existentes são executados diretamente com Node.js; sua presença não equivale a uma execução aprovada.

## Currículo em PDF e verificações

Para gerar novamente os PDFs, instale o Chromium usado pelo Playwright e execute:

```bash
npx playwright install chromium
npm run resume:pdf
```

Essa geração atualiza os arquivos de `public/resumes/`. Revise o conteúdo gerado junto com os dados que o originaram.

Para executar as verificações de experiência e currículo, mantenha o servidor local ativo na porta esperada pelos scripts:

```bash
PORT=3001 npm run dev
```

Em outro terminal:

```bash
node scripts/verify-experience.mjs
node scripts/verify-resumes.mjs
```

O segundo script também requer `pdfinfo` e `pdftotext`, ferramentas do Poppler disponíveis no sistema. Os scripts verificam cenários em português e inglês, desktop e mobile; o de experiência simula sucesso e falha da API GitHub. O de currículo compara arquivos PDF, textos e links. Build e scripts devem ser executados no ambiente de revisão antes de considerar uma alteração validada.

## Build e hospedagem

Execute `npm run build` e confira o resultado com `npm run preview`. O servidor estático precisa servir `index.html` também nas rotas `/work`, `/resume` e `/contact`; a configuração `vercel.json` contém esse fallback. A configuração atual usa caminhos a partir da raiz do domínio. Hospedagem em subdiretório requer análise da base do Vite e do roteador.

O endereço canônico declarado no código é `https://lucasvirginio.is-a.dev/`. Isso identifica a configuração do projeto, sem garantir disponibilidade do site ou publicação do último commit. Não existe script `deploy` neste repositório.

## Licença

Não há arquivo `LICENSE` nesta revisão do repositório. A definição dos termos de reutilização deve ser confirmada com o proprietário.

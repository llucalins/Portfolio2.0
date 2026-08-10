# Portfólio Profissional - React

Um portfólio moderno e responsivo desenvolvido com React, HTML e CSS para divulgar suas capacidades profissionais e se inscrever para empresas.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional com gradientes e animações
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Suave**: Scroll suave entre seções
- **Formulário de Contato**: Formulário funcional para receber mensagens
- **Seção de Projetos**: Exibição de projetos com filtros por categoria
- **Habilidades Interativas**: Barras de progresso animadas
- **Timeline Profissional**: Histórico de experiência e educação
- **Links Sociais**: Integração com GitHub, LinkedIn e outras redes

## 📋 Seções Incluídas

1. **Header**: Navegação fixa com menu mobile
2. **Hero**: Apresentação principal com animações
3. **Sobre**: Informações pessoais e timeline profissional
4. **Habilidades**: Categorias de skills com barras de progresso
5. **Projetos**: Portfolio de projetos com filtros
6. **Contato**: Formulário e informações de contato
7. **Footer**: Links rápidos e redes sociais

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework principal
- **CSS3**: Estilos modernos com Flexbox e Grid
- **React Icons**: Ícones para toda a aplicação
- **HTML5**: Estrutura semântica
- **JavaScript ES6+**: Funcionalidades interativas

## 📦 Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/seu-usuario/portfolio-react.git
cd portfolio-react
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**:
```bash
npm start
```

4. **Abra no navegador**:
```
http://localhost:3000
```

## ⚙️ Personalização

### 1. Informações Pessoais
Edite os seguintes arquivos para personalizar suas informações:

- `src/components/Hero.js` - Nome, título e descrição
- `src/components/About.js` - Experiência e educação
- `src/components/Contact.js` - Informações de contato
- `src/components/Projects.js` - Seus projetos

### 2. Cores e Estilo
As cores principais estão definidas em:
- `src/App.css` - Variáveis de cor principais
- `src/index.css` - Estilos globais

### 3. Links Sociais
Atualize os links nas seguintes seções:
- Hero component
- Contact component  
- Footer component

### 4. Projetos
Adicione seus projetos em `src/components/Projects.js`:
```javascript
{
  id: 1,
  title: 'Nome do Projeto',
  description: 'Descrição do projeto',
  image: 'URL da imagem',
  technologies: ['React', 'Node.js'],
  category: 'frontend',
  github: 'https://github.com/seu-usuario/projeto',
  demo: 'https://demo.com',
  featured: true
}
```

## 🚀 Deploy

### Netlify (Recomendado)
1. Conecte seu repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `build`

### Vercel
1. Conecte seu repositório ao Vercel
2. O deploy será automático

### GitHub Pages
1. Adicione `"homepage": "https://seu-usuario.github.io/portfolio-react"` no package.json
2. Execute: `npm run deploy`

## 📱 Responsividade

O portfólio é totalmente responsivo e funciona em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎨 Customização Avançada

### Adicionando Novas Seções
1. Crie um novo componente em `src/components/`
2. Adicione o componente ao `App.js`
3. Crie os estilos correspondentes

### Modificando Animações
As animações estão definidas nos arquivos CSS de cada componente. Você pode ajustar:
- Duração das animações
- Efeitos de hover
- Transições

### Alterando o Tema
Para mudar as cores principais, edite as variáveis CSS em `src/App.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --background-color: #0a0a0a;
  --text-color: #ffffff;
}
```

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar conforme necessário.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📞 Suporte

Se você tiver dúvidas ou precisar de ajuda, entre em contato através do formulário no portfólio ou abra uma issue no GitHub.

---

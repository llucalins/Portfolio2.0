# Sistema de Preview de Links

## 🎯 O que foi implementado

O sistema de preview de links foi configurado para mostrar um card profissional quando o portfólio for compartilhado nas redes sociais.

## 📱 Como funciona

### Meta Tags Configuradas
- **Open Graph** (Facebook, WhatsApp, LinkedIn)
- **Twitter Cards** (Twitter)
- **Meta tags dinâmicas** baseadas no idioma selecionado

### Imagem de Preview
- **Arquivo:** `public/portfolio-preview.svg`
- **Dimensões:** 1200x630px (formato recomendado para redes sociais)
- **Design:** Card com gradiente, nome, título, descrição e avatar

## 🎨 Design do Card

O card de preview inclui:
- **Nome:** "Lucas Virginio" em destaque
- **Título:** "Full Stack Developer" 
- **Descrição:** Texto sobre suas habilidades
- **Tags de tecnologia:** React, Node.js, TypeScript, Python, Java
- **Avatar:** Círculo com placeholder
- **Pequeno avatar:** No canto inferior esquerdo
- **Partículas decorativas:** Efeito visual sutil

## 🔧 Arquivos principais

- `public/index.html` - Meta tags configuradas
- `public/portfolio-preview.svg` - Imagem de preview
- `src/contexts/LanguageContext.js` - Sistema de idiomas
- `src/hooks/useMetaTags.js` - Hook para meta tags dinâmicas
- `src/components/MetaTagsManager.js` - Gerenciador de meta tags

## ✅ Resultado

Quando o link for compartilhado, aparecerá:
- **Título:** "Lucas Virginio - Desenvolvedor Full Stack"
- **Descrição:** Texto detalhado sobre o portfólio
- **Imagem:** Card profissional com design consistente
- **URL:** Link limpo e organizado

## 🚀 Próximos passos

1. Faça o deploy do site
2. Teste o preview usando:
   - Facebook Debugger
   - Twitter Card Validator
   - LinkedIn Post Inspector
   - WhatsApp Preview

O sistema está pronto e funcionando automaticamente!

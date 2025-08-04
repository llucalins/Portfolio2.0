# Seção de Certificados - Portfólio

## ✅ Implementação Concluída

A seção de certificados foi **integrada na seção de projetos** com o mesmo design visual, substituindo completamente a seção de projetos.

## 🎯 Como funciona agora

### 1. Estrutura de Pastas
```
public/
  └── certificates/
      ├── certificado-web.pdf
      ├── certificado-react.pdf
      ├── certificado-node.pdf
      └── ... (seus certificados PDF)
```

### 2. Configuração dos Certificados

**Arquivo**: `src/utils/certificateDetector.js`

Atualize a lista de certificados neste arquivo:

```javascript
export const detectCertificates = () => {
  const certificates = [
    {
      id: 1,
      title: 'Nome do seu certificado',
      description: 'Descrição do certificado',
      filename: 'nome-do-arquivo.pdf', // deve estar na pasta public/certificates/
      category: 'frontend', // frontend, backend, devops
      issuer: 'Instituição emissora',
      date: '2024',
      featured: true // true para destaque, false para normal
    },
    // Adicione mais certificados aqui...
  ];

  return certificates;
};
```

### 3. Funcionalidades Disponíveis

- ✅ **Design igual aos projetos**: Mesmo estilo visual dos cards de projetos
- ✅ **Filtros por categoria**: Frontend, Backend, DevOps
- ✅ **Preview em modal**: Visualização do PDF sem sair da página
- ✅ **Download direto**: Baixar certificados com um clique
- ✅ **Badge de destaque**: Certificados importantes marcados como "Destaque"
- ✅ **Design responsivo**: Funciona perfeitamente em mobile
- ✅ **Navegação integrada**: Link "Certificados" no menu principal

### 4. Como Adicionar Novos Certificados

1. **Coloque o PDF** na pasta `public/certificates/`
2. **Atualize a lista** no arquivo `src/utils/certificateDetector.js`
3. **Configure as informações**:
   - `title`: Nome do certificado
   - `description`: Descrição detalhada
   - `filename`: Nome exato do arquivo PDF
   - `category`: frontend, backend, ou devops
   - `issuer`: Instituição que emitiu
   - `date`: Ano do certificado
   - `featured`: true para destacar

### 5. Exemplo de Certificado

```javascript
{
  id: 7,
  title: 'Certificado de Python',
  description: 'Desenvolvimento com Python, Django, APIs e automação.',
  filename: 'python-certificado.pdf',
  category: 'backend',
  issuer: 'Coursera',
  date: '2024',
  featured: false
}
```

### 6. Categorias Disponíveis

- **frontend**: React, Vue, JavaScript, CSS, etc.
- **backend**: Node.js, Python, Java, APIs, etc.
- **devops**: Docker, AWS, CI/CD, etc.

### 7. Personalização

#### Cores e Estilos
Edite o arquivo `src/components/Projects.css` para personalizar:
- Cores do gradiente
- Animações dos cards
- Estilo do modal
- Layout responsivo

#### Categorias
Adicione novas categorias no arquivo `src/components/Projects.js`:

```javascript
const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'devops', label: 'DevOps' },
  { id: 'mobile', label: 'Mobile' } // Nova categoria
];
```

### 8. Troubleshooting

**Problema**: PDF não aparece no preview
**Solução**: Verifique se o arquivo existe em `public/certificates/` e se o nome está correto

**Problema**: Download não funciona
**Solução**: Certifique-se de que o arquivo PDF está na pasta correta

**Problema**: Modal não abre
**Solução**: Verifique se não há erros no console do navegador

**Problema**: Certificado não aparece na lista
**Solução**: Verifique se foi adicionado corretamente no `certificateDetector.js`

### 9. Próximos Passos

1. ✅ Adicione seus certificados PDF na pasta `public/certificates/`
2. ✅ Atualize a lista no arquivo `src/utils/certificateDetector.js`
3. ✅ Teste a visualização e download
4. ✅ Personalize as cores se necessário

## 🎉 Resultado Final

- **Seção de projetos substituída** por certificados
- **Mesmo design visual** dos projetos originais
- **Funcionalidade completa** de preview e download
- **Filtros funcionais** por categoria
- **Design responsivo** para todos os dispositivos

A funcionalidade está **100% pronta para uso**! 🚀 
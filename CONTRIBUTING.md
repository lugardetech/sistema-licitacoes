# 🤝 Guia de Contribuição

## 📋 **Como Contribuir**

### **1. Setup do Ambiente**

```bash
# Clonar o repositório
git clone https://github.com/lugardetech/sistema-licitacoes.git
cd sistema-licitacoes

# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais

# Executar em desenvolvimento
npm run dev
```

### **2. Workflow de Desenvolvimento**

#### **Branches**
- `main`: Código de produção
- `develop`: Código em desenvolvimento
- `feature/nome-da-funcionalidade`: Novas funcionalidades
- `fix/nome-do-bug`: Correções de bugs
- `hotfix/urgente`: Correções críticas

#### **Processo**
1. Criar branch a partir de `develop`
2. Desenvolver a funcionalidade
3. Fazer commit seguindo padrões
4. Abrir Pull Request
5. Review e merge

### **3. Padrões de Commit**

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição

feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de build
```

#### **Exemplos**:
```bash
feat(auth): implementar login com Supabase
fix(dashboard): corrigir erro nos gráficos
docs(readme): atualizar instruções de instalação
```

### **4. Estrutura de Pastas**

```
src/
├── app/                    # Páginas (Next.js App Router)
├── components/
│   ├── ui/                # Componentes base (shadcn/ui)
│   ├── layout/            # Layout components
│   └── modules/           # Componentes específicos
├── lib/                   # Utilitários e configurações
├── types/                 # TypeScript types
└── hooks/                 # React hooks customizados
```

### **5. Padrões de Código**

#### **TypeScript**
- Sempre usar tipos explícitos
- Interfaces para props de componentes
- Enums para constantes

#### **Componentes React**
```typescript
// ✅ Bom
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button 
      className={cn('base-classes', variantClasses[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

#### **Styling**
- Tailwind CSS para estilização
- shadcn/ui para componentes base
- Responsive design sempre

### **6. Testes**

```bash
# Executar testes
npm test

# Executar testes com coverage
npm run test:coverage

# Testes E2E
npm run test:e2e
```

### **7. Issues e Pull Requests**

#### **Issues**
- Use templates quando disponíveis
- Seja específico na descrição
- Adicione labels apropriadas
- Referencie issues relacionadas

#### **Pull Requests**
- Título claro e descritivo
- Descrição detalhada das mudanças
- Screenshots se relevante
- Linkar issues relacionadas
- Aguardar review antes do merge

### **8. Sprints e Planejamento**

Seguimos o plano de sprints documentado em `SPRINT_PLAN.md`:

- **Sprint 1**: Fundação (Supabase + Auth)
- **Sprint 2**: Módulos Core
- **Sprint 3**: Analytics
- **Sprint 4**: UX/Performance
- **Sprint 5**: Deploy

### **9. Code Review**

#### **Checklist do Reviewer**:
- [ ] Código segue padrões estabelecidos
- [ ] Funcionalidade testada
- [ ] Performance adequada
- [ ] Documentação atualizada
- [ ] Sem breaking changes

#### **Checklist do Autor**:
- [ ] Self-review realizado
- [ ] Testes passando
- [ ] ESLint sem erros
- [ ] Build funcionando
- [ ] PR description completa

### **10. Ferramentas de Desenvolvimento**

#### **Recomendadas**:
- **VSCode** com extensões:
  - TypeScript
  - Tailwind CSS IntelliSense
  - ES7+ React snippets
  - GitLens

#### **Configuração VSCode** (`.vscode/settings.json`):
```json
{
  "typescript.preferences.import.moduleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### **11. Deployment**

#### **Ambientes**:
- **Development**: Local (`npm run dev`)
- **Staging**: Vercel Preview
- **Production**: Vercel + domínio customizado

#### **Variáveis de Ambiente**:
Sempre usar `.env.example` como template e nunca commitar secrets.

### **12. Suporte**

- **Issues**: Para bugs e funcionalidades
- **Discussions**: Para dúvidas gerais
- **Email**: suporte@licita-ia.app.br

---

## 🎯 **Objetivos de Qualidade**

- **Performance**: Lighthouse Score > 90
- **Acessibilidade**: WCAG 2.1 AA
- **Test Coverage**: > 80%
- **TypeScript**: Strict mode
- **SEO**: Meta tags otimizadas

Obrigado por contribuir! 🚀
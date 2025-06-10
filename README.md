# Sistema de Gerenciamento de Licitações

Uma aplicação web moderna e completa para gerenciamento de licitações empresariais, desenvolvida com Next.js 15.3 e as mais recentes tecnologias web.

## 🚀 Tecnologias

- **Next.js 15.3** com App Router
- **TypeScript** para type safety
- **Tailwind CSS v4** para estilização
- **shadcn/ui** para componentes de interface
- **Supabase** para banco de dados
- **Recharts** para gráficos
- **React Hook Form** + **Zod** para validação
- **Turbopack** como bundler

## ✨ Funcionalidades

### 📊 Dashboard
- Visão geral das licitações ativas
- KPIs e métricas importantes
- Gráficos de status e performance
- Atividades recentes

### 📝 Gestão de Licitações
- Cadastro completo de licitações
- Controle de modalidades (Pregão, Concorrência, etc.)
- Gerenciamento de status
- Filtros e busca avançada

### 👁️ Acompanhamento
- Timeline detalhada dos processos
- Checklist de documentos
- Sistema de lembretes
- Controle de prazos

### 📁 Documentação
- Upload e organização de documentos
- Controle de validades
- Alertas para documentos vencidos
- Categorização por tipo

### 📈 Relatórios
- Análise de performance
- Relatórios financeiros
- Segmentação por modalidade/órgão
- Exportação para PDF/Excel

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd licitacao
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

4. Execute a aplicação:
```bash
npm run dev
```

Acesse http://localhost:3000

## 📱 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── dashboard/         # Dashboard principal
│   ├── licitacoes/        # Gestão de licitações
│   ├── acompanhamento/    # Acompanhamento de processos
│   ├── documentacao/      # Gestão de documentos
│   └── relatorios/        # Relatórios e análises
├── components/
│   ├── ui/                # Componentes shadcn/ui
│   ├── layout/            # Componentes de layout
│   └── modules/           # Componentes específicos de módulos
├── lib/                   # Utilitários e configurações
└── types/                 # Tipos TypeScript
```

## 🎨 Componentes UI

A aplicação utiliza uma biblioteca completa de componentes reutilizáveis:

- **Forms**: Input, Select, Textarea, Checkbox
- **Layout**: Card, Dialog, Tabs, Badge
- **Navigation**: Button, Dropdown Menu
- **Feedback**: Toast (Sonner), Avatar
- **Data**: Tables, Charts (Recharts)

## 🔧 Scripts Disponíveis

```bash
npm run dev        # Modo desenvolvimento
npm run build      # Build de produção
npm run start      # Executar build
npm run lint       # Verificar código
```

## 📋 Funcionalidades Implementadas

- ✅ Sistema de autenticação (layout)
- ✅ Dashboard com KPIs e gráficos
- ✅ CRUD completo de licitações
- ✅ Sistema de acompanhamento
- ✅ Gestão de documentos
- ✅ Relatórios e análises
- ✅ Interface responsiva
- ✅ Componentes reutilizáveis
- ✅ Validação de formulários
- ✅ Sistema de notificações

## 🚀 Próximos Passos

Para colocar em produção:

1. Configure um projeto no Supabase
2. Configure as variáveis de ambiente
3. Implemente a autenticação real
4. Configure o banco de dados
5. Deploy na Vercel ou outro provedor

## 📄 Licença

Este projeto foi desenvolvido para uso empresarial no gerenciamento de licitações.
# 🚀 Gwan Landing Page - Setup do Projeto

## 📋 Visão Geral

O **Gwan Landing Page** é uma plataforma de cadastro e ativação de usuários em 3 passos, desenvolvida com React.js (frontend) e NestJS (backend), seguindo princípios de Clean Architecture e SOLID.

### 🔐 Processo de Login/Cadastro em 3 Passos

1. **Passo 1 - Cadastro Inicial**
   - Usuário acessa a URL e é redirecionado para a landing page
   - Preenche formulário com: **Nome** e **Contato** (WhatsApp ou Email)
   - Backend recebe e valida os dados

2. **Passo 2 - Ativação por Código**
   - Usuário recebe código de ativação (via WhatsApp/Email)
   - Preenche formulário com: **ID do contato**, **Contato** e **Código de ativação**
   - Backend valida o código e ativa o usuário

3. **Passo 3 - Upload de Imagem**
   - Usuário visualiza interface de upload de imagem
   - Envia imagem através do formulário
   - Backend recebe e armazena a imagem em pasta local

## 🏗️ Arquitetura

### Frontend (React + Material Design)

```
src/
├── modules/                   # Módulos da aplicação
│   ├── auth/                  # Módulo de autenticação (3 passos)
│   │   ├── domain/            # Entidades e regras de negócio
│   │   ├── application/       # Use Cases
│   │   ├── infrastructure/    # Implementações concretas
│   │   └── presentation/      # Componentes React
│   │       ├── Step1Form/     # Formulário de cadastro inicial
│   │       ├── Step2Form/     # Formulário de ativação
│   │       └── Step3Form/     # Formulário de upload
│   ├── contact/               # Módulo de contato
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── portfolio/             # Módulo de portfólio
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
├── shared/                    # Código compartilhado
│   ├── domain/
│   ├── infrastructure/
│   └── presentation/
└── core/                      # Configurações centrais
    ├── config/
    ├── utils/
    └── types/
```

#### Backend (NestJS + TypeScript)

```
src/
├── modules/                 # Módulos da aplicação
│   ├── auth/                # Módulo de autenticação (3 passos)
│   │   ├── domain/          # Entidades e regras de negócio
│   │   │   ├── User.ts      # Entidade de usuário
│   │   │   ├── Contact.ts   # Entidade de contato
│   │   │   └── ActivationCode.ts # Entidade de código
│   │   ├── application/     # Use Cases
│   │   │   ├── CreateContactUseCase.ts
│   │   │   ├── ValidateCodeUseCase.ts
│   │   │   └── UploadImageUseCase.ts
│   │   ├── infrastructure/  # Repositórios e serviços externos
│   │   │   ├── UserRepository.ts
│   │   │   ├── WhatsAppService.ts
│   │   │   └── EmailService.ts
│   │   └── presentation/    # Controllers e DTOs
│   │       ├── AuthController.ts
│   │       ├── Step1Dto.ts
│   │       ├── Step2Dto.ts
│   │       └── Step3Dto.ts
│   ├── contact/             # Módulo de contato
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── portfolio/           # Módulo de portfólio
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
├── shared/                  # Código compartilhado
│   ├── domain/
│   ├── infrastructure/
│   └── presentation/
└── core/                    # Configurações centrais
    ├── config/
    ├── utils/
    └── types/
```

## 🔄 Próximos Passos - Estrutura do Projeto

### Fase 1: Configuração Inicial do Monorepo ✅ CONCLUÍDA

- [x] Criar estrutura de pastas do monorepo
- [x] Configurar package.json raiz com workspaces
- [x] Configurar scripts de desenvolvimento
- [x] Configurar ESLint, Prettier e TypeScript
- [x] Configurar Husky para git hooks

### Fase 2: Setup do Frontend (React + Material Design) ✅ CONCLUÍDA

- [x] Criar aplicação React com TypeScript
- [x] Instalar e configurar Material-UI (MUI)
- [x] Configurar React Router
- [x] Configurar Axios para requisições HTTP
- [x] Configurar React Query para cache
- [x] Criar estrutura de pastas conforme arquitetura
- [x] Configurar Styled Components
- [x] Configurar ambiente de desenvolvimento

### Fase 3: Setup do Backend (NestJS) ✅ CONCLUÍDA

- [x] Criar aplicação NestJS com TypeScript
- [x] Configurar TypeORM para ORM
- [x] Configurar PostgreSQL como banco de dados
- [x] Configurar JWT para autenticação
- [x] Configurar class-validator para validação
- [x] Configurar Swagger para documentação
- [x] Criar estrutura de pastas conforme arquitetura
- [x] Configurar logging estruturado
- [x] Configurar CORS e rate limiting

### Fase 4: Implementação do Módulo de Autenticação (3 Passos)

#### 4.1 - Backend: Entidades e Regras de Negócio

- [ ] Criar entidade `User` com validações
- [ ] Criar entidade `Contact` com validações
- [ ] Criar entidade `ActivationCode` com validações
- [ ] Implementar regras de negócio para geração de códigos
- [ ] Implementar validações de contato (WhatsApp/Email)

#### 4.2 - Backend: Use Cases

- [ ] Implementar `CreateContactUseCase` (Passo 1)
- [ ] Implementar `SendActivationCodeUseCase` (Envio de código)
- [ ] Implementar `ValidateCodeUseCase` (Passo 2)
- [ ] Implementar `UploadImageUseCase` (Passo 3)
- [ ] Implementar tratamento de erros específicos

#### 4.3 - Backend: Infrastructure

- [ ] Implementar `UserRepository` com TypeORM
- [ ] Implementar `ContactRepository` com TypeORM
- [ ] Implementar `WhatsAppService` para envio de códigos
- [ ] Implementar `EmailService` para envio de códigos
- [ ] Implementar `FileUploadService` para imagens
- [ ] Configurar pasta de uploads

#### 4.4 - Backend: Controllers e DTOs

- [ ] Implementar `AuthController` com endpoints dos 3 passos
- [ ] Criar DTOs para validação de entrada:
  - `CreateContactDto` (Passo 1)
  - `ValidateCodeDto` (Passo 2)
  - `UploadImageDto` (Passo 3)
- [ ] Implementar validação de arquivos
- [ ] Implementar respostas padronizadas

#### 4.5 - Frontend: Componentes de Autenticação

- [ ] Criar `Step1Form` - Formulário de cadastro inicial
- [ ] Criar `Step2Form` - Formulário de ativação
- [ ] Criar `Step3Form` - Formulário de upload
- [ ] Implementar validações de formulário
- [ ] Implementar upload de arquivos
- [ ] Implementar feedback visual de progresso

#### 4.6 - Frontend: Integração com Backend

- [ ] Implementar serviços de API para cada passo
- [ ] Implementar tratamento de erros
- [ ] Implementar loading states
- [ ] Implementar navegação entre passos
- [ ] Implementar persistência de dados entre passos

### Fase 5: Configuração de Desenvolvimento

- [ ] Configurar variáveis de ambiente (.env)
- [ ] Configurar scripts de build e deploy
- [ ] Configurar Docker para desenvolvimento
- [ ] Configurar testes unitários e de integração
- [ ] Configurar CI/CD básico

### Fase 6: Implementação de Funcionalidades Adicionais

- [ ] Implementar módulo de contato (landing page)
- [ ] Implementar formulário de contato com validação
- [ ] Implementar serviço de email para contato
- [ ] Implementar landing page responsiva
- [ ] Implementar seções: Hero, Sobre, Serviços, Portfólio, Contato

## 📋 Tecnologias Definidas

### Frontend

- **Framework**: React 18+ com TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Query
- **Styling**: Styled Components
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library
- **File Upload**: React Dropzone

### Backend

- **Framework**: NestJS com TypeScript
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest + Supertest
- **File Upload**: Multer
- **WhatsApp API**: Integração para envio de códigos

### Ferramentas de Desenvolvimento

- **Package Manager**: npm/yarn
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky
- **Version Control**: Git
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## 🎯 Funcionalidades Planejadas

### Sistema de Autenticação (3 Passos)

- [ ] **Passo 1**: Formulário de cadastro com nome e contato
- [ ] **Passo 2**: Validação de código de ativação
- [ ] **Passo 3**: Upload de imagem de perfil
- [ ] Geração automática de códigos de ativação
- [ ] Envio de códigos via WhatsApp/Email
- [ ] Validação de códigos com expiração
- [ ] Armazenamento seguro de imagens

### Landing Page

- [ ] Seção Hero com call-to-action
- [ ] Seção Sobre com informações da empresa
- [ ] Seção Serviços com cards interativos
- [ ] Seção Portfólio com projetos
- [ ] Seção Contato com formulário
- [ ] Header com navegação
- [ ] Footer com links e informações

### Backend API

- [ ] Endpoints para os 3 passos de autenticação
- [ ] Validação de dados de entrada
- [ ] Serviço de email para notificações
- [ ] Serviço de WhatsApp para notificações
- [ ] Upload e armazenamento de imagens
- [ ] Health check endpoints
- [ ] Logging estruturado
- [ ] Rate limiting
- [ ] CORS configurado

## 🔧 Configurações de Ambiente

### Variáveis de Ambiente

```env
# Frontend
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development

# Backend
DATABASE_URL=postgresql://postgres:pazdedeus@gwan.com.br:5433/gwan_vector
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# WhatsApp API (para envio de códigos)
WHATSAPP_API_URL=your-whatsapp-api-url
WHATSAPP_API_TOKEN=your-whatsapp-api-token

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### Scripts de Desenvolvimento

```json
{
  "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
  "dev:frontend": "cd frontend && npm run dev",
  "dev:backend": "cd backend && npm run start:dev",
  "build": "npm run build:frontend && npm run build:backend",
  "test": "npm run test:frontend && npm run test:backend",
  "lint": "npm run lint:frontend && npm run lint:backend"
}
```

## 📝 Checklist de Qualidade

Antes de cada commit:

- [ ] Código segue princípios SOLID
- [ ] Use Cases implementados corretamente
- [ ] Testes passando
- [ ] Linting sem erros
- [ ] Documentação atualizada
- [ ] Performance aceitável
- [ ] Segurança implementada
- [ ] Error handling adequado
- [ ] Validação de arquivos implementada
- [ ] Upload de imagens funcionando

## 🚀 Estratégia de Deploy

### Desenvolvimento

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- Banco: PostgreSQL local
- Uploads: Pasta local

### Produção

- Frontend: Vercel/Netlify
- Backend: Railway/Heroku
- Banco: PostgreSQL na nuvem
- Uploads: AWS S3/Cloudinary

---

**Status Atual**: ✅ Fases 1-3 CONCLUÍDAS - Monorepo, Frontend e Backend configurados
**Próximo Passo**: Implementar módulo de autenticação em 3 passos

Gostaria que eu prossiga com a implementação do módulo de autenticação seguindo este plano?

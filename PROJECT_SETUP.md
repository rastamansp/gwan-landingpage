# 🚀 Gwan Landing Page - Setup do Projeto

## 📋 Visão Geral

O **Gwan Landing Page** é uma plataforma de autenticação e upload de imagens com dois fluxos de acesso, desenvolvida com React.js (frontend) e NestJS (backend), seguindo princípios de Clean Architecture e SOLID.

### 🔐 Fluxos de Autenticação

#### **1. Login Rápido (Usuários Cadastrados)**
- Usuário acessa a landing page e escolhe "Já tenho conta"
- Preenche **Email ou WhatsApp** (identificação automática)
- Recebe **código de 6 dígitos** via email/SMS
- Valida o código e acessa a área de upload

#### **2. Cadastro (Novos Usuários)**
- Usuário escolhe "Quero me cadastrar"
- **Passo 1**: Preenche **Nome**, **Email** e **Telefone**
- **Passo 2**: Recebe **código de ativação de 6 dígitos** via email/SMS
- Valida o código e acessa a área de upload

### 🖼️ Funcionalidade Principal - Upload de Imagem

Após autenticação (login ou cadastro), o usuário é direcionado para a **área de upload de imagem**, que é a funcionalidade principal da plataforma.

## 🏗️ Arquitetura

### Frontend (React + Material Design)

```
src/
├── modules/                   # Módulos da aplicação
│   ├── auth/                  # Módulo de autenticação (login/cadastro)
│   │   ├── domain/            # Entidades e regras de negócio
│   │   ├── application/       # Use Cases
│   │   ├── infrastructure/    # Implementações concretas
│   │   └── presentation/      # Componentes React
│   │       ├── LoginForm/     # Formulário de login
│   │       ├── RegisterForm/  # Formulário de cadastro
│   │       └── AuthWizard/    # Wizard de cadastro (2 passos)
│   ├── upload/                # Módulo de upload de imagem
│   │   ├── domain/            # Entidades e regras de negócio
│   │   ├── application/       # Use Cases
│   │   ├── infrastructure/    # Implementações concretas
│   │   └── presentation/      # Componentes React
│   │       └── UploadArea/    # Área de upload de imagem
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
│   ├── auth/                # Módulo de autenticação (login/cadastro)
│   │   ├── domain/          # Entidades e regras de negócio
│   │   │   ├── User.ts      # Entidade de usuário
│   │   │   ├── Contact.ts   # Entidade de contato
│   │   │   └── ActivationCode.ts # Entidade de código
│   │   ├── application/     # Use Cases
│   │   │   ├── LoginRequestUseCase.ts
│   │   │   ├── LoginValidateUseCase.ts
│   │   │   ├── RegisterUserUseCase.ts
│   │   │   └── ActivateUserUseCase.ts
│   │   ├── infrastructure/  # Repositórios e serviços externos
│   │   │   ├── UserRepository.ts
│   │   │   ├── WhatsAppService.ts
│   │   │   └── EmailService.ts
│   │   └── presentation/    # Controllers e DTOs
│   │       ├── AuthController.ts
│   │       ├── LoginDto.ts
│   │       ├── RegisterDto.ts
│   │       └── ActivateDto.ts
│   ├── upload/              # Módulo de upload de imagem
│   │   ├── domain/          # Entidades e regras de negócio
│   │   ├── application/     # Use Cases
│   │   ├── infrastructure/  # Repositórios e serviços externos
│   │   └── presentation/    # Controllers e DTOs
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

### Fase 4: Implementação do Sistema de Autenticação

#### 4.1 - Backend: Entidades e Regras de Negócio

- [ ] Criar entidade `User` com validações
- [ ] Criar entidade `Contact` com validações
- [ ] Criar entidade `ActivationCode` com validações
- [ ] Implementar regras de negócio para geração de códigos
- [ ] Implementar validações de contato (WhatsApp/Email)

#### 4.2 - Backend: Use Cases de Autenticação

- [ ] Implementar `LoginRequestUseCase` (Solicitar código de login)
- [ ] Implementar `LoginValidateUseCase` (Validar código de login)
- [ ] Implementar `RegisterUserUseCase` (Cadastro de usuário)
- [ ] Implementar `ActivateUserUseCase` (Ativação de usuário)
- [ ] Implementar tratamento de erros específicos

#### 4.3 - Backend: Infrastructure

- [ ] Implementar `UserRepository` com TypeORM
- [ ] Implementar `ContactRepository` com TypeORM
- [ ] Implementar `WhatsAppService` para envio de códigos
- [ ] Implementar `EmailService` para envio de códigos
- [ ] Configurar pasta de uploads

#### 4.4 - Backend: Controllers e DTOs

- [ ] Implementar `AuthController` com endpoints de login e cadastro
- [ ] Criar DTOs para validação de entrada:
  - `LoginRequestDto` (Solicitar código de login)
  - `LoginValidateDto` (Validar código de login)
  - `RegisterUserDto` (Cadastro de usuário)
  - `ActivateUserDto` (Ativação de usuário)
- [ ] Implementar respostas padronizadas

#### 4.5 - Frontend: Componentes de Autenticação

- [ ] Criar `LandingPage` - Tela inicial com opções
- [ ] Criar `LoginForm` - Formulário de login rápido
- [ ] Criar `RegisterWizard` - Wizard de cadastro (2 passos)
- [ ] Implementar validações de formulário
- [ ] Implementar feedback visual de progresso

#### 4.6 - Frontend: Integração com Backend

- [ ] Implementar serviços de API para login e cadastro
- [ ] Implementar tratamento de erros
- [ ] Implementar loading states
- [ ] Implementar navegação entre telas
- [ ] Implementar persistência de dados

### Fase 5: Implementação do Módulo de Upload

#### 5.1 - Backend: Use Cases de Upload

- [ ] Implementar `UploadImageUseCase` (Upload de imagem)
- [ ] Implementar validações de arquivo
- [ ] Implementar armazenamento de imagem

#### 5.2 - Backend: Infrastructure de Upload

- [ ] Implementar `FileUploadService` para imagens
- [ ] Configurar pasta de uploads
- [ ] Implementar validações de tipo e tamanho

#### 5.3 - Backend: Controllers de Upload

- [ ] Implementar `UploadController` com endpoint de upload
- [ ] Criar DTOs para upload de imagem
- [ ] Implementar validação de arquivos

#### 5.4 - Frontend: Componentes de Upload

- [ ] Criar `UploadArea` - Área principal de upload
- [ ] Implementar upload de arquivos
- [ ] Implementar preview de imagem
- [ ] Implementar feedback de upload

### Fase 6: Configuração de Desenvolvimento

- [ ] Configurar variáveis de ambiente (.env)
- [ ] Configurar scripts de build e deploy
- [ ] Configurar Docker para desenvolvimento
- [ ] Configurar testes unitários e de integração
- [ ] Configurar CI/CD básico

### Fase 7: Implementação de Funcionalidades Adicionais

- [ ] Implementar módulo de contato (landing page)
- [ ] Implementar formulário de contato com validação

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

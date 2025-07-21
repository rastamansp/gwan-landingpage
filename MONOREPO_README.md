# Gwan Landing Page - Monorepo

## 📋 Visão Geral

Este é um **monorepo** que contém toda a aplicação Gwan Landing Page:

- **Frontend**: React + TypeScript + Material-UI
- **Backend**: NestJS + TypeScript + PostgreSQL
- **Shared**: Código compartilhado entre frontend e backend
- **Docker**: Configuração completa com PostgreSQL, Redis, MinIO

## 🏗️ Estrutura do Projeto

```
gwan-landingpage/
├── frontend/          # React App (@gwan/frontend)
├── backend/           # NestJS API (@gwan/backend)
├── shared/            # Código compartilhado (@gwan/shared)
├── docker/            # Configurações Docker
├── scripts/           # Scripts de automação
├── docker-compose.yml # Orquestração Docker
└── package.json       # Root workspace
```

## 🚀 Setup Inicial

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker e Docker Compose
- Git

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd gwan-landingpage
```

2. **Instale todas as dependências**

```bash
npm run install:all
```

3. **Configure as variáveis de ambiente**

```bash
cp backend/env.example backend/.env
# Edite backend/.env com suas configurações
```

4. **Inicie os serviços Docker**

```bash
docker-compose up -d db redis minio
```

5. **Execute as migrações do banco**

```bash
cd backend
npm run migration:run
```

## 🛠️ Comandos de Desenvolvimento

### Desenvolvimento Completo

```bash
# Inicia frontend e backend simultaneamente
npm run dev
```

### Desenvolvimento Individual

```bash
# Apenas frontend
npm run dev:frontend

# Apenas backend
npm run dev:backend
```

### Build e Testes

```bash
# Build completo
npm run build

# Testes completos
npm run test

# Lint completo
npm run lint
```

### Docker

```bash
# Desenvolvimento com Docker
docker-compose up

# Produção com Docker
docker-compose -f docker-compose.prod.yml up

# Parar todos os serviços
docker-compose down
```

## 📦 Workspaces

### Frontend (@gwan/frontend)

- **Tecnologia**: React + TypeScript + Material-UI
- **Porta**: 3000 (desenvolvimento)
- **Build**: `npm run build`
- **Testes**: `npm run test`

### Backend (@gwan/backend)

- **Tecnologia**: NestJS + TypeScript + PostgreSQL
- **Porta**: 3001
- **Build**: `npm run build`
- **Testes**: `npm run test`

### Shared (@gwan/shared)

- **Propósito**: Código compartilhado entre frontend e backend
- **Conteúdo**: Tipos, constantes, utilitários
- **Build**: `npm run build`

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (Backend)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5433/gwan_db
POSTGRES_DB=gwan_db
POSTGRES_USER=gwan_user
POSTGRES_PASSWORD=gwan_password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# MinIO
MINIO_ENDPOINT=localhost
MINIO_BUCKET=gwan-uploads
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

### Variáveis de Ambiente (Frontend)

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
REACT_APP_NAME=GWAN Landing Page
```

## 🧪 Testes

### Executar Todos os Testes

```bash
npm run test
```

### Testes Individuais

```bash
# Frontend apenas
npm run test:frontend

# Backend apenas
npm run test:backend
```

### Cobertura de Testes

```bash
# Frontend
cd frontend && npm run test:coverage

# Backend
cd backend && npm run test:cov
```

## 🚀 Deploy

### Desenvolvimento

```bash
# Inicia todos os serviços
docker-compose up

# Apenas infraestrutura
docker-compose up db redis minio
```

### Produção

```bash
# Build e deploy completo
docker-compose -f docker-compose.prod.yml up --build
```

### Staging

```bash
# Teste de produção
docker-compose -f docker-compose.prod.test.yml up --build
```

## 📚 Documentação

- **Regras do Cursor**: `MONOREPO_RULES.md`
- **Padrões de API**: `backend/API_STANDARDS.md`
- **Setup do Ambiente**: `ENVIRONMENT_SETUP.md`
- **Docker**: `DOCKER_ENV_SUMMARY.md`

## 🔍 Monitoramento

### Logs

```bash
# Todos os serviços
docker-compose logs -f

# Serviço específico
docker-compose logs -f backend
```

### Health Checks

- **Backend**: `http://localhost:3001/health`
- **Frontend**: `http://localhost:3000`
- **MinIO Console**: `http://localhost:9001`

## 🐛 Troubleshooting

### Problemas Comuns

1. **Porta já em uso**

```bash
# Verifique processos
lsof -i :3000
lsof -i :3001

# Mate o processo
kill -9 <PID>
```

2. **Dependências desatualizadas**

```bash
# Limpe e reinstale
npm run clean
npm run install:all
```

3. **Banco de dados não conecta**

```bash
# Reinicie os serviços Docker
docker-compose down
docker-compose up -d db redis minio
```

4. **Build falha**

```bash
# Limpe cache
rm -rf node_modules
npm run install:all
npm run build
```

## 🤝 Contribuição

### Fluxo de Trabalho

1. **Crie uma branch**

```bash
git checkout -b feature/nova-funcionalidade
```

2. **Desenvolva e teste**

```bash
npm run dev
npm run test
npm run lint
```

3. **Commit seguindo padrões**

```bash
git commit -m "feat: implementa nova funcionalidade"
```

4. **Push e Pull Request**

```bash
git push origin feature/nova-funcionalidade
```

### Regras de Commit

- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Mensagens em português
- Descreva claramente a mudança

### Checklist de Qualidade

Antes de commitar:

- [ ] Código segue princípios SOLID
- [ ] Use Cases implementados corretamente
- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem erros
- [ ] `npm run dev` roda sem problemas
- [ ] `npm run test` - TODOS os testes passando
- [ ] Cobertura de testes acima de 80%
- [ ] Documentação atualizada
- [ ] Performance aceitável
- [ ] Segurança implementada
- [ ] Error handling adequado

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 👥 Equipe

- **Desenvolvimento**: Gwan Team
- **Arquitetura**: Clean Architecture + SOLID Principles
- **Tecnologias**: React, NestJS, TypeScript, PostgreSQL, Docker

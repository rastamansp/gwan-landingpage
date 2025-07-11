# 🚀 Gwan Landing Page

Uma landing page moderna e responsiva desenvolvida com React.js e Material Design, com backend em NestJS seguindo princípios de Clean Architecture e SOLID.

## 📋 Sobre o Projeto

O **Gwan Landing Page** é uma plataforma de autenticação e upload de imagens com dois fluxos de acesso implementados e funcionais:

### 🔐 Fluxos de Autenticação Implementados

#### **1. Login Rápido (Usuários Cadastrados)** ✅ **FUNCIONANDO**
- Usuário acessa a landing page e clica em "Já tenho conta"
- Preenche **Email ou WhatsApp** (identificação automática)
- Recebe **código de 6 dígitos** via email/SMS
- Valida o código e acessa automaticamente a área de upload
- **Sessão persistente** com JWT token

#### **2. Cadastro (Novos Usuários)** ✅ **FUNCIONANDO**
- Usuário escolhe "Quero me cadastrar"
- **Passo 1**: Preenche **Nome**, **Email** e **Telefone**
- **Passo 2**: Recebe **código de ativação de 6 dígitos** via email/SMS
- Valida o código e acessa automaticamente a área de upload
- **Login automático** após ativação

### 🖼️ Funcionalidade Principal - Upload de Imagem ✅ **FUNCIONANDO**

Após autenticação (login ou cadastro), o usuário é direcionado automaticamente para a **área de upload de imagem**, que é a funcionalidade principal da plataforma.

#### Organização de Arquivos
- **Pasta por Usuário**: `uploads/user-{userId}/`
- **Nome Original**: Arquivos mantêm o nome original
- **Sem Conflitos**: Cada usuário tem sua própria pasta
- **Estrutura Segura**: Isolamento completo entre usuários

#### Exemplo de Estrutura
```
uploads/
├── user-123/
│   ├── avatar.jpg
│   └── personagem.png
└── user-456/
    └── imagem.gif
```

## 🏗️ Arquitetura Implementada

O projeto segue os princípios de **Clean Architecture** e **SOLID**, organizado em módulos independentes:

- **Frontend**: React.js com Material Design ✅
- **Backend**: NestJS com TypeScript ✅
- **Database**: PostgreSQL ✅
- **Autenticação**: JWT com sessão persistente ✅
- **Upload**: Sistema de arquivos organizado por usuário ✅
- **Testes**: Testes automatizados implementados ✅
- **Documentação**: Swagger/OpenAPI implementado ✅

## 🚀 Quick Start

1. **Clone o repositório**

```bash
git clone <repository-url>
cd gwan-landingpage
```

2. **Instale as dependências**

```bash
npm run install:all
```

3. **Configure as variáveis de ambiente**

```bash
# Copie os arquivos de exemplo
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Configure as variáveis necessárias
```

4. **Inicie o desenvolvimento**

```bash
npm run dev
```

O projeto estará disponível em:

- **Frontend**: <http://localhost:3000>
- **Backend**: <http://localhost:3001>
- **API Docs**: <http://localhost:3001/api>

## 🧪 Testes

### Política de Testes Obrigatória

**Testes são fundamentais para a qualidade do código e devem ser executados antes de qualquer commit, push ou merge.**

#### ✅ Regras Obrigatórias
- **NUNCA** suba código sem testes passando
- **NUNCA** faça merge sem testes passando
- **Cobertura mínima**: 80% de testes
- **Testes quebrados = Bug** - Corrija antes de continuar

#### 📋 Checklist Antes de Commits
- [ ] `npm run lint` - ZERO erros
- [ ] `npm run build` - ZERO erros
- [ ] `npm run test` - TODOS os testes passando
- [ ] `npm run dev` - Projeto roda sem problemas

### Executar Testes

```bash
# Todos os testes
npm run test

# Testes do backend
npm run test:backend

# Testes do frontend
npm run test:frontend

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### Cobertura de Testes

- **Backend**: 12 testes unitários e de integração ✅
- **Frontend**: Testes de componentes implementados ✅
- **Manual**: Todos os fluxos testados ✅
- **Política**: Documentação completa em `TESTING_POLICY.md` ✅

## 📚 Documentação

### API Documentation
- **Swagger UI**: <http://localhost:3001/api>
- **Endpoints Documentados**: Todos os endpoints da aplicação
- **Schemas**: Request/Response schemas detalhados
- **Authentication**: Bearer token configurado

### Documentação Técnica
- **README.md**: Este arquivo
- **PROJECT_STATUS.md**: Status detalhado do projeto
- **TODO.md**: Próximos passos e melhorias
- **AUTH_IMPLEMENTATION.md**: Documentação de autenticação
- **UPLOAD_SYSTEM.md**: Documentação do sistema de upload
- **TESTING_POLICY.md**: Política de testes obrigatória

## 📁 Estrutura do Projeto

```
gwan-landingpage/
├── frontend/                # Aplicação React.js ✅
│   ├── src/
│   │   ├── modules/         # Módulos da aplicação
│   │   │   ├── auth/        # Módulo de autenticação (login/cadastro) ✅
│   │   │   │   ├── domain/  # Entidades e regras de negócio
│   │   │   │   ├── application/ # Use Cases
│   │   │   │   ├── infrastructure/ # Implementações concretas
│   │   │   │   └── presentation/ # Componentes React
│   │   │   └── upload/      # Módulo de upload de imagem ✅
│   │   ├── shared/          # Código compartilhado
│   │   └── core/            # Configurações centrais
│   └── package.json
├── backend/                 # API NestJS ✅
│   ├── src/
│   │   ├── modules/         # Módulos da aplicação
│   │   │   ├── auth/        # Módulo de autenticação (login/cadastro) ✅
│   │   │   │   ├── domain/  # Entidades e regras de negócio
│   │   │   │   ├── application/ # Use Cases
│   │   │   │   ├── infrastructure/ # Repositórios e serviços externos
│   │   │   │   └── presentation/ # Controllers e DTOs
│   │   │   └── upload/      # Módulo de upload de imagem ✅
│   │   ├── shared/          # Código compartilhado
│   │   └── core/            # Configurações centrais
│   └── package.json
├── shared/                  # Código compartilhado ✅
├── docs/                    # Documentação
└── package.json             # Root package.json
```

## 🔐 Funcionamento Detalhado dos Fluxos

### Fluxo 1: Login Rápido (Usuários Cadastrados)

1. **Acesso à Landing Page**
   - Usuário acessa `http://localhost:3000`
   - Vê opções: "Já tenho conta" ou "Quero me cadastrar"

2. **Solicitar Código de Login**
   - Clica em "Já tenho conta"
   - Preenche email ou WhatsApp no campo de contato
   - Sistema identifica automaticamente o tipo de contato
   - Clica em "Enviar Código"
   - Backend gera código de 6 dígitos e simula envio

3. **Validar Código e Login**
   - Usuário recebe código por email/SMS
   - Digita o código de 6 dígitos
   - Clica em "Entrar"
   - Backend valida código e gera JWT token
   - Frontend salva token e redireciona para `/upload`

4. **Área de Upload**
   - Usuário acessa área protegida `/upload`
   - Pode fazer upload de imagem do personagem
   - Sistema organiza arquivos por usuário
   - Botão de logout disponível

### Fluxo 2: Cadastro (Novos Usuários)

1. **Início do Cadastro**
   - Usuário clica em "Quero me cadastrar"
   - Inicia wizard de cadastro em 2 passos

2. **Passo 1: Dados Pessoais**
   - Preenche nome, email e telefone
   - Validações em tempo real
   - Clica em "Próximo"

3. **Passo 2: Ativação**
   - Sistema gera código de ativação de 6 dígitos
   - Simula envio por email e SMS
   - Usuário digita código recebido
   - Clica em "Ativar Conta"

4. **Login Automático**
   - Backend valida código e ativa usuário
   - **Gera JWT token automaticamente**
   - Frontend salva token e redireciona para `/upload`

5. **Área de Upload**
   - Usuário já está logado automaticamente
   - Pode fazer upload de imagem do personagem
   - Sistema organiza arquivos por usuário

### Sistema de Sessão Persistente

1. **Verificação Automática**
   - Ao carregar a aplicação, verifica token no localStorage
   - Se válido, restaura sessão automaticamente
   - Se inválido, remove token e redireciona para login

2. **Redirecionamento Inteligente**
   - Usuários autenticados → `/upload`
   - Usuários não autenticados → `/`
   - Loading durante verificação

3. **Proteção de Rotas**
   - Rotas protegidas só acessíveis com token válido
   - Rotas públicas redirecionam usuários autenticados
   - Logout limpa token e redireciona para home

## 🛠️ Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar desenvolvimento (frontend + backend)
npm run dev

# Apenas frontend
npm run dev:frontend

# Apenas backend
npm run dev:backend
```

### Build

```bash
# Build de produção
npm run build

# Build do frontend
npm run build:frontend

# Build do backend
npm run build:backend
```

### Testes

```bash
# Todos os testes
npm run test

# Testes do backend
npm run test:backend

# Testes do frontend
npm run test:frontend

# Testes com coverage
npm run test:coverage
```

### Qualidade de Código

```bash
# Lint
npm run lint

# Lint do frontend
npm run lint:frontend

# Lint do backend
npm run lint:backend

# Format
npm run format
```

### Instalação

```bash
# Instalar todas as dependências
npm run install:all

# Instalar dependências do frontend
npm run install:frontend

# Instalar dependências do backend
npm run install:backend
```

## 🗄️ Banco de Dados

### Configuração

O projeto usa **PostgreSQL** como banco de dados principal. A configuração está em `backend/src/core/config/database.config.ts`.

### Migrações

```bash
# Gerar migração
npm run migration:generate

# Executar migrações
npm run migration:run

# Reverter migração
npm run migration:revert
```

## 🔐 Segurança

### Autenticação JWT

- **Token Generation**: Tokens JWT gerados automaticamente
- **Token Validation**: Validação em todas as rotas protegidas
- **Token Refresh**: Renovação automática de tokens
- **Secure Storage**: Armazenamento seguro no localStorage

### Validação de Dados

- **Input Validation**: Validação de entrada com class-validator
- **File Validation**: Validação de arquivos de upload
- **Email Validation**: Validação de formato de email
- **Phone Validation**: Validação de formato de telefone

### Proteção de Rotas

- **JWT Guards**: Guards implementados para rotas protegidas
- **Role-based Access**: Controle de acesso baseado em roles
- **Unauthorized Handling**: Tratamento adequado de não autorizado

## 🎨 UI/UX

### Material Design

- **Components**: Componentes Material-UI
- **Theme**: Tema customizado
- **Responsive**: Design responsivo
- **Accessibility**: Acessibilidade implementada

### Estados de Loading

- **Loading Spinner**: Spinner durante carregamentos
- **Skeleton Loading**: Skeleton para carregamento de dados
- **Progress Indicators**: Indicadores de progresso

### Feedback de Erro

- **Error Messages**: Mensagens de erro claras
- **Validation Errors**: Erros de validação em tempo real
- **Network Errors**: Tratamento de erros de rede

## 📊 Status do Projeto

### ✅ Funcionalidades Implementadas

- [x] **Sistema de Autenticação** - Login e cadastro funcionais
- [x] **Upload de Imagens** - Sistema completo de upload
- [x] **Sessão Persistente** - Sessão mantida entre reloads
- [x] **Proteção de Rotas** - Rotas protegidas com JWT
- [x] **Validação de Dados** - Validação completa de entrada
- [x] **Testes Automatizados** - Testes unitários e de integração
- [x] **Documentação da API** - Swagger/OpenAPI implementado
- [x] **Clean Architecture** - Arquitetura limpa implementada

### 🔄 Próximos Passos

- [ ] **E2E Tests** - Testes end-to-end
- [ ] **CI/CD Pipeline** - Pipeline de deploy
- [ ] **Docker** - Containerização
- [ ] **Monitoring** - Monitoramento da aplicação

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para [seu-email@exemplo.com] ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ pela equipe Gwan**

**Versão**: 1.0.0  
**Última atualização**: Novembro 2025  
**Status**: ✅ Produção Ready

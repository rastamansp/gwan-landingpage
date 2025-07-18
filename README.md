# Gwan Landing Page - Análise de Personagens com IA

Sistema de landing page da Gwan com **análise avançada de personagens usando Inteligência Artificial**. O projeto permite que usuários façam upload de imagens de personagens e recebam análises detalhadas e estruturadas usando GPT-4 Vision.

## 🎯 Funcionalidade Principal

### 🤖 Análise de Personagens com IA

- **Upload de Imagens**: Sistema completo de upload organizado por usuário
- **Análise com GPT-4 Vision**: Processamento de imagens usando OpenAI
- **Ficha Detalhada**: Análise estruturada com 9 categorias principais:
  - **Identidade** (Nome, Gênero, Idade, Nacionalidade)
  - **Corpo e Postura** (Altura, Corpo, Cintura, Postura)
  - **Rosto e Pele** (Formato, Testa, Maçãs, Queixo, Nariz, Lábios, Expressão)
  - **Olhos e Maquiagem** (Tamanho, Formato, Cor, Cílios, Maquiagem, Sobrancelhas)
  - **Cabelo** (Corte, Comprimento, Divisão, Textura, Cor, Finalização)
  - **Vestuário** (Marca, Modelo, Cor, Tecido, Caimento, Comprimento, Decote, Detalhes, Fecho)
  - **Calçado** (Marca, Modelo, Cor, Salto, Bico, Estilo)
  - **Acessórios** (Brincos, Anel, Pescoço, Pulsos, Unhas)
  - **Estilo Fotográfico** (Estilo, Enquadramento, Câmera simulada, Abertura, ISO, Iluminação, Textura, Aparência)

### 🔐 Sistema de Autenticação Completo

- **Login Rápido**: Solicitar código → Validar código → JWT token → Redirecionamento
- **Cadastro em 2passos**: Registro → Ativação → Login automático
- **Sessão persistente**: Token no localStorage com fallback para cookies
- **Proteção de rotas**: JWT Guards implementados

### 🖼️ Sistema de Upload Organizado

- **Upload por usuário**: Pasta `uploads/user-{userId}/` para cada usuário
- **Nome original preservado**: Arquivos mantêm nome original
- **Validação de arquivos**: JPG, JPEG, PNG, GIF até 20- **URL de retorno**: Sistema retorna URL da imagem para uso futuro
- **Imagem atual exibida**: Carrega automaticamente a imagem existente do usuário
- **Atualização automática**: `profileImageUrl` do usuário é atualizada a cada upload

## 🏗️ Arquitetura

### Clean Architecture

- **Domain Layer**: Entidades com regras de negócio
- **Application Layer**: Use Cases implementados
- **Infrastructure Layer**: Repositórios e serviços (incluindo OpenAI)
- **Presentation Layer**: Controllers e componentes React

### Tecnologias

- **Backend**: NestJS com TypeScript
- **Frontend**: React com TypeScript
- **IA**: OpenAI GPT-4ision
- **Banco**: PostgreSQL com TypeORM
- **Autenticação**: JWT com Passport
- **Storage**: MinIO para armazenamento de imagens

## 🗂️ Estrutura Monorepo

Este projeto segue o padrão **monorepo**:

- O arquivo `package.json` e `package-lock.json` ficam na **raiz** do projeto.
- Os diretórios `frontend/` e `backend/` contêm, respectivamente, o código do React e do NestJS.
- O gerenciamento de dependências é centralizado na raiz, usando **workspaces do npm**.

## 🚀 Rodando com Docker Compose

O projeto já está pronto para ser executado via Docker Compose, tanto em ambiente local quanto produção.

### Pré-requisitos

- Docker e Docker Compose instalados
- Variáveis de ambiente configuradas (veja seção de configuração acima)

### 🐳 Deploy com Docker

1. **Configure as variáveis de ambiente:**

   ```bash
   ./scripts/setup-env.sh
   # Edite o arquivo .env com suas configurações
   ```

2. **Suba todos os serviços:**

   ```bash
   docker-compose up -d
   ```

3. **Acesse:**
   - Frontend: <http://localhost:3000>
   - Backend/API: <http://localhost:3001>
   - MinIO Console: <http://localhost:9001>
   - PostgreSQL: localhost:5433
   - Redis: localhost:6379

### 🔍 Verificar Status

```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend

# Ver status dos containers
docker-compose ps
```

### 🛑 Parar Serviços

```bash
# Parar todos os serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

### 🏭 Deploy em Produção

Para deploy em produção, use o arquivo `docker-compose.prod.yml`:

```bash
# Build para produção
docker-compose -f docker-compose.prod.yml build

# Deploy em produção
docker-compose -f docker-compose.prod.yml up -d
```

### 📋 Serviços Incluídos

- **Frontend**: React app servido por Nginx
- **Backend**: NestJS API
- **PostgreSQL**: Banco de dados principal
- **Redis**: Cache e sessões
- **MinIO**: Armazenamento de imagens
- **Rede**: `gwan_network` isolada

## 📋 Use Cases Implementados

### 🔐 Autenticação

#### Backend Use Cases

- ✅ **RegisterUserUseCase**: Cadastro de usuário com validações
- ✅ **ActivateUserUseCase**: Ativação de usuário com código
- ✅ **LoginRequestUseCase**: Solicitação de código de login
- ✅ **LoginValidateUseCase**: Validação de código de login

#### Frontend Use Cases

- ✅ **RegisterUserUseCase**: Cadastro de usuário no frontend
- ✅ **ActivateUserUseCase**: Ativação de usuário no frontend
- ✅ **ProcessCharacterImageUseCase**: Processamento de imagem com IA

### 🖼️ Upload e Processamento

#### Backend Use Cases

- ✅ **UploadCharacterImageUseCase**: Upload de imagem de personagem
- ✅ **ProcessCharacterImageUseCase**: Processamento com GPT-4sion
- ✅ **GetUserImageUseCase**: Buscar imagem atual do usuário

#### Frontend Use Cases

- ✅ **ProcessCharacterImageUseCase**: Integração com backend para processamento

### 📊 Funcionalidades por Use Case

#### RegisterUserUseCase

- **Input**: Nome, email, telefone
- **Output**: userId, activationCode
- **Validações**: Email, telefone, nome
- **Regras de negócio**: Geração de código de ativação

#### ActivateUserUseCase

- **Input**: userId, activationCode
- **Output**: Token JWT, dados do usuário
- **Validações**: Código válido e não expirado
- **Regras de negócio**: Ativação de conta

#### LoginRequestUseCase

- **Input**: Email ou telefone
- **Output**: Código de login enviado
- **Validações**: Contato existente
- **Regras de negócio**: Geração de código de login

#### LoginValidateUseCase

- **Input**: Código de login
- **Output**: Token JWT, dados do usuário
- **Validações**: Código válido
- **Regras de negócio**: Autenticação

#### UploadCharacterImageUseCase

- **Input**: userId, imageFile
- **Output**: imageUrl, sucesso/erro
- **Validações**: Tipo de arquivo, tamanho (20
- **Regras de negócio**: Upload para MinIO, atualização de personagem e usuário

#### ProcessCharacterImageUseCase

- **Input**: userId
- **Output**: Análise completa com9categorias
- **Validações**: Usuário autenticado, imagem existente
- **Regras de negócio**: Processamento com GPT-4sion

#### GetUserImageUseCase

- **Input**: userId
- **Output**: imageUrl atual do usuário
- **Validações**: Usuário autenticado
- **Regras de negócio**: Busca de imagem atual

## 📋 Requisitos do Sistema

### Versões Recomendadas

- **Node.js**: `220.140` ou superior (LTS)
- **npm**: `11.4.2` ou superior
- **NestJS**: `10.x`
- **React**: `18.x`
- **TypeScript**: `4.9.x`

### Configuração com NVM (Recomendado)

```bash
# Instalar Node.js 220.140
nvm install 22140
nvm use 220.14

# Verificar versão
node --version  # v22.140
npm --version   # 11.40.2
```

### Configuração Manual

Se não usar NVM, baixe diretamente do [nodejs.org](https://nodejs.org/):

- **Versão LTS**: 22.140ou superior
- **Arquitetura**: 64## Compatibilidade

- ✅ **Node.js 22 Totalmente compatível
- ✅ **Node.js 20.17.0**: Compatível
- ⚠️ **Node.js 20.120.2**: Funciona com `--legacy-peer-deps`
- ❌ **Node.js < 20.170*: Não recomendado

### 🔧 Troubleshooting de Versões

#### Problema: "npm does not support Node.js v20.122

**Solução:**

```bash
# Opção 1: Usar versão compatível
nvm use 22.140 Opção 2: Instalar com flag legacy
npm install --legacy-peer-deps

# Opção3 Atualizar npm
npm install -g npm@latest
```

#### Problema: Invalid hook call" no React

**Solução:**

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### Problema: "Cannot find module" no backend

**Solução:**

```bash
cd backend
npm install @nestjs/jwt @nestjs/passport passport-jwt reflect-metadata openai
```

### 📦 Instalação de Dependências

#### Frontend

```bash
cd frontend
npm install --legacy-peer-deps
```

#### Backend

```bash
cd backend
npm install
```

#### Shared

```bash
cd shared
npm install
```

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
# Opção 1: Usar o script automático
./scripts/setup-env.sh

# Opção 2: Configuração manual
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 🔧 Variáveis de Ambiente Obrigatórias

O projeto usa um arquivo `.env` centralizado na raiz. Configure as seguintes variáveis:

#### 🔑 Variáveis Críticas (Obrigatórias)

```bash
# OpenAI API Key (para análise de personagens)
OPENAI_API_KEY=sk-proj-sua-chave-aqui

# JWT Secret (para autenticação)
JWT_SECRET=seu-jwt-secret-aqui

# MinIO (para upload de imagens)
MINIO_ACCESS_KEY=sua-access-key
MINIO_SECRET_KEY=sua-secret-key
```

#### 📧 Variáveis de Email (Opcionais)

```bash
# Para envio de códigos por email
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha
```

#### 📱 Variáveis WhatsApp (Opcionais)

```bash
# Para envio de códigos por WhatsApp
WHATSAPP_API_URL=sua-api-url
WHATSAPP_API_TOKEN=seu-token
```

### 🚀 Configuração Rápida

1. **Execute o script de setup:**

```bash
./scripts/setup-env.sh
```

2. **Edite o arquivo .env:**

```bash
nano .env
# ou
code .env
```

3. **Configure pelo menos:**

- `OPENAI_API_KEY`: Sua chave da OpenAI
- `JWT_SECRET`: Uma string secreta para JWT
- `MINIO_ACCESS_KEY` e `MINIO_SECRET_KEY`: Credenciais do MinIO

4. **Inicie o desenvolvimento**

```bash
npm run dev
```

O projeto estará disponível em:

- **Frontend**: <http://localhost:300>
- **Backend**: <<http://localhost:3001>
- **API Docs**: <http://localhost:3001/api>

## 🤖 Configuração da IA

### OpenAI API Key

Para usar a funcionalidade de análise de personagens, configure sua chave da OpenAI:

```bash
# No arquivo backend/.env
OPENAI_API_KEY=sk-proj-sua-chave-aqui
```

### Funcionalidades da IA

- **Análise Visual**: GPT-4 Vision analisa imagens de personagens
- **Ficha Estruturada**: Gera ficha detalhada em formato JSON
- **Múltiplas Categorias**: 9 categorias principais de análise
- **Tratamento de Erros**: Fallback e tratamento robusto de erros

## 🧪 Testes

### Política de Testes Obrigatória

**Testes são fundamentais para a qualidade do código e devem ser executados antes de qualquer commit, push ou merge.**

#### ✅ Regras Obrigatórias

- **NUNCA** suba código sem testes passando
- **NUNCA** faça merge sem testes passando
- **Cobertura mínima**: 80de testes
- **Testes quebrados = Bug** - Corrija antes de continuar

#### 📋 Checklist Antes de Commits

- ] `npm run lint` - ZERO erros
- ] `npm run build` - ZERO erros
- ] `npm run test` - TODOS os testes passando
- ] `npm run dev` - Projeto roda sem problemas

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

- **Backend**: 12testes unitários e de integração ✅
- **Frontend**: Testes de componentes implementados ✅
- **Manual**: Todos os fluxos testados ✅
- **Política**: Documentação completa em `TESTING_POLICY.md` ✅

## 📚 Documentação

### 📋 Documentação Técnica

- **PROJECT_SETUP.md**: Setup detalhado do projeto
- **PROJECT_STATUS.md**: Status atual de todas as funcionalidades
- **API_STANDARDS.md**: Padrões de API REST
- **TESTING_POLICY.md**: Política de testes obrigatória
- **AUTH_IMPLEMENTATION.md**: Implementação do sistema de autenticação
- **UPLOAD_SYSTEM.md**: Sistema de upload e processamento
- **PROCESS_IMAGE_FEATURE.md**: Funcionalidade de processamento com IA

### 🔧 Documentação de Desenvolvimento

- **SETUP_NODE.md**: Configuração do Node.js
- **TODO.md**: Tarefas pendentes e próximos passos
- **TESTING_UPDATES.md**: Atualizações de testes
- **UPLOAD_FIXES.md**: Correções do sistema de upload

## 🚀 Scripts Disponíveis

### Desenvolvimento

```bash
# Instalar todas as dependências
npm run install:all

# Iniciar desenvolvimento (frontend + backend)
npm run dev

# Iniciar apenas frontend
npm run dev:frontend

# Iniciar apenas backend
npm run dev:backend
```

### Build e Deploy

```bash
# Build de todos os projetos
npm run build:all

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

# Testes com cobertura
npm run test:coverage
```

### Qualidade de Código

```bash
# Lint de todos os projetos
npm run lint:all

# Lint do frontend
npm run lint:frontend

# Lint do backend
npm run lint:backend
```

## 🎯 Funcionalidades Implementadas

### ✅ Sistema Completo de Autenticação

- Login rápido com código
- Cadastro em2s
- Sessão persistente
- Proteção de rotas

### ✅ Sistema de Upload Avançado

- Upload organizado por usuário
- Validação de arquivos
- Preservação de nome original
- Exibição de imagem atual
- Atualização automática de profileImageUrl

### ✅ Análise de Personagens com IA

- Processamento com GPT-4 Vision
- 9 categorias de análise
- Ficha estruturada em JSON
- Interface editável
- Tratamento robusto de erros

### ✅ Arquitetura Limpa

- Clean Architecture implementada
- Princípios SOLID seguidos
- Use Cases bem definidos
- Separação de responsabilidades

### ✅ Testes Automatizados

- Testes unitários
- Testes de integração
- Cobertura de testes
- Política de testes obrigatória

## 🔄 Próximos Passos

### Melhorias Planejadas

1 **Histórico de Análises**: Armazenar histórico de análises por usuário
2mparação de Personagens**: Comparar múltiplos personagens
3 **Exportação de Dados**: Exportar análises em diferentes formatos4. **Dashboard Avançado**: Interface mais rica para visualização5 **Notificações**: Sistema de notificações em tempo real

### Otimizações Técnicas1**Cache de Imagens**: Implementar cache para melhor performance

2**Compressão**: Otimizar tamanho das imagens
3**Rate Limiting**: Implementar limites de uso
4**Monitoramento**: Adicionar métricas e logs avançados

## 📞 Suporte

Para dúvidas ou problemas:
1 **Documentação**: Consulte os arquivos de documentação2. **Issues**: Abra uma issue no repositório
3. **Testes**: Execute os testes para identificar problemas
4. **Logs**: Verifique os logs de desenvolvimento

---

**Gwan Landing Page** - Sistema completo de análise de personagens com IA 🚀

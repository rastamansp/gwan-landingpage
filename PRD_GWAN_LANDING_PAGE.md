# PRD - Gwan Landing Page

## Product Requirements Document

---

## 📋 Informações do Projeto

**Nome do Produto**: Gwan Landing Page - Análise de Personagens com IA  
**Versão**: 1.0.0  
**Data de Criação**: Dezembro 2024  
**Status**: Em Desenvolvimento  
**Tipo**: Monorepo (Frontend + Backend + Shared)  

---

## 🎯 Visão Geral do Produto

### Descrição

A **Gwan Landing Page** é uma plataforma inovadora que combina autenticação moderna com análise avançada de personagens usando Inteligência Artificial. O sistema permite que usuários façam upload de imagens de personagens e recebam análises detalhadas e estruturadas usando GPT-4 Vision da OpenAI.

### Proposta de Valor

- **Análise Profissional**: Análise detalhada de personagens com IA de ponta
- **Autenticação Simplificada**: Login rápido e cadastro em 2 passos
- **Interface Moderna**: Design responsivo e intuitivo
- **Arquitetura Escalável**: Clean Architecture com princípios SOLID

### Público-Alvo

- **Criadores de Conteúdo**: Influenciadores, artistas, designers
- **Desenvolvedores de Jogos**: Game designers, concept artists
- **Profissionais de Marketing**: Agências, freelancers
- **Entusiastas de IA**: Pessoas interessadas em tecnologia

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológica

#### Frontend

- **Framework**: React 18.3.1 + TypeScript 4.9.5
- **UI Library**: Material-UI (MUI) 7.2.0
- **State Management**: React Context + React Query
- **Routing**: React Router DOM 6.30.1
- **HTTP Client**: Axios 1.6.2

#### Backend

- **Framework**: NestJS 10.4.19 + TypeScript 4.9.5
- **Database**: PostgreSQL 15 + TypeORM 0.3.25
- **Authentication**: JWT + Passport 0.7.0
- **File Storage**: MinIO 8.0.5
- **Cache**: Redis 7-alpine
- **Validation**: class-validator 0.14.2

#### IA e Processamento

- **AI Service**: OpenAI GPT-4 Vision
- **Image Processing**: Base64 encoding
- **Analysis Storage**: PostgreSQL + JSON fields

#### Infraestrutura

- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Environment**: Node.js 18+ + npm 9+

### Estrutura do Monorepo

```
gwan-landingpage/
├── frontend/          # React App (@gwan/frontend)
├── backend/           # NestJS API (@gwan/backend)
├── shared/            # Código compartilhado (@gwan/shared)
├── docker/            # Configurações Docker
├── scripts/           # Scripts de automação
└── package.json       # Root workspace
```

---

## 🎯 Funcionalidades Principais

### 1. Sistema de Autenticação

#### 1.1 Login Rápido (Usuários Cadastrados)

**Objetivo**: Permitir acesso rápido para usuários já cadastrados

**Fluxo**:

1. Usuário acessa landing page
2. Escolhe "Já tenho conta"
3. Informa email ou WhatsApp
4. Recebe código de 6 dígitos
5. Valida código e acessa área de upload

**Requisitos Técnicos**:

- Validação automática de formato (email/WhatsApp)
- Código de 6 dígitos com expiração de 10 minutos
- Envio via email ou WhatsApp
- JWT token após validação

#### 1.2 Cadastro (Novos Usuários)

**Objetivo**: Capturar novos usuários com processo simplificado

**Fluxo**:

1. Usuário escolhe "Quero me cadastrar"
2. **Passo 1**: Nome, Email, Telefone
3. **Passo 2**: Validação com código de ativação
4. Login automático após ativação

**Requisitos Técnicos**:

- Validação de dados em tempo real
- Código de ativação de 6 dígitos
- Status de usuário (PENDING → ACTIVATED → COMPLETED)
- Login automático após ativação

### 2. Sistema de Upload e Análise IA

#### 2.1 Upload de Imagens

**Objetivo**: Permitir upload seguro e organizado de imagens de personagens

**Requisitos Funcionais**:

- Upload de imagens JPG, JPEG, PNG, GIF
- Tamanho máximo de 20MB
- Organização por usuário (`uploads/user-{userId}/`)
- Preservação do nome original
- Preview em tempo real
- Validação de tipo e tamanho

**Requisitos Técnicos**:

- Armazenamento no MinIO
- URL de retorno para uso futuro
- Atualização automática de `profileImageUrl`
- Tratamento de erros robusto

#### 2.2 Análise com GPT-4 Vision

**Objetivo**: Analisar imagens de personagens e gerar fichas detalhadas

**Categorias de Análise**:

1. **Identidade**: Nome, Idade, Gênero, Ocupação, Personalidade, Background
2. **Corpo**: Altura, Peso, Tipo Corporal, Características, Marcas
3. **Rosto**: Formato, Características, Expressão, Detalhes
4. **Olhos**: Cor, Formato, Tamanho, Características, Expressão
5. **Cabelo**: Cor, Estilo, Comprimento, Textura, Características
6. **Vestuário**: Tipo, Cor, Estilo, Detalhes, Acessórios
7. **Calçado**: Tipo, Cor, Estilo, Características
8. **Acessórios**: Tipos, Detalhes, Posicionamento
9. **Estilo Fotográfico**: Iluminação, Ângulo, Composição, Ambiente, Qualidade

**Requisitos Técnicos**:

- Integração com OpenAI GPT-4 Vision
- Prompt estruturado para análise detalhada
- Resposta em JSON estruturado
- Armazenamento de histórico de análises
- Tratamento de erros e fallbacks

### 3. Interface de Usuário

#### 3.1 Landing Page

**Objetivo**: Página inicial atrativa com opções de acesso

**Elementos**:

- Header com logo e navegação
- Hero section com proposta de valor
- Botões de "Já tenho conta" e "Quero me cadastrar"
- Footer com informações da empresa

#### 3.2 Formulários de Autenticação

**Objetivo**: Interface intuitiva para login e cadastro

**Componentes**:

- `LoginForm`: Formulário de login rápido
- `RegisterWizard`: Wizard de 2 passos para cadastro
- `ActivationForm`: Validação de códigos
- Loading states e feedback visual
- Tratamento de erros específicos

#### 3.3 Área de Upload e Análise

**Objetivo**: Interface para upload e visualização de resultados

**Componentes**:

- `CharacterUpload`: Área de upload de imagens
- `AnalysisResults`: Exibição de resultados da IA
- `EditableAnalysis`: Interface para editar análises
- `CurrentImageDisplay`: Exibição de imagem atual
- Estados de loading e processamento

---

## 📊 Requisitos Não Funcionais

### Performance

- **Tempo de Resposta**: < 2 segundos para operações CRUD
- **Upload**: Suporte a arquivos de até 20MB
- **Processamento IA**: < 30 segundos para análise completa
- **Concorrência**: Suporte a 100+ usuários simultâneos

### Escalabilidade

- **Arquitetura Modular**: Clean Architecture para fácil manutenção
- **Microserviços Ready**: Preparado para evolução para microserviços
- **Cache Strategy**: Redis para cache de dados frequentes
- **CDN Ready**: Preparado para integração com CDN

### Segurança

- **Autenticação**: JWT com refresh tokens
- **Validação**: Input validation em todas as entradas
- **File Upload**: Validação de tipo e tamanho
- **Rate Limiting**: Proteção contra ataques
- **HTTPS**: Comunicação criptografada

### Usabilidade

- **Responsividade**: Funciona em desktop, tablet e mobile
- **Acessibilidade**: WCAG 2.1 AA compliance
- **Intuitividade**: Interface clara e fácil de usar
- **Feedback**: Estados de loading e mensagens de erro claras

### Confiabilidade

- **Testes**: Cobertura de testes > 80%
- **Monitoramento**: Logs estruturados e métricas
- **Error Handling**: Tratamento robusto de erros
- **Backup**: Estratégia de backup de dados

---

## 🗂️ Estrutura de Dados

### Entidades Principais

#### User

```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'PENDING' | 'ACTIVATED' | 'COMPLETED';
  activationCode?: string;
  loginCode?: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Character

```typescript
{
  id: string;
  userId: string;
  name?: string;
  age?: string;
  gender?: string;
  imageUrl?: string;
  analysis?: CharacterAnalysis;
  createdAt: Date;
  updatedAt: Date;
}
```

#### CharacterAnalysisHistory

```typescript
{
  id: string;
  characterId: string;
  userId: string;
  imageUrl: string;
  analysis: CharacterAnalysis;
  status: 'SUCCESS' | 'ERROR';
  errorMessage?: string;
  openaiResponse: any;
  processedAt: Date;
}
```

### Tipos de Análise

```typescript
interface CharacterAnalysis {
  identidade: { nome, idade, genero, ocupacao, personalidade, background };
  corpo: { altura, peso, tipoCorporal, caracteristicas, marcas };
  rosto: { formato, caracteristicas, expressao, detalhes };
  olhos: { cor, formato, tamanho, caracteristicas, expressao };
  cabelo: { cor, estilo, comprimento, textura, caracteristicas };
  vestuario: { tipo, cor, estilo, detalhes, acessorios };
  calcado: { tipo, cor, estilo, caracteristicas };
  acessorios: { tipos, detalhes, posicionamento };
  estiloFotografico: { iluminacao, angulo, composicao, ambiente, qualidade };
  metadata: { confianca, processadoEm, versaoIA };
}
```

---

## 🔄 Fluxos de Usuário

### Fluxo 1: Login Rápido

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant N as Notification Service

    U->>F: Acessa landing page
    U->>F: Clica "Já tenho conta"
    U->>F: Informa email/WhatsApp
    F->>B: POST /auth/login-request
    B->>B: Valida contato
    B->>B: Gera código de 6 dígitos
    B->>N: Envia código
    B->>F: Retorna sucesso
    F->>U: Exibe "Código enviado"
    U->>F: Informa código
    F->>B: POST /auth/login-validate
    B->>B: Valida código
    B->>F: Retorna JWT token
    F->>U: Redireciona para /upload
```

### Fluxo 2: Cadastro

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant N as Notification Service

    U->>F: Acessa landing page
    U->>F: Clica "Quero me cadastrar"
    U->>F: Passo 1: Nome, Email, Telefone
    F->>B: POST /auth/register
    B->>B: Valida dados
    B->>B: Cria usuário PENDING
    B->>N: Envia código de ativação
    B->>F: Retorna userId + activationCode
    F->>U: Exibe "Código enviado"
    U->>F: Passo 2: Informa código
    F->>B: POST /auth/activate/:userId
    B->>B: Valida código
    B->>B: Ativa usuário
    B->>F: Retorna JWT token
    F->>U: Redireciona para /upload
```

### Fluxo 3: Upload e Análise IA

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant M as MinIO
    participant O as OpenAI

    U->>F: Acessa /upload (autenticado)
    U->>F: Seleciona imagem
    F->>B: POST /upload (multipart)
    B->>B: Valida arquivo
    B->>M: Armazena imagem
    B->>B: Atualiza character
    B->>F: Retorna imageUrl
    F->>U: Exibe imagem + botão processar
    
    U->>F: Clica "Processar Imagem"
    F->>B: POST /upload/process
    B->>B: Busca character do usuário
    B->>O: Chama GPT-4 Vision
    O->>B: Retorna análise estruturada
    B->>B: Salva análise no banco
    B->>F: Retorna dados processados
    F->>U: Exibe análise editável
```

---

## 🎨 Design e UX

### Princípios de Design

- **Simplicidade**: Interface limpa e intuitiva
- **Consistência**: Padrões visuais uniformes
- **Feedback**: Estados claros de loading e erro
- **Acessibilidade**: Design inclusivo

### Paleta de Cores

- **Primária**: #667eea (Azul)
- **Secundária**: #764ba2 (Roxo)
- **Sucesso**: #4caf50 (Verde)
- **Erro**: #f44336 (Vermelho)
- **Aviso**: #ff9800 (Laranja)
- **Neutro**: #f5f5f5 (Cinza claro)

### Componentes UI

- **Botões**: Material-UI Button com variantes
- **Formulários**: TextField com validação
- **Cards**: Elevation e padding consistentes
- **Loading**: CircularProgress e Skeleton
- **Feedback**: Snackbar para mensagens

---

## 🧪 Estratégia de Testes

### Testes Unitários

- **Backend**: Use Cases, Services, Repositories
- **Frontend**: Components, Hooks, Utils
- **Cobertura**: > 80% em todas as camadas

### Testes de Integração

- **API Endpoints**: Todos os endpoints testados
- **Database**: Operações CRUD validadas
- **External APIs**: OpenAI integration testada

### Testes E2E

- **Fluxos Completos**: Login, Cadastro, Upload, Análise
- **Cenários de Erro**: Validação de tratamento de erros
- **Performance**: Tempos de resposta validados

### Testes Manuais

- **Usabilidade**: Testes com usuários reais
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile**: Responsividade testada

---

## 🚀 Roadmap de Desenvolvimento

### Fase 1: MVP (Concluída) ✅

- [x] Sistema de autenticação básico
- [x] Upload de imagens
- [x] Análise com GPT-4 Vision
- [x] Interface responsiva
- [x] Arquitetura Clean Architecture

### Fase 2: Melhorias (Em Desenvolvimento) 🔄

- [ ] Histórico de análises por usuário
- [ ] Comparação de múltiplos personagens
- [ ] Exportação de dados em diferentes formatos
- [ ] Dashboard avançado com métricas
- [ ] Sistema de notificações em tempo real

### Fase 3: Otimizações (Planejada) 📋

- [ ] Cache de imagens para melhor performance
- [ ] Compressão automática de imagens
- [ ] Rate limiting avançado
- [ ] Monitoramento e métricas detalhadas
- [ ] CDN para distribuição de conteúdo

### Fase 4: Expansão (Futuro) 🔮

- [ ] API pública para integrações
- [ ] Plugin para editores de imagem
- [ ] Mobile app nativo
- [ ] Integração com redes sociais
- [ ] Marketplace de análises

---

## 📈 Métricas de Sucesso

### Métricas Técnicas

- **Performance**: Tempo de resposta < 2s
- **Disponibilidade**: 99.9% uptime
- **Cobertura de Testes**: > 80%
- **Bugs Críticos**: 0 em produção

### Métricas de Negócio

- **Conversão**: Taxa de cadastro > 30%
- **Retenção**: Usuários ativos > 60% após 30 dias
- **Engajamento**: Média de análises por usuário > 5
- **Satisfação**: NPS > 50

### Métricas de IA

- **Precisão**: Taxa de sucesso > 90%
- **Velocidade**: Tempo de processamento < 30s
- **Qualidade**: Análises estruturadas corretamente
- **Feedback**: Avaliação positiva dos usuários

---

## 🔧 Configuração e Deploy

### Ambiente de Desenvolvimento

```bash
# Clone e setup
git clone <repository>
cd gwan-landingpage
npm run install:all

# Configurar variáveis de ambiente
cp backend/env.example backend/.env
# Editar backend/.env

# Iniciar serviços
docker-compose up -d db redis minio
npm run dev
```

### Ambiente de Produção

```bash
# Build para produção
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Health checks
curl http://localhost:3001/health
```

### Variáveis de Ambiente Críticas

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5433/gwan_db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# MinIO
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
```

---

## 📞 Suporte e Manutenção

### Documentação

- **README**: Instruções de setup e uso
- **API Docs**: Swagger/OpenAPI
- **Arquitetura**: Documentação técnica
- **Guia de Contribuição**: Para desenvolvedores

### Monitoramento

- **Logs**: Estruturados com Winston
- **Métricas**: Performance e uso
- **Alertas**: Para erros críticos
- **Health Checks**: Endpoints de verificação

### Manutenção

- **Updates**: Atualizações de segurança
- **Backup**: Estratégia de backup automático
- **Scaling**: Preparado para crescimento
- **Security**: Auditorias regulares

---

## 📄 Conclusão

O **Gwan Landing Page** representa uma solução inovadora que combina autenticação moderna com análise avançada de personagens usando IA. A arquitetura robusta, baseada em Clean Architecture e princípios SOLID, garante escalabilidade e manutenibilidade.

### Próximos Passos

1. **Implementar melhorias da Fase 2**
2. **Otimizar performance e UX**
3. **Expandir funcionalidades de IA**
4. **Preparar para escala de produção**

### Contato

Para dúvidas ou suporte técnico:

- **Documentação**: Consulte os arquivos de documentação
- **Issues**: Abra uma issue no repositório
- **Equipe**: Gwan Team

---

*Documento criado em Dezembro 2024 - Versão 1.0.0*

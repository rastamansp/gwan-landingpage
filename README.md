# 🚀 Gwan Landing Page

Uma landing page moderna e responsiva desenvolvida com React.js e Material Design, com backend em NestJS seguindo princípios de Clean Architecture e SOLID.

## 📋 Sobre o Projeto

O **Gwan Landing Page** é uma plataforma de cadastro e ativação de usuários em 3 passos:

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

O projeto segue os princípios de **Clean Architecture** e **SOLID**, organizado em módulos independentes:

- **Frontend**: React.js com Material Design
- **Backend**: NestJS com TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Containerização**: Docker

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

## 📁 Estrutura do Projeto

```
gwan-landingpage/
├── frontend/                # Aplicação React.js
│   ├── src/
│   │   ├── modules/         # Módulos da aplicação
│   │   │   ├── auth/        # Módulo de autenticação (3 passos)
│   │   │   ├── contact/     # Módulo de contato
│   │   │   └── portfolio/   # Módulo de portfólio
│   │   │       ├── domain/  # Entidades e regras de negócio
│   │   │       ├── application/ # Use Cases
│   │   │       ├── infrastructure/ # Implementações concretas
│   │   │       └── presentation/ # Componentes React
│   │   ├── shared/          # Código compartilhado
│   │   └── core/            # Configurações centrais
│   └── package.json
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── modules/         # Módulos da aplicação
│   │   │   ├── auth/        # Módulo de autenticação (3 passos)
│   │   │   ├── contact/     # Módulo de contato
│   │   │   └── portfolio/   # Módulo de portfólio
│   │   │       ├── domain/  # Entidades e regras de negócio
│   │   │       ├── application/ # Use Cases
│   │   │       ├── infrastructure/ # Repositórios e serviços externos
│   │   │       └── presentation/ # Controllers e DTOs
│   │   ├── shared/          # Código compartilhado
│   │   └── core/            # Configurações centrais
│   └── package.json
├── shared/                  # Código compartilhado
├── docs/                    # Documentação
└── package.json             # Root package.json
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev              # Inicia frontend e backend
npm run dev:frontend     # Inicia apenas o frontend
npm run dev:backend      # Inicia apenas o backend
```

### Build

```bash
npm run build            # Build de produção (frontend + backend)
npm run build:frontend   # Build apenas do frontend
npm run build:backend    # Build apenas do backend
```

### Testes

```bash
npm run test             # Executa todos os testes
npm run test:frontend    # Testes do frontend
npm run test:backend     # Testes do backend
```

### Linting e Formatação

```bash
npm run lint             # Linting de todo o projeto
npm run format           # Formatação com Prettier
```

### Utilitários

```bash
npm run clean            # Remove node_modules
npm run install:all      # Instala dependências de todos os workspaces
```

## 🧪 Testes

### Frontend

```bash
cd frontend
npm run test             # Testes unitários
npm run test:coverage    # Testes com cobertura
```

### Backend

```bash
cd backend
npm run test             # Testes unitários
npm run test:e2e         # Testes end-to-end
npm run test:cov         # Testes com cobertura
```

## 📚 Documentação da API

A documentação da API está disponível através do Swagger:

- **Desenvolvimento**: <http://localhost:3001/api>
- **Produção**: <https://api.gwan.com/api>

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente

#### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

#### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://postgres:pazdedeus@gwan.com.br:5433/gwan_vector

# JWT
JWT_SECRET=your-secret-key

# Email
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

# Server
PORT=3001
NODE_ENV=development
```

## 🚀 Deploy

### Desenvolvimento

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:3001>
- Banco: PostgreSQL local

### Produção

- Frontend: Vercel/Netlify
- Backend: Railway/Heroku
- Banco: PostgreSQL na nuvem

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Suporte

Para suporte, envie um email para <suporte@gwan.com> ou abra uma issue no GitHub.

---

**Desenvolvido com ❤️ pela equipe Gwan**

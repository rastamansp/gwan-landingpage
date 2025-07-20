# 🚀 Setup do Ambiente de Desenvolvimento - Gwan Landing Page

## 📋 Checklist Rápido

### ✅ Pré-requisitos

- [ ] Node.js 18+ instalado
- [ ] npm ou yarn instalado
- [ ] Git instalado
- [ ] Docker e Docker Compose instalados (opcional)
- [ ] PostgreSQL instalado ou Docker configurado
- [ ] Conta OpenAI com API key

### 🔧 Setup Inicial

#### 1. Clone do Repositório

```bash
git clone <seu-repositorio>
cd gwan-landingpage
```

#### 2. Instalação de Dependências

```bash
# Dependências root
npm install

# Dependências backend
cd backend
npm install

# Dependências frontend
cd ../frontend
npm install

# Dependências shared
cd ../shared
npm install
```

#### 3. Configuração de Variáveis de Ambiente

**Backend (.env)**

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=gwan_landing_page

# JWT
JWT_SECRET=sua-chave-secreta-jwt-aqui
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sua-openai-api-key-aqui

# SMTP (Email)
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
SMTP_FROM_NAME=GWAN
SMTP_FROM_EMAIL=noreply@gwan.com.br

# MinIO (Storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_NAME=gwan-uploads

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### 4. Configuração do Banco de Dados

**Opção A: Docker (Recomendado)**

```bash
# Iniciar PostgreSQL
docker-compose up -d postgres

# Aguardar 30 segundos e verificar se está rodando
docker-compose ps
```

**Opção B: PostgreSQL Local**

```bash
# Criar banco de dados
createdb gwan_landing_page
```

#### 5. Configuração do MinIO (Storage)

**Opção A: Docker (Recomendado)**

```bash
# Iniciar MinIO
docker-compose up -d minio

# Verificar se está rodando
docker-compose ps
```

**Opção B: MinIO Local**

- Baixar e instalar MinIO Server
- Configurar bucket `gwan-uploads`

### 🚀 Iniciando o Desenvolvimento

#### Terminal 1 - Backend

```bash
cd backend
npm run start:dev
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm start
```

#### Terminal 3 - Verificações (Opcional)

```bash
# Verificar se o banco está rodando
docker-compose ps

# Verificar logs do backend
docker-compose logs backend
```

### 🧪 Testes Obrigatórios

#### Antes de Começar a Desenvolver

```bash
# Backend
cd backend
npm run test
npm run lint

# Frontend
cd ../frontend
npm run test
npm run lint

# Build test
npm run build
```

#### Durante o Desenvolvimento

```bash
# Sempre antes de commitar
npm run lint
npm run test
npm run build
```

### 🔍 Verificações de Funcionamento

#### 1. Backend (<http://localhost:3001>)

- [ ] Health check: `GET /health`
- [ ] Swagger docs: `GET /api`

#### 2. Frontend (<http://localhost:3000>)

- [ ] Landing page carrega
- [ ] Formulário de login funciona
- [ ] Cadastro funciona
- [ ] Upload de imagem funciona

#### 3. Banco de Dados

- [ ] Conexão estabelecida
- [ ] Tabelas criadas automaticamente
- [ ] Migrations funcionando

#### 4. MinIO

- [ ] Bucket `gwan-uploads` criado
- [ ] Upload de arquivos funcionando
- [ ] URLs de acesso funcionando

### 🐛 Troubleshooting Comum

#### Problema: Backend não inicia

```bash
# Verificar se as variáveis de ambiente estão corretas
cd backend
cat .env

# Verificar se o banco está rodando
docker-compose ps postgres

# Verificar logs
docker-compose logs backend
```

#### Problema: Frontend não conecta com Backend

```bash
# Verificar se o backend está rodando na porta 3001
curl http://localhost:3001/health

# Verificar configuração do frontend
cd frontend
cat src/config/api.ts
```

#### Problema: Upload não funciona

```bash
# Verificar se o MinIO está rodando
docker-compose ps minio

# Verificar se o bucket existe
# Acessar http://localhost:9000 (usuário: minioadmin, senha: minioadmin)
```

#### Problema: OpenAI não funciona

```bash
# Verificar se a API key está correta
cd backend
echo $OPENAI_API_KEY

# Testar com curl
curl -H "Authorization: Bearer sua-api-key" https://api.openai.com/v1/models
```

### 📁 Estrutura de Arquivos Importantes

```
gwan-landingpage/
├── backend/
│   ├── .env                    # Variáveis de ambiente
│   ├── src/
│   │   ├── modules/auth/       # Módulo de autenticação
│   │   ├── core/config/        # Configurações
│   │   └── main.ts            # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── modules/auth/       # Componentes de auth
│   │   ├── config/api.ts       # Configuração da API
│   │   └── App.tsx            # Componente principal
│   └── package.json
├── shared/
│   └── src/                   # Código compartilhado
├── docker-compose.yml          # Serviços Docker
└── package.json               # Scripts root
```

### 🔄 Comandos Úteis

#### Desenvolvimento

```bash
# Iniciar tudo
npm run dev

# Apenas backend
cd backend && npm run start:dev

# Apenas frontend
cd frontend && npm start

# Testes
npm run test
npm run test:coverage
```

#### Docker

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f

# Rebuild
docker-compose up -d --build
```

#### Git

```bash
# Antes de commitar
npm run lint
npm run test
npm run build

# Commit
git add .
git commit -m "feat: descrição da mudança"

# Push
git push origin main
```

### 📞 Suporte

Se encontrar problemas:

1. **Verificar logs**: `docker-compose logs`
2. **Reiniciar serviços**: `docker-compose restart`
3. **Limpar cache**: `npm run clean`
4. **Reinstalar dependências**: `rm -rf node_modules && npm install`

### 🎯 Próximos Passos

Após o setup:

1. **Testar autenticação**: Cadastrar e fazer login
2. **Testar upload**: Fazer upload de uma imagem
3. **Testar IA**: Processar uma imagem com IA
4. **Verificar edição**: Editar análise gerada
5. **Testar responsividade**: Verificar em diferentes dispositivos

---

**Status**: ✅ Ambiente configurado e pronto para desenvolvimento
**Última atualização**: $(date)

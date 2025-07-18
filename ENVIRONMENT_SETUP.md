# 🔧 Configuração de Variáveis de Ambiente

Este documento explica como configurar as variáveis de ambiente para o projeto Gwan Landing Page.

## 📋 Visão Geral

O projeto usa um arquivo `.env` centralizado na raiz que contém todas as variáveis necessárias para:

- Backend (NestJS)
- Frontend (React)
- Banco de dados (PostgreSQL)
- Cache (Redis)
- Storage (MinIO)
- IA (OpenAI)

## 🚀 Configuração Rápida

### 1. Usar Script Automático (Recomendado)

```bash
./scripts/setup-env.sh
```

O script irá:

- Fazer backup do `.env` existente (se houver)
- Copiar `.env.example` para `.env`
- Verificar configurações críticas
- Mostrar instruções de configuração

### 2. Configuração Manual

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com seu editor preferido
nano .env
# ou
code .env
```

## 🔑 Variáveis Obrigatórias

### OpenAI API Key

```bash
OPENAI_API_KEY=sk-proj-sua-chave-aqui
```

**Onde obter**: [OpenAI Platform](https://platform.openai.com/api-keys)
**Uso**: Análise de personagens com GPT-4 Vision

### JWT Secret

```bash
JWT_SECRET=sua-chave-secreta-aqui
```

**Onde obter**: Gere uma string aleatória
**Uso**: Autenticação e sessões

### MinIO Credentials

```bash
MINIO_ACCESS_KEY=sua-access-key
MINIO_SECRET_KEY=sua-secret-key
```

**Onde obter**: Configurado automaticamente no Docker
**Uso**: Armazenamento de imagens

## 📧 Variáveis de Email (Opcionais)

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha
```

**Uso**: Envio de códigos de ativação/login por email

## 📱 Variáveis WhatsApp (Opcionais)

```bash
WHATSAPP_API_URL=sua-api-url
WHATSAPP_API_TOKEN=seu-token
```

**Uso**: Envio de códigos de ativação/login por WhatsApp

## 🗄️ Configurações de Banco

```bash
DATABASE_URL=postgresql://postgres:pazdedeus@db:5432/gwan_vector
POSTGRES_DB=gwan_vector
POSTGRES_USER=postgres
POSTGRES_PASSWORD=pazdedeus
```

**Nota**: Estas são configuradas automaticamente no Docker

## 🔧 Configurações do Servidor

```bash
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🗂️ Configurações de Upload

```bash
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

## 🔍 Verificação de Configuração

Execute o script para verificar se todas as variáveis críticas estão configuradas:

```bash
./scripts/setup-env.sh
```

O script irá alertar sobre variáveis que precisam ser configuradas.

## 🐳 Configuração para Docker

### Desenvolvimento

```bash
# Usar docker-compose.yml
docker-compose up -d
```

### Produção

```bash
# Usar docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Segurança

### ⚠️ Importante

1. **NUNCA** commite o arquivo `.env`
2. **SEMPRE** use `.env.example` como template
3. **MUDE** as senhas padrão em produção
4. **PROTEJA** suas chaves de API

### 🔐 Boas Práticas

- Use senhas fortes para JWT_SECRET
- Rotacione chaves de API regularmente
- Use variáveis de ambiente diferentes para dev/prod
- Monitore logs de acesso

## 🚨 Troubleshooting

### Problema: "Cannot connect to database"

**Solução**: Verifique se `DATABASE_URL` está correto

### Problema: "OpenAI API error"

**Solução**: Verifique se `OPENAI_API_KEY` está válida

### Problema: "JWT verification failed"

**Solução**: Verifique se `JWT_SECRET` está configurado

### Problema: "MinIO connection failed"

**Solução**: Verifique se `MINIO_ACCESS_KEY` e `MINIO_SECRET_KEY` estão corretos

## 📞 Suporte

Se tiver problemas com configuração:

1. Execute `./scripts/setup-env.sh`
2. Verifique se todas as variáveis críticas estão configuradas
3. Teste com `docker-compose up -d`
4. Verifique logs com `docker-compose logs -f`

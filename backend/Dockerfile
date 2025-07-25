# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Debug: Verificar contexto inicial
RUN echo "=== Contexto inicial ===" && \
    pwd && \
    ls -la

# Copia package.json da raiz primeiro
COPY package*.json ./

# Debug: Verificar se package.json foi copiado
RUN echo "=== Verificando package.json da raiz ===" && \
    ls -la package*.json || echo "package.json não encontrado"

# Copia package.json do backend
COPY backend/package*.json ./backend/

# Debug: Verificar se package.json do backend foi copiado
RUN echo "=== Verificando package.json do backend ===" && \
    ls -la backend/package*.json || echo "backend/package.json não encontrado"

# Copia package.json do shared (se existir)
COPY shared/package*.json ./shared/

# Debug: Verificar estrutura de diretórios
RUN echo "=== Estrutura de diretórios ===" && \
    find . -name "package*.json" -type f

# Instala dependências
RUN echo "=== Instalando dependências ===" && \
    npm install

# Debug: Verificar se as dependências foram instaladas
RUN echo "=== Verificando node_modules ===" && \
    ls -la node_modules/ | head -5

# Copia o código fonte do backend
COPY backend ./backend

# Debug: Verificar se o código do backend foi copiado
RUN echo "=== Verificando código do backend ===" && \
    ls -la backend/ | head -10

# Copia o código fonte do shared (se existir)
COPY shared ./shared

# Debug: Verificar se o código do shared foi copiado
RUN echo "=== Verificando código do shared ===" && \
    ls -la shared/ || echo "shared/ não existe"

# Build do backend
WORKDIR /app/backend
RUN echo "=== Iniciando build do backend ===" && \
    pwd && \
    ls -la && \
    npm run build

# Debug: Verificar se o build foi criado
RUN echo "=== Verificando build criado ===" && \
    ls -la dist/ || echo "dist/ não foi criado"

# Production stage
FROM node:20-alpine
WORKDIR /app

# Debug: Verificar diretório de produção
RUN echo "=== Stage de produção ===" && \
    pwd && \
    ls -la

# Copia package.json da raiz
COPY package*.json ./

# Copia package.json do backend
COPY backend/package*.json ./backend/

# Copia package.json do shared (se existir)
COPY shared/package*.json ./shared/

# Instala dependências de produção incluindo swagger-ui-dist
RUN echo "=== Instalando dependências de produção ===" && \
    npm install --workspace=backend --omit=dev && \
    npm install --workspace=backend swagger-ui-dist

# Copia o build do stage anterior
COPY --from=builder /app/backend/dist ./backend/dist

# Debug: Verificar se o build foi copiado
RUN echo "=== Verificando build copiado ===" && \
    ls -la backend/dist/ || echo "backend/dist/ não existe"

WORKDIR /app/backend
EXPOSE 3001
CMD ["node", "dist/main.js"] 
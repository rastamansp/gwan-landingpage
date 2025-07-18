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

# Copia package.json do frontend
COPY frontend/package*.json ./frontend/

# Debug: Verificar se package.json do frontend foi copiado
RUN echo "=== Verificando package.json do frontend ===" && \
    ls -la frontend/package*.json || echo "frontend/package.json não encontrado"

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

# Copia o código fonte do frontend
COPY frontend ./frontend

# Debug: Verificar se o código do frontend foi copiado
RUN echo "=== Verificando código do frontend ===" && \
    ls -la frontend/ | head -10

# Copia o código fonte do shared (se existir)
COPY shared ./shared

# Debug: Verificar se o código do shared foi copiado
RUN echo "=== Verificando código do shared ===" && \
    ls -la shared/ || echo "shared/ não existe"

# Build do frontend
WORKDIR /app/frontend
RUN echo "=== Iniciando build do frontend ===" && \
    pwd && \
    ls -la && \
    npm run build

# Debug: Verificar se o build foi criado
RUN echo "=== Verificando build criado ===" && \
    ls -la build/ || echo "build/ não foi criado"

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Debug: Verificar diretório de produção
RUN echo "=== Stage de produção ===" && \
    pwd && \
    ls -la

# Copia o build do stage anterior
COPY --from=builder /app/frontend/build .

# Debug: Verificar se o build foi copiado
RUN echo "=== Verificando build copiado ===" && \
    ls -la || echo "build não existe"

# Copia configuração do nginx
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Debug: Verificar se nginx.conf foi copiado
RUN echo "=== Verificando nginx.conf ===" && \
    ls -la /etc/nginx/conf.d/default.conf || echo "nginx.conf não existe"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
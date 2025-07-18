# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Aceita argumentos de build
ARG REACT_APP_API_URL
ARG NODE_ENV=production

# Define as variáveis de ambiente para o build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV NODE_ENV=$NODE_ENV

# Copia package.json da raiz primeiro
COPY package*.json ./

# Copia package.json do frontend
COPY frontend/package*.json ./frontend/

# Copia package.json do shared (se existir)
COPY shared/package*.json ./shared/

# Instala dependências
RUN npm install

# Copia o código fonte do frontend
COPY frontend ./frontend

# Copia o código fonte do shared (se existir)
COPY shared ./shared

# Build do frontend
WORKDIR /app/frontend
RUN npm run build

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copia o build do stage anterior
COPY --from=builder /app/frontend/build .

# Copia configuração do nginx
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
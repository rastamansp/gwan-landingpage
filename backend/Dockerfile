# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copia apenas os arquivos necessários para o build
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

# Instala dependências
RUN npm install

# Copia o código fonte
COPY backend ./backend
COPY shared ./shared

# Build do backend
WORKDIR /app/backend
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copia package.json e instala apenas dependências de produção
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/
RUN npm install --workspace=backend --omit=dev

# Copia o build
COPY --from=builder /app/backend/dist ./backend/dist

WORKDIR /app/backend
EXPOSE 3001
CMD ["node", "dist/main.js"] 
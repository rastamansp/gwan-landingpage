# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copia todos os arquivos do monorepo
COPY . .

# Instala dependências de todos os workspaces
RUN npm install

# Build do backend
WORKDIR /app/backend
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copia package.json e package-lock.json da raiz
COPY package*.json ./

# Copia package.json do backend
COPY backend/package.json ./backend/

# Instala apenas dependências de produção do workspace backend
RUN npm install --workspace=backend --omit=dev

# Copia o build do stage anterior
COPY --from=builder /app/backend/dist ./backend/dist

WORKDIR /app/backend
EXPOSE 3001
CMD ["node", "dist/main.js"] 
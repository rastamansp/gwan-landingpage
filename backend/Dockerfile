# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copia package.json e package-lock.json da raiz e do backend
COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json

# Instala dependências (incluindo dev para build)
RUN npm install --workspace=backend

# Copia o restante do código do backend
COPY backend ./backend

# Build do backend
WORKDIR /app/backend
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json
RUN npm install --workspace=backend --omit=dev
COPY --from=builder /app/backend/dist ./backend/dist
WORKDIR /app/backend
EXPOSE 3001
CMD ["node", "dist/main.js"] 
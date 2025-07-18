#!/bin/bash

# Script para configurar as variáveis de ambiente
echo "🚀 Configurando variáveis de ambiente para o Gwan Landing Page..."

# Verifica se o arquivo .env já existe
if [ -f ".env" ]; then
    echo "⚠️  Arquivo .env já existe. Fazendo backup..."
    cp .env .env.backup
fi

# Copia o arquivo de exemplo se não existir
if [ ! -f ".env" ]; then
    echo "📋 Copiando .env.example para .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado com sucesso!"
    echo ""
    echo "🔧 Agora você precisa editar o arquivo .env com suas configurações:"
    echo "   - OPENAI_API_KEY: Sua chave da API OpenAI"
    echo "   - SMTP_USER/SMTP_PASS: Credenciais de email"
    echo "   - WHATSAPP_API_URL/WHATSAPP_API_TOKEN: Configurações do WhatsApp"
    echo ""
    echo "📝 Para editar: nano .env ou code .env"
else
    echo "✅ Arquivo .env já configurado!"
fi

echo ""
echo "🔍 Verificando configurações necessárias..."

# Verifica se as variáveis críticas estão configuradas
if grep -q "your-openai-api-key" .env; then
    echo "⚠️  OPENAI_API_KEY precisa ser configurada!"
fi

if grep -q "your-email@gmail.com" .env; then
    echo "⚠️  SMTP_USER precisa ser configurada!"
fi

if grep -q "your-password" .env; then
    echo "⚠️  SMTP_PASS precisa ser configurada!"
fi

echo ""
echo "🎯 Para rodar o projeto:"
echo "   docker-compose up -d"
echo ""
echo "🔍 Para ver logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para parar:"
echo "   docker-compose down" 
#!/bin/bash

echo "=== Verificando status dos containers ==="
docker ps -a

echo ""
echo "=== Verificando redes Docker ==="
docker network ls

echo ""
echo "=== Verificando logs do Traefik ==="
docker logs traefik 2>&1 | tail -20

echo ""
echo "=== Verificando logs do backend ==="
docker logs gwan-backend 2>&1 | tail -10

echo ""
echo "=== Testando conectividade interna ==="
docker exec gwan-backend curl -I http://localhost:3001/health || echo "Backend não responde internamente"

echo ""
echo "=== Verificando labels do Traefik ==="
docker inspect gwan-backend --format='{{range $k, $v := .Config.Labels}}{{$k}}={{$v}}{{"\n"}}{{end}}' | grep traefik 
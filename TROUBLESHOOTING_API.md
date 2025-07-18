# Troubleshooting - API não acessível

## Problema

A API não está acessível em `https://api-landingpage.gwan.com.br/auth/login-request`

## Possíveis causas e soluções

### 1. Verificar se o Traefik está rodando

```bash
docker ps | grep traefik
```

Se não estiver rodando, inicie o Traefik:

```bash
docker-compose -f traefik.yml up -d
```

### 2. Verificar se a rede `gwan` existe

```bash
docker network ls | grep gwan
```

Se não existir, crie:

```bash
docker network create gwan
```

### 3. Verificar logs do Traefik

```bash
docker logs traefik
```

Procure por erros relacionados ao domínio `api-landingpage.gwan.com.br`

### 4. Verificar se o backend está respondendo internamente

```bash
docker exec gwan-backend curl -I http://localhost:3001/health
```

### 5. Verificar configuração DNS

Certifique-se de que `api-landingpage.gwan.com.br` está apontando para o IP correto do servidor.

### 6. Verificar certificados SSL

```bash
docker logs traefik | grep -i "certificate\|ssl\|tls"
```

### 7. Testar conectividade

```bash
# Teste local
curl -I http://localhost:3001/health

# Teste externo (se possível)
curl -I https://api-landingpage.gwan.com.br/health
```

### 8. Verificar labels do Traefik

```bash
docker inspect gwan-backend --format='{{range $k, $v := .Config.Labels}}{{$k}}={{$v}}{{"\n"}}{{end}}' | grep traefik
```

### 9. Reiniciar containers

```bash
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

### 10. Verificar firewall

Certifique-se de que as portas 80 e 443 estão abertas no servidor.

## Comandos úteis para debug

### Verificar status geral

```bash
./check-status.sh
```

### Ver logs em tempo real

```bash
# Logs do Traefik
docker logs -f traefik

# Logs do backend
docker logs -f gwan-backend
```

### Testar endpoint específico

```bash
curl -X POST https://api-landingpage.gwan.com.br/auth/login-request \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Configuração esperada

### Traefik labels no backend

```
traefik.enable=true
traefik.http.routers.gwan-backend.rule=Host(`api-landingpage.gwan.com.br`)
traefik.http.routers.gwan-backend.entrypoints=websecure
traefik.http.routers.gwan-backend.tls.certresolver=letsencrypt
traefik.http.services.gwan-backend.loadbalancer.server.port=3001
```

### Backend deve estar escutando em

```
http://0.0.0.0:3001
```

## Próximos passos

1. Execute o script `check-status.sh` para diagnóstico completo
2. Verifique se o Traefik está rodando
3. Confirme se a rede `gwan` existe
4. Teste a conectividade interna do backend
5. Verifique os logs do Traefik para erros de certificado ou roteamento

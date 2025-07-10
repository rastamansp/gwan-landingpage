# 🔧 Configuração do Node.js

## Problema Atual

O bash do Git não está encontrando o Node.js instalado via NVM.

## Soluções

### Opção 1: Usar PowerShell/CMD (Recomendado)

1. Abra o **PowerShell** ou **Prompt de Comando**
2. Navegue até o projeto:

   ```powershell
   cd D:\workspace\gwan\gwan-landingpage
   ```

3. Verifique se o Node.js está funcionando:

   ```powershell
   node -v
   npm -v
   ```

4. Se estiver funcionando, execute os comandos de validação:

   ```powershell
   npm run lint
   npm run build
   npm run dev
   ```

### Opção 2: Configurar PATH no Git Bash

1. Adicione o caminho do Node.js ao PATH do Git Bash
2. Edite o arquivo `~/.bashrc` ou `~/.bash_profile`
3. Adicione:

   ```bash
   export PATH="/c/Users/rasta/AppData/Roaming/nvm:$PATH"
   ```

### Opção 3: Usar Caminho Completo

Se o Node.js estiver instalado em um local específico, use o caminho completo:

```bash
/c/Users/rasta/AppData/Roaming/nvm/v20.12.2/node.exe -v
```

## Comandos de Validação

Após resolver o problema do Node.js, execute:

```bash
# 1. Verificar versão do Node
node -v

# 2. Verificar versão do npm
npm -v

# 3. Rodar lint (deve retornar ZERO erros)
npm run lint

# 4. Rodar build (deve retornar ZERO erros)
npm run build

# 5. Rodar desenvolvimento
npm run dev
```

## Status do Projeto

✅ **Commit inicial realizado com sucesso**
✅ **Estrutura do monorepo configurada**
✅ **Regras de qualidade atualizadas**
⚠️ **Node.js precisa ser configurado corretamente**

## Próximos Passos

1. **Configure o Node.js** seguindo uma das opções acima
2. **Execute os comandos de validação**
3. **Me avise quando estiver funcionando** para continuarmos com a implementação do módulo de autenticação

## Estrutura Atual

```
gwan-landingpage/
├── frontend/          # React + Material Design
├── backend/           # NestJS + TypeORM
├── shared/            # Código compartilhado
├── docs/              # Documentação
├── .github/           # CI/CD
├── docker-compose.yml # Docker
└── package.json       # Root
```

## Funcionalidades Implementadas

- ✅ Monorepo configurado
- ✅ Frontend React com Material Design
- ✅ Backend NestJS com TypeORM
- ✅ Docker Compose com PostgreSQL
- ✅ CI/CD com GitHub Actions
- ✅ ESLint e Prettier configurados
- ✅ Husky para git hooks
- ✅ Commitlint para validação de commits
- ✅ Documentação completa

## Próximas Funcionalidades

- 🔄 Sistema de autenticação em 3 passos
- 🔄 Upload de imagens
- 🔄 Integração com WhatsApp/Email
- 🔄 Landing page responsiva
- 🔄 Testes automatizados

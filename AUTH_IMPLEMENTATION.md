# Sistema de Autenticação - Gwan Landing Page

## Status Atual do Desenvolvimento

- ✅ **Etapa 1: Registro de Usuário**
  - O usuário pode se registrar informando nome, email e telefone (WhatsApp ou email).
  - Validação de dados feita via DTOs com decorators do `class-validator`.
  - Endpoint: `POST /auth/register`
  - O código de ativação é retornado na resposta para facilitar testes.

- ✅ **Etapa 2: Ativação de Conta**
  - O usuário ativa a conta informando o `userId` e o `activationCode` recebido.
  - Validação de dados feita via DTOs com decorators do `class-validator`.
  - Endpoint: `POST /auth/activate/:userId`
  - Testado e funcionando.

- ⏳ **Etapa 3: Conclusão de Perfil (Próximo Passo)**
  - O usuário fará upload da foto de perfil após ativação.
  - Endpoint: `POST /auth/complete-profile/:userId` (aguardando implementação e testes)

---

## Como Testar (Resumo)

### 1. Registro

- Use o arquivo `backend/auth-register.http` para enviar um POST para `/auth/register`.
- Exemplo de payload:

```json
{
  "name": "Pedro Henrique Pinheiro de Almeida",
  "email": "pedro.hp.almeida@gmail.com",
  "phone": "11987221050"
}
```

- A resposta trará `userId` e `activationCode`.

### 2. Ativação

- Use o mesmo arquivo `.http` para ativar o usuário:
- Exemplo:

```
POST http://localhost:3001/auth/activate/SEU_USER_ID
Content-Type: application/json

{
  "activationCode": "SEU_CODIGO"
}
```

- Deve retornar sucesso se o código estiver correto.

---

## Próximos Passos (Para Retomar Amanhã)

- Implementar e testar a etapa de **Conclusão de Perfil**:
  - Upload de imagem de perfil
  - Validação e armazenamento da imagem
  - Atualização do status do usuário para COMPLETED
- Garantir que o frontend consuma corretamente o endpoint de conclusão de perfil
- Escrever testes automatizados para o fluxo completo

---

**Dica:**

- Todos os endpoints e exemplos de payload estão no arquivo `backend/auth-register.http`.
- O código está versionado e pronto para retomada.

---

*Documentação atualizada automaticamente após testes bem-sucedidos das etapas de registro e ativação.*

# Padrões de API REST - Gwan Landing Page

> **IMPORTANTE**: Este projeto é um **MONOREPO** com frontend, backend e código compartilhado.
> Para regras completas do monorepo, consulte: `MONOREPO_RULES.md`

## Estrutura Padrão de Resposta

### Sucesso (200)

```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    // Dados específicos da operação
  }
}
```

### Erro (400, 401, 403, 404, 500)

```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Código do erro (opcional)"
}
```

## Endpoints Padronizados

### Autenticação

#### POST /auth/login-request

```json
{
  "success": true,
  "message": "Código enviado com sucesso",
  "loginCode": "123456" // Apenas em desenvolvimento
}
```

#### POST /auth/login-validate

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "jwt-token",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+5511999999999",
    "status": "ACTIVE"
  }
}
```

#### POST /auth/register

```json
{
  "success": true,
  "userId": "user_123",
  "message": "Usuário registrado com sucesso",
  "activationCode": "123456"
}
```

#### POST /auth/activate/:userId

```json
{
  "success": true,
  "message": "Usuário ativado com sucesso",
  "token": "jwt-token",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+5511999999999",
    "status": "ACTIVE"
  }
}
```

#### GET /auth/me

```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "ACTIVE"
  }
}
```

### Upload

#### POST /upload

```json
{
  "success": true,
  "imageUrl": "https://storage.example.com/users/user-123/image.jpg",
  "message": "Imagem do personagem enviada com sucesso!"
}
```

#### POST /upload/process

```json
{
  "success": true,
  "processedData": {
    "imageUrl": "https://storage.example.com/users/user-123/image.jpg",
    "processedAt": "2025-07-11T18:30:00.000Z",
    "analysis": {
      "confidence": 0.95,
      "features": ["character_detected", "pose_estimated"]
    }
  },
  "message": "Imagem do personagem processada com sucesso!"
}
```

## Regras de Padronização

### 1. Estrutura de Resposta

- **Sempre** incluir `success: boolean`
- **Sempre** incluir `message: string`
- **Opcional** incluir `data` ou campos específicos

### 2. Campos de Usuário

- **Sempre** usar `user` (não `userData`, `userInfo`, etc.)
- **Estrutura consistente**:

  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "status": "string"
  }
  ```

### 3. Tokens JWT

- **Sempre** usar `token` (não `jwt`, `accessToken`, etc.)

### 4. IDs de Usuário

- **Sempre** usar `userId` (não `id`, `user_id`, etc.)

### 5. Códigos de Ativação/Login

- **Sempre** usar `activationCode` e `loginCode`

### 6. URLs de Imagem

- **Sempre** usar `imageUrl` (não `url`, `image_url`, etc.)

### 7. Mensagens de Erro

- **Sempre** incluir `message` descritiva
- **Opcional** incluir `error` com código técnico

## Status Codes HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Erro de validação/requisição
- **401**: Não autorizado
- **403**: Acesso negado
- **404**: Recurso não encontrado
- **500**: Erro interno do servidor

## Validação de Entrada

### DTOs Padronizados

```typescript
export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
```

### Validação de Arquivos

```typescript
export class UploadFileDto {
  @IsFile()
  @MaxFileSize(20 * 1024 * 1024) // 20MB
  @FileType(['image/jpeg', 'image/png', 'image/gif'])
  file: Express.Multer.File;
}
```

## Documentação Swagger

### Padrão de Documentação

```typescript
@ApiOperation({ summary: 'Descrição da operação' })
@ApiResponse({
  status: 200,
  description: 'Sucesso',
  schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Operação realizada' },
      // outros campos...
    },
  },
})
@ApiResponse({
  status: 400,
  description: 'Erro de validação',
  schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      message: { type: 'string', example: 'Erro de validação' },
    },
  },
})
```

## Logs Padronizados

### Estrutura de Log

```typescript
this.logger.log(`Operação para usuário: ${userId}`);
this.logger.error(`Erro na operação: ${error.message}`);
```

### Níveis de Log

- **log**: Operações normais
- **warn**: Avisos importantes
- **error**: Erros que precisam atenção
- **debug**: Informações de debug (apenas em desenvolvimento)

## Segurança

### Headers Obrigatórios

- **Authorization**: `Bearer <token>` para rotas protegidas
- **Content-Type**: `application/json` para JSON
- **Content-Type**: `multipart/form-data` para uploads

### Validação de Token

- **Sempre** validar token em rotas protegidas
- **Sempre** retornar 401 para tokens inválidos
- **Sempre** incluir informações do usuário no token JWT

## Performance

### Cache

- **Sempre** usar cache para dados frequentemente acessados
- **Sempre** invalidar cache quando dados são modificados

### Rate Limiting

- **Sempre** implementar rate limiting em endpoints sensíveis
- **Sempre** retornar 429 quando limite é excedido

## Monitoramento

### Métricas

- **Sempre** registrar tempo de resposta
- **Sempre** registrar taxa de erro
- **Sempre** registrar uso de recursos

### Alertas

- **Sempre** configurar alertas para erros críticos
- **Sempre** configurar alertas para performance degradada

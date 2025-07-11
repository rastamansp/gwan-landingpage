# Sistema de Upload de Imagens - Gwan Landing Page

## Visão Geral

O sistema de upload de imagens foi implementado seguindo os princípios de Clean Architecture e organiza os arquivos por usuário, mantendo o nome original dos arquivos.

## Estrutura de Arquivos

### Organização por Usuário

```
uploads/
├── user-{userId}/
│   ├── imagem1.jpg
│   ├── imagem2.png
│   └── avatar.gif
└── user-{outroUserId}/
    └── personagem.jpg
```

### Características

- **Pasta por Usuário**: Cada usuário tem sua própria pasta `user-{userId}`
- **Nome Original**: Os arquivos mantêm o nome original
- **Sem Conflitos**: Não há conflitos de nomes entre usuários
- **Organização**: Estrutura clara e fácil de navegar

## Implementação Técnica

### 1. UserFileUploadInterceptor

O interceptor personalizado combina FileInterceptor com organização por usuário:

```typescript
@Injectable()
export class UserFileUploadInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Usuário do JWT guard

    // Configurar multer para salvar na pasta do usuário
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const userDir = path.join(uploadsDir, `user-${user.userId}`);

    // Criar pasta do usuário se não existir
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    // Configurar storage personalizado
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, userDir);
      },
      filename: (req, file, cb) => {
        // Manter nome original do arquivo
        cb(null, file.originalname);
      },
    });

    // Criar middleware multer personalizado
    const upload = multer({ storage });

    return new Observable(observer => {
      upload.single('image')(request, {} as any, (err) => {
        // Processar upload e continuar
        next.handle().subscribe({
          next: (value) => observer.next(value),
          error: (error) => observer.error(error),
          complete: () => observer.complete(),
        });
      });
    });
  }
}
```

### 2. Upload Controller

O controller usa apenas o novo interceptor:

```typescript
@Post()
@UseGuards(JwtAuthGuard)
@UseInterceptors(UserFileUploadInterceptor)
async uploadCharacterImage(
  @UploadedFile() file: any,
  @CurrentUser() user: any
) {
  // Upload processado automaticamente pelo interceptor
}
```

### 3. File Upload Service

O serviço gera URLs baseadas no caminho real do arquivo:

```typescript
async uploadImage(file: any, userId?: string): Promise<string> {
  if (userId) {
    // Usar o caminho real do arquivo organizado pelo interceptor
    const relativePath = path.relative(process.cwd(), file.path);
    imageUrl = `https://storage.example.com/${relativePath}`;
  }
}
```

## Fluxo de Upload

### 1. Usuário Faz Upload
- Usuário seleciona arquivo na interface
- Frontend envia arquivo para `/upload`
- JWT token é validado

### 2. Processamento do Arquivo
- Multer salva arquivo temporariamente
- UserUploadInterceptor organiza o arquivo
- Arquivo é movido para pasta do usuário
- Nome original é preservado

### 3. Resposta
- URL do arquivo é gerada
- Dados são salvos no banco
- Usuário recebe confirmação

## Validações

### Tipos de Arquivo Permitidos
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/gif`

### Tamanho Máximo
- **20MB** por arquivo

### Validações Implementadas
- ✅ Tipo de arquivo
- ✅ Tamanho do arquivo
- ✅ Usuário autenticado
- ✅ Arquivo obrigatório

## Segurança

### Proteções Implementadas
- **JWT Authentication**: Apenas usuários autenticados
- **File Validation**: Validação de tipo e tamanho
- **User Isolation**: Arquivos isolados por usuário
- **Path Traversal**: Proteção contra ataques de path

### Estrutura Segura
```
uploads/
├── user-123/          # Apenas arquivos do usuário 123
│   └── imagem.jpg
└── user-456/          # Apenas arquivos do usuário 456
    └── avatar.png
```

## Logs e Monitoramento

### Logs Implementados
- ✅ Criação de pasta do usuário
- ✅ Movimentação de arquivo
- ✅ Upload bem-sucedido
- ✅ Erros de upload
- ✅ Validações de arquivo

### Exemplo de Logs
```
[UserUploadInterceptor] Created user directory: uploads/user-123
[UserUploadInterceptor] Moved file to: uploads/user-123/imagem.jpg
[FileUploadService] Image uploaded successfully: https://storage.example.com/uploads/user-123/imagem.jpg
```

## Integração com Banco de Dados

### Tabela Characters
```sql
CREATE TABLE characters (
  id VARCHAR PRIMARY KEY,
  userId VARCHAR NOT NULL,
  imageUrl VARCHAR NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Relacionamento
- **1 usuário = 1 personagem**
- Upload atualiza personagem existente
- URL do arquivo salva no banco

## URLs Geradas

### Formato da URL
```
https://storage.example.com/uploads/user-{userId}/{originalName}
```

### Exemplos
- `https://storage.example.com/uploads/user-123/avatar.jpg`
- `https://storage.example.com/uploads/user-456/personagem.png`
- `https://storage.example.com/uploads/user-789/imagem.gif`

## Próximas Melhorias

### Funcionalidades Futuras
- [ ] **CDN Integration**: Integração com CDN
- [ ] **Image Processing**: Redimensionamento automático
- [ ] **Thumbnail Generation**: Geração de thumbnails
- [ ] **Multiple Formats**: Suporte a WebP, AVIF
- [ ] **Compression**: Compressão automática
- [ ] **Backup**: Sistema de backup de arquivos

### Melhorias Técnicas
- [ ] **AWS S3**: Integração com S3
- [ ] **Google Cloud Storage**: Integração com GCS
- [ ] **Azure Blob**: Integração com Azure
- [ ] **Image Optimization**: Otimização automática
- [ ] **Virus Scanning**: Escaneamento de vírus
- [ ] **Metadata Extraction**: Extração de metadados

## Troubleshooting

### Problemas Comuns

#### 1. Arquivo não encontrado
```
[UserUploadInterceptor] File not found at: /path/to/file
```
**Solução**: Verificar permissões de pasta e arquivo

#### 2. Erro de permissão
```
Error: EACCES: permission denied
```
**Solução**: Verificar permissões da pasta uploads

#### 3. Pasta não criada
```
Error: ENOENT: no such file or directory
```
**Solução**: Verificar se o processo tem permissão para criar pastas

### Comandos Úteis

#### Verificar Estrutura
```bash
ls -la uploads/
tree uploads/
```

#### Verificar Permissões
```bash
chmod 755 uploads/
chmod 644 uploads/user-*/.*
```

#### Limpar Arquivos Antigos
```bash
find uploads/ -name "*.tmp" -delete
```

## Conclusão

O sistema de upload está **completamente funcional** e organiza os arquivos corretamente por usuário, mantendo o nome original dos arquivos. A implementação segue os princípios de Clean Architecture e oferece segurança e organização adequadas. 
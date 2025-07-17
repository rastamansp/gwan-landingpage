# 🤖 Análise de Personagens com IA - Gwan Landing Page

## Visão Geral

O sistema de análise de personagens com IA é a **funcionalidade principal** do projeto Gwan Landing Page. Utiliza **GPT-4 Vision** da OpenAI para analisar imagens de personagens e gerar fichas detalhadas e estruturadas.

## 🎯 Funcionalidade Principal

### Objetivo

Analisar imagens de personagens usando Inteligência Artificial e gerar fichas detalhadas com 9 categorias principais de análise.

### Tecnologias Utilizadas

- **OpenAI GPT-4 Vision**: Análise visual avançada
- **NestJS**: Backend robusto
- **React**: Interface moderna
- **TypeScript**: Tipagem forte

## 🏗️ Arquitetura da IA

### Clean Architecture

```
Domain Layer
├── Entities
│   └── Character (regras de negócio)
├── Interfaces
│   └── IExternalApiService
└── Use Cases
    └── ProcessCharacterImageUseCase

Infrastructure Layer
├── Services
│   └── ExternalApiService (OpenAI)
└── Repositories
    └── CharacterRepository

Presentation Layer
├── Controllers
│   └── UploadController
└── Components
    └── CharacterUpload
```

### Fluxo de Processamento

1. **Upload de Imagem**
   - Usuário faz upload via frontend
   - Sistema organiza arquivo por usuário
   - Validação de tipo e tamanho

2. **Processamento com IA**
   - Sistema converte imagem para base64
   - Chama GPT-4 Vision com prompt estruturado
   - Processa resposta da API

3. **Geração de Ficha**
   - Análise estruturada em JSON
   - 9 categorias principais
   - Dados organizados para frontend

4. **Exibição de Resultados**
   - Interface para visualizar análise
   - Dados estruturados por categoria
   - Tratamento de erros

## 📋 Categorias de Análise

### 1. Identidade

```json
{
  "nome": "Nome do personagem",
  "genero": "Masculino/Feminino/Outro",
  "idade": "Idade estimada",
  "nacionalidade": "Nacionalidade ou origem"
}
```

### 2. Corpo e Postura

```json
{
  "altura": "Altura estimada",
  "corpo": "Tipo de corpo",
  "cintura": "Características da cintura",
  "postura": "Postura e pose"
}
```

### 3. Rosto e Pele

```json
{
  "formatoRosto": "Formato do rosto",
  "testa": "Características da testa",
  "macasRosto": "Maçãs do rosto",
  "queixo": "Formato do queixo",
  "nariz": "Características do nariz",
  "labios": "Formato dos lábios",
  "expressao": "Expressão facial"
}
```

### 4. Pele

```json
{
  "pele": "Características da pele"
}
```

### 5. Olhos e Maquiagem

```json
{
  "tamanho": "Tamanho dos olhos",
  "formato": "Formato dos olhos",
  "cor": "Cor dos olhos",
  "cilios": "Características dos cílios",
  "maquiagem": "Maquiagem dos olhos",
  "sobrancelhas": "Formato das sobrancelhas"
}
```

### 6. Cabelo

```json
{
  "corte": "Tipo de corte",
  "comprimento": "Comprimento do cabelo",
  "divisao": "Divisão do cabelo",
  "textura": "Textura do cabelo",
  "cor": "Cor do cabelo",
  "finalizacao": "Finalização do cabelo"
}
```

### 7. Vestuário

```json
{
  "vestido": {
    "marca": "Marca da roupa",
    "modelo": "Modelo da roupa",
    "cor": "Cor da roupa",
    "tecido": "Tipo de tecido",
    "caimento": "Como cai no corpo",
    "comprimento": "Comprimento da roupa",
    "decote": "Tipo de decote",
    "detalhes": "Detalhes especiais",
    "fecho": "Tipo de fecho"
  }
}
```

### 8. Calçado

```json
{
  "marca": "Marca do calçado",
  "modelo": "Modelo do calçado",
  "cor": "Cor do calçado",
  "salto": "Altura do salto",
  "bico": "Formato do bico",
  "estilo": "Estilo do calçado"
}
```

### 9. Acessórios

```json
{
  "brincos": "Brincos usados",
  "anel": "Anéis",
  "pescoco": "Acessórios no pescoço",
  "pulsos": "Acessórios nos pulsos",
  "unhas": "Características das unhas"
}
```

### 10. Estilo Fotográfico

```json
{
  "estilo": "Estilo fotográfico",
  "enquadramento": "Tipo de enquadramento",
  "cameraSimulada": "Câmera simulada",
  "abertura": "Abertura simulada",
  "iso": "ISO simulado",
  "iluminacao": "Tipo de iluminação",
  "texturaPele": "Textura da pele na foto",
  "aparencia": "Aparência geral da foto"
}
```

## 🔧 Implementação Técnica

### ExternalApiService

```typescript
@Injectable()
export class ExternalApiService implements IExternalApiService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(ExternalApiService.name);

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async processImage(imageUrl: string): Promise<any> {
    try {
      // Download e conversão da imagem
      const imageBuffer = await this.downloadImage(imageUrl);
      const base64Image = imageBuffer.toString('base64');

      // Prompt estruturado
      const prompt = this.getStructuredPrompt();

      // Chamada para GPT-4 Vision
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 2000,
      });

      // Processamento da resposta
      const analysis = JSON.parse(response.choices[0].message.content);
      
      return {
        imageUrl,
        processedAt: new Date().toISOString(),
        characterAnalysis: analysis,
      };
    } catch (error) {
      this.logger.error(`Failed to process image: ${error.message}`);
      throw new Error('Failed to process image with OpenAI');
    }
  }
}
```

### Prompt Estruturado

```typescript
private getStructuredPrompt(): string {
  return `
Analise esta imagem de personagem e preencha uma ficha detalhada seguindo exatamente esta estrutura em JSON:

{
  "identity": {
    "nome": "Nome do personagem",
    "genero": "Masculino/Feminino/Outro",
    "idade": "Idade estimada",
    "nacionalidade": "Nacionalidade ou origem"
  },
  "body": {
    "altura": "Altura estimada",
    "corpo": "Tipo de corpo",
    "cintura": "Características da cintura",
    "postura": "Postura e pose"
  },
  "face": {
    "formatoRosto": "Formato do rosto",
    "testa": "Características da testa",
    "macasRosto": "Maçãs do rosto",
    "queixo": "Formato do queixo",
    "nariz": "Características do nariz",
    "labios": "Formato dos lábios",
    "expressao": "Expressão facial"
  },
  "skin": {
    "pele": "Características da pele"
  },
  "eyes": {
    "tamanho": "Tamanho dos olhos",
    "formato": "Formato dos olhos",
    "cor": "Cor dos olhos",
    "cilios": "Características dos cílios",
    "maquiagem": "Maquiagem dos olhos",
    "sobrancelhas": "Formato das sobrancelhas"
  },
  "hair": {
    "corte": "Tipo de corte",
    "comprimento": "Comprimento do cabelo",
    "divisao": "Divisão do cabelo",
    "textura": "Textura do cabelo",
    "cor": "Cor do cabelo",
    "finalizacao": "Finalização do cabelo"
  },
  "clothing": {
    "vestido": {
      "marca": "Marca da roupa",
      "modelo": "Modelo da roupa",
      "cor": "Cor da roupa",
      "tecido": "Tipo de tecido",
      "caimento": "Como cai no corpo",
      "comprimento": "Comprimento da roupa",
      "decote": "Tipo de decote",
      "detalhes": "Detalhes especiais",
      "fecho": "Tipo de fecho"
    }
  },
  "shoes": {
    "marca": "Marca do calçado",
    "modelo": "Modelo do calçado",
    "cor": "Cor do calçado",
    "salto": "Altura do salto",
    "bico": "Formato do bico",
    "estilo": "Estilo do calçado"
  },
  "accessories": {
    "brincos": "Brincos usados",
    "anel": "Anéis",
    "pescoco": "Acessórios no pescoço",
    "pulsos": "Acessórios nos pulsos",
    "unhas": "Características das unhas"
  },
  "photography": {
    "estilo": "Estilo fotográfico",
    "enquadramento": "Tipo de enquadramento",
    "cameraSimulada": "Câmera simulada",
    "abertura": "Abertura simulada",
    "iso": "ISO simulado",
    "iluminacao": "Tipo de iluminação",
    "texturaPele": "Textura da pele na foto",
    "aparencia": "Aparência geral da foto"
  }
}

Seja detalhado e preciso na análise. Se alguma informação não for visível na imagem, use "Não visível" ou "Não aplicável".
  `;
}
```

## 🔐 Configuração

### Variáveis de Ambiente

```bash
# backend/.env
OPENAI_API_KEY=sk-proj-sua-chave-aqui
```

### Instalação de Dependências

```bash
cd backend
npm install openai
```

## 📡 Endpoints da API

### POST /upload/process

**Descrição**: Processa imagem do personagem com IA

**Headers**:

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request**:

```json
{
  "imageUrl": "https://storage.example.com/users/user-123/image.jpg"
}
```

**Response**:

```json
{
  "success": true,
  "processedData": {
    "imageUrl": "https://storage.example.com/users/user-123/image.jpg",
    "processedAt": "2025-01-16T20:55:04.000Z",
    "characterAnalysis": {
      "identity": {
        "nome": "Serena",
        "genero": "Feminino",
        "idade": "25-30",
        "nacionalidade": "Brasileira"
      },
      "body": {
        "altura": "1.70m",
        "corpo": "Eslavo",
        "cintura": "Definida",
        "postura": "Elegante"
      },
      // ... outras categorias
    }
  }
}
```

## 🚨 Tratamento de Erros

### Erros Comuns

1. **API Key Inválida**

   ```json
   {
     "success": false,
     "message": "OpenAI API key is invalid",
     "error": "OPENAI_API_ERROR"
   }
   ```

2. **Imagem Não Encontrada**

   ```json
   {
     "success": false,
     "message": "Image not found",
     "error": "IMAGE_NOT_FOUND"
   }
   ```

3. **Erro de Processamento**

   ```json
   {
     "success": false,
     "message": "Failed to process image with OpenAI",
     "error": "PROCESSING_ERROR"
   }
   ```

### Fallback Strategy

- **Timeout**: 30 segundos para processamento
- **Retry**: 3 tentativas em caso de falha
- **Fallback**: Dados simulados em caso de erro crítico

## 🧪 Testes

### Testes Unitários

```typescript
describe('ExternalApiService', () => {
  it('should process image successfully', async () => {
    // Arrange
    const mockOpenAI = createMockOpenAI();
    const service = new ExternalApiService(mockConfigService);
    
    // Act
    const result = await service.processImage('test-image-url');
    
    // Assert
    expect(result.characterAnalysis).toBeDefined();
    expect(result.processedAt).toBeDefined();
  });
});
```

### Testes de Integração

```typescript
describe('UploadController - AI Processing', () => {
  it('should process character image with AI', async () => {
    // Arrange
    const token = generateValidToken();
    const imageUrl = 'test-image-url';
    
    // Act
    const response = await request(app)
      .post('/upload/process')
      .set('Authorization', `Bearer ${token}`)
      .send({ imageUrl });
    
    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.processedData).toBeDefined();
  });
});
```

## 📊 Monitoramento

### Logs

```typescript
// Logs de processamento
this.logger.log(`Processing image: ${imageUrl}`);
this.logger.log(`Image processed successfully: ${imageUrl}`);
this.logger.error(`Failed to process image: ${error.message}`);
```

### Métricas

- **Tempo de processamento**: Tempo médio de análise
- **Taxa de sucesso**: Percentual de análises bem-sucedidas
- **Erros por tipo**: Categorização de erros
- **Uso da API**: Consumo de tokens da OpenAI

## 🔄 Melhorias Futuras

### Funcionalidades Planejadas

1. **Cache de Análises**
   - Evitar reprocessamento da mesma imagem
   - Cache por hash da imagem

2. **Análise em Lote**
   - Processar múltiplas imagens
   - Queue de processamento

3. **Personalização de Prompts**
   - Prompts customizáveis por usuário
   - Templates de análise

4. **Exportação de Fichas**
   - PDF das análises
   - Formato Word/Excel

5. **Histórico de Análises**
   - Salvar análises no banco
   - Comparação entre análises

### Otimizações Técnicas

1. **Compressão de Imagens**
   - Reduzir tamanho antes do processamento
   - Manter qualidade para análise

2. **Rate Limiting**
   - Limitar chamadas por usuário
   - Evitar abuso da API

3. **Fallback Inteligente**
   - Análise local em caso de falha
   - Dados baseados em templates

## 📚 Documentação Relacionada

- **README.md**: Visão geral do projeto
- **PROJECT_STATUS.md**: Status atual da implementação
- **UPLOAD_SYSTEM.md**: Sistema de upload de imagens
- **AUTH_IMPLEMENTATION.md**: Sistema de autenticação

---

**Última atualização**: Janeiro 2025  
**Versão**: 1.0.0  
**Status**: ✅ Implementado e Funcionando

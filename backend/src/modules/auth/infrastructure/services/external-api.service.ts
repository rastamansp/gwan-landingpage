import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { IExternalApiService } from '../../domain/services/external-api-service.interface';
import {
  ProcessImageResponse,
  CharacterAnalysis,
} from '../../domain/types/character-analysis.types';

@Injectable()
export class ExternalApiService implements IExternalApiService {
  private readonly logger = new Logger(ExternalApiService.name);
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async processImage(imageUrl: string): Promise<ProcessImageResponse> {
    try {
      this.logger.log(
        `🤖 [ExternalApiService] Iniciando processamento de imagem`
      );
      this.logger.log(`🖼️ [ExternalApiService] URL da imagem: ${imageUrl}`);
      this.logger.log(
        `🔑 [ExternalApiService] OpenAI API Key configurada: ${this.configService.get<string>('OPENAI_API_KEY') ? 'SIM' : 'NÃO'}`
      );

      // Prompt estruturado para análise de personagens
      const prompt = `Analise esta imagem de um personagem e preencha uma ficha detalhada em JSON com as seguintes categorias:

1. **IDENTIDADE**: Nome, idade, gênero, ocupação, personalidade, background
2. **CORPO**: Altura, peso, tipo corporal, características físicas, marcas/cicatrizes
3. **ROSTO**: Formato, características faciais, expressão, detalhes únicos
4. **OLHOS**: Cor, formato, tamanho, características, expressão
5. **CABELO**: Cor, estilo, comprimento, textura, características
6. **VESTUÁRIO**: Tipo de roupa, cor, estilo, detalhes, acessórios
7. **CALÇADO**: Tipo, cor, estilo, características
8. **ACESSÓRIOS**: Tipos de acessórios, detalhes, posicionamento
9. **ESTILO FOTOGRÁFICO**: Iluminação, ângulo, composição, ambiente, qualidade

IMPORTANTE:
- Responda APENAS com JSON válido
- Use arrays para características múltiplas
- Seja detalhado e específico
- Inclua confiança da análise (0-1)
- Use português brasileiro
- Se algo não for visível, use "Não visível" ou "Não aplicável"

Estrutura JSON esperada:
{
  "identidade": {
    "nome": "string",
    "idade": "string", 
    "genero": "string",
    "ocupacao": "string",
    "personalidade": "string",
    "background": "string"
  },
  "corpo": {
    "altura": "string",
    "peso": "string", 
    "tipoCorporal": "string",
    "caracteristicas": ["string"],
    "marcas": ["string"]
  },
  "rosto": {
    "formato": "string",
    "caracteristicas": ["string"],
    "expressao": "string",
    "detalhes": ["string"]
  },
  "olhos": {
    "cor": "string",
    "formato": "string",
    "tamanho": "string",
    "caracteristicas": ["string"],
    "expressao": "string"
  },
  "cabelo": {
    "cor": "string",
    "estilo": "string",
    "comprimento": "string",
    "textura": "string",
    "caracteristicas": ["string"]
  },
  "vestuario": {
    "tipo": "string",
    "cor": "string",
    "estilo": "string",
    "detalhes": ["string"],
    "acessorios": ["string"]
  },
  "calcado": {
    "tipo": "string",
    "cor": "string",
    "estilo": "string",
    "caracteristicas": ["string"]
  },
  "acessorios": {
    "tipos": ["string"],
    "detalhes": ["string"],
    "posicionamento": ["string"]
  },
  "estiloFotografico": {
    "iluminacao": "string",
    "angulo": "string",
    "composicao": "string",
    "ambiente": "string",
    "qualidade": "string"
  },
  "metadata": {
    "confianca": 0.95,
    "processadoEm": "2024-01-16T20:55:00.000Z",
    "versaoIA": "GPT-4 Vision"
  }
}`;

      this.logger.log(`📝 [ExternalApiService] Prompt estruturado preparado`);
      this.logger.log(
        `🚀 [ExternalApiService] Chamando OpenAI GPT-4 Vision...`
      );

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 2000,
        temperature: 0.3,
      });

      this.logger.log(`📡 [ExternalApiService] Resposta recebida da OpenAI`);
      this.logger.log(
        `📊 [ExternalApiService] Tokens usados: ${response.usage?.total_tokens || 'N/A'}`
      );
      const content = response.choices[0]?.message?.content;

      if (!content) {
        this.logger.error(`❌ [ExternalApiService] Resposta vazia da OpenAI`);
        throw new Error('No response content from OpenAI');
      }

      this.logger.log(`🔍 [ExternalApiService] Extraindo JSON da resposta...`);
      // Extrair JSON da resposta
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        this.logger.error(
          `❌ [ExternalApiService] JSON não encontrado na resposta`
        );
        this.logger.error(
          `📄 [ExternalApiService] Conteúdo recebido: ${content.substring(0, 20)}`
        );
        throw new Error('No JSON found in OpenAI response');
      }

      this.logger.log(`✅ [ExternalApiService] JSON extraído com sucesso`);
      const analysis: CharacterAnalysis = JSON.parse(jsonMatch[0]);
      this.logger.log(
        `📋 [ExternalApiService] Análise parseada: ${JSON.stringify(analysis).substring(0, 200)}`
      );

      this.logger.log(
        `✅ [ExternalApiService] Processamento concluído com sucesso`
      );
      this.logger.log(
        `🎯 [ExternalApiService] Nome identificado: ${analysis?.identidade?.nome || 'N/A'}`
      );

      return {
        success: true,
        analysis,
        message: 'Análise de personagem realizada com sucesso',
      };
    } catch (error) {
      this.logger.error(
        `❌ [ExternalApiService] Erro no processamento: ${error.message}`
      );
      this.logger.error(`🔍 [ExternalApiService] Stack trace: ${error.stack}`);

      // Tratamento específico de erros da OpenAI
      if (error.message.includes('API key')) {
        this.logger.error(`🔑 [ExternalApiService] Erro de API Key da OpenAI`);
        return {
          success: false,
          error: 'OPENAI_API_ERROR',
          message: 'OpenAI API key is invalid',
        };
      }

      if (error.message.includes('rate limit')) {
        this.logger.error(
          `⏰ [ExternalApiService] Rate limit da OpenAI excedido`
        );
        return {
          success: false,
          error: 'RATE_LIMIT_ERROR',
          message: 'Rate limit exceeded for OpenAI API',
        };
      }

      return {
        success: false,
        error: 'PROCESSING_ERROR',
        message: `Failed to process image with OpenAI: ${error.message}`,
      };
    }
  }
}

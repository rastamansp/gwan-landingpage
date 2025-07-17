import { AuthApiService } from '../../infrastructure/services/auth-api.service';

export interface ProcessCharacterImageRequest {
  token: string;
}

export interface ProcessCharacterImageResponse {
  success: boolean;
  processedData?: {
    analysis: any;
    processedAt: string;
    imageUrl: string;
  };
  error?: string;
}

export class ProcessCharacterImageUseCase {
  constructor(private readonly authApiService: AuthApiService) { }

  async execute(request: ProcessCharacterImageRequest): Promise<ProcessCharacterImageResponse> {
    try {
      const result = await this.authApiService.processCharacterImage(request.token);

      return {
        success: true,
        processedData: result.processedData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao processar imagem',
      };
    }
  }
} 
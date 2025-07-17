import { Injectable, Inject, Logger } from '@nestjs/common';
import { ICharacterRepository } from '../../domain/repositories/character-repository.interface';
import { IFileUploadService } from '../../domain/services/file-upload-service.interface';
import { IExternalApiService } from '../../domain/services/external-api-service.interface';
import { CharacterAnalysis } from '../../domain/types/character-analysis.types';
import {
  CharacterAnalysisHistoryEntity,
  AnalysisStatus,
} from '../../domain/entities/character-analysis-history.entity';
import {
  CHARACTER_REPOSITORY,
  FILE_UPLOAD_SERVICE,
  EXTERNAL_API_SERVICE,
} from '../../domain/tokens/injection-tokens';

export class ProcessCharacterImageInput {
  constructor(public readonly userId: string) {}
}

export class ProcessCharacterImageOutput {
  constructor(
    public readonly success: boolean,
    public readonly analysis?: CharacterAnalysis,
    public readonly error?: string,
    public readonly message?: string,
    public readonly processedData?: {
      analysis: CharacterAnalysis;
      processedAt: string;
      imageUrl: string;
    }
  ) {}
}

@Injectable()
export class ProcessCharacterImageUseCase {
  private readonly logger = new Logger(ProcessCharacterImageUseCase.name);

  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
    @Inject(FILE_UPLOAD_SERVICE)
    private readonly fileUploadService: IFileUploadService,
    @Inject(EXTERNAL_API_SERVICE)
    private readonly externalApiService: IExternalApiService
  ) {}

  async execute(
    input: ProcessCharacterImageInput
  ): Promise<ProcessCharacterImageOutput> {
    try {
      this.logger.log(
        `🎯 [ProcessCharacterImageUseCase] Iniciando processamento`
      );
      this.logger.log(
        `👤 [ProcessCharacterImageUseCase] userId: ${input.userId}`
      );

      //1Verificar se o usuário tem um personagem com imagem
      this.logger.log(
        `🔍 [ProcessCharacterImageUseCase] Buscando personagem do usuário...`
      );
      const character = await this.characterRepository.findByUserId(
        input.userId
      );

      if (!character) {
        this.logger.error(
          `❌ [ProcessCharacterImageUseCase] Usuário não possui personagem cadastrado`
        );
        return new ProcessCharacterImageOutput(
          false,
          undefined,
          'Usuário não possui personagem cadastrado'
        );
      }

      this.logger.log(
        `✅ [ProcessCharacterImageUseCase] Personagem encontrado: ${character.getId()}`
      );
      this.logger.log(
        `🖼️ [ProcessCharacterImageUseCase] URL da imagem: ${character.getImageUrl()}`
      );

      if (!character.getImageUrl()) {
        this.logger.error(
          `❌ [ProcessCharacterImageUseCase] Personagem não possui imagem para processar`
        );
        return new ProcessCharacterImageOutput(
          false,
          undefined,
          'Personagem não possui imagem para processar'
        );
      }

      // 2. Processar imagem usando API externa
      this.logger.log(
        `🤖 [ProcessCharacterImageUseCase] Chamando ExternalApiService...`
      );
      const processResponse = await this.externalApiService.processImage(
        character.getImageUrl()
      );

      this.logger.log(
        `📊 [ProcessCharacterImageUseCase] Resposta do processamento: ${processResponse.success ? 'SUCESSO' : 'ERRO'}`
      );
      if (!processResponse.success) {
        this.logger.error(
          `❌ [ProcessCharacterImageUseCase] Erro no processamento: ${processResponse.message}`
        );
      }

      // 3. Salvar histórico de análise
      this.logger.log(
        `💾 [ProcessCharacterImageUseCase] Salvando histórico de análise...`
      );
      const history: Partial<CharacterAnalysisHistoryEntity> = {
        characterId: character.getId(),
        userId: character.getUserId(),
        imageUrl: character.getImageUrl(),
        analysis: processResponse.analysis,
        status: processResponse.success
          ? AnalysisStatus.SUCCESS
          : AnalysisStatus.ERROR,
        errorMessage: processResponse.success ? null : processResponse.message,
        openaiResponse: processResponse,
        processedAt: new Date(),
      };
      if (
        typeof (this.characterRepository as any).saveAnalysisHistory ===
        'function'
      ) {
        await (this.characterRepository as any).saveAnalysisHistory(history);
        this.logger.log(
          `✅ [ProcessCharacterImageUseCase] Histórico salvo com sucesso`
        );
      }

      if (!processResponse.success) {
        this.logger.error(
          `❌ [ProcessCharacterImageUseCase] Processamento falhou, retornando erro`
        );
        return new ProcessCharacterImageOutput(
          false,
          undefined,
          processResponse.error,
          processResponse.message
        );
      }

      // 4. Atualizar personagem com dados processados
      this.logger.log(
        `🔄 [ProcessCharacterImageUseCase] Atualizando personagem com dados processados...`
      );
      const ficha = processResponse.analysis;
      const updatedCharacter = character.updateAnalysis(
        ficha,
        ficha?.identidade?.nome,
        ficha?.identidade?.idade,
        ficha?.identidade?.genero
      );
      await this.characterRepository.update(updatedCharacter);
      this.logger.log(
        `✅ [ProcessCharacterImageUseCase] Personagem atualizado com sucesso`
      );

      this.logger.log(
        `🎉 [ProcessCharacterImageUseCase] Processamento concluído com sucesso!`
      );
      this.logger.log(
        `📋 [ProcessCharacterImageUseCase] Nome do personagem: ${ficha?.identidade?.nome || 'N/A'}`
      );
      this.logger.log(
        `👤 [ProcessCharacterImageUseCase] Idade: ${ficha?.identidade?.idade || 'N/A'}`
      );
      this.logger.log(
        `⚧ [ProcessCharacterImageUseCase] Gênero: ${ficha?.identidade?.genero || 'N/A'}`
      );
      const processedData = {
        analysis: ficha,
        processedAt: new Date().toISOString(),
        imageUrl: character.getImageUrl(),
      };

      return new ProcessCharacterImageOutput(
        true,
        processResponse.analysis,
        undefined,
        processResponse.message,
        processedData
      );
    } catch (error) {
      this.logger.error(
        `❌ [ProcessCharacterImageUseCase] Erro inesperado: ${error.message}`
      );
      this.logger.error(
        `🔍 [ProcessCharacterImageUseCase] Stack trace: ${error.stack}`
      );
      return new ProcessCharacterImageOutput(
        false,
        undefined,
        `Erro ao processar imagem: ${error.message}`
      );
    }
  }
}

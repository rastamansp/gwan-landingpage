import { Injectable, Inject } from '@nestjs/common';
import { ICharacterRepository } from '../../domain/repositories/character-repository.interface';
import { IFileUploadService } from '../../domain/services/file-upload-service.interface';
import { IExternalApiService } from '../../domain/services/external-api-service.interface';
import {
  CHARACTER_REPOSITORY,
  FILE_UPLOAD_SERVICE,
  EXTERNAL_API_SERVICE,
} from '../../domain/tokens/injection-tokens';

export class ProcessCharacterImageInput {
  constructor(
    public readonly userId: string,
    public readonly imageUrl: string
  ) {}
}

export class ProcessCharacterImageOutput {
  constructor(
    public readonly success: boolean,
    public readonly processedData?: any,
    public readonly error?: string
  ) {}
}

@Injectable()
export class ProcessCharacterImageUseCase {
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
      // 1. Verificar se o usuário tem um personagem com imagem
      const character = await this.characterRepository.findByUserId(
        input.userId
      );

      if (!character) {
        return new ProcessCharacterImageOutput(
          false,
          undefined,
          'Usuário não possui personagem cadastrado'
        );
      }

      if (!character.getImageUrl()) {
        return new ProcessCharacterImageOutput(
          false,
          undefined,
          'Personagem não possui imagem para processar'
        );
      }

      // 2. Processar imagem usando API externa
      const processedData = await this.externalApiService.processImage(
        character.getImageUrl()
      );

      // 3. Atualizar personagem com dados processados (se necessário)
      // character.updateProcessedData(processedData);
      // await this.characterRepository.update(character);

      return new ProcessCharacterImageOutput(true, processedData);
    } catch (error) {
      return new ProcessCharacterImageOutput(
        false,
        undefined,
        `Erro ao processar imagem: ${error.message}`
      );
    }
  }
}

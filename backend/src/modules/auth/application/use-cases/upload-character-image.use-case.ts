import { Injectable, Inject } from '@nestjs/common';
import { ICharacterRepository } from '../../domain/repositories/character-repository.interface';
import { IFileUploadService } from '../../domain/services/file-upload-service.interface';
import { Character } from '../../domain/entities/character.entity';
import {
  CHARACTER_REPOSITORY,
  FILE_UPLOAD_SERVICE,
} from '../../domain/tokens/injection-tokens';

export class UploadCharacterImageInput {
  constructor(
    public readonly userId: string,
    public readonly imageFile: any
  ) {}
}

export class UploadCharacterImageOutput {
  constructor(
    public readonly success: boolean,
    public readonly imageUrl?: string,
    public readonly error?: string
  ) {}
}

@Injectable()
export class UploadCharacterImageUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
    @Inject(FILE_UPLOAD_SERVICE)
    private readonly fileUploadService: IFileUploadService
  ) {}

  async execute(
    input: UploadCharacterImageInput
  ): Promise<UploadCharacterImageOutput> {
    try {
      // Validar arquivo
      if (!input.imageFile) {
        return new UploadCharacterImageOutput(
          false,
          undefined,
          'Arquivo de imagem é obrigatório'
        );
      }

      // Validar tipo de arquivo
      if (!this.isValidImageFile(input.imageFile)) {
        return new UploadCharacterImageOutput(
          false,
          undefined,
          'Tipo de arquivo não suportado. Use apenas imagens (jpg, jpeg, png, gif)'
        );
      }

      // Validar tamanho (20MB)
      if (input.imageFile.size > 20 * 1024 * 1024) {
        return new UploadCharacterImageOutput(
          false,
          undefined,
          'Arquivo muito grande. Tamanho máximo: 20MB'
        );
      }

      // Upload da imagem
      const imageUrl = await this.fileUploadService.uploadImage(
        input.imageFile,
        input.userId
      );

      // Verificar se o usuário já tem um personagem
      const existingCharacter = await this.characterRepository.findByUserId(
        input.userId
      );

      if (existingCharacter) {
        // Atualizar personagem existente
        const updatedCharacter = existingCharacter.updateImage(imageUrl);
        await this.characterRepository.update(updatedCharacter);
      } else {
        // Criar novo personagem
        const newCharacter = Character.create(input.userId, imageUrl);
        await this.characterRepository.save(newCharacter);
      }

      return new UploadCharacterImageOutput(true, imageUrl);
    } catch (error) {
      return new UploadCharacterImageOutput(
        false,
        undefined,
        `Erro ao fazer upload: ${error.message}`
      );
    }
  }

  private isValidImageFile(file: any): boolean {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
    ];
    return allowedMimeTypes.includes(file.mimetype);
  }
}

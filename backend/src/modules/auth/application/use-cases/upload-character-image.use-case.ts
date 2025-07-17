import { Injectable, Inject, Logger } from '@nestjs/common';
import { ICharacterRepository } from '../../domain/repositories/character-repository.interface';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { Character } from '../../domain/entities/character.entity';
import { MinioService } from '../../infrastructure/services/minio.service';
import {
  CHARACTER_REPOSITORY,
  USER_REPOSITORY,
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
  private readonly logger = new Logger(UploadCharacterImageUseCase.name);

  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly minioService: MinioService
  ) {}

  async execute(
    input: UploadCharacterImageInput
  ): Promise<UploadCharacterImageOutput> {
    try {
      this.logger.log(
        `📤 [UploadCharacterImageUseCase] Iniciando upload de imagem`
      );
      this.logger.log(
        `👤 [UploadCharacterImageUseCase] userId: ${input.userId}`
      );
      this.logger.log(
        `📁 [UploadCharacterImageUseCase] Arquivo: ${input.imageFile?.originalname || 'N/A'}`
      );

      // Validar arquivo
      if (!input.imageFile) {
        this.logger.error(
          `❌ [UploadCharacterImageUseCase] Arquivo de imagem é obrigatório`
        );
        return new UploadCharacterImageOutput(
          false,
          undefined,
          'Arquivo de imagem é obrigatório'
        );
      }

      // Validar tipo de arquivo
      this.logger.log(
        `🔍 [UploadCharacterImageUseCase] Validando tipo de arquivo...`
      );
      if (!this.isValidImageFile(input.imageFile)) {
        this.logger.error(
          `❌ [UploadCharacterImageUseCase] Tipo de arquivo inválido: ${input.imageFile.mimetype}`
        );
        return new UploadCharacterImageOutput(
          false,
          undefined,
          'Tipo de arquivo não suportado. Use apenas imagens (jpg, jpeg, png, gif)'
        );
      }
      this.logger.log(
        `✅ [UploadCharacterImageUseCase] Tipo de arquivo válido: ${input.imageFile.mimetype}`
      );

      // Validar tamanho (20MB)
      this.logger.log(
        `📏 [UploadCharacterImageUseCase] Validando tamanho do arquivo...`
      );
      this.logger.log(
        `📊 [UploadCharacterImageUseCase] Tamanho atual: ${input.imageFile.size} bytes`
      );
      this.logger.log(
        `📊 [UploadCharacterImageUseCase] Limite máximo: ${20 * 1024 * 1024} bytes`
      );

      if (input.imageFile.size > 20 * 1024 * 1024) {
        this.logger.error(
          `❌ [UploadCharacterImageUseCase] Arquivo muito grande: ${input.imageFile.size} bytes`
        );
        return new UploadCharacterImageOutput(
          false,
          undefined,
          'Arquivo muito grande. Tamanho máximo: 20MB'
        );
      }
      this.logger.log(
        `✅ [UploadCharacterImageUseCase] Tamanho do arquivo válido`
      );

      // Upload da imagem para o MinIO
      this.logger.log(
        `🚀 [UploadCharacterImageUseCase] Iniciando upload para MinIO...`
      );
      const imageUrl = await this.minioService.uploadFile(
        input.imageFile,
        input.userId
      );
      this.logger.log(
        `✅ [UploadCharacterImageUseCase] Upload concluído: ${imageUrl}`
      );

      // Verificar se o usuário já tem um personagem
      this.logger.log(
        `🔍 [UploadCharacterImageUseCase] Verificando personagem existente...`
      );
      const existingCharacter = await this.characterRepository.findByUserId(
        input.userId
      );

      if (existingCharacter) {
        this.logger.log(
          `🔄 [UploadCharacterImageUseCase] Personagem existente encontrado, atualizando...`
        );
        // Atualizar personagem existente
        const updatedCharacter = existingCharacter.updateImage(imageUrl);
        await this.characterRepository.update(updatedCharacter);
        this.logger.log(
          `✅ [UploadCharacterImageUseCase] Personagem atualizado com sucesso`
        );
      } else {
        this.logger.log(
          `🆕 [UploadCharacterImageUseCase] Criando novo personagem...`
        );
        // Criar novo personagem
        const newCharacter = Character.create(input.userId, imageUrl);
        await this.characterRepository.save(newCharacter);
        this.logger.log(
          `✅ [UploadCharacterImageUseCase] Novo personagem criado com sucesso`
        );
      }

      // Atualizar profileImageUrl do usuário
      this.logger.log(
        `👤 [UploadCharacterImageUseCase] Atualizando profileImageUrl do usuário...`
      );
      const user = await this.userRepository.findById(input.userId);
      if (user) {
        user.completeProfile(imageUrl);
        await this.userRepository.update(user);
        this.logger.log(
          `✅ [UploadCharacterImageUseCase] ProfileImageUrl do usuário atualizada: ${imageUrl}`
        );
      } else {
        this.logger.warn(
          `⚠️ [UploadCharacterImageUseCase] Usuário não encontrado: ${input.userId}`
        );
      }

      this.logger.log(
        `🎉 [UploadCharacterImageUseCase] Upload concluído com sucesso!`
      );
      this.logger.log(
        `🔗 [UploadCharacterImageUseCase] URL final: ${imageUrl}`
      );

      return new UploadCharacterImageOutput(true, imageUrl);
    } catch (error) {
      this.logger.error(
        `❌ [UploadCharacterImageUseCase] Erro no upload: ${error.message}`
      );
      this.logger.error(
        `🔍 [UploadCharacterImageUseCase] Stack trace: ${error.stack}`
      );
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

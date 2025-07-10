import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { IFileUploadService } from '../../domain/services/file-upload-service.interface';
import {
  CompleteProfileInput,
  CompleteProfileOutput,
} from '../dtos/complete-profile.dto';
import {
  USER_REPOSITORY,
  FILE_UPLOAD_SERVICE,
} from '../../domain/tokens/injection-tokens';

@Injectable()
export class CompleteProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(FILE_UPLOAD_SERVICE)
    private readonly fileUploadService: IFileUploadService
  ) {}

  async execute(input: CompleteProfileInput): Promise<CompleteProfileOutput> {
    try {
      // 1. Buscar usuário
      const user = await this.userRepository.findById(input.userId);
      if (!user) {
        return new CompleteProfileOutput(
          false,
          undefined,
          undefined,
          'User not found'
        );
      }

      // 2. Validar se usuário está ativado
      if (user.getStatus() !== 'ACTIVATED') {
        return new CompleteProfileOutput(
          false,
          undefined,
          undefined,
          'User must be activated before completing profile'
        );
      }

      // 3. Validar arquivo de imagem
      if (!input.imageFile) {
        return new CompleteProfileOutput(
          false,
          undefined,
          undefined,
          'Image file is required'
        );
      }

      // 4. Upload da imagem
      const imageUrl = await this.fileUploadService.uploadImage(
        input.imageFile
      );

      // 5. Completar perfil
      user.completeProfile(imageUrl);

      // 6. Salvar alterações
      await this.userRepository.update(user);

      return new CompleteProfileOutput(
        true,
        imageUrl,
        'Profile completed successfully!',
        undefined
      );
    } catch (error) {
      return new CompleteProfileOutput(
        false,
        undefined,
        undefined,
        error.message || 'Failed to complete profile'
      );
    }
  }
}

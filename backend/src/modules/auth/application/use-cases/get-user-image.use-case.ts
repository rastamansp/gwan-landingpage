import { Injectable, Inject, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { USER_REPOSITORY } from '../../domain/tokens/injection-tokens';

export class GetUserImageInput {
  constructor(public readonly userId: string) {}
}

export class GetUserImageOutput {
  constructor(
    public readonly success: boolean,
    public readonly imageUrl?: string,
    public readonly error?: string
  ) {}
}

@Injectable()
export class GetUserImageUseCase {
  private readonly logger = new Logger(GetUserImageUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: GetUserImageInput): Promise<GetUserImageOutput> {
    try {
      this.logger.log(`🔍 [GetUserImageUseCase] Buscando imagem do usuário`);
      this.logger.log(`👤 [GetUserImageUseCase] userId: ${input.userId}`);

      const user = await this.userRepository.findById(input.userId);

      if (!user) {
        this.logger.warn(
          `⚠️ [GetUserImageUseCase] Usuário não encontrado: ${input.userId}`
        );
        return new GetUserImageOutput(
          false,
          undefined,
          'Usuário não encontrado'
        );
      }

      const imageUrl = user.getProfileImageUrl();

      if (!imageUrl) {
        this.logger.log(
          `📭 [GetUserImageUseCase] Usuário não possui imagem: ${input.userId}`
        );
        return new GetUserImageOutput(
          true,
          undefined,
          'Usuário não possui imagem'
        );
      }

      this.logger.log(
        `✅ [GetUserImageUseCase] Imagem encontrada: ${imageUrl}`
      );
      return new GetUserImageOutput(true, imageUrl);
    } catch (error) {
      this.logger.error(
        `❌ [GetUserImageUseCase] Erro ao buscar imagem: ${error.message}`
      );
      this.logger.error(`🔍 [GetUserImageUseCase] Stack trace: ${error.stack}`);
      return new GetUserImageOutput(
        false,
        undefined,
        `Erro ao buscar imagem: ${error.message}`
      );
    }
  }
}

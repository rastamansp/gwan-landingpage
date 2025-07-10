import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import {
  ActivateUserInput,
  ActivateUserOutput,
} from '../dtos/activate-user.dto';
import { USER_REPOSITORY } from '../../domain/tokens/injection-tokens';

@Injectable()
export class ActivateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: ActivateUserInput): Promise<ActivateUserOutput> {
    try {
      // 1. Buscar usuário
      const user = await this.userRepository.findById(input.userId);
      if (!user) {
        return new ActivateUserOutput(false, undefined, 'User not found');
      }

      // 2. Validar se usuário está pendente
      if (user.getStatus() !== 'PENDING') {
        return new ActivateUserOutput(
          false,
          undefined,
          'User is not in pending status'
        );
      }

      // 3. Ativar usuário
      const activationResult = user.activate(input.activationCode);

      if (!activationResult) {
        return new ActivateUserOutput(
          false,
          undefined,
          'Invalid activation code'
        );
      }

      // 4. Salvar alterações
      await this.userRepository.update(user);

      return new ActivateUserOutput(
        true,
        'User activated successfully. You can now complete your profile.',
        undefined
      );
    } catch (error) {
      return new ActivateUserOutput(
        false,
        undefined,
        error.message || 'Failed to activate user'
      );
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { User, UserStatus } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { INotificationService } from '../../domain/services/notification-service.interface';
import {
  RegisterUserInput,
  RegisterUserOutput,
} from '../dtos/register-user.dto';
import {
  USER_REPOSITORY,
  NOTIFICATION_SERVICE,
} from '../../domain/tokens/injection-tokens';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    try {
      // 1. Validar se email já existe
      const existingUserByEmail = await this.userRepository.findByEmail(
        input.email
      );
      if (existingUserByEmail) {
        return new RegisterUserOutput(
          false,
          undefined,
          undefined,
          'Email already registered'
        );
      }

      // 2. Validar se telefone já existe
      const existingUserByPhone = await this.userRepository.findByPhone(
        input.phone
      );
      if (existingUserByPhone) {
        return new RegisterUserOutput(
          false,
          undefined,
          undefined,
          'Phone already registered'
        );
      }

      // 3. Criar usuário
      const userId = this.generateUserId();
      const now = new Date();

      const user = new User(
        userId,
        input.name,
        input.email,
        input.phone,
        UserStatus.PENDING,
        now,
        now
      );

      // 4. Gerar código de ativação
      user.generateActivationCode();

      // 5. Salvar usuário
      await this.userRepository.save(user);

      // 6. Enviar código de ativação
      const activationCode = user.getActivationCode();
      if (!activationCode) {
        throw new Error('Failed to generate activation code');
      }

      await this.notificationService.sendActivationCode(
        user.getEmail(),
        user.getPhone(),
        activationCode
      );

      return new RegisterUserOutput(
        true,
        user.getId(),
        'User registered successfully. Check your email and phone for activation code.',
        undefined,
        activationCode
      );
    } catch (error) {
      return new RegisterUserOutput(
        false,
        undefined,
        undefined,
        error.message || 'Failed to register user'
      );
    }
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

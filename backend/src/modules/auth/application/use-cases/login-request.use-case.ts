import { Injectable, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { INotificationService } from '../../domain/services/notification-service.interface';
import {
  USER_REPOSITORY,
  NOTIFICATION_SERVICE,
} from '../../domain/tokens/injection-tokens';
import { Inject } from '@nestjs/common';

export class LoginRequestInput {
  constructor(public readonly contact: string) {}
}

export class LoginRequestOutput {
  constructor(
    public readonly success: boolean,
    public readonly message?: string,
    public readonly error?: string,
    public readonly loginCode?: string
  ) {}
}

@Injectable()
export class LoginRequestUseCase {
  private readonly logger = new Logger(LoginRequestUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService
  ) {}

  async execute(input: LoginRequestInput): Promise<LoginRequestOutput> {
    try {
      this.logger.log(`Login request for contact: ${input.contact}`);

      // 1. Validar formato do contato
      this.validateContact(input.contact);

      // 2. Buscar usuário pelo contato
      const user = await this.userRepository.findByContact(input.contact);

      if (!user) {
        return new LoginRequestOutput(
          false,
          undefined,
          'Usuário não encontrado. Verifique o email ou WhatsApp informado.'
        );
      }

      // 3. Verificar se usuário está ativado ou completo
      const userStatus = user.getStatus();
      if (userStatus !== 'ACTIVATED' && userStatus !== 'COMPLETED') {
        return new LoginRequestOutput(
          false,
          undefined,
          'Usuário não está ativado. Complete o processo de cadastro primeiro.'
        );
      }

      // 4. Gerar código de login de 6 dígitos
      const loginCode = this.generateLoginCode();

      // 5. Salvar código temporário no usuário
      user.setLoginCode(loginCode);
      user.setLoginCodeExpiresAt(new Date(Date.now() + 10 * 60 * 1000)); // 10 minutos
      await this.userRepository.save(user);

      // 6. Enviar código via notificação
      const isEmail = input.contact.includes('@');
      const notificationResult = await this.notificationService.sendLoginCode(
        input.contact,
        loginCode,
        isEmail ? 'email' : 'whatsapp'
      );

      if (!notificationResult.success) {
        return new LoginRequestOutput(
          false,
          undefined,
          'Erro ao enviar código de login. Tente novamente.'
        );
      }

      return new LoginRequestOutput(
        true,
        `Código de login enviado para ${isEmail ? 'email' : 'WhatsApp'}`,
        undefined,
        loginCode // Apenas para desenvolvimento, remover em produção
      );
    } catch (error) {
      this.logger.error(`Error in login request: ${error.message}`);
      return new LoginRequestOutput(
        false,
        undefined,
        'Erro interno do servidor. Tente novamente.'
      );
    }
  }

  private validateContact(contact: string): void {
    if (!contact || contact.trim().length === 0) {
      throw new Error('Contato é obrigatório');
    }

    const isEmail = contact.includes('@');
    const isWhatsApp = /^\+?[1-9]\d{1,14}$/.test(contact.replace(/\D/g, ''));

    if (!isEmail && !isWhatsApp) {
      throw new Error('Formato de contato inválido. Use email ou WhatsApp.');
    }
  }

  private generateLoginCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

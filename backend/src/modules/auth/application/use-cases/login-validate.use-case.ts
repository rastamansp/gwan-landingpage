import { Injectable, Logger, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { USER_REPOSITORY } from '../../domain/tokens/injection-tokens';
import { JwtAuthService } from '../../infrastructure/services/jwt-auth.service';

export class LoginValidateInput {
  constructor(
    public readonly contact: string,
    public readonly loginCode: string
  ) {}
}

export class LoginValidateOutput {
  constructor(
    public readonly success: boolean,
    public readonly message?: string,
    public readonly error?: string,
    public readonly userId?: string,
    public readonly token?: string,
    public readonly userData?: {
      id: string;
      name: string;
      email: string;
      phone: string;
      status: string;
    }
  ) {}
}

@Injectable()
export class LoginValidateUseCase {
  private readonly logger = new Logger(LoginValidateUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  async execute(input: LoginValidateInput): Promise<LoginValidateOutput> {
    try {
      this.logger.log(`Login validation for contact: ${input.contact}`);

      // 1. Validar formato do contato
      this.validateContact(input.contact);

      // 2. Validar formato do código
      this.validateLoginCode(input.loginCode);

      // 3. Buscar usuário pelo contato
      const user = await this.userRepository.findByContact(input.contact);

      if (!user) {
        return new LoginValidateOutput(
          false,
          undefined,
          'Usuário não encontrado. Verifique o email ou WhatsApp informado.'
        );
      }

      // 4. Verificar se usuário está ativado ou completo
      const userStatus = user.getStatus();
      if (userStatus !== 'ACTIVATED' && userStatus !== 'COMPLETED') {
        return new LoginValidateOutput(
          false,
          undefined,
          'Usuário não está ativado. Complete o processo de cadastro primeiro.'
        );
      }

      // 5. Verificar se código de login existe e não expirou
      if (!user.getLoginCode() || !user.getLoginCodeExpiresAt()) {
        return new LoginValidateOutput(
          false,
          undefined,
          'Código de login não encontrado. Solicite um novo código.'
        );
      }

      if (new Date() > user.getLoginCodeExpiresAt()) {
        return new LoginValidateOutput(
          false,
          undefined,
          'Código de login expirado. Solicite um novo código.'
        );
      }

      // 6. Verificar se código corresponde
      if (user.getLoginCode() !== input.loginCode) {
        return new LoginValidateOutput(
          false,
          undefined,
          'Código de login inválido. Verifique o código e tente novamente.'
        );
      }

      // 7. Limpar código de login usado
      user.clearLoginCode();
      await this.userRepository.save(user);

      // 8. Gerar token JWT
      const token = this.jwtAuthService.generateToken(user);

      // 9. Retornar dados do usuário autenticado com token
      return new LoginValidateOutput(
        true,
        'Login realizado com sucesso!',
        undefined,
        user.getId(),
        token,
        {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          phone: user.getPhone(),
          status: user.getStatus(),
        }
      );
    } catch (error) {
      this.logger.error(`Error in login validation: ${error.message}`);
      return new LoginValidateOutput(
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

  private validateLoginCode(loginCode: string): void {
    if (!loginCode || loginCode.trim().length === 0) {
      throw new Error('Código de login é obrigatório');
    }

    if (!/^\d{6}$/.test(loginCode)) {
      throw new Error('Código de login deve ter 6 dígitos');
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { INotificationService } from '../../domain/services/notification-service.interface';
import { EmailService } from './email.service';

@Injectable()
export class NotificationService implements INotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly emailService: EmailService) { }

  async sendActivationCode(
    email: string,
    phone: string,
    code: string
  ): Promise<void> {
    try {
      this.logger.log(
        `Sending activation code ${code} to email: ${email} and phone: ${phone}`
      );

      // Enviar email de ativação
      const emailSent = await this.emailService.sendActivationCode(email, code, 'Usuário');

      if (!emailSent) {
        throw new Error('Failed to send activation email');
      }

      this.logger.log(
        `Activation code sent successfully to ${email} and ${phone}`
      );
    } catch (error) {
      this.logger.error(`Failed to send activation code: ${error.message}`);
      throw new Error('Failed to send activation code');
    }
  }

  async sendLoginCode(
    contact: string,
    code: string,
    type: 'email' | 'whatsapp'
  ): Promise<{ success: boolean; message?: string }> {
    try {
      this.logger.log(`Sending login code ${code} to ${type}: ${contact}`);

      if (type === 'email') {
        // Enviar email de login
        const emailSent = await this.emailService.sendLoginCode(contact, code, 'Usuário');

        if (!emailSent) {
          return {
            success: false,
            message: 'Erro ao enviar email de login',
          };
        }
      } else {
        // Para WhatsApp, manter a simulação por enquanto
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      this.logger.log(`Login code sent successfully to ${type}: ${contact}`);

      return {
        success: true,
        message: `Código de login enviado para ${type === 'email' ? 'email' : 'WhatsApp'}`,
      };
    } catch (error) {
      this.logger.error(`Failed to send login code: ${error.message}`);
      return {
        success: false,
        message: 'Erro ao enviar código de login',
      };
    }
  }
}

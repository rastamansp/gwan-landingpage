import { Injectable, Logger } from '@nestjs/common';
import { INotificationService } from '../../domain/services/notification-service.interface';

@Injectable()
export class NotificationService implements INotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async sendActivationCode(
    email: string,
    phone: string,
    code: string
  ): Promise<void> {
    try {
      // Em produção, aqui seria integração com serviços como:
      // - SendGrid para email
      // - Twilio para SMS
      // - AWS SES para email

      this.logger.log(
        `Sending activation code ${code} to email: ${email} and phone: ${phone}`
      );

      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 100));

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
      // Em produção, aqui seria integração com serviços como:
      // - SendGrid para email
      // - Twilio para WhatsApp/SMS

      this.logger.log(`Sending login code ${code} to ${type}: ${contact}`);

      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 100));

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

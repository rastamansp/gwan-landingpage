import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendActivationCode(email: string, code: string, userName: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"${this.configService.get<string>('SMTP_FROM_NAME', 'GWAN')}" <${this.configService.get<string>('SMTP_FROM_EMAIL', 'noreply@gwan.com.br')}>`,
        to: email,
        subject: 'Ativação da Conta - GWAN Landing Page',
        html: this.generateActivationEmailHTML(userName, code),
        text: this.generateActivationEmailText(userName, code),
      };

      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Activation email sent successfully to ${email}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send activation email to ${email}: ${error.message}`);
      return false;
    }
  }

  async sendLoginCode(email: string, code: string, userName: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"${this.configService.get<string>('SMTP_FROM_NAME', 'GWAN')}" <${this.configService.get<string>('SMTP_FROM_EMAIL', 'noreply@gwan.com.br')}>`,
        to: email,
        subject: 'Código de Login - GWAN Landing Page',
        html: this.generateLoginEmailHTML(userName, code),
        text: this.generateLoginEmailText(userName, code),
      };

      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Login email sent successfully to ${email}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send login email to ${email}: ${error.message}`);
      return false;
    }
  }

  private generateActivationEmailHTML(userName: string, code: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Ativação da Conta - GWAN</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code { background: #fff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; font-size: 24px; font-weight: bold; color: #667eea; border: 2px dashed #667eea; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo ao GWAN!</h1>
            <p>Ativação da sua conta</p>
          </div>
          <div class="content">
            <h2>Olá, ${userName}!</h2>
            <p>Obrigado por se cadastrar no GWAN Landing Page. Para ativar sua conta, use o código abaixo:</p>
            
            <div class="code">
              ${code}
            </div>
            
            <p><strong>Este código expira em 10 minutos.</strong></p>
            
            <p>Se você não solicitou este cadastro, ignore este email.</p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}" class="button">
                Acessar GWAN Landing Page
              </a>
            </div>
          </div>
          <div class="footer">
            <p>Este é um email automático, não responda a este endereço.</p>
            <p>&copy; 2024 GWAN. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateActivationEmailText(userName: string, code: string): string {
    return `
Bem-vindo ao GWAN!

Olá, ${userName}!

Obrigado por se cadastrar no GWAN Landing Page. Para ativar sua conta, use o código abaixo:

CÓDIGO DE ATIVAÇÃO: ${code}

Este código expira em 10 minutos.

Se você não solicitou este cadastro, ignore este email.

Acesse: ${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}

---
Este é um email automático, não responda a este endereço.
© 2024 GWAN. Todos os direitos reservados.
    `;
  }

  private generateLoginEmailHTML(userName: string, code: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Código de Login - GWAN</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code { background: #fff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; font-size: 24px; font-weight: bold; color: #667eea; border: 2px dashed #667eea; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Login GWAN</h1>
            <p>Seu código de acesso</p>
          </div>
          <div class="content">
            <h2>Olá, ${userName}!</h2>
            <p>Você solicitou um código de login para acessar sua conta. Use o código abaixo:</p>
            
            <div class="code">
              ${code}
            </div>
            
            <p><strong>Este código expira em 10 minutos.</strong></p>
            
            <p>Se você não solicitou este login, ignore este email e considere alterar sua senha.</p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}" class="button">
                Acessar GWAN Landing Page
              </a>
            </div>
          </div>
          <div class="footer">
            <p>Este é um email automático, não responda a este endereço.</p>
            <p>&copy; 2024 GWAN. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateLoginEmailText(userName: string, code: string): string {
    return `
Login GWAN

Olá, ${userName}!

Você solicitou um código de login para acessar sua conta. Use o código abaixo:

CÓDIGO DE LOGIN: ${code}

Este código expira em 10 minutos.

Se você não solicitou este login, ignore este email e considere alterar sua senha.

Acesse: ${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}

---
Este é um email automático, não responda a este endereço.
© 2024 GWAN. Todos os direitos reservados.
    `;
  }
} 
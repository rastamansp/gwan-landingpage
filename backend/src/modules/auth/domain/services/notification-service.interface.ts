export interface INotificationService {
  sendActivationCode(email: string, phone: string, code: string): Promise<void>;
  sendLoginCode(
    contact: string,
    code: string,
    type: 'email' | 'whatsapp'
  ): Promise<{ success: boolean; message?: string }>;
}

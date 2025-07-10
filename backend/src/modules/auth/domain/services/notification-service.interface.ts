export interface INotificationService {
  sendActivationCode(email: string, phone: string, code: string): Promise<void>;
}

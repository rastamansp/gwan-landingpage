import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService): JwtModuleOptions => {
  const secret =
    configService.get<string>('JWT_SECRET') ||
    'gwan-super-secret-key-change-in-production';
  console.log('🔐 JWT Config - Secret:', secret.substring(0, 10) + '...');

  return {
    secret: secret,
    signOptions: {
      expiresIn: '7d', // Token válido por 7 dias
    },
  };
};

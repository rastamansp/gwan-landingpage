import { JwtModuleOptions } from '@nestjs/jwt';

const secret =
  process.env.JWT_SECRET || 'gwan-super-secret-key-change-in-production';
console.log('🔐 JWT Config - Secret:', secret.substring(0, 10) + '...');

export const jwtConfig: JwtModuleOptions = {
  secret: secret,
  signOptions: {
    expiresIn: '7d', // Token válido por 7 dias
  },
};

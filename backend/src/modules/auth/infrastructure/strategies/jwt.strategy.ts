import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../services/jwt-auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        'gwan-super-secret-key-change-in-production',
    });
    this.logger.log(
      `JWT Strategy initialized with secret: ${configService.get<string>('JWT_SECRET') ? 'SET' : 'DEFAULT'}`
    );
    this.logger.log(
      `JWT Secret being used: ${(configService.get<string>('JWT_SECRET') || 'gwan-super-secret-key-change-in-production').substring(0, 10)}...`
    );
  }

  async validate(payload: JwtPayload) {
    this.logger.log(`🔍 Validating JWT payload: ${JSON.stringify(payload)}`);

    if (!payload.sub) {
      this.logger.error('❌ JWT payload missing sub field');
      throw new UnauthorizedException('Invalid token');
    }

    this.logger.log(`✅ JWT validation successful for user: ${payload.sub}`);

    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      status: payload.status,
    };
  }
}

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
    this.logger.log(
      `🔍 JwtStrategy - Validating JWT payload: ${JSON.stringify(payload)}`
    );

    if (!payload.sub) {
      this.logger.error('❌ JwtStrategy - JWT payload missing sub field');
      throw new UnauthorizedException('Invalid token - missing sub field');
    }

    if (!payload.email) {
      this.logger.error('❌ JwtStrategy - JWT payload missing email field');
      throw new UnauthorizedException('Invalid token - missing email field');
    }

    if (!payload.name) {
      this.logger.error('❌ JwtStrategy - JWT payload missing name field');
      throw new UnauthorizedException('Invalid token - missing name field');
    }

    if (!payload.status) {
      this.logger.error('❌ JwtStrategy - JWT payload missing status field');
      throw new UnauthorizedException('Invalid token - missing status field');
    }

    this.logger.log(
      `✅ JwtStrategy - JWT validation successful for user: ${payload.sub}`
    );

    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      status: payload.status,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/entities/user.entity';

export interface JwtPayload {
  sub: string; // userId
  email: string;
  name: string;
  status: string;
}

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      status: user.getStatus(),
    };

    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): JwtPayload {
    return this.jwtService.verify(token);
  }

  decodeToken(token: string): JwtPayload {
    return this.jwtService.decode(token) as JwtPayload;
  }
}

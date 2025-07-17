import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    this.logger.log(
      `🔒 JwtAuthGuard - Request to: ${request.method} ${request.url}`
    );
    this.logger.log(
      `🔒 JwtAuthGuard - Authorization header: ${authHeader ? 'Present' : 'Missing'}`
    );

    if (authHeader) {
      this.logger.log(
        `🔒 JwtAuthGuard - Token starts with: ${authHeader.substring(0, 20)}...`
      );
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, _context: ExecutionContext) {
    this.logger.log(`🔒 JwtAuthGuard - handleRequest called`);
    this.logger.log(`🔒 JwtAuthGuard - Error: ${err ? err.message : 'None'}`);
    this.logger.log(`🔒 JwtAuthGuard - User: ${user ? 'Present' : 'Missing'}`);
    this.logger.log(`🔒 JwtAuthGuard - Info: ${info ? info.message : 'None'}`);

    if (err || !user) {
      this.logger.error(
        `❌ JwtAuthGuard - Authentication failed: ${err?.message || info?.message || 'No user'}`
      );
      throw err || new Error('Authentication failed');
    }

    this.logger.log(
      `✅ JwtAuthGuard - Authentication successful for user: ${user.userId}`
    );
    return user;
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AuthController } from './presentation/controllers/auth.controller';
import { UploadController } from './presentation/controllers/upload.controller';

// Use Cases
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { ActivateUserUseCase } from './application/use-cases/activate-user.use-case';
import { LoginRequestUseCase } from './application/use-cases/login-request.use-case';
import { LoginValidateUseCase } from './application/use-cases/login-validate.use-case';
import { UploadCharacterImageUseCase } from './application/use-cases/upload-character-image.use-case';
import { ProcessCharacterImageUseCase } from './application/use-cases/process-character-image.use-case';

// Repositories
import { UserRepository } from './infrastructure/repositories/user.repository';
import { CharacterRepository } from './infrastructure/repositories/character.repository';
import { UserEntity } from './infrastructure/entities/user.entity';
import { CharacterEntity } from './infrastructure/entities/character.entity';

// Services
import { NotificationService } from './infrastructure/services/notification.service';
import { FileUploadService } from './infrastructure/services/file-upload.service';
import { ExternalApiService } from './infrastructure/services/external-api.service';
import { JwtAuthService } from './infrastructure/services/jwt-auth.service';

// Strategies
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

// Interceptors
import { UserFileUploadInterceptor } from './infrastructure/interceptors/user-file-upload.interceptor';

// Tokens
import {
  USER_REPOSITORY,
  CHARACTER_REPOSITORY,
  NOTIFICATION_SERVICE,
  FILE_UPLOAD_SERVICE,
  EXTERNAL_API_SERVICE,
} from './domain/tokens/injection-tokens';

// Config
import { jwtConfig } from '../../core/config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CharacterEntity]),
    MulterModule.register({
      dest: './uploads',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig),
    ConfigModule,
  ],
  controllers: [AuthController, UploadController],
  providers: [
    // Use Cases
    RegisterUserUseCase,
    ActivateUserUseCase,
    LoginRequestUseCase,
    LoginValidateUseCase,
    UploadCharacterImageUseCase,
    ProcessCharacterImageUseCase,

    // Repositories
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: CHARACTER_REPOSITORY,
      useClass: CharacterRepository,
    },

    // Services
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationService,
    },
    {
      provide: FILE_UPLOAD_SERVICE,
      useClass: FileUploadService,
    },
    {
      provide: EXTERNAL_API_SERVICE,
      useClass: ExternalApiService,
    },
    JwtAuthService,

    // Strategies
    JwtStrategy,

    // Interceptors
    UserFileUploadInterceptor,
  ],
  exports: [
    RegisterUserUseCase,
    ActivateUserUseCase,
    LoginRequestUseCase,
    LoginValidateUseCase,
    UploadCharacterImageUseCase,
    ProcessCharacterImageUseCase,
    JwtAuthService,
  ],
})
export class AuthModule {}

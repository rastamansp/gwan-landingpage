import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

// Domain
import { IUserRepository } from './domain/repositories/user-repository.interface';
import { INotificationService } from './domain/services/notification-service.interface';
import { IFileUploadService } from './domain/services/file-upload-service.interface';
import {
  USER_REPOSITORY,
  NOTIFICATION_SERVICE,
  FILE_UPLOAD_SERVICE,
} from './domain/tokens/injection-tokens';

// Application
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { ActivateUserUseCase } from './application/use-cases/activate-user.use-case';
import { CompleteProfileUseCase } from './application/use-cases/complete-profile.use-case';

// Infrastructure
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { NotificationService } from './infrastructure/services/notification.service';
import { FileUploadService } from './infrastructure/services/file-upload.service';

// Presentation
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Use Cases
    RegisterUserUseCase,
    ActivateUserUseCase,
    CompleteProfileUseCase,

    // Infrastructure Services
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationService,
    },
    {
      provide: FILE_UPLOAD_SERVICE,
      useClass: FileUploadService,
    },
  ],
  exports: [RegisterUserUseCase, ActivateUserUseCase, CompleteProfileUseCase],
})
export class AuthModule {}

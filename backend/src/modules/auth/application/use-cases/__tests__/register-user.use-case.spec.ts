import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from '../register-user.use-case';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { INotificationService } from '../../../domain/services/notification-service.interface';
import { RegisterUserInput } from '../../dtos/register-user.dto';
import { User, UserStatus } from '../../../domain/entities/user.entity';
import {
  USER_REPOSITORY,
  NOTIFICATION_SERVICE,
} from '../../../domain/tokens/injection-tokens';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockNotificationService: jest.Mocked<INotificationService>;

  beforeEach(async () => {
    const mockUserRepositoryProvider = {
      provide: USER_REPOSITORY,
      useValue: {
        findByEmail: jest.fn(),
        findByPhone: jest.fn(),
        save: jest.fn(),
      },
    };

    const mockNotificationServiceProvider = {
      provide: NOTIFICATION_SERVICE,
      useValue: {
        sendActivationCode: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        mockUserRepositoryProvider,
        mockNotificationServiceProvider,
      ],
    }).compile();

    useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    mockUserRepository = module.get(USER_REPOSITORY);
    mockNotificationService = module.get(NOTIFICATION_SERVICE);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should register a new user successfully', async () => {
      // Arrange
      const input = new RegisterUserInput(
        'John Doe',
        'john@example.com',
        '+5511999999999'
      );

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.findByPhone.mockResolvedValue(null);
      mockUserRepository.save.mockResolvedValue();
      mockNotificationService.sendActivationCode.mockResolvedValue();

      // Act
      const result = await useCase.execute(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.userId).toMatch(/^user_\d+_[a-z0-9]+$/);
      expect(result.message).toContain('User registered successfully');
      expect(result.activationCode).toBeDefined();
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        'john@example.com'
      );
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(mockNotificationService.sendActivationCode).toHaveBeenCalled();
    });

    it('should fail when user already exists', async () => {
      // Arrange
      const input = new RegisterUserInput(
        'John Doe',
        'john@example.com',
        '+5511999999999'
      );
      const existingUser = new User(
        'existing-user-123',
        'John Doe',
        'john@example.com',
        '+5511999999999',
        UserStatus.PENDING,
        new Date(),
        new Date()
      );

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act
      const result = await useCase.execute(input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Email already registered');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        'john@example.com'
      );
      expect(mockUserRepository.save).not.toHaveBeenCalled();
      expect(mockNotificationService.sendActivationCode).not.toHaveBeenCalled();
    });

    it('should fail when phone is already registered', async () => {
      // Arrange
      const input = new RegisterUserInput(
        'John Doe',
        'john@example.com',
        '+5511999999999'
      );
      const existingUser = new User(
        'existing-user-123',
        'John Doe',
        'other@example.com',
        '+5511999999999',
        UserStatus.PENDING,
        new Date(),
        new Date()
      );

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.findByPhone.mockResolvedValue(existingUser);

      // Act
      const result = await useCase.execute(input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Phone already registered');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        'john@example.com'
      );
      expect(mockUserRepository.findByPhone).toHaveBeenCalledWith(
        '+5511999999999'
      );
      expect(mockUserRepository.save).not.toHaveBeenCalled();
      expect(mockNotificationService.sendActivationCode).not.toHaveBeenCalled();
    });
  });
});

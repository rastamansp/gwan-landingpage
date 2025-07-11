import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.use-case';
import { ActivateUserUseCase } from '../../../application/use-cases/activate-user.use-case';
import { LoginRequestUseCase } from '../../../application/use-cases/login-request.use-case';
import { LoginValidateUseCase } from '../../../application/use-cases/login-validate.use-case';

describe('AuthController', () => {
  let controller: AuthController;
  let mockRegisterUserUseCase: jest.Mocked<RegisterUserUseCase>;
  let mockActivateUserUseCase: jest.Mocked<ActivateUserUseCase>;
  let mockLoginRequestUseCase: jest.Mocked<LoginRequestUseCase>;
  let mockLoginValidateUseCase: jest.Mocked<LoginValidateUseCase>;

  beforeEach(async () => {
    const mockRegisterUserUseCaseProvider = {
      provide: RegisterUserUseCase,
      useValue: {
        execute: jest.fn(),
      },
    };

    const mockActivateUserUseCaseProvider = {
      provide: ActivateUserUseCase,
      useValue: {
        execute: jest.fn(),
      },
    };

    const mockLoginRequestUseCaseProvider = {
      provide: LoginRequestUseCase,
      useValue: {
        execute: jest.fn(),
      },
    };

    const mockLoginValidateUseCaseProvider = {
      provide: LoginValidateUseCase,
      useValue: {
        execute: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        mockRegisterUserUseCaseProvider,
        mockActivateUserUseCaseProvider,
        mockLoginRequestUseCaseProvider,
        mockLoginValidateUseCaseProvider,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    mockRegisterUserUseCase = module.get(RegisterUserUseCase);
    mockActivateUserUseCase = module.get(ActivateUserUseCase);
    mockLoginRequestUseCase = module.get(LoginRequestUseCase);
    mockLoginValidateUseCase = module.get(LoginValidateUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      // Arrange
      const registerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+5511999999999',
      };

      const expectedResult = {
        success: true,
        userId: 'user-123',
        message: 'Usuário registrado com sucesso',
        activationCode: '123456',
      };

      mockRegisterUserUseCase.execute.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.register(registerDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockRegisterUserUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+5511999999999',
        })
      );
    });

    it('should throw BadRequestException when registration fails', async () => {
      // Arrange
      const registerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+5511999999999',
      };

      const expectedResult = {
        success: false,
        error: 'Email já cadastrado',
      };

      mockRegisterUserUseCase.execute.mockResolvedValue(expectedResult);

      // Act & Assert
      await expect(controller.register(registerDto)).rejects.toThrow(
        'Email já cadastrado'
      );
    });
  });

  describe('loginRequest', () => {
    it('should request login code successfully', async () => {
      // Arrange
      const loginRequestDto = {
        contact: 'john@example.com',
      };

      const expectedResult = {
        success: true,
        message: 'Código enviado com sucesso',
        loginCode: '123456',
      };

      mockLoginRequestUseCase.execute.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.loginRequest(loginRequestDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockLoginRequestUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          contact: 'john@example.com',
        })
      );
    });
  });

  describe('loginValidate', () => {
    it('should validate login code successfully', async () => {
      // Arrange
      const loginValidateDto = {
        contact: 'john@example.com',
        loginCode: '123456',
      };

      const expectedResult = {
        success: true,
        message: 'Login realizado com sucesso',
        userId: 'user-123',
        token: 'jwt-token',
        userData: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+5511999999999',
          status: 'ACTIVE',
        },
      };

      mockLoginValidateUseCase.execute.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.loginValidate(loginValidateDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockLoginValidateUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          contact: 'john@example.com',
          loginCode: '123456',
        })
      );
    });
  });

  describe('activate', () => {
    it('should activate user successfully', async () => {
      // Arrange
      const userId = 'user-123';
      const activateDto = {
        activationCode: '123456',
      };

      const expectedResult = {
        success: true,
        message: 'Usuário ativado com sucesso',
        token: 'jwt-token',
        userData: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+5511999999999',
          status: 'ACTIVE',
        },
      };

      mockActivateUserUseCase.execute.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.activate(userId, activateDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockActivateUserUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-123',
          activationCode: '123456',
        })
      );
    });
  });
});

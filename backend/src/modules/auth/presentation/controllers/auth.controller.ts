import {
  Controller,
  Post,
  Body,
  Param,
  BadRequestException,
  Logger,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { ActivateUserUseCase } from '../../application/use-cases/activate-user.use-case';
import { LoginRequestUseCase } from '../../application/use-cases/login-request.use-case';
import { LoginValidateUseCase } from '../../application/use-cases/login-validate.use-case';
import { RegisterUserInput } from '../../application/dtos/register-user.dto';
import { ActivateUserInput } from '../../application/dtos/activate-user.dto';
import { LoginRequestInput } from '../../application/use-cases/login-request.use-case';
import { LoginValidateInput } from '../../application/use-cases/login-validate.use-case';
import { LoginRequestDto } from '../../application/dtos/login-request.dto';
import { LoginValidateDto } from '../../application/dtos/login-validate.dto';
import { IsString, IsEmail } from 'class-validator';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}

export class ActivateUserDto {
  @IsString()
  activationCode: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly activateUserUseCase: ActivateUserUseCase,
    private readonly loginRequestUseCase: LoginRequestUseCase,
    private readonly loginValidateUseCase: LoginValidateUseCase
  ) {}

  @Post('login-request')
  @ApiOperation({ summary: 'Solicitar código de login' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Código enviado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Código enviado com sucesso' },
        loginCode: { type: 'string', example: '123456' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na solicitação',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Contato não encontrado' },
      },
    },
  })
  async loginRequest(@Body() dto: LoginRequestDto) {
    this.logger.log(`Login request for contact: ${dto.contact}`);

    const input = new LoginRequestInput(dto.contact);
    const result = await this.loginRequestUseCase.execute(input);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      message: result.message,
      loginCode: result.loginCode, // Apenas para desenvolvimento
    };
  }

  @Post('login-validate')
  @ApiOperation({ summary: 'Validar código de login' })
  @ApiBody({ type: LoginValidateDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Login realizado com sucesso' },
        token: { type: 'string', example: 'jwt-token' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'user_123' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            phone: { type: 'string', example: '+5511999999999' },
            status: { type: 'string', example: 'ACTIVE' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Código inválido',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Código inválido' },
      },
    },
  })
  async loginValidate(@Body() dto: LoginValidateDto) {
    this.logger.log(`Login validation for contact: ${dto.contact}`);

    const input = new LoginValidateInput(dto.contact, dto.loginCode);
    const result = await this.loginValidateUseCase.execute(input);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      message: result.message,
      token: result.token,
      user: result.user, // Padronizado para 'user'
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter dados do usuário atual' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'user_123' },
            email: { type: 'string', example: 'john@example.com' },
            name: { type: 'string', example: 'John Doe' },
            status: { type: 'string', example: 'ACTIVE' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  async getCurrentUser(@CurrentUser() user: any) {
    return {
      success: true,
      user: {
        id: user.userId,
        email: user.email,
        name: user.name,
        status: user.status,
      },
    };
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário registrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        userId: { type: 'string', example: 'user_123' },
        message: { type: 'string', example: 'Usuário registrado com sucesso' },
        activationCode: { type: 'string', example: '123456' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro no registro',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Email já cadastrado' },
      },
    },
  })
  async register(@Body() dto: RegisterUserDto) {
    this.logger.log(`Registering user: ${dto.email}`);

    const input = new RegisterUserInput(dto.name, dto.email, dto.phone);
    const result = await this.registerUserUseCase.execute(input);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      userId: result.userId,
      message: result.message,
      activationCode: result.activationCode,
    };
  }

  @Post('activate/:userId')
  @ApiOperation({ summary: 'Ativar usuário' })
  @ApiBody({ type: ActivateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário ativado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Usuário ativado com sucesso' },
        token: { type: 'string', example: 'jwt-token' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'user_123' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            phone: { type: 'string', example: '+5511999999999' },
            status: { type: 'string', example: 'ACTIVE' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Código de ativação inválido',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Código de ativação inválido' },
      },
    },
  })
  async activate(
    @Param('userId') userId: string,
    @Body() dto: ActivateUserDto
  ) {
    this.logger.log(`Activating user: ${userId}, code: ${dto.activationCode}`);

    const input = new ActivateUserInput(userId, dto.activationCode);
    const result = await this.activateUserUseCase.execute(input);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      message: result.message,
      token: result.token,
      user: result.user, // Padronizado para 'user'
    };
  }
}

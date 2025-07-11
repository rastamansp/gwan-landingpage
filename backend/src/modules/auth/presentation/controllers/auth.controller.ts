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
      userId: result.userId,
      token: result.token,
      userData: result.userData,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
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
  async activate(
    @Param('userId') userId: string,
    @Body() dto: ActivateUserDto
  ) {
    this.logger.log(`Activating user: ${userId}`);

    const input = new ActivateUserInput(userId, dto.activationCode);
    const result = await this.activateUserUseCase.execute(input);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      message: result.message,
      token: result.token,
      userData: result.userData,
    };
  }
}

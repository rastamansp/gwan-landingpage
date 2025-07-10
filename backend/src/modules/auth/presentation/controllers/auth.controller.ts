import {
  Controller,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { ActivateUserUseCase } from '../../application/use-cases/activate-user.use-case';
import { CompleteProfileUseCase } from '../../application/use-cases/complete-profile.use-case';
import { RegisterUserInput } from '../../application/dtos/register-user.dto';
import { ActivateUserInput } from '../../application/dtos/activate-user.dto';
import { CompleteProfileInput } from '../../application/dtos/complete-profile.dto';
import { IsString, IsEmail } from 'class-validator';

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
    private readonly completeProfileUseCase: CompleteProfileUseCase
  ) { }

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
    };
  }

  @Post('complete-profile/:userId')
  @UseInterceptors(FileInterceptor('image'))
  async completeProfile(
    @Param('userId') userId: string,
    @UploadedFile() file: any
  ) {
    this.logger.log(`Completing profile for user: ${userId}`);

    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const input = new CompleteProfileInput(userId, file);
    const result = await this.completeProfileUseCase.execute(input);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      profileImageUrl: result.profileImageUrl,
      message: result.message,
    };
  }
}

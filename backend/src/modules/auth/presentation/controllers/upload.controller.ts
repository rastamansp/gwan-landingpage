import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import {
  UploadCharacterImageUseCase,
  UploadCharacterImageInput,
} from '../../application/use-cases/upload-character-image.use-case';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import { UserFileUploadInterceptor } from '../../infrastructure/interceptors/user-file-upload.interceptor';

@Controller('upload')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(
    private readonly uploadCharacterImageUseCase: UploadCharacterImageUseCase
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserFileUploadInterceptor)
  async uploadCharacterImage(
    @UploadedFile() file: any,
    @CurrentUser() user: any
  ) {
    this.logger.log(`Uploading character image for user: ${user.userId}`);

    if (!file) {
      throw new BadRequestException('Arquivo de imagem é obrigatório');
    }

    const input = new UploadCharacterImageInput(user.userId, file);
    const result = await this.uploadCharacterImageUseCase.execute(input);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return {
      success: true,
      imageUrl: result.imageUrl,
      message: 'Imagem do personagem enviada com sucesso!',
    };
  }
}

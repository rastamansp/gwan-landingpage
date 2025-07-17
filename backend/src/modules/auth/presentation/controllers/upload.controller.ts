import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import { UploadCharacterImageUseCase } from '../../application/use-cases/upload-character-image.use-case';
import { ProcessCharacterImageUseCase } from '../../application/use-cases/process-character-image.use-case';
import { GetUserImageUseCase } from '../../application/use-cases/get-user-image.use-case';
import { MinioService } from '../../infrastructure/services/minio.service';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(
    private readonly uploadCharacterImageUseCase: UploadCharacterImageUseCase,
    private readonly processCharacterImageUseCase: ProcessCharacterImageUseCase,
    private readonly getUserImageUseCase: GetUserImageUseCase,
    private readonly minioService: MinioService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Buscar imagem atual do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Imagem encontrada com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Imagem encontrada' },
        imageUrl: {
          type: 'string',
          example:
            'https://minio.gwan.com.br/landing/characters/user_123mage.jpg',
        },
      },
    },
  })
  async getUserImage(@CurrentUser() user: any) {
    this.logger.log(`🔍 [UploadController] Buscando imagem atual do usuário`);
    this.logger.log(`�� [UploadController] Usuário: ${user.userId}`);

    const result = await this.getUserImageUseCase.execute({
      userId: user.userId,
    });

    this.logger.log(
      `📊 [UploadController] Resultado da busca: ${result.success ? 'SUCESSO' : 'ERRO'}`
    );
    if (result.success) {
      if (result.imageUrl) {
        this.logger.log(
          `✅ [UploadController] Imagem encontrada: ${result.imageUrl}`
        );
      } else {
        this.logger.log(`📭 [UploadController] Usuário não possui imagem`);
      }
    } else {
      this.logger.error(`❌ [UploadController] Erro na busca: ${result.error}`);
    }

    return {
      success: result.success,
      message: result.success
        ? result.imageUrl
          ? 'Imagem encontrada'
          : 'Usuário não possui imagem'
        : result.error,
      imageUrl: result.imageUrl,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Upload de imagem do personagem' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Upload realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Imagem enviada com sucesso' },
        imageUrl: {
          type: 'string',
          example:
            'https://minio.gwan.com.br/landing/characters/user_123mage.jpg',
        },
      },
    },
  })
  async uploadCharacterImage(
    @UploadedFile() file: any,
    @CurrentUser() user: any
  ) {
    this.logger.log(`📤 [UploadController] Upload de imagem solicitado`);
    this.logger.log(`👤 [UploadController] Usuário: ${user.userId}`);
    this.logger.log(
      `📁 [UploadController] Arquivo: ${file?.originalname || 'N/A'}`
    );
    this.logger.log(
      `📏 [UploadController] Tamanho: ${file?.size || 'N/A'} bytes`
    );

    const result = await this.uploadCharacterImageUseCase.execute({
      userId: user.userId,
      imageFile: file,
    });

    this.logger.log(
      `📊 [UploadController] Resultado do upload: ${result.success ? 'SUCESSO' : 'ERRO'}`
    );
    if (result.success) {
      this.logger.log(`✅ [UploadController] Upload realizado com sucesso`);
      this.logger.log(`🔗 [UploadController] URL gerada: ${result.imageUrl}`);
    } else {
      this.logger.error(
        `❌ [UploadController] Erro no upload: ${result.error}`
      );
    }

    return {
      success: result.success,
      message: result.success ? 'Imagem enviada com sucesso' : result.error,
      imageUrl: result.imageUrl,
    };
  }

  @Post('process')
  @ApiOperation({ summary: 'Processar imagem do personagem com IA' })
  @ApiResponse({
    status: 200,
    description: 'Processamento realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'Personagem processado com sucesso',
        },
        analysis: { type: 'object' },
      },
    },
  })
  async processCharacterImage(@CurrentUser() user: any) {
    this.logger.log(`🤖 [UploadController] Processamento de imagem solicitado`);
    this.logger.log(`👤 [UploadController] Usuário: ${user.userId}`);

    // Processar a imagem existente do personagem
    const result = await this.processCharacterImageUseCase.execute({
      userId: user.userId,
    });

    this.logger.log(
      `📊 [UploadController] Resultado do processamento: ${result.success ? 'SUCESSO' : 'ERRO'}`
    );
    if (result.success) {
      this.logger.log(
        `✅ [UploadController] Processamento realizado com sucesso`
      );
      this.logger.log(
        `📋 [UploadController] Análise gerada: ${result.analysis ? 'SIM' : 'NÃO'}`
      );
    } else {
      this.logger.error(
        `❌ [UploadController] Erro no processamento: ${result.error}`
      );
    }

    return {
      success: result.success,
      message: result.success
        ? 'Personagem processado com sucesso'
        : result.error,
      analysis: result.analysis,
      processedData: result.processedData,
    };
  }
}

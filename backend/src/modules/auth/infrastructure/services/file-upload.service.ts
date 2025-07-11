import { Injectable, Logger } from '@nestjs/common';
import { IFileUploadService } from '../../domain/services/file-upload-service.interface';
import * as path from 'path';

@Injectable()
export class FileUploadService implements IFileUploadService {
  private readonly logger = new Logger(FileUploadService.name);

  async uploadImage(file: any, userId?: string): Promise<string> {
    try {
      this.logger.log(`Uploading image: ${file.originalname}`);

      // Simulação de upload
      await new Promise(resolve => setTimeout(resolve, 200));

      // Preservar nome original do arquivo
      const originalName = file.originalname;

      // Organizar por pasta do usuário se userId fornecido
      let imageUrl: string;
      if (userId) {
        // Usar o caminho real do arquivo organizado pelo interceptor
        const relativePath = path.relative(process.cwd(), file.path);
        imageUrl = `https://storage.example.com/${relativePath}`;

        this.logger.log(`File organized at: ${file.path}`);
        this.logger.log(`Image URL: ${imageUrl}`);
      } else {
        // Fallback para estrutura antiga
        imageUrl = `https://storage.example.com/images/${Date.now()}_${originalName}`;
      }

      this.logger.log(`Image uploaded successfully: ${imageUrl}`);

      return imageUrl;
    } catch (error) {
      this.logger.error(`Failed to upload image: ${error.message}`);
      throw new Error('Failed to upload image');
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      this.logger.log(`Deleting image: ${imageUrl}`);

      // Simulação de exclusão
      await new Promise(resolve => setTimeout(resolve, 100));

      this.logger.log(`Image deleted successfully: ${imageUrl}`);
    } catch (error) {
      this.logger.error(`Failed to delete image: ${error.message}`);
      throw new Error('Failed to delete image');
    }
  }
}

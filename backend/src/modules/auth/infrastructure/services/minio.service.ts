import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import * as fs from 'fs';

@Injectable()
export class MinioService {
  private readonly logger = new Logger(MinioService.name);
  private readonly minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
      port: this.configService.get<number>('MINIO_PORT'),
      useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });
  }

  private async applyPublicPolicy(bucketName: string): Promise<void> {
    try {
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
          },
        ],
      };

      await this.minioClient.setBucketPolicy(
        bucketName,
        JSON.stringify(policy)
      );
      this.logger.log(`Public policy applied to bucket: ${bucketName}`);
    } catch (error) {
      this.logger.error(
        `Failed to apply public policy to bucket ${bucketName}: ${error.message}`
      );
      throw error;
    }
  }

  async ensureBucketExists(bucketName: string): Promise<void> {
    try {
      const bucketExists = await this.minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        await this.minioClient.makeBucket(bucketName);
        this.logger.log(`Created bucket: ${bucketName}`);
      }

      // Sempre aplicar a política pública, mesmo se o bucket já existir
      await this.applyPublicPolicy(bucketName);
    } catch (error) {
      this.logger.error(`Failed to ensure bucket exists: ${error.message}`);
      throw error;
    }
  }

  async uploadFile(
    file: any, // Corrigido para aceitar qualquer tipo de arquivo
    userId: string,
    folder = 'characters'
  ): Promise<string> {
    try {
      this.logger.log(`🚀 [MinioService] Iniciando upload - userId: ${userId}`);
      this.logger.log(
        `📁 [MinioService] Arquivo original: ${file.originalname}`
      );
      this.logger.log(
        `📏 [MinioService] Tamanho do arquivo: ${file.size} bytes`
      );
      this.logger.log(`🎯 [MinioService] Tipo MIME: ${file.mimetype}`);

      // Validar userId
      if (!userId) {
        this.logger.error(`❌ [MinioService] userId é undefined ou vazio`);
        throw new Error('userId é obrigatório para upload');
      }

      const bucketName = this.configService.get<string>('MINIO_BUCKET');
      this.logger.log(`🪣 [MinioService] Bucket: ${bucketName}`);

      // Usar apenas o nome original do arquivo
      const originalName = file.originalname;
      const fileName = `${folder}/${userId}/${originalName}`;
      this.logger.log(
        `📝 [MinioService] Nome do arquivo no MinIO: ${fileName}`
      );

      this.logger.log(`🔄 [MinioService] Verificando/criando bucket...`);
      // Garantir que o bucket existe e tem política pública
      await this.ensureBucketExists(bucketName);

      // Determinar fonte do arquivo (buffer ou stream)
      let fileSource: Buffer | fs.ReadStream;
      let fileSize: number;
      if (file.buffer) {
        this.logger.log(`💾 [MinioService] Usando buffer do arquivo`);
        fileSource = file.buffer;
        fileSize = file.size;
      } else if (file.path) {
        this.logger.log(
          `📂 [MinioService] Usando stream do arquivo: ${file.path}`
        );
        fileSource = fs.createReadStream(file.path);
        fileSize = file.size;
      } else {
        this.logger.error(
          `❌ [MinioService] Arquivo inválido - sem buffer ou path`
        );
        throw new Error('Arquivo inválido para upload');
      }

      this.logger.log(`⬆️ [MinioService] Iniciando upload para MinIO...`);
      // Upload do arquivo
      await this.minioClient.putObject(
        bucketName,
        fileName,
        fileSource,
        fileSize,
        {
          ContentType: file.mimetype,
        }
      );

      // Gerar URL pública
      const minioEndpoint = this.configService.get<string>('MINIO_ENDPOINT');
      const minioDomain = this.configService.get<string>('MINIO_DOMAIN') || minioEndpoint;
      const fileUrl = `https://${minioDomain}/${bucketName}/${fileName}`;
      this.logger.log(`✅ [MinioService] Upload concluído com sucesso!`);
      this.logger.log(`🔗 [MinioService] URL gerada: ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      this.logger.error(`❌MinioService] Erro no upload: ${error.message}`);
      this.logger.error(`🔍 [MinioService] Stack trace: ${error.stack}`);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const bucketName = this.configService.get<string>('MINIO_BUCKET');
      const fileName = fileUrl.split(`/${bucketName}/`)[1];

      if (!fileName) {
        throw new Error('Invalid file URL');
      }

      await this.minioClient.removeObject(bucketName, fileName);
      this.logger.log(`File deleted successfully: ${fileName}`);
    } catch (error) {
      this.logger.error(`Failed to delete file from MinIO: ${error.message}`);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async fileExists(fileUrl: string): Promise<boolean> {
    try {
      const bucketName = this.configService.get<string>('MINIO_BUCKET');
      const fileName = fileUrl.split(`/${bucketName}/`)[1];

      if (!fileName) {
        return false;
      }

      await this.minioClient.statObject(bucketName, fileName);
      return true;
    } catch (error) {
      return false;
    }
  }

  async generatePresignedUrl(
    fileUrl: string,
    expiresIn = 3600
  ): Promise<string> {
    try {
      const bucketName = this.configService.get<string>('MINIO_BUCKET');
      const fileName = fileUrl.split(`/${bucketName}/`)[1];

      if (!fileName) {
        throw new Error('Invalid file URL');
      }

      const presignedUrl = await this.minioClient.presignedGetObject(
        bucketName,
        fileName,
        expiresIn
      );
      this.logger.log(`Generated presigned URL for: ${fileName}`);
      return presignedUrl;
    } catch (error) {
      this.logger.error(`Failed to generate presigned URL: ${error.message}`);
      throw new Error(`Failed to generate presigned URL: ${error.message}`);
    }
  }
}

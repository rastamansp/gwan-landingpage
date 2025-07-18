import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { logDatabaseConfig } from '@/core/config/database.config';

async function bootstrap() {
  // Log de debug das configurações do banco
  logDatabaseConfig();

  const app = await NestFactory.create(AppModule);

  // Configuração de CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Configuração de validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Gwan Landing Page API')
    .setDescription('API para o sistema de landing page da Gwan')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticação')
    .addTag('health', 'Endpoints de saúde da aplicação')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);

  console.log(`🚀 Application is running on: http://${host}:${port}`);
  console.log(`📚 API Documentation available at: http://${host}:${port}/api`);
}

bootstrap();

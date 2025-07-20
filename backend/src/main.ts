import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { logDatabaseConfig } from '@/core/config/database.config';

async function bootstrap() {
  // Log de debug das configurações do banco
  logDatabaseConfig();

  const app = await NestFactory.create(AppModule);

  // Configuração de CORS para múltiplos domínios
  const allowedOrigins = [
    'http://localhost:3000',
    'https://video.gwan.com.br',
    'https://www.video.gwan.com.br',
    'https://gwan.com.br',
    'https://www.gwan.com.br',
    process.env.FRONTEND_URL,
  ].filter(Boolean); // Remove valores undefined/null

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
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
  console.log(`🌍 CORS enabled for origins: ${allowedOrigins.join(', ')}`);
}

bootstrap();

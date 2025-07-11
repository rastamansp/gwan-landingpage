import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos da aplicação
import { AuthModule } from '@/modules/auth/auth.module';
import { HealthController } from './modules/health.controller';

// Configurações
import { databaseConfig } from '@/core/config/database.config';

@Module({
  imports: [
    // Configuração de variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuração do banco de dados
    TypeOrmModule.forRoot(databaseConfig),

    // Módulos da aplicação
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

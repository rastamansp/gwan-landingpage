import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgresql://postgres:pazdedeus@gwan.com.br:5433/gwan_vector',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Log de debug para mostrar as credenciais de conexão
export function logDatabaseConfig() {
    const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:pazdedeus@gwan.com.br:5433/gwan_vector';

    console.log('🔍 Database Configuration Debug:');
    console.log('📡 DATABASE_URL:', databaseUrl);
    console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'development');
    console.log('🔧 Synchronize:', process.env.NODE_ENV !== 'production');
    console.log('📝 Logging:', process.env.NODE_ENV === 'development');
    console.log('🔒 SSL:', process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false);
    console.log('---');
} 
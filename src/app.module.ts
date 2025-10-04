import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: { rejectUnauthorized: false }, // Supabase requiere SSL
        autoLoadEntities: true,
        synchronize: true, // solo en dev
      }),
    }),
    ScoresModule
  ],
})
export class AppModule { }

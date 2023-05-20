import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(
          `database.${configService.get<string>('common.nodeEnv')}.host`,
        ),
        port: configService.get<number>(
          `database.${configService.get<string>('common.nodeEnv')}.port`,
        ),
        username: configService.get<string>(
          `database.${configService.get<string>('common.nodeEnv')}.user`,
        ),
        password: configService.get<string>(
          `database.${configService.get<string>('common.nodeEnv')}.password`,
        ),
        database: configService.get<string>(
          `database.${configService.get<string>('common.nodeEnv')}.name`,
        ),
        synchronize: false,
        logging: false,
        autoLoadEntities: true,
        retryAttempts: 5,
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

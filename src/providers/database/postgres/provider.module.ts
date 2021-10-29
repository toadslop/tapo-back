import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfigModule } from 'src/config/database/postgres/config.module';
import { PostgresConfigService } from 'src/config/database/postgres/config.service';
import { User } from 'src/models/users/user.entity';
import { AppConfigModule } from 'src/config/app/config.module';
import { AppConfigService } from 'src/config/app/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule, AppConfigModule],
      useFactory: async (
        postgresConfigService: PostgresConfigService,
        appConfigService: AppConfigService,
      ) => ({
        type: 'postgres' as DatabaseType,
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.user,
        password: postgresConfigService.password,
        database: postgresConfigService.db,
        entities: [User],
        synchronize: appConfigService.env === 'development',
      }),
      inject: [PostgresConfigService, AppConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresProviderModule {}

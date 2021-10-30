import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfigModule } from 'src/config/database/postgres/config.module';
import { PostgresConfigService } from 'src/config/database/postgres/config.service';
import { User } from 'src/models/users/user.entity';
import { AppConfigModule } from 'src/config/app/config.module';
import { AppConfigService } from 'src/config/app/config.service';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [PostgresConfigModule, AppConfigModule],
      useFactory: async (
        postgresConfigService: PostgresConfigService,
        appConfigService: AppConfigService,
      ) => ({
        secret: appConfigService.jwtSecret,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [PostgresConfigService, AppConfigService],
    } as JwtModuleAsyncOptions),
  ],
})
export class JwtAuthModule {}

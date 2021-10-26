import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { PostgresConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        POSTGRES_PASSWORD: Joi.string().default('test'),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().default('test'),
        POSTGRES_DB: Joi.string().default('test'),
        POSTGRES_HOST: Joi.string().default('postgres'),
      }),
    }),
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}

import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
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
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_PORT: Joi.number().default(3000),
        APP_TRUST_PROXY: Joi.boolean().default(false),
        APP_FRONT_URL: Joi.string().default('localhost:3001'),
        APP_JWT_SECRET: Joi.string().default('supersecret'),
        APP_JWT_EXPIR: Joi.alternatives([Joi.string(), Joi.number()]).default(
          '30m',
        ),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}

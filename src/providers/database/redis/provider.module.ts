import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { RedisConfigModule } from 'src/config/database/redis/config.module';
import { RedisConfigService } from 'src/config/database/redis/config.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [RedisConfigModule],
      useFactory: async (redisConfigService: RedisConfigService) => ({
        store: redisStore,
        host: redisConfigService.host,
        port: redisConfigService.port,
        auth_pass: redisConfigService.password,
      }),
      inject: [RedisConfigService],
    }),
  ],
})
export class RedisProviderModule {}

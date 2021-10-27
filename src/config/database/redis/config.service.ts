import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service for redis configuration.
 *
 * @class
 */
@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  get password(): string {
    return this.configService.get<string>('redis.password');
  }

  get port(): number {
    return Number(this.configService.get<number>('redis.port'));
  }

  get host(): string {
    return this.configService.get<string>('redis.host');
  }
}

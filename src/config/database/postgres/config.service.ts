import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get password(): string {
    return this.configService.get<string>('postgres.password');
  }

  get port(): number {
    return Number(this.configService.get<number>('postgres.port'));
  }

  get user(): string {
    return this.configService.get<string>('postgres.user');
  }

  get db(): string {
    return this.configService.get<string>('postgres.db');
  }

  get host(): string {
    return this.configService.get<string>('postgres.host');
  }
}

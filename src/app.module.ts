import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app/config.module';
import { PostgresProviderModule } from './providers/database/postgres/provider.module';
import { CacheProviderModule } from './providers/cache/provider.module';

@Module({
  imports: [AppConfigModule, PostgresProviderModule, CacheProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

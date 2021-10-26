import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app/config.module';
import { PostgresProviderModule } from './providers/database/postgres/provider.module';
@Module({
  imports: [AppConfigModule, PostgresProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app/config.module';
import { PostgresProviderModule } from './providers/database/postgres/provider.module';
import { CacheProviderModule } from './providers/cache/provider.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { UsersController } from './models/users/users.controller';

@Module({
  imports: [
    AppConfigModule,
    PostgresProviderModule,
    CacheProviderModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}

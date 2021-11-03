import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app/config.module';
import { PostgresProviderModule } from './providers/database/postgres/provider.module';
import { CacheProviderModule } from './providers/cache/provider.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RestaurantModule } from './models/restaurant/restaurant.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresProviderModule,
    CacheProviderModule,
    AuthModule,
    UsersModule,
    RestaurantModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}

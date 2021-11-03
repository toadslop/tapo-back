import { Injectable } from '@nestjs/common';
import { JwtVerifyOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/app/config.service';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private appConfig: AppConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwtSecret, // TODO: For production, use PEM-encoded private key
    } as JwtVerifyOptions);
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);
    const { password, ...result } = user;
    return result;
  }
}

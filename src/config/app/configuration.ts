import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  trustProxy: process.env.APP_TRUST_PROXY,
  frontUrl: process.env.APP_FRONT_URL,
  jwtSecret: process.env.APP_JWT_SECRET,
  jwtExpir: process.env.APP_JWT_EXPIR,
}));

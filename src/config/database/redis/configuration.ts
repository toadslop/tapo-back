import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
}));
